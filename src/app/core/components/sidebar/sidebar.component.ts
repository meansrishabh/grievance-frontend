import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  BarChart3,
  FileText,
  Headphones,
  KeyRound,
  LayoutDashboard,
  LucideAngularModule,
  Search,
  ShieldCheck,
  UserRound
} from 'lucide-angular';
import { RoleSessionService, UserRole } from '../../auth/role-session.service';

interface NavItem {
  label: string;
  route: string;
  icon: typeof LayoutDashboard;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  readonly icons = {
    shield: ShieldCheck
  };

  constructor(private readonly session: RoleSessionService) {}

  get role(): UserRole | null {
    return this.session.profile?.role || null;
  }

  get navItems(): NavItem[] {
    const common = [{ label: 'Switch Login', route: '/login', icon: UserRound }];
    const role = this.role;

    if (role === 'citizen') {
      return [{ label: 'Track Status', route: '/citizen', icon: Search }, ...common];
    }

    if (role === 'caller') {
      return [{ label: 'Caller Desk', route: '/caller', icon: Headphones }, ...common];
    }

    if (role === 'management') {
      return [
        { label: 'Management', route: '/management', icon: BarChart3 },
        { label: 'All Tickets', route: '/admin/dashboard', icon: FileText },
        ...common
      ];
    }

    if (role === 'super-admin') {
      return [
        { label: 'Access Control', route: '/super-admin', icon: KeyRound },
        { label: 'Operations', route: '/management', icon: LayoutDashboard },
        { label: 'All Tickets', route: '/admin/dashboard', icon: FileText },
        ...common
      ];
    }

    return common;
  }
}
