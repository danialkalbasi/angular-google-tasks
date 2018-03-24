import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-action-controls',
  templateUrl: './action-controls.component.html',
  styleUrls: ['./action-controls.component.scss']
})
export class ActionControlsComponent {
  @Output() editItem: EventEmitter<any>;

  constructor() {
    this.editItem = new EventEmitter();
  }

  /**
   * It fires whenever user click edit button
   * @param item is the edited item
   */
  onUserEdit(item) {
    this.editItem.emit(item);
  }
}
