import { Component } from '@angular/core';
import { Bell, CalendarDays, LucideAngularModule, Menu, Search } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  readonly icons = {
    bell: Bell,
    calendar: CalendarDays,
    menu: Menu,
    search: Search
  };
}
