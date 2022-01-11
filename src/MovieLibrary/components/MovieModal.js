import React from "react";
import TMDBImage from './TMDBImage'
import "./MovieModal.css"
import { ReactComponent as Star } from './star.svg';

export default function MovieModal({movie: {title, original_title, backdrop_path, overview, vote_average, vote_count}, onClose}) {
    return (
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
}