import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { HousingModule } from './components/housing/housing.module';

export const routes: Routes = [
    {path:'home', component:HomePageComponent},
    {path:'', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'profile', component:ProfileComponent},
    {path:'houses', component:HousingModule},
];
