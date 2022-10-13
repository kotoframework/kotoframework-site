export interface Column {
  name: string,
  comment: string | null,
  type: string,
  defaultValue: string | null,
  unsigned: boolean,
  primaryKey: boolean
}

export interface Table {
  tableName: string,
  comment: string | null,
  columns: Column[]
}

//If the table creation statement is valid, take out the table name, field name, type, description, and primary key
export function analysisCreateSql(sql: string): Table {
  sql = sql.trim();
  let sqlBig = sql.toUpperCase();//大写sql，用来定位，取值还是取原sql
  let tableName = removeQuotes(sql.substring(sqlBig.indexOf("TABLE") + 5, sqlBig.indexOf("(")).replace("IF NOT EXISTS ", "").trim());//表名
  let comment = analysis_sql_annotation(sql.substring(sqlBig.lastIndexOf("COMMENT")));//表注释
  let fieldSql = cut_start_end_out(sql, "(", ")").split(",");
  let columns: Column[] = [];//表字段
  let primaryKey = "";
  fieldSql.forEach(sql => {
    sql = sql.trim().toUpperCase();
    if (sql.startsWith("PRIMARY") && sql.indexOf("KEY") >= 0) {
      primaryKey = sql;
    }
  });
  fieldSql.forEach(sql => {
    sql = sql.trim();
    if (sql.toUpperCase().startsWith("PRIMARY KEY")) return;
    let obj: Column = {name: "", type: "", comment: null, defaultValue: null, unsigned: false, primaryKey: false};//字段对象
    //字段名
    if (sql.startsWith("`")) {
      sql = sql.substring(1);
      obj.name = removeQuotes(sql.substring(0, sql.indexOf("`")));
    } else {
      obj.name = removeQuotes(sql.substring(0, sql.indexOf(" ")));
    }

    sql = sql.substring(sql.indexOf(obj.name) + obj.name.length + 1).trim();

    //字段注释
    let upperCasedSql = sql.toUpperCase();
    let p = upperCasedSql.indexOf("COMMENT");
    if (p > -1) {
      obj.comment = analysis_sql_annotation(sql.substring(p));
      sql = sql.substring(0, p).trim();
    } else {
      obj.comment = obj.name;
    }
    //字段类型
    obj.type = sql.substring(0, sql.indexOf(" ")).split("(")[0].trim();

    //字段是否为无符号
    obj.unsigned = upperCasedSql.includes("UNSIGNED");
    //字段默认值
    p = upperCasedSql.indexOf("DEFAULT");
    if (p > -1) {
      obj.defaultValue = sql.substring(p + 7).trim();
    }
    //主键
    obj.primaryKey = primaryKey.indexOf(obj.name.toUpperCase()) >= 0;
    columns[columns.length] = obj;
  });

  return {
    tableName,
    comment,
    columns
  }
}

/**
 * 从一段SQL语句中解析出注释，sql格式如下：
 * @param sql  格式   COMMENT='注释'
 * @returns {string}
 */
function analysis_sql_annotation(sql: string): string {
  return sql.substring(sql.indexOf("'") + 1, sql.lastIndexOf("'"));
}

/**
 * 截取字符串中间的内容
 * @param code   需要截取的内容
 * @param start   开始截取点（不包含）
 * @param end    结束截取点（不包含）
 * @returns {string}
 */
function cut_start_end_out(code: string, start: string, end: string): string {
  let start_p = 0;
  let end_p = code.length;
  if (start != null) {
    start_p = code.indexOf(start);
    if (start_p < 0) {
      start_p = 0;
    }
    start_p = start_p + start.length;
  }
  if (end != null) {
    end_p = code.lastIndexOf(end);
    if (end_p < 0) {
      end_p = code.length;
    }
  }
  return code.substring(start_p, end_p);
}

//Determine whether the table creation statement is legal
export function validateSql(sql: string) {
  const sqls = sql.split(';');
  for (let i = 0; i < sqls.length; i++) {
    const sql = sqls[i];
    if (sql.trim().length === 0) {
      continue;
    }
    if (!sql.trim().toLowerCase().startsWith('create table')) {
      return false;
    }
  }
  return true;
}

export function removeQuotes(str: string) {
  return str.filter((item, index) => {
    if (index !== 0 && index !== str.length - 1) return true;
    return !(item === "`" || item === "'" || item === '"');

  })
}
