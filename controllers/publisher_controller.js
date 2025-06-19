const { Publisher, Book, Author } = require('../model');
const { Op } = require('sequelize');
exports.getAllPublisher = async (req, res) => {
  try {
    const publishers = await Author.findAll({
      attributes: ['id', 'FName', 'LName'],
      order: [['LName', 'ASC']],
    });

    res.status(200).json({
      message: 'Publishers retrieved successfully.',
      publishers,
    });
  } catch (error) {
    console.error('Error fetching publisher:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};
exports.addPublisher = async (req, res) => {
  try {
    const { FName, City } = req.body;

    if (!FName || !City) {
      return res.status(400).json({ message: 'Publisher name and city are required.' });
    }

    const existingPublisher = await Publisher.findOne({ where: { FName } });
    if (existingPublisher) {
      return res.status(409).json({ message: 'Publisher already exists.' });
    }

    const publisher = await Publisher.create({ FName, City });

    res.status(201).json({
      message: 'Publisher added successfully.',
      publisher,
    });
  } catch (error) {
    console.error('Error adding publisher:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

exports.searchPublishersByName = async (req, res) => {
  try {
    const name = req.params.name;
    const publishers = await Publisher.findAll({
      where: {
        PName: { [Op.like]: `%${name}%` }
      }
    });
    res.json(publishers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBooksByPublisher = async (req, res) => {
  try {
    const books = await Book.findAll({
      where: { pubId: req.params.id },
      include: [Author, Publisher]
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getPublisherById = async (req, res) => {
  try {
    const { id } = req.params;
    const publisher = await Publisher.findByPk(id);

    if (!publisher) {
      return res.status(404).json({ message: 'Publisher not found.' });
    }

    return res.json(publisher);
  } catch (err) {
    console.error('Error fetching publisher:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
