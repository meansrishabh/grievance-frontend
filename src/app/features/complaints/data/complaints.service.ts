import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  BackendComplaint,
  Complaint,
  ComplaintFilters,
  ComplaintStatus,
  CreateComplaintPayload
} from './complaint.model';

@Injectable({ providedIn: 'root' })
export class ComplaintsService {
  private readonly apiUrl = 'http://localhost:3000/complaints';

  constructor(private readonly http: HttpClient) {}

  findAll(filters: ComplaintFilters = {}): Observable<Complaint[]> {
    let params = new HttpParams();

    if (filters.status) {
      params = params.set('status', filters.status);
    }

    if (filters.department) {
      params = params.set('department', filters.department);
    }

    const search = filters.search?.trim();
    if (search) {
      const key = search.toUpperCase().startsWith('GRV-') ? 'complaintId' : 'mobile';
      params = params.set(key, search);
    }

    return this.http.get<BackendComplaint[]>(this.apiUrl, { params }).pipe(
      map((complaints) => complaints.filter((complaint) => this.isOnOrAfter(complaint.createdAt, filters.fromDate))),
      map((complaints) => complaints.map((complaint) => this.toComplaint(complaint)))
    );
  }

  findOne(id: string): Observable<Complaint> {
    return this.http.get<BackendComplaint>(`${this.apiUrl}/${id}`).pipe(map((complaint) => this.toComplaint(complaint)));
  }

  create(payload: CreateComplaintPayload): Observable<Complaint> {
    return this.http.post<BackendComplaint>(this.apiUrl, payload).pipe(map((complaint) => this.toComplaint(complaint)));
  }

  updateStatus(id: string, status: ComplaintStatus): Observable<Complaint> {
    return this.http.patch<BackendComplaint>(`${this.apiUrl}/${id}`, { status }).pipe(map((complaint) => this.toComplaint(complaint)));
  }

  private toComplaint(complaint: BackendComplaint): Complaint {
    const createdAt = complaint.createdAt || new Date().toISOString();

    return {
      id: complaint.complaintId || complaint._id || 'GRV-PENDING',
      citizen: complaint.citizen || complaint.citizenName || 'Citizen',
      mobile: complaint.mobile || complaint.phone || 'Not provided',
      department: complaint.department || 'Grievance',
      subject: complaint.subject || complaint.description || 'Complaint registered',
      ward: complaint.ward || 'Unknown',
      source: complaint.source || 'Web',
      priority: complaint.priority || 'Medium',
      status: complaint.status || 'Pending',
      createdAt: this.formatDate(createdAt),
      createdAtIso: createdAt,
      assignedTo: complaint.assignedTo || 'Unassigned',
      recordingUrl: complaint.recordingUrl
    };
  }

  private formatDate(value: string): string {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(value));
  }

  private isOnOrAfter(createdAt?: string, fromDate?: string): boolean {
    if (!fromDate) {
      return true;
    }

    const complaintDate = new Date(createdAt || new Date());
    const selectedDate = new Date(`${fromDate}T00:00:00`);
    return complaintDate >= selectedDate;
  }
}
