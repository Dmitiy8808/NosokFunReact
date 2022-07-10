import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { Route, Routes } from "react-router-dom";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import Sets from "../../features/sets/Sets";
import Short from "../../features/short/Short";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import { useStoreContext } from "../context/StoreContext";
import { useEffect, useState } from "react";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);


  useEffect (() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    } else {
      setLoading(false);
    }
  }, [setBasket])

  if(loading) return <LoadingComponent message='Initialaizing App ...'/>

    return (
    <>
      <ToastContainer position="bottom-right"
                      autoClose={5000}
                      hideProgressBar={true}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover/>
      <CssBaseline />
      <Header />
      <Container>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='catalog' element={<Catalog   />} />
          <Route path='catalog/:id' element={<ProductDetails  />}/>
          <Route path='short' element={<Short />} />
          <Route path='short/:id' element={<ProductDetails />} />  {/* Кажется товаришь из Португалии обяснял в лекции про роутинги как этого избежать */}
          <Route path='sets' element={<Sets />} />
          <Route path='sets/:id' element={<ProductDetails />} />
          <Route path='server-error' element={<ServerError   />} />
          <Route path='basket' element={<BasketPage   />} />
          <Route  path='*' element={<NotFound  />} />
        </Routes>
      </Container>
      
    </>
    
  );
}

export default App;
