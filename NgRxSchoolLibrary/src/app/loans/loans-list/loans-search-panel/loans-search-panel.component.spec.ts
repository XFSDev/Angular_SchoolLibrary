import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansSearchPanelComponent } from './loans-search-panel.component';

describe('LoansSearchPanelComponent', () => {
  let component: LoansSearchPanelComponent;
  let fixture: ComponentFixture<LoansSearchPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoansSearchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
