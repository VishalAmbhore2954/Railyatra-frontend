import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../Services/admin-service';

@Component({
  selector: 'app-admin-seat-list',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-seat-list.html',
  styleUrl: './admin-seat-list.css',
})
export class AdminSeatList implements OnInit {

  Math = Math;

  seats: any[] = [];
  searchText = '';
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadSeats();
  }

  loadSeats(): void {

    this.adminService.getSeats().subscribe({

      next: (response: any) => {

        if (Array.isArray(response)) {

          this.seats = [...response].reverse();

        } else if (Array.isArray(response?.data)) {

          this.seats = [...response.data].reverse();

        } else {

          this.seats = [];
        }

        this.currentPage = 1;
      },

      error: (error) => {
        console.error('Error loading seats:', error);
      }
    });
  }

  get filteredSeats(): any[] {

    if (!this.searchText.trim()) {
      return this.seats;
    }

    const search = this.searchText.toLowerCase();

    return this.seats.filter(seat =>
      seat.seat_number?.toString().toLowerCase().includes(search) ||
      seat.seat_type?.toLowerCase().includes(search) ||
      seat.coach?.coach_number?.toString().toLowerCase().includes(search) ||
      seat.coach?.coach_type?.toLowerCase().includes(search) ||
      seat.coach?.train?.trainname?.toLowerCase().includes(search) ||
      seat.coach?.train?.trainnumber?.toString().toLowerCase().includes(search)
    );
  }

  get paginatedSeats(): any[] {

    const startIndex =
      (this.currentPage - 1) * this.itemsPerPage;

    return this.filteredSeats.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  get totalPages(): number {

    return Math.ceil(
      this.filteredSeats.length / this.itemsPerPage
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