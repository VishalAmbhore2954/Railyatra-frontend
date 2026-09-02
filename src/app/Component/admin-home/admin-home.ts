import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../Services/admin-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  imports: [FormsModule,RouterLink],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css'
})
export class AdminHome implements OnInit {

  // =========================
  // TRAIN
  // =========================

  train = {
    trainname: '',
    trainnumber: '',
    numberofcoach: 0,
    traintype: ''
  };

  trains: any[] = [];
  total_trains: any;


  // =========================
  // STATION
  // =========================

  station = {
    station_name: '',
    station_code: '',
    city: '',
    state: ''
  };

  stations: any[] = [];
  total_stations: any;

  routes: any[] = [];
  total_routes: any;


  // =========================
  // ROUTE
  // =========================

  route = {
    train_id: null as number | null,
    station_id: null as number | null,
    station_order: null as number | null,
    arrival: '' as string,
    departure: '' as string,
    has_stop: null as boolean | null
  };


  constructor(private adminService: AdminService) { }


  // =========================
  // LOAD DATA
  // =========================

  ngOnInit(): void {

    this.loadTrains();

    this.loadStations();

    this.loadRoutes();

  }


  loadTrains() {

    this.adminService.getTrains().subscribe({

      next: (response: any[]) => {

        console.log('Trains:', response);

        this.trains = response;

        this.total_trains = this.trains.length;

      },

      error: (error: any) => {

        console.error('Error loading trains:', error);

      }

    });

  }


  loadRoutes() {

    this.adminService.getRoutes().subscribe({

      next: (response: any[]) => {

        console.log('Routes:', response);

        this.routes = response.reverse();

        this.total_routes = this.routes.length;

      },

      error: (error: any) => {

        console.error('Error loading routes:', error);

      }

    });

  }

  loadStations() {

    this.adminService.getStations().subscribe({

      next: (response: any[]) => {

        console.log('Stations:', response);

        this.stations = response;

        this.total_stations = this.stations.length;

      },

      error: (error: any) => {

        console.error('Error loading stations:', error);

      }

    });

  }


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

        // Refresh train dropdown
        this.loadTrains();

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

        // Refresh station dropdown
        this.loadStations();

      },

      error: (error: any) => {

        console.error('Station error:', error);

        alert('Failed to add station');

      }

    });

  }


  // =========================
  // ADD ROUTE
  // =========================

  addRoute(): void {

    if (
      this.route.train_id === null ||
      this.route.station_id === null ||
      this.route.station_order === null ||
      !this.route.arrival ||
      !this.route.departure ||
      this.route.has_stop === null
    ) {
      alert('Please fill all route fields');
      return;
    }

    const routeData = {
      train_id: this.route.train_id,
      station_id: this.route.station_id,
      station_order: this.route.station_order,
      arrival: this.route.arrival,       // "08:30"
      departure: this.route.departure,   // "08:35"
      has_stop: this.route.has_stop
    };

    console.log('Sending route:', routeData);

    this.adminService.postRoute(routeData).subscribe({

      next: (response: any) => {

        console.log('Route added:', response);

        this.route = {
          train_id: null,
          station_id: null,
          station_order: null,
          arrival: '',
          departure: '',
          has_stop: null
        };

        alert('Route added successfully');

        this.loadRoutes();
      },

      error: (error: any) => {

        console.error('Route error:', error);

        alert('Failed to add route');

      }

    });
  }

}