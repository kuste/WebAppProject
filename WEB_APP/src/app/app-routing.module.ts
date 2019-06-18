import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component'
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'

const routes: Routes = [
  { path: '', component: WelcomeScreenComponent, pathMatch:'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
