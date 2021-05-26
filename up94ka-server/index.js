const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const router = require('./router');
const messages = require('./messages');

const app = express();

const PORT = process.env.PORT || 8080;
const COOKIESECRET = process.env.CookieSecret;

app.use(express.json());
app.use(cookieParser(COOKIESECRET));

// app.use('/*', (req, _, next) => {
//   console.log(req.baseUrl);
//   next();
// });

app.use('/', router);

app.use((error, req, res, next) => {
  console.error(req.baseUrl, error.message, error.stack);
  res.status(500).send(messages.innerServerError);
  next();
});

const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.DbConnection, connectionOptions, (error) => {
  if (error) { console.error(error.message); }
});

app.listen(PORT, () => {
  console.log(`server on http://127.0.0.1:${PORT}`);
});
