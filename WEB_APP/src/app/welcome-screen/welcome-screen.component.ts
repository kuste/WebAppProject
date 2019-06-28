import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})
export class WelcomeScreenComponent implements OnInit {

  posts = []

  constructor(private apiService: ApiService) { }


  ngOnInit() {

    this.apiService.getAllPosts().subscribe(posts => {
      this.posts = posts.posts
    })

  }

}
