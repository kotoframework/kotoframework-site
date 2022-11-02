import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class I18nService {
  constructor() {
  }

  currentLanguage: "zh-CN" | "en-US" = "en-US";

  get(key: string): any {
    return this.dictionary[this.currentLanguage][key];
  }

  dictionary: {
    "zh-CN": any;
    "en-US": any;
  } = {
    'zh-CN': {
      home: "首页",
      quickStart: "快速开始",
      docs: "文档",
      api: "Api",
      download: "下载",
      codeGenerator: "在线代码生成器",
      introduce: "Koto 是一个数据持久层框架，设计用于 Kotlin，轻量级，现代化，功能强大。",
      banners: [
        '欢迎使用 Koto 框架。',
        '一个数据持久层框架',
        '设计用于 Kotlin，轻量级，现代化，功能强大',
        '点击快速开始！[y/n]'
      ],
      codeComments: [
        "创建数据，若有id相同则根据id更新数据",
        "查询User表",
        "批量插入，自动更新create_time和update_time",
        "软删除"
      ],
      paragraphs: [{
        title: "一个数据持久层框架",
        contents: [
          "Koto 为 Kotlin 提供了一个简单的数据持久层框架，它可以让你在 Kotlin 中使用 SQL 语句，而不是使用原生的 JDBC",
          "koto设计了简洁的操作实体和api，大多数情况下仅需一行，即可对数据库表完成复杂的逻辑功能",
          "koto不满足于仅仅使用kotlin链式操作书写SQL，koto可以根据传入实体自动生成Where条件，自动为数据添加创建、更新时间，自动生成软删除Where条件",
          "提供软删除、日志、存在则更新/不存在则新增...等功能，一行代码即可开启"
        ]
      },
        {
          title: "轻量级，高性能，无侵入性，配置简单",
          contents: [
            "koto不需要复杂的配置，只需要在pom.xml或build.gradle中引入koto依赖，即可使用",
            "koto几乎没有代码入侵，框架本身也不需要创建单独的实体类，只需要让原有的Pojo类继承KPojo，即可使用完整的orm功能",
            "koto通过定义高阶函数、泛型和扩展函数省去复杂定义类和Mapper，专为kotlin定制，深度开发Api，简单上手",
            "koto支持kotlin的协程，可以让你的数据库操作更加高效"
          ]
        },
        {
          title: "简单，但“不简单”",
          contents: [
            "koto-core只有200kb大小，除了kotlin-reflect外不需要任何额外依赖",
            "支持大多数常见的数据库，支持分页、联表、子查询、自定义SQL、多数据源、动态数据源、批量删除/更新/插入、数据库事务",
            "koto提供一个采用基础jdbc编写的引擎，若您的项目本身已经使用了spring、jdbi等将框架，您也可以通过安装插件使用spring、jdbi等框架自带的引擎，koto可以与已有框架完美融合"
          ]
        }
      ],
      "database": "数据库类型",
      "invalidSQL": "无效的SQL",
      "close": "关闭",
      "askDialog": {
        "title": "Hi, 在生成代码之前，你需要填写一些信息",
        "yourName": "你的名字",
        "kPojoSuffix": "KPojo后缀",
        "url": "数据库连接地址",
        "username": "数据库用户名",
        "password": "数据库密码",
        "database": "默认数据库名",
        "ok": "确定",
        "noThanks": "不用了，谢谢",
        "configSuccess": "配置成功",
      },
      "shared": "网址已经复制到剪贴板，快去分享给你的朋友吧！",
      "networkError": "网络连接错误！"
    },
    'en-US': {
      home: "Home",
      quickStart: "Quick Start",
      docs: "Docs",
      api: "Api",
      download: "Download",
      codeGenerator: "Online Code Generator",
      introduce: "Koto is a data persistence framework designed for Kotlin, lightweight, modern, and powerful.",
      banners: [
        'Welcome to Koto Framework.',
        'A data persistence layer framework',
        'Designed for Kotlin，Lightweight, modern and powerful',
        'Click to Quick Start![y/n]'
      ],
      codeComments: [
        "Create data, if there is an id, update the data according to the id",
        "Query User table",
        "Batch insert, automatically update create_time and update_time",
        "Soft delete"
      ],
      paragraphs: [{
        title: "A data persistence layer framework",
        contents: [
          "Koto provides a simple data persistence layer framework for Kotlin, which allows you to use SQL statements in Kotlin instead of native JDBC",
          "koto designed concise operation entity and api, in most cases only need one line, can complete complex logical function of database table",
          "koto is not satisfied with only using kotlin chain operation to write SQL, koto can automatically generate Where conditions according to the incoming entity, automatically add create, update time to the data, and automatically generate soft delete Where conditions",
          "Provide soft deletion, log, exist then update / not exist then add... etc. functions, one line of code can open"
        ]
      },
        {
          title: "Lightweight, high performance, non-intrusive, simple configuration",
          contents: [
            "koto does not need complex configuration, just need to refer to the koto dependency in pom.xml or build.gradle, you can use it",
            "koto almost has no code intrusion, the framework itself does not need to create a separate entity class, just need to let the original Pojo class inherit KPojo, you can use the full orm function",
            "koto defines high-order functions, generics and extension functions to save complex class and Mapper definitions, and is specially designed for kotlin, deeply developed Api, and easy to get started",
            "koto supports kotlin's coroutine, which can make your database operation more efficient"
          ]
        },
        {
          title: "Simple, but \"not simple\"",
          contents: [
            "koto-core is only 200kb in size, and does not require any additional dependencies other than kotlin-reflect",
            "Supports most common databases, supports paging, joint tables, subqueries, custom SQL, multi-datasource, dynamic datasource, batch deletion / update / insertion, database transaction",
            "koto provides an engine written in basic jdbc, if your project itself uses spring, jdbi and other frameworks, you can also use the engine provided by spring, jdbi and other frameworks by installing the plug-in, and koto can perfectly integrate with existing frameworks"
          ]
        }
      ],
      "database": "Database type",
      "invalidSQL": "Invalid SQL",
      "close": "Close",
      "askDialog": {
        "title": "Hi, before generating code, you need to fill in some information",
        "yourName": "Your name",
        "kPojoSuffix": "KPojo suffix",
        "url": "URL",
        "username": "Username",
        "password": "Password",
        "database": "Database",
        "ok": "OK",
        "noThanks": "No thanks",
        "configSuccess": "Config success",
      },
      "shared": "The URL has been copied to the clipboard, go and share it with your friends!",
      "networkError": "Network error!"
    }
  }
}
