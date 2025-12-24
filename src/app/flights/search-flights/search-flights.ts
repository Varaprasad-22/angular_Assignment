import { Component,ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../services/flight';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-flights',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterModule],
  templateUrl: './search-flights.html',
  styleUrl: './search-flights.css'
})
export class SearchFlightsComponent {
  places: string[] = [
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Chennai',
  'Hyderabad',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Kurnool'
];

  searchForm!: FormGroup;
  today!:String;
  flights: any[] = [];
errorMessage!:String
  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private router:Router,
    private cbr:ChangeDetectorRef
  ) {
    this.searchForm = this.fb.group({
      fromPlace: ['', Validators.required],
      toPlace: ['', Validators.required],
      departureDate: ['', Validators.required],
      returnDate: [''],
      tripType: ['oneWay', Validators.required]
    });
    
  const returnDateControl = this.searchForm.get('returnDate');
  const tripTypeControl = this.searchForm.get('tripType');

      if (tripTypeControl?.value === 'oneWay') {
    returnDateControl?.disable();
  }
    const now=new Date();
    this.today=now.toISOString().split('T')[0];
    this.searchForm.get('tripType')?.valueChanges.subscribe((tripType) => {
      const returnDate=this.searchForm.get('returnDate');
      if(tripType==='oneWay'){
        returnDate?.disable();
        returnDate?.reset();
      }else{
        returnDate?.enable();
      }
    });
  }
search() {
  this.flights=[]
  this.errorMessage=''
  const payload = { ...this.searchForm.value };

  if (payload.tripType === 'oneWay') {
    delete payload.returnDate;
  }

  this.flightService.searchFlights(payload).subscribe({
    next: (response: any) => {
      console.log('FULL RESPONSE ', response);
      console.log('OUTBOUND ', response.outboundFlights);

      this.flights = response.outboundFlights || [];
    
    this.cbr.detectChanges();
    },
    error: (err) => {
      // console.error('ERROR ', err.error.message);
      // alert(err.message)
      this.errorMessage=err.error.message;
        this.cbr.detectChanges();
    }
  });
}
selectFlight(flight: any) {
  this.router.navigate(['/bookings'], {
    state: {
      outboundFlightId: flight.flightId   
    }
  });
}

}
