import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAssignmentComponent } from './confirm-assignment.component';

describe('ConfirmAssignmentComponent', () => {
  let component: ConfirmAssignmentComponent;
  let fixture: ComponentFixture<ConfirmAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmAssignmentComponent]
    });
    fixture = TestBed.createComponent(ConfirmAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
