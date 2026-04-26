import { useState } from 'react';
import { Link } from 'react-router';
import { StatusBadge } from './StatusBadge';

interface Grievance {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Rejected';
  date: string;
  location: string;
}

export function CitizenPortal() {
  const [showForm, setShowForm] = useState(false);
  const [grievances, setGrievances] = useState<Grievance[]>([
    {
      id: 'GRV001',
      title: 'Street Light Not Working',
      category: 'Infrastructure',
      description: 'Street light near Gandhi Chowk has not been working for 3 days',
      status: 'In Progress',
      date: '2026-04-20',
      location: 'Gandhi Chowk, Ward 3',
    },
    {
      id: 'GRV002',
      title: 'Water Supply Issue',
      category: 'Water Supply',
      description: 'No water supply in our area for the last 2 days',
      status: 'Pending',
      date: '2026-04-22',
      location: 'Nehru Colony, Ward 5',
    },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGrievance: Grievance = {
      id: `GRV${String(grievances.length + 1).padStart(3, '0')}`,
      ...formData,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
    };
    setGrievances([newGrievance, ...grievances]);
    setFormData({ title: '', category: '', description: '', location: '' });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">Nagar Panchayat</h1>
                <p className="text-xs text-gray-600">Grievance Management System</p>
              </div>
            </div>

            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-gray-900">Citizen Portal</h2>
          <p className="text-gray-600 mt-1">Submit and track your grievances</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          {showForm ? 'Cancel' : '+ New Grievance'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-gray-900 mb-6">Submit New Grievance</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Grievance Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief title of your grievance"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Water Supply">Water Supply</option>
                  <option value="Sanitation">Sanitation</option>
                  <option value="Roads">Roads</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Location</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Area, Ward Number"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Provide detailed description of the issue"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Submit Grievance
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-gray-900">My Grievances</h3>
        {grievances.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No grievances submitted yet</p>
          </div>
        ) : (
          grievances.map((grievance) => (
            <div
              key={grievance.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-gray-500">{grievance.id}</span>
                    <StatusBadge status={grievance.status} />
                  </div>
                  <h4 className="text-gray-900 mb-2">{grievance.title}</h4>
                  <p className="text-gray-600 mb-4">{grievance.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {grievance.category}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {grievance.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {grievance.date}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
}
