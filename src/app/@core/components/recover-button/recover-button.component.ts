import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'core-recover-button',
  templateUrl: './recover-button.component.html',
  styleUrls: ['./recover-button.component.scss']
})
export class RecoverButtonComponent implements OnInit {

  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.clickEvent.emit();
  }

}
