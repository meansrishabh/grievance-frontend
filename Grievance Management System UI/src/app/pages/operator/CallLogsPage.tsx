import { useState } from 'react';

interface CallLog {
  id: string;
  callerNumber: string;
  callerName: string;
  date: string;
  time: string;
  duration?: string;
  status: 'Answered' | 'Missed';
  complaintId?: string;
}

export function CallLogsPage() {
  const [filterStatus, setFilterStatus] = useState('all');

  const [callLogs] = useState<CallLog[]>([
    { id: '1', callerNumber: '+91 98765 43210', callerName: 'Rajesh Kumar', date: '2026-04-25', time: '10:30 AM', status: 'Answered', duration: '5:23', complaintId: 'CMP008' },
    { id: '2', callerNumber: '+91 87654 32109', callerName: 'Priya Sharma', date: '2026-04-25', time: '10:15 AM', status: 'Answered', duration: '3:45', complaintId: 'CMP007' },
    { id: '3', callerNumber: '+91 76543 21098', callerName: 'Unknown', date: '2026-04-25', time: '09:58 AM', status: 'Missed' },
    { id: '4', callerNumber: '+91 65432 10987', callerName: 'Amit Patel', date: '2026-04-25', time: '09:45 AM', status: 'Answered', duration: '7:12', complaintId: 'CMP006' },
    { id: '5', callerNumber: '+91 54321 09876', callerName: 'Sunita Verma', date: '2026-04-24', time: '04:30 PM', status: 'Answered', duration: '4:35', complaintId: 'CMP005' },
    { id: '6', callerNumber: '+91 43210 98765', callerName: 'Unknown', date: '2026-04-24', time: '03:15 PM', status: 'Missed' },
    { id: '7', callerNumber: '+91 32109 87654', callerName: 'Vikram Singh', date: '2026-04-24', time: '02:45 PM', status: 'Answered', duration: '6:18', complaintId: 'CMP004' },
  ]);

  const filteredLogs = callLogs.filter((log) => {
    if (filterStatus === 'all') return true;
    return log.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-gray-900">Call Logs</h2>
          <p className="text-gray-600 mt-1">View all call history and details</p>
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All Calls</option>
          <option value="Answered">Answered</option>
          <option value="Missed">Missed</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Calls</p>
              <p className="text-gray-900">{callLogs.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Answered</p>
              <p className="text-gray-900">{callLogs.filter((c) => c.status === 'Answered').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Missed</p>
              <p className="text-gray-900">{callLogs.filter((c) => c.status === 'Missed').length}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900">Call History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Caller Number</th>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Caller Name</th>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Date</th>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Time</th>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Duration</th>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Status</th>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Complaint ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => (
                <tr
                  key={log.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }`}
                >
                  <td className="py-4 px-6 text-sm text-gray-900">{log.callerNumber}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{log.callerName}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{log.date}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{log.time}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{log.duration || '-'}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${
                        log.status === 'Answered'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-blue-600">
                    {log.complaintId || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredLogs.length} of {callLogs.length} calls
          </p>
        </div>
      </div>
    </div>
  );
}
