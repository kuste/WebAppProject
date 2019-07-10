
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.css']
})
export class PopupModalComponent implements OnInit {
  @Input() message: string
  @Output() close = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.close.emit()

  }

}
