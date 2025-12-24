import { CommonModule } from '@angular/common';
import { Component,ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expired-password',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './expired-password.html',
  styleUrl: './expired-password.css',
})
export class ExpiredPassword {

  errorMessage='';
  successMessage='';

  expiredForm!:FormGroup
  constructor(
    private authService:AuthService,
    private fb:FormBuilder,
    private route:Router
  ){
    this.expiredForm=this.fb.group({
    name: ['',Validators.required],
    oldPassword:['',Validators.required],
    newPassword:['',Validators.required],
    confirmPassword:['',Validators.required]
  });
  }

  submit(){
    this.errorMessage='';
    this.successMessage='';

    if(this.expiredForm.invalid){
      return;
    }

    if(this.expiredForm.value.newPassword!==this.expiredForm.value.confirmPassword){
      this.errorMessage="Password did not match"
      return;

    }
    this.authService.expiredPasswordChange(this.expiredForm.value).subscribe({
      next:(response:any)=>{
        this.successMessage=response.message||"Password Updated SuccesFully Please Login";
        setTimeout(() => this.route.navigate(['/login']), 1500);
      },
      error:(err)=>{
        this.errorMessage=err.error;

      }
    });
  }
}
