import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Mensaje } from "../interfaces/mensaje";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  chats: Mensaje[] = [];
  usuario: any = {};

  constructor(
    private afs: AngularFirestore,
    private authService: AngularFireAuth
  ) {
    this.authService.authState.subscribe(user => {
      console.log("estado del usuario =>", user);

      if (!user) {
        return;
      }

      this.usuario = {
        nombre: user.displayName,
        uid: user.uid,
        email: user.email,
        foto: user.photoURL
      };

      console.log("usuario logeado =>", this.usuario);
    });
  }

  login(proveedor: string) {
    this.authService.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.usuario = {};
    this.authService.auth.signOut();
  }

  cargarChats() {
    this.itemsCollection = this.afs.collection<Mensaje>("chats", ref =>
      ref.orderBy("fecha", "desc").limit(25)
    );

    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: Mensaje[]) => {
        console.log("mensaje desde servicio", mensajes);
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
      nombre: this.usuario.nombre,
      msg: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };

    return this.itemsCollection.add(mensaje);
  }
}
