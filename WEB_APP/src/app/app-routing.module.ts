import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component'
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { ContentComponent } from './content/content.component'
import { AuthGuardService } from './services/auth-guard.service'

const routes: Routes = [
  { path: '', component: WelcomeScreenComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, redirectTo: '' },
  { path: 'login', component: LoginComponent, redirectTo: '' },
  { path: 'content', component: ContentComponent,  canActivate:[AuthGuardService] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
