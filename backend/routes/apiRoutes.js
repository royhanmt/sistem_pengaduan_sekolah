const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const pengaduanController = require('../controllers/pengaduanController');

// Endpoint Auth
router.post('/register', authController.register);
router.post('/login', authController.login);

// Endpoint CRUD Data Pengaduan
router.get('/data', pengaduanController.getAllPengaduan);
router.get('/data/:id', pengaduanController.getPengaduanById);
router.post('/data', pengaduanController.createPengaduan);
router.put('/data/:id', pengaduanController.updatePengaduan);
router.delete('/data/:id', pengaduanController.deletePengaduan);

module.exports = router;