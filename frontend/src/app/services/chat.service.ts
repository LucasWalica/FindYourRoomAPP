import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private router:Router) {}


  // maybe add logic to reconect if error occurs and add authentication methods and redirections
  private socket!:WebSocket;
  chatUser2:number = {} as number;
  private userId:number = parseInt(localStorage.getItem('userID')??'0');
  private token = localStorage.getItem('token');
  private messages$: Subject<any> = new Subject<any>();
  
  
  connect(chatUser2:number){
    this.chatUser2 = chatUser2;

    const socketUrl = `ws://127.0.0.1:8000/ws/chat/${Math.min(this.chatUser2, this.userId)}/${Math.max(this.chatUser2, this.userId)}/?token=${this.token}`
    this.socket = new WebSocket(socketUrl);

    this.socket.onopen = () => {
      console.log("WebSocket conectado");
    };

    this.socket.onmessage = (event:MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log("mensaje: ", data);
      this.messages$.next(data);
    };

    this.socket.onerror = (error:Event) => {
      console.log("Error en el socket : ", error);
    };

    this.socket.onclose = (event:CloseEvent) => {
      console.warn("Websocket desconectado: ", event);
    }
  }

  sendMessage(sender:number, receiver:number, message:string): void{
    if(this.socket && this.socket.readyState === WebSocket.OPEN){
      const data = {
        sender, 
        receiver,
        message
      };
      this.socket.send(JSON.stringify(data));
    }else{
      console.error("Web socket no abierto");
    }
  }

  disconnect():void{
    if(this.socket){
      this.socket.close();
      console.log("Websocket desconectado");
    }
  }

  getMessages():Observable<any>{
    return this.messages$.asObservable();
  }




}
