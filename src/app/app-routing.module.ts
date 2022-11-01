import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {StartPageComponent} from "./components/start-page/start-page.component";
import {CodeGeneratorPageModule} from "./components/code-generator-page/code-generator-page.module";
import {DownloadPageModule} from "./components/download-page/download-page.module";
import {CodeGeneratorPageComponent} from "./components/code-generator-page/code-generator-page.component";
import {DownloadPageComponent} from "./components/download-page/download-page.component";
import {CodeGeneratorPage2Component} from "./components/code-generator-page2/code-generator-page2.component";
import {CodeGeneratorPage2Module} from "./components/code-generator-page2/code-generator-page2.module";

const routes: Routes = [
  {
    path: '',
    component: StartPageComponent,
  },
  {
    path: 'code-generator',
    component: CodeGeneratorPageComponent
  },
  {
    path: 'code-generator2',
    component: CodeGeneratorPage2Component
  },
  {
    path: 'download',
    component: DownloadPageComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true }),
    CodeGeneratorPageModule,
    CodeGeneratorPage2Module,
    DownloadPageModule,
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
