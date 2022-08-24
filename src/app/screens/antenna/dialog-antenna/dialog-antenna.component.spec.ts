import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAntennaComponent } from './dialog-antenna.component';

describe('DialogAntennaComponent', () => {
  let component: DialogAntennaComponent;
  let fixture: ComponentFixture<DialogAntennaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAntennaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAntennaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
