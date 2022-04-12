import React from 'react';
import dayjs from 'dayjs'
import './card.css'

function card(props) {
  const linkk = "https://image.tmdb.org/t/p/w1280/" + props.movie.backdrop_path;
  let date = dayjs(props.movie.release_date || props.movie.first_air_date).format('DD MMM YYYY')
  // console.log(props.movie.genres)
  let genreList = ''
  props.movie.genres?.map((genre) => (genreList = genreList + genre.name + ", ")
  )
  // genreList.concat(" ", "asfsdf")
  genreList = genreList.slice(0, -2)
  console.log(genreList)
  // console.log(typeof(genre.name))
  // var classes = ['movie_card'];
  // if(props.index % 3 === 0)
  //   classes.push('bright');
  // else if(props.index % 3 === 1)
  //   classes.push('tomb');
  // else if(props.index % 3 === 2)
  //   classes.push('ave');
  // classes = classes.join(' ');
  return(
    <div className={'movie_card'}>
        <div className="info_section">
          <div className="movie_header">
            <img className="locandina" src={linkk} alt="thumbnail"/>
            <h1>{props.movie.original_title || props.movie.original_name}</h1>
            <h4>{date || props.movie.release_date}</h4>
            <span className="minutes">{props.movie.vote_average}</span>
            <p className="type">{genreList}</p>
          </div>
          <div className="movie_desc">
            <p className="text">
            {props.movie.overview}
            </p>
          </div>
      </div>
      <div className="blur_back" style={{ 
      backgroundImage: `url(${linkk})`
    }}></div>
    </div>
  )
}

export default card;