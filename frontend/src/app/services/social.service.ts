import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SocialService {


  constructor(private router:Router) { }
    // post friend request 
    // maybe add router navigate after testing
  async postFriendRequest(formData:any){
    const url = `http://localhost:8000/api/social/friendRequest/`;
    let formDataJson = JSON.stringify(formData);
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
      return result;
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      throw error;
    }
  }
  // friend request list 
  async getFriendRequestList(){
    const url = `http://localhost:8000/api/social/requestList/`;
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
    // update friend request 
  async updateFriendRequest(friendRequestID: number, accepted:any){
    const url = `http://localhost:8000/api/social/requestUpdate/${friendRequestID}/`
    let token = localStorage.getItem('token');
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({accepted})
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
    // get friend list 
  async getFriendList(){
    const url = `http://localhost:8000/api/social/friendList/`;
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
    // delete friend
  async deleteFriend(id_relation:number){
    const url = `http://localhost:8000/api/social/friendDelete/${id_relation}/`
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        }
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

  // get match list
  async getMatchList(){
    const url = `http://localhost:8000/api/social/matchList/`;
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
      let ownID = parseInt(localStorage.getItem('userID')??'0');
      const filteredResult = result.map((data: any) => {
        if (data.fkTenant1.fkUser === ownID) {
          delete data.fkTenant1;  // Eliminar si coincide con el usuario
        } else if (data.fkTenant2.fkUser === ownID) {
          delete data.fkTenant2;
        }
        return data;
      });
      return filteredResult;
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      throw error;
    }
  }

  async updateMatch(matchID:number, accepted:any){
    const url = `http://localhost:8000/api/social/matchUpdate/${matchID}/`
    let token = localStorage.getItem('token');
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({accepted})
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

}