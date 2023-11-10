import React, { Fragment, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Home from './Pages/Home';
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import NavBar from './Components/NavBar';
import ViewDetails from './Pages/ViewDetails';
import { CircularProgress } from '@mui/material';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function App() {

  const navigate = useNavigate()
  const token = localStorage.getItem('user-token')
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(true)
  const date = new Date()
  
  useEffect(() => {
    if(token){
      
      const decodedToken = jwtDecode(token)
      if(decodedToken.exp * 1000 < date.getTime()){
        localStorage.removeItem('user-token')
        navigate('/signin')
      }else{
        setUser(decodedToken)
        setLoading(false)
        navigate('/')
      }
    }else{
      navigate('/signin')
    }
  }, [token])
// console.log("user: ", user);
  return (
    <Fragment>
        {token ? <>
        {loading ? <CircularProgress color="success" /> : 
        <>
          <NavBar user={user.result} />
          <Routes>
            <Route path='/' element={ <Home user={user?.result}  />} />          
            <Route path='/pdfView/:id' element={ <ViewDetails user={user?.result}  />} />          
          </Routes>
        </>}
      </> : <>
        <Routes>
          <Route path='/signin' element={ <SignIn /> } />
          <Route path='/signup' element={ <SignUp /> } />
        </Routes>
      </>}
    </Fragment>
  );
}

export default App;
