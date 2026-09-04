import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../Services/admin-service';

@Component({
  selector: 'app-admin-route-list',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-route-list.html',
  styleUrl: './admin-route-list.css',
})
export class AdminRouteList implements OnInit {

  Math = Math;

  routes: any[] = [];

  searchText = '';

  currentPage = 1;
  itemsPerPage = 8;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadRoutes();
  }

  // =========================
  // LOAD ROUTES
  // =========================

  loadRoutes(): void {

    console.log('Calling Route API...');

    this.adminService.getRoutes().subscribe({

      next: (response: any) => {

        console.log('ROUTE RESPONSE:', response);

        if (Array.isArray(response)) {

          this.routes = response;

        } else if (Array.isArray(response?.data)) {

          this.routes = response.data;

        } else {

          console.error('Unexpected route response:', response);

          this.routes = [];
        }

        console.log('FINAL ROUTES:', this.routes);
        console.log('TOTAL ROUTES:', this.routes.length);

        this.currentPage = 1;
      },

      error: (error) => {

        console.error('ROUTE API ERROR:', error);

        this.routes = [];
      }

    });
  }

  // =========================
  // SEARCH
  // =========================

  get filteredRoutes(): any[] {

    const search = this.searchText.trim().toLowerCase();

    if (!search) {
      return this.routes;
    }

    return this.routes.filter(route =>

      route.train?.trainname
        ?.toString()
        .toLowerCase()
        .includes(search)

      ||

      route.train?.trainnumber
        ?.toString()
        .toLowerCase()
        .includes(search)

      ||

      route.station?.station_name
        ?.toString()
        .toLowerCase()
        .includes(search)

      ||

      route.station?.station_code
        ?.toString()
        .toLowerCase()
        .includes(search)

      ||

      route.station_order
        ?.toString()
        .includes(search)

    );
  }

  // =========================
  // PAGINATION
  // =========================

  get paginatedRoutes(): any[] {

    const startIndex =
      (this.currentPage - 1) * this.itemsPerPage;

    return this.filteredRoutes.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  get totalPages(): number {

    return Math.ceil(
      this.filteredRoutes.length / this.itemsPerPage
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