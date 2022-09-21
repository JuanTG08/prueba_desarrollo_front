import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAccessComponent } from './dialog-access.component';

describe('DialogAccessComponent', () => {
  let component: DialogAccessComponent;
  let fixture: ComponentFixture<DialogAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
