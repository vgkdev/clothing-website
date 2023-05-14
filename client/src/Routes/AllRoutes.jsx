import { Route, Routes } from "react-router-dom";
import PagenotFound from "../Pages/PagenotFound";
import Home from "../Pages/Home/Home";
import Admin from "../Pages/Admin/Admin";
import Login from "../Components/Login/Login";
import SingUp from "../Components/SignUp/SingUp";
import { Profile } from "../Pages/Admin/Profile";
import { Products } from "../Components/Products/Products";
import Cart from "../Pages/Home/Cart";
import Shirt from "../Pages/Home/Shirt";
import PaymentPage from "../Pages/Home/PaymentPage";
import Pant from "../Pages/Home/Pant";
import Dress from "../Pages/Home/Dress";
import Accessory from "../Pages/Home/Accessory";
import ProductDetail from "../Pages/Home/ProductDetail";
import FavoriteList from "../Pages/Home/FavoriteList";
import { useSelector } from "react-redux";
import UpdateUserInfo from "../Pages/Home/UpdateUserInfo";
import PaymentSuccess from "../Pages/Home/PaymentSuccess";
import { NewProducts } from "../Pages/Home/NewProducts";
import { SaleProducts } from "../Pages/Home/SaleProducts";

const AllRoutes = () => {
  const user = useSelector((state) => state.user.user);
  const role = user?.role;

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="*" element={<PagenotFound />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SingUp />}></Route>
      <Route path="/update-user" element={<UpdateUserInfo />}></Route>
      {/* <Route path="/admin" element={<Profile />}></Route> */}
      {role == "1" && <Route path="/admin" element={<Profile />}></Route>}
      <Route path="/products" element={<Products />}></Route>
      <Route path="/new-products" element={<NewProducts />}></Route>
      <Route path="/sale-products" element={<SaleProducts />}></Route>
      <Route path="/product/:id" element={<ProductDetail />}></Route>
      {/* <Route path="/test" element={<Admin />}></Route> */}
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/favorite-list" element={<FavoriteList />}></Route>
      <Route path="/shirt" element={<Shirt />}></Route>
      <Route path="/pant" element={<Pant />}></Route>
      <Route path="/dress" element={<Dress />}></Route>
      <Route path="/accessory" element={<Accessory />}></Route>
      <Route path="/payment" element={<PaymentPage />}></Route>
      <Route path="/payment-success" element={<PaymentSuccess />}></Route>
    </Routes>
  );
};

export default AllRoutes;
