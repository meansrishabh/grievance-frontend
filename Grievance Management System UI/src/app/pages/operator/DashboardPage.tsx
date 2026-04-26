import { useState, useEffect } from 'react';

interface CallLog {
  id: string;
  callerNumber: string;
  time: string;
  status: 'Answered' | 'Missed';
  duration?: string;
}

export function OperatorDashboardPage() {
  const [incomingCall, setIncomingCall] = useState<string | null>('+91 98765 43210');
  const [callTimer, setCallTimer] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    complaintType: '',
    description: '',
  });

  const [callLogs] = useState<CallLog[]>([
    { id: '1', callerNumber: '+91 98765 43210', time: '10:30 AM', status: 'Answered', duration: '5:23' },
    { id: '2', callerNumber: '+91 87654 32109', time: '10:15 AM', status: 'Answered', duration: '3:45' },
    { id: '3', callerNumber: '+91 76543 21098', time: '09:58 AM', status: 'Missed' },
    { id: '4', callerNumber: '+91 65432 10987', time: '09:45 AM', status: 'Answered', duration: '7:12' },
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleAcceptCall = () => {
    setIsCallActive(true);
    setCallTimer(0);
    if (incomingCall) {
      setFormData({ ...formData, mobile: incomingCall });
    }
  };

  const handleRejectCall = () => {
    setIncomingCall(null);
    setIsCallActive(false);
    setCallTimer(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Complaint submitted successfully!');
    setFormData({ name: '', mobile: '', complaintType: '', description: '' });
    setIncomingCall(null);
    setIsCallActive(false);
    setCallTimer(0);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Live Call Panel */}
        <div className="space-y-6">
          <div className={`bg-white rounded-xl shadow-sm border-2 p-6 ${
            incomingCall ? 'border-green-500 animate-pulse' : 'border-gray-200'
          }`}>
            <h3 className="text-gray-900 mb-6">Live Call Panel</h3>

            {incomingCall ? (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {isCallActive ? 'Call in Progress' : 'Incoming Call'}
                  </p>
                  <p className="text-gray-900 mb-4">{incomingCall}</p>
                  <div className="text-green-600">
                    {formatTime(callTimer)}
                  </div>
                </div>

                {!isCallActive ? (
                  <div className="flex gap-4">
                    <button
                      onClick={handleAcceptCall}
                      className="flex-1 bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Accept
                    </button>
                    <button
                      onClick={handleRejectCall}
                      className="flex-1 bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                      </svg>
                      Reject
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleRejectCall}
                    className="w-full bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                    </svg>
                    End Call
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="text-gray-500">No active calls</p>
                <p className="text-sm text-gray-400 mt-2">Waiting for incoming calls...</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Complaint Entry Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-6">Complaint Entry Form</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter citizen name"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Mobile Number</label>
              <input
                type="tel"
                required
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Complaint Type</label>
              <select
                required
                value={formData.complaintType}
                onChange={(e) => setFormData({ ...formData, complaintType: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select complaint type</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Water Supply">Water Supply</option>
                <option value="Sanitation">Sanitation</option>
                <option value="Roads">Roads</option>
                <option value="Electricity">Electricity</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter detailed description of the complaint"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors shadow-sm font-medium"
            >
              Submit Complaint
            </button>
          </form>
        </div>
      </div>

      {/* Call Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900">Recent Call Logs</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Caller Number</th>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Time</th>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Duration</th>
                <th className="text-left py-4 px-6 text-sm text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {callLogs.map((log, index) => (
                <tr
                  key={log.id}
                  className={`border-b border-gray-100 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }`}
                >
                  <td className="py-4 px-6 text-sm text-gray-900">{log.callerNumber}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
