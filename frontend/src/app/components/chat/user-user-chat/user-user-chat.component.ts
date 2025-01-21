import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { Router } from '@angular/router';
import { ChatService } from '../../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-user-chat',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent,
    FormsModule, 
    CommonModule
  ],
  templateUrl: './user-user-chat.component.html',
  styleUrl: './user-user-chat.component.css'
})
export class UserUserChatComponent implements OnInit{

  messages: any[] = [];
  chatUser2:number = {} as number;
  newMessage:string = '';
  userId = parseInt(localStorage.getItem('userID')??'0');
  constructor(private router:Router, private chatService:ChatService){}

  ngOnInit(): void {
    this.chatUser2=this.chatService.chatUser2;
//    if(this.userId===0){
//      this.router.navigate([''])
//    }
    this.chatService.connect(this.chatUser2);
    this.chatService.getMessagesFromDB(this.chatUser2).then((messages) => {
      this.messages = messages;  // Asignar los mensajes obtenidos
    }).catch((error) => {
      console.error('Error al cargar los mensajes:', error);
    });
    this.chatService.getMessages().subscribe((message) => {
      this.messages.push(message);
    })
  }

  sendMessage():void{
    if(this.newMessage.trim()){
      this.chatService.sendMessage(this.userId, this.chatUser2, this.newMessage.trim());
      this.messages.push({sender:this.userId, message:this.newMessage.trim()})
      this.newMessage= '';
    }
  }

  ngOnDestroy():void{
    this.chatService.disconnect();
  }
}
