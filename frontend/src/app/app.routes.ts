import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { PostHouseFormComponent } from './components/housing/post-house-form/post-house-form.component';

export const routes: Routes = [
    {path:'home', component:HomePageComponent},
    {path:'', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'profile', component:ProfileComponent},
    {path:'postHouse', component:PostHouseFormComponent}
];
