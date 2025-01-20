import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { Router } from '@angular/router';
import { ChatService } from '../../../services/chat.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-user-chat',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent,
    FormsModule
  ],
  templateUrl: './user-user-chat.component.html',
  styleUrl: './user-user-chat.component.css'
})
export class UserUserChatComponent implements OnInit{

  chatUser2:number = {} as number;
  constructor(private router:Router, private chatService:ChatService){}

  ngOnInit(): void {
    this.chatUser2=this.chatService.chatUser2;
    this.chatService.connect(this.chatUser2);
  }
}
