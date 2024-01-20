import { Component, OnInit } from '@angular/core';
import { RtcService } from './rtc.service';
import { SocketRoomService } from './socket-room.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  userInChat = false;

  constructor(
    private rtcService: RtcService,
    private socketRoomService: SocketRoomService) {}

  endChat(): void {
    this.rtcService.endChat();
  }

  ngOnInit(): void {
      this.userInChat = this.socketRoomService.isUserInChat();
  }
}
