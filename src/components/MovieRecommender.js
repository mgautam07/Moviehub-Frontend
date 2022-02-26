import {React, useState} from 'react';
import Form from './Home/Form';
import CardType2 from './cards/CardType2';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { lightBlue } from '@mui/material/colors';

const lblue = lightBlue[600];

function Recom() {

  const [movies, setMovies] = useState([]);

  return(
    <>
      <Form setMovies={setMovies} />

      <Typography sx={{ml : 4, mt : 4}} variant='h3' color={lblue}> Movies recommended</Typography>
      <Grid container sx={{justifyContent: 'center', mb:7, mt : 3}} >
        
        {console.log(movies)}
        {movies.map((movieArr) => (
          movieArr.results.map((move) => (
            <div key={move.id}>
              <CardType2 sx={{ boxShadow: 5}} xs={10} md={4} lg={3} movie={move} index={move.id} />
            </div>
        ))
  ))}
      </Grid>
    </>
  )
}

export default Recom;
