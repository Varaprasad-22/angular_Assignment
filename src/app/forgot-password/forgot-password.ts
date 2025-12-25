import { CommonModule } from '@angular/common';
import { Component,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  form!:FormGroup;
  successMessage='';
  ErrorMEssage="";
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private cdr:ChangeDetectorRef
  ){
    this.form=this.fb.group({
      email:['',[Validators.required,Validators.email]]
    })
  }

  forgotFormSubmit(){
    if(this.form.invalid)
      return;

    this.authService.forgotPassword(this.form.value).subscribe({
      next:(response:any)=>{
        this.successMessage=response.message;
        this.cdr.detectChanges();
      },error:(err)=>{
        this.ErrorMEssage=err.error;
        this.cdr.detectChanges();
      }
    })
  }
}
