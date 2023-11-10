import { Box, Button, Container, Grid, Paper, Snackbar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import LoadingComponent from '../Components/LoadingComponent';
import CardComponent from '../Components/CardComponent';

// Alert notification of MUI
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const URL = `https://pdf-gen-production-7c75.up.railway.app`

function Home({user}) {
    const [pdfData, setPdfData] = useState('')
    const [open, setOpen] = useState(false);
    const [customVariant, setCustomVariant] = useState('success')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState()
    const [pdf, setPdf] = useState([])
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(true)

    const getAllPDF = async() => {
        return await axios.get(`${URL}/pdf/getAllPDF/${user?._id}`).then((response) => {
            setPdf(response.data.result)
            setLoading(false)
        }).catch((err) => {
            console.log("error on getAllPDF: ", err);
            setLoading(false)
        })
    }

    const handleChange = evt => {
        setPdfData(evt.target.files[0])
        setError('')
    }

    useEffect(() => {
        getAllPDF()
    }, [refresh])

    const formData = new FormData()
    formData.append('pdf', pdfData)
    const handleSubmit = async(evt) =>{
        evt.preventDefault()
        
        if(!pdfData){
            setError('Please select a PDF file?')
            setCustomVariant('error')
            setOpen(true)
        }else if(pdfData?.type.split('/')[1] !== 'pdf'){
            setError('Please select PDF file?')
            setCustomVariant('error')
            setOpen(true)
        }else{
            return await axios.post(`${URL}/pdf/addPDF/${user?._id}`, formData).then((response) => {
                setSuccess(response.data.msg)
                setCustomVariant('success')
                setOpen(true)

                if(refresh){
                    setRefresh(false)
                }else{
                    setRefresh(true)
                }
                setPdfData('')
            }).catch((err) => {
                setError(err.response.data.msg)
                setCustomVariant('error')
                setOpen(true)
            })
        }
    }
    
    return (
        <Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity={customVariant} sx={{ width: '100%' }}>
                    {error ? error : success}
                </Alert>
            </Snackbar>
            <Grid container spacing={2} component={Paper} mt={3}>
                <Grid item xs={12}>
                    <Box component={'form'} onSubmit={handleSubmit}>
                        <TextField type='file' name='pdf' error={error ? true : false} onChange={handleChange}/>
                        <Button type="submit" variant='outlined' sx={{ my: 1, mx: 2}} >Submit</Button>
                    </Box>
                </Grid>

                {loading ? <LoadingComponent /> : pdf.map((item, ind) => {
                    return(<CardComponent key={ind} item={item} url={`${URL}/pdf/`} />)
                })}
            </Grid>
        </Container>
    )
}

export default Home