import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ServersService {
  apiUrl = 'https://learn-tech.firebaseio.com/data.json';

  constructor(private http: Http) {}

  storeServers(servers: any[]) {
    return this.http.post(this.apiUrl + '', servers);
  }
}
