import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
   passengers: this.fb.array([]) 
});

  }
  get passengers(): FormArray {
    return this.bookingForm.get('passengers') as FormArray;
  }
  createPassenger(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      seatNo: ['', Validators.required],
      meal: ['', Validators.required]
    });
  }
  addPassenger() {
    this.passengers.push(this.createPassenger());
  }
  removePassenger(index: number) {
    this.passengers.removeAt(index);
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
