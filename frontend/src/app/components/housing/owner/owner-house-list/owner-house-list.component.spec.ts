import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerHouseListComponent } from './owner-house-list.component';

describe('OwnerHouseListComponent', () => {
  let component: OwnerHouseListComponent;
  let fixture: ComponentFixture<OwnerHouseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerHouseListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerHouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
