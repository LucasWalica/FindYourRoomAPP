import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { Router } from '@angular/router';
import { HouseService } from '../../../services/house.service';
import { house } from '../../models/house.models';

@Component({
  selector: 'app-house-detail',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent
  ],
  templateUrl: './house-detail.component.html',
  styleUrl: './house-detail.component.css'
})
export class HouseDetailComponent implements OnInit{

  house:house = {} as house;
  constructor(private router:Router, private houseService:HouseService){}

  ngOnInit(): void {
    this.house = this.houseService.houseDetail;
  }
}
