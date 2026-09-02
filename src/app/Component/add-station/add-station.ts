import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-station',
  imports: [FormsModule],
  templateUrl: './add-station.html',
  styleUrl: './add-station.css',
})
export class AddStation {

  station = {
    station_name: '',
    station_code: '',
    city: '',
    state: ''
  };

  addStation() {

    if (
      !this.station.station_name.trim() ||
      !this.station.station_code.trim() ||
      !this.station.city.trim() ||
      !this.station.state
    ) {
      alert('Please fill all station fields');
      return;
    }

    console.log('Station:', this.station);

    // API call here

  }

  resetForm() {

    this.station = {
      station_name: '',
      station_code: '',
      city: '',
      state: ''
    };

  }

}