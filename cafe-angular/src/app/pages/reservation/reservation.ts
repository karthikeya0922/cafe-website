import { Component, signal } from '@angular/core';
import { DatePipe, JsonPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

interface Reservation {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number | null;
  seating: string;
  requests: string;
}

@Component({
  selector: 'app-reservation',
  imports: [FormsModule, DatePipe, JsonPipe],
  templateUrl: './reservation.html',
  styleUrl: './reservation.css',
})
export class ReservationPage {
  // Template-driven form: the template builds the form, bound to this model with ngModel
  protected model: Reservation = this.emptyModel();
  protected readonly today = this.toDateString(new Date());
  protected readonly confirmed = signal<Reservation[]>([]);

  protected isPastDate(date: string): boolean {
    return date !== '' && date < this.today;
  }

  protected isOutsideHours(time: string): boolean {
    return time !== '' && (time < '08:00' || time > '22:00');
  }

  protected submit(form: NgForm): void {
    if (form.invalid || this.isPastDate(this.model.date) || this.isOutsideHours(this.model.time)) {
      form.control.markAllAsTouched();
      return;
    }
    this.confirmed.update((list) => [...list, { ...this.model }]);
    form.resetForm(this.emptyModel());
  }

  private emptyModel(): Reservation {
    return { name: '', email: '', date: '', time: '', guests: 2, seating: 'indoor', requests: '' };
  }

  private toDateString(d: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }
}
