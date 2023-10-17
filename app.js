const express = require('express');
const auth = require('./routes/auth');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const note = require('./routes/note');
const methodOverride = require('method-override');
const app = express();
const { notFound, errorHandler } = require('./middleware//errorMiddleware');
const protect = require('./middleware/auth');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie-parser middleware
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use('/api/auth', auth);
app.use('/api/notes', protect, note);
app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('hello world');
});
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
