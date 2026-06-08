import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export interface Book {
  isbn13: string
  isbn10: string
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

function parseCSV(content: string): Book[] {
  const lines = content.split("\n")
  const headers = lines[0].split(",")
  const books: Book[] = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const values: string[] = []
    let current = ""
    let inQuotes = false

    for (let j = 0; j < line.length; j++) {
      const char = line[j]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === "," && !inQuotes) {
        values.push(current.trim())
        current = ""
      } else {
        current += char
      }
    }
    values.push(current.trim())

    if (values.length >= 6) {
      books.push({
        isbn13: values[0] || "",
        isbn10: values[1] || "",
        title: values[2] || "",
        subtitle: values[3] || "",
        authors: values[4] || "",
        categories: values[5] || "",
        thumbnail: values[6] || "",
        description: values[7] || "",
        published_year: values[8] || "",
        average_rating: values[9] || "",
        num_pages: values[10] || "",
        ratings_count: values[11] || "",
      })
    }
  }

  return books
}

let cachedBooks: Book[] | null = null

function getBooks(): Book[] {
  if (cachedBooks) return cachedBooks
  const csvPath = path.join(process.cwd(), "data.csv")
  const content = fs.readFileSync(csvPath, "utf-8")
  cachedBooks = parseCSV(content)
  return cachedBooks
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const genre = searchParams.get("genre") || ""
  const search = searchParams.get("search") || ""
  const sort = searchParams.get("sort") || "rating"
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "24")
  const getGenres = searchParams.get("genres") === "true"

  const books = getBooks()

  if (getGenres) {
    const genreMap = new Map<string, number>()
    for (const book of books) {
      const cat = book.categories?.trim()
      if (cat) genreMap.set(cat, (genreMap.get(cat) || 0) + 1)
    }
    const genres = Array.from(genreMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 50)
      .map(([name, count]) => ({ name, count }))
    return NextResponse.json({ genres })
  }

  let filtered = books.filter((b) => b.title?.trim())

  const isbnsParam = searchParams.get("isbns")
  if (isbnsParam) {
    const isbns = isbnsParam.split(",")
    filtered = filtered.filter(b => isbns.includes(b.isbn13))
  }

  if (genre) {
    filtered = filtered.filter(
      (b) => b.categories?.toLowerCase().includes(genre.toLowerCase())
    )
  }

  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.authors?.toLowerCase().includes(q) ||
        b.description?.toLowerCase().includes(q)
    )
  }

  // Sort
  if (sort === "rating") {
    filtered.sort((a, b) => parseFloat(b.average_rating || "0") - parseFloat(a.average_rating || "0"))
  } else if (sort === "popular") {
    filtered.sort((a, b) => parseInt(b.ratings_count || "0") - parseInt(a.ratings_count || "0"))
  } else if (sort === "newest") {
    filtered.sort((a, b) => parseInt(b.published_year || "0") - parseInt(a.published_year || "0"))
  } else if (sort === "title") {
    filtered.sort((a, b) => a.title.localeCompare(b.title))
  }

  const total = filtered.length
  const start = (page - 1) * limit
  const paginated = filtered.slice(start, start + limit)

  return NextResponse.json({
    books: paginated,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  })
}
