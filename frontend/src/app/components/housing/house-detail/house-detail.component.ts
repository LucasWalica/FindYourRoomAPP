import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { Router } from '@angular/router';
import { HouseService } from '../../../services/house.service';
import { house } from '../../models/house.models';
import { HouseMapComponentComponent } from "../house-map-component/house-map-component.component";
import { ChatService } from '../../../services/chat.service';

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

  house:house = {} as house;
  constructor(private router:Router, private houseService:HouseService, private chatService:ChatService){}

  ngOnInit(): void {
    this.house = this.houseService.houseDetail;
    if(!this.isHouse(this.house)){
      this.router.navigate(['houses']);
    }
  }
  
  goToChatWithOwner(ownerID:number){
    this.chatService.chatUser2=ownerID;
    console.log(ownerID);
    this.router.navigate(['chat'])
  }


  private isHouse(obj: any): obj is house {
    return obj && typeof obj.name === 'string' && typeof obj.price === 'number';
  }


}