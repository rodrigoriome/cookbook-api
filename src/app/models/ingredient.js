"use strict";
module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define("Ingredient", {
    name: DataTypes.STRING
  });

  return Ingredient;
};
