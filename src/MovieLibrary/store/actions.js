import {LOAD_MOVIES, ORDER_BY, ADD_MOVIE_FAVOURITE, REMOVE_MOVIE_FAVOURITE} from '../../actionTypes'

const API_KEY = "54ffed57deb5a7a8688be4de3007e578"

export function fetchFirstMovies() {
  return function(dispatch) {
    let allMovies = []
    let promiseArray = []
    let jsonArray = []

    for (let i = 1; i < 4; i++) {
      promiseArray.push(fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${i}`))
    }
    
    Promise.all(promiseArray).then(results => {
      results.forEach(item => {
        jsonArray.push(item.json())
      })
      Promise.all(jsonArray).then(jsons => {
        jsons.forEach(json => {
          allMovies = [...allMovies, ...json.results]
        })
        dispatch({ type: LOAD_MOVIES, payload: allMovies })
      })
    })
  }
}

export function getMoreMovies(pageNumber) {
  return function(dispatch) {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${pageNumber}`)
    .then(response => response.json())
    .then(json => {
        dispatch({ type: LOAD_MOVIES, payload: json.results })
    })
  }
}

export function orderMoviesBy(payload) {
  return {
    type: ORDER_BY,
    payload: payload
  }
}

export function addMovieFavourite(movieId) {
  return {
    type: ADD_MOVIE_FAVOURITE,
    payload: movieId
  }
}

export function removeMovieFavourite(movieId) {
  return {
    type: REMOVE_MOVIE_FAVOURITE,
    payload: movieId
  }
}