import { Button, ButtonGroup, Typography } from "@mui/material";
import { Container } from "@mui/system";
import agent from "../../app/api/agent";

export default function AboutPage() {
    return (
        <Container>
            <Typography variant='h2'>
                Errors
            </Typography>
            <ButtonGroup fullWidth>
                <Button variant='contained' onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>Bad request</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>Unauthorize error 401</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>Not Found 404</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>Server Error 500</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.getValidationError().catch(error => console.log(error))}>ValidationErrot</Button>
            </ButtonGroup>
        </Container>

        
    )
}