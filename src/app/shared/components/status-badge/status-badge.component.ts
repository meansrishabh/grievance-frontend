import { Component, Input } from '@angular/core';
import { ComplaintStatus } from '../../../features/complaints/data/complaint.model';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  templateUrl: './status-badge.component.html'
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: ComplaintStatus;

  get classes(): string {
    const map: Record<ComplaintStatus, string> = {
      Pending: 'bg-amber-50 text-warning ring-amber-200',
      'In Progress': 'bg-blue-50 text-gov-700 ring-blue-200',
      Resolved: 'bg-emerald-50 text-success ring-emerald-200'
    };
    return `inline-flex min-w-24 items-center justify-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${map[this.status]}`;
  }
}
