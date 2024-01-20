import { Component } from '@angular/core';
import { RtcService } from '../rtc.service';
import { SocketRoomService } from '../socket-room.service'

@Component({
  selector: 'home-content',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private rtcService: RtcService,
    private socketRoomService: SocketRoomService
  ) {}

  startChat(): void {
    console.log('I am here in line 18 of home component.ts')
    this.rtcService.startChat();
  }
}
