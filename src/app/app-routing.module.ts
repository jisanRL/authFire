import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [

  // landing page
  { path: '', pathMatch: 'full', component: LandingpageComponent },
  
  // login page
  { path: 'login', component: LoginComponent},
   
  // register page
  { path: 'register', component: RegisterComponent},

  // home page
  { path: 'home', component: HomeComponent},

  // verify email page
  { path: 'verifyEmail', component: VerifyEmailComponent},
    
   // forgot password page
  { path: 'forgotPassword', component: ForgotPasswordComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
