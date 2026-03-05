'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ScheduleAppointmentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    appointmentType: '',
    date: '',
    time: '',
    location: '',
    notes: '',
  });
  const [scheduling, setScheduling] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setScheduling(true);
    // Schedule logic here
    setTimeout(() => {
      setScheduling(false);
      router.push('/appointments');
    }, 2000);
  };

  const appointmentTypes = [
    { value: 'MEDICAL', label: 'Medical Evaluation', icon: '🏥' },
    { value: 'COUNSELING', label: 'Counseling Session', icon: '💬' },
    { value: 'CASE_MANAGER', label: 'Case Manager Meeting', icon: '👤' },
    { value: 'EVALUATION', label: 'Drug Screening', icon: '📋' },
    { value: 'GROUP', label: 'Group Therapy', icon: '👥' },
    { value: 'OTHER', label: 'Other', icon: '📅' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule Appointment</h1>
        <p className="text-gray-600">Book a new appointment with your recovery team</p>
      </div>

        <div className="bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {appointmentTypes.map((type) => (
                  <label
                    key={type.value}
                    className="relative flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="appointmentType"
                      value={type.value}
                      checked={formData.appointmentType === type.value}
                      onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value })}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{type.icon}</span>
                      <span className="text-sm font-medium text-gray-900">{type.label}</span>
                    </div>
                    {formData.appointmentType === type.value && (
                      <div className="absolute top-2 right-2">
                        <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
              <select
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select time</option>
                <option value="09:00">9:00 AM</option>
                <option value="09:30">9:30 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="10:30">10:30 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="11:30">11:30 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="14:30">2:30 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="15:30">3:30 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="16:30">4:30 PM</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select location</option>
                <option value="Recovery Center">Recovery Center</option>
                <option value="Medical Center">Medical Center</option>
                <option value="Virtual - Zoom">Virtual - Zoom</option>
                <option value="Testing Facility">Testing Facility</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Any additional information or special requests (optional)"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Appointment Guidelines</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Please arrive 15 minutes early for your appointment</li>
                <li>• Bring required documents and ID</li>
                <li>• Virtual appointments will receive a link via email</li>
                <li>• Cancel or reschedule at least 24 hours in advance</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/appointments')}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={scheduling}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {scheduling ? 'Scheduling...' : 'Schedule Appointment'}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}
