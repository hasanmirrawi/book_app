const bookController = require('../controllers/book_controller.js');
const express = require('express');

const bookRouter = express.Router();

bookRouter.post('/add-book',bookController.createBook);
bookRouter.get('/get-book', bookController.getAllBooks);
bookRouter.get('/search/:title', bookController.searchBooksByTitle);

module.exports = bookRouter;