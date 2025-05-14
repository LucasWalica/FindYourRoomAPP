import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  token:string|null = {} as string;
  url:string="localhost:8000";



  register(username:string,email:string, password:string){
    
    const datosUser=JSON.stringify({
      username:username,
      password:password,
      email:email
    });
    console.log(datosUser)
    fetch(`http://${this.url}/api/users/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: datosUser
    })
      .then(response => {
        console.log('Response:', response);
        if (response.ok) {
          return response.json(); 
        } else {
          return response.json().then(errorData => {
            throw new Error(JSON.stringify(errorData)); 
          });
        }
      })
      .then(data => {
        console.log('Data:', data);
        this.router.navigate(['']);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    
  }

  async login(username: string, password: string): Promise<number> {
    const datosUser = JSON.stringify({ username, password });
    console.log(datosUser);
  
    try {
      const response = await fetch(`http://${this.url}/api/users/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: datosUser
      });
  
      const responseBody = await response.json();
  
      if (response.ok) {
        if (responseBody.token) {
          console.log(responseBody.token);
          this.setToken(responseBody.token);
        }
        if (responseBody.user?.username) {
          localStorage.setItem('username', responseBody.user.username);
        }
        if (responseBody.inquilino_id) {
          localStorage.setItem('inquilino_id', responseBody.inquilino_id);
          console.log(localStorage.getItem('inquilino_id'));
        }
        if (responseBody.user?.id) {
          console.log("userid: ", responseBody.user.id);
          localStorage.setItem('userID', responseBody.user.id);
        }
        
        this.router.navigate(['home']);
        return 1; // Éxito
      } else {
        console.error("Login fallido:", responseBody);
        return 0; // Error
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return 0; // Error
    }
  }
  
  async requestResetPassword(email:string){
    const datosUser=JSON.stringify({
      email:email
    });
    console.log(datosUser);
    try {
        fetch(`http://${this.url}/api/users/requestResetPassword/`, {
          method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Accept': 'application/json',
        },
        body:datosUser
      })
    }catch(error){
      console.error("error: ",error);
    }
  }


  async resetPassword(new_password:string, confirm_password:string, token:string){
    const datosUser=JSON.stringify({
      new_password:new_password,
      confirm_password:confirm_password
    });
    console.log(datosUser);
    try {
        const response = await fetch(`http://${this.url}/api/users/resetPassword/${token}/`, {
          method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Accept': 'application/json',
        },
        body:datosUser
      })
      if (response.ok) {
        return 1; // Éxito
      } else {
        console.error("Error en la respuesta del servidor: ", await response.json());
        return 0; // Fallo
      }
    }catch(error){
      console.error("error: ",error);
      return 0;
    }
  }
  
  logout(){
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('inquilino_id');
    this.router.navigate(['']);
  }

  setToken(token:string){
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(){
    this.token = localStorage.getItem('token');
    return this.token;
  }

  userIsAuthenticated(): boolean {
    const token = this.getToken();
    if(token === null || token === '' || token === '{}'){
      return false;
    }else{
      return true;
    }
  }
}