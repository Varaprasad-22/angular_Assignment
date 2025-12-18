import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from '../services/booking';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookings',
   standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './bookings.html',
  styleUrl: './bookings.css',
})
export class BookingsComponent {

  bookingForm!:FormGroup
  pnrNumber!:String;
  constructor(
    private fb:FormBuilder,
    private bookingService:BookingService
  ){
    this.bookingForm=this.fb.group({
      emailId:['',Validators.required],
      name:['',Validators.required],
      noOfSeats:[1,[Validators.required,Validators.min(1)]],
      outboundFlightId:[2],
   passengers: this.fb.array([
    this.fb.group({
      name: ['vara'],
      age: [20],
      gender: ['Male'],
      seatNo: ['3-B'],
      meal: ['veg']
    })
  ])
});

  }
  book(){
    const payload={
      ...this.bookingForm.value
    }
    this.bookingService.bookingFlights(payload).subscribe({
      next:(response:any)=>{
        console.log(response);
        this.pnrNumber=response;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
