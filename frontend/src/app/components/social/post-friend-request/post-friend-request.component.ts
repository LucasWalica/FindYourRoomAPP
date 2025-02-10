import { Component } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';

@Component({
  selector: 'app-post-friend-request',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent
  ],
  templateUrl: './post-friend-request.component.html',
  styleUrl: './post-friend-request.component.css'
})
export class PostFriendRequestComponent {

}
