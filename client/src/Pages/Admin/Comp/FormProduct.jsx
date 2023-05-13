import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  Checkbox,
  Flex,
} from "@chakra-ui/react";

const FormProduct = (props) => {
  const {
    product,
    categories,
    type,
    handleEditProduct,
    handleCreateProduct,
    handleEditProductImage,
  } = props;
  const [categoryId, setCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [price, setPrice] = useState("");
  const [numberOfSizeS, setNumberOfSizeS] = useState("");
  const [numberOfSizeM, setNumberOfSizeM] = useState("");
  const [numberOfSizeL, setNumberOfSizeL] = useState("");
  const [isSale, setIsSale] = useState(false);
  const [isNew, setIsNew] = useState(false);

  // console.log("check product form: ", product);

  useEffect(() => {
    if (type === "Update") {
      setProductName(product.productName);
      setNumberOfSizeS(product.ProductSizes[0].quantity);
      setNumberOfSizeM(product.ProductSizes[1].quantity);
      setNumberOfSizeL(product.ProductSizes[2].quantity);
      setIsSale(product.sale);
      setIsNew(product.newProduct);
      setPrice(product.price);
      setDescription(product.description);
      setCategoryId(product.categoryId);
      setImageUrl(product.imageUrl);
    }
  }, [type, product]);

  const handleOnClickSubmit = () => {
    if (type === "Create") {
      const data = {
        categoryId: categoryId,
        productName: productName,
        price: price,
        description: description,
        imageUrl: imageUrl,
        numberOfSizeS: numberOfSizeS,
        numberOfSizeM: numberOfSizeM,
        numberOfSizeL: numberOfSizeL,
        sale: isSale,
        newProduct: isNew,
      };
      console.log("check data: ", data);
      handleCreateProduct(data);
    } else if (type === "Update") {
      const data = {
        id: product.id,
        newProductName: productName,
        productName: product.productName,
        categoryId: categoryId,
        price: price,
        description: description,
        numberOfSizeS: numberOfSizeS,
        numberOfSizeM: numberOfSizeM,
        numberOfSizeL: numberOfSizeL,
        sale: isSale || false,
        newProduct: isNew || false,
      };
      console.log("check data in form: ", data);
      handleEditProduct(data);
    } else {
      const data = {
        id: product.id,
        imageUrl: imageUrl,
      };
      handleEditProductImage(data);
    }
  };

  //   console.log("check data in form: ", user);
  return (
    <form>
      <Stack spacing={3}>
        <FormControl display={type === "Update_image" ? "none" : ""}>
          <FormLabel>Tên sản phẩm</FormLabel>
          <Input
            type="text"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
            placeholder="Tên sản phẩm"
            disabled={type === "Detail"}
          />
        </FormControl>

        <FormLabel>Số lượng sản phẩm các size:</FormLabel>
        <Flex gap={5}>
          <FormControl display={type === "Update_image" ? "none" : ""}>
            <FormLabel>Size S</FormLabel>
            <Input
              type="text"
              value={numberOfSizeS}
              onChange={(event) => setNumberOfSizeS(event.target.value)}
              placeholder="Số lượng"
              disabled={type === "Detail"}
            />
          </FormControl>

          <FormControl display={type === "Update_image" ? "none" : ""}>
            <FormLabel>Size M</FormLabel>
            <Input
              type="text"
              value={numberOfSizeM}
              onChange={(event) => setNumberOfSizeM(event.target.value)}
              placeholder="Số lượng"
              disabled={type === "Detail"}
            />
          </FormControl>

          <FormControl display={type === "Update_image" ? "none" : ""}>
            <FormLabel>Size L</FormLabel>
            <Input
              type="text"
              value={numberOfSizeL}
              onChange={(event) => setNumberOfSizeL(event.target.value)}
              placeholder="Số lượng"
              disabled={type === "Detail"}
            />
          </FormControl>
        </Flex>

        <FormControl display={type === "Update_image" ? "none" : ""}>
          <FormLabel>Giá</FormLabel>
          <Input
            type="text"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Giá"
            disabled={type === "Detail"}
          />
        </FormControl>

        <Flex style={{ margin: "20px 0" }}>
          <FormControl>
            {/* <FormLabel>Sale</FormLabel> */}
            <Checkbox
              name="sale"
              isChecked={isSale}
              onChange={() => setIsSale(!isSale)}
            >
              Sale
            </Checkbox>
          </FormControl>

          <FormControl>
            {/* <FormLabel>Sản phẩm mới</FormLabel> */}
            <Checkbox
              name="new product"
              isChecked={isNew}
              onChange={() => setIsNew(!isNew)}
            >
              Sản phẩm mới
            </Checkbox>
          </FormControl>
        </Flex>

        <FormControl display={type === "Update_image" ? "none" : ""}>
          <FormLabel>Mô tả</FormLabel>
          <Input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Mô tả"
            disabled={type === "Detail"}
          />
        </FormControl>

        <FormControl display={type === "Update_image" ? "none" : ""}>
          <FormLabel>Tên danh mục</FormLabel>
          <Select
            name="categoryName"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
          >
            <option value={""}>---Tên danh mục---</option>
            {categories.map((value) => (
              <option key={value.id} value={value.id}>
                {value.categoryName}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl display={type === "Update" ? "none" : ""}>
          <FormLabel>Ảnh</FormLabel>
          <Input
            type="file"
            onChange={(event) => setImageUrl(event.target.files[0])}
            disabled={type === "Detail"}
          />
        </FormControl>

        {type !== "Detail" && (
          <Button colorScheme="teal" onClick={handleOnClickSubmit}>
            Submit
          </Button>
        )}
      </Stack>
    </form>
  );
};

export default FormProduct;
