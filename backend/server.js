const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import connectDB
const connectDB = require('./config/db');

// Jalankan Koneksi Database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Sistem Pengaduan Sekolah Berjalan!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});