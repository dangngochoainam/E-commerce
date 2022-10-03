import { Routes, Route } from "react-router-dom";
import ListProduct from "./components/ListProduct";
import Error from "./layouts/Error";
import Header from "./layouts/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import LandingPage from "./pages/Home/LandingPage";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <>
      <div className=" min-h-screen bg-main">
        <Header />
        <div className="w-10/12 m-auto bg-white min-h-screen">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<LandingPage />} />
              <Route path="/search" element={<ListProduct />} />
            </Route>

            <Route path="/:productId" element={<ProductDetails />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
