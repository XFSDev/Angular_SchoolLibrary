import { TestBed, async, inject } from '@angular/core/testing';

import { AuthorsGuard } from './authors.guard';

describe('AuthorsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorsGuard]
    });
  });

  it('should ...', inject([AuthorsGuard], (guard: AuthorsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
