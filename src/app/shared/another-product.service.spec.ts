import { TestBed } from '@angular/core/testing';

import { AnotherProductService } from './another-product.service';

describe('AnotherProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnotherProductService = TestBed.get(AnotherProductService);
    expect(service).toBeTruthy();
  });
});
