import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from 'antd';
import { Menu, ChevronLeft } from 'lucide-react';

const TopNavbar = ({ collapsed, setCollapsed }) => {
    const { user } = useAuth();

    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-40 backdrop-blur-md bg-white/80">
            <div className="flex items-center">
                <Button
                    type="text"
                    icon={collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center justify-center hover:bg-gray-100 rounded-lg text-gray-500 mr-4"
                    size="large"
                />
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex items-center">
                    <div className="mr-3 text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-700 leading-none">{user?.name || 'Admin'}</p>
                        <p className="text-xs text-gray-400 mt-1">{user?.email}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopNavbar;
