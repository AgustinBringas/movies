import React, { useState, useRef, useEffect } from 'react'
import TMDBImage from './TMDBImage'
import './MoviesList.css'
import { ReactComponent as Star } from './star.svg';
import {useDispatch} from 'react-redux'
import {orderMoviesBy, getMoreMovies} from '../store/actions'


export default function MoviesList ({ movies }){

  const dispatch = useDispatch()
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [sortingType, setSortingType] = useState('')
  let [currentPage, setCurrentPage] = useState(4)
  const targetRef = useRef()
  const handleSortingChange = event => {
    setSortingType(event.target.value)
    dispatch(orderMoviesBy(event.target.value))
  }
  const handleSelectMovie = movie => setSelectedMovie(movie)
  const onClose = () => setSelectedMovie(null)

  const cbObserverFunction = entries => {
    let ratio = entries[0].intersectionRatio
    console.log("Ratio: ", ratio)
    if(ratio > 0) {
      currentPage = currentPage + 1
      dispatch(getMoreMovies(currentPage))
    }
  }
  const intersectionObserver = new IntersectionObserver(cbObserverFunction)
  useEffect(() => {
    intersectionObserver.observe(targetRef.current)

  }, [])

  return(<div className="movies-list">
      <div>
        <span>Sort by:</span>
        <SortingOptions selectedOption={sortingType} onChange={handleSortingChange}/>
      </div>
    <div className="items">
      {
        movies.map(movie =>
          <MovieListItem key={movie.id} movie={movie} onSelect={handleSelectMovie}/>
        )
      }
    </div>
    <div ref={targetRef}></div>
    {
      selectedMovie && (
        <ExpandedMovieItem movie={selectedMovie} onClose={onClose}/>
      )
    }
  </div>)

  
}

const ExpandedMovieItem = ({movie: {title, original_title, backdrop_path, overview, vote_average, vote_count}, onClose}) => (
  
    <div className="movie-modal-container" id="movie-modal-container">
      <span className="modal-outside-click" onClick={onClose}></span>
      <div className="expanded-movie-modal">
      <span onClick={onClose} className="close-btn"></span>
        <div className="poster-container" >
          <TMDBImage src={backdrop_path} className="poster" alt="Image not found"/>
        </div>
        <div className="modal-description">
          <h2 className="modal-title">{title}</h2>
          <h5 className="original-title">{original_title}</h5>
          <p className="modal-rating">Rating (votes count): <Star className="modal-rating-star"/>{vote_average} ({vote_count})</p>
          <p className="modal-overview">{overview}</p>
        </div>
      </div>
    </div>

)

function MovieListItem ({movie, onSelect}) {
  const handleClick = () => onSelect(movie)
  return(
    <div className="movie-card-container">
      <div className="movie-card" onClick={handleClick}>
          <TMDBImage src={movie.poster_path} className="movie-card-img" alt="Image not found"/>
          <span className="movie-title">{movie.title}</span>
          <span className="movie-votes"><Star className="star-symbol"/>{movie.vote_average}</span>
      </div>
    </div>)
}

function SortingOptions ({ selectedOption, onChange }) {

  return (
    <select value={selectedOption} onChange={onChange}>
      <option value="" disabled></option>
      <option value="name-asc">A to Z</option>
      <option value="name-desc">Z to A</option>
      <option value="rating-desc">Rating ↓</option>
      <option value="rating-asc">Rating ↑</option>
      <option value="date-desc">Release date ↓</option>
      <option value="date-asc">Release date ↑</option>
    </select>
  )
}

