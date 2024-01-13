import { Injectable } from '@angular/core';
import {io, Socket} from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RtcService {
  private socket: Socket;

  constructor() {
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
  
}