import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../Services/admin-service';

@Component({
  selector: 'app-admin-station-list',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './admin-station-list.html',
  styleUrl: './admin-station-list.css'
})
export class AdminStationList implements OnInit {

  Math = Math;

  stations: any[] = [];

  searchText = '';

  currentPage = 1;
  itemsPerPage = 10;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadStations();
  }

  // =========================
  // LOAD STATIONS
  // =========================

  loadStations(): void {

    console.log('Calling Station API...');

    this.adminService.getStations().subscribe({

      next: (response: any) => {

        console.log('STATION RESPONSE:', response);

        // Direct array response
        if (Array.isArray(response)) {

          this.stations = response;

        }

        // { data: [...] } response
        else if (Array.isArray(response?.data)) {

          this.stations = response.data;

        }

        else {

          console.error('Unexpected station response:', response);

          this.stations = [];
        }

        console.log('FINAL STATIONS:', this.stations);
        console.log('TOTAL STATIONS:', this.stations.length);

        this.currentPage = 1;
      },

      error: (error) => {

        console.error('STATION API ERROR:', error);

        this.stations = [];
      }

    });
  }

  // =========================
  // SEARCH
  // =========================

  get filteredStations(): any[] {

    const search = this.searchText.trim().toLowerCase();

    if (!search) {
      return this.stations;
    }

    return this.stations.filter(station =>

      station.station_name?.toString().toLowerCase().includes(search) ||

      station.station_code?.toString().toLowerCase().includes(search) ||

      station.city?.toString().toLowerCase().includes(search) ||

      station.state?.toString().toLowerCase().includes(search)

    );
  }

  // =========================
  // PAGINATION
  // =========================

  get paginatedStations(): any[] {

    const startIndex =
      (this.currentPage - 1) * this.itemsPerPage;

    return this.filteredStations.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  get totalPages(): number {

    return Math.ceil(
      this.filteredStations.length / this.itemsPerPage
    );
  }

  get pages(): number[] {

    return Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
    );
  }

  // =========================
  // PAGE CHANGE
  // =========================

  goToPage(page: number): void {

    if (
      page >= 1 &&
      page <= this.totalPages
    ) {

      this.currentPage = page;

    }
  }

  previousPage(): void {

    if (this.currentPage > 1) {

      this.currentPage--;

    }
  }

  nextPage(): void {

    if (this.currentPage < this.totalPages) {

      this.currentPage++;

    }
  }

  // =========================
  // SEARCH CHANGE
  // =========================

  onSearch(): void {

    this.currentPage = 1;

  }

}