import './App.css'
import { useCallback, useState } from 'react'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [sort, setSort] = useState(false)
  const { movies, loading, getMovies } = useMovies({ searchInput, sort })

  const debouncedGetMovies = useCallback(
    debounce(queryInput => {
      getMovies({searchInput: queryInput})
    }, 200), [])

  async function handleSubmit(event) {
    event.preventDefault()
    getMovies({searchInput})
  }

  const handleSort = () => {
    setSort(!sort)
  }

  async function handleChange(event) {
    const query = event.currentTarget.value
    setSearchInput(query)
    debouncedGetMovies(query)
  }

  return (
    <div>
      <h1>@midudev React movie challenge</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Busqueda</p>
          <input
            name='query'
            onChange={handleChange}
            value={searchInput}
          />
        </label>
        <label>
          Sort
          <input type='checkbox' onChange={handleSort} checked={sort} />
        </label>
          <button>Buscar</button>
      </form>
      <main>
        {loading 
        ? <p>Loading...</p>
        : (
        <ul className='movies-list'>
          {movies?.map((movie) => (
              <li
                className='movies-item'
                key={movie.imdbID}>
                <p>
                  {movie.Title}, {movie.Year}
                </p>
                <img src={movie.Poster} />
              </li>
            ))}
        </ul>
        )
      }
      </main>
    </div>
  )
}

export default App

