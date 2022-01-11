import React, { useState, useRef, useEffect } from 'react'
import TMDBImage from './TMDBImage'
import MovieModal from './MovieModal'
import MovieListItem from './MovieListItem'
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
  const [showTopBtn, setShowTopBtn] = useState(false)
  let [currentPage, setCurrentPage] = useState(4)
  
  // Functions to make infinite scroll
  const targetRef = useRef()
  const cbObserverFunction = entries => {
    const favBtn = document.getElementById("favBtn")
    let ratio = entries[0].intersectionRatio
    if(ratio > 0 && !favBtn.checked) {
      currentPage = currentPage + 1 
      dispatch(getMoreMovies(currentPage))
    }
  }
  const intersectionObserver = new IntersectionObserver(cbObserverFunction)
  useEffect(() => {
    intersectionObserver.observe(targetRef.current);
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
    
  }, [])
  // Function to sort
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
    const favBtn = document.getElementById("favBtn")
    setFavOnly(favBtn.checked)
  }

  // Back to top button
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return(
  <div className="movies-list">
    <div>
      <span>Sort by:</span>
      <SortingOptions selectedOption={sortingType} onChange={handleSortingChange}/>
      <input type="checkbox" id="favBtn" onClick={(e) => showFavOnly(e)} value={favOnly}/>
      <label htmlFor="favBtn">Show favourite movies only</label>
    </div>
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
    {
      showTopBtn && (
        <button onClick={scrollToTop} className="back-to-top">
          &#8679;
        </button>
      )
    }
    <div ref={targetRef}></div>
    {
      selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={onClose}/>
      )
    }
  </div>
  )

  
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