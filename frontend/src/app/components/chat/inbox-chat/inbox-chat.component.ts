import { Component } from '@angular/core';
import { NavBarComponent } from '../../reusable/nav-bar/nav-bar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';
@Component({
  selector: 'app-inbox-chat',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent
  ],
  templateUrl: './inbox-chat.component.html',
  styleUrl: './inbox-chat.component.css'
})
export class InboxChatComponent {

}
