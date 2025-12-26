import { Component,ChangeDetectorRef } from '@angular/core';
import { HistoryService } from '../services/history';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {
bookings:any[]=[];
  // cancelSuccess:string="";
  // cancelerror:string="";
  showDialog = false;
  selectedPnr: string | null = null;

  constructor(
    private history:HistoryService,
    private router:Router,
private cdr:ChangeDetectorRef
  ){
    const email=localStorage.getItem('email')
    if(!email){
      this.router.navigate(['login']);
      return;
    }
    this.history.getHistoryByMail().subscribe({
      next:(response)=>{
        this.bookings=response.map((a:any)=>({
          ...a,
          cancelSuccess:'',
          cancelError:''
        })).sort(
          (a:any,b:any)=>Number(b.status)-Number(a.status)
        );
        this.cdr.detectChanges();
      },
      error:(err)=>{
        console.error(err)
      }
    });
  }

  dailogOpen(pnr:string){
    this.showDialog=true;
    this.selectedPnr=pnr;
  }
  dailogClose(){
    this.showDialog=false;
    this.selectedPnr=null;
  }
  cancelTicket(){
if(!this.selectedPnr){
return ;
}
this.history.cancelTicet(this.selectedPnr).subscribe({
  next:(response:any)=>{
    const booking = this.bookings.find(b => b.pnr === this.selectedPnr);
    booking.cancelSuccess=(response?.message||response);
    // this.cancelSuccess=(response?.message||response);
    booking.status = false;
    console.log(response)
        this.showDialog=false;
        this.cdr.detectChanges();
  },
  error:(err)=>{
    // this.cancelerror= err?.error?.message || 'Cancel failed';
    const booking = this.bookings.find(b => b.pnr === this.selectedPnr);
    booking.cancelError = err?.error || 'Cancel failed';

    console.log(err)
        this.showDialog=false;
                this.cdr.detectChanges();
  }
  
})
  }
}
