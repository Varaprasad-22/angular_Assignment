import { Component } from '@angular/core';
import { FlightService } from '../services/flight';

@Component({
  selector: 'app-get-all-flights',
  imports: [],
  templateUrl: './get-all-flights.html',
  styleUrl: './get-all-flights.css',
})
export class GetAllFlights {

  flights:any[]=[];
  errorMessage='';
  constructor(private flightService:FlightService){
this.getAllFlights();
  }
  getAllFlights():void{
    this.flightService.getAllFlights().subscribe({
      next:(response:any[])=>{
        this.flights=response;
      },
      error:(err)=>{
          this.errorMessage = err.error?.message || 'Failed to load flights';
        this.flights = [];
      }
    })
  };
}
