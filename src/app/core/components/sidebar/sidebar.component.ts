import { Component } from '@angular/core';
import {
  BarChart3,
  Building2,
  FileText,
  LayoutDashboard,
  LucideAngularModule,
  PhoneCall,
  Settings,
  ShieldCheck,
  Users
} from 'lucide-angular';

interface NavItem {
  label: string;
  icon: typeof LayoutDashboard;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  readonly icons = {
    shield: ShieldCheck
  };

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: LayoutDashboard, active: true },
    { label: 'Complaints', icon: FileText },
    { label: 'Departments', icon: Building2 },
    { label: 'IVR Calls', icon: PhoneCall },
    { label: 'Reports', icon: BarChart3 },
    { label: 'Users', icon: Users },
    { label: 'Settings', icon: Settings }
  ];
}
