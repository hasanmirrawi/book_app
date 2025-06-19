const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');

dotenv.config();

const authRoutes = require('./routes/auth_routes');
const bookRoutes = require('./routes/book_routes');
const authorRoutes = require('./routes/auther_routes');
const publisherRoutes = require('./routes/publisher_routes');

const { sequelize } = require('./model/index.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// معالجة multipart/form-data
const upload = multer();
app.use(upload.none());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/publishers', publisherRoutes);

sequelize.sync({})
  .then(() => {
    console.log('Database synced successfully');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });
