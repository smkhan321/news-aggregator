import {Container, Typography} from "@mui/material";
import React from "react";

const ShowError=({error})=>{
    return (
        <>
            <Container>
                <Typography variant="h6" color="error">
                    Error: {error}
                </Typography>
            </Container>
        </>
    )
}

export default ShowError