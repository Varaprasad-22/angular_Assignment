import { Component,ChangeDetectorRef } from '@angular/core';
import { FlightService } from '../services/flight';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-all-flights',
  imports: [CommonModule],
  templateUrl: './get-all-flights.html',
  styleUrl: './get-all-flights.css',
})
export class GetAllFlights {

  flights:any[]=[];
  errorMessage='';
  constructor(private flightService:FlightService,
    private cdr:ChangeDetectorRef
  ){
this.getAllFlights();
  }
  getAllFlights():void{
    this.flightService.getAllFlights().subscribe({
      next:(response:any[])=>{
        this.flights=response;
        this.cdr.detectChanges();
      },
      error:(err)=>{
          this.errorMessage = err.error?.message || 'Failed to load flights';
        this.flights = [];
      }
    })
  };

}
