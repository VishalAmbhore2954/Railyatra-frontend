import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../Services/admin-service';

@Component({
  selector: 'app-add-route',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-route.html',
  styleUrl: './add-route.css'
})
export class AddRoute implements OnInit {

  trains: any[] = [];
  stations: any[] = [];

  route = {
    train_id: null as number | null,
    station_id: null as number | null,
    station_order: null as number | null,
    arrival: '',
    departure: '',
    has_stop: true
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadTrains();
    this.loadStations();
  }

  loadTrains(): void {
    this.adminService.getTrains().subscribe({
      next: (response: any[]) => {
        this.trains = response;
      },
      error: (error) => {
        console.error('Error loading trains:', error);
      }
    });
  }

  loadStations(): void {
    this.adminService.getStations().subscribe({
      next: (response: any[]) => {
        this.stations = response;
      },
      error: (error) => {
        console.error('Error loading stations:', error);
      }
    });
  }

  addRoute(): void {

    if (
      this.route.train_id === null ||
      this.route.station_id === null ||
      this.route.station_order === null ||
      !this.route.arrival ||
      !this.route.departure
    ) {
      alert('Please fill all route fields');
      return;
    }

    const routeData = {
      train_id: this.route.train_id,
      station_id: this.route.station_id,
      station_order: this.route.station_order,
      arrival: this.route.arrival,
      departure: this.route.departure,
      has_stop: this.route.has_stop
    };

    console.log('Route Data:', routeData);

    this.adminService.postRoute(routeData).subscribe({
      next: (response: any) => {

        console.log('Route added:', response);

        alert('Route added successfully');

        this.resetForm();
      },

      error: (error) => {

        console.error('Route error:', error);

        alert(
          error?.error?.message ||
          'Failed to add route'
        );
      }
    });
  }

  resetForm(): void {

    this.route = {
      train_id: null,
      station_id: null,
      station_order: null,
      arrival: '',
      departure: '',
      has_stop: true
    };
  }
}