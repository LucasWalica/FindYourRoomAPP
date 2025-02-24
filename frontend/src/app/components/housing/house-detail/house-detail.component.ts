import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { Router } from '@angular/router';
import { HouseService } from '../../../services/house.service';
import { house } from '../../models/house.models';
import { HouseMapComponentComponent } from "../house-map-component/house-map-component.component";
import { ChatService } from '../../../services/chat.service';
import { AuthService } from '../../../services/auth.service';
import { HousingRequestsService } from '../../../services/housing-requests.service';

@Component({
  selector: 'app-house-detail',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent,
    HouseMapComponentComponent
],
  templateUrl: './house-detail.component.html',
  styleUrl: './house-detail.component.css'
})
export class HouseDetailComponent implements OnInit{

  userID: number = parseInt(localStorage.getItem('userID')??'0');
  house:house = {} as house;
  constructor(private router:Router, private houseService:HouseService, 
    private chatService:ChatService,
    private authService:AuthService, private housingRequest:HousingRequestsService){}

  async ngOnInit(){
    this.house = this.houseService.houseDetail;
    if(!this.isHouse(this.house)){
      this.router.navigate(['houses']);
    }
    if(this.userID===0){
      this.authService.logout();
    }
  }
  
  goToChatWithOwner(ownerID:number){
    this.chatService.chatUser2=ownerID;
    console.log(ownerID);
    this.router.navigate(['chat'])
  }

  // creates a request that appears to the admin 
  requestRoomRenting(fkRoom:number){
    let fkTenant = parseInt(localStorage.getItem('inquilino_id')??'0');
    if(fkTenant===0){
      this.authService.logout();
      this.router.navigate(['login'])
    }
    let formData = JSON.stringify({
      fkRoom,
      fkTenant
    })
    this.housingRequest.postRoomRequest(formData);
  }
  // creates a request that appears to the admin 
  requestHouseRenting(fkHouse:number){
    let fkTenant = parseInt(localStorage.getItem('inquilino_id')??'0');
    if(fkTenant===0){
      this.authService.logout();
      this.router.navigate(['login'])
    }
    let formData = JSON.stringify({
      fkHouse,
      fkTenant
    })
    this.housingRequest.postHouseRequest(formData);
  }

  private isHouse(obj: any): obj is house {
    return obj && typeof obj.name === 'string' && typeof obj.price === 'number';
  }


}