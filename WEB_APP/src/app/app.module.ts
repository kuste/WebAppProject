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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { PostPresenterComponent } from './content/post-presenter/post-presenter.component';
import { AuthPageComponent } from './auth-page/auth-page.component'

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
    AuthPageComponent
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
