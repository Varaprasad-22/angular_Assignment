import { CommonModule } from '@angular/common';
import { Component,ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-expired-password',
  imports: [CommonModule],
  templateUrl: './expired-password.html',
  styleUrl: './expired-password.css',
})
export class ExpiredPassword {

  errorMessage='';
  successMessage='';
  constructor(
    private authService:AuthService
  ){}
}
