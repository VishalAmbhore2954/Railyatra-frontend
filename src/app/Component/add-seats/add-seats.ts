import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-seats',
  imports: [FormsModule],
  templateUrl: './add-seats.html',
  styleUrl: './add-seats.css',
})
export class AddSeats implements OnInit {

  seat = {
    train_id: null as number | null,
    coach_id: null as number | null,
    seat_number: null as number | null,
    seat_type: ''
  };

  trains: any[] = [];
  coaches: any[] = [];

  ngOnInit(): void {

    // API मधून trains load कर
    // this.loadTrains();

  }

  onTrainChange(): void {

    this.seat.coach_id = null;

    // Selected train नुसार coaches load कर
    // this.loadCoaches(this.seat.train_id);

  }

  addSeat(): void {

    if (
      this.seat.train_id === null ||
      this.seat.coach_id === null ||
      this.seat.seat_number === null ||
      this.seat.seat_number <= 0 ||
      !this.seat.seat_type
    ) {
      alert('Please fill all seat fields');
      return;
    }

    const seatData = {
      train_id: this.seat.train_id,
      coach_id: this.seat.coach_id,
      seat_number: this.seat.seat_number,
      seat_type: this.seat.seat_type
    };

    console.log('Seat:', seatData);

    // API call here

  }

  resetForm(): void {

    this.seat = {
      train_id: null,
      coach_id: null,
      seat_number: null,
      seat_type: ''
    };

  }

}