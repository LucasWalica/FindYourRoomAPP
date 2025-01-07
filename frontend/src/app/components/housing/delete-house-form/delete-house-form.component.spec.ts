import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHouseFormComponent } from './delete-house-form.component';

describe('DeleteHouseFormComponent', () => {
  let component: DeleteHouseFormComponent;
  let fixture: ComponentFixture<DeleteHouseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteHouseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteHouseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
