import { ListItem, ListItemAvatar, Avatar, ListItemText, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";

interface Props {
    product: Product;
}


export default function ProductCard({product}: Props) {
    return (
    <Card >
      <CardMedia
        component="img"
        // height="350"
        sx={{height: 350, backgroungSize: 'contain'}}
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
        <Button size="small">В корзину</Button>
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