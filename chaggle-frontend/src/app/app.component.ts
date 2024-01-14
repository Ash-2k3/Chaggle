import { Component, OnInit } from '@angular/core';
import { RtcService } from './rtc.service';
import { SocketRoomService } from './socket-room.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(
    private rtcService: RtcService,
    private socketRoomService: SocketRoomService) {}

  startChat(): void {
    this.rtcService.startChat();
  }

  endChat(): void {
    this.rtcService.endChat();
  }
}
