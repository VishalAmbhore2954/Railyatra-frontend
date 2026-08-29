import { Component } from '@angular/core';
import { Tain } from '../Services/tain';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-train-list',
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-train-list.html',
  styleUrl: './admin-train-list.css',
})
export class AdminTrainList {
  trains: any[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 5;

  // Edit
  showEditModal = false;

  selectedTrain: any = {
    id: 0,
    trainnumber: '',
    trainname: '',
    traintype: ''
  };


  constructor(
    private trainService: Tain
  ) {}


  ngOnInit(): void {

    this.getAllTrains();

  }


  // Get all trains

  getAllTrains() {

    this.trainService.getTrains().subscribe({

      next: (response) => {

        this.trains = response;

        console.log('Trains:', this.trains);

      },

      error: (error) => {

        console.log('Error:', error);

      }

    });

  }


  // Pagination

  get paginatedTrains() {

    const startIndex =
      (this.currentPage - 1) * this.itemsPerPage;

    const endIndex =
      startIndex + this.itemsPerPage;

    return this.trains.slice(startIndex, endIndex);

  }


  get totalPages() {

    return Math.ceil(
      this.trains.length / this.itemsPerPage
    );

  }


  get pages() {

    return Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );

  }


  changePage(page: number) {

    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;

  }


  // Open Edit Modal

  editTrain(train: any) {

    this.selectedTrain = {
      ...train
    };

    this.showEditModal = true;

  }


  // Close Edit Modal

  closeEditModal() {

    this.showEditModal = false;

  }


  // Reset pagination when data changes

  resetPagination() {

    this.currentPage = 1;

  }
}
