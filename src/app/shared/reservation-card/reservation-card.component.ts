import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IReservation } from '../models/model';
import { StatusPipe } from '../pipes/status.pipe';
import { FormsModule } from '@angular/forms';

/**
 * Component to display a reservation card.
 * It shows the reservation details including name, email, phone, date, guests, message, and status.
 */
@Component({
  selector: 'app-reservation-card',
  imports: [StatusPipe, CommonModule, FormsModule],
  templateUrl: './reservation-card.component.html',
  styleUrl: './reservation-card.component.scss',
  standalone: true,
})
export class ReservationCardComponent {
  @Input() reservation!: IReservation;
  @Output() statusChanged = new EventEmitter<void>();

  consent: boolean = false;

  getStatusClass(): string {
    switch (this.reservation.status) {
      case 'WAITING_FOR_CONFIRMATION':
        return 'status-circle yellow';
      case 'CONFIRMED':
        return 'status-circle green';
      case 'CANCELED':
        return 'status-circle red';
      default:
        return 'status-circle';
    }
  }
  confirmReservation(): void {
    this.reservation.status = 'CONFIRMED';
    this.statusChanged.emit();
  }
  cancelReservation(): void {
    this.reservation.status = 'CANCELED';
    this.statusChanged.emit();
  }
  recoverReservation(): void {
    this.reservation.status = 'WAITING_FOR_CONFIRMATION';
    this.statusChanged.emit();
  }
}
