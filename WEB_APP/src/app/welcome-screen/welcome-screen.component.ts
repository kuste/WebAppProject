import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})
export class WelcomeScreenComponent implements OnInit {

  posts = []
  isLoading: boolean = false
  constructor(private apiService: ApiService) { }


  ngOnInit() {
    this.isLoading = true
    this.apiService.getAllPosts().subscribe(posts => {
      this.posts = posts.posts
      this.isLoading = false
    })

  }

}
