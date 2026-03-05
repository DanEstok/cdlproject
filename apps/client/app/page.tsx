'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  dueDate: string;
}

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      setTasks([
        {
          id: '1',
          title: 'Complete intake forms',
          status: 'TODO',
          dueDate: '2024-01-15',
        },
        {
          id: '2',
          title: 'Upload ID document',
          status: 'DONE',
          dueDate: '2024-01-10',
        },
        {
          id: '3',
          title: 'Schedule medical evaluation',
          status: 'IN_PROGRESS',
          dueDate: '2024-01-20',
        },
      ]);

      setAppointments([
        {
          id: '1',
          title: 'Case Management Session',
          date: '2024-01-15',
          time: '2:00 PM',
        },
        {
          id: '2',
          title: 'Medical Evaluation',
          date: '2024-01-20',
          time: '10:00 AM',
        },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'DONE':
        return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Recovery Journey</h1>
        <p className="text-gray-600">Track your progress and manage your recovery program</p>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tasks Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Your Tasks</h3>
                <Link href="/tasks" className="text-blue-600 hover:text-blue-800 text-sm">
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={task.status === 'DONE'}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        readOnly
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{task.title}</p>
                        <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTaskStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Appointments Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Upcoming Appointments</h3>
                <Link href="/appointments" className="text-blue-600 hover:text-blue-800 text-sm">
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="border-l-4 border-blue-500 pl-4">
                    <p className="text-sm font-medium text-gray-900">{appointment.title}</p>
                    <p className="text-xs text-gray-500">
                      {appointment.date} at {appointment.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/documents/upload"
                className="block p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <div className="text-2xl mb-2">📄</div>
                <p className="text-sm font-medium text-gray-900">Upload Document</p>
              </Link>
              <Link
                href="/tasks/new"
                className="block p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <div className="text-2xl mb-2">✅</div>
                <p className="text-sm font-medium text-gray-900">Update Task</p>
              </Link>
              <Link
                href="/appointments/schedule"
                className="block p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <div className="text-2xl mb-2">📅</div>
                <p className="text-sm font-medium text-gray-900">Schedule Appointment</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}
