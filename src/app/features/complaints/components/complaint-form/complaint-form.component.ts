import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilePlus2, LucideAngularModule } from 'lucide-angular';
import { UiButtonComponent } from '../../../../shared/components/ui-button/ui-button.component';
import { CreateComplaintPayload, departments } from '../../data/complaint.model';

@Component({
  selector: 'app-complaint-form',
  standalone: true,
  imports: [LucideAngularModule, ReactiveFormsModule, UiButtonComponent],
  templateUrl: './complaint-form.component.html'
})
export class ComplaintFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  @Input() isSaving = false;
  @Output() complaintCreate = new EventEmitter<CreateComplaintPayload>();

  readonly icons = {
    create: FilePlus2
  };

  readonly departments = departments;

  readonly form = this.fb.group({
    citizen: ['', Validators.required],
    mobile: ['', [Validators.required, Validators.minLength(10)]],
    department: ['Public Works', Validators.required],
    subject: ['', Validators.required],
    ward: ['', Validators.required],
    priority: ['Medium' as const, Validators.required],
    assignedTo: ['Unassigned']
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.complaintCreate.emit({
      ...this.form.getRawValue(),
      source: 'Helpdesk',
      status: 'Pending'
    });

    this.form.reset({
      citizen: '',
      mobile: '',
      department: 'Public Works',
      subject: '',
      ward: '',
      priority: 'Medium',
      assignedTo: 'Unassigned'
    });
  }
}
