import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'core-refuse-button',
  templateUrl: './refuse-button.component.html',
  styleUrls: ['./refuse-button.component.scss']
})
export class RefuseButtonComponent implements OnInit {

  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.clickEvent.emit();
  }

}
