import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HackathonBaseComponent } from './hackathon-base.component';

describe('HackathonBaseComponent', () => {
  let component: HackathonBaseComponent;
  let fixture: ComponentFixture<HackathonBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HackathonBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackathonBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
