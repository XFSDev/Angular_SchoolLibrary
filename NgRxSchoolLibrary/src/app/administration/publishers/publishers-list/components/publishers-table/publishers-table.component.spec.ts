import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishersTableComponent } from './publishers-table.component';

describe('PublishersTableComponent', () => {
  let component: PublishersTableComponent;
  let fixture: ComponentFixture<PublishersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
