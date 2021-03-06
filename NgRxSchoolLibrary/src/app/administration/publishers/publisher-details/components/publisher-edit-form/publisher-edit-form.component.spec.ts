import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherEditFormComponent } from './publisher-edit-form.component';

describe('PublisherEditFormComponent', () => {
  let component: PublisherEditFormComponent;
  let fixture: ComponentFixture<PublisherEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
