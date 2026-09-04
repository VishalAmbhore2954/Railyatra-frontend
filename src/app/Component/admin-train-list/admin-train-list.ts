import {
  ChangeDetectorRef,
  Component
} from '@angular/core';

import { Tain } from '../../Services/tain';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-train-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './admin-train-list.html',
  styleUrl: './admin-train-list.css'
})
export class AdminTrainList {

  trains: any[] = [];

  searchText: string = '';

  currentPage: number = 1;

  itemsPerPage: number = 5;

  showEditModal: boolean = false;

  selectedTrain: any = {
    id: 0,
    trainnumber: '',
    trainname: '',
    traintype: ''
  };


  constructor(
    private trainService: Tain,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    console.log('AdminTrainList initialized');

    this.getAllTrains();

  }


  // =========================
  // GET TRAINS
  // =========================

  getAllTrains(): void {

    console.log('getAllTrains() called');

    this.trainService.getTrains().subscribe({

      next: (response: any[]) => {

        console.log('API RESPONSE:', response);

        console.log(
          'API LENGTH:',
          response.length
        );

        this.trains = response;

        console.log(
          'COMPONENT TRAINS LENGTH:',
          this.trains.length
        );

        this.currentPage = 1;

        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error(
          'Error loading trains:',
          error
        );

      }

    });

  }


  // =========================
  // SEARCH
  // =========================

  getFilteredTrains(): any[] {

    const search =
      this.searchText
        .trim()
        .toLowerCase();

    if (search === '') {

      return this.trains;

    }

    return this.trains.filter(
      (train: any) => {

        const trainNumber =
          String(
            train.trainnumber ?? ''
          ).toLowerCase();

        const trainName =
          String(
            train.trainname ?? ''
          ).toLowerCase();

        const trainType =
          String(
            train.traintype ?? ''
          ).toLowerCase();

        return (
          trainNumber.includes(search) ||
          trainName.includes(search) ||
          trainType.includes(search)
        );

      }
    );

  }


  // =========================
  // PAGINATION
  // =========================

  getPaginatedTrains(): any[] {

    const filtered =
      this.getFilteredTrains();

    const start =
      (this.currentPage - 1)
      * this.itemsPerPage;

    const end =
      start + this.itemsPerPage;

    return filtered.slice(
      start,
      end
    );

  }


  getTotalPages(): number {

    return Math.ceil(
      this.getFilteredTrains().length
      / this.itemsPerPage
    );

  }


  getPages(): number[] {

    return Array.from(
      {
        length: this.getTotalPages()
      },
      (_, i) => i + 1
    );

  }


  changePage(page: number): void {

    const totalPages =
      this.getTotalPages();

    if (
      page >= 1 &&
      page <= totalPages
    ) {

      this.currentPage = page;

    }

  }


  onSearch(): void {

    this.currentPage = 1;

  }


  getStartItem(): number {

    const total =
      this.getFilteredTrains().length;

    if (total === 0) {

      return 0;

    }

    return (
      (this.currentPage - 1)
      * this.itemsPerPage
    ) + 1;

  }


  getEndItem(): number {

    const total =
      this.getFilteredTrains().length;

    return Math.min(
      this.currentPage * this.itemsPerPage,
      total
    );

  }


  // =========================
  // ROUTE
  // =========================

  showRoute(train: any): void {

    console.log(
      'Selected train:',
      train
    );

    this.router.navigate([
      '/admin/show-route'
    ]);

  }


  // =========================
  // EDIT
  // =========================

  editTrain(train: any): void {

    this.selectedTrain = {
      ...train
    };

    this.showEditModal = true;

  }


  closeEditModal(): void {

    this.showEditModal = false;

  }

}