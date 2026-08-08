const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const apiRoutes = require('./routes/apiRoutes'); // <-- Import Router

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Gunakan Prefix /api
app.use('/api', apiRoutes); // <-- Gunakan Router

app.get('/', (req, res) => {
    res.send('API Sistem Pengaduan Sekolah Berjalan!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});// Health check endpoint
/* CORS Configuration */
