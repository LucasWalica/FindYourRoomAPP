import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherTenantProfileComponent } from './other-tenant-profile.component';

describe('OtherTenantProfileComponent', () => {
  let component: OtherTenantProfileComponent;
  let fixture: ComponentFixture<OtherTenantProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherTenantProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherTenantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
