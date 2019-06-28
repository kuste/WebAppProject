import { Component, OnInit, Input } from '@angular/core';
import { IPostDto } from '../../models/post'

@Component({
  selector: 'app-post-presenter',
  templateUrl: './post-presenter.component.html',
  styleUrls: ['./post-presenter.component.css']
})
export class PostPresenterComponent implements OnInit {


  @Input() post: IPostDto;
  constructor() { }

  ngOnInit() {
  }

}
