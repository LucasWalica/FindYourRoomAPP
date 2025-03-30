import { Component, OnInit } from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {


  ngOnInit(): void {
    if(this.auth.userIsAuthenticated()){
      this.router.navigate(['home'])
    }  
  }

  constructor(private router:Router, private auth:AuthService){}


  registrationForm = new FormGroup({
    nickName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  }, {
    validators: passwordConfirmationValidator("password", "password2"),
  });
  
  enviar(event:Event){
    event.preventDefault()
    this.auth.register(
      this.registrationForm.get('nickName')?.value?? '',
      this.registrationForm.get('email')?.value?? '', 
      this.registrationForm.get('password')?.value?? '')
  
  }

  goToLogin(){
    this.router.navigate(['']);
  }  
  
  goToRequestPassword() {
    this.router.navigate(['requestPassword'])
  }
}




import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordConfirmationValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(controlName);
    const confirmPasswordControl = formGroup.get(matchingControlName);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  };
}