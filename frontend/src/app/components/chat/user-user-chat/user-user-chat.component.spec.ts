import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUserChatComponent } from './user-user-chat.component';

describe('UserUserChatComponent', () => {
  let component: UserUserChatComponent;
  let fixture: ComponentFixture<UserUserChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserUserChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUserChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
