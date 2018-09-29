import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherDetailsFormComponent } from './publisher-details-form.component';

describe('PublisherDetailsFormComponent', () => {
  let component: PublisherDetailsFormComponent;
  let fixture: ComponentFixture<PublisherDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
