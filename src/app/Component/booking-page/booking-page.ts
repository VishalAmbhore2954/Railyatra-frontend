import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Passenger {
  name: string;
  age: number;
  gender: string;
  berth: string;
}

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-page.html',
  styleUrl: './booking-page.css',
})
export class BookingPage {

  train = {
    trainNo: '12124',
    trainName: 'Deccan Queen',
    from: 'Pune Junction',
    to: 'Mumbai CSMT',
    departure: '07:15 AM',
    arrival: '10:40 AM',
    duration: '3h 25m',
    journeyDate: '15 Aug 2026',
    coach: 'B2',
    class: '3A'
  };

  contact = {
    mobile: '',
    email: ''
  };

  insurance = true;

  paymentMethod = 'upi';

  fare = {
    baseFare: 980,
    reservation: 40,
    gst: 35
  };

  passengers: Passenger[] = [
    {
      name: '',
      age: 25,
      gender: 'Male',
      berth: 'Lower'
    }
  ];

  addPassenger() {
    this.passengers.push({
      name: '',
      age: 25,
      gender: 'Male',
      berth: 'Lower'
    });
  }

  removePassenger(index: number) {
    if (this.passengers.length > 1) {
      this.passengers.splice(index, 1);
    }
  }

  get totalFare() {
    const fare =
      this.fare.baseFare +
      this.fare.reservation +
      this.fare.gst;

    return fare * this.passengers.length;
  }

  proceedPayment() {

    console.log({
      train: this.train,
      passengers: this.passengers,
      contact: this.contact,
      payment: this.paymentMethod
    });

    alert('Proceeding to payment...');
  }

}