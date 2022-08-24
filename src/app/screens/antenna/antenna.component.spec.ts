import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntennaComponent } from './antenna.component';

describe('AntennaComponent', () => {
  let component: AntennaComponent;
  let fixture: ComponentFixture<AntennaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntennaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntennaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
