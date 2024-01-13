import { Component, OnInit } from '@angular/core';
import { Socket } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'chaggle-frontend';

  constructor(private socket: Socket) {}

  ngOnInit(): void {

  }

  startChat(): void {
    this.socket.emit('start-chat');
  }

  endChat(): void {
    this.socket.emit('end-chat');
  }
}
