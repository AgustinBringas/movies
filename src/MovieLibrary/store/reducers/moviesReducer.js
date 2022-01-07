import {LOAD_MOVIES, ORDER_BY} from '../../../actionTypes'

const initialState = []

export default function (state = initialState, action) {
  const {type, payload} = action
  switch (type) {

    case LOAD_MOVIES:
      return [...state, ...payload]

    case ORDER_BY:
      let stateCopy = [...state]
      if (payload === "name-asc") {
        return sortingFunction(stateCopy, "asc", "title")
      } else if(payload === "name-desc") {
        return sortingFunction(stateCopy, "desc", "title")
      } else if(payload === "rating-asc") {
        return sortingFunction(stateCopy, "asc", "vote_average")
      } else if(payload === "rating-desc") {
        return sortingFunction(stateCopy, "desc", "vote_average")
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
