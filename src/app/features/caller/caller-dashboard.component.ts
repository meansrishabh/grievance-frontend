import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Headphones, LucideAngularModule, PhoneIncoming, TicketCheck } from 'lucide-angular';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { Complaint } from '../complaints/data/complaint.model';
import { ComplaintsService } from '../complaints/data/complaints.service';

@Component({
  selector: 'app-caller-dashboard',
  standalone: true,
  imports: [DatePipe, LucideAngularModule, StatusBadgeComponent],
  templateUrl: './caller-dashboard.component.html'
})
export class CallerDashboardComponent implements OnInit {
  complaints: Complaint[] = [];
  isLoading = false;
  errorMessage = '';

  readonly today = new Date();
  readonly icons = {
    headset: Headphones,
    call: PhoneIncoming,
    ticket: TicketCheck
  };

  constructor(private readonly complaintsService: ComplaintsService) {}

  ngOnInit(): void {
    this.loadCalls();
  }

  get todayCalls(): Complaint[] {
    return this.complaints.filter((complaint) => complaint.source === 'IVR' && this.isToday(complaint.createdAtIso));
  }

  get ticketsCreatedToday(): number {
    return this.todayCalls.length;
  }

  get pendingToday(): number {
    return this.todayCalls.filter((complaint) => complaint.status === 'Pending').length;
  }

  loadCalls(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.complaintsService.findAll({}).subscribe({
      next: (complaints) => {
        this.complaints = complaints;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load caller desk data from the backend.';
        this.isLoading = false;
      }
    });
  }

  private isToday(value: string): boolean {
    const date = new Date(value);
    const now = new Date();
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();
  }
}
