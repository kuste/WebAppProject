import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component'
import { RegisterComponent } from './auth-page/register/register.component'
import { LoginComponent } from './auth-page/login/login.component'
import { ContentComponent } from './content/content.component'
import { AuthGuardService } from './services/auth-guard.service'
import { AuthPageComponent } from './auth-page/auth-page.component'
import { CreatePostComponent } from './content/create-post/create-post.component'
import { UserPageComponent } from './content/user-page/user-page.component'

const routes: Routes = [

  { path: '', component: WelcomeScreenComponent },
  {
    path: 'auth', component: AuthPageComponent, children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: 'content', component: ContentComponent
  },
  { path: 'createpost', component: CreatePostComponent },
  { path: 'user', component: UserPageComponent },


  { path: '**', component: WelcomeScreenComponent, redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
