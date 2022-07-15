import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, setBasket } from "../basket/basketSlice";


export default function ProductDetails() {
    const {basket} = useAppSelector(state => state.basket); 
    const dispatch = useAppDispatch();
    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const item = basket?.items.find(i => i.productId === product?.id);

    useEffect(() => {
        agent.Catalog.details(parseInt(id!))       //Видимо эту часть тоже можно заменить на асинхронный вызов из редакса
             .then(response => setProduct(response))
             .catch(error => console.log(error))
             .finally(() => setLoading(false));

             console.log('Вызван useEffect'); // Проблема даойного рендеринга решается отключением React.StrictMode
             
    }, [id])

    function handleAddItem(productId: number)
    {
       dispatch(addBasketItemAsync({productId}))
       //в блоке finally сделать pop up товар добавлен в корзину. 
    }

    if (loading) return <LoadingComponent message='Loading product...'/>

    if (!product) return <NotFound />


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
                    {item ? 
                    <Button component={Link} to='/basket' size="large" variant="outlined" color='primary' sx={{minWidth: 280,}}>
                       Перейти в корзину 
                    </Button> : <Button onClick={() => handleAddItem(product.id)} size="large" variant='contained' color='primary' sx={{minWidth: 280}}>
                        Добавить в корзину
                    </Button>}
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