import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../Services/admin-service';

@Component({
  selector: 'app-admin-station-list',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-station-list.html',
  styleUrl: './admin-station-list.css',
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

  loadStations(): void {

    this.adminService.getStations().subscribe({

      next: (response: any) => {

        if (Array.isArray(response)) {

          this.stations = [...response].reverse();

        } else if (Array.isArray(response?.data)) {

          this.stations = [...response.data].reverse();

        } else {

          this.stations = [];
        }

        this.currentPage = 1;
      },

      error: (error) => {
        console.error('Error loading stations:', error);
      }
    });
  }

  get filteredStations(): any[] {

    if (!this.searchText.trim()) {
      return this.stations;
    }

    const search = this.searchText.toLowerCase();

    return this.stations.filter(station =>
      station.station_name?.toLowerCase().includes(search) ||
      station.station_code?.toLowerCase().includes(search) ||
      station.city?.toLowerCase().includes(search) ||
      station.state?.toLowerCase().includes(search)
    );
  }

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

  goToPage(page: number): void {

    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
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

  onSearch(): void {
    this.currentPage = 1;
  }
}