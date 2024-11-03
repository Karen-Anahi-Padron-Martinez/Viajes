import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";  // Asegúrate de importar Subject
import { Paquete } from '../interfaces/paquete.interface'; // Asegúrate de importar Paquete

@Injectable({
  providedIn: "root"
})
export class MessageService {
  private message = new Subject<Paquete>(); // El Subject está tipado como Paquete

  constructor() {}

  // Método para enviar el paquete
  sendMessage(paquete: Paquete): void {
    this.message.next(paquete);
  }

  // Método para recibir el paquete como observable
  getMessage(): Observable<Paquete> {
    return this.message.asObservable();
  }
}
