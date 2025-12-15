import { Component, signal } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
   standalone: true,
})
export class App {
  protected readonly title = signal('flight-booking-frontend');
}
