import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeGeneratorPage2Component } from './code-generator-page2.component';

describe('CodeGeneratorPageComponent', () => {
  let component: CodeGeneratorPage2Component;
  let fixture: ComponentFixture<CodeGeneratorPage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeGeneratorPage2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeGeneratorPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
