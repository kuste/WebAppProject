import { Injectable } from '@angular/core';
import { IPostDto } from '../models/post'
import { ApiService } from './api.service'
import { Subject, observable, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  private posts: IPostDto[] = []
  postUpdate = new Subject<IPostDto>()
  constructor() { }




  get userPostst() {
    return this.posts
  }
  setUserPosts(posts: IPostDto[]) {
    this.posts = posts
  }
}