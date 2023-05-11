"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductSize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductSize.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  ProductSize.init(
    {
      productId: DataTypes.INTEGER,
      size: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductSize",
    }
  );
  return ProductSize;
};
