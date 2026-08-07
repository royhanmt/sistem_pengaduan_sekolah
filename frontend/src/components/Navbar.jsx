import React from 'react';

const Navbar = ({ toggleSidebar }) => {
    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-4">
                <button onClick={toggleSidebar} className="md:hidden text-gray-600 focus:outline-none text-2xl">
                    ☰
                </button>
                <h2 className="text-lg font-semibold text-gray-800">Sistem Pengaduan Siswa</h2>
            </div>

            <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    R
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">Royhan (Siswa)</span>
            </div>
        </header>
    );
};

export default Navbar;