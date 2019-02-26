import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatService } from "./services/chat.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-angular-firebase';
  chats: Observable<any[]>;

  constructor(db: AngularFirestore, public chatService: ChatService) {
    db.firestore.settings({ timestampsInSnapshots: true });
    this.chats = db.collection('chats').valueChanges();
  }
}
