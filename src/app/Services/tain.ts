import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Tain {

    private apiUrl = `${environment.apiUrl}/trains`;
    private http = inject(HttpClient);

    postTrain(data:any){
        return this.http.post(this.apiUrl,data);
    }

    getTrains(){
        return this.http.get<any[]>(this.apiUrl);
    }
}
