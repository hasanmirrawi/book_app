module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    FName: { type: DataTypes.STRING, allowNull: false },
    LName: { type: DataTypes.STRING, allowNull: false },
    Country: { type: DataTypes.STRING, allowNull: false },
    City: { type: DataTypes.STRING, allowNull: false },
    Address: { type: DataTypes.STRING, allowNull: false },
  });
  return Author;
};