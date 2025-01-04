import { Component } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';

@Component({
  selector: 'app-update-house-form',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent
  ],
  templateUrl: './update-house-form.component.html',
  styleUrl: './update-house-form.component.css'
})
export class UpdateHouseFormComponent {

}
