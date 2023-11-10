import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import { Box, CircularProgress, Container, IconButton, Paper } from '@mui/material';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './PDF.css'

const URL = `https://pdf-gen-production-7c75.up.railway.app`

function ViewDetails({user}) {
    const { id } = useParams()

    const navigate = useNavigate()
    const [numPages, setNumPages] = useState('');
    const [pageNumber, setPageNumber] = useState(2);
    const [pdf, setPdf] = useState('')
    const [loading, setLoading] = useState(true)


    const onDocumentLoadSuccess = ({numPages}) => {
        setNumPages(numPages)
    }

    const getSinglePDF = async() => {
        if(user){
            return await axios.get(`${URL}/pdf/getSinglePDF/${user?._id}/${id}`).then((response) => {
                setPdf(response.data.result)
                setLoading(false)
            }).catch((err) => {
                console.log("error on getSinglePDF: ", err);
                setLoading(false)
            })
        }else{
            setLoading(true)
        }
    }
    
    useEffect(() => {
        getSinglePDF()
    }, [])
    return (
        <Container>
            <Box sx={{width: '100%', flex: 1, mt: 2}}>
                <IconButton onClick={() => navigate(-1)}> <ArrowBackIcon /> </IconButton>
                {loading ? <Box sx={{ width: '100%', hight: '100vh', alignItems: 'center', justifyItems: 'center'}}> <CircularProgress color="success" /> </Box> : <>
                    <Box sx={{width: '100%', flex: 1}} component={Paper}>
                        <Document file={`${URL}/pdf/${pdf.fileName}`} onLoadSuccess={onDocumentLoadSuccess}>
                            {Array.apply(null, Array(numPages)).map((x, i) => i+1).map((page) => {return(
                                <Page pageNumber={page} renderTextLayer={false} renderAnnotationLayer={false} />
                            )})}
                        </Document>
                    </Box>
                </>}
            </Box>
        </Container>
    )
}

export default ViewDetails