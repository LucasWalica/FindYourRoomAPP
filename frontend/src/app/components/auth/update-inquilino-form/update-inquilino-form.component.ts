import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { CommonModule } from '@angular/common';
import { TenantProfile, ActivitySchedule, CleanlinessLevel, CommonSpaceUsage, Gender, LivingEnvironment, SocializingFrequency, VisitFrequency } from '../../models/tenantProfile.models';
import {FormControl, ReactiveFormsModule, Validators, FormGroup} from '@angular/forms';
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


  constructor(private router:Router, private userService:UserService){}
   // enums 
   activitySchedule=ActivitySchedule;
   cleanliness=CleanlinessLevel;
   commonSpaceUsage=CommonSpaceUsage;
   genders=Gender;
   livingEnviroment=LivingEnvironment;
   socializingFrequency=SocializingFrequency;
   visitFrequency=VisitFrequency
  tenantProfile:TenantProfile = {} as TenantProfile;


  ngOnInit(): void {
    this.tenantProfile = this.userService.tenanProfile
  }
    inquilinoForm = new FormGroup({
       age: new FormControl('', Validators.required),
       occupation: new FormControl(this.tenantProfile.occupation, Validators.required),
       gender: new FormControl(this.tenantProfile.gender, Validators.required),
       activity_schedule: new FormControl(this.tenantProfile.activity_schedule, Validators.required),
       cleanliness_level: new FormControl(this.tenantProfile.cleanliness_level, Validators.required),
       pets: new FormControl(this.tenantProfile.pets),
       smoker: new FormControl(this.tenantProfile.smoker, Validators.required),
       visit_frequency: new FormControl(this.tenantProfile.visit_frequency, Validators.required),
       common_space_usage: new FormControl(this.tenantProfile.common_space_usage, Validators.required),
       hobbies: new FormControl(this.tenantProfile.hobbies, Validators.required),
       socializing_frequency: new FormControl(this.tenantProfile.socializing_frequency, Validators.required),
       living_environment: new FormControl(this.tenantProfile.living_enviroment, Validators.required),
       presentation: new FormControl(this.tenantProfile.presentation, Validators.required)
      });

      
  async enviar(event:Event){
    event.preventDefault();
    const ageValue = this.inquilinoForm.get('age')?.value as string;
    const age = parseInt(ageValue);
    let updatedData: TenantProfile = {
      age: age ,
      occupation: this.inquilinoForm.get('occupation')?.value ?? '',
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
    }
    await this.userService.updateInquilino(
      updatedData
    )
    this.router.navigate(['']);
    
  }
}
