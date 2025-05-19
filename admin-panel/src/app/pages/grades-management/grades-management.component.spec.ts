import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesManagementComponent } from './grades-management.component';

describe('GradesManagementComponent', () => {
  let component: GradesManagementComponent;
  let fixture: ComponentFixture<GradesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
