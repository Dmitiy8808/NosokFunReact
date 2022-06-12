import { CssBaseline, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import { Product } from "../models/product";
import Header from "./Header";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://localhost:7292/Products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

  function addProduct() {
    setProducts(prevState => [...prevState, 
      {
      id: prevState.length + 101,
      name: 'product' + (prevState.length + 1), 
      price: prevState.length * 100 + 100,
      article: 'test',
      size: '123',
      description: 'description',
      pattern: 'pattern',
      text: 'text',
      productStructure: 'structure',
      inStock: true,
      pictureUrl: 'picture',
      type: 'all',
      quantityInStock: 10
    }])
  }
  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Catalog products={products} addProduct={addProduct}/>
      </Container>
      
    </>
    
  );
}

export default App;
