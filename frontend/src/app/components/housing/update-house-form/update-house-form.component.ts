import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { CommonModule } from '@angular/common';
import { HouseService } from '../../../services/house.service';
import { houseType } from '../../models/house.models';
import { ReactiveFormsModule, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { house } from '../../models/house.models';
@Component({
  selector: 'app-update-house-form',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-house-form.component.html',
  styleUrl: './update-house-form.component.css'
})
export class UpdateHouseFormComponent implements OnInit {

  houseToUpdate:house={}as house;
  postHouseForm: FormGroup;
  houseTypes = houseType
  constructor(private fb: FormBuilder, private houseService:HouseService, private router:Router) {
    this.postHouseForm = this.fb.group({
      name: [this.houseService.houseDetail.name, Validators.required],
      image: [this.houseService.houseDetail.image, Validators.required],
      desc: [this.houseService.houseDetail.desc, Validators.required],
      m2: [this.houseService.houseDetail.m2, [Validators.required, Validators.min(1)]],
      price: [this.houseService.houseDetail.price, [Validators.required, Validators.min(0)]],
    });
  }
  ngOnInit(): void {
    this.houseToUpdate = this.houseService.houseDetail;
    if(typeof this.houseToUpdate.id !== 'number'){
      this.router.navigate(['ownerHouses'])
    }
  }

  onFileChange(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string; 
        this.postHouseForm.get(controlName)?.setValue(base64String);
      };
      reader.readAsDataURL(file); 
    }
  }

  onSubmit(): void {
    if (this.postHouseForm.valid) {
      const formData = this.postHouseForm.value;
    
      // Convertir las imágenes de las habitaciones a base64
     

      console.log(formData);
      if(this.houseService.houseDetail.id){
        this.houseService.updateHouse(this.houseService.houseDetail.id ,formData);
      }
      this.router.navigate(['ownerHouses'])
    }
  
  
  }
}
