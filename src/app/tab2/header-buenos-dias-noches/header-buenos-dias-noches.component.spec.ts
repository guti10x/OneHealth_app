import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeaderBuenosDiasNochesComponent } from './header-buenos-dias-noches.component';

describe('HeaderBuenosDiasNochesComponent', () => {
  let component: HeaderBuenosDiasNochesComponent;
  let fixture: ComponentFixture<HeaderBuenosDiasNochesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderBuenosDiasNochesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderBuenosDiasNochesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
