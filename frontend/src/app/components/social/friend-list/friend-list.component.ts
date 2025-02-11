import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { SocialService } from '../../../services/social.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { matches } from '../../models/tenantProfile.models';
import { OtherTenantProfileComponent } from '../../reusable/other-tenant-profile/other-tenant-profile.component';
import { friendRequest } from '../../models/tenantProfile.models';
import { friends } from '../../models/tenantProfile.models';
import { request } from 'http';
import { ChatService } from '../../../services/chat.service';
@Component({
  selector: 'app-friend-list',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent,
    OtherTenantProfileComponent
  ],
  templateUrl: './friend-list.component.html',
  styleUrl: './friend-list.component.css'
})
export class FriendListComponent implements OnInit{

  constructor(
    private socialService:SocialService, 
    private router:Router, 
    private authService:AuthService, 
    private chatService:ChatService
  ){}

  friendRequestsRAW:any[]= [] as any[];
  friends:any[]= [] as any[];
  matches:any[]= [] as any[];

  async ngOnInit(): Promise<void> {
    this.friends =  await this.socialService.getFriendList();
    this.friendRequestsRAW = await this.socialService.getFriendRequestList();
    this.matches = await this.socialService.getMatchList();
    console.log(this.matches);
    this.matches = this.cleanMatches();
    this.friends = this.cleanFriends();
    console.log("friendsRAW: ", this.friends);
  }

  async acceptMatch(matchID:number){
    await this.socialService.updateMatch(matchID, true);
    window.location.reload();
  }
  async rejectMatch(matchID:number){
    await this.socialService.updateMatch(matchID, false);
    window.location.reload();
  }
  async acceptFriendRequest(requestID:number){
    await this.socialService.updateFriendRequest(requestID, true);
    window.location.reload();
  }
  async rejectFriendRequest(requestID:number){
    await this.socialService.updateFriendRequest(requestID, false);
    window.location.reload();
  }

  async deleteFriend(friendShiptID:number){
    await this.socialService.deleteFriend(friendShiptID);
    window.location.reload();
  }


  goToChat(friendID:number){
    this.chatService.chatUser2 = friendID;
    this.router.navigate(['chat']);
  }


  // transforma los datos en tipo friendRequest
  cleanFriendRequests(){
    let provFriendRequests: friendRequest[] = [];
    for(let i=0; i<this.friendRequestsRAW.length; i++){
      let provRequest:friendRequest = {
          id:this.friendRequestsRAW[i].id,
          receiver:this.friendRequestsRAW[i].sender,
          accepted:false
      }
      provFriendRequests.push(provRequest);
    }
    return provFriendRequests;
  }

  // transforma los datos en tipo matches 
  cleanMatches(){
    let provMatches:matches[] = [];
    for(let i=0; i<this.matches.length; i++){
      let matchObj: matches = {
        id: this.matches[i].id,
        fkTenant: this.matches[i].fkTenant1 ? this.matches[i].fkTenant1 : this.matches[i].fkTenant2,
        accepted: this.matches[i].accepted,
        score: this.matches[i].score
      };
      provMatches.push(matchObj);
    }
    return provMatches;
  }

  cleanFriends() {
    let provFriends: friends[] = [];
    
    for (let i = 0; i < this.friends.length; i++) {
      let friendObj: friends = {
        id: this.friends[i].id,
        friend: this.friends[i].fkTenant1.id !== parseInt(localStorage.getItem('userID') ?? '0') 
                ? this.friends[i].fkTenant2 
                : this.friends[i].fkTenant1
      }
      provFriends.push(friendObj);
    }
    return provFriends;
  }

}