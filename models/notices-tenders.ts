import { MongoClient, ObjectId } from "mongodb"

let client: MongoClient | null = null
let isConnecting = false

async function getClient(): Promise<MongoClient> {
  if (client && client.topology?.isConnected()) {
    return client
  }
  
  if (isConnecting) {
    // Wait for connection to complete
    while (isConnecting) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    if (client) return client
  }
  
  isConnecting = true
  try {
    client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()
    return client
  } finally {
    isConnecting = false
  }
}

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

// Visitor Interface
export interface Visitor {
  _id?: ObjectId
  date: Date
  count: number
  ipAddresses: string[]
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
    const mongoClient = await getClient()
    return mongoClient.db().collection(this.collection)
  }

  async create(data: Omit<T, '_id' | 'createdAt' | 'updatedAt'>): Promise<ObjectId> {
    const collection = await this.getCollection()
    const item = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await collection.insertOne(item)
    return result.insertedId
  }

  async getAll(isActive?: boolean, limit?: number): Promise<T[]> {
    const collection = await this.getCollection()
    const query: any = {}
    if (isActive !== undefined) query.isActive = isActive
    
    const cursor = collection.find(query).sort({ publishedDate: -1 })
    if (limit) cursor.limit(limit)
    
    const result = await cursor.toArray()
    return result as T[]
  }

  async getById(id: string): Promise<T | null> {
    const collection = await this.getCollection()
    
    const result = await collection.findOne({ _id: new ObjectId(id) })
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
    return result.matchedCount > 0
  }

  async delete(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  }

  async toggleActive(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const item = await collection.findOne({ _id: new ObjectId(id) })
    
    if (!item) {
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
    return result as T[]
  }

  async toggleFeatured(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const item = await collection.findOne({ _id: new ObjectId(id) })
    
    if (!item) {
      return false
    }

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
  }

  async getFeatured(limit?: number): Promise<T[]> {
    const collection = await this.getCollection()
    
    const cursor = collection
      .find({ 
        featured: true,
        isActive: true
      })
      .sort({ publishedDate: -1 })
    
    if (limit) cursor.limit(limit)
    
    const result = await cursor.toArray()
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
    return result as Recruitment[]
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

    const result = await collection
      .find(searchQuery)
      .sort({ ranking: 1, createdAt: -1 })
      .toArray()
    return result as News[]
  }

  async getActiveNews(limit?: number): Promise<News[]> {
    const collection = await this.getCollection()
    
    const cursor = collection
      .find({ isActive: true })
      .sort({ ranking: 1, createdAt: -1 })
    
    if (limit) cursor.limit(limit)
    
    const result = await cursor.toArray()
    return result as News[]
  }

  async getAll(isActive?: boolean, limit?: number): Promise<News[]> {
    const collection = await this.getCollection()
    const query: any = {}
    if (isActive !== undefined) query.isActive = isActive
    
    const cursor = collection.find(query).sort({ ranking: 1, createdAt: -1 })
    if (limit) cursor.limit(limit)
    
    const result = await cursor.toArray()
    return result as News[]
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

    const result = await collection
      .find(searchQuery)
      .sort({ priority: 1, createdAt: -1 })
      .toArray()
    return result as Slider[]
  }

  async getActiveSliders(limit?: number): Promise<Slider[]> {
    const collection = await this.getCollection()
    
    const cursor = collection
      .find({ isActive: true })
      .sort({ priority: 1, createdAt: -1 })
    
    if (limit) cursor.limit(limit)
    
    const result = await cursor.toArray()
    return result as Slider[]
  }

  async getAll(isActive?: boolean, limit?: number): Promise<Slider[]> {
    const collection = await this.getCollection()
    const query: any = {}
    if (isActive !== undefined) query.isActive = isActive
    
    const cursor = collection.find(query).sort({ priority: 1, createdAt: -1 })
    if (limit) cursor.limit(limit)
    
    const result = await cursor.toArray()
    return result as Slider[]
  }
}

// Visitor Model
class VisitorModel extends BaseModel<Visitor> {
  constructor() {
    super('visitors')
  }

  async incrementVisitorCount(ipAddress: string): Promise<boolean> {
    const collection = await this.getCollection()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Check if visitor record exists for today
    const existingRecord = await collection.findOne({
      date: today
    })

    if (existingRecord) {
      // Check if IP already visited today
      if (!existingRecord.ipAddresses.includes(ipAddress)) {
        // New unique visitor for today
        await collection.updateOne(
          { date: today },
          { 
            $inc: { count: 1 },
            $push: { ipAddresses: ipAddress },
            $set: { updatedAt: new Date() }
          }
        )
      }
    } else {
      // Create new record for today
      await collection.insertOne({
        date: today,
        count: 1,
        ipAddresses: [ipAddress],
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    
    return true
  }

  async getTotalVisitors(): Promise<number> {
    const collection = await this.getCollection()
    
    const result = await collection.aggregate([
      { $group: { _id: null, totalVisitors: { $sum: "$count" } } }
    ]).toArray()
    
    return result.length > 0 ? result[0].totalVisitors : 0
  }

  async getTodayVisitors(): Promise<number> {
    const collection = await this.getCollection()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const result = await collection.findOne({ date: today })
    return result ? result.count : 0
  }

  async getVisitorStats(days: number = 7): Promise<Array<{date: Date, count: number}>> {
    const collection = await this.getCollection()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    startDate.setHours(0, 0, 0, 0)
    
    const result = await collection
      .find({ 
        date: { $gte: startDate } 
      })
      .sort({ date: 1 })
      .toArray()
      
    return result.map(item => ({ 
      date: item.date, 
      count: item.count 
    }))
  }
}

export const noticeModel = new NoticeModel()
export const tenderModel = new TenderModel()
export const recruitmentModel = new RecruitmentModel()
export const newsModel = new NewsModel()
export const sliderModel = new SliderModel()
export const visitorModel = new VisitorModel()