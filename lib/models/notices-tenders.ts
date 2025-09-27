import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI!)

// Notice Interface
export interface Notice {
  _id?: ObjectId
  heading: string
  subheading: string
  publishedDate: Date
  validUntil: Date
  documentUrl?: string
  isActive: boolean
  uploadedBy?: string
  createdAt: Date
  updatedAt: Date
}

// Tender Interface  
export interface Tender {
  _id?: ObjectId
  heading: string
  description: string
  publishedDate: Date
  lastDate: Date
  openingDate: Date
  estimatedValue: number
  tenderNo: string
  documentUrl?: string
  isActive: boolean
  uploadedBy?: string
  createdAt: Date
  updatedAt: Date
}

// Recruitment Interface
export interface Recruitment {
  _id?: ObjectId
  heading: string
  subheading: string
  publishedDate: Date
  validUntil: Date
  documentUrl?: string
  isActive: boolean
  uploadedBy?: string
  createdAt: Date
  updatedAt: Date
}

// Base class for common operations
class BaseModel<T> {
  protected collection: string
  
  constructor(collectionName: string) {
    this.collection = collectionName
  }

  protected async getCollection() {
    await client.connect()
    return client.db().collection(this.collection)
  }

  async create(data: Omit<T, '_id' | 'createdAt' | 'updatedAt'>): Promise<ObjectId> {
    const collection = await this.getCollection()
    const item = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await collection.insertOne(item)
    await client.close()
    return result.insertedId
  }

  async getAll(isActive?: boolean, limit?: number): Promise<T[]> {
    const collection = await this.getCollection()
    const query: any = {}
    if (isActive !== undefined) query.isActive = isActive
    
    const cursor = collection.find(query).sort({ publishedDate: -1 })
    if (limit) cursor.limit(limit)
    
    const result = await cursor.toArray()
    await client.close()
    return result as T[]
  }

  async getById(id: string): Promise<T | null> {
    const collection = await this.getCollection()
    const result = await collection.findOne({ _id: new ObjectId(id) })
    await client.close()
    return result as T | null
  }

  async update(id: string, data: Partial<Omit<T, '_id' | 'createdAt'>>): Promise<boolean> {
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

  async delete(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    await client.close()
    return result.deletedCount > 0
  }

  async toggleActive(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const item = await collection.findOne({ _id: new ObjectId(id) })
    
    if (!item) {
      await client.close()
      return false
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          isActive: !item.isActive,
          updatedAt: new Date()
        }
      }
    )
    
    await client.close()
    return result.matchedCount > 0
  }

  async search(query: string, isActive?: boolean): Promise<T[]> {
    const collection = await this.getCollection()
    const searchQuery: any = {
      $or: [
        { heading: { $regex: query, $options: 'i' } },
        { subheading: { $regex: query, $options: 'i' } }
      ]
    }

    if (isActive !== undefined) {
      searchQuery.isActive = isActive
    }

    const result = await collection
      .find(searchQuery)
      .sort({ publishedDate: -1 })
      .toArray()
    
    await client.close()
    return result as T[]
  }
}

// Notice Model
class NoticeModel extends BaseModel<Notice> {
  constructor() {
    super('notices')
  }

  async getActiveNotices(limit?: number): Promise<Notice[]> {
    const collection = await this.getCollection()
    const now = new Date()
    
    const cursor = collection
      .find({ 
        isActive: true,
        validUntil: { $gte: now }
      })
      .sort({ publishedDate: -1 })
    
    if (limit) cursor.limit(limit)
    
    const result = await cursor.toArray()
    await client.close()
    return result as Notice[]
  }
}

// Tender Model  
class TenderModel extends BaseModel<Tender> {
  constructor() {
    super('tenders')
  }

  async getActiveTenders(limit?: number): Promise<Tender[]> {
    const collection = await this.getCollection()
    const now = new Date()
    
    const cursor = collection
      .find({ 
        isActive: true,
        lastDate: { $gte: now }
      })
      .sort({ publishedDate: -1 })
    
    if (limit) cursor.limit(limit)
    
    const result = await cursor.toArray()
    await client.close()
    return result as Tender[]
  }

  async search(query: string, isActive?: boolean): Promise<Tender[]> {
    const collection = await this.getCollection()
    const searchQuery: any = {
      $or: [
        { heading: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tenderNo: { $regex: query, $options: 'i' } }
      ]
    }

    if (isActive !== undefined) {
      searchQuery.isActive = isActive
    }

    const result = await collection
      .find(searchQuery)
      .sort({ publishedDate: -1 })
      .toArray()
    
    await client.close()
    return result as Tender[]
  }
}

// Recruitment Model
class RecruitmentModel extends BaseModel<Recruitment> {
  constructor() {
    super('recruitments')
  }

  async getActiveRecruitments(limit?: number): Promise<Recruitment[]> {
    const collection = await this.getCollection()
    const now = new Date()
    
    const cursor = collection
      .find({ 
        isActive: true,
        validUntil: { $gte: now }
      })
      .sort({ publishedDate: -1 })
    
    if (limit) cursor.limit(limit)
    
    const result = await cursor.toArray()
    await client.close()
    return result as Recruitment[]
  }
}

export const noticeModel = new NoticeModel()
export const tenderModel = new TenderModel()
export const recruitmentModel = new RecruitmentModel()