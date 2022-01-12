import {LOAD_MOVIES, ORDER_BY, ADD_MOVIE_FAVOURITE, REMOVE_MOVIE_FAVOURITE} from '../../../actionTypes'

const initialState = {
  allMovies: [],
  favouriteMovies: []
}

export default function (state = initialState, action) {
  const {type, payload} = action
  switch (type) {

    case LOAD_MOVIES:
      const newAllMovies = [...state.allMovies, ...payload]
      // This is to not add duplicates because sometimes the api sends the same movie in 2 different pages
      var result = newAllMovies.filter(function(e) {
        let key = Object.keys(e).map(k => e[k]).join('|');
        if (!this[key]) {
          this[key] = true;
          return true;
        }
      }, {});
      return {
        ...state,
        allMovies: result
      }

    case ORDER_BY:
      let stateCopy = [...state.allMovies]
      let sortedMovies
      switch (payload) {
        case "name-asc":
          sortedMovies = sortingFunction(stateCopy, "asc", "title")
          break;
        case "name-desc":
          sortedMovies = sortingFunction(stateCopy, "desc", "title")
          break;
        case "rating-asc":
          sortedMovies = sortingFunction(stateCopy, "asc", "vote_average")
          break;
        case "rating-desc":
          sortedMovies = sortingFunction(stateCopy, "desc", "vote_average")
          break;
        case "date-asc":
          sortedMovies = sortingFunction(stateCopy, "asc", "release_date")
          break;  
        case "date-desc":
          sortedMovies = sortingFunction(stateCopy, "desc", "release_date")
          break;
        default:
          break;
      }
      return {
        ...state,
        allMovies: sortedMovies
      }

    case ADD_MOVIE_FAVOURITE:
      return {
        ...state,
        favouriteMovies: [...state.favouriteMovies, payload]
      }
    
    case REMOVE_MOVIE_FAVOURITE:
      const newFavourites = state.favouriteMovies.filter(movieId => movieId !== payload)
      return {
        ...state,
        favouriteMovies: newFavourites
      }
    default:
      return state
  }
}

// Function to sort an array, takes type(asc or desc) and the prop to order by
const sortingFunction = (array, type, prop) => {
  if (type === "asc") {
    return array.sort((a, b) => {
      if (a[prop] > b[prop]) {
        return 1
      }
      if (a[prop] < b[prop]) {
        return -1
      }
      return 0
    })
  } else {
    return array.sort((a, b) => {
      if (a[prop] > b[prop]) {
        return -1
      }
      if (a[prop] < b[prop]) {
        return 1
      }
      return 0
    })
  }
}
