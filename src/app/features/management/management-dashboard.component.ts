import { Component, OnInit } from '@angular/core';
import { BarChart3, CheckCircle2, Clock3, LucideAngularModule, PhoneCall, Ticket } from 'lucide-angular';
import { Complaint } from '../complaints/data/complaint.model';
import { ComplaintsService } from '../complaints/data/complaints.service';

interface CallerPerformance {
  name: string;
  created: number;
  resolved: number;
  pending: number;
}

@Component({
  selector: 'app-management-dashboard',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './management-dashboard.component.html'
})
export class ManagementDashboardComponent implements OnInit {
  complaints: Complaint[] = [];
  isLoading = false;
  errorMessage = '';

  readonly icons = {
    chart: BarChart3,
    ticket: Ticket,
    pending: Clock3,
    resolved: CheckCircle2,
    call: PhoneCall
  };

  constructor(private readonly complaintsService: ComplaintsService) {}

  ngOnInit(): void {
    this.load();
  }

  get total(): number {
    return this.complaints.length;
  }

  get pending(): number {
    return this.complaints.filter((complaint) => complaint.status === 'Pending').length;
  }

  get inProgress(): number {
    return this.complaints.filter((complaint) => complaint.status === 'In Progress').length;
  }

  get resolved(): number {
    return this.complaints.filter((complaint) => complaint.status === 'Resolved').length;
  }

  get ivrTickets(): number {
    return this.complaints.filter((complaint) => complaint.source === 'IVR').length;
  }

  get callerPerformance(): CallerPerformance[] {
    const grouped = new Map<string, CallerPerformance>();

    this.complaints
      .filter((complaint) => complaint.source === 'IVR' || complaint.source === 'Helpdesk')
      .forEach((complaint) => {
        const name = complaint.assignedTo || 'Unassigned';
        const current = grouped.get(name) || { name, created: 0, resolved: 0, pending: 0 };
        current.created += 1;
        current.resolved += complaint.status === 'Resolved' ? 1 : 0;
        current.pending += complaint.status === 'Pending' ? 1 : 0;
        grouped.set(name, current);
      });

    return Array.from(grouped.values()).sort((a, b) => b.created - a.created);
  }

  load(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.complaintsService.findAll({}).subscribe({
      next: (complaints) => {
        this.complaints = complaints;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load management metrics.';
        this.isLoading = false;
      }
    });
  }
}
