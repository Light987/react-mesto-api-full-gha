const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cardRoutes = require('./routes/cards');
const userRoutes = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');
const { loginJoi, createUserJoi } = require('./middlewares/validation');
const errorCenter = require('./middlewares/errorCenter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// eslint-disable-next-line no-console
mongoose.connect(DB_URL).then(() => console.log('Connected to DB'));

app.use(cors({
  origin: [
    'http://myplace.nomoredomains.rocks',
    'https://myplace.nomoredomains.rocks',
    'http://api.myplace.nomoredomains.rocks',
    'https://api.myplace.nomoredomains.rocks',
  ],
  credentials: true,
}));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginJoi, login);
app.post('/signup', createUserJoi, createUser);

app.use(auth);
app.use(userRoutes);
app.use(cardRoutes);

app.use((req, res, next) => {
  next(new NotFound('Такой страницы нет.'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorCenter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
