import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../reusable/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HouseService } from '../../../../services/house.service';
import { Router } from '@angular/router';
import { rooms } from '../../../models/house.models';

@Component({
  selector: 'app-room-update-form',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './room-update-form.component.html',
  styleUrl: './room-update-form.component.css'
})
export class RoomUpdateFormComponent implements OnInit {

  roomData:rooms = {} as rooms
  roomUpdateForm: FormGroup;
  constructor(private router:Router, private houseService:HouseService, private fb: FormBuilder){
    this.roomUpdateForm = this.fb.group({
      m2: [this.houseService.roomDetail.m2, Validators.required],
      desc: [this.houseService.roomDetail.desc, Validators.required],
      image: [''],
      price: [this.houseService.roomDetail.price, Validators.required]
    });
  }

  ngOnInit(): void {
    this.roomData = this.houseService.roomDetail;
    if(typeof this.roomData.m2 !== 'number'){
      this.router.navigate(['ownerHouses'])
    }
    console.log(this.roomData)
  }
  
  onFileChange(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.roomUpdateForm.get(controlName)?.setValue(file); // Agregar el archivo directamente al formulario
    }
  }

  onSubmit(): void {
    if (this.roomUpdateForm.valid) {
      const formData = new FormData();
  
      formData.append('m2', this.roomUpdateForm.get('m2')?.value);
      formData.append('desc', this.roomUpdateForm.get('desc')?.value);
      formData.append('price', this.roomUpdateForm.get('price')?.value);
      formData.append('image', this.roomUpdateForm.get('image')?.value);
      
    
  
      console.log(formData);
  
      if (this.roomData.id) {
        this.houseService.updateRoom(this.roomData.id, formData);
      }
      this.router.navigate(['ownerHouses']);
    }
  }
}

