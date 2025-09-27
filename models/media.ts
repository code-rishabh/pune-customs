import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI!)

export interface MediaItem {
  _id?: ObjectId
  type: 'photo' | 'video' | 'document' | 'press'
  heading: string
  description: string
  date: Date
  link: string // Can be file path or external URL
  featured?: boolean // Only for photos
  category?: string // Optional categorization
  uploadedBy?: string
  createdAt: Date
  updatedAt: Date
}

export class MediaModel {
  private collection = 'media_items'

  private async getCollection() {
    await client.connect()
    return client.db().collection(this.collection)
  }

  async createMedia(data: Omit<MediaItem, '_id' | 'createdAt' | 'updatedAt'>): Promise<ObjectId> {
    const collection = await this.getCollection()
    const mediaItem: MediaItem = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await collection.insertOne(mediaItem)
    await client.close()
    return result.insertedId
  }

  async getMediaByType(type: MediaItem['type'], limit?: number): Promise<MediaItem[]> {
    const collection = await this.getCollection()
    const query = collection.find({ type }).sort({ date: -1 })
    
    if (limit) query.limit(limit)
    
    const result = await query.toArray()
    await client.close()
    return result as MediaItem[]
  }

  async getFeaturedPhotos(): Promise<MediaItem[]> {
    const collection = await this.getCollection()
    const result = await collection
      .find({ type: 'photo', featured: true })
      .sort({ date: -1 })
      .toArray()
    
    await client.close()
    return result as MediaItem[]
  }

  async getAllMedia(page = 1, limit = 10): Promise<{ items: MediaItem[], total: number }> {
    const collection = await this.getCollection()
    const skip = (page - 1) * limit
    
    const [items, total] = await Promise.all([
      collection.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray(),
      collection.countDocuments({})
    ])
    
    await client.close()
    return { items: items as MediaItem[], total }
  }

  async getMediaById(id: string): Promise<MediaItem | null> {
    const collection = await this.getCollection()
    const result = await collection.findOne({ _id: new ObjectId(id) })
    await client.close()
    return result as MediaItem | null
  }

  async updateMedia(id: string, data: Partial<Omit<MediaItem, '_id' | 'createdAt'>>): Promise<boolean> {
    const collection = await this.getCollection()
    const updateData = {
      ...data,
      updatedAt: new Date()
    }
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )
    
    await client.close()
    return result.matchedCount > 0
  }

  async deleteMedia(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    await client.close()
    return result.deletedCount > 0
  }

  async toggleFeatured(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const mediaItem = await collection.findOne({ _id: new ObjectId(id) })
    
    if (!mediaItem || mediaItem.type !== 'photo') {
      await client.close()
      return false
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          featured: !mediaItem.featured,
          updatedAt: new Date()
        }
      }
    )
    
    await client.close()
    return result.matchedCount > 0
  }

  async searchMedia(query: string, type?: MediaItem['type']): Promise<MediaItem[]> {
    const collection = await this.getCollection()
    const searchQuery: any = {
      $or: [
        { heading: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }

    if (type) {
      searchQuery.type = type
    }

    const result = await collection
      .find(searchQuery)
      .sort({ createdAt: -1 })
      .toArray()
    
    await client.close()
    return result as MediaItem[]
  }
}

export const mediaModel = new MediaModel()