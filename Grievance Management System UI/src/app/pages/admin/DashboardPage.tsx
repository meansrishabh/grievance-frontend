import { useState } from 'react';
import { StatusBadge } from '../../components/StatusBadge';

interface Complaint {
  id: string;
  citizenName: string;
  department: string;
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Rejected';
  date: string;
  title: string;
}

export function AdminDashboardPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const [complaints] = useState<Complaint[]>([
    { id: 'CMP001', citizenName: 'Rajesh Kumar', department: 'Infrastructure', status: 'In Progress', date: '2026-04-20', title: 'Street Light Not Working' },
    { id: 'CMP002', citizenName: 'Priya Sharma', department: 'Water Supply', status: 'Pending', date: '2026-04-22', title: 'Water Supply Issue' },
    { id: 'CMP003', citizenName: 'Amit Patel', department: 'Sanitation', status: 'Pending', date: '2026-04-23', title: 'Garbage Collection Delay' },
    { id: 'CMP004', citizenName: 'Sunita Verma', department: 'Roads', status: 'Resolved', date: '2026-04-18', title: 'Road Repair Required' },
    { id: 'CMP005', citizenName: 'Vikram Singh', department: 'Sanitation', status: 'In Progress', date: '2026-04-21', title: 'Drainage Blockage' },
    { id: 'CMP006', citizenName: 'Meena Devi', department: 'Electricity', status: 'Resolved', date: '2026-04-19', title: 'Power Outage' },
    { id: 'CMP007', citizenName: 'Ramesh Gupta', department: 'Infrastructure', status: 'Pending', date: '2026-04-24', title: 'Park Maintenance' },
    { id: 'CMP008', citizenName: 'Kavita Jain', department: 'Water Supply', status: 'In Progress', date: '2026-04-25', title: 'Low Water Pressure' },
  ]);

  const filteredComplaints = complaints.filter((c) => {
    const statusMatch = statusFilter === 'all' || c.status === statusFilter;
    const deptMatch = departmentFilter === 'all' || c.department === departmentFilter;
    return statusMatch && deptMatch;
  });

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === 'Pending').length,
    inProgress: complaints.filter((c) => c.status === 'In Progress').length,
    resolved: complaints.filter((c) => c.status === 'Resolved').length,
  };

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Complaints</p>
              <p className="text-gray-900">{stats.total}</p>
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
              <p className="text-gray-900">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">In Progress</p>
              <p className="text-gray-900">{stats.inProgress}</p>
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
              <p className="text-gray-900">{stats.resolved}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Complaint Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900 mb-4">Complaint Management</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Department</label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Water Supply">Water Supply</option>
                <option value="Sanitation">Sanitation</option>
                <option value="Roads">Roads</option>
                <option value="Electricity">Electricity</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Complaint ID</th>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Citizen Name</th>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Department</th>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Status</th>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Date</th>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint, index) => (
                <tr
                  key={complaint.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }`}
                >
                  <td className="py-4 px-6 text-sm text-gray-900">{complaint.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{complaint.citizenName}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{complaint.department}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={complaint.status} />
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{complaint.date}</td>
                  <td className="py-4 px-6">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredComplaints.length} of {complaints.length} complaints
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              1
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
