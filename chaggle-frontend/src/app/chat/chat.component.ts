import { Component, OnInit } from '@angular/core';
import { RtcService } from '../rtc.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message: string = '';
  messages: string[] = [];

  constructor(private chatService: RtcService) { }

  ngOnInit() {
    this.chatService.getMessage().subscribe((data) => {
      console.log(`Received message from ${data.user}: ${data.message}`);
      // Update the UI or perform other actions based on the received message
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}