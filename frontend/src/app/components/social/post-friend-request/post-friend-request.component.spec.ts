import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFriendRequestComponent } from './post-friend-request.component';

describe('PostFriendRequestComponent', () => {
  let component: PostFriendRequestComponent;
  let fixture: ComponentFixture<PostFriendRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostFriendRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostFriendRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
