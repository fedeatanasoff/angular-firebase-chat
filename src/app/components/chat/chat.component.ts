import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  mensaje = '';

  constructor(private chatService: ChatService) {
    this.chatService.cargarChats().subscribe((chats: any) => {
      console.log('consumiendo msg =>', chats);
    });
  }

  ngOnInit() {}

  enviarMsg() {
    console.log('mensaje =>', this.mensaje);
  }
}
