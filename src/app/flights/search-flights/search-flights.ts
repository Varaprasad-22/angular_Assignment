import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../services/flight';

@Component({
  selector: 'app-search-flights',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search-flights.html',
  styleUrl: './search-flights.css'
})
export class SearchFlightsComponent {

  searchForm!: FormGroup;
  today!:String;
  flights: any[] = [];

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService
  ) {
    this.searchForm = this.fb.group({
      fromPlace: ['', Validators.required],
      toPlace: ['', Validators.required],
      departureDate: ['', Validators.required],
      returnDate: [''],
      tripType: ['oneWay', Validators.required]
    });
    const now=new Date();
    this.today=now.toISOString().split('T')[0];
  }
search() {
  const payload = { ...this.searchForm.value };

  if (payload.tripType === 'oneWay') {
    delete payload.returnDate;
  }

  this.flightService.searchFlights(payload).subscribe({
    next: (res: any) => {
      console.log('FULL RESPONSE ', res);
      console.log('OUTBOUND ', res.outboundFlights);

      this.flights = res.outboundFlights || [];
    },
    error: (err) => {
      console.error('ERROR ', err);
    }
  });
}

}
