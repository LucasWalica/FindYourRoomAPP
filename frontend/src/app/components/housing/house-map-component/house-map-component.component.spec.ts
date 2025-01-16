import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseMapComponentComponent } from './house-map-component.component';

describe('HouseMapComponentComponent', () => {
  let component: HouseMapComponentComponent;
  let fixture: ComponentFixture<HouseMapComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseMapComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseMapComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
