import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HousingRequestsService {

  constructor(private router:Router) { }

  async postHouseRequest(formDataJson:any){
    const url = 'http://localhost:8000/api/houseOrderTasks/post/houseRequest/';
    let token = localStorage.getItem('token'); 
    try {
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
      // router add redirect
      return result;

    } catch (error) {
      console.error('Error al enviar los datos:', error);
      throw error;
    }
  }
  
  async getHouseRequestList(houseID:number){
    const url = `http://localhost:8000/api/houseOrderTasks/houseRequestList/${houseID}/`;
    let token = localStorage.getItem('token'); 
    try{
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

  async updateHouseRequest(houseRequestID:number, accepted:any){
    const url = `http://localhost:8000/api/houseOrderTasks/houseRequestUpdate/${houseRequestID}/`;
    let token = localStorage.getItem('token'); 
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body:accepted
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

  async postRoomRequest(formDataJson:any){
    const url = `http://localhost:8000/api/houseOrderTasks/post/RoomRequest/`;
    let token = localStorage.getItem('token'); 
    try {
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
      // router add redirect
      return result;

    } catch (error) {
      console.error('Error al enviar los datos:', error);
      throw error;
    }
  }
  async getRoomRequestList(RoomID:number){
    const url = `http://localhost:8000/api/houseOrderTasks/RoomRequestList/${RoomID}/`;
    let token = localStorage.getItem('token'); 
    try{
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
      return result;
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      throw error;
    }
  }
  async updateRoomRequest(roomRequestID:number, accepted:any){
    const url = `http://localhost:8000/api/houseOrderTasks/RoomRequestUpdate/${roomRequestID}/`;
    let token = localStorage.getItem('token'); 
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body:accepted
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

}