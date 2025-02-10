import { Component } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';

@Component({
  selector: 'app-update-friend-request',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent
  ],
  templateUrl: './update-friend-request.component.html',
  styleUrl: './update-friend-request.component.css'
})
export class UpdateFriendRequestComponent {

}
