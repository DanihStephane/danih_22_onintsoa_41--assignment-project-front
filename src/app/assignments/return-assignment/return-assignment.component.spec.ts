import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnAssignmentComponent } from './return-assignment.component';

describe('ReturnAssignmentComponent', () => {
  let component: ReturnAssignmentComponent;
  let fixture: ComponentFixture<ReturnAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReturnAssignmentComponent]
    });
    fixture = TestBed.createComponent(ReturnAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
