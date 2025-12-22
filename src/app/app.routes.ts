import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register';
import { LoginComponent } from './auth/login/login';
import { SearchFlightsComponent } from './flights/search-flights/search-flights';
import { BookingsComponent } from './bookings/bookings';
import { History } from './history/history';
import { AddFlight } from './add-flight/add-flight';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search-flights', component: SearchFlightsComponent },
  { path: 'bookings', component: BookingsComponent },
  {path:'bookingHistory',component:History},
  {path:"addFlight",component:AddFlight}
];

