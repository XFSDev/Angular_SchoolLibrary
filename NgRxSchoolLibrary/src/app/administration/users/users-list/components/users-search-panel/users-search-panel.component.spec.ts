import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSearchPanelComponent } from './users-search-panel.component';

describe('UsersSearchPanelComponent', () => {
  let component: UsersSearchPanelComponent;
  let fixture: ComponentFixture<UsersSearchPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersSearchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
