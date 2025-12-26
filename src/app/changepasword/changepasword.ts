import { Component,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '.././services/auth';

@Component({
  selector: 'app-changepasword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './changepasword.html',
  styleUrl: './changepasword.css',
})
export class Changepasword {

  changePasswordForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr:ChangeDetectorRef
  ) {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [
        Validators.required,
        Validators.pattern(this.passwordRegex)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
   const oldPassword = form.get('oldPassword')?.value;
  const newPassword = form.get('newPassword')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;

  if (newPassword !== confirmPassword) {
    return { passwordMismatch: true };
  }

  if (oldPassword && newPassword && oldPassword === newPassword) {
    return { sameAsOldPassword: true };
  }

  return null;
  }

  submit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }
    const payload = {
      oldPassword: this.changePasswordForm.value.oldPassword,
      newPassword: this.changePasswordForm.value.confirmPassword
    };

    this.authService.changePassword(payload).subscribe({
      next: (response: any) => {
        this.successMessage = response.message || 'Password changed successfully';
        this.changePasswordForm.reset();
                this.cdr.detectChanges();
      },
      error: (err:any) => {
        this.errorMessage = err.error?.message || 'Failed to change password';
                this.cdr.detectChanges();
      }
    });
  }
}
