import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {

  token!:string;
  form!:FormGroup;
  message="";
  error="";
  
  constructor(
    private router:Router,
    private authService:AuthService,
    private route:ActivatedRoute,
    private fb:FormBuilder
  ){
    this.token=this.route.snapshot.queryParamMap.get('token')||'';
    this.form=this.fb.group({
      newPassword:['',[Validators.required,Validators.minLength(8)]]
    })
  }


  ResetPassword(){
    this.authService.resetPassword({token:this.token,newPassword:this.form.value.newPassword!}).subscribe({
     next: () => {
        this.message = 'Password updated successfully!';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: err => {
        this.error = err.error?.message || 'Invalid or expired link';
      }
    })
  }
}
