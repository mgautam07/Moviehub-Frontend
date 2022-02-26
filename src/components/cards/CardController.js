import React, {useEffect, useState} from 'react'
import Grid from '@mui/material/Grid'
import CardType2 from './CardType2'
import axios from 'axios'
import { Typography, Button, Container } from '@mui/material'
import { lightBlue } from '@mui/material/colors'

const lblue = lightBlue[600]

function CardController() {
    const [trending, setTrending] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [status, setStatus] = useState('Trending Movies');

    function changeNetflix(){
      axios.get('https://movie-hub1.herokuapp.com/netflix').then(result => {
        setTrending(result.data.results);
        setStatus('Trending movies on Netflix');
      })}

    function changePrime(){
      axios.get('https://movie-hub1.herokuapp.com/prime').then(result => {
        setTrending(result.data.results);
        setStatus('Trending movies on Amazon Prime Video');
    })}

    function changeTrending(){
      axios.get('https://movie-hub1.herokuapp.com/trending').then(result => {
        setTrending(result.data.results);
        setStatus('Trending Movies');
    })}

    useEffect(() => {
      axios.get('https://movie-hub1.herokuapp.com/home').then(result => { 
        setTrending(result.data.trending.results);
        setNowPlaying(result.data.nowPlaying.results);
        return; })
    }, []);

  return (
    <>
      <Typography sx={{ml : 4, mt: 7}} variant='h3' color={lblue}> Now Playing movies</Typography>
      <Grid container sx={{justifyContent: 'center', mb:7, mt : 3}} >
        {nowPlaying.map((now, index) => (
          <div key={'20'+index}>
            <CardType2 xs={10} md={4} lg={2} movie={now} index={index}/>
          </div>
        ))}
      </Grid>

    <Container sx={{display: 'flex', alignItems: 'center'}} spacing={2} direction="row">
      <Button sx={{ml: 2, mr: 1}} key='one'variant="outlined" onClick={() => {changeTrending()}}>Trending</Button>
      <Button sx={{ml: 1, mr: 1}} key='two' variant="outlined" onClick={() => {changeNetflix()}}>Netflix</Button>
      <Button sx={{ml: 1, mr: 1}} key='three' variant="outlined" onClick={() => {changePrime()}}>Prime Video</Button>
    </Container>
      

      <Typography sx={{ml : 4}} variant='h3' color={lblue}> {status}</Typography>
      <Grid container sx={{ justifyContent: 'center', mb:7, mt : 3}} >
        {trending.map((trend, index) => (
          <div key={'10'+index}>
            <CardType2 sx={{ boxShadow: 5}} xs={10} md={4} lg={3} movie={trend} index={index}/>
          </div>
        ))}
      </Grid>  
    </>
  )
}

export default CardController;
