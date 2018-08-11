# vibo

---

> 这里准备记录vibo的想法，开发，优化与发=布=的全过程

### 我需要什么

我\=要\=一个~博客~。

本**地用typora**编辑markdown，由*工具*生成静态html，发布到github上，通过github.io/blog访问。

### 初步想法

hexo是一个不\*错\*的解决方案。但是为什么不用hexo？理由如下

- hexo是一个相当复杂的工具，有很多的配置项。但其本身，只是一个工具。我花时间去搞清楚hexo到底是怎么回事，不会带给我任何成长。
- hexo的功能太多，我只想写一个博客
- hexo的主题大多数不符合我的审美，NexT看着还ok，但是太多人用了。而且NexT就一个主题而已，搞得那么复杂？
- 自己开发一个主题？那我为什么不写一个轻量版的hexo呢

其他博客源：

- 主题不可定制，丑且千篇一律

### 我在做什么

一个轻量版的hexo，其功能包括：

- 输入markdown字符串
- 通过中间件对字符串进行流式处理
- 第一个中间件是markdown -> html
- 通过命令行编译，本地预览，部署到github相应仓库的相应分支
- PWA支持

### 技术想法

- markdwon编译成html：[marked](https://marked.js.org/#/README.md)。
- 中间件的处理方式：
- ```
  const app = {
      middleware: [],
      init: function(ctx){
          //...
      },
      use: function(fn){
          this.middleware.push(fn)
      },
      start: function(ctx){
          const reducer = (next, fn) => () => fn(ctx, next)
          this.middleware.reduceRight(reducer, this.init(ctx))
      }
  }
  ```

```
var a = 3*4*5
```
- child_process API执行shell脚本
- 暂时不用模版引擎，没有想到痛点
- 主题应该是重新定义模版html与css
- 渲染函数应该作为init函数
- 主题开发方式：id固定的html+css，以及json配置文件（负责管理预设模块是否显示的）
- api
- pwa

### 开发

- [github api](https://developer.github.com/v3/)
- 用promise代替中间件

### todo

1. 记录md源文件的md5值，来确定每次编译的文件
2. GitHub api
3. init.js
4. 写第一个主题
5. 完善配置文件

### test
- nihao
    - nihao
    - nihao
- nihao 
- > ddddd
  > ddddddd
  > dddddd
  > dddddd

| title | title | title |
| :---: | :---: | :---: |
| c     |   c   |     c |
| c     |   c   |     c |

---more---
this is single `hello`
```
hello world
```