import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [pengaduan, setPengaduan] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Ambil data saat komponen di-load
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/data');
            const data = await res.json();
            setPengaduan(data);
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Yakin ingin menghapus pengaduan ini?")) return;
        try {
            await fetch(`http://localhost:5000/api/data/${id}`, { method: 'DELETE' });
            fetchData(); // Refresh data
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await fetch(`http://localhost:5000/api/data/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            fetchData(); // Refresh data
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Filter pencarian berdasarkan deskripsi atau kategori
    const filteredData = pengaduan.filter(item =>
        item.deskripsi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kategori?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-6xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Pengaduan</h1>
                <button onClick={handleLogout} className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600">
                    Logout
                </button>
            </div>

            <div className="flex items-center justify-between mb-4">
                <input
                    type="text"
                    placeholder="Cari pengaduan..."
                    className="w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Link to="/pengaduan/baru" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    + Buat Pengaduan
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-3 font-semibold text-gray-600">Kategori</th>
                            <th className="p-3 font-semibold text-gray-600">Deskripsi</th>
                            <th className="p-3 font-semibold text-gray-600">Status</th>
                            <th className="p-3 font-semibold text-gray-600">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <tr key={item._id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{item.kategori}</td>
                                    <td className="p-3">{item.deskripsi}</td>
                                    <td className="p-3">
                                        <select
                                            value={item.status || 'Pending'}
                                            onChange={(e) => handleUpdateStatus(item._id, e.target.value)}
                                            className={`px-2 py-1 text-sm rounded outline-none border ${item.status === 'Selesai' ? 'bg-green-100 text-green-700 border-green-300' :
                                                    item.status === 'Diproses' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                                                        'bg-gray-100 text-gray-700 border-gray-300'
                                                }`}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Diproses">Diproses</option>
                                            <option value="Selesai">Selesai</option>
                                        </select>
                                    </td>
                                    <td className="p-3 space-x-2">
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-4 text-center text-gray-500">Data pengaduan belum ada atau tidak ditemukan.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}