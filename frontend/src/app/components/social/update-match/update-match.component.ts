import { Component } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';

@Component({
  selector: 'app-update-match',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent
  ],
  templateUrl: './update-match.component.html',
  styleUrl: './update-match.component.css'
})
export class UpdateMatchComponent {

}
