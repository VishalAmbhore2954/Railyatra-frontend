import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-home',
  imports: [FormsModule],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css'
})
export class AdminHome {

  train = {
    trainname: '',
    trainnumber: '',
    numberofcoach: 0,
    traintype: ''
  };

  constructor(private http: HttpClient) {}

  addTrain() {

    // Validation
    if (
      !this.train.trainname ||
      !this.train.trainnumber ||
      !this.train.numberofcoach ||
      !this.train.traintype
    ) {
      alert('Please fill all fields');
      return;
    }

    // API call
    this.http.post(
      'http://127.0.0.1:8080/api/trains',
      this.train
    ).subscribe({

      next: (response) => {

        console.log('API Response:', response);

        alert('Train added successfully');

        // Clear form
        this.train = {
          trainname: '',
          trainnumber: '',
          numberofcoach: 0,
          traintype: ''
        };

      },

      error: (error) => {

        console.error('API Error:', error);

        alert('Failed to add train');

      }

    });

  }

}