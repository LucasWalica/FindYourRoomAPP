import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { Router } from '@angular/router';
import { ChatService } from '../../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, AfterViewChecked } from '@angular/core';

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
export class UserUserChatComponent implements OnInit, AfterViewChecked{
  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;
  messages: any[] = [];
  chatUser2:number = {} as number;
  newMessage:string = '';
  userId = parseInt(localStorage.getItem('userID')??'0');
  constructor(private router:Router, private chatService:ChatService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.chatUser2=this.chatService.chatUser2;
    if(this.userId===0 || this.userId === 0 || 
      typeof this.userId !== 'number' || typeof this.chatUser2 !== 'number' 
    ){
        this.router.navigate(['chats'])
    }
    this.chatService.connect(this.chatUser2);
    this.chatService.getMessagesFromDB(this.chatUser2).then((messages) => {
      this.messages = messages;  // Asignar los mensajes obtenidos
    }).catch((error) => {
      console.error('Error al cargar los mensajes:', error);
    });
    this.chatService.getMessages().subscribe((message) => {
      this.messages.push(message);
    });
   
  }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  
  scrollToBottom(): void {
    if (this.scrollAnchor) {
      setTimeout(() => {
        this.scrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }

  sendMessage():void{
    if(this.newMessage.trim()){
      this.chatService.sendMessage(this.userId, this.chatUser2, this.newMessage.trim());
      this.newMessage= '';
    }
    this.scrollToBottom();
  }
  ngOnDestroy():void{
    this.chatService.disconnect();
  }
}