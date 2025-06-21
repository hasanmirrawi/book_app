const auther = require('../model/auther');
const { Author, Book, Publisher } = require('../model/index');
const { Op } = require('sequelize');

exports.addAuthor = async (req, res) => {
  try {
    const { FName, LName, Country, City, Address } = req.body;

    if (!City || !Country || !FName || !LName || !Address) {
      return res.status(400).send({ message: 'Missing required fields.' });
    }

    const author = await Author.create({
      FName,
      LName,
      Country,
      City,
      Address,
    });

    res.status(201).send({
      message: 'Author added successfully!',
      author,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.searchAuthorsByName = async (req, res) => {
  try {
    const name = req.params.name;

    const authors = await Author.findAll({
      where: {
        [Op.or]: [
          { FName: { [Op.startsWith]: name } },
        ]
      },
      order: [['LName', 'ASC']],
      attributes: ['id', 'FName', 'LName', 'Country', 'City', 'Address']
    });

    res.json(authors);
  } catch (error) {
    console.error('Error in searchAuthorsByName:', error);
    res.status(500).json({ error: error.message });
  }
};
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll({
      attributes: ['id', 'FName', 'LName'],
      order: [['LName', 'ASC']],
    });

    res.status(200).json({
      message: 'Authors retrieved successfully.',
      authors,
    });
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};
exports.getAuthorById = async (req, res) => {
  try {
    const id = req.params.id; 
    const author = await Author.findByPk(id);

    if (!author) {
      return res.status(404).json({ message: 'Author not found.' });
    }

    return res.json(author);
  } catch (err) {
    console.error('Error fetching author:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
exports.getBooksByAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const books = await Book.findAll({
      where: { authorId: id },
      include: [
        { model: Author, as: 'author' },
        { model: Publisher, as: 'publisher' },
      ],
    });

    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books by author:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};
