import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorDetailsFormComponent } from './author-details-form.component';

describe('AuthorDetailsFormComponent', () => {
  let component: AuthorDetailsFormComponent;
  let fixture: ComponentFixture<AuthorDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
