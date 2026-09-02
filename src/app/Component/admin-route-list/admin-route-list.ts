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

  loadRoutes(): void {

    this.adminService.getRoutes().subscribe({

      next: (response: any) => {

        if (Array.isArray(response)) {

          this.routes = [...response].reverse();

        } else if (Array.isArray(response?.data)) {

          this.routes = [...response.data].reverse();

        } else {

          this.routes = [];
        }

        this.currentPage = 1;
      },

      error: (error) => {
        console.error('Error loading routes:', error);
      }
    });
  }

  get filteredRoutes(): any[] {

    if (!this.searchText.trim()) {
      return this.routes;
    }

    const search = this.searchText.toLowerCase();

    return this.routes.filter(route =>
      route.train?.trainname?.toLowerCase().includes(search) ||
      route.train?.trainnumber?.toString().toLowerCase().includes(search) ||
      route.station?.station_name?.toLowerCase().includes(search) ||
      route.station?.station_code?.toLowerCase().includes(search) ||
      route.station_order?.toString().includes(search)
    );
  }

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