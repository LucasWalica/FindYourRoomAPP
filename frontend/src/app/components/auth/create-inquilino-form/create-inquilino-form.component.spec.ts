import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInquilinoFormComponent } from './create-inquilino-form.component';

describe('CreateInquilinoFormComponent', () => {
  let component: CreateInquilinoFormComponent;
  let fixture: ComponentFixture<CreateInquilinoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInquilinoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInquilinoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
