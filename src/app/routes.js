const routes = require("express").Router();
const RecipesController = require("./controllers/RecipesController");

routes.get("/recipes", RecipesController.index);
routes.get("/recipes/:id", RecipesController.read);
routes.post("/recipes/:id?", RecipesController.save);
routes.delete("/recipes/:id", RecipesController.delete);

module.exports = routes;
