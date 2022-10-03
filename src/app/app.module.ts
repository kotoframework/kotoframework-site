import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {StartPageComponent} from "./components/start-page/start-page.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MonacoEditorModule} from "@materia-ui/ngx-monaco-editor";
import {FormsModule} from "@angular/forms";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import { AppRoutingModule } from './app-routing.module';
import {RouterOutlet} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
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
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    AppRoutingModule,
    RouterOutlet,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
