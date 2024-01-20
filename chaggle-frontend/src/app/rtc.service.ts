import { Injectable } from '@angular/core';
import {io, Socket} from 'socket.io-client';
import { Observable, fromEvent, timer, interval, Subject } from 'rxjs';
import { SocketRoomService } from './socket-room.service'
import { takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RtcService {
  private socket: Socket;
  private retryInterval = 1000; // 1 seconds
  private retryTimeout = 30000; // 30 seconds
  private matchAvailable$ = new Subject<void>();

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

    this.listenForNoAvailableUserEvent().subscribe(() => {
      console.log('Retrying to establish a connection.');
      this.retryUntilMatchAvailable();
    });

    this.socket.on('start-chat', () => {
      console.log('Recieved start-chat event from the server');
      this.socketRoomService.setUserInChat();
      this.stopRetry();
    });
  }

  public endChat(): void {
    this.socket.emit('end-chat');
    console.log('Chat has been ended');
  }

  private listenForNoAvailableUserEvent() {
    return fromEvent<any>(this.socket as any, 'waiting-for-match');
  }

  private retryUntilMatchAvailable() {
    const retry$ = interval(this.retryInterval).pipe(
      takeUntil(timer(this.retryTimeout))
    );
  
    const subscription = retry$.subscribe(() => {
      this.socket.emit('start-chat');
    });
  
    // Subscribe to the matchAvailable$ observable
    this.matchAvailable$.subscribe(() => {
      // If a match is available, stop the retry
      subscription.unsubscribe();
    });
  }

  private stopRetry() {
    // Emit an event to signal that a match is available.
    this.matchAvailable$.next();
  }
}