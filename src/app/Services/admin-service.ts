import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;


  // =========================
  // TRAIN API
  // =========================

  postTrain(data: any) {
    return this.http.post(
      `${this.apiUrl}/trains`,
      data
    );
  }


  getTrains() {
    return this.http.get<any[]>(
      `${this.apiUrl}/trains`
    );
  }


  // =========================
  // STATION API
  // =========================

  postStation(data: any) {
    return this.http.post(
      `${this.apiUrl}/stations`,
      data
    );
  }


  getStations() {
    return this.http.get<any[]>(
      `${this.apiUrl}/stations`
    );
  }

}