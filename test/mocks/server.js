import express from 'express'

const port = 7777
const app = express()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Accept, Authorization"
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE')
    return res
      .status(200)
      .json({})
  }
  next()
});
app.use(express.static('public'));
app.use('/health-check', (req, res, next) => {
  res
    .status(200)
    .json({ message: 'I`m alive!' })
})
app.use('/uploads', express.static('./test/mocks'))
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
app.listen(port, () => {
  console.log('News API Mocked server runned on port:', port)
})
