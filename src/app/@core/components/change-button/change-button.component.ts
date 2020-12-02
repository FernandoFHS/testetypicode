import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'core-change-button',
  templateUrl: './change-button.component.html',
  styleUrls: ['./change-button.component.scss']
})
export class ChangeButtonComponent implements OnInit {
  
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.clickEvent.emit();
  }

}
