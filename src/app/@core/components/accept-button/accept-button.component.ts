import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'core-accept-button',
  templateUrl: './accept-button.component.html',
  styleUrls: ['./accept-button.component.scss']
})
export class AcceptButtonComponent implements OnInit {

  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.clickEvent.emit();
  }

}
