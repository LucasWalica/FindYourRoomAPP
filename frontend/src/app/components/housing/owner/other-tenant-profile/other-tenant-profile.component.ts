import { Component, Input } from '@angular/core';
import { TenantProfile } from '../../../models/tenantProfile.models';
@Component({
  selector: 'app-other-tenant-profile',
  standalone: true,
  imports: [],
  templateUrl: './other-tenant-profile.component.html',
  styleUrl: './other-tenant-profile.component.css'
})
export class OtherTenantProfileComponent {
  @Input() inquilinoProfile:TenantProfile | null = {} as TenantProfile;
}
