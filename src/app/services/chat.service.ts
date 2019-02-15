import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mensaje } from '../interfaces/mensaje';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  chats: Mensaje[] = [];

  constructor(private afs: AngularFirestore) {}

  cargarChats() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref =>
      ref.orderBy('fecha', 'desc').limit(5)
    );

    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: Mensaje[]) => {
        console.log('mensaje desde servicio', mensajes);
        this.chats = [];

        for (const mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }

        // return this.chats;
      })
    );
  }

  agregarMensaje(texto: string) {
    // TODO falta el UID
    const mensaje: Mensaje = {
      nombre: 'Test1',
      msg: texto,
      fecha: new Date().getTime()
    };

    return this.itemsCollection.add(mensaje);
  }
}
