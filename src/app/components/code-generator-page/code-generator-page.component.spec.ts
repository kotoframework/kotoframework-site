import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeGeneratorPageComponent } from './code-generator-page.component';

describe('CodeGeneratorPageComponent', () => {
  let component: CodeGeneratorPageComponent;
  let fixture: ComponentFixture<CodeGeneratorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeGeneratorPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeGeneratorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
