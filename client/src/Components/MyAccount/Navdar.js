import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./Responsive.css";
import { BsSuitHeartFill, BsPersonFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import logo1 from "../../assets/images/logo-app.png";
import {
  Image,
  Text,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Button,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../reducers/user";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { convertPrice, removeDiacritics } from "../../Utils/convertData";

export default function Navdar() {
  const [loginDropDown, setloginDropDown] = useState(false);
  const [loginDropDown2, setloginDropDown2] = useState(false);
  const [userNmae, setUserName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    if (user) setUserName(user.firstName + " " + user.lastName);
  }, [user]);

  const doIt = () => {
    setloginDropDown(false);
    setloginDropDown2(false);
  };

  const filteredProducts = searchTerm
    ? products.filter(
        (product) =>
          removeDiacritics(product.productName.toLowerCase()).includes(
            removeDiacritics(searchTerm.toLowerCase())
          ) || parseFloat(product.price) === parseFloat(searchTerm)
      )
    : [];

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle clear search term
  const handleClearSearchTerm = () => {
    setSearchTerm("");
  };

  return (
    <div
      className="mid_nav_main"
      style={{
        backgroundColor: "#ffffff",
        // borderBottom: "1px solid black"
      }}
    >
      <div className="mid_nav_mid">
        <div className="mid_nav_first">
          {/* logo */}
          <div style={{ width: "30%", paddingLeft: "5%", marginTop: "-15px" }}>
            <Link to={"/"}>
              <Image
                h={"70px"}
                // w={"220px"}
                alt="logo"
                objectFit={"contain"}
                src={logo1}
              />{" "}
            </Link>
          </div>
          {/* end logo */}

          <div className="logo_div">
            <div
              className="user"
              onClick={() => setloginDropDown2(!loginDropDown2)}
            >
              <BsPersonFill />
            </div>
            {loginDropDown2 ? (
              <>
                <div id="content_dropdown2" onMouseOut={doIt}>
                  <Link to="/login">
                    <div
                      id="login_dropdown"
                      onClick={() => setloginDropDown2(!loginDropDown2)}
                    >
                      Login
                    </div>
                  </Link>
                  <Link to="/signup">
                    <div
                      id="register_dropdown"
                      onClick={() => setloginDropDown2(!loginDropDown2)}
                    >
                      Register
                    </div>
                  </Link>
                </div>
              </>
            ) : null}
          </div>

          {/* search bar */}
          <Flex
            borderRadius={10}
            bgColor={"white"}
            className="search_div"
            direction={"column"}
          >
            <InputGroup mb={0}>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                borderRadius={10}
                placeholder="Tìm kiếm sản phẩm"
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
              {searchTerm && (
                <InputRightElement>
                  <IconButton
                    // aria-label="Clear search"
                    icon={<CloseIcon />}
                    size="sm"
                    onClick={handleClearSearchTerm}
                  />
                </InputRightElement>
              )}
            </InputGroup>
            <Box
              w={"99%"}
              borderRadius={5}
              display={searchTerm ? "" : "none"}
              p={5}
              bgColor={"white"}
              zIndex={10000}
            >
              {filteredProducts.length === 0 ? (
                <>{searchTerm && <Text>Không tìm thấy sản phẩm.</Text>}</>
              ) : (
                filteredProducts.map((product) => (
                  <Flex
                    key={product.id}
                    alignItems="center"
                    mb={2}
                    cursor={"pointer"}
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      handleClearSearchTerm();
                    }}
                  >
                    <Image
                      src={`data:image/jpeg;base64,${product.imageUrl}`}
                      boxSize={"100px"}
                      objectFit="contain"
                      alt={product.productName}
                    />
                    <Text fontWeight={"semibold"} flex={1} mr={2}>
                      {product.productName}
                    </Text>
                    <Text fontWeight={"semibold"}>
                      {convertPrice(product.price)}
                    </Text>
                  </Flex>
                ))
              )}
            </Box>
          </Flex>
          {/* end search bar */}
        </div>

        {/* user */}
        <div className="mid_nav_sec">
          <Button
            backgroundColor={"#ffffff"}
            onClick={() => navigate("/favorite-list")}
          >
            <div
              style={{
                fontSize: "20px",
                color: "#000000",
              }}
            >
              <BsSuitHeartFill />
            </div>
          </Button>

          <Menu autoSelect={false}>
            <MenuButton backgroundColor={"#ffffff"} as={Button}>
              <div
                style={{
                  fontSize: "20px",
                  color: "#000000",
                }}
              >
                <BsPersonFill />
              </div>
            </MenuButton>

            <Box style={{ zIndex: "10000" }}>
              <MenuList>
                {user ? (
                  <>
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
            </Box>
          </Menu>
          {user ? <Text fontWeight={"bold"}>{userNmae}</Text> : ""}
        </div>
        {/* end user */}
      </div>
      <Divider
        mt="5px"
        mb="3px"
        orientation="horizontal"
        // style={{ color: "red", size: "20" }}
      />
    </div>
  );
}
