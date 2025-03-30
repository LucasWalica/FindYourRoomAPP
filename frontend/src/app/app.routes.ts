import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { CreateInquilinoFormComponent } from './components/auth/create-inquilino-form/create-inquilino-form.component';
import { UpdateInquilinoFormComponent } from './components/auth/update-inquilino-form/update-inquilino-form.component';
import { HouseListComponent } from './components/housing/house-list/house-list.component';
import { HouseDetailComponent } from './components/housing/house-detail/house-detail.component';
import { PostHouseFormComponent } from './components/housing/owner/post-house-form/post-house-form.component';
import { UpdateHouseFormComponent } from './components/housing/owner/update-house-form/update-house-form.component';
import { OwnerHouseListComponent } from './components/housing/owner/owner-house-list/owner-house-list.component';
import { DeleteHouseFormComponent } from './components/housing/owner/delete-house-form/delete-house-form.component';
import { RoomUpdateFormComponent } from './components/housing/owner/room-update-form/room-update-form.component';
import { UserUserChatComponent } from './components/chat/user-user-chat/user-user-chat.component';
import { InboxChatComponent } from './components/chat/inbox-chat/inbox-chat.component';
import { FriendListComponent } from './components/social/friend-list/friend-list.component';
import { ConfirmPasswordResetComponent } from './components/auth/passwordReset/confirm-password-reset/confirm-password-reset.component';
import { RequestPasswordResetComponent } from './components/auth/passwordReset/request-password-reset/request-password-reset.component';

export const routes: Routes = [
    {path:'home', component:HomePageComponent},
    {path:'', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'profile', component:ProfileComponent},
    {path:'createTenantProfile', component:CreateInquilinoFormComponent},
    {path:'updateInquilinoForm', component:UpdateInquilinoFormComponent},
    {path:'updateHouse', component:UpdateHouseFormComponent},
    {path:'addHouse', component: PostHouseFormComponent},
    {path:'houseDetail', component:HouseDetailComponent},
    {path:'houses', component:HouseListComponent},
    {path:'ownerHouses', component:OwnerHouseListComponent},
    {path:'deleteHouse', component:DeleteHouseFormComponent},
    {path:'updateRoom', component:RoomUpdateFormComponent},
    {path:'chats', component:InboxChatComponent},
    {path:'chat', component:UserUserChatComponent},    
    {path:'friendList', component:FriendListComponent},

    {path:'requestPassword', component:RequestPasswordResetComponent},
    {path:'confirmPassword/:userID/:token', component:ConfirmPasswordResetComponent},
    
];