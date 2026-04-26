import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  CheckCircle2,
  Clock3,
  FileText,
  LucideAngularModule,
  PhoneCall,
  TrendingUp
} from 'lucide-angular';
import { ComplaintFiltersComponent } from '../complaints/components/complaint-filters/complaint-filters.component';
import { ComplaintFormComponent } from '../complaints/components/complaint-form/complaint-form.component';
import { ComplaintTableComponent } from '../complaints/components/complaint-table/complaint-table.component';
import { Complaint, ComplaintFilters, ComplaintStatus, CreateComplaintPayload } from '../complaints/data/complaint.model';
import { ComplaintsService } from '../complaints/data/complaints.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgClass,
    LucideAngularModule,
    ComplaintFiltersComponent,
    ComplaintFormComponent,
    ComplaintTableComponent
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  complaints: Complaint[] = [];
  filters: ComplaintFilters = {};
  isLoading = false;
  isSaving = false;
  errorMessage = '';
  successMessage = '';

  readonly trendIcon = TrendingUp;

  get stats() {
    const total = this.complaints.length;
    const pending = this.complaints.filter((complaint) => complaint.status === 'Pending').length;
    const inProgress = this.complaints.filter((complaint) => complaint.status === 'In Progress').length;
    const resolved = this.complaints.filter((complaint) => complaint.status === 'Resolved').length;
    const ivr = this.complaints.filter((complaint) => complaint.source === 'IVR').length;

    return [
      {
      label: 'Total Complaints',
      value: total.toString(),
      delta: `${pending} pending`,
      icon: FileText,
      color: 'bg-gov-50 text-gov-700'
      },
      {
      label: 'Pending Review',
      value: pending.toString(),
      delta: `${inProgress} active`,
      icon: Clock3,
      color: 'bg-amber-50 text-warning'
      },
      {
      label: 'Resolved',
      value: resolved.toString(),
      delta: total ? `${Math.round((resolved / total) * 100)}% closure` : '0% closure',
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-success'
      },
      {
      label: 'IVR Complaints',
      value: ivr.toString(),
      delta: 'from voice channel',
      icon: PhoneCall,
      color: 'bg-indigo-50 text-indigo-700'
      }
    ];
  }

  constructor(private readonly complaintsService: ComplaintsService) {}

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(filters: ComplaintFilters = this.filters): void {
    this.filters = filters;
    this.isLoading = true;
    this.errorMessage = '';

    this.complaintsService.findAll(filters).subscribe({
      next: (complaints) => {
        this.complaints = complaints;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load complaints. Check that the backend is running on http://localhost:3000.';
        this.isLoading = false;
      }
    });
  }

  createComplaint(payload: CreateComplaintPayload): void {
    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.complaintsService.create(payload).subscribe({
      next: (complaint) => {
        this.complaints = [complaint, ...this.complaints];
        this.successMessage = `Complaint ${complaint.id} registered successfully.`;
        this.isSaving = false;
      },
      error: () => {
        this.errorMessage = 'Unable to submit the complaint. Please verify all fields and try again.';
        this.isSaving = false;
      }
    });
  }

  updateStatus(event: { id: string; status: ComplaintStatus }): void {
    this.errorMessage = '';

    this.complaintsService.updateStatus(event.id, event.status).subscribe({
      next: (updated) => {
        this.complaints = this.complaints.map((complaint) => (complaint.id === updated.id ? updated : complaint));
        this.successMessage = `Complaint ${updated.id} moved to ${updated.status}.`;
      },
      error: () => {
        this.errorMessage = 'Unable to update complaint status.';
      }
    });
  }
}
