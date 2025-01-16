import { Component, Input, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { house } from '../../models/house.models';
import { enviroment } from '../../../../env/environ';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-house-map-component',
  standalone: true,
  imports: [
    GoogleMapsModule,
    CommonModule,
  ],
  templateUrl: './house-map-component.component.html',
  styleUrl: './house-map-component.component.css'
})
export class HouseMapComponentComponent implements OnInit {
  apiKey = enviroment.googleMapsAPi;
  @Input() houseData: house = {} as house; 
  center: google.maps.LatLngLiteral = {} as google.maps.LatLngLiteral; 
  markerPosition: google.maps.LatLngLiteral = {} as google.maps.LatLngLiteral; 
  zoom = 12; 
  
  ngOnInit() { 
    this.center = { lat: this.houseData.latitud, lng: this.houseData.longitud };
    this.markerPosition = { lat: this.houseData.latitud, lng: this.houseData.longitud }; 
  }
  
}
