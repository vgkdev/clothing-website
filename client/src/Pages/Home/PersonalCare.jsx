import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  Button,
  Stack,
  Wrap,
  SimpleGrid,
} from "@chakra-ui/react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { dataUrl } from "../../share";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { MainProducts } from "../../Components/MainProducts";

const PersonalCare = () => {
  const [products, setProducts] = useState([]);

  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    const personalCareProducts = categories.filter((value) => {
      return value.categoryName === "Sản phẩm chức năng";
    });
    setProducts(personalCareProducts[0].Products);
  }, [categories]);
  console.log("check products: ", products);

  return (
    <Box p={5}>
      <Text
        textAlign="center"
        fontSize="21px"
        textDecoration="underline 2px #ffffff"
        fontWeight="semibold"
        margin="15px"
      >
        Sản phẩm chức năng
      </Text>

      <Wrap justify="center" my={"16"}>
        <SimpleGrid w="90%" spacing={3} columns={[1, 2, 3, 4]} gap={5} m={5}>
          {products &&
            products.map((value, i) => (
              <MainProducts
                key={value.id}
                id={value.id}
                image={value.imageUrl}
                name={value.productName}
                price={value.price}
                description={value.description}
              />
              // <></>
            ))}
        </SimpleGrid>
      </Wrap>
      <ToastContainer position="top-center" autoClose={3000} />
    </Box>
  );
};
export default PersonalCare;
