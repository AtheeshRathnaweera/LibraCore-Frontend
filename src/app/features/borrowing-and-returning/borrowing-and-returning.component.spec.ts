import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingAndReturningComponent } from './borrowing-and-returning.component';

describe('BorrowingAndReturningComponent', () => {
  let component: BorrowingAndReturningComponent;
  let fixture: ComponentFixture<BorrowingAndReturningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowingAndReturningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowingAndReturningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
