import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../../reusable/nav-bar/nav-bar.component";
import { FooterComponent } from "../../reusable/footer/footer.component";
import { UserService } from '../../../services/user.service';
import { TenantProfile } from '../../models/tenantProfile.models';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TenantProfileComponent } from "../tenant-profile/tenant-profile.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NavBarComponent, 
    FooterComponent, 
    CommonModule, 
    TenantProfileComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent{

  username:String | null = {} as String;
  inquilinoProfile:TenantProfile | null = {} as TenantProfile;

  constructor(private userService:UserService, private router:Router){}

  async ngOnInit(): Promise<void> {
    try {
      this.inquilinoProfile = await this.userService.getInquilino();
    }catch (error) {
      console.error('Error al obtener el perfil del inquilino:', error);
    }

    if(localStorage.getItem('inquilino_id')==='' ||  localStorage.getItem('inquilino_id') === null || localStorage.getItem('inquilino_id') === undefined){
      this.inquilinoProfile = null;
    }
    this.username = localStorage.getItem('username');
  }


  goToForm(){
    this.router.navigate(['createTenantProfile'])
  }

  updateForm(){
    this.router.navigate(['updateInquilinoForm'])
  }



 
}