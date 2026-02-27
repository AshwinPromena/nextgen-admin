import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Users,
    Briefcase,
    LogOut
} from 'lucide-react';
import { Tooltip, Popconfirm } from 'antd';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ collapsed }) => {
    const { logout } = useAuth();

    const menuItems = [
        {
            key: 'delegates',
            label: 'Delegate Registration',
            icon: <Users size={20} />,
            path: '/delegates',
        },
        {
            key: 'enquiries',
            label: 'Exhibitor/Sponsor',
            icon: <Briefcase size={20} />,
            path: '/enquiries',
        },
    ];

    return (
        <div
            className={`bg-white border-r border-gray-200 transition-all duration-300 h-screen sticky top-0 flex flex-col ${collapsed ? 'w-20' : 'w-64'
                }`}
        >
            {/* Sidebar Header */}
            <div className="h-24 flex items-center justify-center border-b border-gray-50 shrink-0 overflow-hidden">
                {collapsed ? (
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-xl overflow-hidden shadow bg-white">
                        <img
                            src="/app-logo-small.jpeg"
                            alt="Nexgen"
                            className="w-10 h-10 object-contain"
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center px-4 h-full w-full">
                        <img
                            src="/app-logo.jpeg"
                            alt="Nexgen Logo"
                            className="h-auto max-h-[80%] w-full object-contain filter drop-shadow-sm"
                        />
                    </div>
                )}
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-3 space-y-2 py-6 overflow-y-auto">
                {menuItems.map((item) => (
                    <Tooltip
                        key={item.key}
                        title={collapsed ? item.label : ''}
                        placement="right"
                    >
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`
                            }
                        >
                            <div className="shrink-0 flex items-center justify-center">
                                {item.icon}
                            </div>
                            {!collapsed && (
                                <span className="ml-3 font-medium text-sm truncate">{item.label}</span>
                            )}
                        </NavLink>
                    </Tooltip>
                ))}
            </nav>

            {/* Sidebar Footer (Logout) */}
            <div className="p-4 border-t border-gray-100 shrink-0">
                <Tooltip title={collapsed ? 'Logout' : ''} placement="right">
                    <Popconfirm
                        title={<span className="text-lg font-bold">Logout</span>}
                        description={<div className="text-sm pt-1">Are you sure you want to logout?</div>}
                        onConfirm={logout}
                        okText="Yes"
                        cancelText="No"
                        placement="right"
                        overlayStyle={{ width: '280px' }}
                        align={{ offset: [0, -100] }}
                    >
                        <button
                            className="w-full flex items-center px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200 group cursor-pointer"
                        >
                            <div className="shrink-0 flex items-center justify-center">
                                <LogOut size={20} />
                            </div>
                            {!collapsed && (
                                <span className="ml-3 font-medium text-sm">Logout</span>
                            )}
                        </button>
                    </Popconfirm>
                </Tooltip>
            </div>
        </div>
    );
};

export default Sidebar;
