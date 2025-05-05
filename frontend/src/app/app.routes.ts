import { Routes } from '@angular/router';
export const routes: Routes = [
    {path:'home', loadComponent: () => import("./components/home-page/home-page.component").then(m=>m.HomePageComponent)},
    {path:'', loadComponent: () => import("./components/auth/login/login.component").then(m=>m.LoginComponent)},
    {path:'register', loadComponent: () => import("./components/auth/register/register.component").then(m=>m.RegisterComponent)},
    {path:'profile', loadComponent: () => import("./components/auth/profile/profile.component").then(m=>m.ProfileComponent)},
    {path:'createTenantProfile', loadComponent: () => import("./components/auth/create-inquilino-form/create-inquilino-form.component").then(m=>m.CreateInquilinoFormComponent)},
    {path:'updateInquilinoForm', loadComponent: () => import("./components/auth/update-inquilino-form/update-inquilino-form.component").then(m=>m.UpdateInquilinoFormComponent)},
    {path:'updateHouse', loadComponent: () => import("./components/housing/owner/update-house-form/update-house-form.component").then(m=>m.UpdateHouseFormComponent)},
    {path:'addHouse', loadComponent: () => import("./components/housing/owner/post-house-form/post-house-form.component").then(m=>m.PostHouseFormComponent)},
    {path:'houseDetail', loadComponent: () => import("./components/housing/house-detail/house-detail.component").then(m=>m.HouseDetailComponent)},
    {path:'houses', loadComponent: () => import("./components/housing/house-list/house-list.component").then(m=>m.HouseListComponent)},
    {path:'ownerHouses', loadComponent: () => import("./components/housing/owner/owner-house-list/owner-house-list.component").then(m=>m.OwnerHouseListComponent)},
    {path:'deleteHouse', loadComponent: () => import("./components/housing/owner/delete-house-form/delete-house-form.component").then(m=>m.DeleteHouseFormComponent)},
    {path:'updateRoom', loadComponent: () => import("./components/housing/owner/room-update-form/room-update-form.component").then(m=>m.RoomUpdateFormComponent)},
    {path:'chats', loadComponent: () => import("./components/chat/inbox-chat/inbox-chat.component").then(m=>m.InboxChatComponent)},
    {path:'chat', loadComponent: () => import('./components/chat/user-user-chat/user-user-chat.component').then(m=>m.UserUserChatComponent)},    
    {path:'friendList', loadComponent: () => import('./components/social/friend-list/friend-list.component').then(m => m.FriendListComponent)},
    {path:'requestPassword', loadComponent: () => import('./components/auth/passwordReset/request-password-reset/request-password-reset.component').then(m => m.RequestPasswordResetComponent)},
    {path:'confirmPassword/:userID/:token', loadComponent: () => import('./components/auth/passwordReset/confirm-password-reset/confirm-password-reset.component').then(m=>m.ConfirmPasswordResetComponent)},
    
];