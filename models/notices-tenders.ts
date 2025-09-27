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
  featured: boolean
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
  featured: boolean
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

// News Interface
export interface News {
  _id?: ObjectId
  text: string
  link?: string
  ranking: number
  isActive: boolean
  uploadedBy?: string
  createdAt: Date
  updatedAt: Date
}

// Slider Interface
export interface Slider {
  _id?: ObjectId
  heading: string
  description: string
  imageUrl: string
  link?: string
  priority: number
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
    
    try {
      const result = await collection.insertOne(item)
      return result.insertedId
    } finally {
      await client.close()
    }
  }

  async getAll(isActive?: boolean, limit?: number): Promise<T[]> {
    const collection = await this.getCollection()
    const query: any = {}
    if (isActive !== undefined) query.isActive = isActive
    
    try {
      const cursor = collection.find(query).sort({ publishedDate: -1 })
      if (limit) cursor.limit(limit)
      
      const result = await cursor.toArray()
      return result as T[]
    } finally {
      await client.close()
    }
  }

  async getById(id: string): Promise<T | null> {
    const collection = await this.getCollection()
    
    try {
      const result = await collection.findOne({ _id: new ObjectId(id) })
      return result as T | null
    } finally {
      await client.close()
    }
  }

  async update(id: string, data: Partial<Omit<T, '_id' | 'createdAt'>>): Promise<boolean> {
    const collection = await this.getCollection()
    const updateData = {
      ...data,
      updatedAt: new Date()
    }
    
    try {
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      )
      return result.matchedCount > 0
    } finally {
      await client.close()
    }
  }

  async delete(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    
    try {
      const result = await collection.deleteOne({ _id: new ObjectId(id) })
      return result.deletedCount > 0
    } finally {
      await client.close()
    }
  }

  async toggleActive(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const item = await collection.findOne({ _id: new ObjectId(id) })
    
    if (!item) {
      await client.close()
      return false
    }

    try {
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            isActive: !item.isActive,
            updatedAt: new Date()
          }
        }
      )
      return result.matchedCount > 0
    } finally {
      await client.close()
    }
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

    try {
      const result = await collection
        .find(searchQuery)
        .sort({ publishedDate: -1 })
        .toArray()
      return result as T[]
    } finally {
      await client.close()
    }
  }

  async toggleFeatured(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const item = await collection.findOne({ _id: new ObjectId(id) })
    
    if (!item) {
      await client.close()
      return false
    }

    try {
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            featured: !item.featured,
            updatedAt: new Date()
          }
        }
      )
      return result.matchedCount > 0
    } finally {
      await client.close()
    }
  }

  async getFeatured(limit?: number): Promise<T[]> {
    const collection = await this.getCollection()
    
    try {
      const cursor = collection
        .find({ 
          featured: true,
          isActive: true
        })
        .sort({ publishedDate: -1 })
      
      if (limit) cursor.limit(limit)
      
      const result = await cursor.toArray()
      return result as T[]
    } finally {
      await client.close()
    }
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
    
    try {
      const cursor = collection
        .find({ 
          isActive: true,
          validUntil: { $gte: now }
        })
        .sort({ publishedDate: -1 })
      
      if (limit) cursor.limit(limit)
      
      const result = await cursor.toArray()
      return result as Notice[]
    } finally {
      await client.close()
    }
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
    
    try {
      const cursor = collection
        .find({ 
          isActive: true,
          lastDate: { $gte: now }
        })
        .sort({ publishedDate: -1 })
      
      if (limit) cursor.limit(limit)
      
      const result = await cursor.toArray()
      return result as Tender[]
    } finally {
      await client.close()
    }
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

    try {
      const result = await collection
        .find(searchQuery)
        .sort({ publishedDate: -1 })
        .toArray()
      return result as Tender[]
    } finally {
      await client.close()
    }
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
    
    try {
      const cursor = collection
        .find({ 
          isActive: true,
          validUntil: { $gte: now }
        })
        .sort({ publishedDate: -1 })
      
      if (limit) cursor.limit(limit)
      
      const result = await cursor.toArray()
      return result as Recruitment[]
    } finally {
      await client.close()
    }
  }
}

// News Model
class NewsModel extends BaseModel<News> {
  constructor() {
    super('news')
  }

  async search(query: string, isActive?: boolean): Promise<News[]> {
    const collection = await this.getCollection()
    const searchQuery: any = {
      text: { $regex: query, $options: 'i' }
    }

    if (isActive !== undefined) {
      searchQuery.isActive = isActive
    }

    try {
      const result = await collection
        .find(searchQuery)
        .sort({ ranking: 1, createdAt: -1 })
        .toArray()
      return result as News[]
    } finally {
      await client.close()
    }
  }

  async getActiveNews(limit?: number): Promise<News[]> {
    const collection = await this.getCollection()
    
    try {
      const cursor = collection
        .find({ isActive: true })
        .sort({ ranking: 1, createdAt: -1 })
      
      if (limit) cursor.limit(limit)
      
      const result = await cursor.toArray()
      return result as News[]
    } finally {
      await client.close()
    }
  }

  async getAll(isActive?: boolean, limit?: number): Promise<News[]> {
    const collection = await this.getCollection()
    const query: any = {}
    if (isActive !== undefined) query.isActive = isActive
    
    try {
      const cursor = collection.find(query).sort({ ranking: 1, createdAt: -1 })
      if (limit) cursor.limit(limit)
      
      const result = await cursor.toArray()
      return result as News[]
    } finally {
      await client.close()
    }
  }
}

// Slider Model
class SliderModel extends BaseModel<Slider> {
  constructor() {
    super('sliders')
  }

  async search(query: string, isActive?: boolean): Promise<Slider[]> {
    const collection = await this.getCollection()
    const searchQuery: any = {
      $or: [
        { heading: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }

    if (isActive !== undefined) {
      searchQuery.isActive = isActive
    }

    try {
      const result = await collection
        .find(searchQuery)
        .sort({ priority: 1, createdAt: -1 })
        .toArray()
      return result as Slider[]
    } finally {
      await client.close()
    }
  }

  async getActiveSliders(limit?: number): Promise<Slider[]> {
    const collection = await this.getCollection()
    
    try {
      const cursor = collection
        .find({ isActive: true })
        .sort({ priority: 1, createdAt: -1 })
      
      if (limit) cursor.limit(limit)
      
      const result = await cursor.toArray()
      return result as Slider[]
    } finally {
      await client.close()
    }
  }

  async getAll(isActive?: boolean, limit?: number): Promise<Slider[]> {
    const collection = await this.getCollection()
    const query: any = {}
    if (isActive !== undefined) query.isActive = isActive
    
    try {
      const cursor = collection.find(query).sort({ priority: 1, createdAt: -1 })
      if (limit) cursor.limit(limit)
      
      const result = await cursor.toArray()
      return result as Slider[]
    } finally {
      await client.close()
    }
  }
}

export const noticeModel = new NoticeModel()
export const tenderModel = new TenderModel()
export const recruitmentModel = new RecruitmentModel()
export const newsModel = new NewsModel()
export const sliderModel = new SliderModel()