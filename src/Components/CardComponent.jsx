import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment'
import { Document, Page } from 'react-pdf';
import './CardComponent.css'

function CardComponent({item, url}) {

    const [numPages, setNumPages] = useState(null)

    const onDocumentLoadSuccess = ({numPages}) => {
        setNumPages(numPages)
    }

    return (
        <Grid item xs={12} sx={{ p: 2, }}>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Created At: {moment(item.createdAt).format('DD/MM/YYYY')}</Typography>
                            <Typography variant="h5" component="div"> PDF Name: {item.fileName}</Typography>
                        </Grid>
                        <Grid item xs={2} sx={{ }}>
                            <Box sx={{ width: '100%', height: '100%', flex: 1, }}>
                                <Document file={url+item.fileName} onLoadSuccess={onDocumentLoadSuccess}>
                                    <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
                                </Document>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Link to={`/pdfView/${item._id}`}><Button size="small">View</Button></Link>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default CardComponent