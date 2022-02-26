import axios from 'axios';
import {React, useState} from 'react';
import { Stack, Alert, Collapse } from '@mui/material'
import '../../components/all.css';

function Form({setMovies}) {
  const [movie1, setMovie1] = useState("");
  const [movie2, setMovie2] = useState("");
  const [movie3, setMovie3] = useState("");
  const [movie4, setMovie4] = useState("");
  const [movie5, setMovie5] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (movie1 !== '' && movie2 !== '' && movie3 !== '' && movie4 !== '' && movie5 !== '') {
      axios.post('https://movie-hub1.herokuapp.com/MovieRecommender', {movie1: movie1, movie2: movie2, movie3: movie3, movie4: movie4, movie5: movie5})
      .then((dat) => {
        setMovies(dat.data);
        return dat;})
        setOpen(false);
    }
    else
    {
      setOpen(true);
    }
  }

  return <>
  <section className="section-3">
    <form>
      <div className="form-heading">Fill the form</div>
      <div className="main-form">
        <div className="form-text">Enter a name of a movie</div>
        <input className="form-field textfield" type="text" name="movie1" id="movie1" onChange={(event) => {setMovie1((event.target.value))}} required autoComplete='off'/>
        <div className="form-text">Enter a name of a movie</div>
        <input className="form-field textfield" type="text" name="movie2" id="movie2" onChange={(event) => {setMovie2((event.target.value))}} required autoComplete='off'/>
        <div className="form-text">Enter a name of a movie</div>
        <input className="form-field textfield" type="text" name="movie3" id="movie3" onChange={(event) => {setMovie3((event.target.value))}} required autoComplete='off'/>
        <div className="form-text">Enter a name of a movie</div>
        <input className="form-field textfield" type="text" name="movie4" id="movie4" onChange={(event) => {setMovie4((event.target.value))}} required autoComplete='off'/>
        <div className="form-text">Enter a name of a movie</div>
        <input className="form-field textfield" type="text" name="movie5" id="movie5" onChange={(event) => {setMovie5((event.target.value))}} required autoComplete='off'/>
      </div>
      <input className="btn" type="submit" onClick={handleSubmit}/>
      <input className="btn" type="reset" onClick={() => {setOpen(false)}}/>
    </form>
    </section>
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Collapse in={open}>  
        <Alert variant="filled" severity="error">
          Make sure to fill all the fields!
        </Alert>
      </Collapse>
    </Stack>
  </>;
}

export default Form;
