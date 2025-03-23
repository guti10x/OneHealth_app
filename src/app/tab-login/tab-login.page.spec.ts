import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabLoginPage } from './tab-login.page';

describe('TabLoginPage', () => {
  let component: TabLoginPage;
  let fixture: ComponentFixture<TabLoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
