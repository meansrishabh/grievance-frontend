import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export type UserRole = 'citizen' | 'caller' | 'management' | 'super-admin';

export interface RoleProfile {
  role: UserRole;
  label: string;
  route: string;
  initials: string;
}

const roleProfiles: Record<UserRole, RoleProfile> = {
  citizen: {
    role: 'citizen',
    label: 'Citizen',
    route: '/citizen',
    initials: 'CT'
  },
  caller: {
    role: 'caller',
    label: 'Caller Desk',
    route: '/caller',
    initials: 'CD'
  },
  management: {
    role: 'management',
    label: 'Management',
    route: '/management',
    initials: 'MG'
  },
  'super-admin': {
    role: 'super-admin',
    label: 'Super Admin',
    route: '/super-admin',
    initials: 'SA'
  }
};

@Injectable({ providedIn: 'root' })
export class RoleSessionService {
  private readonly storageKey = 'grievance-role';

  constructor(private readonly router: Router) {}

  get profile(): RoleProfile | null {
    const role = localStorage.getItem(this.storageKey) as UserRole | null;
    return role ? roleProfiles[role] : null;
  }

  get roles(): RoleProfile[] {
    return Object.values(roleProfiles);
  }

  login(role: UserRole): void {
    localStorage.setItem(this.storageKey, role);
    void this.router.navigateByUrl(roleProfiles[role].route);
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    void this.router.navigateByUrl('/login');
  }
}
