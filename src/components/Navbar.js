import  { React, useContext } from 'react';
import {Link, NavLink} from 'react-router-dom';
import './nav.css';
import { LoginContext } from '../contexts/LoginContexts';

export default function Navbar() {

  const {username, setUsername} = useContext(LoginContext)
  const {favorites, setFavorites} = useContext(LoginContext)
  const handleLogout = () =>{
    setUsername((""))
    setFavorites([])
  }

  return (
    <div className='navbar'>
      <div className="logo">
        <Link to="/" className="logo-img">
          <span className="material-icons">
            live_tv
            </span>Movie Hub
        </Link>
      </div>
      {/* <Link to="/" className="movie-hub"></Link> */}
      <ul className="nav-links">
      <input type="checkbox" id="checkbox_toggle" />
      <label htmlFor="checkbox_toggle" className="hamburger">&#9776;</label>
      <div className='menu'>
        <li>
          <NavLink to="/">Latest</NavLink>
        </li>
        <li>
          <Link to="/upcoming">Upcoming</Link>
        </li>
        <li>
          <Link to="/MovieRecommender">Movie Recommender</Link>
        </li>
        <li>
          <Link to="/query">Search</Link>
        </li>
        {username ?
        <>
          <li>
            <Link to="/favorites">{username}</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
        :
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </>}
      </div>
      </ul>
    </div>
  );
}
