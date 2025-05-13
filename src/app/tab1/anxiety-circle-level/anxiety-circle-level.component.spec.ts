import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnxietyCircleLevelComponent } from './anxiety-circle-level.component';

describe('AnxietyCircleLevelComponent', () => {
  let component: AnxietyCircleLevelComponent;
  let fixture: ComponentFixture<AnxietyCircleLevelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnxietyCircleLevelComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnxietyCircleLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
