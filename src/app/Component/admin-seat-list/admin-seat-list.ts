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

  // =========================
  // INITIAL LOAD
  // =========================

  ngOnInit(): void {
    this.loadSeats();
  }

  // =========================
  // LOAD SEATS
  // =========================

  loadSeats(): void {

    console.log('Calling Seat API...');

    this.adminService.getSeats().subscribe({

      next: (response: any) => {

        console.log('SEAT RESPONSE:', response);

        // Direct array response
        if (Array.isArray(response)) {

          this.seats = [...response];

        }

        // { data: [...] } response
        else if (Array.isArray(response?.data)) {

          this.seats = [...response.data];

        }

        // Unexpected response
        else {

          console.error(
            'Unexpected seat response:',
            response
          );

          this.seats = [];
        }

        console.log('FINAL SEATS:', this.seats);

        console.log(
          'TOTAL SEATS:',
          this.seats.length
        );

        // Always start from first page
        this.currentPage = 1;
      },

      error: (error) => {

        console.error(
          'SEAT API ERROR:',
          error
        );

        this.seats = [];
      }

    });
  }

  // =========================
  // SEARCH
  // =========================

  get filteredSeats(): any[] {

    const search =
      this.searchText
        .trim()
        .toLowerCase();

    if (!search) {

      return this.seats;
    }

    return this.seats.filter(seat =>

      // Seat number
      seat.seat_number
        ?.toString()
        .toLowerCase()
        .includes(search)

      ||

      // Seat type
      seat.seat_type
        ?.toString()
        .toLowerCase()
        .includes(search)

      ||

      // Coach number
      seat.coach?.coach_number
        ?.toString()
        .toLowerCase()
        .includes(search)

      ||

      // Coach type
      seat.coach?.coach_type
        ?.toString()
        .toLowerCase()
        .includes(search)

      ||

      // Train name
      seat.coach?.train?.trainname
        ?.toString()
        .toLowerCase()
        .includes(search)

      ||

      // Train number
      seat.coach?.train?.trainnumber
        ?.toString()
        .toLowerCase()
        .includes(search)

    );
  }

  // =========================
  // PAGINATION
  // =========================

  get paginatedSeats(): any[] {

    const startIndex =
      (this.currentPage - 1) *
      this.itemsPerPage;

    return this.filteredSeats.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  get totalPages(): number {

    return Math.ceil(
      this.filteredSeats.length /
      this.itemsPerPage
    );
  }

  get pages(): number[] {

    return Array.from(
      {
        length: this.totalPages
      },
      (_, index) => index + 1
    );
  }

  // =========================
  // GO TO PAGE
  // =========================

  goToPage(page: number): void {

    if (
      page < 1 ||
      page > this.totalPages
    ) {

      return;
    }

    this.currentPage = page;
  }

  // =========================
  // PREVIOUS
  // =========================

  previousPage(): void {

    if (this.currentPage > 1) {

      this.currentPage--;
    }
  }

  // =========================
  // NEXT
  // =========================

  nextPage(): void {

    if (
      this.currentPage <
      this.totalPages
    ) {

      this.currentPage++;
    }
  }

  // =========================
  // SEARCH RESET
  // =========================

  onSearch(): void {

    this.currentPage = 1;
  }
}