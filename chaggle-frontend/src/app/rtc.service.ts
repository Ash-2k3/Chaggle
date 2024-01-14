import { Injectable } from '@angular/core';
import {io, Socket} from 'socket.io-client';
import { Observable, fromEvent } from 'rxjs';
import { SocketRoomService } from './socket-room.service'

@Injectable({
  providedIn: 'root'
})
export class RtcService {
  private socket: Socket;

  constructor(
    private socketRoomService: SocketRoomService
  ) {
    this.socket = io('http://localhost:4000');
  }

  public sendMessage(message: String): void {
    this.socket.emit('new-message', message);
  }

  public getMessage(): Observable<{ user: string; message: string }> {
    return new Observable((observer) => {
      this.socket.on('new-message', (data: { user: string; message: string }) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  public startChat(): void {
    this.socket.emit('start-chat');
    this.socketRoomService.setUserInChat();

    this.listenForNoAvailableUserEvent().subscribe(() => {
      console.log('No users are available to chat right now');
      this.socketRoomService.setUserNotInChat();
    });
    console.log('Chat has been started');
  }

  public endChat(): void {
    this.socket.emit('end-chat');
    console.log('Chat has been ended');
  }

  private listenForNoAvailableUserEvent() {
    console.log('Yo I am here')
    return fromEvent<any>(this.socket as any, 'no-available-users');
  }
  
}