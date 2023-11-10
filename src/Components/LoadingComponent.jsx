import { Card, CardActions, CardContent, Skeleton, Typography } from '@mui/material'
import React from 'react'

function LoadingComponent() {
// <Skeleton variant="rounded" width={210} height={60} />
    return (
        <Card sx={{width: '100%'}}>
            <CardContent>
                <Skeleton variant="rounded" width={"30%"} height={30} />
                <Skeleton variant="rounded" width={"80%"} height={80} sx={{my: 1}} />
                <Skeleton variant="rounded" width={"20%"} height={30} />
            </CardContent>
            <CardActions>
                <Skeleton variant="rounded" width={"30%"} height={30} />
            </CardActions>
        </Card>
    )
}

export default LoadingComponent