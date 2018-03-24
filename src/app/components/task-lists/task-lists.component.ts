import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrls: ['./task-lists.component.scss']
})
export class TaskListsComponent implements OnInit, OnChanges {
  @Input() lists: Array<Object>;
  @Output() selectTask: EventEmitter<any>;

  /**
   * Keep an current index of chosed color
   * In real application, the color can be configurable on the server side
   */
  randomColorIndex = 0;

  /**
   * Initialize the selectTask
   */
  constructor() {
    this.selectTask = new EventEmitter();
  }

  /**
   * Set defaults for list tasks
   */
  ngOnInit() {
    this.lists = this.lists || [];
    this.updateLists();
  }

  ngOnChanges() {
    this.updateLists();
  }

  /**
   * It change values of received object from parent
   * Add cssClass property to the lists
   */
  updateLists(): void {
    if (this.lists) {
      this.lists.map((item: any) => {
        item.cssClass = this.getBoxColor();
      });
    }
  }

  /**
   * Dummy function that pick a color and return a css class based on the item index
   * The index is choose based on randomColorIndex
   */
  getBoxColor(): string {
    const colors = this.createBoxColors();
    const color = colors[this.randomColorIndex];
    this.randomColorIndex = this.randomColorIndex < colors.length ? 1 : this.randomColorIndex + 1;

    return `square square-${color}`;
  }

  /**
   * @returns array of colors
   * Create an array of colors
   */
  createBoxColors(): Array<string> {
    return ['red', 'green', 'orange', 'blue'];
  }

  /**
   * It fires when a list item get selected
   * It emits the change to the parent component
   * In real application, the emitted object will beautify/serialize
   * @param list item that selected by the user
   */
  onSelectList(list: Object): void {
    this.selectTask.emit(list);
  }
}
