import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemsSection } from './list-items-section';

describe('ListItemsSection', () => {
  let component: ListItemsSection;
  let fixture: ComponentFixture<ListItemsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItemsSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
