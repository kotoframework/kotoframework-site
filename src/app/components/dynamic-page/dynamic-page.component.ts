import { Component, OnInit } from '@angular/core';
import {StartPageService} from "../start-page/start-page.service";

@Component({
  selector: 'dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.less']
})
export class DynamicPageComponent implements OnInit {

  constructor(public startPageSrv: StartPageService,) { }

  ngOnInit(): void {
  }

}
