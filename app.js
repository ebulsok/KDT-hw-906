// @ts-check
const express = require('express');

const app = express();
const PORT = 4000;

const userRouter = require('./routes/users');

const postsRouter = require('./routes/posts');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));
app.use('/users', userRouter);
app.use('/posts', postsRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.send(err.message);
});

app.listen(PORT, () => {
  console.log(`The express server is running at port: ${PORT}`);
});
