import {Container, Typography} from "@mui/material";
import React from "react";

const NoData=()=>{
    return (
        <>
            <Container sx={{ marginTop: '3rem', textAlign: 'center' }}>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    No Data Found
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    We couldn't find any articles matching your query or category. Please try a different search term or category.
                </Typography>
            </Container>
        </>
    )
}

export default NoData