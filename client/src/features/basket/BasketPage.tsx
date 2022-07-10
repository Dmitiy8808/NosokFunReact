import { AddCircleOutlineOutlined, Delete, RemoveCircle, RemoveCircleOutline, RemoveCircleOutlineOutlined } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";

export default function BasketPage() {
    const {basket, setBasket, removeItem} = useStoreContext();
    const [loading, setLoading] = useState(false); //Убрать тк нигде не используется. 
    const subtotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const totalQantity = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

    function handleAddItem(productId: number) {
      setLoading(true);
      agent.Basket.addItem(productId)
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }

    function handleRemoveItem(productId: number, quantity =1) { //необходимо сделать так чтобы нельзя было удалить элемент корзины кнопкой минус 
      setLoading(true);
      agent.Basket.removeItem(productId, quantity)
        .then(() => removeItem(productId, quantity))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }

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
                      <IconButton  disabled={item.quantity === 1} onClick={() => handleRemoveItem(item.productId)}>
                        <RemoveCircleOutlineOutlined fontSize='large' style={{transform: 'scale(1.2)'}}/>
                      </IconButton>
                      {item.quantity}
                      <IconButton onClick={() => handleAddItem(item.productId)}>
                        <AddCircleOutlineOutlined fontSize='large' style={{transform: 'scale(1.2)'}}/>
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">{(item.price * item.quantity).toFixed(0)} ₽</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleRemoveItem(item.productId, item.quantity)} color='error'>
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