import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { RtcService } from './rtc.service'

@Injectable({
  providedIn: 'root'
})

export class SocketRoomService {
  private inChat: boolean = false;

  constructor() { }

  setUserInChat(): void {
    this.inChat = true;
  }

  setUserNotInChat(): void {
    this.inChat = false;
  }

  isUserInChat(): boolean {
    return this.inChat;
  }
}
