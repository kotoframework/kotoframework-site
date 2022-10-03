import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren, ViewRef
} from '@angular/core';
import {StartPageService} from "./start-page.service";
import {CommonModule} from "@angular/common";
import {MonacoEditorModule} from "@materia-ui/ngx-monaco-editor";
import {FormsModule} from "@angular/forms";
import {MonacoStandaloneCodeEditor} from "@materia-ui/ngx-monaco-editor/lib/interfaces";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {FlexibleConnectedPositionStrategy, Overlay, OverlayConfig} from "@angular/cdk/overlay";
import {MatIconModule} from "@angular/material/icon";
import {I18nService} from "../../i18n.service";

@Component({
  selector: 'start-page',
  standalone: true,
  imports: [CommonModule, MonacoEditorModule, FormsModule, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.less']
})
export class StartPageComponent implements OnInit, AfterViewInit {
  banner: string | null = null;
  prefix: string | null = '';

  next() {
    this.banner = null;
    setTimeout(() => {
      this.banner = this.i18n.get('banners')[this.startPageSrv.step++];
      if (this.startPageSrv.step >= 1) {
        this.prefix = '$ What is Koto -> '
      }
      if (this.startPageSrv.step === 3) {
        this.prefix = '$ Why Koto -> '
      }
      if (this.startPageSrv.step === 4) {
        this.prefix = null;
      }
    }, 50);
  }

  constructor(public startPageSrv: StartPageService, public i18n: I18nService) {
  }

  ngOnInit(): void {
    this.next();
  }

  @HostListener("window:keydown", ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (this.editors.find(editor => editor.hasTextFocus()) || this.startPageSrv.step >= 5) {
      return;
    }
    if (event.key === 'Enter' || event.key.toUpperCase() === 'Y') {
      this.next();
    }
    if (event.key === 'n') {
      this.startPageSrv.step = 5;
    }
  }


  editorOptions = {theme: 'vs-dark', language: 'kotlin'};

  get code1(): string {
    return `// ${this.i18n.get('codeComments')[0]}
create(user).onId().execute()

// ${this.i18n.get('codeComments')[1]}
val list = select<User>().queryForList()
// list: List<User>

val user = select(User(id = 1))
    .where()
    .queryForObjectOrNull()
// user: User?

val affectRows = update(user).byId().execute()
// affectRows: Int

remove(user).execute()`
  }


  get code2(): string {
    return `@Table("tb_user")
@SoftDelete(enable = true, column = "deleted")
data class User(
    val id: Int? = null,
    val username: String? = null,
    @DateTimeFormat(pattern="YYYY-MM-DD") val registerDate: String? = null,
    @Default(value = "0")
    val age: Int? = null,
) : KPojo

fun getUserName(id: Int): String?{
    return from<User>{
        it.select(it::username).by(it::id to id)
    }.queryForObjectOrNull()
  }`
  }

  get code3(): string {
    return `fun batchCreateOrUpdate(users: List<User>): Unit{
        users.map {
            create(it).onId()
        }.batchExecute() // ${this.i18n.get('codeComments')[2]}
}

fun softDeleteByUserName(userName: String): Unit{
    remove<User>()
        .soft()
        .where{ it::userName.eq(userName) } // 或 .by(it::userName to userName)
        .execute() // ${this.i18n.get('codeComments')[3]}
}`
  }

  editors: MonacoStandaloneCodeEditor[] = [];

  editorInit(editor: MonacoStandaloneCodeEditor) {
    this.editors.push(editor);
  }

  ngAfterViewInit(): void {
  }

  calcStrLength(str: string): string {
    // if char is chinese, length is 1em, else is 8.5px, return like "calc(1em * 10 + 8.5px * 12)"
    let length = 0;

    function isChinese(str: string) {
      const reg = /[\u4e00-\u9fa5]/;
      return reg.test(str);
    }

    function isFullWidthCharacters(str: string) {
      const reg = /[\uFF00-\uFFFF]/;
      return reg.test(str);
    }

    for (let i = 0; i < str.length; i++) {
      if (isChinese(str[i]) || isFullWidthCharacters(str[i])) {
        length += 1;
      }
    }
    return `calc(1em * ${length} + 8.5px * ${str.length - length})`
  }
}
