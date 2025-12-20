import { Component,ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  loginForm!: FormGroup;

  successMessage = '';
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
  username: ['', [Validators.required, Validators.minLength(3)]],
  password: ['', [Validators.required, Validators.minLength(6)]],
});
  }
submit() {
  this.successMessage = '';
    this.errorMessage = '';
  this.auth.login(this.loginForm.value).subscribe({
    next: (res: any) => {
       this.successMessage = res.message || 'Login successful';
       this.cdr.detectChanges();
      // alert(res.message || 'Login successful');
      this.router.navigate(['/search-flights'])
    },
    error: (err) => {
      // alert(err.error?.message || 'Invalid username or password');
      this.errorMessage = err.error?.message || 'Invalid username or password';
       this.cdr.detectChanges();
    }
  });
}

}
