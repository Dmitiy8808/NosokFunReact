import LoadingButton from "@mui/lab/LoadingButton";
import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/models/product";

interface Props {
    product: Product;
}


export default function ProductCard({product}: Props) {
    const [loading, setLoading] = useState(false);
    const {setBasket} = useStoreContext();

    function handleAddItem(productId: number)
    {
      setLoading(true);
      agent.Basket.addItem(productId)
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }
    return (
    // <Card component={Link} to={`/catalog/${product.id}`} sx={{'&:hover': {
    //   backgroundColor: 'primary.main',
    //   opacity: [0.9, 0.8, 0.7],
    // }}}>
    <Card>
      <CardMedia
        component="img"
        // height="350"
        sx={{height: 350, backgroungSize: 'contain', }}
        image={product.pictureUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {product.price.toFixed(0)} ₽
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {product.name}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton 
          loading={loading} 
          onClick={() => handleAddItem(product.id)} 
          size="small">В корзину</LoadingButton>
      </CardActions>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            Размеры в наличии: 
        </Typography>
        <Typography variant="body2">
            {product.size}
        </Typography>
      </CardContent>
        
    </Card>
    )
}