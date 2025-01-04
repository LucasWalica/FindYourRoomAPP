import { Component } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';

@Component({
  selector: 'app-house-detail',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent
  ],
  templateUrl: './house-detail.component.html',
  styleUrl: './house-detail.component.css'
})
export class HouseDetailComponent {

}
