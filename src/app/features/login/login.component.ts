import { Component } from '@angular/core';
import {
  ClipboardList,
  Headphones,
  LucideAngularModule,
  ShieldCheck,
  UserRound,
  UsersRound
} from 'lucide-angular';
import { RoleSessionService, UserRole } from '../../core/auth/role-session.service';
import { ComplaintsService } from '../complaints/data/complaints.service';

interface LoginRole {
  role: UserRole;
  title: string;
  description: string;
  access: string;
  icon: typeof UserRound;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  readonly logoIcon = ShieldCheck;

  readonly roles: LoginRole[] = [
    {
      role: 'citizen',
      title: 'Citizen',
      description: 'Track grievance status with ticket number.',
      access: 'Status lookup',
      icon: UserRound
    },
    {
      role: 'caller',
      title: 'Caller',
      description: 'Review today calls and created tickets.',
      access: 'Call desk',
      icon: Headphones
    },
    {
      role: 'management',
      title: 'Management',
      description: 'Monitor tickets, trends, and caller performance.',
      access: 'Operations view',
      icon: ClipboardList
    },
    {
      role: 'super-admin',
      title: 'Super Admin',
      description: 'Manage access, roles, and system controls.',
      access: 'Access control',
      icon: UsersRound
    }
  ];

  constructor(
    private readonly complaintsService: ComplaintsService,
    private readonly session: RoleSessionService
  ) {}

  login(role: UserRole): void {
    if (role !== 'citizen') {
      this.complaintsService.ensureAllLoaded().subscribe({
        error: () => undefined
      });
    }

    this.session.login(role);
  }
}
