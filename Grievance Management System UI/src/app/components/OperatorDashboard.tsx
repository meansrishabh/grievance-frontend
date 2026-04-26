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

export function OperatorDashboard() {
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);
  const [grievances, setGrievances] = useState<Grievance[]>([
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
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');

  const updateStatus = (id: string, newStatus: 'Pending' | 'In Progress' | 'Resolved' | 'Rejected') => {
    setGrievances(grievances.map((g) => (g.id === id ? { ...g, status: newStatus } : g)));
    if (selectedGrievance?.id === id) {
      setSelectedGrievance({ ...selectedGrievance, status: newStatus });
    }
  };

  const filteredGrievances = grievances.filter(
    (g) => filterStatus === 'all' || g.status === filterStatus
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-gray-900">Operator Dashboard</h2>
        <p className="text-gray-600 mt-1">Process and manage grievances</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Grievances</p>
              <p className="text-gray-900">{grievances.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-gray-900">{grievances.filter((g) => g.status === 'Pending').length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">In Progress</p>
              <p className="text-gray-900">{grievances.filter((g) => g.status === 'In Progress').length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Resolved</p>
              <p className="text-gray-900">{grievances.filter((g) => g.status === 'Resolved').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('Pending')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterStatus === 'Pending' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilterStatus('In Progress')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterStatus === 'In Progress' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilterStatus('Resolved')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterStatus === 'Resolved' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Resolved
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-gray-900">Grievances List</h3>
          {filteredGrievances.map((grievance) => (
            <div
              key={grievance.id}
              onClick={() => setSelectedGrievance(grievance)}
              className={`bg-white rounded-xl shadow-sm border p-4 cursor-pointer transition-all ${
                selectedGrievance?.id === grievance.id
                  ? 'border-blue-500 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-sm text-gray-500">{grievance.id}</span>
                  <h4 className="text-gray-900 mt-1">{grievance.title}</h4>
                </div>
                <StatusBadge status={grievance.status} />
              </div>
              <p className="text-sm text-gray-600 mb-3">{grievance.description}</p>
              <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                <span>{grievance.category}</span>
                <span>•</span>
                <span>{grievance.location}</span>
                <span>•</span>
                <span>{grievance.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div>
          {selectedGrievance ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="text-gray-900 mb-6">Grievance Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Grievance ID</label>
                  <p className="text-gray-900">{selectedGrievance.id}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Title</label>
                  <p className="text-gray-900">{selectedGrievance.title}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Category</label>
                  <p className="text-gray-900">{selectedGrievance.category}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Description</label>
                  <p className="text-gray-900">{selectedGrievance.description}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Location</label>
                  <p className="text-gray-900">{selectedGrievance.location}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Date Submitted</label>
                  <p className="text-gray-900">{selectedGrievance.date}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Current Status</label>
                  <div className="mt-2">
                    <StatusBadge status={selectedGrievance.status} />
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-sm text-gray-600 mb-3">Update Status</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateStatus(selectedGrievance.id, 'In Progress')}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      Mark In Progress
                    </button>
                    <button
                      onClick={() => updateStatus(selectedGrievance.id, 'Resolved')}
                      className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      Mark Resolved
                    </button>
                    <button
                      onClick={() => updateStatus(selectedGrievance.id, 'Rejected')}
                      className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500">Select a grievance to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
