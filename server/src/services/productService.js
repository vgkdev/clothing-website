import db from "../models/index";

const addProductSize = async (productId, size, quantity) => {
  try {
    await db.ProductSize.create({
      productId: productId,
      size: size,
      quantity: quantity,
    });
  } catch (e) {
    console.log("error in create product size: ", e);
  }
};

const updateProductSize = async (productId, size, quantity) => {
  try {
    await db.ProductSize.update(
      {
        quantity: quantity,
      },
      {
        where: { productId: productId, size: size },
        returning: true,
        plain: true,
      }
    );
  } catch (e) {
    console.log("error in update product size: ", e);
  }
};

const deleteProductSize = async (productId) => {
  try {
    await db.ProductSize.destroy({
      where: { productId: productId },
    });
  } catch (e) {
    console.log("error in delete product size: ", e);
  }
};

const createNewProduct = (data, image) => {
  const {
    categoryId,
    productName,
    description,
    price,
    sale,
    newProduct,
    numberOfSizeS,
    numberOfSizeM,
    numberOfSizeL,
  } = data;
  const imageUrl = image.buffer;
  console.log("check image: ", image.buffer);
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !(
          categoryId &&
          productName &&
          description &&
          price &&
          imageUrl &&
          numberOfSizeS &&
          numberOfSizeM &&
          numberOfSizeL
        ) ||
        sale === null ||
        newProduct === null
      ) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const isExist = await db.Product.findOne({
        where: { productName: data.productName },
      });

      //   console.log("check is exist: ", isExist);
      if (isExist) {
        resolve({
          errCode: 2,
          message: "Product existed !",
        });
      } else {
        const result = await db.Product.create({
          categoryId: categoryId,
          productName: productName,
          description: description,
          imageUrl: imageUrl,
          price: price,
          quantity:
            Number(numberOfSizeS) +
            Number(numberOfSizeM) +
            Number(numberOfSizeL),
          sale: sale,
          newProduct: newProduct,
        });

        await Promise.all([
          await addProductSize(result.id, "S", numberOfSizeS),
          await addProductSize(result.id, "M", numberOfSizeM),
          await addProductSize(result.id, "L", numberOfSizeL),
        ]);

        if (result) {
          const product = await db.Product.findAll({
            include: [
              {
                model: db.Category,
                attributes: ["categoryName"],
              },
              {
                model: db.ProductSize,
                attributes: ["size", "quantity"],
              },
            ],
          });
          console.log("check product: ", product);
          resolve({
            errCode: 0,
            message: "Create new product successfully",
            product,
          });
        } else {
          resolve({
            errCode: 6,
            message: "Server create product error !",
          });
        }
      }
    } catch (e) {
      console.log("Error: ", e);
      reject({
        errCode: 500,
        message: "Internal server error",
      });
    }
  });
};

const getALlProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await db.Product.findAll({
        include: [
          {
            model: db.Category,
            attributes: ["categoryName"],
          },
          {
            model: db.ProductSize,
            attributes: ["size", "quantity"],
          },
        ],
      }); // => array

      if (product.length !== 0) {
        // const productsWithImageUrl = product.map((item) => ({
        //   ...item.toJSON(),
        //   imageUrl: `${req.protocol}://${req.get("host")}/${item.imageUrl}`,
        // }));
        // // product.imageUrl = productsWithImageUrl;
        // console.log("check product: ", product);
        resolve({
          errCode: 0,
          message: "Get all categories successfully",
          product,
        });
      } else {
        resolve({
          errCode: 3,
          message: "Product not found !",
        });
      }
    } catch (e) {
      console.log("Error: ", e);
      reject({
        errCode: 500,
        message: "Internal server error",
      });
    }
  });
};

const editProduct = (data) => {
  const {
    id,
    categoryId,
    productName,
    description,
    price,
    newProductName,
    sale,
    newProduct,
    numberOfSizeS,
    numberOfSizeM,
    numberOfSizeL,
  } = data;
  // console.log("check data update: ", data);
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !(
          productName &&
          newProductName &&
          id &&
          categoryId &&
          description &&
          price
        ) ||
        sale === null ||
        newProduct === null ||
        numberOfSizeS === null ||
        numberOfSizeM === null ||
        numberOfSizeL === null
      ) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      let isExist = "";
      if (productName !== newProductName) {
        isExist = await db.Product.findOne({
          where: { productName: newProductName },
        });
      } else {
        isExist = false;
      }

      if (isExist) {
        resolve({
          errCode: 2,
          message: "Product existed !",
        });
      } else {
        const [numAffectedRows, updatedRows] = await db.Product.update(
          {
            categoryId: categoryId,
            productName: newProductName,
            description: description,
            price: price,
            quantity:
              Number(numberOfSizeS) +
              Number(numberOfSizeM) +
              Number(numberOfSizeL),
            sale: sale,
            newProduct: newProduct,
          },
          {
            where: { id: data.id },
            returning: true,
            plain: true,
          }
        );

        await Promise.all([
          updateProductSize(id, "S", numberOfSizeS),
          updateProductSize(id, "M", numberOfSizeM),
          updateProductSize(id, "L", numberOfSizeL),
        ]);

        if (updatedRows !== 0) {
          const product = await db.Product.findAll({
            include: [
              {
                model: db.Category,
                attributes: ["categoryName"],
              },
              {
                model: db.ProductSize,
                attributes: ["size", "quantity"],
              },
            ],
          });

          resolve({
            errCode: 0,
            message: "Product has been updated",
            product,
          });
        } else {
          resolve({
            errCode: 3,
            message: "Product not found !",
          });
        }
      }
    } catch (e) {
      console.log("Error: ", e);
      reject({
        errCode: 500,
        message: "Internal server error",
      });
    }
  });
};

const editProductInage = (data, image) => {
  const imageUrl = image.buffer;
  return new Promise(async (resolve, reject) => {
    try {
      if (!imageUrl) {
        // console.log("check missing paremeter: ", imageUrl);
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const [numAffectedRows, updatedRows] = await db.Product.update(
        {
          imageUrl: imageUrl,
        },
        {
          where: { id: data.id },
          returning: true,
          plain: true,
        }
      );

      if (updatedRows !== 0) {
        const product = await db.Product.findAll({
          include: [
            {
              model: db.Category,
              attributes: ["categoryName"],
            },
            {
              model: db.ProductSize,
              attributes: ["size", "quantity"],
            },
          ],
        });

        resolve({
          errCode: 0,
          message: "Product image has been updated",
          product,
        });
      } else {
        resolve({
          errCode: 3,
          message: "Product not found !",
        });
      }
    } catch (e) {
      console.log("Error: ", e);
      reject({
        errCode: 500,
        message: "Internal server error",
      });
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      await Promise.all([deleteProductSize(id)]);

      const result = await db.Product.destroy({
        where: { id: id },
      });

      // console.log("check delete product: ", result);
      if (result !== 0) {
        const product = await db.Product.findAll({
          include: [
            {
              model: db.Category,
              attributes: ["categoryName"],
            },
            {
              model: db.ProductSize,
              attributes: ["size", "quantity"],
            },
          ],
        });
        resolve({
          errCode: 0,
          message: "Product has been deleted !",
          product,
        });
      } else {
        resolve({
          errCode: 3,
          message: "Product not found !",
        });
      }
    } catch (e) {
      console.log("Error: ", e);
      reject({
        errCode: 500,
        message: "Internal server error",
      });
    }
  });
};

module.exports = {
  createNewProduct,
  getALlProducts,
  editProduct,
  editProductInage,
  deleteProduct,
};
