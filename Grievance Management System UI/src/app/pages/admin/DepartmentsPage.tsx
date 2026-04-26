export function DepartmentsPage() {
  const departments = [
    { name: 'Infrastructure', head: 'Mr. Suresh Kumar', complaints: 12, status: 'Active' },
    { name: 'Water Supply', head: 'Mrs. Anjali Gupta', complaints: 8, status: 'Active' },
    { name: 'Sanitation', head: 'Mr. Ramesh Patel', complaints: 15, status: 'Active' },
    { name: 'Roads', head: 'Mr. Vijay Singh', complaints: 6, status: 'Active' },
    { name: 'Electricity', head: 'Mrs. Priya Sharma', complaints: 4, status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-gray-900">Departments</h2>
          <p className="text-gray-600 mt-1">Manage departments and their assignments</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          + Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div key={dept.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200">
                {dept.status}
              </span>
            </div>
            <h3 className="text-gray-900 mb-2">{dept.name}</h3>
            <p className="text-sm text-gray-600 mb-4">Head: {dept.head}</p>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600">Active Complaints</p>
                <p className="text-gray-900">{dept.complaints}</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
