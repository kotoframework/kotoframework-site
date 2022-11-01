import {NgModule} from '@angular/core';
import {AskDialog, CodeGeneratorPage2Component} from "./code-generator-page2.component";
import {MatIconModule} from "@angular/material/icon";
import {MonacoEditorModule} from "@materia-ui/ngx-monaco-editor";
import {MatTabsModule} from "@angular/material/tabs";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLinkWithHref} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    CodeGeneratorPage2Component,
    AskDialog
  ],
  imports: [
    MatIconModule,
    MonacoEditorModule,
    MatTabsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    RouterLinkWithHref,
    MatDialogModule,
    MatInputModule,
    NgForOf,
    MatListModule,
    NgIf,
  ],
  providers: [],
})
export class CodeGeneratorPage2Module {
}
