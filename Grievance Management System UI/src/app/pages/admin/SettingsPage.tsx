export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-1">Configure system settings and preferences</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-6">General Settings</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Organization Name</label>
            <input
              type="text"
              defaultValue="Nagar Panchayat"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Contact Email</label>
            <input
              type="email"
              defaultValue="support@nagarpanchayat.gov.in"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Auto-Assignment</label>
            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-6">Notification Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
            <span className="text-gray-700">Email notifications for new complaints</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
            <span className="text-gray-700">SMS alerts for high-priority issues</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
            <span className="text-gray-700">Daily summary reports</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          Save Changes
        </button>
      </div>
    </div>
  );
}
