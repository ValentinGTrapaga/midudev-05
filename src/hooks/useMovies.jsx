import { useState, useRef, useMemo, useCallback } from 'react'
import { fetchMovies } from '../services/fetchMovies'

export function useMovies({ searchInput , sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const previousSearch = useRef(searchInput)

  const getMovies = useCallback(async ({ searchInput }) => {
    if (searchInput === previousSearch.current) return
    try {
      setLoading(true)
      previousSearch.current = searchInput
      const newMovies = await fetchMovies(searchInput)
      setMovies(newMovies)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  const sortedMovies = useMemo(() => {
    return sort
    ? [...movies].sort((a, b) => a.Title.localeCompare(b.Title))
    : movies
  }, [sort, movies])

  return { movies: sortedMovies, loading, getMovies }
}
