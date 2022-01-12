import React, { useState, useRef, useEffect } from 'react'
import MovieModal from './MovieModal'
import MovieListItem from './MovieListItem'
import './MoviesList.css'
import {useDispatch} from 'react-redux'
import { getMoreMovies, addMovieFavourite, removeMovieFavourite} from '../store/actions'


export default function MoviesList ({ allMovies, favMovies, favOnly }){

  const dispatch = useDispatch()
  // States
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [showTopBtn, setShowTopBtn] = useState(false)
  let [currentPage, setCurrentPage] = useState(4)
  
  // Functions to make infinite scroll
  const targetRef = useRef()
  const cbObserverFunction = entries => {
    const favBtn = document.getElementById("favCheck")
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
      if (window.pageYOffset > 500) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
    
  }, [])

  // Modal
  const handleSelectMovie = movie => setSelectedMovie(movie)
  const onClose = () => setSelectedMovie(null)
  

  // Back to top button
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Favourites
  const handleFavouriteMovie = (movieId, isFavourite) => {
    if(isFavourite) {
      dispatch(addMovieFavourite(movieId))
    } else {
      dispatch(removeMovieFavourite(movieId))
    }
  }

  return(
  <div className="movies-list">
    
    <div className="items">
      {
        favOnly ?  
        !favMovies.length ? 
        <span className='empty-fav-msg'>You have not added any movie to favourites yet.<br/>
        Go back and add some!</span> 
        :
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
