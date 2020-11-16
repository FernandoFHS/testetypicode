import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'core-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss']
})
export class SaveButtonComponent implements OnInit {

  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.clickEvent.emit();
  }

}
