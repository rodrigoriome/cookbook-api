const { Recipe } = require("../models");

module.exports = {
  index(req, res) {
    return res.send("hello world");
  },

  async read(req, res) {
    const { id } = req.params;
    await Recipe.findByPk(id).then(recipe => {
      if (recipe) {
        return res.send(recipe);
      }

      return res.status(404).send(`Could not find recipe of id ${id}`);
    });
  },

  async create(req, res) {
    const { title, ingredients, instructions } = req.body;
    if (title && ingredients && instructions) {
      await Recipe.create({ title, ingredients, instructions })
        .then(recipe => res.status(201).send(recipe))
        .catch(error => res.status(400).send({ error }));
    } else {
      return res.status(400).send({ error: "Dados incompletos" });
    }
  }
};
