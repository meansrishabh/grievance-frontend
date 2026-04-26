import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable, of, shareReplay, tap } from 'rxjs';
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
  private readonly complaintsSubject = new BehaviorSubject<Complaint[]>([]);
  private complaintsCache: Complaint[] = [];
  private loadAllRequest?: Observable<Complaint[]>;

  readonly complaints$ = this.complaintsSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  get cachedComplaints(): Complaint[] {
    return this.complaintsCache;
  }

  ensureAllLoaded(force = false): Observable<Complaint[]> {
    if (!force && this.complaintsCache.length > 0) {
      return of(this.complaintsCache);
    }

    if (!force && this.loadAllRequest) {
      return this.loadAllRequest;
    }

    this.loadAllRequest = this.findAll({}).pipe(
      finalize(() => {
        this.loadAllRequest = undefined;
      }),
      shareReplay(1)
    );

    return this.loadAllRequest;
  }

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
      map((complaints) => complaints.map((complaint) => this.toComplaint(complaint))),
      tap((complaints) => {
        if (!filters.status && !filters.department && !filters.fromDate && !filters.search) {
          this.setComplaintCache(complaints);
        }
      })
    );
  }

  findOne(id: string): Observable<Complaint> {
    return this.http.get<BackendComplaint>(`${this.apiUrl}/${id}`).pipe(map((complaint) => this.toComplaint(complaint)));
  }

  create(payload: CreateComplaintPayload): Observable<Complaint> {
    return this.http.post<BackendComplaint>(this.apiUrl, payload).pipe(
      map((complaint) => this.toComplaint(complaint)),
      tap((complaint) => {
        this.setComplaintCache([complaint, ...this.complaintsCache]);
      })
    );
  }

  updateStatus(id: string, status: ComplaintStatus): Observable<Complaint> {
    return this.http.patch<BackendComplaint>(`${this.apiUrl}/${id}`, { status }).pipe(
      map((complaint) => this.toComplaint(complaint)),
      tap((updated) => {
        this.setComplaintCache(this.complaintsCache.map((complaint) => (complaint.id === updated.id ? updated : complaint)));
      })
    );
  }

  private setComplaintCache(complaints: Complaint[]): void {
    this.complaintsCache = complaints;
    this.complaintsSubject.next(complaints);
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
