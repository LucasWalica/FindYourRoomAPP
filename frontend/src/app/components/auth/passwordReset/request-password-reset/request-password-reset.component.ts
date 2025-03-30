import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-request-password-reset',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './request-password-reset.component.html',
  styleUrl: './request-password-reset.component.css'
})
export class RequestPasswordResetComponent {
  
  constructor(private auth:AuthService){}



  requestResetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required])
  })


  requestResetPassword(event:Event){
    event.preventDefault();
    this.auth.requestResetPassword(
      this.requestResetPasswordForm.get('email')?.value??''
    )
  }
}
