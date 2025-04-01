import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ChatService } from '../../../services/chat.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent{

 
  constructor(
    private router:Router, 
    private auth:AuthService,
    private chatService:ChatService
  ){}

  

  goToProfile(){
    this.router.navigate(['profile'])
  }
  goToHousing(){
    this.router.navigate(['houses'])
  }
  goToPostHouse(){
    this.router.navigate(['addHouse'])
  }
  goToOwnerHouseList(){
    this.router.navigate(['ownerHouses'])
  }
  goToChat(){
    this.router.navigate(['chats'])
  }
  goToFriends(){
    this.router.navigate(['friendList'])
  }
  
  home(){
    this.router.navigate(['home'])
  }
  logout(){
    this.auth.logout();
  }


}