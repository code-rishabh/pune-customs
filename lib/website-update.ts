// Helper functions for website update tracking

export interface WebsiteUpdateInfo {
  timestamp: string
  activity: string
  adminUser: string
}

export async function getWebsiteUpdateInfo(): Promise<WebsiteUpdateInfo | null> {
  try {
    const response = await fetch('/api/website-update', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch website update info')
    }

    const data = await response.json()
    return data.success ? data.data : null
  } catch (error) {
    console.error('Error fetching website update info:', error)
    return null
  }
}

export async function trackWebsiteUpdate(activity: string, adminUser?: string): Promise<boolean> {
  try {
    const response = await fetch('/api/website-update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activity,
        adminUser: adminUser || 'Admin'
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to track website update')
    }

    const data = await response.json()
    return data.success
  } catch (error) {
    console.error('Error tracking website update:', error)
    return false
  }
}

export function formatUpdateTime(timestamp: string): string {
  try {
    const date = new Date(timestamp)
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    })
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Unknown'
  }
}
