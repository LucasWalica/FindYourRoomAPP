import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


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

  async enviar(event:Event){
    event.preventDefault();
      const response = await this.auth.login(
        this.loginForm.get('username')?.value??'',
        this.loginForm.get('password')?.value??''
      )
      if(response === 1 ) {
        this.Toast.fire({
        title: "Signed in successfully"
      });
    }else if(response === 0){
      this.ErrorToast.fire({
        title: "There was an error during your loging"
      })
    }
  }

  goToHome(){
    this.router.navigate(['home'])
  }
  goToRegister(){
    this.router.navigate(['register'])
  }

  goToRequestPassword() {
    this.router.navigate(['requestPassword'])
  }

  Toast = Swal.mixin({
    toast: true,
    icon: "success",
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  ErrorToast = Swal.mixin({
    toast: true,
    icon: "error",
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  })


}
