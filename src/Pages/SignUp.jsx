import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import axios from 'axios';
// Alert notification of MUI
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const URL = `https://pdf-gen-production-7c75.up.railway.app`

const defaultTheme = createTheme();

function SignUp() {
    
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [customVariant, setCustomVariant] = useState('error')
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [valUser, setValUser] = useState({
        email: '',
        password: ''
    })
    
    const handleChange = evt => {
        setUser({...user, [evt.target.name]: evt.target.value})

        setValUser({email:'', password: ''})
    }

    const handleSubmit = async(evt) => {
        evt.preventDefault()
        if(!user.email) {
            setValUser({...valUser, email: 'Please enter email?'})
        }else if(!user.password){
            setValUser({...valUser, password: 'Please enter password?'})
        }else if(user.password.toString().length < 4){
            setValUser({...valUser, password: 'Password must be more than 4 words?'})
        }else{
            return await axios.post(`${URL}/user/register`, user).then((response) => {
                localStorage.setItem("user-token", response.data.token)
                navigate('/')
            }).catch((err) => {
                console.log("error on singUp: ", err);
                setError(err.response.data.msg)
                setCustomVariant('error')
                setOpen(true)
            })
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity={customVariant} sx={{ width: '100%' }}>
                    {error ? error : ''}
                </Alert>
            </Snackbar>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} sx={{ backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)', backgroundRepeat: 'no-repeat', backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900], backgroundSize: 'cover', backgroundPosition: 'center', }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5"> Sign Up </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField type='email' margin="normal" required fullWidth id="email" label="Email Address" name="email" error={valUser.email ? true : false} helperText={valUser.email ? valUser.email : ''} onChange={handleChange} value={user.email} autoFocus />

                        <TextField type="password" margin="normal" required fullWidth name="password" label="Password" id="password" error={valUser.password ? true : false} helperText={valUser.password ? valUser.password : ''} onChange={handleChange} value={user.password} />
                    
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Sign Up </Button>
                    <Grid container>
                        <Grid item>
                        <Link to={'/signin'} variant="body2">
                            {"Don't have an account? Sign In"}
                        </Link>
                        </Grid>
                    </Grid>
                    </Box>
                </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default SignUp