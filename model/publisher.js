module.exports = (sequelize, DataTypes) => {
  const Publisher = sequelize.define('Publisher', {
    PName: { type: DataTypes.STRING, allowNull: false },
    City: { type: DataTypes.STRING, allowNull: false },
  });
  return Publisher;
};