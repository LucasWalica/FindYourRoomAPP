import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostHouseFormComponent } from './post-house-form.component';

describe('PostHouseFormComponent', () => {
  let component: PostHouseFormComponent;
  let fixture: ComponentFixture<PostHouseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostHouseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostHouseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
