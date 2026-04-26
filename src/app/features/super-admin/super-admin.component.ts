import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KeyRound, LockKeyhole, LucideAngularModule, ShieldCheck, UserPlus } from 'lucide-angular';

interface AccessUser {
  name: string;
  role: string;
  status: 'Active' | 'Suspended';
  lastLogin: string;
}

@Component({
  selector: 'app-super-admin',
  standalone: true,
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './super-admin.component.html'
})
export class SuperAdminComponent {
  readonly icons = {
    shield: ShieldCheck,
    key: KeyRound,
    lock: LockKeyhole,
    add: UserPlus
  };

  readonly users: AccessUser[] = [
    { name: 'Admin Desk', role: 'Management', status: 'Active', lastLogin: 'Today' },
    { name: 'Caller Desk 01', role: 'Caller', status: 'Active', lastLogin: 'Today' },
    { name: 'Ward Supervisor', role: 'Management', status: 'Suspended', lastLogin: 'Yesterday' }
  ];

  newUser = {
    name: '',
    role: 'Caller'
  };

  addUser(): void {
    const name = this.newUser.name.trim();
    if (!name) {
      return;
    }

    this.users.unshift({
      name,
      role: this.newUser.role,
      status: 'Active',
      lastLogin: 'Never'
    });
    this.newUser = { name: '', role: 'Caller' };
  }

  toggleStatus(user: AccessUser): void {
    user.status = user.status === 'Active' ? 'Suspended' : 'Active';
  }
}
