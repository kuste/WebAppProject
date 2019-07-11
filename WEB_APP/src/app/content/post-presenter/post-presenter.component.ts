import { Component, OnInit, Input } from '@angular/core';
import { IPostDto } from '../../models/post'
import { HandleNavbarClick } from '../../services/handle-navbar-click.service'

@Component({
  selector: 'app-post-presenter',
  templateUrl: './post-presenter.component.html',
  styleUrls: ['./post-presenter.component.css']
})
export class PostPresenterComponent implements OnInit {

  isEditMode = false;
  postID;

  @Input() post: IPostDto;
  @Input() index: number;
  constructor(private handleNavbarClick: HandleNavbarClick) { }
  ngOnInit() {

  }
}
