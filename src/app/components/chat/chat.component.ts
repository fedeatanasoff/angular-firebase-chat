import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  mensaje = '';

  constructor() {}

  ngOnInit() {}

  enviarMsg() {
    console.log('mensaje =>', this.mensaje);
  }
}
