import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<any>;
  chats: any[] = [];

  constructor(private afs: AngularFirestore) {}

  cargarChats() {
    this.itemsCollection = this.afs.collection<any>('chats');

    return this.itemsCollection.valueChanges();
  }
}
