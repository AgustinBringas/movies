import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchFirstMovies, orderMoviesBy} from '../store/actions'
import { ReactComponent as MovieLogo } from './movie-logo.svg';
import './MovieLibrary.css'
import { getFavMovies, getMovies } from '../store/selectors'
import MoviesList from './MoviesList'

export default function MovieLibrary() {
  const dispatch = useDispatch()
  const [favOnly, setFavOnly] = useState(false)
  const [sortingType, setSortingType] = useState('')
  useEffect(() => {
    dispatch(fetchFirstMovies())
  }, [])
  const allMovies = useSelector(getMovies)
  const favMovies = useSelector(getFavMovies)

  // Sorting
  const handleSortingChange = event => {
    setSortingType(event.target.value)
    dispatch(orderMoviesBy(event.target.value))
  }

  // Favourites
  const showFavOnly = (e) => {
    const favCheck = document.getElementById("favCheck")
    setFavOnly(favCheck.checked)
  }

  
  return(
    <div className="MovieLibrary">
      <header className="ML-header">
        <div>
          <MovieLogo className="movie-logo"/>
        </div>
        <div className='filter-div'>
          <div className='sorting-options'>
            <span className='sort-text'>Sort by:  </span>
            <SortingOptions selectedOption={sortingType} onChange={handleSortingChange}/>
          </div>
          <div>
            <input type="checkbox" id="favCheck" onClick={(e) => showFavOnly(e)} value={favOnly}/>
            <label htmlFor="favCheck" className="label-fav-check">{favOnly ? "Show all movies" : "Show my favourite movies only"}</label>
          </div>
        </div>
      </header>
      <div className="ML-intro">
        { allMovies.length && <MoviesList allMovies={allMovies} favMovies={favMovies} favOnly={favOnly}/> }
      </div>
    </div>)
}


function SortingOptions ({ selectedOption, onChange }) {
  return (
    <select value={selectedOption} onChange={onChange} className="sorting-options">
      <option value="" disabled></option>
      <option value="name-asc">A to Z</option>
      <option value="name-desc">Z to A</option>
      <option value="rating-desc">Most rated</option>
      <option value="rating-asc">Less rated</option>
      <option value="date-desc">Newer movies</option>
      <option value="date-asc">Older movies</option>
    </select>
  )
}