import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  //отключил
  private apiUrl = 'http://localhost:8080/api/schedule';

  constructor(private http: HttpClient) {}

  getToken() {
    return localStorage.getItem('token');
  }

  getScheduleByClass(className: string) {
    return this.http.get(this.apiUrl + '/' + className, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getToken()
      })
    });
  }

  createSchedule(entries: any[]) {
    return this.http.post(this.apiUrl, entries, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getToken()
      })
    });
  }
}
