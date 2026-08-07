const User = require('../models/User');

// POST /register
exports.register = async (req, res) => {
    try {
        const { nama, email, password, role } = req.body;

        // Validasi Input Dasar
        if (!nama || !email || !password) {
            return res.status(400).json({ message: 'Semua field harus diisi' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        const newUser = new User({ nama, email, password, role });
        await newUser.save();

        res.status(201).json({ message: 'Registrasi berhasil', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// POST /login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email dan password wajib diisi' });
        }

        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        res.status(200).json({ message: 'Login berhasil', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};