import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from '../services/booking';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
    outboundFlightId!: number;
    emailId!: string | null;
  constructor(
    private fb:FormBuilder,
    private bookingService:BookingService,
    private router:Router
  ){
  
    // READ flightId from router state
    const navigation = this.router.getCurrentNavigation();
    this.outboundFlightId =
      navigation?.extras?.state?.['outboundFlightId'];
  if (!this.outboundFlightId) {
  this.router.navigate(['/search-flights']);
}
    this.bookingForm=this.fb.group({
      emailId:localStorage.getItem('email'),
      name:['',Validators.required],
      noOfSeats:[1,[Validators.required,Validators.min(1)]],
      outboundFlightId:[this.outboundFlightId,Validators.required],
   passengers: this.fb.array([]) 
});
 this.bookingForm.get('noOfSeats')?.valueChanges.subscribe(seats => {
    this.syncPassengers(seats);
  });
    this.syncPassengers(1);
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
  syncPassengers(seatCount: number) {
  const currentCount = this.passengers.length;

  if (seatCount > currentCount) {
    for (let i = currentCount; i < seatCount; i++) {
      this.passengers.push(this.createPassenger());
    }
  } else if (seatCount < currentCount) {
    for (let i = currentCount; i > seatCount; i--) {
      this.passengers.removeAt(i - 1);
    }
  }
}
  book(){
    const payload={
      ...this.bookingForm.value
    }
    this.bookingService.bookingFlights(payload).subscribe({
      next:(response:any)=>{
        console.log(response);
        this.pnrNumber=response;
        alert(response)
      },
      error:(err)=>{
        console.log(err);
          alert(err)
      }
    })
  }
}
