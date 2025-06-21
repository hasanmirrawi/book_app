const { Author, Book, Publisher } = require('../model/index');
const { Op } = require('sequelize');



exports.createBook = async (req, res) => {
  try {
    const { title, type, price, publisherId, authorId } = req.body;

    // 1️⃣ Validate presence
    if (![title, type, price, publisherId, authorId].every(v => v != null)) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // 2️⃣ Ensure related records exist
    const author = await Author.findByPk(authorId);
    if (!author) {
      return res.status(404).json({ message: 'Author not found.' });
    }
    const publisher = await Publisher.findByPk(publisherId);
    if (!publisher) {
      return res.status(404).json({ message: 'Publisher not found.' });
    }

    // 3️⃣ Create with matching attribute names
    const book = await Book.create({
      Title:       title,        // <-- capital T
      Type:        type,         // <-- capital T
      Price:       price,        // <-- capital P
      authorId:    authorId,     // likewise
      pubId: publisherId,  // assuming your associations use this FK name
    });

    return res.status(201).json({
      message: 'Book created successfully.',
      book,
    });
  } catch (error) {
    console.error('Error creating book:', error);
    return res.status(500).json({
      message: 'Internal server error.',
      error: error.message,
    });
  }
};


exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
    });
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.searchBooksByTitle = async (req, res) => {
  try {
    const { title } = req.params;

    // Only match titles that start with the given query
    const books = await Book.findAll({
      where: {
        title: {
          [Op.startsWith]: title
        }
      },
      order: [['title', 'ASC']],
      // include: [{ model: Author }, { model: Publisher }], // if you want associations
    });

    return res.status(200).json(books);
  } catch (error) {
    console.error('Error in searchBooksByTitle:', error);
    return res.status(500).json({ message: error.message });
  }
};