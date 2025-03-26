import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../reusable/footer/footer.component';
import { NavBarComponent } from '../../../reusable/nav-bar/nav-bar.component';
import { houseType } from '../../../models/house.models';
import { HouseService } from '../../../../services/house.service';

@Component({
  selector: 'app-post-house-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent, NavBarComponent],
  templateUrl: './post-house-form.component.html',
  styleUrls: ['./post-house-form.component.css'],
})
export class PostHouseFormComponent {
  postHouseForm: FormGroup;
  houseTypes = houseType;

  constructor(private fb: FormBuilder, private houseService: HouseService) {
    this.postHouseForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      desc: ['', Validators.required],
      m2: [1, [Validators.required, Validators.min(1)]],
      house_type: ['', Validators.required],
      rooms: [0, [Validators.required, Validators.min(0)]],
      ciudad: ['', Validators.required],
      barrio: ['', Validators.required],
      calle: ['', Validators.required],
      portal: [0, Validators.required],
      price: [1, [Validators.required, Validators.min(0)]],
      smokersAllowed: [false, Validators.required],
      petsAllowed: [false, Validators.required],
      rooms_data: this.fb.array([]),
    });

    this.initializeRoomsData();

    this.postHouseForm.get('rooms')?.valueChanges.subscribe((roomCount) => {
      this.updateRoomFields(Number(roomCount));
    });
  }

  get roomsData(): FormArray {
    return this.postHouseForm.get('rooms_data') as FormArray;
  }

  private initializeRoomsData(): void {
    const roomCount = this.postHouseForm.get('rooms')?.value || 0;
    if (!this.postHouseForm.get('rooms_data')) {
      this.postHouseForm.addControl('rooms_data', this.fb.array([]));
    }
    this.updateRoomFields(roomCount);
  }
  

  onFileChange(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        this.postHouseForm.get(controlName)?.setValue(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  onRoomImageChange(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        this.roomsData.at(index).get('image')?.setValue(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  private updateRoomFields(count: number): void {
    count = Number(count);
    while (this.roomsData.length < count) {
      this.roomsData.push(
        this.fb.group({
          m2: [1, [Validators.required, Validators.min(1)]],
          desc: ['', Validators.required],
          image: ['', Validators.required],
          price: [0, [Validators.required, Validators.min(0)]],
        })
      );
    }
    while (this.roomsData.length > count) {
      this.roomsData.removeAt(this.roomsData.length - 1);
    } 

    this.postHouseForm.updateValueAndValidity();

  }

  onSubmit(): void {
    if (this.postHouseForm.valid) {
      this.houseService.postHouse(this.postHouseForm.value);
    } else {
      console.error('Invalid form', this.postHouseForm.errors);
      this.logFormErrors();
    }
  }

  private logFormErrors(): void {
    Object.entries(this.postHouseForm.controls).forEach(([key, control]) => {
      if (control.invalid) {
        console.error(`Error in ${key}:`, control.errors);
      }
    });

    this.roomsData.controls.forEach((room, index) => {
      Object.entries((room as FormGroup).controls).forEach(([key, control]) => {
        if (control.invalid) {
          console.error(`Error in rooms_data[${index}].${key}:`, control.errors);
          console.log(this.roomsData);
        }
      });
    });
  }
}
