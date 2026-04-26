import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Filter, LucideAngularModule, Search } from 'lucide-angular';
import { UiButtonComponent } from '../../../../shared/components/ui-button/ui-button.component';
import { ComplaintFilters, ComplaintStatus, departments } from '../../data/complaint.model';

@Component({
  selector: 'app-complaint-filters',
  standalone: true,
  imports: [LucideAngularModule, ReactiveFormsModule, UiButtonComponent],
  templateUrl: './complaint-filters.component.html'
})
export class ComplaintFiltersComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  @Output() filtersChange = new EventEmitter<ComplaintFilters>();

  readonly icons = {
    filter: Filter,
    search: Search
  };

  readonly departments = departments;

  readonly form = this.fb.group({
    status: [''],
    department: [''],
    fromDate: [''],
    search: ['']
  });

  apply(): void {
    const value = this.form.getRawValue();
    this.filtersChange.emit({
      status: value.status ? (value.status as ComplaintStatus) : undefined,
      department: value.department || undefined,
      fromDate: value.fromDate || undefined,
      search: value.search || undefined
    });
  }

  reset(): void {
    this.form.reset({
      status: '',
      department: '',
      fromDate: '',
      search: ''
    });
    this.filtersChange.emit({});
  }
}
