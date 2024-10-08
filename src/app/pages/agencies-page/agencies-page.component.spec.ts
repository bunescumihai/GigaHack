import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenciesPageComponent } from './agencies-page.component';

describe('AgenciesPageComponent', () => {
  let component: AgenciesPageComponent;
  let fixture: ComponentFixture<AgenciesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgenciesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgenciesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
