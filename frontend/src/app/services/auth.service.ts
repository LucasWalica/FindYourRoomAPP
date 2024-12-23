import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  token:string|null = {} as string;


  // test and save token into local storage
  register(username:string,email:string, password:string){
    
    const datosUser=JSON.stringify({
      username:username,
      password:password,
      email:email
    });
    console.log(datosUser)
    fetch('http://localhost:8000/api/users/register/', {
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


  // add token
  login(username:string, password:string){

    const datosUser=JSON.stringify({
      username:username,
      password:password,
    });
    console.log(datosUser);
    fetch('http://localhost:8000/api/users/login/', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:datosUser
    })
    .then(response => {
      console.log(response);
      if(response.ok){
        this.router.navigate(['home']);
      }
    })
    .then(data=>{
      console.log(data);
    })
    .catch(error=>console.log('Error: ', error));
  }
  
  logout(){
    this.token = null;
    localStorage.removeItem('token');
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
