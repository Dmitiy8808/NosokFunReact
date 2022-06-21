import { CssBaseline, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import HomePage from "../../features/home/HomePage";
import { Product } from "../models/product";
import Header from "./Header";
import Sets from "../../features/sets/Sets";
import Short from "../../features/short/Short";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  

  useEffect(() => {
    fetch('https://localhost:7292/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

  
  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='catalog' element={<Catalog products={products}   />} />
          <Route path='catalog/:id' element={<ProductDetails />}/>
          <Route path='short' element={<Short />} />
          <Route path='short/:id' element={<ProductDetails />} />
          <Route path='sets' element={<Sets />} />
          <Route path='sets/:id' element={<ProductDetails />} />
          {/* <Route path='*' element={<NotfoundPage />}/>  Добавить роутинг для нот файунд  */}
        </Routes>
      </Container>
      
    </>
    
  );
}

export default App;
