import {LOAD_MOVIES, ORDER_BY} from '../../actionTypes'
import topRatedMovies from '../mocks/topTatedMovies'

const API_KEY = "54ffed57deb5a7a8688be4de3007e578"

export function fetchTopRatedMovies() {
  return function(dispatch) {
    let allMovies = []
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${1}`)
    .then(response => response.json())
    .then(json => {
        allMovies = [...allMovies, ...json.results]
    })
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${2}`)
    .then(response => response.json())
    .then(json => {
        allMovies = [...allMovies, ...json.results]
    })
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${3}`)
    .then(response => response.json())
    .then(json => {
        allMovies = [...allMovies, ...json.results]
        dispatch({ type: LOAD_MOVIES, payload: allMovies })
    })
}

  return {
    type: LOAD_MOVIES,
    payload: topRatedMovies
  }
}

export function orderMoviesBy(payload) {
  return {
    type: ORDER_BY,
    payload: payload
  }
}
