import { Component, OnInit } from '@angular/core';
// import { Socket } from 'socket.io-client';
import { RtcService } from './rtc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'chaggle-frontend';

  constructor(private rtcService: RtcService) {}

  startChat(): void {
    this.rtcService.startChat();
  }

  endChat(): void {
    this.rtcService.endChat();
  }
}
