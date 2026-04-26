export type ComplaintSource = 'IVR' | 'Web' | 'Helpdesk';
export type ComplaintPriority = 'Low' | 'Medium' | 'High';
export type ComplaintStatus = 'Pending' | 'In Progress' | 'Resolved';

export interface Complaint {
  id: string;
  citizen: string;
  mobile: string;
  department: string;
  subject: string;
  ward: string;
  source: ComplaintSource;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  createdAt: string;
  assignedTo: string;
}

export interface BackendComplaint {
  complaintId: string;
  citizen: string;
  mobile: string;
  department: string;
  subject: string;
  ward: string;
  source: ComplaintSource;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  createdAt: string;
  assignedTo: string;
}

export interface CreateComplaintPayload {
  citizen: string;
  mobile: string;
  department: string;
  subject: string;
  ward: string;
  source: ComplaintSource;
  priority: ComplaintPriority;
  status?: ComplaintStatus;
  assignedTo?: string;
}

export interface ComplaintFilters {
  status?: ComplaintStatus;
  department?: string;
  search?: string;
  fromDate?: string;
}

export const departments = ['Public Works', 'Water Supply', 'Sanitation', 'Revenue', 'Roads', 'Electricity'];
