import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function InputPengaduan() {
    const [formData, setFormData] = useState({ kategori: 'Fasilitas', deskripsi: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                alert('Pengaduan berhasil dikirim!');
                navigate('/dashboard');
            } else {
                alert('Gagal mengirim pengaduan.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-2xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-700">Buat Pengaduan Baru</h2>
                <Link to="/dashboard" className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300">Kembali</Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">Kategori</label>
                    <select
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.kategori}
                        onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    >
                        <option value="Fasilitas">Fasilitas Sekolah</option>
                        <option value="Kurikulum">Kurikulum / Belajar</option>
                        <option value="Layanan">Layanan / Administrasi</option>
                        <option value="Lainnya">Lainnya</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">Deskripsi Masalah</label>
                    <textarea
                        required
                        rows="5"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Jelaskan kendala secara detail..."
                        onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    ></textarea>
                </div>
                <button type="submit" className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
                    Kirim Pengaduan
                </button>
            </form>
        </div>
    );
}