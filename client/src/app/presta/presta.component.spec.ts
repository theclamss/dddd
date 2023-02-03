import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestaComponent } from './presta.component';

describe('PrestaComponent', () => {
  let component: PrestaComponent;
  let fixture: ComponentFixture<PrestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
