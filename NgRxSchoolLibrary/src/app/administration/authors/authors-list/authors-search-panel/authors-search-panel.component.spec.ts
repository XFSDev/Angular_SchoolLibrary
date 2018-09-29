import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsSearchPanelComponent } from './authors-search-panel.component';

describe('AuthorsSearchPanelComponent', () => {
  let component: AuthorsSearchPanelComponent;
  let fixture: ComponentFixture<AuthorsSearchPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorsSearchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
