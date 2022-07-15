import { Button,  Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import {  useNavigate } from "react-router-dom";

export default function ServerError() {
    const navigate = useNavigate();
    return (
        <Container component={Paper}>
            {/* {state?.error ? (
                <>
                    <Typography variant='h5' gutterBottom>Server error</Typography>
                    <Divider />
                    <Typography >{state.error.detail || 'Internal Server Error'} </Typography>
                </>
            ) : (
                <Typography variant='h5' gutterBottom>Server error</Typography>
            )} */}
            <Typography variant='h5' gutterBottom>Server error</Typography>
            <Button onClick={() => navigate('/catalog')} > Back</Button>
        </Container>
    )
}