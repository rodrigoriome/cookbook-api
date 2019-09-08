const { sequelize } = require("../../src/app/models");

module.exports = () => {
  return Promise.all(
    Object.keys(sequelize.models).map(model => {
      return sequelize.models[model].destroy({ truncate: true, force: true, restartIdentity: true });
    })
  );
};
