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

  async updateHouseRequest(houseRequestID:number, formData:any){
    const url = `http://localhost:8000/api/houseOrderTasks/houseRequestUpdate/${houseRequestID}/`;
    let token = localStorage.getItem('token'); 
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
        },
        body:formData
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
    const url = `http://localhost:8000/api/houseOrderTasks/roomRequestList/${RoomID}/`;
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
  
      console.log("resultado de request list room: ",result);
      return result;
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      throw error;
    }
  }
  async updateRoomRequest(roomRequestID:number, formData:any){
    const url = `http://localhost:8000/api/houseOrderTasks/RoomRequestUpdate/${roomRequestID}/`;
    let token = localStorage.getItem('token'); 
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
        },
        body:formData
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