import { Component } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-post-house-form',
  standalone: true,
  imports: [NavBarComponent,FooterComponent],
  templateUrl: './post-house-form.component.html',
  styleUrl: './post-house-form.component.css'
})
export class PostHouseFormComponent {
  address: string = ''; // Dirección ingresada por el usuario
  latitude: number | null = null; // Latitud obtenida
  longitude: number | null = null; // Longitud obtenida
  apiKey: string = 'TU_CLAVE_DE_API'; // Clave API de Google Maps
  // add form to normalize data
  // const fullAddress = `${calle}, ${ciudad}, ${codigoPostal}`;
  constructor(private http: HttpClient) {}


  // crear servicio apartado
  onSubmit() {
    const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
    const url = `${baseUrl}?address=${encodeURIComponent(this.address)}&key=${this.apiKey}`;

    this.http.get(url).subscribe((response: any) => {
      if (response.results && response.results.length > 0) {
        const location = response.results[0].geometry.location;
        this.latitude = location.lat;
        this.longitude = location.lng;
        console.log('Coordenadas:', this.latitude, this.longitude);
      } else {
        console.error('No se encontraron resultados para la dirección proporcionada.');
      }
    });
  }
}


