import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import {
  CheckCircle2,
  Clock3,
  FileText,
  LucideAngularModule,
  RefreshCw,
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
  private readonly destroyRef = inject(DestroyRef);

  complaints: Complaint[] = [];
  filters: ComplaintFilters = {};
  isLoading = false;
  isSaving = false;
  updatingComplaintId = '';
  errorMessage = '';
  successMessage = '';

  readonly trendIcon = TrendingUp;

  get stats() {
    const total = this.complaints.length;
    const pending = this.complaints.filter((complaint) => complaint.status === 'Pending').length;
    const inProgress = this.complaints.filter((complaint) => complaint.status === 'In Progress').length;
    const resolved = this.complaints.filter((complaint) => complaint.status === 'Resolved').length;

    return [
      {
        label: 'Total Complaints',
        value: total.toString(),
        delta: `${pending} pending`,
        icon: FileText,
        color: 'bg-gov-50 text-gov-700'
      },
      {
        label: 'Pending',
        value: pending.toString(),
        delta: 'awaiting officer review',
        icon: Clock3,
        color: 'bg-amber-50 text-warning'
      },
      {
        label: 'In Progress',
        value: inProgress.toString(),
        delta: 'active field action',
        icon: RefreshCw,
        color: 'bg-blue-50 text-gov-700'
      },
      {
        label: 'Resolved',
        value: resolved.toString(),
        delta: total ? `${Math.round((resolved / total) * 100)}% closure` : '0% closure',
        icon: CheckCircle2,
        color: 'bg-emerald-50 text-success'
      }
    ];
  }

  constructor(private readonly complaintsService: ComplaintsService) {}

  ngOnInit(): void {
    this.complaintsService.complaints$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((complaints) => {
      if (complaints.length > 0 && !this.hasActiveFilters()) {
        this.complaints = complaints;
        this.isLoading = false;
      }
    });

    const cachedComplaints = this.complaintsService.cachedComplaints;
    if (cachedComplaints.length > 0) {
      this.complaints = cachedComplaints;
    }

    this.loadComplaints(this.filters, false);
  }

  loadComplaints(filters: ComplaintFilters = this.filters, force = true): void {
    this.filters = filters;
    this.isLoading = this.complaints.length === 0;
    this.errorMessage = '';

    const request = this.hasActiveFilters() ? this.complaintsService.findAll(filters) : this.complaintsService.ensureAllLoaded(force);

    request.subscribe({
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

  private hasActiveFilters(): boolean {
    return Boolean(this.filters.status || this.filters.department || this.filters.fromDate || this.filters.search);
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
    this.successMessage = '';
    this.updatingComplaintId = event.id;

    this.complaintsService.updateStatus(event.id, event.status).subscribe({
      next: (updated) => {
        this.complaints = this.complaints.map((complaint) => (complaint.id === updated.id ? updated : complaint));
        this.successMessage = `Complaint ${updated.id} moved to ${updated.status}.`;
        this.updatingComplaintId = '';
      },
      error: () => {
        this.errorMessage = 'Unable to update complaint status.';
        this.updatingComplaintId = '';
      }
    });
  }
}
