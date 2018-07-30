import { Component, OnInit } from '@angular/core';

import { ServersService } from './servers.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];

  constructor(private serversService: ServersService) {}

  ngOnInit() {}

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }

  onSaveServers() {
    this.serversService.storeServers(this.servers).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  }

  onGetServers() {
    this.serversService.getServers().subscribe(
      (servers: any[]) => {
        console.log(servers);
        this.servers = servers;
      },
      error => {
        console.error(error);
      }
    );
  }

  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
