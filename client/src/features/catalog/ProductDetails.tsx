import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, setBasket } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";


export default function ProductDetails() {
    const {basket, status} = useAppSelector(state => state.basket); 
    const dispatch = useAppDispatch();
    const {id} = useParams<{id: string}>();
    const product = useAppSelector(state => productSelectors.selectById(state, id!)); // возможно уязвимое место id!
    const {status: productStatus} = useAppSelector(state =>state.catalog);
    const item = basket?.items.find(i => i.productId === product?.id);

    useEffect(() => {
        if(!product) dispatch(fetchProductAsync(parseInt(id!))) 
    }, [id, dispatch, product])

    function handleAddItem(productId: number)
    {
       dispatch(addBasketItemAsync({productId}))
       //в блоке finally сделать pop up товар добавлен в корзину. 
    }

    if (productStatus.includes('pending')) return <LoadingComponent message='Loading product...'/>

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
                    <Box
                        sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        }}
                    >
                        <Box sx={{
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            borderRadius: 2,
                            p: 1,
                            minWidth: 30,
                            m:1,
                            }}>34-37
                        </Box>
                        <Box sx={{
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            borderRadius: 2,
                            p: 1,
                            minWidth: 30,
                            m:1,
                            }}>34-37
                        </Box>
                        <Box sx={{
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            borderRadius: 2,
                            p: 1,
                            minWidth: 30,
                            m:1,
                            }}>34-37
                        </Box>
                    </Box>

                    
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