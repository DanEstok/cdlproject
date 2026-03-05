'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: '🏠' },
    { name: 'Tasks', href: '/tasks', icon: '✅' },
    { name: 'Documents', href: '/documents', icon: '📄' },
    { name: 'Appointments', href: '/appointments', icon: '📅' },
    { name: 'Profile', href: '/profile', icon: '👤' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="text-2xl">🏥</div>
                <span className="text-xl font-bold text-blue-600">Recovery Platform</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive(item.href)
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } transition-colors duration-200`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <span className="text-xl">🔔</span>
            </button>
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <span className="text-xl">⚙️</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="text-xl">{mobileMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2 text-base font-medium ${
                  isActive(item.href)
                    ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                } transition-colors duration-200`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4 space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">JD</span>
              </div>
              <div className="flex-1">
                <div className="text-base font-medium text-gray-800">John Doe</div>
                <div className="text-sm font-medium text-gray-500">john.doe@example.com</div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <button className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-gray-800 hover:bg-gray-100 w-full text-left">
                <span className="mr-2">🔔</span>
                Notifications
              </button>
              <button className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-gray-800 hover:bg-gray-100 w-full text-left">
                <span className="mr-2">⚙️</span>
                Settings
              </button>
              <button className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-gray-800 hover:bg-gray-100 w-full text-left">
                <span className="mr-2">🚪</span>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
