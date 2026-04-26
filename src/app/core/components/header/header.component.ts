import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Bell, CalendarDays, LogOut, LucideAngularModule, Menu, Search } from 'lucide-angular';
import { RoleSessionService } from '../../auth/role-session.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DatePipe, LucideAngularModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  readonly today = new Date();

  readonly icons = {
    bell: Bell,
    calendar: CalendarDays,
    logout: LogOut,
    menu: Menu,
    search: Search
  };

  constructor(private readonly session: RoleSessionService) {}

  get profile() {
    return this.session.profile;
  }

  logout(): void {
    this.session.logout();
  }
}
