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
      image: [this.houseService.roomDetail?.image, ''],
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
      
      const imageValue = this.roomUpdateForm.get('image')?.value;

      // Si la imagen es base64, la convertimos a File
      if (imageValue && imageValue.startsWith('data:image')) {
        const file = this.convertBase64ToFile(imageValue, 'image.jpg'); // Aquí puedes cambiar el nombre si es necesario
        formData.append('image', file);
        console.log("file", file);
      } else if (imageValue && imageValue.startsWith('http')) {
        // Si la imagen es una URL, la agregamos directamente
        formData.append('image', imageValue);
      }
      console.log(formData);
  
      if (this.roomData.id) {
        this.houseService.updateRoom(this.roomData.id, formData);
      }
      this.router.navigate(['ownerHouses']);
    }
  }




  convertBase64ToFile(base64: string, filename: string): File {
    // Verificar si la base64 contiene datos y tiene la forma esperada
    const arr = base64.split(',');
  
    // Asegurarse de que la cadena base64 tiene la estructura correcta
    if (arr.length < 2) {
      throw new Error('Invalid base64 format');
    }
  
    // Intentar extraer el tipo MIME de la base64
    const mimeTypeMatch = arr[0].match(/:(.*?);/);
    if (!mimeTypeMatch) {
      throw new Error('Could not extract MIME type from base64 string');
    }
  
    // Si se encontró el tipo MIME, lo extraemos
    const mimeType = mimeTypeMatch[1];
  
    // Decodificar la base64 (sin la parte "data:image/...;base64," inicial)
    const byteString = atob(arr[1]);
  
    // Crear un array de bytes
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
  
    // Crear el archivo (File) a partir del array de bytes
    const file = new File([byteArray], filename, { type: mimeType });
    return file;
  }
}