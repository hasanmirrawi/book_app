const authorController = require('../controllers/auther_controller.js');
const express = require('express');

const authorRouter = express.Router();

authorRouter.post('/addAuther',authorController.addAuthor);
authorRouter.get('/getAuther',authorController.getAllAuthors);

authorRouter.get('/authors/:id',authorController.getAuthorById);

authorRouter.get('/search/:name', authorController.searchAuthorsByName);
// authorRouter.get('/:id/books', authorController.getBooksByAuthor);

module.exports = authorRouter;