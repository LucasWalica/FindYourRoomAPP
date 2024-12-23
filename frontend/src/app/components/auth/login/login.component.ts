import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit { 

  ngOnInit(): void {
    if(this.auth.userIsAuthenticated()){
      this.router.navigate(['home'])
    }
  }

  constructor(private auth:AuthService, private router:Router){}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  })

  enviar(event:Event){
    event.preventDefault();
      this.auth.login(
        this.loginForm.get('username')?.value??'',
        this.loginForm.get('password')?.value??''
      )
  }

  goToHome(){
    this.router.navigate(['home'])
  }
  goToRegister(){
    this.router.navigate(['register'])
  }


}
