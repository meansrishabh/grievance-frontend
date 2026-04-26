import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private readonly router: Router) {}

  get isLoginRoute(): boolean {
    return this.router.url.startsWith('/login') || this.router.url === '/';
  }
}
