import { Component } from '@angular/core';
import { NavBarComponent } from "../reusable/nav-bar/nav-bar.component";
import { FooterComponent } from "../reusable/footer/footer.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
