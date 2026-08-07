import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: '📊' },
        { name: 'Buat Pengaduan', path: '/pengaduan/baru', icon: '📝' },
        { name: 'Tracking Status', path: '/tracking', icon: '🔍' },
    ];

    return (
        <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-800 text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 flex flex-col justify-between`}>
            <div>
                <div className="flex items-center justify-between p-4 border-b border-slate-700">
                    <h1 className="text-xl font-bold text-blue-400">Pengaduan Sekolah</h1>
                    <button onClick={toggleSidebar} className="md:hidden text-gray-400 hover:text-white">✕</button>
                </div>
                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-slate-700'}`}
                        >
                            <span>{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="p-4 border-t border-slate-700">
                <Link to="/login" className="flex items-center space-x-3 p-3 rounded-lg text-red-400 hover:bg-slate-700 w-full">
                    <span>🚪</span>
                    <span className="font-medium">Logout</span>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;