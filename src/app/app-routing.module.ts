import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { HomeComponent } from './component/home/home.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { auth } from './core/guards/auth.guard';

const routes: Routes = [
 
  {path:'', 
  // canActivate:[auth],
  component:BlankLayoutComponent,
  children:[
    {path:'home',component:HomeComponent,title:'Home'}
  ]},
  {path:'',component:AuthLayoutComponent,children:[
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'register',component:RegisterComponent,title:'Register'}
  ]},
  {path:"**",component:NotFoundComponent,title:'Not Found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
