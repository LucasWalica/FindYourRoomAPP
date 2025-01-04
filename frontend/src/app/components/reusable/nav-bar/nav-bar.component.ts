import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private router:Router, private auth:AuthService){}

  goToProfile(){
    this.router.navigate(['profile'])
  }
  goToHousing(){
    this.router.navigate(['houses'])
  }
  goToPostHouse(){
    this.router.navigate(['addHouse'])
  }
  goToNotificacions(){

  }
  home(){
    this.router.navigate(['home'])
  }
  logout(){
    this.auth.logout();
  }
}