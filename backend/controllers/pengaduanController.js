const Pengaduan = require('../models/Pengaduan');

// GET /data (Dengan fitur Query Pencarian)
exports.getAllPengaduan = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        // Query pencarian berdasarkan deskripsi atau kategori
        if (search) {
            query = {
                $or: [
                    { deskripsi: { $regex: search, $options: 'i' } },
                    { kategori: { $regex: search, $options: 'i' } }
                ]
            };
        }

        // Relasi data ke User
        const data = await Pengaduan.find(query).populate('user', 'nama email');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// GET /data/:id
exports.getPengaduanById = async (req, res) => {
    try {
        const data = await Pengaduan.findById(req.params.id).populate('user', 'nama email');
        if (!data) return res.status(404).json({ message: 'Data tidak ditemukan' });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// POST /data
exports.createPengaduan = async (req, res) => {
    try {
        const { user, kategori, deskripsi } = req.body;

        if (!user || !kategori || !deskripsi) {
            return res.status(400).json({ message: 'Semua field wajib diisi' });
        }

        const newPengaduan = new Pengaduan({ user, kategori, deskripsi });
        await newPengaduan.save();

        res.status(201).json({ message: 'Pengaduan berhasil dibuat', data: newPengaduan });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// PUT /data/:id (Update Status/Deskripsi)
exports.updatePengaduan = async (req, res) => {
    try {
        const updated = await Pengaduan.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: 'Data tidak ditemukan' });

        res.status(200).json({ message: 'Pengaduan berhasil diperbarui', data: updated });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// DELETE /data/:id
exports.deletePengaduan = async (req, res) => {
    try {
        const deleted = await Pengaduan.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Data tidak ditemukan' });

        res.status(200).json({ message: 'Pengaduan berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};