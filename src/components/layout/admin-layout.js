"use client";

import React, { useState } from 'react';
import { 
  ChevronLeft,
  LayoutDashboard,
  Users,
  MapPin,
  Calendar,
  Ticket,
  UserCog,
  Settings,
  LogOut,
  Menu
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin/dashboard'
    },
    {
      title: 'Motoristas',
      icon: UserCog,
      path: '/admin/drivers'
    },
    {
      title: 'Viagens',
      icon: Calendar,
      path: '/admin/trips'
    },
    {
      title: 'Rotas',
      icon: MapPin,
      path: '/admin/routes'
    },
    {
      title: 'Clientes',
      icon: Users,
      path: '/admin/customers'
    },
    {
      title: 'Cupons',
      icon: Ticket,
      path: '/admin/coupons'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 z-40 h-screen transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r bg-white`}
        style={{ width: '280px' }}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-600">Admin Panel</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-2 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Menu */}
        <div className="absolute bottom-0 left-0 right-0 border-t p-4">
          <div className="space-y-2">
            <Link
              href="/admin/settings"
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              <Settings size={20} />
              <span>Configurações</span>
            </Link>
            <button
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full"
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'lg:ml-[280px]' : ''}`}>
        {/* Top Bar */}
        <header className="h-16 border-b bg-white">
          <div className="flex h-full items-center justify-between px-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className={`p-2 rounded-lg hover:bg-gray-100 ${sidebarOpen ? 'lg:hidden' : ''}`}
            >
              <Menu size={20} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;