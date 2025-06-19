
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    Title: { type: DataTypes.STRING, allowNull: false },
    Type: { type: DataTypes.STRING, allowNull: false },
    Price: { type: DataTypes.FLOAT, allowNull: false },
    
  });
  return Book;
};
