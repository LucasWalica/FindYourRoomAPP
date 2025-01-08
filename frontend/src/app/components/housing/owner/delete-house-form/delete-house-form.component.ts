import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../reusable/footer/footer.component';
import { CommonModule } from '@angular/common';
import { house } from '../../../models/house.models';
import { Router } from '@angular/router';
import { HouseService } from '../../../../services/house.service';

@Component({
  selector: 'app-delete-house-form',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './delete-house-form.component.html',
  styleUrl: './delete-house-form.component.css'
})
export class DeleteHouseFormComponent implements OnInit{

  house:house= {} as house;

  constructor(private router:Router, private houseService:HouseService){}

  ngOnInit(): void {
    this.house = this.houseService.houseDetail;
    if(typeof this.house.id !== 'number'){
      this.router.navigate(['ownerHouses'])
    }
  }

  deleteHouse(id:number){
    console.log("aqui")
    this.houseService.deleteHouse(id);
    this.router.navigate(['ownerHouses'])
  }
}

