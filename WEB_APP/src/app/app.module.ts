import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './content/header/header.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ContentComponent } from './content/content.component';
import { SideBarComponent } from './content/side-bar/side-bar.component';
import { AuthComponent } from './auth/auth.component'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeScreenComponent,
    RegisterComponent,
    LoginComponent,
    ContentComponent,
    SideBarComponent,
    AuthComponent


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
