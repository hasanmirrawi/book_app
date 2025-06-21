const { Publisher, Book, Author } = require('../model');
const { Op } = require('sequelize');
exports.getAllPublisher = async (req, res) => {
  try {
    const publishers = await Publisher.findAll({
      attributes: ['id', 'PName',],
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
    const { PName, City } = req.body;

    if (!PName || !City) {
      return res.status(400).json({ message: 'Publisher name and city are required.' });
    }

    const existingPublisher = await Publisher.findOne({ where: { PName } });
    if (existingPublisher) {
      return res.status(409).json({ message: 'Publisher already exists.' });
    }

    const publisher = await Publisher.create({ PName, City });

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
    const { id } = req.params;
    const books = await Book.findAll({
      where: { pubId: id },
      include: [
        { model: Author, as: 'author' },
        { model: Publisher, as: 'publisher' },
      ],
    });

    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books by publisher:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};


exports.getPublisherById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid publisher ID' });
    }

    const publisher = await Publisher.findByPk(id);

    if (!publisher) {
      return res.status(404).json({ message: `Publisher with id ${id} not found.` });
    }

    return res.json(publisher);
  } catch (err) {
    console.error('Error fetching publisher:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
exports.searchPublishersByName = async (req, res) => {
  try {
    const name = req.params.name;

    const publishers = await Publisher.findAll({
      where: {
        PName: {
          [Op.startsWith]: `${name}%`, 
        },
      },
      order: [['PName', 'ASC']],
    });

    return res.status(200).json(publishers);
  } catch (error) {
    console.error('Error in searchPublishersByName:', error);
    return res.status(500).json({ message: error.message });
  }
};
