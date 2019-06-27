import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})
export class WelcomeScreenComponent implements OnInit {

  isLogin = false;
  isRegister = false;

  constructor() { }

  ngOnInit() {
  }

  

  onLoginClick(){
    this.isLogin= true
    this.isRegister = false;

  }
  onRegisterClick(){
    this.isRegister = true;
    this.isLogin= false

  }
}
