import { useState } from 'react';

export function NewComplaintPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    complaintType: '',
    priority: 'Normal',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Complaint submitted successfully!');
    setFormData({
      name: '',
      mobile: '',
      email: '',
      address: '',
      complaintType: '',
      priority: 'Normal',
      description: '',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Register New Complaint</h2>
        <p className="text-gray-600 mt-1">Manually enter complaint details</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Citizen Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Mobile Number *</label>
              <input
                type="tel"
                required
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Area, Ward Number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Complaint Type *</label>
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
              <label className="block text-sm text-gray-700 mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Complaint Description *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Provide detailed description of the complaint..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  name: '',
                  mobile: '',
                  email: '',
                  address: '',
                  complaintType: '',
                  priority: 'Normal',
                  description: '',
                })
              }
              className="px-8 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors shadow-sm font-medium"
            >
              Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
