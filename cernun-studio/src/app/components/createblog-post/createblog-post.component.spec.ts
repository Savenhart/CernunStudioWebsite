import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateblogPostComponent } from './createblog-post.component';

describe('CreateblogPostComponent', () => {
  let component: CreateblogPostComponent;
  let fixture: ComponentFixture<CreateblogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateblogPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateblogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
