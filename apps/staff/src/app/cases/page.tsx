'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Case {
  id: string;
  clientName: string;
  status: 'OPEN' | 'PAUSED' | 'CLOSED';
  programType: string;
  nextTaskDue?: string;
  primaryCaseManager?: string;
  openedAt: string;
}

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    // Mock data - replace with API call
    setCases([
      {
        id: '1',
        clientName: 'John Doe',
        status: 'OPEN',
        programType: 'CCM',
        nextTaskDue: '2024-01-15',
        primaryCaseManager: 'Jane Smith',
        openedAt: '2024-01-01',
      },
      {
        id: '2',
        clientName: 'Jane Smith',
        status: 'OPEN',
        programType: 'SAP',
        nextTaskDue: '2024-01-16',
        primaryCaseManager: 'John Doe',
        openedAt: '2024-01-02',
      },
      {
        id: '3',
        clientName: 'Bob Johnson',
        status: 'PAUSED',
        programType: 'SOBER_COACHING',
        nextTaskDue: undefined,
        primaryCaseManager: 'Jane Smith',
        openedAt: '2024-01-03',
      },
    ]);
  }, []);

  const filteredCases = cases.filter((case_) => {
    const matchesFilter = filter === 'all' || case_.status === filter;
    const matchesSearch = case_.clientName.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cases</h1>
            <p className="text-gray-600">Manage client cases and programs</p>
          </div>
          <Link
            href="/cases/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            New Case
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search cases..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('OPEN')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'OPEN'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Open
              </button>
              <button
                onClick={() => setFilter('PAUSED')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'PAUSED'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Paused
              </button>
              <button
                onClick={() => setFilter('CLOSED')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'CLOSED'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Closed
              </button>
            </div>
          </div>
        </div>

        {/* Cases Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Case Manager
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Task Due
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Opened
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCases.map((case_) => (
                <tr key={case_.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{case_.clientName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        case_.status === 'OPEN'
                          ? 'bg-green-100 text-green-800'
                          : case_.status === 'PAUSED'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {case_.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {case_.programType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {case_.primaryCaseManager || 'Unassigned'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {case_.nextTaskDue || 'None'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {case_.openedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/cases/${case_.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
