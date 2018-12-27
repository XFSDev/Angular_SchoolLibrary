import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksSearchPanelComponent } from './books-search-panel.component';

describe('BooksSearchPanelComponent', () => {
  let component: BooksSearchPanelComponent;
  let fixture: ComponentFixture<BooksSearchPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksSearchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
