import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInquilinoFormComponent } from './update-inquilino-form.component';

describe('UpdateInquilinoFormComponent', () => {
  let component: UpdateInquilinoFormComponent;
  let fixture: ComponentFixture<UpdateInquilinoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateInquilinoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInquilinoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
