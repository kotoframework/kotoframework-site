import {Component, OnInit} from '@angular/core';
import {MonacoStandaloneCodeEditor} from "@materia-ui/ngx-monaco-editor/lib/interfaces";
import {I18nService} from "../../i18n.service";
import {analysisCreateSql, removeQuotes, Table, validateSql} from "../../utils/sql";
import {Else, In, Is, when} from "when-case";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StartPageService} from "../start-page/start-page.service";

@Component({
  selector: 'app-code-generator-page',
  templateUrl: './code-generator-page.component.html',
  styleUrls: ['./code-generator-page.component.less']
})
export class CodeGeneratorPageComponent implements OnInit {
  public database = 'MySQL';
  public databases = [
    'MySQL',
    'PostgreSQL',
    'Oracle',
    'SQL Server',
    'SQLite',
  ];

  constructor(public i18n: I18nService, private _snackBar: MatSnackBar, public startPageSrv: StartPageService) {
  }

  ngOnInit(): void {
  }

  selectedIndex = 0;

  generate() {
    const sql = this.codes[0];
    if (!validateSql(sql)) {
      this._snackBar.open(this.i18n.get('invalidSQL'), this.i18n.get('close'), {
        duration: 2000,
      });
      return;
    }
    const tableInfo = analysisCreateSql(sql);
    if (this.selectedIndex === 0) {
      this.generateKotlinDataClass(tableInfo);
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
     );`, `package xxx.xxx.xxx
import com.kotoframework.interfaces.KPojo
data class User(
    val id: Int? = null,
    val name: String? = null,
    val age: Int? = null,
    val email: String? = null,
    val createTime: String? = null,
    val updateTime: String? = null,
): KPojo`,
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
    const className = tableName.replace(/_(\w)/g, (all, letter) => letter.toUpperCase()).replace(/^\w/, s => s.toUpperCase());
    let importDefault = false;
    const fields = columns.filter(item => !['deleted', 'create_time', 'update_time'].includes(item.name)).map(column => {
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
      if (defaultValue !== null) {
        importDefault = true;
      }
      const fieldComment = comment ? `// ${comment}` : '';
      return `    ${defaultValue === null ? '' : '@Default("' + removeQuotes(defaultValue) + '") '}val ${fieldName}: ${fieldType}? = null, ${fieldComment}`;
    }).join(`
`);
    this.codes[1] = `package com.kotoframework.models

import com.kotoframework.interfaces.KPojo
import com.kotoframework.core.annotations.Table
${importDefault ? `import com.kotoframework.core.annotations.Default` : ''}

@Table(name = "${tableName}")
data class ${className}( // ${comment || tableName}
${fields}
): KPojo`;
  }
}
