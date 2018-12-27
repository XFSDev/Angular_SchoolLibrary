import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishersSearchPanelComponent } from './publishers-search-panel.component';

describe('PublishersSearchPanelComponent', () => {
  let component: PublishersSearchPanelComponent;
  let fixture: ComponentFixture<PublishersSearchPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishersSearchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishersSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
