const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const secret = 'your_jwt_secret'; // Секретний ключ для підпису токенів

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/contactsApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
});

const contactSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);
const Contact = mongoose.model('Contact', contactSchema);

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ message: 'Username or Email already exists' });
    } else {
      res.status(500).send({ message: 'Error registering user' });
    }
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const authToken = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
    return res.json({ token: authToken, user: { username: user.username, email: user.email } });

    // Перевірка та обробка токену
    const requestToken = req.headers['authorization'];
    if (requestToken) {
      jwt.verify(requestToken, secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized' });
        } else {
          req.userId = decoded.userId;
          next();
        }
      });
    } else {
      return res.status(401).json({ message: 'No token provided' });
    }
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});


app.get('/contacts', async (req, res) => {
  const contacts = await Contact.find({ userId: req.userId });
  res.json(contacts);
});

app.post('/contacts', async (req, res) => {
  const contact = new Contact({ ...req.body, userId: req.userId });
  await contact.save();
  res.status(201).send(contact);
});

app.put('/contacts/:id', async (req, res) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  if (contact) {
    res.send(contact);
  } else {
    res.status(404).send({ message: 'Contact not found' });
  }
});

app.delete('/contacts/:id', async (req, res) => {
  const contact = await Contact.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  if (contact) {
    res.status(204).send();
  } else {
    res.status(404).send({ message: 'Contact not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
