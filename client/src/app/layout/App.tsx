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

function App() {

  
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
          <Route path='catalog/:id' element={<ProductDetails />}/>
          <Route path='short' element={<Short />} />
          <Route path='short/:id' element={<ProductDetails />} />
          <Route path='sets' element={<Sets />} />
          <Route path='sets/:id' element={<ProductDetails />} />
          <Route path='server-error' element={<ServerError   />} />
          {/* <Route path='*' element={<NotfoundPage />}/>  Добавить роутинг для нот файунд  */}
        </Routes>
      </Container>
      
    </>
    
  );
}

export default App;
