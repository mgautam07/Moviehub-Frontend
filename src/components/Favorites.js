import {React, useContext, useState, useEffect} from 'react'
import { LoginContext } from '../contexts/LoginContexts'
import CardType2 from './cards/CardType2'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import { lightBlue } from '@mui/material/colors'

const lblue = lightBlue[600]

function Favorites() {

  const {favorites} = useContext(LoginContext)
  const [movies, setMovies] = useState([])

 
  useEffect(() => {
    axios.post('https://movie-hub1.herokuapp.com/favorites/show', {favorites: favorites})
    .then((result) => {
        setMovies(result.data)
    })}, [])
    

  return (
    <>
      <Typography sx={{ml : 8, mt: 5}} variant='h3' color={lblue}>Favorites</Typography>
      <Grid container sx={{ justifyContent: 'center', mb:7, mt : 3}} >
        {movies.map((trend, index) => (
          <div key={'10'+index}>
            <CardType2 sx={{ boxShadow: 5}} xs={10} md={4} lg={3} movie={trend} index={index}/>
          </div>
        ))}
      </Grid>
    </>
  )
}

export default Favorites