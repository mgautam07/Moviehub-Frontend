import {React, useEffect, useState} from 'react'
import './search.css'
import {useLocation} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from './cards/Card'
import axios from 'axios'

function Search() {

    const location = useLocation()
    const [movie, setMovie] = useState()

    useEffect(() => {
            if (location.state.id){
            axios.get(`https://movie-hub1.herokuapp.com/search/tv/${location.state.id}`).then(result => {
                setMovie(result.data)
                if (result.data.status_code === 34){
                axios.get(`https://movie-hub1.herokuapp.com/search/movie/${location.state.id}`).then(result => {
                    setMovie(result.data)
            })}
            })}
    }, [])

  return (
    <Box sx={{ margin: 4 }}>
        <Grid container spacing={2}>
            <Grid item xs={12} s={12} md={12} lg={10}>
                {movie ? <Card movie={movie}/> : <></>}
            </Grid>
            {/* <Grid item lg={3} md={3} s={12} xs={12}>
                bot
            </Grid> */}
        </Grid>
    </Box>
  )
}

export default Search