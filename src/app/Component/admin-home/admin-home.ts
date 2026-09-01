import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../Services/admin-service';

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


  station = {
    station_name: '',
    station_code: '',
    city: '',
    state: ''
  };


  constructor(private adminService: AdminService) {}


  // =========================
  // ADD TRAIN
  // =========================

  addTrain() {

    if (
      !this.train.trainname ||
      !this.train.trainnumber ||
      !this.train.numberofcoach ||
      !this.train.traintype
    ) {
      alert('Please fill all train fields');
      return;
    }


    this.adminService.postTrain(this.train).subscribe({

      next: (response: any) => {

        console.log('Train added:', response);

        alert('Train added successfully');

        this.train = {
          trainname: '',
          trainnumber: '',
          numberofcoach: 0,
          traintype: ''
        };

      },

      error: (error: any) => {

        console.error('Train error:', error);

        alert('Failed to add train');

      }

    });

  }


  // =========================
  // ADD STATION
  // =========================

  addStation() {

    if (
      !this.station.station_name ||
      !this.station.station_code ||
      !this.station.city ||
      !this.station.state
    ) {
      alert('Please fill all station fields');
      return;
    }


    this.adminService.postStation(this.station).subscribe({

      next: (response: any) => {

        console.log('Station added:', response);

        alert('Station added successfully');

        this.station = {
          station_name: '',
          station_code: '',
          city: '',
          state: ''
        };

      },

      error: (error: any) => {

        console.error('Station error:', error);

        alert('Failed to add station');

      }

    });

  }

}