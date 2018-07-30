import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

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
    return this.http.get(this.apiUrl);
  }
}
