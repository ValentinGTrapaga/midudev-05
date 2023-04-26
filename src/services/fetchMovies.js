const BASE_URL = 'https://www.omdbapi.com/?apikey=98cb4f2a&s='

export const fetchMovies = async (searchInput) => {
  if (searchInput === '') return null

  try {
    const response = await fetch(BASE_URL + searchInput)
    const { Search } = await response.json()
    return Search
  } catch (error) {
    console.error(error)
  }
}
