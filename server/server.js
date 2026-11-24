const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const interviewRoutes = require('./routes/interviewRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Smart Interview API is running');
});

app.use('/api/interview', interviewRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error('DB Error:', err));