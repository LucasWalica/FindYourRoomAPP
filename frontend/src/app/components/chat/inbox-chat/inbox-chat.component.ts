import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { Router } from '@angular/router';
import { ChatService } from '../../../services/chat.service';
@Component({
  selector: 'app-inbox-chat',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent
  ],
  templateUrl: './inbox-chat.component.html',
  styleUrl: './inbox-chat.component.css'
})
export class InboxChatComponent implements OnInit {

  messages:any=[] as any;
  constructor(private router:Router, private chatService:ChatService){}
  async ngOnInit() {
    try {
      this.messages = await this.chatService.getInboxMessages();
      console.log('Mensajes cargados:', this.messages);
    } catch (error) {
      console.error('Error al cargar los mensajes:', error);
    }
  }

  goToChat(sender:number, receiver:number){
    let otherUserID;
    let ownUserID = parseInt(localStorage.getItem('userID')??'0');
    if(sender===0){
      // need to add logout function
      this.router.navigate(['login'])
    }if(sender===ownUserID){
      otherUserID=receiver;
    }else{
      otherUserID = sender;
    }
    console.log("other User:",otherUserID);
    console.log("me:",ownUserID);
    this.chatService.chatUser2=otherUserID;
    this.router.navigate(['chat'])
  }

  getOtherUsername(message:any){
    let ownUserID = parseInt(localStorage.getItem('userID')??'0');
    let provisionalUsername;
    if(message.receiver===ownUserID){
      provisionalUsername = message.sender_username;
    }else{
      provisionalUsername = message.receiver_username;
    }
    return provisionalUsername;
  }
}