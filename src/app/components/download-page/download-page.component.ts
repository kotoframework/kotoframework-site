import { Component, OnInit } from '@angular/core';
import {StartPageService} from "../start-page/start-page.service";

@Component({
  selector: 'dynamic-page',
  templateUrl: './download-page.component.html',
  styleUrls: ['./download-page.component.less']
})
export class DownloadPageComponent implements OnInit {

  constructor(public startPageSrv: StartPageService,) { }

  ngOnInit(): void {
  }

}
