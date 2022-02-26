import {React, useState, useContext} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@mui/material'
import { Stack, Alert, Collapse } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link, useNavigate} from 'react-router-dom'
import { lightBlue } from '@mui/material/colors';
import axios from 'axios'
import { LoginContext } from '../contexts/LoginContexts'

const lblue = lightBlue[600];
const Login=()=>{

    const paperStyle={padding :20,height:'70vh',width:350, margin:"55px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'15px 0', height:'45px'}

    const navigate = useNavigate()
    const {username, setUsername} = useContext(LoginContext)
    const {favorites, setFavorites} = useContext(LoginContext)
    const [usernameLocal, setUsernameLocal] = useState();
    const [password, setPassword] = useState();
    const [open, setOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState('Make sure to fill all the fields!');


    const handleSubmit = (event) =>{
        event.preventDefault();
        if(usernameLocal && password)
        {
            setOpen(false)
            axios.post('https://movie-hub1.herokuapp.com/login', {username: usernameLocal, password: password})
            .then((res) => {
                if (res.data.exists && res.data.login) {
                    setOpen(false)
                    setUsername(usernameLocal)
                    setFavorites(res.data.favorites)
                    navigate('/')
                }
                else if (res.data.exists && !res.data.login) {
                    setAlertMsg('Incorrect Password!')
                    setOpen(true)
                }
                else {
                    setAlertMsg('User does not Exist!')
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

    return(
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
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <h2>Log In</h2>
                    </Grid>
                    <TextField label='Username' placeholder='Enter username' fullWidth onChange={(event) => {setUsernameLocal((event.target.value))}} required/>
                    <TextField sx={{mt : 3}} label='Password' placeholder='Enter password' type='password' fullWidth onChange={(event) => {setPassword((event.target.value))}} required/>
                    <FormControlLabel
                        control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="Remember me"
                    />
                    <Button type='submit' onClick={handleSubmit} color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                    <Typography sx={{mt : 2}} color={lblue}>
                        <Link to="#" >
                            Forgot password ?
                    </Link>
                    </Typography>
                    <Typography color={lblue}> Don't have an account ?
                    <Link to="/signup"> Sign Up</Link>
                    </Typography>
                </Paper>
            </Grid>
        </>
        
    )
}

export default Login