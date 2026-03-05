'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'MEDICAL' | 'COUNSELING' | 'CASE_MANAGER' | 'EVALUATION';
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  location: string;
  notes?: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      setAppointments([
        {
          id: '1',
          title: 'Medical Evaluation',
          date: '2024-01-20',
          time: '10:00 AM',
          type: 'MEDICAL',
          status: 'SCHEDULED',
          location: 'Recovery Medical Center',
          notes: 'Bring photo ID and insurance card',
        },
        {
          id: '2',
          title: 'Counseling Session',
          date: '2024-01-15',
          time: '2:00 PM',
          type: 'COUNSELING',
          status: 'COMPLETED',
          location: 'Virtual - Zoom',
        },
        {
          id: '3',
          title: 'Case Manager Meeting',
          date: '2024-01-25',
          time: '11:00 AM',
          type: 'CASE_MANAGER',
          status: 'SCHEDULED',
          location: 'Recovery Center Office',
        },
        {
          id: '4',
          title: 'Drug Screening',
          date: '2024-01-10',
          time: '9:00 AM',
          type: 'EVALUATION',
          status: 'CANCELLED',
          location: 'Testing Facility',
          notes: 'Rescheduled for next week',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'MEDICAL':
        return '🏥';
      case 'COUNSELING':
        return '💬';
      case 'CASE_MANAGER':
        return '👤';
      case 'EVALUATION':
        return '📋';
      default:
        return '📅';
    }
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(a.date + ' ' + a.time);
    const dateB = new Date(b.date + ' ' + b.time);
    return dateA.getTime() - dateB.getTime();
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments</h1>
        <p className="text-gray-600">Manage your recovery program appointments</p>
      </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Upcoming Appointments</h2>
              <Link
                href="/appointments/schedule"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Schedule Appointment
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {sortedAppointments.map((apt) => (
              <div key={apt.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl mt-1">{getTypeIcon(apt.type)}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{apt.title}</h3>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="font-medium">📅 {apt.date}</span>
                          <span className="font-medium">🕐 {apt.time}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>📍 {apt.location}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                            {apt.status}
                          </span>
                        </div>
                        {apt.notes && (
                          <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded">
                            📝 {apt.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {apt.status === 'SCHEDULED' && (
                      <>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Reschedule
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                          Cancel
                        </button>
                      </>
                    )}
                    {apt.status === 'COMPLETED' && (
                      <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                        View Notes
                      </button>
                    )}
                    {apt.status === 'CANCELLED' && (
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Reschedule
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl">📅</div>
              <h3 className="text-lg font-medium text-gray-900">Total Appointments</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">{appointments.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl">✅</div>
              <h3 className="text-lg font-medium text-gray-900">Completed</h3>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {appointments.filter(a => a.status === 'COMPLETED').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl">⏳</div>
              <h3 className="text-lg font-medium text-gray-900">Upcoming</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {appointments.filter(a => a.status === 'SCHEDULED').length}
            </p>
          </div>
        </div>
      </div>
  );
}
