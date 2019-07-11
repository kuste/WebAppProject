import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { IPostDto } from '../models/post'
import { Subscription } from 'rxjs'
import { DataHandlerService } from '../services/data-handler.service'


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  posts: IPostDto[] = []
  isEditMode = false
  subscription: Subscription;
  id: string;
  post: IPostDto
  showUpdateModal = false;
  name;
  isLoading: boolean = false

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {


    //TODO move this to login component and make data-handler.service


    this.isLoading = true
    this.apiService.getAllUserPosts().subscribe(res => {
      this.posts = res.posts
      this.isLoading = false
    },
      error => {
        console.log(error)
        this.isLoading = false
      }

    ),
      () => {
        this.isLoading = false
        this.apiService.postUpdated.subscribe(res => {
          console.log(res);

        })
      }
  }

  onDelete(i) {
    console.log(i._id);
    this.apiService.deletePosts(i._id).subscribe(res => {
      console.log(res);

    }, err => {
      console.log(err);
    },
      () => {
        this.apiService.getAllUserPosts().subscribe(res => {
          this.posts = res.posts

        })
      }
    )

  }

  onUpdate(i) {
    this.showUpdateModal = !this.showUpdateModal
    this.apiService._updateId.next(i._id)

  }
  handleEdit() {
    this.isEditMode = !this.isEditMode

  }

  onClose() {
    this.showUpdateModal = null

  }
  onSubmit() {
    this.showUpdateModal = null
    this.apiService.getAllUserPosts().subscribe(res => {
      this.posts = res.posts

    })
  }

  ngOnDestroy() {
    this.isEditMode = false
  }

}
