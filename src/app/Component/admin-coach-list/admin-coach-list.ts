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

  loadCoaches(): void {
    this.adminService.getCoaches().subscribe({
      next: (response: any[]) => {
        this.coaches = response;
        this.currentPage = 1;
      },
      error: (error) => {
        console.error('Error loading coaches:', error);
      }
    });
  }

  get filteredCoaches(): any[] {

    if (!this.searchText.trim()) {
      return this.coaches;
    }

    const search = this.searchText.toLowerCase();

    return this.coaches.filter(coach =>
      coach.coach_number?.toString().toLowerCase().includes(search) ||
      coach.coach_type?.toLowerCase().includes(search) ||
      coach.train?.trainname?.toLowerCase().includes(search) ||
      coach.train?.trainnumber?.toString().toLowerCase().includes(search)
    );
  }

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