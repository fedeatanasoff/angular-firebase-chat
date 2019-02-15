import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  mensaje = '';
  elemento: any;

  constructor(public chatService: ChatService) {
    this.chatService.cargarChats().subscribe(() => {
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 2000);
    });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviarMsg() {
    console.log('mensaje =>', this.mensaje);

    if (this.mensaje.length === 0) {
      return;
    }

    this.chatService
      .agregarMensaje(this.mensaje)
      .then(data => {
        console.log('mensaje enviado');
        this.mensaje = '';
      })
      .catch(error => {
        console.log('hubo un error =>', error);
      });
  }
}
