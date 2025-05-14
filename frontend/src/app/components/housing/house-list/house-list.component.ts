import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { Router} from '@angular/router';
import { HouseService } from '../../../services/house.service';
import { house } from '../../models/house.models';
import { ReactiveFormsModule, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-house-list',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent,
    ReactiveFormsModule
  ],
  templateUrl: './house-list.component.html',
  styleUrl: './house-list.component.css'
})
export class HouseListComponent implements OnInit{

  searchForm:FormGroup;
  houses:house[] = [];
  isLoaded:boolean = false;
  constructor(private router:Router, private houseService:HouseService, private fb:FormBuilder){
    this.searchForm = this.fb.group({
      search: ['']
    })
  }
  // charging all the data from the server is not efficient
  ngOnInit() {
    console.log("ng on init")
    this.loadHouseData();
  }

  async loadHouseData(){
    try {
      this.houses = await this.houseService.getHouseList();
      console.log(this.houses)
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
        this.isLoaded = true;
        console.log('Casas obtenidas:', this.houses);
      } catch (error) {
        console.error('Error al cargar las casas:', error);
      }
  }

  async onSubmit(){
    const searchData = this.searchForm.get('search')?.value??'';
    this.houses = await this.houseService.getHouseListBySearch(searchData);      
  }

  goToHouseDetails(house:house){
    this.houseService.setHouseData(house);
    this.router.navigate(['houseDetail']);
  }
}