import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketslearnComponent } from './socketslearn.component';

describe('SocketslearnComponent', () => {
  let component: SocketslearnComponent;
  let fixture: ComponentFixture<SocketslearnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocketslearnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocketslearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
