import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { CommonModule } from '@angular/common';
import { TenantProfile, ActivitySchedule, CleanlinessLevel, CommonSpaceUsage, Gender, LivingEnvironment, SocializingFrequency, VisitFrequency } from '../../models/tenantProfile.models';
import {FormControl, ReactiveFormsModule, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-update-inquilino-form',
  standalone: true,
  imports: [
    NavBarComponent, 
    FooterComponent, 
    ReactiveFormsModule, 
    CommonModule
  ],
  templateUrl: './update-inquilino-form.component.html',
  styleUrl: './update-inquilino-form.component.css'
})
export class UpdateInquilinoFormComponent implements OnInit {


  tenantProfile:TenantProfile = {} as TenantProfile;
  inquilinoForm: FormGroup;

  constructor(private router:Router, private userService:UserService, private fb: FormBuilder){
    this.inquilinoForm = this.fb.group({
      age: [this.userService.tenanProfile.age, Validators.required],
      occupation: [this.userService.tenanProfile.occupation, Validators.required],
      gender: [this.userService.tenanProfile.gender, Validators.required],
      activity_schedule: [this.userService.tenanProfile.activity_schedule, Validators.required],
      cleanliness_level: [this.userService.tenanProfile.cleanliness_level, Validators.required],
      pets: [this.userService.tenanProfile.pets],
      smoker: [this.userService.tenanProfile.smoker, Validators.required],
      visit_frequency: [this.userService.tenanProfile.visit_frequency, Validators.required],
      common_space_usage: [this.userService.tenanProfile.common_space_usage, Validators.required],
      hobbies: [this.userService.tenanProfile.hobbies, Validators.required],
      socializing_frequency: [this.userService.tenanProfile.socializing_frequency, Validators.required],
      living_environment: [this.userService.tenanProfile.living_enviroment, Validators.required],
      presentation: [this.userService.tenanProfile.presentation, Validators.required],
      desiredCity: [this.userService.tenanProfile.desiredCity, Validators.required]
    })
  }
   // enums 
   activitySchedule=ActivitySchedule;
   cleanliness=CleanlinessLevel;
   commonSpaceUsage=CommonSpaceUsage;
   genders=Gender;
   livingEnviroment=LivingEnvironment;
   socializingFrequency=SocializingFrequency;
   visitFrequency=VisitFrequency
  


  ngOnInit(): void {
    this.tenantProfile = this.userService.tenanProfile
    console.log(this.tenantProfile);
  }

      
  async enviar(event:Event){
    event.preventDefault();
    const ageValue = this.inquilinoForm.get('age')?.value as string;
    const age = parseInt(ageValue);


    let updatedData: TenantProfile = {
      age: age ,
      occupation: this.inquilinoForm.get('occupation')?.value,
      gender: this.inquilinoForm.get('gender')?.value as Gender ?? '',
      activity_schedule: this.inquilinoForm.get('activity_schedule')?.value as ActivitySchedule ?? '',
      cleanliness_level: this.inquilinoForm.get('cleanliness_level')?.value as CleanlinessLevel ?? '',
      pets: this.inquilinoForm.get('pets')?.value ?? false,
      smoker: this.inquilinoForm.get('smoker')?.value ?? false,
      visit_frequency: this.inquilinoForm.get('visit_frequency')?.value ?? '',
      common_space_usage: this.inquilinoForm.get('common_space_usage')?.value as CommonSpaceUsage ?? '',
      hobbies: this.inquilinoForm.get('hobbies')?.value ?? '',
      socializing_frequency: this.inquilinoForm.get('socializing_frequency')?.value as SocializingFrequency ?? '',
      living_enviroment: this.inquilinoForm.get('living_enviroment')?.value as unknown as LivingEnvironment ?? '',
      presentation: this.inquilinoForm.get('presentation')?.value ?? '',
      desiredCity: this.inquilinoForm.get('desiredCity')?.value?? ''
    }
    await this.userService.updateInquilino(
      updatedData
    )
    this.router.navigate(['']);
    
  }
}
