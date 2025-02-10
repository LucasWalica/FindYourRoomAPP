import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { SocialService } from '../../../services/social.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friend-list',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent
  ],
  templateUrl: './friend-list.component.html',
  styleUrl: './friend-list.component.css'
})
export class FriendListComponent implements OnInit{

  constructor(private socialService:SocialService, private router:Router){}

  friendRequests:any[]= [] as any[];
  friends:any[]= [] as any[];
  
  async ngOnInit(): Promise<void> {
    this.friends =  await this.socialService.getFriendList();
    this.friendRequests = await this.socialService.getFriendRequestList();
  }
}
