import {LOAD_MOVIES, ORDER_BY} from '../../actionTypes'
import topRatedMovies from '../mocks/topTatedMovies'

export function fetchTopRatedMovies() {
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
