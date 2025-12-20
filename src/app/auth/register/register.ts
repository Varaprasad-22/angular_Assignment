import { Component ,ChangeDetectorRef} from '@angular/core';
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

  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cbr:ChangeDetectorRef
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user', Validators.required]  
    });
  }
submit() {
this.successMessage = '';
    this.errorMessage = '';
  const payload = {
    ...this.registerForm.value,
    role: [this.registerForm.value.role]
  };

  this.authService.register(payload).subscribe({
    next: (res: any) => {
      // alert(res.message || 'User registered successfully');
        this.successMessage = res.message || 'User registered successfully';

        // //  delay before navigation
        // setTimeout(() => {
        //   this.router.navigate(['/login']);
        // }, 1500);
        this.cbr.detectChanges();
      this.router.navigate(['/login']);
    },
    error: (err) => {
         if (typeof err.error === 'string') {
        this.errorMessage = err.error;
      } else {
        this.errorMessage = err.error?.message || 'Registration failed';
      }
    // }
          // this.errorMessage = err.message || 'Registration failed';
      this.cbr.detectChanges();
          // alert(err.error?.message || 'Registration failed');
}
  });
}

}
