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
    const res = await fetch("/api/slider", { cache: "no-store" })
    if (!res.ok) return []
    const data = (await res.json()) as SliderResponse
    return Array.isArray(data.slides) ? data.slides : []
  } catch {
    return []
  }
}


