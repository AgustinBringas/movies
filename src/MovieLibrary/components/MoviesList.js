import React, { useState } from 'react'
import TMDBImage from './TMDBImage'
import './MoviesList.css'
import { ReactComponent as Star } from './star.svg';


export default function MoviesList ({ movies }){


  const [selectedMovie, setSelectedMovie] = useState(null)
  const [sortingType, setSortingType] = useState('')
  const handleSortingChange = event => {
    setSortingType(event.target.value)
  }
  const handleSelectMovie = movie => setSelectedMovie(movie)
  const onClose = () => setSelectedMovie(null)
  

  return(<div className="movies-list">
      <div>
        <span>Sort by:</span>
        <SortingOptions selectedOption={sortingType} onChange={handleSortingChange}/>
      </div>
    <div className="items">
      {
        movies.map(movie =>
          <MovieListItem key={movie.id} movie={movie} isSelected={selectedMovie===movie} onSelect={handleSelectMovie}/>
        )
      }
    </div>
    {
      selectedMovie && (
        <ExpandedMovieItem movie={selectedMovie} onClose={onClose}/>
      )
    }
  </div>)

  
}

const ExpandedMovieItem = ({movie: {title, original_title, backdrop_path, overview, vote_average, vote_count}, onClose}) => (
  <div className="movie-modal-container" id="movie-modal-container">
    <div className="expanded-movie-modal">
      <TMDBImage src={backdrop_path} className="poster" />
      <div className="description">
        <h2>{title}({original_title})</h2>
        <div><h4>Rank(votes count)</h4>: <span>{vote_average}({vote_count})</span></div>
        <span>{overview}</span>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  </div>
)

function MovieListItem ({movie, isSelected, onSelect}) {
  const handleClick = () => onSelect(movie)
  return(
    <div className="movie-card-container">
      <div className="movie-card" onClick={handleClick}>
          <TMDBImage src={movie.poster_path} className="movie-card-img"/>
          <span className="movie-title">{movie.title}</span>
          <span className="movie-votes"><Star className="star-symbol"/>{movie.vote_average}</span>
      </div>
    </div>)
}

function SortingOptions ({ selectedOption, onChange }) {

  return (
    <select value={selectedOption} onChange={onChange}>
      <option value=""></option>
      <option value="name_asc">A to Z</option>
      <option value="name_desc">Z to A</option>
      <option value="rating">Rating</option>
    </select>
  )
}

