import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArrowDownUp, Eye, LucideAngularModule, MoreHorizontal } from 'lucide-angular';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { Complaint, ComplaintStatus } from '../../data/complaint.model';

@Component({
  selector: 'app-complaint-table',
  standalone: true,
  imports: [LucideAngularModule, StatusBadgeComponent],
  templateUrl: './complaint-table.component.html'
})
export class ComplaintTableComponent {
  @Input({ required: true }) complaints: Complaint[] = [];
  @Input() isLoading = false;
  @Input() updatingComplaintId = '';
  @Output() statusChange = new EventEmitter<{ id: string; status: ComplaintStatus }>();

  readonly icons = {
    sort: ArrowDownUp,
    view: Eye,
    more: MoreHorizontal
  };

  readonly statuses: ComplaintStatus[] = ['Pending', 'In Progress', 'Resolved'];

  updateStatus(id: string, value: string): void {
    const complaint = this.complaints.find((item) => item.id === id);
    if (complaint?.status === value || this.updatingComplaintId === id) {
      return;
    }

    this.statusChange.emit({ id, status: value as ComplaintStatus });
  }
}
