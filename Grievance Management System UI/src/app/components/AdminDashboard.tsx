import { useState } from 'react';
import { StatusBadge } from './StatusBadge';

interface Grievance {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Rejected';
  date: string;
  location: string;
  assignedTo?: string;
}

export function AdminDashboard() {
  const [grievances] = useState<Grievance[]>([
    {
      id: 'GRV001',
      title: 'Street Light Not Working',
      category: 'Infrastructure',
      description: 'Street light near Gandhi Chowk has not been working for 3 days',
      status: 'In Progress',
      date: '2026-04-20',
      location: 'Gandhi Chowk, Ward 3',
      assignedTo: 'Operator 1',
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
    {
      id: 'GRV003',
      title: 'Garbage Collection Delay',
      category: 'Sanitation',
      description: 'Garbage has not been collected for a week',
      status: 'Pending',
      date: '2026-04-23',
      location: 'MG Road, Ward 2',
    },
    {
      id: 'GRV004',
      title: 'Road Repair Required',
      category: 'Roads',
      description: 'Large pothole causing accidents',
      status: 'Resolved',
      date: '2026-04-18',
      location: 'Station Road, Ward 1',
      assignedTo: 'Operator 2',
    },
    {
      id: 'GRV005',
      title: 'Drainage Blockage',
      category: 'Sanitation',
      description: 'Drainage system blocked causing water logging',
      status: 'In Progress',
      date: '2026-04-21',
      location: 'Park Street, Ward 4',
      assignedTo: 'Operator 1',
    },
  ]);

  const [timeFilter, setTimeFilter] = useState('7days');

  const categoryData = [
    { name: 'Infrastructure', count: 1, color: 'bg-blue-500' },
    { name: 'Water Supply', count: 1, color: 'bg-cyan-500' },
    { name: 'Sanitation', count: 2, color: 'bg-green-500' },
    { name: 'Roads', count: 1, color: 'bg-orange-500' },
  ];

  const maxCount = Math.max(...categoryData.map((c) => c.count));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-gray-900">Admin Dashboard</h2>
          <p className="text-gray-600 mt-1">Overview and analytics</p>
        </div>
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <p className="text-sm opacity-90 mb-1">Total Grievances</p>
          <p className="text-white">{grievances.length}</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-sm opacity-90 mb-1">Pending</p>
          <p className="text-white">{grievances.filter((g) => g.status === 'Pending').length}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <p className="text-sm opacity-90 mb-1">In Progress</p>
          <p className="text-white">{grievances.filter((g) => g.status === 'In Progress').length}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-sm opacity-90 mb-1">Resolved</p>
          <p className="text-white">{grievances.filter((g) => g.status === 'Resolved').length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-6">Grievances by Category</h3>
          <div className="space-y-4">
            {categoryData.map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">{category.name}</span>
                  <span className="text-sm text-gray-900">{category.count}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`${category.color} h-2 rounded-full transition-all`}
                    style={{ width: `${(category.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-6">Resolution Rate</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-40 h-40">
              <svg className="transform -rotate-90 w-40 h-40">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-gray-200"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={`${(grievances.filter((g) => g.status === 'Resolved').length / grievances.length) * 440} 440`}
                  className="text-green-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-900">
                    {Math.round((grievances.filter((g) => g.status === 'Resolved').length / grievances.length) * 100)}%
                  </p>
                  <p className="text-xs text-gray-500">Resolved</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-gray-900">{grievances.filter((g) => g.status === 'Pending').length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-gray-900">{grievances.filter((g) => g.status === 'In Progress').length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-gray-900">{grievances.filter((g) => g.status === 'Resolved').length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-6">Recent Grievances</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-600">ID</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Title</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Category</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Location</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {grievances.map((grievance) => (
                <tr key={grievance.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-gray-900">{grievance.id}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{grievance.title}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{grievance.category}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{grievance.location}</td>
                  <td className="py-4 px-4">
                    <StatusBadge status={grievance.status} />
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{grievance.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
