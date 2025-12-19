import { Component } from '@angular/core';
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
bookings:any[]=[]
  constructor(
    private history:HistoryService,
    private router:Router

  ){
    const email=localStorage.getItem('email')
    if(!email){
      this.router.navigate(['login']);
      return;
    }
    this.history.getHistoryByMail().subscribe({
      next:(response)=>{
        this.bookings=response;
      },
      error:(err)=>{
        console.error(err)
      }
    });
  }

}
