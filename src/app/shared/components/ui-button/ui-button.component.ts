import { Component, Input } from '@angular/core';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

@Component({
  selector: 'app-ui-button',
  standalone: true,
  templateUrl: './ui-button.component.html'
})
export class UiButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;

  get classes(): string {
    const base =
      'inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-gov-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';
    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-gov-700 text-white hover:bg-gov-900',
      secondary: 'border border-line bg-white text-ink hover:bg-gov-50',
      ghost: 'text-muted hover:bg-gov-50 hover:text-ink'
    };
    return `${base} ${variants[this.variant]}`;
  }
}
