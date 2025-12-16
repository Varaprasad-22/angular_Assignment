import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user', Validators.required]  
    });
  }
submit() {

  const payload = {
    ...this.registerForm.value,
    role: [this.registerForm.value.role]
  };

  this.authService.register(payload).subscribe({
    next: (res: any) => {
      alert(res.message || 'User registered successfully');
      this.router.navigate(['/login']);
    },
    error: (err) => {
      alert(err.error?.message || 'Registration failed');
    }
  });
}

}
