import {React, useState, useContext} from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material'
import { Stack, Alert, Collapse } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Link, useNavigate} from 'react-router-dom'
import { lightBlue } from '@mui/material/colors';
import axios from 'axios'
import { LoginContext } from '../contexts/LoginContexts';

const lblue = lightBlue[600];
const Signup = () => {

    const paperStyle = { padding: '30px 20px', width: 350, margin: "55px auto",height:'70vh' }
    const headerStyle = { marginTop: 3 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 3 }

    const {username, setUsername} = useContext(LoginContext)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [open, setOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState('Make sure to fill all the fields!');

    const navigate = useNavigate()

    const handleSubmit = (event) =>{
        event.preventDefault()
        if(username && password)
        {
            setOpen(false)
            axios.post('https://movie-hub1.herokuapp.com/register', {username: username, password: password, email: email})
            .then((res) => {console.log(res)
                if (!res.data.found) {
                    navigate('/', { replace: true })
                }
                else {
                    setAlertMsg('User already exists!')
                    setOpen(true)
                }
            })
        }
        else
        {
            setAlertMsg('Make sure to fill all the fields!')
            setOpen(true)
        }
    }

    return (
        <>
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Collapse in={open}>  
                    <Alert variant="filled" severity="error">
                        {alertMsg}
                    </Alert>
                </Collapse>
            </Stack>
            <Grid>
                <Paper elevation={15} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}>
                            <AddCircleOutlineIcon />
                        </Avatar>
                        <h2 style={headerStyle}>Sign Up</h2>
                        <Typography style={marginTop} variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                    </Grid>
                    <form>
                        <TextField sx={{mt : 1.7}} fullWidth label='Name' placeholder="Enter username" onChange={(event) => {setUsername((event.target.value))}}/>
                        <TextField sx={{mt : 1.7}} fullWidth label='Email (Optional)' placeholder="Enter your email " onChange={(event) => {setEmail((event.target.value))}}/>
                        <TextField sx={{mt : 1.7}} fullWidth label='Password' placeholder="Enter your password" onChange={(event) => {setPassword((event.target.value))}}/>
                        <TextField sx={{mt : 1.7}} fullWidth label='Confirm Password' placeholder="Confirm your password" onChange={(event) => {setPassword((event.target.value))}}/>
                        <Typography sx={{mt : 2}} color={lblue}> Already have an account ?
                            <Link to="/signup"> Login</Link>
                        </Typography>
                        <Button sx={{mt : 3}} type='submit' variant='contained' color='primary' onClick={handleSubmit}>Sign up</Button>
                    </form>
                </Paper>
            </Grid>
        </>
        
    )
}

export default Signup;