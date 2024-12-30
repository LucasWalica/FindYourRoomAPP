import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHouseFormComponent } from './update-house-form.component';

describe('UpdateHouseFormComponent', () => {
  let component: UpdateHouseFormComponent;
  let fixture: ComponentFixture<UpdateHouseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateHouseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateHouseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
