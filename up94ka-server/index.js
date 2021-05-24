const app = require('express')();

const router = require('./router');

const PORT = process.env.PORT || 8080;

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`server on http://127.0.0.1:${PORT}`);
});
