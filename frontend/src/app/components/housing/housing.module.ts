import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostHouseFormComponent } from './post-house-form/post-house-form.component';


const routes : Routes= [
  {path:'addHouse', component: PostHouseFormComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class HousingModule { }
