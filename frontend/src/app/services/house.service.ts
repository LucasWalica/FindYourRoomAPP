import { Injectable } from '@angular/core';
import { house, rooms } from '../components/models/house.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private router:Router) { }

  async postHouse(formData:any): Promise<any> {
    const url = 'http://localhost:8000/api/houses/house/create/';
    let formDataJson = JSON.stringify(formData)
    try {
      let token = localStorage.getItem('token');  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: formDataJson,
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const result = await response.json();
      this.router.navigate(['ownerHouses'])
      return result;

    } catch (error) {
      console.error('Error al enviar los datos:', error);
      throw error;
    }
  }

  async getOwnerHouseList(): Promise<house[]> {
    const url = 'http://localhost:8000/api/houses/houses/owner';
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const result = await response.json();
  
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      throw error;
    }
  }
  
  updateHouse(){}

  deleteHouse(){}
  
}
