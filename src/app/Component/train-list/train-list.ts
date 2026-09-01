import { Component } from '@angular/core';

@Component({
  selector: 'app-train-list',
  imports: [],
  templateUrl: './train-list.html',
  styleUrl: './train-list.css',
})
export class TrainList {
  trains = [
    {
      trainNo: 12124,
      trainName: 'Deccan Queen',
      from: 'Pune',
      to: 'Mumbai CSMT',
      departure: '07:15',
      arrival: '10:40',
      duration: '3h 25m',
      classes: [
        { type: 'SL', fare: 350, seats: 45, status: 'AVAILABLE' },
        { type: '3A', fare: 980, seats: 'WL 12', status: 'WAITING' },
        { type: '2A', fare: 1450, seats: 'RAC 5', status: 'RAC' },
        { type: '1A', fare: 2350, seats: 0, status: 'FULL' }
      ]
    },
    {
      trainNo: 12124,
      trainName: 'Deccan Queen',
      from: 'Pune',
      to: 'Mumbai CSMT',
      departure: '07:15',
      arrival: '10:40',
      duration: '3h 25m',
      classes: [
        { type: 'SL', fare: 350, seats: 45, status: 'AVAILABLE' },
        { type: '3A', fare: 980, seats: 'WL 12', status: 'WAITING' },
        { type: '2A', fare: 1450, seats: 'RAC 5', status: 'RAC' },
        { type: '1A', fare: 2350, seats: 0, status: 'FULL' }
      ]
    }
  ];
}
