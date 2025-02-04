import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../../reusable/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { houseType } from '../../../models/house.models';
import { HouseService } from '../../../../services/house.service';
import { ReactiveFormsModule, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { house } from '../../../models/house.models';
import { FooterComponent } from '../../../reusable/footer/footer.component';
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
  updateHouseForm: FormGroup;
  houseTypes = houseType
  constructor(private fb: FormBuilder, private houseService:HouseService, private router:Router) {
    this.updateHouseForm = this.fb.group({
      name: [this.houseService.houseDetail.name, Validators.required],
      image: [this.houseService.houseDetail.image, ''],
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
      this.updateHouseForm.get(controlName)?.setValue(file); // Agregar el archivo directamente al formulario
    }
  }
  
  
  onSubmit(): void {
    if (this.updateHouseForm.valid) {
      console.log("form valido");
      const formData = new FormData();

      // Aquí agregamos cada campo del formulario al FormData
      formData.append('name', this.updateHouseForm.get('name')?.value);
      formData.append('desc', this.updateHouseForm.get('desc')?.value);
      formData.append('m2', this.updateHouseForm.get('m2')?.value);
      formData.append('price', this.updateHouseForm.get('price')?.value);

      const imageValue = this.updateHouseForm.get('image')?.value;

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
      if(this.houseService.houseDetail.id){
        this.houseService.updateHouse(this.houseService.houseDetail.id ,formData);
      }
      this.router.navigate(['ownerHouses'])
    }else{
      console.log(this.updateHouseForm.errors);
      Object.keys(this.updateHouseForm.controls).forEach(field => {
        const control = this.updateHouseForm.get(field);
        if (control && control.invalid) {
          console.log(`❌ Error en ${field}:`, control.errors);
        }
      });
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
