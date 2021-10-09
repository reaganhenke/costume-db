import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumeTileComponent } from './costume-tile.component';

describe('CostumeTileComponent', () => {
  let component: CostumeTileComponent;
  let fixture: ComponentFixture<CostumeTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostumeTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostumeTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
