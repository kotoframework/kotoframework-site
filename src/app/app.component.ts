import {Component, HostListener, OnInit} from '@angular/core';
import {StartPageService} from "./components/start-page/start-page.service";
import {defineProperties} from "./utils/defineProperties";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [StartPageService, MatSnackBar]
})
export class AppComponent implements OnInit {
  constructor(public startPageSrv: StartPageService) {
    defineProperties();
  }

  ngOnInit() {
  }
}
