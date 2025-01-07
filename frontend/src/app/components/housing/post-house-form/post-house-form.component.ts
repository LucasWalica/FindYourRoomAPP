import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { houseType } from '../../models/house.models';
import { HouseService } from '../../../services/house.service';

@Component({
  selector: 'app-post-house-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent, NavBarComponent],
  templateUrl: './post-house-form.component.html',
  styleUrls: ['./post-house-form.component.css'],
})
export class PostHouseFormComponent {
  postHouseForm: FormGroup;
  houseTypes = houseType
  constructor(private fb: FormBuilder, private houseService:HouseService) {
    this.postHouseForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      desc: ['', Validators.required],
      m2: [0, [Validators.required, Validators.min(1)]],
      house_type: ['', Validators.required],
      rooms: [0, [Validators.required, Validators.min(0)]],
      ciudad: ['', Validators.required],
      barrio: ['', Validators.required],
      calle: ['', Validators.required],
      portal: [0, Validators.required],
      direccion: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      rooms_data: this.fb.array([]), 
    });

    // Inicializar `rooms_data` según el valor inicial de `rooms`
    this.initializeRoomsData();

    // Suscripción a cambios en el campo `rooms`
    this.postHouseForm.get('rooms')?.valueChanges.subscribe((roomCount) => {
      console.log(`Cambio detectado en rooms: ${roomCount}`);
      this.updateRoomFields(roomCount);
    });
  }

  // Acceder al FormArray `rooms_data`
  get roomsData(): FormArray {
    return this.postHouseForm.get('rooms_data') as FormArray;
  }

  // Método para inicializar `rooms_data`
  private initializeRoomsData(): void {
    const roomCount = this.postHouseForm.get('rooms')?.value || 0;
    this.updateRoomFields(roomCount);
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
  
  onRoomImageChange(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const roomGroup = this.roomsData.at(index) as FormGroup;
        roomGroup.get('image')?.setValue(base64String);
      };
      reader.readAsDataURL(file);
    }
  }


  // Actualizar dinámicamente los campos de habitaciones
  private updateRoomFields(count: number): void {
    const currentLength = this.roomsData.length;

    if (count > currentLength) {
      for (let i = currentLength; i < count; i++) {
        this.roomsData.push(
          this.fb.group({
            m2: [0, [Validators.required, Validators.min(1)]],
            desc: ['', Validators.required],
            image: [null, Validators.required],
            price: [0, [Validators.required, Validators.min(0)]],
          })
        );
      }
    } else {
      for (let i = currentLength - 1; i >= count; i--) {
        this.roomsData.removeAt(i);
      }
    }
    console.log(`rooms_data actualizado:`, this.roomsData.value);
  }

  onSubmit(): void {
    if (this.postHouseForm.valid) {
      const formData = this.postHouseForm.value;
    
      // Convertir las imágenes de las habitaciones a base64
      const rooms = formData.rooms_data;
      const imagePromises = rooms.map((room: any, index: number) => {
        return new Promise((resolve, reject) => {
          if (room.image instanceof File) {
            const reader = new FileReader();
            reader.onloadend = () => {
              room.image = reader.result as string;  // Convertir la imagen a base64
              resolve(room);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(room.image);  // Llamar a readAsDataURL solo si es un archivo
          } else {
            resolve(room);  // Si no hay imagen, resolver la promesa
          }
        });
      });
      console.log(formData);
      // Esperar a que todas las imágenes se conviertan a base64 antes de enviar
      Promise.all(imagePromises).then(() => {
        this.houseService.postHouse(formData);
      }).catch(error => {
        console.error('Error al procesar imágenes:', error);
      });
    } else {
      console.error('Formulario inválido');
    }
  }
  
  
  
  
}
