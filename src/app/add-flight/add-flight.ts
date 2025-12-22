import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlightService } from '../services/flight';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-flight',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-flight.html',
  styleUrl: './add-flight.css',
})
export class AddFlight {
  successMessage='';
  errorMessage="";
  addFlightForm!:FormGroup
  constructor(
    private fb:FormBuilder,
    private flightService:FlightService,
    private auth:AuthService,
    private router:Router 
  ){
    if(!this.auth.isAdmin()){
      this.router.navigate(['/login']);
    }
  

  this.addFlightForm=this.fb.group({
    airlineName:['',Validators.required],
    flightNumber:['',Validators.required],
    fromPlace:['',Validators.required],
    toPlace:['',Validators.required],
    depatureTime:['',Validators.required],
    arrivalTime:['',Validators.required],
    totalSeats:[null,[Validators.min(1),Validators.required]],
    price:[null,[Validators.required,Validators.min(0)]]
  })
}

  addFlight(){
    if(this.addFlightForm.invalid){
      this.addFlightForm.markAllAsTouched();
      return;
    }
    this.flightService.addFlight(this.addFlightForm.value).subscribe({
      next:(response:any)=>{
        this.addFlightForm.reset();
        this.successMessage=response||"added Flight";
      },
      error:(err:any)=>{
        this.errorMessage=err.error||"failed to Add Fligt";
      }
    })
  }
}
