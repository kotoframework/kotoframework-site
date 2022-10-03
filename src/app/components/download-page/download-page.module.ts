import {NgModule} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {RouterLinkWithHref} from "@angular/router";
import {DownloadPageComponent} from "./download-page.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    DownloadPageComponent
  ],
  imports: [
    MatIconModule,
    RouterLinkWithHref,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
  ],
  providers: [],
})
export class DownloadPageModule {
}
