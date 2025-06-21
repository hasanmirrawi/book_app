const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/db.config.js');
const auther = require('./auther');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
});

const User = require('./user')(sequelize, DataTypes);
const Author = require('./auther')(sequelize, DataTypes);
const Publisher = require('./publisher')(sequelize, DataTypes);
const Book = require('./book')(sequelize, DataTypes);

Book.belongsTo(Author, { foreignKey: 'authorId', as: 'author' });
Author.hasMany(Book, { foreignKey: 'authorId', as: 'books' });

Book.belongsTo(Publisher, { foreignKey: 'pubId', as: 'publisher' });
Publisher.hasMany(Book, { foreignKey: 'pubId', as: 'books' });

Book.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });
User.hasMany(Book, { foreignKey: 'createdBy', as: 'createdBooks' });

module.exports = { sequelize, Sequelize, User, Author, Publisher, Book,};
