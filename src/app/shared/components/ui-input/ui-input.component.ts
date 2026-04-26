import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-input',
  standalone: true,
  templateUrl: './ui-input.component.html'
})
export class UiInputComponent {
  @Input({ required: true }) label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() value = '';
}
