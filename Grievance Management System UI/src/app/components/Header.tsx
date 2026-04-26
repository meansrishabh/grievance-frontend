import { useState } from 'react';

interface HeaderProps {
  activePortal: string;
  onPortalChange: (portal: string) => void;
}

export function Header({ activePortal, onPortalChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
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

          <nav className="hidden md:flex items-center gap-2">
            <button
              onClick={() => onPortalChange('citizen')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activePortal === 'citizen'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Citizen Portal
            </button>
            <button
              onClick={() => onPortalChange('operator')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activePortal === 'operator'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Operator Dashboard
            </button>
            <button
              onClick={() => onPortalChange('admin')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activePortal === 'admin'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Admin Dashboard
            </button>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button
              onClick={() => {
                onPortalChange('citizen');
                setMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                activePortal === 'citizen'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Citizen Portal
            </button>
            <button
              onClick={() => {
                onPortalChange('operator');
                setMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                activePortal === 'operator'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Operator Dashboard
            </button>
            <button
              onClick={() => {
                onPortalChange('admin');
                setMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                activePortal === 'admin'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Admin Dashboard
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
