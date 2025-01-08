import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { Router } from '@angular/router';
import { HouseService } from '../../../services/house.service';
import { house } from '../../models/house.models';

@Component({
  selector: 'app-house-list',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent
  ],
  templateUrl: './house-list.component.html',
  styleUrl: './house-list.component.css'
})
export class HouseListComponent implements OnInit{


  houses:house[] = [];
  constructor(private router:Router, private houseService:HouseService){}
  async ngOnInit() {
    try {
      this.houses = await this.houseService.getHouseList();
      this.houses.forEach((house) => {
        if (house.image instanceof File) {
          house.image = URL.createObjectURL(house.image); 
        }
        house.rooms_data.forEach((room) => {
          if (room.image instanceof File) {
            room.image = URL.createObjectURL(room.image); 
          }
        });
      });
  
        console.log('Casas obtenidas:', this.houses);
      } catch (error) {
        console.error('Error al cargar las casas:', error);
      }
    }

}
