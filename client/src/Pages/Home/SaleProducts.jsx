import React, { useEffect, useState } from "react";
// import "./Products.css";
import { MainProducts } from "../../Components/MainProducts";
import { useSelector } from "react-redux";
import { Box, Text, Wrap, SimpleGrid, Button, Flex } from "@chakra-ui/react";
import Loading from "../../Components/Loading";
import { animateScroll as scroll } from "react-scroll";

const SaleProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortPrice, setSortPrice] = useState(null);
  const [sorted, setSorted] = useState(false);

  const categories = useSelector((state) => state.categories.categories);
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    scroll.scrollToTop();
    setTimeout(() => {
      setData(getAllProducts(products));
      setLoading(false);
    }, [1000]);
  }, [products]);

  const getAllProducts = (data) => {
    const newProducts = data.filter((el) => el.sale === true);
    return newProducts;
  };
  console.log("check data: ", data);

  const sortProductsByPrice = () => {
    let sortedData = [...data];
    if (sortPrice === null) {
      sortedData.sort((a, b) => a.price - b.price); // Sắp xếp tăng dần
      setSortPrice(true);
    } else if (sortPrice) {
      sortedData.sort((a, b) => b.price - a.price); // Sắp xếp giảm dần
      setSortPrice(false);
    } else {
      sortedData = getAllProducts(products); // Khôi phục danh sách sản phẩm ban đầu
      setSortPrice(null);
    }
    setData(sortedData);
    setSorted(true);
  };

  return (
    <Box p={5}>
      <Text
        textAlign="center"
        fontSize="21px"
        textDecoration="underline 2px #ffffff"
        fontWeight="semibold"
        margin="15px"
      >
        Tất cả sản phẩm giảm giá
      </Text>

      <Flex justifyContent={"end"} px={5}>
        <Button
          justifySelf={"end"}
          onClick={() => {
            setSortPrice(!sortPrice);
            sortProductsByPrice();
          }}
          variant="outline"
          size="sm"
          alignSelf="flex-end"
          mb={2}
        >
          {sortPrice === null
            ? "Sắp xếp giá"
            : sortPrice
            ? "Giá tăng dần"
            : "Giá giảm dần"}
        </Button>
      </Flex>

      <Wrap justify="center" my={"16"}>
        {!loading && data.length === 0 && (
          <Box textAlign={"center"}>Không tìm thấy sản phẩm !</Box>
        )}

        <SimpleGrid w="90%" spacing={3} columns={[1, 2, 3, 4]} gap={5} m={5}>
          {data &&
            data.length !== 0 &&
            !loading &&
            data.map((value) => (
              <MainProducts
                key={value.id}
                id={value.id}
                image={value.imageUrl}
                name={value.productName}
                price={value.price}
                description={value.description}
              />
            ))}

          {loading && (
            <>
              <Loading />
              <Loading />
              <Loading />
              <Loading />
            </>
          )}
        </SimpleGrid>
      </Wrap>
    </Box>
  );
};
export { SaleProducts };
