import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-coach',
  imports: [FormsModule],
  templateUrl: './add-coach.html',
  styleUrl: './add-coach.css',
})
export class AddCoach implements OnInit {

  coach = {
    train_id: null as number | null,
    coach_number: '',
    coach_type: '',
    total_seats: null as number | null
  };

  trains: any[] = [];

  ngOnInit(): void {

    // API मधून trains load कर
    // this.loadTrains();

  }

  addCoach(): void {

    if (
      this.coach.train_id === null ||
      !this.coach.coach_number.trim() ||
      !this.coach.coach_type ||
      this.coach.total_seats === null ||
      this.coach.total_seats <= 0
    ) {
      alert('Please fill all coach fields');
      return;
    }

    const coachData = {
      train_id: this.coach.train_id,
      coach_number: this.coach.coach_number,
      coach_type: this.coach.coach_type,
      total_seats: this.coach.total_seats
    };

    console.log('Coach:', coachData);

    // API call here

  }

  resetForm(): void {

    this.coach = {
      train_id: null,
      coach_number: '',
      coach_type: '',
      total_seats: null
    };

  }

}