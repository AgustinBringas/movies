import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchFirstMovies} from '../store/actions'
import logo from './logo.svg'
import './MovieLibrary.css'
import { getFavMovies, getMovies } from '../store/selectors'
import MoviesList from './MoviesList'

export default function MovieLibrary() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchFirstMovies())
  }, [])
  const allMovies = useSelector(getMovies)
  const favMovies = useSelector(getFavMovies)

  
  return(
    <div className="MovieLibrary">
      <header className="ML-header">
        <img src={logo} className="ML-logo" alt="logo" />
        <h1 className="ML-title">The Movies Web</h1>
      </header>
      <div className="ML-intro">
        { allMovies.length && <MoviesList allMovies={allMovies} favMovies={favMovies}/> }
      </div>
    </div>)
}
