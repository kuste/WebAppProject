import { Component, OnInit, OnDestroy } from '@angular/core'
import { ApiService } from '../services/api.service'
import { Subscription } from 'rxjs'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {


  private userSub: Subscription;
  isAuthenticated: boolean = false;


  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit() {

    this.userSub = this.apiService.user.subscribe(user => {
      this.isAuthenticated = !!user;
  
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

  handleLogout() {
    this.apiService.logout()
  }


}
