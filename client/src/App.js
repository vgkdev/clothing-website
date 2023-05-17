import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Image,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import Navimag from "./Components/NavBar/beautybebo_logo.png";
import Drop from "./Components/Dropcde/Drop";
import Footer from "./Components/Footer/Footer";
import Navdar from "./Components/MyAccount/Navdar";
import Topnavbar from "./Components/MyAccount/Topnavbar";

import { Navbar } from "./Components/NavBar/NavBar";
import { useMedia } from "./MediaQuery/UseMedia";
import AllRoutes from "./Routes/AllRoutes";
import logoApp from "./assets/images/logo-app.png";
import { useEffect, useState } from "react";
import { getAllProductsService } from "./api/productApi";
import { Buffer } from "buffer";

import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./reducers/categories";
import Loading from "./Components/Loading";
import { setProducts } from "./reducers/products";
import { ToastContainer } from "react-toastify";
import { logoutUser, verifyUser } from "./reducers/user";

function App() {
  const { smallScreen, mediumScreen } = useMedia();

  const [loginDropDown, setloginDropDown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector((state) => state.categories.categories);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("UserToken"));
    if (userToken) {
      dispatch(
        verifyUser({
          email: userToken.email,
          password: userToken.password,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
    // console.log("check categories redux: ", categories);
  }, [dispatch]);

  useEffect(() => {
    if (categories.length !== 0) {
      const allProducts = categories
        .map((category) => category.Products)
        .flatMap((products) => products);

      // const updatedProducts = allProducts.map((product) => {
      //   return {
      //     ...product,
      //     price: product.price.toLocaleString("vi-VN", {
      //       style: "currency",
      //       currency: "VND",
      //     }),
      //   };
      // });
      // console.log("check products: ", updatedProducts);
      dispatch(setProducts(allProducts));
    }
  }, [categories, dispatch]);

  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={3000} />

      {loading && <Loading />}

      {/* <Topnavbar /> */}
      {mediumScreen && !loading && <Navdar />}

      {mediumScreen && !loading && <Navbar />}
      {!mediumScreen && !loading && (
        <Flex
          style={{ position: "sticky", top: "0px", zIndex: 12 }}
          bgColor={"#ffffff"}
          w="100%"
          justifyContent={"space-between"}
          p={"5px 5%"}
        >
          <div style={{ width: "35%", paddingLeft: "5%", marginTop: "-18px" }}>
            <Link to={"/"}>
              <img
                alt="logo"
                style={{ width: "100%", borderRadius: "5px" }}
                src={logoApp}
              />{" "}
            </Link>
          </div>
          <Flex gap={5}>
            <Box>
              <Button
                colorScheme="#dd0285"
                border={"1px solid white"}
                color="black"
              >
                <Link to="/cart">
                  <Text>Giỏ hàng</Text>{" "}
                </Link>
              </Button>
            </Box>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              {/* <MenuList>
                <Link to={"/"}>
                  {" "}
                  <MenuItem >
                    {" "}
                    Trang chủ
                  </MenuItem>{" "}
                </Link>
                <Link to={"/login"}>
                  {" "}
                  <MenuItem 
                  >
                    Đăng nhập
                  </MenuItem>{" "}
                </Link>
                <Link to={"/signup"}>
                  <MenuItem>
                    Đăng ký
                  </MenuItem>{" "}
                </Link>
                <Link to={"/admin"}>
                  {" "}
                  <MenuItem
                  >
                    Quản lý
                  </MenuItem>{" "}
                </Link>
                <Link to={"/cart"}>
                  {" "}
                  <MenuItem >
                    {" "}
                    Giỏ hàng
                  </MenuItem>{" "}
                </Link>
              </MenuList> */}
              <MenuList>
                {user ? (
                  <>
                    <MenuItem onClick={() => navigate("/")}>Trang chủ</MenuItem>
                    <MenuItem onClick={() => navigate("/cart")}>
                      Giỏ hàng
                    </MenuItem>
                    <MenuItem
                      minH="40px"
                      // id="register_dropdown"
                      backgroundColor={"none"}
                      onClick={() => {
                        setloginDropDown(!loginDropDown);
                        localStorage.removeItem("UserToken");
                        dispatch(logoutUser());
                        navigate("/");
                      }}
                    >
                      Đăng xuất
                    </MenuItem>
                    <MenuItem
                      minH="40px"
                      // id="register_dropdown"
                      backgroundColor={"none"}
                      onClick={() => {
                        navigate("/update-user");
                      }}
                    >
                      Cập nhật thông tin
                    </MenuItem>

                    {user.role == 1 && (
                      <MenuItem
                        minH="40px"
                        // id="register_dropdown"
                        backgroundColor={"none"}
                        onClick={() => navigate("/admin")}
                      >
                        Quản lý
                      </MenuItem>
                    )}
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <MenuItem
                        minH="40px"
                        onClick={() => setloginDropDown(!loginDropDown)}
                      >
                        Đăng nhập
                      </MenuItem>
                    </Link>
                    <Link to="/signup">
                      <MenuItem
                        minH="40px"
                        onClick={() => setloginDropDown(!loginDropDown)}
                      >
                        Đăng ký
                      </MenuItem>
                    </Link>
                  </>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      )}
      {!loading && <AllRoutes />}
      {!loading && <Footer />}
    </div>
  );
}

export default App;
