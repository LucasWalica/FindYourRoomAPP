import { Component } from '@angular/core';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';

@Component({
  selector: 'app-match-list',
  standalone: true,
  imports: [
    FooterComponent,
    NavBarComponent
  ],
  templateUrl: './match-list.component.html',
  styleUrl: './match-list.component.css'
})
export class MatchListComponent {

}
