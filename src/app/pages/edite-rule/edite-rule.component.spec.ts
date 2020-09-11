import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeRuleComponent } from './edite-rule.component';

describe('EditeRuleComponent', () => {
  let component: EditeRuleComponent;
  let fixture: ComponentFixture<EditeRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditeRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditeRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
