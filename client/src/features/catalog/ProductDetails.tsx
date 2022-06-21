import { Box, Button, Divider, Grid, IconButton, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function ProductDetails() {
    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://localhost:7292/api/products/${id}`)
        .then(response => setProduct(response.data))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }, [id])

    if (loading) return <h3>Loading...</h3>

    if (!product) return <h3>Product not found</h3>


    return (
        <>  <Typography variant="h4">
                {product.name}
            </Typography>
            <Grid container spacing={6}>
                <Grid item xs={6}>
                    <img src={product.pictureUrl} alt={product.name} style={{width: '90%'}}/>
                </Grid>
                <Grid item xs={3}>
                    <div>
                        Состав: {product.productStructure}
                    </div>
                    <div>
                    Размер: {product.size}
                    </div>
                    
                </Grid>
                <Grid item xs={3}>
                    <Paper elevation={10} sx={{
                                        bgcolor: 'background.paper',
                                        boxShadow: 1,
                                        borderRadius: 2,
                                        p: 2,
                                        minWidth: 340,
                                        pl: 4,
                                        }}>
                    <Box display='inline-flex' >
                        <Box display='flex' >
                            <Typography gutterBottom variant="h4"  >
                                {product.price.toFixed(0)} ₽
                            </Typography>
                        </Box>
                        <Box display='flex' ml={16}>
                            <IconButton aria-label="add to favorites" >
                                <FavoriteBorderIcon />
                            </IconButton>
                        </Box>
                        
                    </Box>
                    
                    <Button size="large" variant='contained' color='primary' sx={{
                                                                                minWidth: 280,
                                                                                }}>
                        Добавить в корзину
                    </Button>
                    <Typography gutterBottom  component="div" sx={{
                                                                 fontSize: 16,
                                                                 mt: 2,
                                                                }}>
                        21-23 июня доставка СДЭК со склада Дмитровское Д1.
                    </Typography>
                    </Paper>
                    
                </Grid> 
            </Grid>
        </>
        
    )
}