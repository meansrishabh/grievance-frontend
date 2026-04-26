export type ComplaintStatus = 'Pending' | 'In Progress' | 'Resolved';
export type ComplaintPriority = 'Low' | 'Medium' | 'High';

export interface Complaint {
  id: string;
  citizen: string;
  mobile: string;
  department: string;
  subject: string;
  ward: string;
  source: 'IVR' | 'Web' | 'Helpdesk';
  priority: ComplaintPriority;
  status: ComplaintStatus;
  createdAt: string;
  assignedTo: string;
}

export const complaints: Complaint[] = [
  {
    id: 'GRV-1001',
    citizen: 'Ravi Kumar',
    mobile: '+91 98765 43210',
    department: 'Public Works',
    subject: 'Street light not working near Ward 12 main road',
    ward: 'Ward 12',
    source: 'IVR',
    priority: 'High',
    status: 'Pending',
    createdAt: '25 Apr 2026',
    assignedTo: 'S. Sharma'
  },
  {
    id: 'GRV-1002',
    citizen: 'Anita Devi',
    mobile: '+91 98222 11440',
    department: 'Water Supply',
    subject: 'Low water pressure for three consecutive days',
    ward: 'Ward 08',
    source: 'Web',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '24 Apr 2026',
    assignedTo: 'R. Menon'
  },
  {
    id: 'GRV-1003',
    citizen: 'Mohammed Arif',
    mobile: '+91 99110 22115',
    department: 'Sanitation',
    subject: 'Garbage collection vehicle missed service lane',
    ward: 'Ward 03',
    source: 'Helpdesk',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '23 Apr 2026',
    assignedTo: 'K. Rao'
  },
  {
    id: 'GRV-1004',
    citizen: 'Neha Singh',
    mobile: '+91 97888 22441',
    department: 'Revenue',
    subject: 'Property tax receipt correction requested',
    ward: 'Ward 18',
    source: 'Web',
    priority: 'Medium',
    status: 'Pending',
    createdAt: '22 Apr 2026',
    assignedTo: 'Unassigned'
  },
  {
    id: 'GRV-1005',
    citizen: 'Dinesh Patel',
    mobile: '+91 98990 33321',
    department: 'Roads',
    subject: 'Pothole reported outside government school gate',
    ward: 'Ward 21',
    source: 'IVR',
    priority: 'High',
    status: 'In Progress',
    createdAt: '21 Apr 2026',
    assignedTo: 'A. Kulkarni'
  }
];
