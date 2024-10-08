import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCSSComponent } from './test-css.component';

describe('TestCSSComponent', () => {
  let component: TestCSSComponent;
  let fixture: ComponentFixture<TestCSSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCSSComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCSSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
