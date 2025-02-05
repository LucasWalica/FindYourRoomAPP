import { Component} from '@angular/core';
import { NavBarComponent } from "../../reusable/nav-bar/nav-bar.component";
import { FooterComponent } from "../../reusable/footer/footer.component";
import { UserService } from '../../../services/user.service';
import { TenantProfile, ActivitySchedule, CleanlinessLevel, CommonSpaceUsage, Gender, LivingEnvironment, SocializingFrequency, VisitFrequency } from '../../models/tenantProfile.models';
import {FormControl, ReactiveFormsModule, Validators, FormGroup} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-inquilino-form',
  standalone: true,
  imports: [
    NavBarComponent, 
    FooterComponent, 
    ReactiveFormsModule, 
    CommonModule
  ],
  templateUrl: './create-inquilino-form.component.html',
  styleUrl: './create-inquilino-form.component.css'
})
export class CreateInquilinoFormComponent {

  // enums 
  activitySchedule=ActivitySchedule;
  cleanliness=CleanlinessLevel;
  commonSpaceUsage=CommonSpaceUsage;
  genders=Gender;
  livingEnviroment=LivingEnvironment;
  socializingFrequency=SocializingFrequency;
  visitFrequency=VisitFrequency

  

  constructor(private userService:UserService, private router:Router){}

  
  async enviar(event:Event){
    event.preventDefault();
    await this.userService.postInquilino(
      this.inquilinoForm.get('age')?.value??'',
      this.inquilinoForm.get('occupation')?.value??'',
      this.inquilinoForm.get('gender')?.value??'',
      this.inquilinoForm.get('activity_schedule')?.value??'',
      this.inquilinoForm.get('cleanliness_level')?.value??'',
      this.inquilinoForm.get('pets')?.value??false,
      this.inquilinoForm.get('smoker')?.value??false,
      this.inquilinoForm.get('visit_frequency')?.value??'',
      this.inquilinoForm.get('common_space_usage')?.value??'',
      this.inquilinoForm.get('hobbies')?.value??'',
      this.inquilinoForm.get('socializing_frequency')?.value??'',
      this.inquilinoForm.get('living_enviroment')?.value??'',
      this.inquilinoForm.get('presentation')?.value??'',
      this.inquilinoForm.get('desiredCity')?.value??'',
    )
    this.router.navigate(['']);
    
  }


  // add alergias?
  inquilinoForm = new FormGroup({
    age: new FormControl('', Validators.required),
    occupation: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    activity_schedule: new FormControl('', Validators.required),
    cleanliness_level: new FormControl('', Validators.required),
    pets: new FormControl(false),
    smoker: new FormControl(false, Validators.required),
    visit_frequency: new FormControl('', Validators.required),
    common_space_usage: new FormControl('', Validators.required),
    hobbies: new FormControl('', Validators.required),
    socializing_frequency: new FormControl('', Validators.required),
    living_environment: new FormControl('', Validators.required),
    presentation: new FormControl('', Validators.required),
    desiredCity: new FormControl('', Validators.required)
  })


  
}
