import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFriendRequestComponent } from './update-friend-request.component';

describe('UpdateFriendRequestComponent', () => {
  let component: UpdateFriendRequestComponent;
  let fixture: ComponentFixture<UpdateFriendRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFriendRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFriendRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
