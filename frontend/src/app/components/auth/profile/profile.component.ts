import { Component } from '@angular/core';
import { NavBarComponent } from "../../reusable/nav-bar/nav-bar.component";
import { FooterComponent } from "../../reusable/footer/footer.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
