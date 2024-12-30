import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { TenantProfile } from '../../models/tenantProfile.models';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-tenant-profile',
  standalone: true,
  imports: [],
  templateUrl: './tenant-profile.component.html',
  styleUrl: './tenant-profile.component.css'
})
export class TenantProfileComponent implements OnInit{


  @Input() inquilinoProfile:TenantProfile | null = {} as TenantProfile;
  username:String | null = {} as String;

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }
  

  constructor(private userService:UserService, private router:Router, @Inject(PLATFORM_ID) private platformId: any){}

  

 
}