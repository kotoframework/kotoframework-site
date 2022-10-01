import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {StartPageComponent} from "./components/start-page/start-page.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeGeneratorPageComponent } from './components/code-generator-page/code-generator-page.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MonacoEditorModule} from "@materia-ui/ngx-monaco-editor";
import {FormsModule} from "@angular/forms";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import { DynamicPageComponent } from './components/dynamic-page/dynamic-page.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    CodeGeneratorPageComponent,
    DynamicPageComponent
  ],
  imports: [
    BrowserModule,
    StartPageComponent,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MonacoEditorModule,
    FormsModule,
    MatGridListModule,
    MatTabsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
