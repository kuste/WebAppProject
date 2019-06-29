import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { IPostDto } from '../models/post'
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  email;
  posts: IPostDto[] = []
  constructor(private apiService: ApiService) {

  }

  ngOnInit() {

    //take one value from observable then unsubscribe
    this.apiService.user.pipe(take(1)).subscribe()

    this.apiService.getAllUserPosts().subscribe(res => {
      this.posts = res.posts
    })


  }

}
