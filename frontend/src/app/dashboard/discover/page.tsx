"use client"

import { useState, useEffect, useCallback, useRef } from "react"

import {
  Search, Star, BookOpen, ExternalLink, Filter, ChevronDown,
  SortAsc, Globe, Download, X, TrendingUp, Clock, AlignLeft, Users, Bookmark
} from "lucide-react"

// ─── Types ──────────────────────────────────────────────────────────────────
interface Book {
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

interface Genre { name: string; count: number }

// ─── (no emoji map) ──────────────────────────────────────────────────────────

// ─── Google search links ─────────────────────────────────────────────────────
function getDownloadLinks(title: string, authors: string) {
  const query = encodeURIComponent(`"${title}" ${authors} free ebook pdf download`)
  return [
    { label: "Google Search", url: `https://www.google.com/search?q=${query}`, color: "#4285f4" },
    { label: "Google Books", url: `https://www.google.com/search?q=${encodeURIComponent(title + " " + authors)}&tbm=bks`, color: "#34a853" },
    { label: "Internet Archive", url: `https://archive.org/search?query=${encodeURIComponent(title + " " + authors)}`, color: "#f4a261" },
    { label: "Open Library", url: `https://openlibrary.org/search?q=${encodeURIComponent(title + " " + authors)}`, color: "#e63946" },
    { label: "Z-Library", url: `https://www.google.com/search?q=site:z-lib.org+${encodeURIComponent(title)}`, color: "#8b5cf6" },
  ]
}

// ─── Star rating display ─────────────────────────────────────────────────────
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

// ─── Book card ───────────────────────────────────────────────────────────────
function BookCard({ book, onClick, isBookmarked, onToggleBookmark }: { book: Book; onClick: () => void; isBookmarked: boolean; onToggleBookmark: (e: React.MouseEvent, isbn13: string) => void }) {
  const [imgError, setImgError] = useState(false)
  const rating = parseFloat(book.average_rating || "0")

  return (
    <div className="discover-book-card" onClick={onClick}>
      {/* Cover */}
      <div className="discover-book-cover">
        {book.thumbnail && !imgError ? (
          <img
            src={book.thumbnail}
            alt={book.title}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div className="discover-book-cover-placeholder">
            <BookOpen size={28} />
            <span style={{ fontSize: 10, marginTop: 6, textAlign: "center", padding: "0 8px", opacity: 0.7 }}>
              {book.title}
            </span>
          </div>
        )}
        <div className="discover-book-cover-overlay">
          <span className="discover-book-view-btn">View Details</span>
        </div>
        <button 
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${isBookmarked ? 'bg-primary-500 text-white' : 'bg-black/30 text-white hover:bg-black/50'}`}
          onClick={(e) => onToggleBookmark(e, book.isbn13)}
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
        </button>
      </div>
      {/* Info */}
      <div className="discover-book-info">
        <p className="discover-book-title" title={book.title}>{book.title}</p>
        <p className="discover-book-author">{book.authors?.split(";")[0]}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
          <StarRating rating={rating} />
          {book.published_year && (
            <span style={{ fontSize: 10, color: "rgba(232,234,246,0.35)" }}>{book.published_year}</span>
          )}
        </div>
        {book.categories && (
          <span className="discover-book-genre-tag">{book.categories.split(",")[0].trim()}</span>
        )}
      </div>
    </div>
  )
}

// ─── Book detail modal ────────────────────────────────────────────────────────
function BookModal({ book, onClose }: { book: Book; onClose: () => void }) {
  const [imgError, setImgError] = useState(false)
  const links = getDownloadLinks(book.title, book.authors)
  const rating = parseFloat(book.average_rating || "0")

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={18} /></button>

        <div className="modal-top">
          {/* Cover */}
          <div className="modal-cover">
            {book.thumbnail && !imgError ? (
              <img src={book.thumbnail} alt={book.title} onError={() => setImgError(true)}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }} />
            ) : (
              <div className="modal-cover-placeholder"><BookOpen size={36} /></div>
            )}
          </div>

          {/* Meta */}
          <div className="modal-meta">
            <span className="modal-genre-badge">{book.categories?.split(",")[0]?.trim() || "Book"}</span>
            <h2 className="modal-title">{book.title}</h2>
            {book.subtitle && <p className="modal-subtitle">{book.subtitle}</p>}
            <p className="modal-author">by {book.authors?.replace(/;/g, ", ")}</p>

            <div className="modal-stats-row">
              <div className="modal-stat">
                <Star size={13} style={{ color: "#f59e0b" }} />
                <span>{rating.toFixed(2)}</span>
              </div>
              {book.ratings_count && (
                <div className="modal-stat">
                  <Users size={13} />
                  <span>{parseInt(book.ratings_count).toLocaleString()} ratings</span>
                </div>
              )}
              {book.num_pages && (
                <div className="modal-stat">
                  <AlignLeft size={13} />
                  <span>{book.num_pages} pages</span>
                </div>
              )}
              {book.published_year && (
                <div className="modal-stat">
                  <Clock size={13} />
                  <span>{book.published_year}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {book.description && (
          <div className="modal-description">
            <h3>About this book</h3>
            <p>{book.description.slice(0, 600)}{book.description.length > 600 ? "..." : ""}</p>
          </div>
        )}

        {/* Download links */}
        <div className="modal-links-section">
          <h3 className="modal-links-title">
            <Download size={16} /> Find & Download PDF / eBook
          </h3>
          <p className="modal-links-sub">Search across multiple sources to find a free or purchasable copy</p>
          <div className="modal-links-grid">
            {links.map(link => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-link-btn"
                style={{ borderColor: link.color + "44", color: link.color }}
              >
                <Globe size={14} />
                {link.label}
                <ExternalLink size={11} style={{ marginLeft: "auto", opacity: 0.6 }} />
              </a>
            ))}
          </div>
          <p className="modal-links-note">
            Links open a Google / site search for this book. Availability may vary.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function DiscoverPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenre, setSelectedGenre] = useState("")
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("rating")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [showSortMenu, setShowSortMenu] = useState(false)
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [bookmarkedIsbns, setBookmarkedIsbns] = useState<string[]>([])

  // Load bookmarks
  useEffect(() => {
    const fetchBookmarks = async () => {
      const token = localStorage.getItem("token")
      if (!token) return
      try {
        const { API_BASE } = await import('@/app/utils/api')
        const res = await fetch(`${API_BASE}/bookmarks`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setBookmarkedIsbns(data.discoveryBooks || [])
        }
      } catch (e) {}
    }
    fetchBookmarks()
  }, [])

  const handleToggleBookmark = async (e: React.MouseEvent, isbn13: string) => {
    e.stopPropagation()
    const token = localStorage.getItem("token")
    if (!token) return
    try {
      const { API_BASE } = await import('@/app/utils/api')
      const res = await fetch(`${API_BASE}/bookmarks/toggle`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ type: "discovery", id: isbn13 })
      })
      if (res.ok) {
        const data = await res.json()
        setBookmarkedIsbns(prev => 
          data.isBookmarked 
            ? [...prev, isbn13] 
            : prev.filter(id => id !== isbn13)
        )
      }
    } catch (error) {
      console.error("Error toggling bookmark", error)
    }
  }

  // Load genres once
  useEffect(() => {
    fetch("/api/books?genres=true")
      .then(r => r.json())
      .then(d => setGenres(d.genres || []))
  }, [])

  // Load books
  const loadBooks = useCallback(async (pg = 1) => {
    setLoading(true)
    const params = new URLSearchParams({
      page: String(pg), limit: "24", sort,
      ...(selectedGenre && { genre: selectedGenre }),
      ...(search && { search }),
    })
    const res = await fetch(`/api/books?${params}`)
    const data = await res.json()
    setBooks(data.books || [])
    setTotalPages(data.totalPages || 1)
    setTotal(data.total || 0)
    setPage(pg)
    setLoading(false)
  }, [selectedGenre, search, sort])

  useEffect(() => {
    if (searchRef.current) clearTimeout(searchRef.current)
    searchRef.current = setTimeout(() => loadBooks(1), 350)
    return () => { if (searchRef.current) clearTimeout(searchRef.current) }
  }, [loadBooks])

  const sortOptions = [
    { value: "rating", label: "Top Rated", icon: Star },
    { value: "popular", label: "Most Popular", icon: TrendingUp },
    { value: "newest", label: "Newest First", icon: Clock },
    { value: "title", label: "A–Z Title", icon: SortAsc },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');

        .discover-root { background:#050510; min-height:100vh; font-family:'Inter',sans-serif; color:#e8eaf6; }

        /* ── Header ── */
        .discover-header {
          background:rgba(5,5,16,0.92); backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(255,255,255,0.06);
          padding:28px 32px 0; position:sticky; top:0; z-index:40;
        }
        .discover-header-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px; }
        .discover-heading { font-family:'Plus Jakarta Sans',sans-serif; font-size:1.8rem; font-weight:800; letter-spacing:-0.5px; background:linear-gradient(135deg,#a5b4fc,#818cf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .discover-sub { color:rgba(232,234,246,0.45); font-size:0.85rem; margin-top:2px; }
        .discover-total-badge { padding:5px 14px; border-radius:50px; background:rgba(99,102,241,0.12); border:1px solid rgba(99,102,241,0.25); color:#a5b4fc; font-size:0.78rem; font-weight:600; white-space:nowrap; }

        /* ── Search + Sort bar ── */
        .discover-toolbar { display:flex; gap:10px; align-items:center; margin-bottom:16px; flex-wrap:wrap; }
        .discover-search-wrap { position:relative; flex:1; min-width:220px; }
        .discover-search-icon { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:rgba(232,234,246,0.35); pointer-events:none; }
        .discover-search { width:100%; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.09); border-radius:12px; padding:11px 14px 11px 40px; color:#e8eaf6; font-size:0.9rem; outline:none; transition:all 0.2s ease; font-family:inherit; }
        .discover-search::placeholder { color:rgba(232,234,246,0.3); }
        .discover-search:focus { border-color:rgba(99,102,241,0.5); background:rgba(99,102,241,0.06); box-shadow:0 0 0 3px rgba(99,102,241,0.1); }
        .discover-sort-wrap { position:relative; }
        .discover-sort-btn { display:flex; align-items:center; gap:7px; padding:11px 16px; border-radius:12px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.09); color:rgba(232,234,246,0.7); font-size:0.86rem; cursor:pointer; transition:all 0.2s ease; white-space:nowrap; font-family:inherit; }
        .discover-sort-btn:hover { background:rgba(99,102,241,0.1); border-color:rgba(99,102,241,0.3); color:#e8eaf6; }
        .discover-sort-menu { position:absolute; top:calc(100% + 8px); right:0; background:#0e0e20; border:1px solid rgba(255,255,255,0.1); border-radius:14px; padding:6px; min-width:180px; z-index:100; box-shadow:0 16px 48px rgba(0,0,0,0.6); animation:fadeSlideUp 0.15s ease; }
        .discover-sort-item { display:flex; align-items:center; gap:9px; padding:9px 14px; border-radius:9px; font-size:0.85rem; color:rgba(232,234,246,0.65); cursor:pointer; transition:all 0.15s ease; }
        .discover-sort-item:hover,.discover-sort-item.active { background:rgba(99,102,241,0.15); color:#a5b4fc; }

        /* ── Genre tabs ── */
        .discover-genres { display:flex; gap:8px; overflow-x:auto; padding-bottom:16px; scrollbar-width:none; }
        .discover-genres::-webkit-scrollbar { display:none; }
        .discover-genre-pill { display:flex; align-items:center; gap:6px; padding:7px 16px; border-radius:50px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); color:rgba(232,234,246,0.55); font-size:0.78rem; font-weight:600; cursor:pointer; white-space:nowrap; transition:all 0.2s ease; flex-shrink:0; }
        .discover-genre-pill:hover { background:rgba(99,102,241,0.08); border-color:rgba(99,102,241,0.25); color:#a5b4fc; transform:translateY(-1px); }
        .discover-genre-pill.active { background:linear-gradient(135deg,rgba(99,102,241,0.25),rgba(139,92,246,0.2)); border-color:rgba(99,102,241,0.5); color:#c4b5fd; box-shadow:0 4px 16px rgba(99,102,241,0.2); }
        .discover-genre-count { font-size:10px; background:rgba(99,102,241,0.2); padding:1px 6px; border-radius:50px; color:#818cf8; }

        /* ── Grid ── */
        .discover-content { padding:28px 32px; }
        .discover-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(175px,1fr)); gap:20px; }

        /* ── Book card ── */
        .discover-book-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:16px; overflow:hidden; cursor:pointer; transition:all 0.3s cubic-bezier(0.4,0,0.2,1); animation:fadeSlideUp 0.4s ease both; }
        .discover-book-card:hover { transform:translateY(-6px); border-color:rgba(99,102,241,0.3); box-shadow:0 16px 48px rgba(99,102,241,0.15); background:rgba(99,102,241,0.05); }
        .discover-book-cover { height:220px; position:relative; overflow:hidden; background:#0d0d1f; }
        .discover-book-cover img { transition:transform 0.4s ease; }
        .discover-book-card:hover .discover-book-cover img { transform:scale(1.05); }
        .discover-book-cover-placeholder { width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.1)); color:rgba(99,102,241,0.6); }
        .discover-book-cover-overlay { position:absolute; inset:0; background:rgba(5,5,16,0.8); display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity 0.2s ease; }
        .discover-book-card:hover .discover-book-cover-overlay { opacity:1; }
        .discover-book-view-btn { padding:8px 20px; border-radius:50px; background:linear-gradient(135deg,#6366f1,#8b5cf6); color:#fff; font-size:0.8rem; font-weight:700; }
        .discover-book-info { padding:14px; }
        .discover-book-title { font-size:0.86rem; font-weight:700; color:#e8eaf6; line-height:1.3; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; margin-bottom:4px; }
        .discover-book-author { font-size:0.75rem; color:rgba(232,234,246,0.4); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .discover-book-genre-tag { display:inline-block; margin-top:8px; padding:2px 10px; border-radius:50px; background:rgba(99,102,241,0.1); border:1px solid rgba(99,102,241,0.2); color:#818cf8; font-size:0.68rem; font-weight:600; max-width:100%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }

        /* ── Pagination ── */
        .discover-pagination { display:flex; align-items:center; justify-content:center; gap:8px; margin-top:40px; flex-wrap:wrap; }
        .discover-page-btn { padding:8px 16px; border-radius:10px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); color:rgba(232,234,246,0.6); font-size:0.83rem; cursor:pointer; transition:all 0.2s; font-family:inherit; }
        .discover-page-btn:hover { background:rgba(99,102,241,0.1); color:#a5b4fc; }
        .discover-page-btn.active { background:linear-gradient(135deg,#6366f1,#8b5cf6); border:none; color:#fff; font-weight:700; }
        .discover-page-btn:disabled { opacity:0.3; cursor:default; }

        /* ── Loading ── */
        .discover-loading { display:flex; align-items:center; justify-content:center; padding:80px 0; flex-direction:column; gap:16px; }
        .discover-spinner { width:40px; height:40px; border:3px solid rgba(99,102,241,0.2); border-top-color:#6366f1; border-radius:50%; animation:spin 0.7s linear infinite; }
        @keyframes spin { to { transform:rotate(360deg); } }

        /* ── Empty state ── */
        .discover-empty { text-align:center; padding:80px 20px; }
        .discover-empty-icon { width:72px; height:72px; border-radius:50%; background:rgba(99,102,241,0.1); border:1px solid rgba(99,102,241,0.2); display:flex; align-items:center; justify-content:center; margin:0 auto 16px; color:#6366f1; }

        /* ── Modal ── */
        .modal-backdrop { position:fixed; inset:0; background:rgba(0,0,0,0.7); backdrop-filter:blur(8px); z-index:200; display:flex; align-items:center; justify-content:center; padding:20px; animation:fadeIn 0.15s ease; }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .modal-card { background:#0e0e22; border:1px solid rgba(255,255,255,0.1); border-radius:24px; max-width:780px; width:100%; max-height:90vh; overflow-y:auto; padding:32px; position:relative; animation:fadeSlideUp 0.25s ease; scrollbar-width:thin; scrollbar-color:rgba(99,102,241,0.3) transparent; }
        .modal-close { position:absolute; top:20px; right:20px; width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.1); color:rgba(232,234,246,0.6); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s; }
        .modal-close:hover { background:rgba(239,68,68,0.15); color:#f87171; }
        .modal-top { display:flex; gap:24px; margin-bottom:24px; }
        .modal-cover { width:140px; height:200px; border-radius:12px; overflow:hidden; flex-shrink:0; background:linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.15)); }
        .modal-cover-placeholder { width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:rgba(99,102,241,0.5); }
        .modal-meta { flex:1; min-width:0; }
        .modal-genre-badge { display:inline-block; padding:3px 12px; border-radius:50px; background:rgba(99,102,241,0.12); border:1px solid rgba(99,102,241,0.25); color:#818cf8; font-size:0.72rem; font-weight:700; letter-spacing:0.05em; text-transform:uppercase; margin-bottom:10px; }
        .modal-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:1.4rem; font-weight:800; color:#e8eaf6; letter-spacing:-0.3px; line-height:1.2; margin-bottom:6px; }
        .modal-subtitle { font-size:0.9rem; color:rgba(232,234,246,0.45); margin-bottom:8px; }
        .modal-author { font-size:0.88rem; color:#818cf8; margin-bottom:16px; font-weight:500; }
        .modal-stats-row { display:flex; flex-wrap:wrap; gap:10px; }
        .modal-stat { display:flex; align-items:center; gap:5px; padding:5px 12px; border-radius:50px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); font-size:0.78rem; color:rgba(232,234,246,0.6); }
        .modal-description { border-top:1px solid rgba(255,255,255,0.07); padding-top:20px; margin-bottom:24px; }
        .modal-description h3 { font-size:0.85rem; font-weight:700; color:rgba(232,234,246,0.4); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:10px; }
        .modal-description p { font-size:0.9rem; color:rgba(232,234,246,0.65); line-height:1.75; }
        .modal-links-section { border-top:1px solid rgba(255,255,255,0.07); padding-top:20px; }
        .modal-links-title { display:flex; align-items:center; gap:8px; font-size:1rem; font-weight:700; color:#e8eaf6; margin-bottom:6px; }
        .modal-links-sub { font-size:0.82rem; color:rgba(232,234,246,0.4); margin-bottom:14px; }
        .modal-links-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); gap:10px; margin-bottom:12px; }
        .modal-link-btn { display:flex; align-items:center; gap:8px; padding:10px 14px; border-radius:12px; background:rgba(255,255,255,0.03); border:1px solid; font-size:0.8rem; font-weight:600; text-decoration:none; transition:all 0.2s ease; }
        .modal-link-btn:hover { background:rgba(255,255,255,0.07); transform:translateY(-1px); }
        .modal-links-note { font-size:0.76rem; color:rgba(232,234,246,0.3); line-height:1.5; }

        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        @media(max-width:768px) {
          .discover-header { padding:20px 16px 0; }
          .discover-content { padding:20px 16px; }
          .modal-top { flex-direction:column; align-items:center; }
          .modal-cover { width:120px; height:170px; }
          .modal-title { font-size:1.2rem; text-align:center; }
          .modal-author,.modal-genre-badge { text-align:center; display:block; }
          .modal-stats-row { justify-content:center; }
        }
      `}</style>

      <div className="discover-root">
        {/* ── Sticky header ── */}
        <div className="discover-header">
          <div className="discover-header-top">
            <div>
              <h1 className="discover-heading">Discover Books</h1>
              <p className="discover-sub">Browse 6,800+ books across 50+ genres · Find PDFs & eBooks</p>
            </div>
            <span className="discover-total-badge">{total.toLocaleString()} books found</span>
          </div>

          {/* Search + Sort */}
          <div className="discover-toolbar">
            <div className="discover-search-wrap">
              <Search size={16} className="discover-search-icon" />
              <input
                className="discover-search"
                placeholder="Search by title, author or keyword..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                id="discover-search-input"
              />
            </div>

            <div className="discover-sort-wrap">
              <button
                className="discover-sort-btn"
                onClick={() => setShowSortMenu(v => !v)}
                id="discover-sort-btn"
              >
                <Filter size={14} />
                {sortOptions.find(s => s.value === sort)?.label}
                <ChevronDown size={13} />
              </button>
              {showSortMenu && (
                <div className="discover-sort-menu">
                  {sortOptions.map(opt => {
                    const Icon = opt.icon
                    return (
                      <div
                        key={opt.value}
                        className={`discover-sort-item ${sort === opt.value ? "active" : ""}`}
                        onClick={() => { setSort(opt.value); setShowSortMenu(false) }}
                      >
                        <Icon size={14} /> {opt.label}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Genre pills */}
          <div className="discover-genres">
            <div
              className={`discover-genre-pill ${selectedGenre === "" ? "active" : ""}`}
              onClick={() => setSelectedGenre("")}
            >
              All Genres
              <span className="discover-genre-count">6811</span>
            </div>
            {genres.map(g => (
              <div
                key={g.name}
                className={`discover-genre-pill ${selectedGenre === g.name ? "active" : ""}`}
                onClick={() => setSelectedGenre(prev => prev === g.name ? "" : g.name)}
              >
                {g.name}
                <span className="discover-genre-count">{g.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="discover-content">
          {loading ? (
            <div className="discover-loading">
              <div className="discover-spinner" />
              <p style={{ color: "rgba(232,234,246,0.4)", fontSize: "0.9rem" }}>Loading books...</p>
            </div>
          ) : books.length === 0 ? (
            <div className="discover-empty">
              <div className="discover-empty-icon"><BookOpen size={28} /></div>
              <h3 style={{ color: "#e8eaf6", marginBottom: 8 }}>No books found</h3>
              <p style={{ color: "rgba(232,234,246,0.4)", fontSize: "0.9rem" }}>
                Try a different genre or search term
              </p>
              <button
                onClick={() => { setSearch(""); setSelectedGenre("") }}
                style={{
                  marginTop: 20, padding: "10px 24px", borderRadius: 50,
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none",
                  color: "#fff", fontWeight: 700, cursor: "pointer"
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="discover-grid">
                {books.map((book, i) => (
                  <div key={book.isbn13 || i} style={{ animationDelay: `${(i % 24) * 0.03}s` }}>
                    <BookCard 
                      book={book} 
                      onClick={() => setSelectedBook(book)} 
                      isBookmarked={bookmarkedIsbns.includes(book.isbn13)}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="discover-pagination">
                  <button
                    className="discover-page-btn"
                    disabled={page === 1}
                    onClick={() => loadBooks(page - 1)}
                  >← Prev</button>

                  {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                    let p: number
                    if (totalPages <= 7) p = i + 1
                    else if (page <= 4) p = i + 1
                    else if (page >= totalPages - 3) p = totalPages - 6 + i
                    else p = page - 3 + i
                    return (
                      <button
                        key={p}
                        className={`discover-page-btn ${p === page ? "active" : ""}`}
                        onClick={() => loadBooks(p)}
                      >{p}</button>
                    )
                  })}

                  <button
                    className="discover-page-btn"
                    disabled={page === totalPages}
                    onClick={() => loadBooks(page + 1)}
                  >Next →</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── Book detail modal ── */}
      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </>
  )
}
