import {Component, Inject, OnInit} from '@angular/core';
import {MonacoStandaloneCodeEditor} from "@materia-ui/ngx-monaco-editor/lib/interfaces";
import {I18nService} from "../../i18n.service";
import {analysisCreateSql, Column, removeQuotes, Table, validateSql} from "../../utils/sql";
import {Else, In, Is, when} from "when-case";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StartPageService} from "../start-page/start-page.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {FlatTreeControl} from "@angular/cdk/tree";
import {Router} from "@angular/router";
import {MatSelectionList, MatSelectionListChange} from "@angular/material/list";

export interface DialogData {
  yourName: string;
  kPojoSuffix: string;
  database: string;
  username: string;
  password: string;
  url: string;
}


@Component({
  selector: 'app-code-generator-page2',
  templateUrl: './code-generator-page2.component.html',
  styleUrls: ['./code-generator-page2.component.less']
})
export class CodeGeneratorPage2Component implements OnInit {
  yourName: string = '';
  kPojoSuffix: string = '';
  db: string = '';
  username: string = '';
  password: string = '';
  url: string = '';

  public database = 'MySQL';
  public databases = [
    'MySQL',
    'PostgreSQL',
    'Oracle',
    'SQL Server',
    'SQLite',
  ];

  constructor(public i18n: I18nService, private _snackBar: MatSnackBar, public startPageSrv: StartPageService, public http: HttpClient, public dialog: MatDialog, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  dataSource: any[] = [];

  list: {
    database: string[],
    table: string[],
    column: any[],
  } = {
    database: [],
    table: [],
    column: [],
  }

  selectedDatabase: string | null = null;
  selectedTable: string | null = null;
  current: "database" | "table" = "database";
  tableInfo: Table | null = null

  async onDatabaseClick(database: string) {
    this.selectedDatabase = database;
    this.list.table = await lastValueFrom(this.http.get("http://localhost:8096/tables?database=" + database)) as string[];
    this.current = 'table';
  }

  async onTableClick(list: MatSelectionList, table: string) {
    this.selectedTable = table;
    list.deselectAll();
    this.list.column = await lastValueFrom(this.http.get("http://localhost:8096/columns?database=" + this.selectedDatabase + "&table=" + this.selectedTable)) as any[];
    this.tableInfo = {
      tableName: this.selectedTable,
      comment: null,
      columns: this.list.column.map(column => {
        return {
          name: column.Field,
          comment: column.Comment,
          type: column.Type,
          defaultValue: column.Default || "NULL",
          unsigned: column.Type.includes("unsigned"),
          primaryKey: column.key === "PRI",
        }
      }),
    }
    this.generate();
  }

  async ngOnInit(): Promise<void> {
    this.current = 'database';
    this.yourName = window.localStorage.getItem('yourName') || '';
    this.kPojoSuffix = window.localStorage.getItem('kPojoSuffix') || '';
    this.db = window.localStorage.getItem('db') || '';
    this.username = window.localStorage.getItem('username') || '';
    this.password = window.localStorage.getItem('password') || '';
    this.url = window.localStorage.getItem('url') || 'jdbc:mysql://localhost:3306/#database#?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=GMT%2B8&allowPublicKeyRetrieval=true';
    if (this.yourName === '' || this.kPojoSuffix === '' || this.db === '' || this.username === '' || this.password === '' || this.url === '') {
      this.openDialog();
    }
    const {status} = await lastValueFrom(this.http.get("http://localhost:8096/validate")) as { status: string };
    if (status === 'ready') {
      this.list.database = await lastValueFrom(this.http.get("http://localhost:8096/databases")) as string[];
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AskDialog, {
      width: '450px',
      data: {
        yourName: this.yourName,
        kPojoSuffix: this.kPojoSuffix,
        database: this.db,
        username: this.username,
        password: this.password,
        url: this.url
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.yourName = result.yourName;
        this.kPojoSuffix = result.kPojoSuffix;
        this.db = result.database;
        this.username = result.username;
        this.password = result.password;
        this.url = result.url;
        window.localStorage.setItem('yourName', this.yourName);
        window.localStorage.setItem('kPojoSuffix', this.kPojoSuffix);
        window.localStorage.setItem('db', this.db);
        window.localStorage.setItem('username', this.username);
        window.localStorage.setItem('password', this.password);
        this.http.post("http://localhost:8096/config", result).subscribe(res => {
          this._snackBar.open(this.i18n.get("askDialog")["configSuccess"], this.i18n.get('close'), {
            duration: 2000,
          }).afterDismissed().subscribe(() => {
            this.ngOnInit().then(r => {
              this.generate();
            });
          });
        });
      }
    });
  }

  selectedIndex = 0;

  generate() {
    if (this.tableInfo === null) {
      return;
    }
    if (this.selectedIndex === 0) {
      this.generateKotlinDataClass(this.tableInfo);
    }
    if (this.selectedIndex === 1) {
      this.generateController(this.tableInfo);
    }
    if (this.selectedIndex === 2) {
      this.generateService(this.tableInfo);
    }
  }


  editors: MonacoStandaloneCodeEditor[] = [];

  editorSqlOptions = {
    language: 'sql',
    theme: 'vs-dark',
  }

  editorKotlinOptions = {
    language: 'kotlin',
    theme: 'vs-dark',
  }
  codes = [
    `CREATE TABLE IF NOT EXISTS "user"
     (
       "id"          INTEGER PRIMARY KEY AUTO_INCREMENT,
       "name"        VARCHAR(255) NOT NULL,
       "age"         INTEGER      NOT NULL,
       "email"       VARCHAR(255) NOT NULL,
       "create_time" DATETIME     NOT NULL,
       "update_time" DATETIME     NOT NULL,
       "deleted"     TINYINT      NOT NULL DEFAULT 0
     );`,
    ``,
    ``,
    ``,
    ``
  ]

  editorInit(editor: MonacoStandaloneCodeEditor, index: number) {
    this.editors[index] = editor;
  }

  generateKotlinDataClass(tableInfo: Table) {
    const {
      tableName,
      comment,
      columns,
    } = tableInfo;
    const className = tableName.replace(/_(\w)/g, (all, letter) => letter.toUpperCase()).replace(/^\w/, s => s.toUpperCase()) + this.kPojoSuffix;
    const fields = columns.filter(item => !['deleted', 'create_time', 'update_time'].includes(item.name)).map(column => this.getKotlinField(column));
    const importDefault = fields.some(item => item.defaultValue !== null);
    const lines = fields.map(item => {
      const {fieldName, fieldType, defaultValue, comment, primaryKey} = item;
      return `    ${defaultValue === null || removeQuotes(defaultValue) === 'NULL' ? '' : '@Default("' + removeQuotes(defaultValue) + '") '}val ${fieldName}: ${fieldType}? = null, //${comment || fieldName}`;
    }).join(`\n`);
    this.codes[1] = `package com.kotoframework.models

import com.kotoframework.interfaces.KPojo
import com.kotoframework.core.annotations.Table
${importDefault ? `import com.kotoframework.core.annotations.Default` : ''}

/**
 * @author ${this.yourName}
 * @date ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
 * @description  ${comment || ('KPojo for ' + tableName)}, generated by Kotoframework code generator
 */

@Table(name = "${tableName}")
data class ${className}(
${lines}
): KPojo`;
  }

  generateController(tableInfo: Table) {
    const {
      tableName,
      comment,
      columns,
    } = tableInfo;
    const className = tableName.replace(/_(\w)/g, (all, letter) => letter.toUpperCase()).replace(/^\w/, s => s.toUpperCase());
    const classNameLower = className.replace(/^\w/, s => s.toLowerCase());
    const serviceName = className + 'Service';
    const serviceVariableName = serviceName.replace(/^\w/, s => s.toLowerCase());
    const controllerName = className + 'Controller';
    const fields = columns.filter(item => !['deleted', 'create_time', 'update_time'].includes(item.name)).map(column => this.getKotlinField(column));
    this.codes[2] = `package com.kotoframework.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

/**
 * @author ${this.yourName}
 * @date ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
 * @description  ${comment || ('Controller for ' + tableName)}, generated by Kotoframework code generator
 */

@CrossOrigin
@RestController
@RequestMapping("/${tableName.split('_').join('/')}")
class ${controllerName}(@Autowired val ${serviceVariableName}: ${serviceName}) {
    @PostMapping("")
    fun create${className}(@RequestBody ${classNameLower}: ${className + this.kPojoSuffix}): Response {
        ${serviceVariableName}.create${className}(${classNameLower})
        return Response.success()
    }

    @DeleteMapping("{id}")
    fun remove${className}(@PathVariable id: Int): Response {
        ${serviceVariableName}.remove${className}(id)
        return Response.success()
    }

    @PutMapping("")
    fun update${className}(@RequestBody ${classNameLower}: ${className + this.kPojoSuffix}): Response {
        ${serviceVariableName}.update${className}(${classNameLower})
        return Response.success()
    }

    @PostMapping("list")
    fun get${className}List(
        @RequestBody ${classNameLower}: ${className + this.kPojoSuffix},
        @RequestParam("pageIndex") pageIndex: Int,
        @RequestParam("pageSize") pageSize: Int
    ): Response {
        val (list, total) = ${serviceVariableName}.query${className}List(${classNameLower}, pageIndex, pageSize)
        return Response.success(list).put("total", total)
    }

    @GetMapping("{id}")
    fun get${className}(@PathVariable id: Int): Response {
        val ${classNameLower} = ${serviceVariableName}.get${className}(id)
        return Response.success(${classNameLower})
    }

${fields.filter(item => item.fieldType === "String").map(item => {
      const fieldCapitalized = item.fieldName.replace(/^\w/, s => s.toUpperCase());
      return "    @GetMapping(\"" + item.fieldName + "/list\")\n" + "    fun get" + fieldCapitalized + "List(@RequestParam " + item.fieldName + ": String? = null): Response {\n" + "        return " + serviceVariableName + ".get" + fieldCapitalized + "List" + "(" + item.fieldName + ").put(\"" + item.fieldName + "\" to " + item.fieldName + ")\n" + "    }\n";
    }).join(`\n`)}

}
`;
  }

  generateService(tableInfo: Table) {
    const {
      tableName,
      comment,
      columns,
    } = tableInfo;
    const className = tableName.replace(/_(\w)/g, (all, letter) => letter.toUpperCase()).replace(/^\w/, s => s.toUpperCase());
    const classNameLower = className.replace(/^\w/, s => s.toLowerCase());
    const serviceName = className + 'Service';
    const fields = columns.filter(item => !['deleted', 'create_time', 'update_time'].includes(item.name)).map(column => this.getKotlinField(column));
    this.codes[3] = `package com.kotoframework.services

import org.springframework.stereotype.Service
import com.kotoframework.definition.desc
import com.kotoframework.function.create.batchExecute
import com.kotoframework.function.create.create
import com.kotoframework.function.optionList.optionList
import com.kotoframework.function.remove.remove
import com.kotoframework.function.select.select
import com.kotoframework.function.update.update
import com.kotoframework.interfaces.Patch.execute

/**
 * @author ${this.yourName}
 * @date ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
 * @description  ${comment || ('Service for ' + tableName)}, generated by Kotoframework code generator
 */

@Service
class ${serviceName} {
    fun create${className}(${classNameLower}: ${className + this.kPojoSuffix}): KotoExecuteResult {
        return create(${classNameLower}).onId().execute()
    }

    fun remove${className}(id: Int): KotoExecuteResult {
        return remove(${className + this.kPojoSuffix}(id)).soft().byId().execute()
    }

    fun update${className}(${classNameLower}: ${className + this.kPojoSuffix}): KotoExecuteResult {
        return update(${classNameLower}).byId().execute()
    }

    fun get${className}(id: Int): ${className + this.kPojoSuffix} {
        return select(${className + this.kPojoSuffix}(id)).by("id").queryForObject()
    }

    fun query${className}List(${classNameLower}: ${className + this.kPojoSuffix}, pageIndex: Int, pageSize: Int): Pair<List<Map<String, Any>>, Int> {
        return select(${classNameLower}).where().page(pageIndex, pageSize).orderBy(${classNameLower}::updateTime.desc()).query() to total
    }

${fields.filter(item => item.fieldType === "String").map(item => {
        const fieldCapitalized = item.fieldName.replace(/^\w/, s => s.toUpperCase());
        return "    fun get" + fieldCapitalized + "List(" + item.fieldName + ": String? = null): List<String> {\n" + "        return optionList(" + className + this.kPojoSuffix + "::" + item.fieldName + " to " + item.fieldName + ").queryForList()\n" + "    }\n";
      }
    ).join(`\n`)}
}
`;
  }

  getKotlinField(column: Column) {
    const {
      name,
      comment,
      type,
      defaultValue,
      unsigned,
      primaryKey,
    } = column;
    const fieldName = name.replace(/_(\w)/g, (all, letter) => letter.toUpperCase());
    const fieldType = when(type.toLowerCase(),
      Is('tinyint', () => 'Boolean'),
      In('int', 'integer', 'smallint', 'mediumint', () => unsigned ? 'Long' : 'Int'),
      Is('bigint', () => 'Long'),
      In('float', 'double', 'decimal', () => 'Double'),
      In('number', 'numeric', () => 'BigDecimal'),
      Else('String'),
    )
    return {fieldName, fieldType, defaultValue, comment, primaryKey};
  }

  share() {
    // copy url and show snackbar
    const url = window.location.href;
    const input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', url);
    document.body.appendChild(input);
    input.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
      this._snackBar.open(this.i18n.get('shared'), this.i18n.get('close'), {
        duration: 2000,
      }).afterOpened().subscribe(() => {
        document.body.removeChild(input);
      });
    }
  }

  download() {
    const code = this.codes[this.selectedIndex + 1];
    const blob = new Blob([code], {type: 'text/plain;charset=utf-8'});
    const sql = this.codes[0];
    if (!validateSql(sql)) {
      this._snackBar.open(this.i18n.get('invalidSQL'), this.i18n.get('close'), {
        duration: 2000,
      });
      return;
    }
    const tableInfo = analysisCreateSql(sql);
    const tableName = tableInfo.tableName;
    const tableObjName = tableName.replace(/_(\w)/g, (all, letter) => letter.toUpperCase()).replace(/^\w/, s => s.toUpperCase());
    const fileType = when(this.selectedIndex,
      Is(0, () => this.kPojoSuffix),
      Is(1, () => 'Controller'),
      Is(2, () => 'Service'),
    );
    const fileName = `${tableObjName}${fileType}.kt`;
    const file = new File([blob], fileName, {type: 'text/plain;charset=utf-8'});
    this.downloadFile(fileName, file);
  }

  downloadFile(fileName: string, file: File) {
    // 定义触发事件的DOM
    var aLink = document.createElement('a');
    // 判定平台
    var isMac = navigator.userAgent.indexOf('Mac OS') > -1;
    // 定义事件对象
    var evt: any = document.createEvent(isMac ? "MouseEvents" : "HTMLEvents");
    // 初始化事件
    // evt.initEvent("click", false, false);
    evt[isMac ? "initMouseEvent" : "initEvent"]("click", false, false);
    // 定义下载文件名称
    aLink.download = fileName;
    // 根据File对象创建文件 dataURL
    aLink.href = URL.createObjectURL(file);
    // 触发事件下载
    aLink.dispatchEvent(evt);
  }
}

@Component({
  selector: 'ask-dialog',
  template: `
    <h1 mat-dialog-title>{{i18n.get("askDialog")["title"]}}</h1>
    <mat-dialog-content>
      <p>{{i18n.get("askDialog")["yourName"]}}</p>
      <mat-form-field appearance="fill" style="width: 400px">
        <mat-label>{{i18n.get("askDialog")["yourName"]}}</mat-label>
        <input matInput [(ngModel)]="data.yourName">
      </mat-form-field>
      <p>{{i18n.get("askDialog")["kPojoSuffix"]}}</p>
      <mat-form-field appearance="fill" style="width: 400px">
        <mat-label>{{i18n.get("askDialog")["kPojoSuffix"]}}</mat-label>
        <input matInput [(ngModel)]="data.kPojoSuffix">
      </mat-form-field>
      <mat-form-field appearance="fill" style="width: 400px">
        <mat-label>{{i18n.get("askDialog")["url"]}}</mat-label>
        <input matInput [(ngModel)]="data.url">
      </mat-form-field>
      <mat-form-field appearance="fill" style="width: 400px">
        <mat-label>{{i18n.get("askDialog")["username"]}}</mat-label>
        <input matInput [(ngModel)]="data.username">
      </mat-form-field>
      <mat-form-field appearance="fill" style="width: 400px">
        <mat-label>{{i18n.get("askDialog")["password"]}}</mat-label>
        <input matInput [(ngModel)]="data.password">
      </mat-form-field>
      <mat-form-field appearance="fill" style="width: 400px">
        <mat-label>{{i18n.get("askDialog")["database"]}}</mat-label>
        <input matInput [(ngModel)]="data.database">
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">{{i18n.get("askDialog")["noThanks"]}}</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>{{i18n.get("askDialog")["ok"]}}</button>
    </mat-dialog-actions>
  `,
})
export class AskDialog {
  constructor(
    public dialogRef: MatDialogRef<AskDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public i18n: I18nService,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
