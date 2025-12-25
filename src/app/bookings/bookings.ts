import { Component, ChangeDetectorRef } from '@angular/core';
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

  bookingForm!: FormGroup
  pnrNumber!: string;
  outboundFlightId!: number;
  emailId!: string | null;
  successMessage = "";
  seatRows = ['A', 'B', 'C', 'D'];
  seatCols = [1, 2, 3, 4, 5, 6];
  errorMessage = '';
  bookedSeats: string[] = [];
  activeSeatIndex: number | null = null;
  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {

    // READ flightId from router state
    const navigation = this.router.getCurrentNavigation();
    this.outboundFlightId =
      navigation?.extras?.state?.['outboundFlightId'];
    if (!this.outboundFlightId) {
      this.router.navigate(['/search-flights']);
    }
    this.bookingForm = this.fb.group({
      emailId: localStorage.getItem('email'),
      name: ['', Validators.required],
      noOfSeats: [1, [Validators.required, Validators.min(1)]],
      outboundFlightId: [this.outboundFlightId, Validators.required],
      passengers: this.fb.array([])
    });
    this.bookingForm.get('noOfSeats')?.valueChanges.subscribe(seats => {
      this.syncPassengers(seats);
    });
    this.syncPassengers(1);
    if (this.outboundFlightId) {
      this.getAllSeats();
    }


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
  book() {
    this.errorMessage='';
    this.successMessage='';
    const payload = {
      ...this.bookingForm.value
    }
    this.bookingService.bookingFlights(payload).subscribe({
      next: (response: any) => {
        console.log(response);
        this.pnrNumber = response;
        this.successMessage = response;
        // alert(response)
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error;

        this.cdr.detectChanges();
        // alert(err)
      }
    })
  }

//prevent autosubmission
onSubmit(event: Event) {
  event.preventDefault();   
  event.stopPropagation(); 

  // Only submit when user explicitly clicks Book button
  if (this.bookingForm.valid) {
    this.book();
  }
}



  //getAlllseats
  getAllSeats() {
    this.bookingService.getSeatsBooked(this.outboundFlightId).subscribe({
      next: (response: any) => {
        this.bookedSeats = response;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error;
        this.cdr.detectChanges();
      },
    })
  }

  openSeatSelector(index: number) {
    this.activeSeatIndex = index
  }
  closeSeat() {
    this.activeSeatIndex = null;
  }
 selectSeat(seat: string, event?: Event) {
  if (event) event.preventDefault();
 
      if (this.activeSeatIndex === null) return;
    //prevent duplicate booking
  const isTakenByAnother = this.passengers.controls.some(
    (p, index) =>
      p.get('seatNo')?.value === seat && index !== this.activeSeatIndex
  );

  if (isTakenByAnother) {
    this.errorMessage = 'This seat is already selected by another passenger';
    return;
  }

  // Assign seat
  this.passengers.at(this.activeSeatIndex).get('seatNo')?.setValue(seat);
  this.errorMessage = '';
  this.closeSeat();

  }

  isSeatBooked(seat: string): boolean {
    return this.bookedSeats.includes(seat);
  }

  isSelected(seat: string): boolean {
    return this.passengers.controls.some(
      p => p.get('seatNo')?.value === seat
    )
  }
}
