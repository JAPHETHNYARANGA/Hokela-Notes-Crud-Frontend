import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { HomeComponent } from './Dashboard/home/home.component';
import { UpdateComponent } from './Dashboard/update/update.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"home",component:HomeComponent},
  {path:"update", component:UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
