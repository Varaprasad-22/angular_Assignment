import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  isLoggedIn = false;
  username = '';

  constructor(private auth: AuthService) {
    this.auth.isLoggedIn$.subscribe(val => this.isLoggedIn = val);
    this.auth.username$.subscribe(name => this.username = name);
  }

  logout() {
    this.auth.logout();
    location.href = '/login';
  }
}
