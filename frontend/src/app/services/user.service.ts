import { Injectable, OnInit } from '@angular/core';
import { TenantProfile } from '../components/models/tenantProfile.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  token :String | null = {} as String;
  tenanProfile:TenantProfile = {} as TenantProfile;
  url:String = "localhost:8000";

  async postInquilino(age:string, occupation:string, gender:string, activity_schedule:string,
    cleanliness_level:string, pets:boolean, smoker:boolean, visit_frequency:string, 
    common_space_usage:string, hobbies:string, socializing_frequency:string, 
    living_environment:string, presentation:string, desiredCity:string
  ){

    const body = JSON.stringify({
        age, occupation, gender, activity_schedule, cleanliness_level, pets,
        smoker, visit_frequency, common_space_usage, hobbies, socializing_frequency, 
        living_environment, presentation, desiredCity
    })
    let token = localStorage.getItem('token');
    await fetch(`http://${this.url}/api/users/inquilino/create/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`, 
        'Content-Type': 'application/json'
      },
      body
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      localStorage.setItem('inquilino_id',data.inquilino_id)
    })
    .catch(error => console.error('Error:', error));
    
  }

  getInquilinoByID(inquilinoID:number):Promise<TenantProfile>{
    this.token = localStorage.getItem('token');
    if (!this.token) {
        console.error('Token no encontrados.');
        return Promise.reject('Token no encontrados.');
    }
    return fetch(`http://${this.url}/api/users/inquilino/detail/${inquilinoID}`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${this.token}`, 
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json(); 
    })
    .then((data: TenantProfile) => {
        this.tenanProfile = data
        console.log(data);
        return data;
    })
    .catch(error => {
        console.error('Error al obtener el inquilino:', error);
        throw error;
    });
  }

  getInquilino(): Promise<TenantProfile> {
    this.token = localStorage.getItem('token');
    let inquilino_id = localStorage.getItem('inquilino_id');
    if (!this.token || !inquilino_id) {
        console.error('Token o Inquilino ID no encontrados.');
        return Promise.reject('Token o Inquilino ID no encontrados.');
    }
    return fetch(`http://${this.url}/api/users/inquilino/detail/${inquilino_id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${this.token}`, 
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json(); 
    })
    .then((data: TenantProfile) => {
        this.tenanProfile = data
        console.log(data);
        return data;
    })
    .catch(error => {
        console.error('Error al obtener el inquilino:', error);
        throw error;
    });
  }

  updateInquilino(updatedData:TenantProfile){
    this.token = localStorage.getItem('token');
    let inquilino_id = localStorage.getItem('inquilino_id');
    if (!this.token || !inquilino_id) {
        console.error('Token o Inquilino ID no encontrados.');
        return Promise.reject('Token o Inquilino ID no encontrados.');
    }
    return fetch(`http://${this.url}/api/users/inquilino/update/${inquilino_id}/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Token ${this.token}`, 
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json(); 
    })
    .then((data: TenantProfile) => {
        console.log(data);
        return data;
    })
    .catch(error => {
        console.error('Error al obtener el inquilino:', error);
        throw error;
    });
  }


}
