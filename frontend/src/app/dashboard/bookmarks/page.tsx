"use client"

import React, { useState, useEffect } from "react"
import { usePlayer } from "@/context/PlayerContext"
import { BookOpen, Star, Clock, X, Bookmark, ExternalLink, Globe, Download, Users, AlignLeft, Trash2 } from "lucide-react"

// Types
interface AudioBook {
  _id: string
  title: string
  audioUrl: string
  progress: number
  playbackSpeed: number
  duration?: number
}

interface DiscoveryBook {
  isbn13: string
  title: string
  subtitle: string
  authors: string
  categories: string
  thumbnail: string
  description: string
  published_year: string
  average_rating: string
  num_pages: string
  ratings_count: string
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{
          color: i <= Math.round(rating) ? "#f59e0b" : "rgba(255,255,255,0.15)",
          fontSize: 11
        }}>★</span>
      ))}
      <span style={{ fontSize: 11, color: "rgba(232,234,246,0.5)", marginLeft: 2 }}>{rating.toFixed(1)}</span>
    </div>
  )
}

function getDownloadLinks(title: string, authors: string) {
  const query = encodeURIComponent(`"${title}" ${authors} free ebook pdf download`)
  return [
    { label: "Google Search", url: `https://www.google.com/search?q=${query}`, color: "#4285f4" },
    { label: "Google Books", url: `https://www.google.com/search?q=${encodeURIComponent(title + " " + authors)}&tbm=bks`, color: "#34a853" },
    { label: "Internet Archive", url: `https://archive.org/search?query=${encodeURIComponent(title + " " + authors)}`, color: "#f4a261" },
  ]
}

export default function BookmarksPage() {
  const { playTrack } = usePlayer()
  const [activeTab, setActiveTab] = useState<"audio" | "discovery">("audio")
  const [audioBookmarks, setAudioBookmarks] = useState<AudioBook[]>([])
  const [discoveryBookmarks, setDiscoveryBookmarks] = useState<DiscoveryBook[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBook, setSelectedBook] = useState<DiscoveryBook | null>(null)

  const fetchBookmarks = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      if (!token) return

      const { API_BASE } = await import('@/app/utils/api')
      const res = await fetch(`${API_BASE}/bookmarks`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (res.ok) {
        const data = await res.json()
        setAudioBookmarks(data.audiobooks || [])

        // Fetch discovery books details
        if (data.discoveryBooks && data.discoveryBooks.length > 0) {
          const isbnsParam = data.discoveryBooks.join(",")
          const discRes = await fetch(`/api/books?isbns=${isbnsParam}&limit=100`)
          if (discRes.ok) {
            const discData = await discRes.json()
            setDiscoveryBookmarks(discData.books || [])
          }
        } else {
          setDiscoveryBookmarks([])
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookmarks()
  }, [])

  const handleRemoveAudioBookmark = async (id: string) => {
    const token = localStorage.getItem("token")
    if (!token) return
    try {
      const { API_BASE } = await import('@/app/utils/api')
      await fetch(`${API_BASE}/bookmarks/toggle`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ type: "audio", id })
      })
      setAudioBookmarks(prev => prev.filter(b => b._id !== id))
    } catch (e) {}
  }

  const handleRemoveDiscoveryBookmark = async (e: React.MouseEvent, isbn13: string) => {
    e.stopPropagation()
    const token = localStorage.getItem("token")
    if (!token) return
    try {
      const { API_BASE } = await import('@/app/utils/api')
      await fetch(`${API_BASE}/bookmarks/toggle`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ type: "discovery", id: isbn13 })
      })
      setDiscoveryBookmarks(prev => prev.filter(b => b.isbn13 !== isbn13))
      if (selectedBook?.isbn13 === isbn13) setSelectedBook(null)
    } catch (e) {}
  }

  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-8" style={{ backgroundColor: '#0f172a' }}>
      {/* Header */}
      <section className="relative animate-fade-in mb-8">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-3xl blur-3xl" />
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight font-outfit tracking-tight mb-1">
                  Bookmarks
                  <span className="block bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent font-outfit">Your Saved Collection</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-300 font-light leading-relaxed max-w-2xl font-inter mt-0">
                  Access your favorite audiobooks and books you want to read later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("audio")}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
            activeTab === "audio"
              ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25"
              : "bg-white/10 border border-white/20 text-gray-400 hover:border-white/40 hover:text-white"
          }`}
        >
          My Audiobooks ({audioBookmarks.length})
        </button>
        <button
          onClick={() => setActiveTab("discovery")}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
            activeTab === "discovery"
              ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25"
              : "bg-white/10 border border-white/20 text-gray-400 hover:border-white/40 hover:text-white"
          }`}
        >
          Discovery Books ({discoveryBookmarks.length})
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-20">
          <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="animate-slide-up">
          {activeTab === "audio" && (
            audioBookmarks.length === 0 ? (
              <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 max-w-lg mx-auto">
                <Bookmark size={40} className="mx-auto mb-4 text-primary-400" />
                <h2 className="text-2xl font-bold text-white mb-2">No audiobooks bookmarked</h2>
                <p className="text-gray-400 mb-6">Save your favorite generated audiobooks here for quick access.</p>
                <a href="/dashboard/audiobooks" className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold">
                  Go to Library
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {audioBookmarks.map((audio, index) => (
                  <div key={audio._id} className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:border-white/30 transition-all duration-300 hover:-translate-y-1">
                    <button 
                      onClick={() => handleRemoveAudioBookmark(audio._id)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-primary-500 text-white shadow-lg"
                    >
                      <Bookmark size={16} fill="currentColor" />
                    </button>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-4">
                      <BookOpen className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4 line-clamp-2">{audio.title}</h3>
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <span className="text-gray-400">Progress: {Math.floor(audio.progress)}s</span>
                    </div>
                    <button
                      onClick={() => playTrack(audio)}
                      className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Play Now
                    </button>
                  </div>
                ))}
              </div>
            )
          )}

          {activeTab === "discovery" && (
            discoveryBookmarks.length === 0 ? (
              <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 max-w-lg mx-auto">
                <Bookmark size={40} className="mx-auto mb-4 text-primary-400" />
                <h2 className="text-2xl font-bold text-white mb-2">No books bookmarked</h2>
                <p className="text-gray-400 mb-6">Discover new books and bookmark them to read or download later.</p>
                <a href="/dashboard/discover" className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold">
                  Discover Books
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {discoveryBookmarks.map(book => (
                  <div 
                    key={book.isbn13} 
                    className="relative bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-1"
                    onClick={() => setSelectedBook(book)}
                  >
                    <button 
                      onClick={(e) => handleRemoveDiscoveryBookmark(e, book.isbn13)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-primary-500 text-white z-10 shadow-lg"
                    >
                      <Bookmark size={14} fill="currentColor" />
                    </button>
                    <div className="h-48 bg-gray-900 relative">
                      {book.thumbnail ? (
                        <img src={book.thumbnail} alt={book.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/5">
                          <BookOpen className="text-gray-500" size={32} />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-white truncate">{book.title}</h3>
                      <p className="text-xs text-gray-400 truncate mt-1">{book.authors?.split(';')[0]}</p>
                      <div className="mt-2">
                        <StarRating rating={parseFloat(book.average_rating || "0")} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      )}

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedBook(null)}>
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors" onClick={() => setSelectedBook(null)}>
              <X size={20} />
            </button>
            
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="w-32 h-48 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                {selectedBook.thumbnail ? (
                  <img src={selectedBook.thumbnail} alt={selectedBook.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"><BookOpen size={32} className="text-gray-500" /></div>
                )}
              </div>
              <div>
                <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                  {selectedBook.categories?.split(',')[0]}
                </span>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedBook.title}</h2>
                <p className="text-gray-400 mb-4">{selectedBook.authors?.replace(/;/g, ', ')}</p>
                <div className="flex gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1"><Star size={14} className="text-yellow-500" /> {parseFloat(selectedBook.average_rating || "0").toFixed(1)}</div>
                  <div className="flex items-center gap-1"><Users size={14} /> {selectedBook.ratings_count || "0"} ratings</div>
                  <div className="flex items-center gap-1"><Clock size={14} /> {selectedBook.published_year}</div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {selectedBook.description}
            </p>

            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Download size={18} /> Find & Download
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {getDownloadLinks(selectedBook.title, selectedBook.authors).map(link => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg border border-white/10 hover:border-white/30 transition-all bg-white/5 hover:bg-white/10"
                    style={{ color: link.color }}
                  >
                    <span className="flex items-center gap-2 text-sm font-medium"><Globe size={14} /> {link.label}</span>
                    <ExternalLink size={12} className="opacity-50" />
                  </a>
                ))}
              </div>
              
              <button 
                onClick={(e) => handleRemoveDiscoveryBookmark(e, selectedBook.isbn13)}
                className="mt-6 flex items-center justify-center gap-2 w-full p-3 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all"
              >
                <Trash2 size={16} /> Remove from Bookmarks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
