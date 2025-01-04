import { Component } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-house-list',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent
  ],
  templateUrl: './house-list.component.html',
  styleUrl: './house-list.component.css'
})
export class HouseListComponent {

  constructor(private router:Router){}


}
