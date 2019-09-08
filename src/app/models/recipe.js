"use strict";
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define("Recipe", {
    title: DataTypes.STRING,
    ingredients: DataTypes.ARRAY(DataTypes.INTEGER),
    instructions: DataTypes.ARRAY(DataTypes.STRING)
  });

  return Recipe;
};
