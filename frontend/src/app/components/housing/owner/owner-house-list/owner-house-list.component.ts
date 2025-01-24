import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../../reusable/footer/footer.component";
import { NavBarComponent } from "../../../reusable/nav-bar/nav-bar.component";
import { HouseService } from '../../../../services/house.service';
import { house, rooms } from '../../../models/house.models';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HousingRequestsService } from '../../../../services/housing-requests.service';
import { UserService } from '../../../../services/user.service';
import { TenantProfile } from '../../../models/tenantProfile.models';
import { OtherTenantProfileComponent } from "../other-tenant-profile/other-tenant-profile.component";

@Component({
  selector: 'app-owner-house-list',
  standalone: true,
  imports: [FooterComponent, NavBarComponent, CommonModule, OtherTenantProfileComponent],
  templateUrl: './owner-house-list.component.html',
  styleUrl: './owner-house-list.component.css'
})
export class OwnerHouseListComponent implements OnInit{

  tenantProfilesRequesting:TenantProfile[] = {} as TenantProfile[];
  houses:house[] = {} as house[];
  showHouseRequests:boolean = false;
  showRoomRequests:boolean = false;

  constructor(private houseService:HouseService, private router:Router, 
    private housingRequestService:HousingRequestsService,
    private tenantService:UserService){}
    
  async ngOnInit() {
    this.chargeHousedata();  
  }

  async chargeHousedata(){
    try {
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
    goToUpdateRoom(room:rooms){
      this.houseService.setRoomData(room);
      this.router.navigate(['updateRoom'])
    }
    goToDetailView(house:house){
      this.houseService.setHouseData(house);
      this.router.navigate(['houseDetail'])
    }
    goToUpdateHouse(house:house){
      this.houseService.setHouseData(house);
      this.router.navigate(['updateHouse'])
    }

    goToDeleteHouse(house:house){
      this.houseService.setHouseData(house);
      this.router.navigate(['deleteHouse'])
    }





    // horriblemente ineficiente
    async showRoomRequestsfunc(roomID:number){
      this.tenantProfilesRequesting = [] as TenantProfile[];
      let fkData:any[] = await this.housingRequestService.getRoomRequestList(roomID);
      for(let i=0; i<fkData.length; i++){
        this.tenantProfilesRequesting.push(await this.tenantService.getInquilinoByID(fkData[i].fkTenant));
      }
      this.showHouseRequests=false;
      this.showRoomRequests=true;
    }



    // works
     // horriblemente ineficiente
     // casa obtenida del array de casas, tenant profile needed to be fetched
     async showHouseRequestsfunc(houseID: number): Promise<void> {
      this.tenantProfilesRequesting = [] as TenantProfile[];
      let fkData:any[] = await this.housingRequestService.getHouseRequestList(houseID);
      for(let i=0; i<fkData.length; i++){
        this.tenantProfilesRequesting.push(await this.tenantService.getInquilinoByID(fkData[i].fkTenant));
      }
      this.showRoomRequests = false;
      this.showHouseRequests = true;
    }    
  }