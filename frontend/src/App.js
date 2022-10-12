import { Routes, Route } from "react-router-dom";
import ListProduct from "./components/ListProduct";
import Register from "./components/Register";
import Error from "./layouts/Error";
import Header from "./layouts/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import LandingPage from "./pages/Home/LandingPage";
import Personal from "./pages/Personal";
import ProductDetails from "./pages/ProductDetails";
import Shop from "./pages/Shop";
import ProductShop from "./pages/Shop/ProductShop";
import ManageShop from "./pages/Shop/ManageShop";
import Staff from "./pages/Staff";
import DashboardStaff from "./pages/Staff/DashboardStaff";
import ListSeller from "./pages/Staff/ListSeller";
import DashboardShop from "./pages/Shop/DashboardShop";
import CreateShop from "./pages/Shop/CreateShop";
import ManageProduct from "./pages/Shop/ManageProduct";

const App = () => {
  return (
    <>
      <div className=" min-h-screen bg-main">
        <Header />
        <div className="w-10/12 m-auto bg-white min-h-screen">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<LandingPage />} />
              <Route path="search" element={<ListProduct />} />
              <Route path="categories/:categoryId" element={<ListProduct />} />
            </Route>
            <Route path="/staff" element={<Staff />}>
              <Route index element={<DashboardStaff />} />
              <Route path="listSeller" element={<ListSeller />} />
            </Route>
            <Route path="/account/:userId" element={<Personal />}></Route>
            <Route path="/createShop" element={<CreateShop />}></Route>
            <Route path="/shop/:shopId" element={<Shop />}>
              <Route index element={<ProductShop />} />
              <Route path="manage" element={<ManageShop />}>
                <Route index element={<DashboardShop />} />
                <Route path="products" element={<ManageProduct />} />
              </Route>
            </Route>
            <Route path="/:productId" element={<ProductDetails />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
