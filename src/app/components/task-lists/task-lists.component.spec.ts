import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListsComponent } from './task-lists.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TaskListsComponent', () => {
  let component: TaskListsComponent;
  let fixture: ComponentFixture<TaskListsComponent>;
  const listData = [
    { id: '1', title: 'todo1' },
    { id: '2', title: 'todo2' }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TaskListsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Initialization', () => {
    it('should initialize the service', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('lists @Input', () => {
    beforeEach(() => {
      component.lists = listData;
    });

    it('should receive the data from parent', () => {
      // Assert
      expect(component.lists).toEqual(listData);
    });

    it('should bind the data to the view', () => {
      // Act
      fixture.detectChanges();
      const numberOfDisplayedTasks = fixture.debugElement.query(By.css('ul')).children.length;

      // Assert
      expect(numberOfDisplayedTasks).toBe(3);
    });

    it('should shows the message that list is empty in view', () => {
      // Arrange
      component.lists = [];

      // Act
      fixture.detectChanges();
      const isFindEmptyMessage = fixture.debugElement.query(By.css('.no-task-message'));

      // Assert
      expect(isFindEmptyMessage).toBeDefined();
    });

    it('should have id and title properties in each list item', () => {
      // Act
      const listProps = Object.getOwnPropertyNames(component.lists[0]);
      const validProps = ['id', 'title'];

      // Assert
      expect(listProps).toEqual(validProps);
    });
  });

  describe('selectTask @Output', () => {
    it('should emit the changes', () => {
    });
  });

  describe('getBoxColor', () => {
    it('should return a class name color', () => {
      // Arrange
      const colors = component.createBoxColors();

      // Act
      const className = component.getBoxColor();

      // Assert
      expect(className.includes('square square-')).toBeTruthy();
    });
  });

  describe('createBoxColors', () => {
    it('should returnat least 4 colors', () => {
      // Act
      const colors = component.createBoxColors();

      // Assert
      expect(colors.length).toBeGreaterThan(3);
    });
  });

});
