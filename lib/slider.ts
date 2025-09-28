export type Slide = {
  image: string
  title: string
  description: string
}

export type SliderResponse = {
  slides: Slide[]
}

export async function getSlidesClient(): Promise<Slide[]> {
  try {
    const res = await fetch("/api/public/sliders", { cache: "no-store" })
    if (!res.ok) return []
    const data = await res.json()
    if (data.success && Array.isArray(data.sliders)) {
      // Transform database slider data to Slide format
      return data.sliders.map((slider: any) => ({
        image: slider.imageUrl,
        title: slider.heading,
        description: slider.description
      }))
    }
    return []
  } catch {
    return []
  }
}


