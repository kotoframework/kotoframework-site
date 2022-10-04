import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {StartPageComponent} from "./components/start-page/start-page.component";
import {CodeGeneratorPageModule} from "./components/code-generator-page/code-generator-page.module";
import {DownloadPageModule} from "./components/download-page/download-page.module";
import {CodeGeneratorPageComponent} from "./components/code-generator-page/code-generator-page.component";
import {DownloadPageComponent} from "./components/download-page/download-page.component";

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
    DownloadPageModule,
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
