import { Button, Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";

export default function ProductDetails() {
    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://localhost:7292/products/${id}`)
        .then(response => setProduct(response.data))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }, [id])

    if (loading) return <h3>Loading...</h3>

    if (!product) return <h3>Product not found</h3>


    return (
        
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width: '90%'}}/>
            </Grid>
            <Grid item xs={3}>
                {product.name}
            </Grid>
            <Grid item xs={3}>
                <Button variant='contained' color='primary'>Добавить в корзину</Button>
            </Grid> 
        </Grid>
    )
}