const express = require('express');
const app = express();
require('dotenv').config();
const pool = require('./db');

app.use(express.json());

// FINISH THIS HERE
app.get('/', (req, res) => {
  res.send('API is running');
});

//Should the listener be in a separate file or ?
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
