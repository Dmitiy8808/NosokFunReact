import { Alert, AlertTitle, Button, ButtonGroup, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import agent from "../../app/api/agent";


export default function ShortPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function  getValidationError() {
        agent.TestErrors.getValidationError()
            .then(() => console.log('should not see this'))
            .catch (error => setValidationErrors(error));
    }
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
                <Button variant='contained' onClick={getValidationError}>ValidationErrot</Button>
            </ButtonGroup>  
            {validationErrors.length > 0 &&
                <Alert severity='error'>
                    <AlertTitle> Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>

                </Alert>
            }
        </Container>

        
    )
}