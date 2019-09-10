const { STRING, ARRAY, INTEGER } = require("sequelize");
const sequelize = require("../database/connection");

const Recipe = sequelize.define("Recipe", {
  title: STRING,
  ingredients: ARRAY(INTEGER),
  instructions: ARRAY(STRING)
});

module.exports = Recipe;
