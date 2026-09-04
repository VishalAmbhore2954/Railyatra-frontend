import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../Services/admin-service';

@Component({
  selector: 'app-admin-coach-list',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-coach-list.html',
  styleUrl: './admin-coach-list.css',
})
export class AdminCoachList implements OnInit {

  Math = Math;

  coaches: any[] = [];

  searchText = '';

  currentPage = 1;
  itemsPerPage = 8;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadCoaches();
  }

  // =========================
  // LOAD COACHES
  // =========================

  loadCoaches(): void {

    console.log('Calling Coach API...');

    this.adminService.getCoaches().subscribe({

      next: (response: any) => {

        console.log('COACH RESPONSE:', response);

        if (Array.isArray(response)) {

          this.coaches = response;

        } else if (Array.isArray(response?.data)) {

          this.coaches = response.data;

        } else {

          console.error('Unexpected coach response:', response);

          this.coaches = [];
        }

        console.log('FINAL COACHES:', this.coaches);
        console.log('TOTAL COACHES:', this.coaches.length);

        this.currentPage = 1;
      },

      error: (error) => {

        console.error('COACH API ERROR:', error);

        this.coaches = [];
      }

    });
  }

  // =========================
  // SEARCH
  // =========================

  get filteredCoaches(): any[] {

    const search = this.searchText.trim().toLowerCase();

    if (!search) {
      return this.coaches;
    }

    return this.coaches.filter(coach =>

      coach.coach_number
        ?.toString()
        .toLowerCase()
        .includes(search)

      ||

      coach.coach_type
        ?.toString()
        .toLowerCase()
        .includes(search)

      ||

      coach.train?.trainname
        ?.toString()
        .toLowerCase()
        .includes(search)

      ||

      coach.train?.trainnumber
        ?.toString()
        .toLowerCase()
        .includes(search)

    );
  }

  // =========================
  // PAGINATION
  // =========================

  get paginatedCoaches(): any[] {

    const startIndex =
      (this.currentPage - 1) * this.itemsPerPage;

    return this.filteredCoaches.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  get totalPages(): number {

    return Math.ceil(
      this.filteredCoaches.length / this.itemsPerPage
    );
  }

  get pages(): number[] {

    return Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
    );
  }

  // =========================
  // PAGE
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
  // SEARCH
  // =========================

  onSearch(): void {

    this.currentPage = 1;

  }

}