import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { RegisterComponent } from './auth-page/register/register.component';
import { LoginComponent } from './auth-page/login/login.component';
import { ContentComponent } from './content/content.component';
import { SideBarComponent } from './content/side-bar/side-bar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { PostPresenterComponent } from './content/post-presenter/post-presenter.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { CreatePostComponent } from './content/create-post/create-post.component';
import { UserPageComponent } from './content/user-page/user-page.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptorService } from './services/auth-interceptor.service'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeScreenComponent,
    RegisterComponent,
    LoginComponent,
    ContentComponent,
    SideBarComponent,
    LoadingSpinnerComponent,
    PostPresenterComponent,
    AuthPageComponent,
    CreatePostComponent,
    UserPageComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
