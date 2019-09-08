module.exports = {
  index(req, res) {
    return res.send("hello world");
  },

  read(req, res) {
    const recipeObject = {
      id: 1,
      title: "Pão com ovo",
      ingredients: [2, 4],
      instructions: [
        "Frite o ovo.",
        "Abra o pão ao meio com uma faca de dentes.",
        "Coloque o ovo frito dentro do pão.",
        "Sirva-se."
      ]
    };

    return res.send(recipeObject);
  },

  create(req, res) {
    return res.status(201).send();
  }
};
