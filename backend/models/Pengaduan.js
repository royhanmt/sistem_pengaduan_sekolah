const mongoose = require('mongoose');

const pengaduanSchema = new mongoose.Schema({
    // Relasi ke User (Siswa yang melapor)
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    kategori: { type: String, required: true, enum: ['Fasilitas', 'Bullying', 'Akademik', 'Lainnya'] },
    deskripsi: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Diproses', 'Selesai'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Pengaduan', pengaduanSchema);