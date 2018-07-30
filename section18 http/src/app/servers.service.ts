import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServersService {
  apiUrl = 'https://learn-tech.firebaseio.com/data.json';

  constructor(private http: Http) {}

  storeServers(servers: any[]) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put(this.apiUrl, servers, { headers: headers });
  }

  getServers() {
    return this.http.get(this.apiUrl).pipe(
      map((response: Response) => {
        const data = response.json();
        return data;
      }),
      catchError((error: Response) => {
        console.log(error);
        return throwError(error);
      })
    );
  }
}
