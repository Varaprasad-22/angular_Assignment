import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
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
  role='';
  showLogoutConfirm = false;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.isLoggedIn$.subscribe(val => this.isLoggedIn = val);
    this.auth.role$.subscribe(val=>this.role=val);
    this.auth.username$.subscribe(name => this.username = name);
  }
 logout() {
    this.showLogoutConfirm = true;
  }

 
  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }
  showProfileMenu = false;

toggleProfileMenu() {
  this.showProfileMenu = !this.showProfileMenu;
}

closeProfileMenu() {
  this.showProfileMenu = false;
}

openLogoutConfirm() {
  this.showProfileMenu = false;
  this.showLogoutConfirm = true;
}

 confirmLogout() {
    this.showLogoutConfirm = false;

    this.auth.logout();
    this.router.navigate(['/login']);
  }


cancelLogout() {
  this.showLogoutConfirm = false;
}

}
