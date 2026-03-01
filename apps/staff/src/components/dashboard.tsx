'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DashboardStats {
  openCases: number;
  overdueTasks: number;
  expiringDocuments: number;
  unpaidInvoices: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    openCases: 0,
    overdueTasks: 0,
    expiringDocuments: 0,
    unpaidInvoices: 0,
  });

  useEffect(() => {
    // Mock data - replace with API call
    setStats({
      openCases: 42,
      overdueTasks: 8,
      expiringDocuments: 3,
      unpaidInvoices: 12,
    });
  }, []);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Staff operations console</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">C</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Open Cases</p>
              <p className="text-2xl font-bold text-gray-900">{stats.openCases}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">T</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.overdueTasks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">D</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Expiring Documents</p>
              <p className="text-2xl font-bold text-gray-900">{stats.expiringDocuments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">$</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Unpaid Invoices</p>
              <p className="text-2xl font-bold text-gray-900">{stats.unpaidInvoices}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/cases"
              className="block p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">Cases</h3>
              <p className="text-sm text-gray-600">Manage client cases and programs</p>
            </Link>

            <Link
              href="/tasks"
              className="block p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tasks</h3>
              <p className="text-sm text-gray-600">View and manage task queues</p>
            </Link>

            <Link
              href="/people"
              className="block p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">People</h3>
              <p className="text-sm text-gray-600">Manage clients and contacts</p>
            </Link>

            <Link
              href="/documents"
              className="block p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">Documents</h3>
              <p className="text-sm text-gray-600">Upload and manage documents</p>
            </Link>

            <Link
              href="/verifications"
              className="block p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">Verifications</h3>
              <p className="text-sm text-gray-600">Track compliance verifications</p>
            </Link>

            <Link
              href="/billing"
              className="block p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">Billing</h3>
              <p className="text-sm text-gray-600">Manage invoices and payments</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
