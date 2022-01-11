import React from "react";
import TMDBImage from './TMDBImage'
import "./MovieListItem.css"
import { ReactComponent as Star } from './star.svg';

export default function MovieListItem({movie, onSelect, onFavourite}) {
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
        </div>
    )
}