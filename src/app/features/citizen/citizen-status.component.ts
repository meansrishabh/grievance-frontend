import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileSearch, LucideAngularModule, Search } from 'lucide-angular';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { Complaint } from '../complaints/data/complaint.model';
import { ComplaintsService } from '../complaints/data/complaints.service';

@Component({
  selector: 'app-citizen-status',
  standalone: true,
  imports: [FormsModule, LucideAngularModule, StatusBadgeComponent],
  templateUrl: './citizen-status.component.html'
})
export class CitizenStatusComponent {
  ticketNumber = '';
  complaint: Complaint | null = null;
  isLoading = false;
  errorMessage = '';

  readonly icons = {
    search: Search,
    file: FileSearch
  };

  constructor(private readonly complaintsService: ComplaintsService) {}

  checkStatus(): void {
    const ticket = this.ticketNumber.trim().toUpperCase();
    if (!ticket) {
      this.errorMessage = 'Enter a ticket number to check status.';
      this.complaint = null;
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.complaint = null;

    this.complaintsService.findOne(ticket).subscribe({
      next: (complaint) => {
        this.complaint = complaint;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'No complaint found for this ticket number.';
        this.isLoading = false;
      }
    });
  }
}
