import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../reusable/footer/footer.component";
import { NavBarComponent } from "../../reusable/nav-bar/nav-bar.component";
import { HouseService } from '../../../services/house.service';
import { house } from '../../models/house.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owner-house-list',
  standalone: true,
  imports: [FooterComponent, NavBarComponent, CommonModule],
  templateUrl: './owner-house-list.component.html',
  styleUrl: './owner-house-list.component.css'
})
export class OwnerHouseListComponent implements OnInit{

  houses:house[] = {} as house[];

  constructor(private houseService:HouseService){}
    
  async ngOnInit() {
    try {
      // Obtener la lista de casas
      this.houses = await this.houseService.getOwnerHouseList();
        // Convertir las imágenes de File en URLs para mostrarlas
      this.houses.forEach((house) => {
        if (house.image instanceof File) {
          house.image = URL.createObjectURL(house.image); // Crear una URL a partir del File
        }
        house.rooms_data.forEach((room) => {
          if (room.image instanceof File) {
            room.image = URL.createObjectURL(room.image); // Crear una URL a partir del File
          }
        });
      });
  
        console.log('Casas obtenidas:', this.houses);
      } catch (error) {
        console.error('Error al cargar las casas:', error);
      }
    }
  }

