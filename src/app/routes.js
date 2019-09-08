const routes = require("express").Router();
const RecipesController = require("./controllers/RecipesController");

routes.get("/recipes", RecipesController.index);
routes.post("/recipes", RecipesController.create);
routes.get("/recipes/:id", RecipesController.read);

module.exports = routes;
