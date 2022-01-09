import React, { useState, useRef, useEffect } from 'react'
import TMDBImage from './TMDBImage'
import './MoviesList.css'
import { ReactComponent as Star } from './star.svg';
import {useDispatch} from 'react-redux'
import {orderMoviesBy, getMoreMovies, addMovieFavourite, removeMovieFavourite} from '../store/actions'


export default function MoviesList ({ allMovies, favMovies }){

  const dispatch = useDispatch()
  // States
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [sortingType, setSortingType] = useState('')
  const [favOnly, setFavOnly] = useState(false)
  let [currentPage, setCurrentPage] = useState(4)
  // Functions to make infinite scroll
  const targetRef = useRef()
  const cbObserverFunction = entries => {
    let ratio = entries[0].intersectionRatio
    if(ratio > 0) {
      currentPage = currentPage + 1 
      dispatch(getMoreMovies(currentPage))
    }
  }
  const intersectionObserver = new IntersectionObserver(cbObserverFunction)
  useEffect(() => {
    intersectionObserver.observe(targetRef.current)
  }, [])
  // Function to make sorting
  const handleSortingChange = event => {
    setSortingType(event.target.value)
    dispatch(orderMoviesBy(event.target.value))
  }
  // Modal
  const handleSelectMovie = movie => setSelectedMovie(movie)
  const onClose = () => setSelectedMovie(null)
  // Favourites
  const handleFavouriteMovie = (movieId, isFavourite) => {
    if(isFavourite) {
      dispatch(addMovieFavourite(movieId))
    } else {
      dispatch(removeMovieFavourite(movieId))
    }
  }

  const showFavOnly = (e) => {
    setFavOnly(e.target.checked)
  }

  return(<div className="movies-list">
      <div>
        <span>Sort by:</span>
        <SortingOptions selectedOption={sortingType} onChange={handleSortingChange}/>
      </div>
      <input type="checkbox" onClick={(e) => showFavOnly(e)}/>

    <div className="items">
      {
        favOnly ?  
        !favMovies.length ? <span>Hola mundo</span> :
        allMovies.map(movie => {
          if(favMovies.includes(movie.id)) {
            return <MovieListItem key={movie.id} movie={movie} onSelect={handleSelectMovie} onFavourite={handleFavouriteMovie}/>
          }
        }) : 
        allMovies.map(movie => {
          return <MovieListItem key={movie.id} movie={movie} onSelect={handleSelectMovie} onFavourite={handleFavouriteMovie}/>
        })
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

function MovieListItem ({movie, onSelect, onFavourite}) {
  const handleClick = () => onSelect(movie)
  const handleFavourite = (e) => onFavourite(movie.id, e.target.checked)
  return(
    <div className="movie-card-container">
      <div className="movie-card">
        <div className="card-favourite">
          <input id={`hearth-${movie.id}`} type="checkbox" onClick={handleFavourite} className="favourite-checkbox"/>
          <label className="favourite-label" htmlFor={`hearth-${movie.id}`}>❤</label>
        </div>
        <div className="card-content" onClick={handleClick}>
          <TMDBImage src={movie.poster_path} className="movie-card-img" alt="Image not found"/>
          <span className="movie-title">{movie.title}</span>
          <span className="movie-votes"><Star className="star-symbol"/>{movie.vote_average}</span>
        </div>
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

