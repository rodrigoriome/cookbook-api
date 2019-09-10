const Recipe = require("../models/recipe");

module.exports = {
  async index(req, res) {
    await Recipe.findAll()
      .then(recipes => res.send(recipes))
      .catch(err => res.status(500).send(err));
  },

  async read(req, res) {
    const { id } = req.params;
    await Recipe.findByPk(id).then(recipe =>
      recipe ? res.send(recipe) : res.status(404).send(`Could not find recipe of id ${id}`)
    );
  },

  async save(req, res) {
    const { title, ingredients, instructions } = req.body;

    let errors = {};
    const isNewRecipe = req.params.id ? false : true;

    // validate title
    if (!title) {
      if (isNewRecipe) {
        errors.title = "Dados incompletos";
      }
    } else if (typeof title !== "string") {
      errors.title = "Dados inválidos";
    }

    // validate ingredients
    if (ingredients) {
      if (!ingredients.length && isNewRecipe) {
        errors.ingredients = "Dados incompletos";
      } else if (!Array.isArray(ingredients)) {
        errors.ingredients = "Dados inválidos";
      }
    }

    // validate instructions
    if (instructions) {
      if (!instructions.length && isNewRecipe) {
        errors.instructions = "Dados incompletos";
      } else if (!Array.isArray(instructions)) {
        errors.instructions = "Dados inválidos";
      }
    }

    if (!errors.title && !errors.ingredients && !errors.instructions) {
      if (isNewRecipe) {
        return await Recipe.create({ title, ingredients, instructions }).then(recipe => res.status(201).send(recipe));
      } else {
        let oldRecipe = await Recipe.findByPk(req.params.id);

        if (!oldRecipe) {
          return res.status(404).send({ error: `Could not find recipe of id ${req.params.id}` });
        }

        const newRecipe = Object.assign(oldRecipe, req.body);
        return newRecipe
          .save()
          .then(recipe => res.status(201).send(recipe))
          .catch(err => res.status(500).send(err));
      }
    }

    return res.status(400).send({ errors });
  },

  async delete(req, res) {
    await Recipe.findByPk(req.params.id)
      .then(recipe => recipe.destroy().then(result => res.send(result)))
      .catch(err => res.status(500).send(err));
  }
};
