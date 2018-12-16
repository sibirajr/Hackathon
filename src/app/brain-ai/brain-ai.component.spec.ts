import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrainAIComponent } from './brain-ai.component';

describe('BrainAIComponent', () => {
  let component: BrainAIComponent;
  let fixture: ComponentFixture<BrainAIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrainAIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrainAIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
