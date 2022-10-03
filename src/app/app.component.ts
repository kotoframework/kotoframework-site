import {Component, HostListener, OnInit} from '@angular/core';
import {StartPageService} from "./components/start-page/start-page.service";
import {defineProperties} from "./utils/defineProperties";
import {MatSnackBar} from "@angular/material/snack-bar";
import {I18nService} from "./i18n.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [StartPageService, MatSnackBar]
})
export class AppComponent implements OnInit {
  constructor(public startPageSrv: StartPageService, public i18n: I18nService) {
    defineProperties();
  }

  ngOnInit() {
    const uaLanguage = window.navigator.language;
    if (uaLanguage === 'zh-CN') {
      this.i18n.currentLanguage = 'zh-CN';
    } else {
      this.i18n.currentLanguage = 'en-US';
    }
  }
}
