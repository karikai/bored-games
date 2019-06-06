import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileHerosComponent } from './tile-heros.component';

describe('TileHerosComponent', () => {
  let component: TileHerosComponent;
  let fixture: ComponentFixture<TileHerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileHerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileHerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
