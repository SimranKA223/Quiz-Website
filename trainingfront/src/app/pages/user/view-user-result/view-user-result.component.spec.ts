import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserResultComponent } from './view-user-result.component';

describe('ViewUserResultComponent', () => {
  let component: ViewUserResultComponent;
  let fixture: ComponentFixture<ViewUserResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUserResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
