import { AddCircleOutlineOutlined, Delete, RemoveCircleOutlineOutlined } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync} from "./basketSlice";

export default function BasketPage() {
    const {basket} = useAppSelector(state => state.basket); // Получем корзину из Redux
    const dispatch = useAppDispatch();
    const subtotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const totalQantity = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

    

  

    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>
    
    
    return (

    <Grid container spacing={2}>  
       <Grid item xs={8}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} >
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {basket.items.map(item => (
                  <TableRow
                    key={item.productId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box display='flex' alignItems='center'>
                        <img src={item.pictureUrl} alt={item.name} style={{ height: 100,  marginRight: 20, borderRadius: 10}}/>
                        <span>{item.name}</span>
                      </Box>
                    </TableCell>
                    <TableCell align="right">{item.price.toFixed(0)} ₽</TableCell>
                    <TableCell align="center">
                      <IconButton  disabled={item.quantity === 1} onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: 1}))}>
                        <RemoveCircleOutlineOutlined fontSize='large' style={{transform: 'scale(1.2)'}}/>
                      </IconButton>
                      {item.quantity}
                      <IconButton onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))}>
                        <AddCircleOutlineOutlined fontSize='large' style={{transform: 'scale(1.2)'}}/>
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">{(item.price * item.quantity).toFixed(0)} ₽</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: item.quantity}))} color='error'>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={10} sx={{
                                          bgcolor: 'background.paper',
                                          boxShadow: 1,
                                          borderRadius: 2,
                                          p: 2,
                                          minWidth: 340,
                                          minHeight: 330,
                                          pl: 4,  
                                          }}>
            <Typography variant='h6'>Итого {subtotal!.toFixed(0)} ₽</Typography>  
            <Typography variant="subtitle1">Товары {totalQantity} шт.</Typography>
            <Typography variant="subtitle1">Скидка</Typography>                           
            <Button size="large" variant='contained' color='primary' sx={{minWidth: 280}}>
                      Заказать
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={8}>
        <Paper elevation={10} sx={{
                                          bgcolor: 'background.paper',
                                          boxShadow: 1,
                                          borderRadius: 2,
                                          p: 2,
                                         
                                          minHeight: 100,
                                          pl: 4,  
                                          }}>
          <Typography variant='h6'>Способ доставки</Typography>
        </Paper>
        </Grid>
        <Grid item xs={4}>
          
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={10} sx={{
                                            bgcolor: 'background.paper',
                                            boxShadow: 1,
                                            borderRadius: 2,
                                            p: 2,
                                          
                                            minHeight: 500,
                                            pl: 4,  
                                            }}>
            <Typography variant='h6'>Способ оплаты</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={10} sx={{
                                              bgcolor: 'background.paper',
                                              boxShadow: 1,
                                              borderRadius: 2,
                                              p: 2,
                                            
                                              minHeight: 500,
                                              pl: 4,  
                                              }}>
              <Typography variant='h6'>Ваши данные</Typography>
            </Paper>
        </Grid>
        <Grid item xs={4}>
          
        </Grid>
    </Grid>
    )
}