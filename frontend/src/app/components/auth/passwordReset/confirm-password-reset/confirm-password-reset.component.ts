import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-confirm-password-reset',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './confirm-password-reset.component.html',
  styleUrl: './confirm-password-reset.component.css'
})
export class ConfirmPasswordResetComponent implements OnInit{

  token:string = {} as string;
  userID:number = {} as number;
  showAlert = false;
  alertError = false;
  constructor(
    private route:ActivatedRoute, 
    private authService:AuthService,
    private router:Router){

  }
  


  ngOnInit(): void {
    this.token=this.route.snapshot.paramMap.get('token')??'';
    this.userID=parseInt(this.route.snapshot.paramMap.get('userID')??'0');
    console.log("token: ", this.token);
    console.log("userID: ", this.userID);
    // need to redirect if token is empyString or userID is 0
    this.checkAlerts();
  }




  requestPasswordForm = new FormGroup({
    new_password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required])
  }, {
    validators:passwordConfirmationValidator('new_password', 'confirm_password')
  })



  async resetPassword(event:Event){
    event.preventDefault();
    if(await this.authService.resetPassword(
      this.requestPasswordForm.get('new_password')?.value??'',
      this.requestPasswordForm.get('confirm_password')?.value??'',
      this.token
    )===0){
      this.alertError = true;
    } else {
      this.showAlert = true;
    }
    this.checkAlerts();
  }

  checkAlerts(){
    if(this.showAlert){
      this.AlertSucess.fire({
        title: "Changed password successfully"
      }).then((result) => {
        if (result.isConfirmed){
          this.authService.logout()
          this.router.navigate([''])
        }
      })
    }else if(this.alertError){
      this.AlertError.fire({
        title:"There has beed an error in the password change"
      }).then((result) => {
        if (result.isConfirmed){
          this.authService.logout()
          this.router.navigate([''])
        }
      })
    }
  }

  AlertSucess = Swal.mixin({
    icon:"success",
    toast:true, 
    position: "center",
    showConfirmButton: true,
    timer: 10000, 
    timerProgressBar: true,
  })

  AlertError = Swal.mixin({
    icon: "error",
    toast:true,
    position:"center",
    showConfirmButton: true,
    timer: 10000, 
    timerProgressBar: true,
  })
 
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
