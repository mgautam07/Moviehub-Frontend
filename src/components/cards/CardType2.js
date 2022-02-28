import {React, useContext, useState, useEffect} from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import {useNavigate} from 'react-router-dom'
import { LoginContext } from '../../contexts/LoginContexts'
import StarIcon from '@mui/icons-material/Star'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Snackbar from '@mui/material/Snackbar'
import axios from 'axios'
import dayjs from 'dayjs'


function CardType2(props) {
  const linkk = "https://image.tmdb.org/t/p/w500/" + props.movie.backdrop_path;
  let date = dayjs(props.movie.release_date || props.movie.first_air_date).format('DD MMM YYYY')

  const navigate = useNavigate()
  const {favorites, setFavorites} = useContext(LoginContext)
  const {username} = useContext(LoginContext)
  const [fav, setFav] = useState(false)
  const [open, setOpen] = useState(false)
  const addFavorites = () => {
    if (username === '') {
      setOpen(true)
      return
    }
    if(!fav)
    {
      setFavorites(favorites => [...favorites, props.movie.id])
      setFav(true)
    }
    else 
    {
      let filteredarray = favorites.filter(item => item !== props.movie.id)
      setFavorites(filteredarray)
      setFav(false)
    }
    axios.post('https://movie-hub1.herokuapp.com/favorites/update', {"username": username, "favorites": favorites})
    .then((result) => {
      return result
    })
    .catch(error => {
      console.log(error.response)
    })
  }

  const handleSearch = () => {
    navigate('/search', {state: {id:props.movie.id}})
  }

  useEffect(() => {
    if(favorites.includes(props.movie.id))
    {
      setFav(true)
    }
  })
  return(
    <>
    <Snackbar
        open={open}
        autoHideDuration={5}
        message="Login to add favorites!"
    />
      <Card sx={{ width: 340, m: 1, height: 325, boxShadow: 5 }}>
      <CardActionArea onClick={handleSearch}>
        <CardMedia
          component="img"
          height="340"
          image={linkk}
          alt="thumbnail"
          sx={{ height: 190 }}
        />
      </CardActionArea>
      <CardContent>
        <Grid container columnSpacing={1} direction='row' alignItems='center'>
          <Grid item>
            <Box component="div" sx={{ textOverflow: 'ellipsis', fontSize: 19, fontWeight: 'bold' }}>
              {props.movie.original_title || props.movie.original_name}
              <IconButton color="error" aria-label="Favorite" component="span" onClick={addFavorites}>
                {fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
          <Grid container columnSpacing={1} direction='row' alignItems='center'>
            <Grid item>
            {props.movie.vote_average}
            </Grid>
            <Grid item>
             <StarIcon color='warning'/>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default CardType2;
