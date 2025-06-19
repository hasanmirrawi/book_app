const publisherController = require('../controllers/publisher_controller.js');
const express = require('express');

const publisherRouter = express.Router();

publisherRouter.post('/add-publisher', publisherController.addPublisher);
publisherRouter.get('/get-publisher', publisherController.getAllPublisher);
publisherRouter.get('/publishers/:id', publisherController.getPublisherById);

publisherRouter.get('/search/:name', publisherController.searchPublishersByName);
publisherRouter.get('/:id/books', publisherController.getBooksByPublisher);

module.exports = publisherRouter;
