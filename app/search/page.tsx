"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  FileText, 
  AlertCircle, 
  Users, 
  Camera, 
  Newspaper, 
  Globe, 
  Calendar,
  ExternalLink,
  Filter,
  X
} from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/components/language-provider"
import { SearchHeader } from "@/components/search-header"

interface SearchResult {
  id: string
  type: 'news' | 'notice' | 'tender' | 'recruitment' | 'media' | 'slider' | 'page'
  title: string
  description: string
  url: string
  date?: string
  category?: string
  featured?: boolean
}

interface SearchResponse {
  success: boolean
  results: SearchResult[]
  total: number
  query: string
  types: {
    news: number
    notices: number
    tenders: number
    recruitments: number
    media: number
    pages: number
  }
}

const typeIcons = {
  news: Newspaper,
  notice: FileText,
  tender: AlertCircle,
  recruitment: Users,
  media: Camera,
  slider: Globe,
  achievement: Globe,
  page: Globe
}

const typeColors = {
  news: "bg-blue-100 text-blue-800",
  notice: "bg-green-100 text-green-800",
  tender: "bg-orange-100 text-orange-800",
  recruitment: "bg-purple-100 text-purple-800",
  media: "bg-pink-100 text-pink-800",
  slider: "bg-gray-100 text-gray-800",
  achievement: "bg-yellow-100 text-yellow-800",
  page: "bg-indigo-100 text-indigo-800"
}

const typeLabels = {
  news: "News",
  notice: "Notice",
  tender: "Tender",
  recruitment: "Recruitment",
  media: "Media",
  slider: "Slider",
  achievement: "Achievement",
  page: "Page"
}

export default function SearchPage() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const performSearch = async (searchQuery: string, type?: string) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('q', searchQuery)
      if (type) params.set('type', type)
      params.set('limit', '50')

      const response = await fetch(`/api/search?${params}`)
      const data = await response.json()
      
      if (data.success) {
        setResults(data.results)
        setSearchResponse(data)
      } else {
        setResults([])
        setSearchResponse(null)
      }
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
      setSearchResponse(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (query) {
      performSearch(query, selectedType || undefined)
    }
  }, [query, selectedType])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      performSearch(query.trim(), selectedType || undefined)
    }
  }

  const clearFilters = () => {
    setSelectedType(null)
    if (query) {
      performSearch(query)
    }
  }

  const highlightText = (text: string, query: string) => {
    if (!query) return text
    
    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : part
    )
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const filteredResults = selectedType 
    ? results.filter(result => result.type === selectedType)
    : results

  return (
    <>
      <SearchHeader />
      <div className="min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
          {/* Search Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">
              Search Results
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find information across all sections of the Pune Customs website
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Search for notices, news, forms, services..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <Button type="submit" size="lg" disabled={loading}>
                  <Search className="mr-2 h-4 w-4" />
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Search Results Summary */}
          {searchResponse && (
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <h2 className="text-xl font-semibold">
                  {searchResponse.total} results for "{searchResponse.query}"
                </h2>
                
                {/* Type Filters */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedType === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(null)}
                  >
                    All ({searchResponse.total})
                  </Button>
                  {Object.entries(searchResponse.types).map(([type, count]) => (
                    count > 0 && (
                      <Button
                        key={type}
                        variant={selectedType === type ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedType(type)}
                      >
                        {typeLabels[type as keyof typeof typeLabels]} ({count})
                      </Button>
                    )
                  ))}
                </div>

                {selectedType && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Search Results */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="space-y-4">
              {filteredResults.map((result, index) => {
                const Icon = typeIcons[result.type]
                const colorClass = typeColors[result.type]
                
                return (
                  <Card key={`${result.type}-${result.id}`} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`p-2 rounded-lg ${colorClass}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="text-lg font-semibold text-primary line-clamp-2">
                              {highlightText(result.title, searchResponse?.query || '')}
                            </h3>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Badge variant="secondary" className={colorClass}>
                                {typeLabels[result.type]}
                              </Badge>
                              {result.featured && (
                                <Badge variant="default">Featured</Badge>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-3 line-clamp-2">
                            {highlightText(result.description, searchResponse?.query || '')}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              {result.date && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {formatDate(result.date)}
                                </div>
                              )}
                              {result.category && (
                                <span>{result.category}</span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {result.url.startsWith('http') ? (
                                <a
                                  href={result.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-primary hover:underline"
                                >
                                  View <ExternalLink className="h-4 w-4" />
                                </a>
                              ) : (
                                <Link
                                  href={result.url}
                                  className="inline-flex items-center gap-1 text-primary hover:underline"
                                >
                                  View
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : query ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  We couldn't find any results for "{query}". Try different keywords or check your spelling.
                </p>
                <Button onClick={() => setQuery('')} variant="outline">
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Search the website</h3>
                <p className="text-muted-foreground">
                  Enter a search term above to find information across notices, news, forms, and more.
                </p>
              </CardContent>
            </Card>
          )}
          </div>
        </div>
      </div>
    </>
  )
}
