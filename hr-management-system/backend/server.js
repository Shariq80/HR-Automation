// backend/server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./config/db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes will go here

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});