import User from './model/user';

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', async (req,res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
