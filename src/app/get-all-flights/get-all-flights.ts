import { Component,ChangeDetectorRef } from '@angular/core';
import { FlightService } from '../services/flight';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';

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
    private cdr:ChangeDetectorRef,
    private router:Router
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


  isBookingDisabled(flight:any){
    return flight.totalSeats<=0||
    new Date(flight.depatureTime)<=new Date();
  }
  bookingPass(flights:any){
    this.router.navigate(['/bookings'], {
    state: {
      outboundFlightId: flights.flightId   
    }})


  }
}
