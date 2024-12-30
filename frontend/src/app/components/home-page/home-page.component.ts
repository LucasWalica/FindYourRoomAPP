import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../reusable/nav-bar/nav-bar.component";
import { FooterComponent } from "../reusable/footer/footer.component";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{


  constructor(private userService:UserService){

  }
  ngOnInit(): void {
   
  }

}
