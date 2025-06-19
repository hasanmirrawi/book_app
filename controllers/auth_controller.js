const { User } = require('../model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const sessionStore = require('../utils/session_store');

exports.signup = async (req, res) => {
  try {
    const { username, password, firstName, lastName ,isAdmin} = req.body;
    if (!username || !password || !firstName || !lastName) {
      return res.status(400).send({ message: 'Missing required fields.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      isAdmin: isAdmin || false, 

    });

    res.status(201).send({
      message: 'User registered successfully!',
      user: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin:user.isAdmin
      }
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const {username,password} = req.body;

    if (!username || !password)
      return res.status(400).json({ message: 'Missing username or password' });

    const user = await User.findOne({ where: { username } });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    sessionStore.addSession(user.id, {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    req.userId=user.id;

    res.status(200).json({
      message: 'Login successful',
      token,
      userId: user.id,
      user: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: 'Missing username or password' });

    const user = await User.findOne({ where: { username } });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    sessionStore.addSession(user.id, {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    req.userId=user.id;

    res.status(200).json({
      message: 'Login successful',
      token,
      userId: user.id,
      user: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const sessionStore = require('../utils/session_store');

exports.logout = (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id;

    if (!sessionStore.getSession(userId)) {
      return res.status(404).json({ message: 'Session not found' });
    }

    sessionStore.removeSession(userId);
    res.status(200).json({ message: 'Logout successful' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

