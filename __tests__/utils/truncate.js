module.exports = model => model.destroy({ truncate: true, force: true, restartIdentity: true });
