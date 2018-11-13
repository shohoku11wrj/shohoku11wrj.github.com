---
layout: post
title: 我的VIM笔记
category: Technology
tag: ['VIM']
lan: CH
---

记录下我的VIM笔记，按自己的记录时间顺序，并未严肃分类。

我不太使用插件，喜欢先熟悉原生的功能。目前使用的插件也只有 NERDTree 和 fcitx 输入法插件了。

<!--preview-->

## Sticker 1

`{,}` --> 使光标按空行上下跳跃

`Ctrl + n` --> 自动补全

`:%s/{1}/{2}/g` --> replace all <br/>
`:%s/{1}/{2}/p` --> replace current line

`ga` --> show ASCII code

`gd/gD` --> goto Definition

`:! Shell命令` --> 运行Shell命令

`<C-e/y>` --> View模式下上/下滚屏

`<C-o/i>` --> 上/下一个Vim历史位置(不仅仅是光标的)

## Sticker 2 编辑模式

View-mode == 排版autoindent

`cw` --> 替换光标所在位置到单词结尾并插入

`0` or `^` --> 移动到行首 (还有区分首char和首空格的)

`$` --> 移动到行尾

`u` --> undo <br/>
`Ctrl + r` --> redo

`:saveas <pathOfFile>` --> 另存为

`.` --> 重复上一次命令

`*N <command>` --> 重复N次命令

## Sticker 3 光标移动

`w` --> 下一个单词开头 <br/>
`e` --> 下一个单词尾 <br/>
`ge` 前一个单词尾 <br/>
`e` 前一个单词头

`{,}` --> 上/下一段 <br/>
`[{,]}` --> 区块头/尾

`W` or `E` 仅以blank为分隔移动光标

`%` 括号匹配 [] {} () <>

`*` or `#` 搜索当前光标所在单词 下 or 上 一个

`(n)f<char>` --> 移动到下第n个char的字符处 <br/>
`F` 表反方向

`Ctrl + f` --> 光标移动到最下面一行，并且置于屏幕开端位置

![vim命令图解](http://overapi.com/static/cs/vim-cheat-sheet-full.png)

## Sticker 4 块操作

块操作 <-- Step 1. `__Ctrl + v__` ; Step 2. 移动光标 `Ctrl + d / 向下 / ,,,` ; Step 3. `I` 插入多行内容 .

替换 <-- :s/<原文>/<新文>/ p or g

## Sticker 5

`:E / :He!` --> 在上方分屏打开当前目录浏览文件，可选择一个进行编辑
    [附加功能可看最上面提示行]: `-` --> 上级目录 ; `s` --> 排序 ; `D` --> 排序 ; `R` --> 改名

`:He` --> 在下方分屏，功能同上

`:Ve` --> 在左边

`:Ve!` --> 在右边

`:set scb` --> 在分屏中输入可以开启当前分屏的同步滚动

`Ctrl + w` -> `+ / - / < / > / =` --> 调整分屏大小，`=`为均分

`:qa` --> 退出全部

`:wqa` --> 保存并退出全部

连按两下`Shift + z` == `wq`

## Sticker 6 Tab 分页

`<C-h> / :bprevious` --> previous file in buffer <br/>
`<C-l> / :bnext`  --> next file in buffer

`:tabnew` --> 新建，可加文件名

`:tabm [0~9]` --> 摆放tab位置

`:Te` --> 显示目录数，选择文件在新Tab中打开

`gt` --> 右边Tab <br/>
`gT` --> 左边Tab <br/>
`{i}gt` --> 可指定跳过Tab数量

`:tabs` --> 看Tab的情况，类似`:ls`

`tabclose {i}` --> 指定关闭某个Tab

`vim -p [file1] [file2] ...` --> Shell下直接以Tab方式打开文件

`:bufdo tab split` --> 把buffer下的文件全部展开成Tab显示，buffer即`ls`命令所显示的当前编辑文件队列

## Sticker 7 Session

保存会话，类似chrome退出时保存打开的tabs；下次启动可以继续这些tabs。

`:mksession` --> 保存到文件 ~/.mysession.vim
  加`!`强制覆盖
  下次打开 <-- `$ vim -S ~/.mysession.vim`

`:r!data` --> 插入日期

## Sticker 8 Visual模式下的编辑

`I` --> 行首插入 <br/>
`A` --> 行末插入 <br/>

`C` --> 删除直到行末并插入 <br/>
`s` --> 删除当前字符并插入 <br/>
`S` --> 删除整行并插入

`ci"` --> 删除""中所有内容并插入，如果用`ci{`则要在block里面用

`yaB` --> 将当前所在代码块{}复制到默认register

`gUiw` --> 将当前word变为全__大__写 <br/>
`guiw` --> 将当前word变为全__小__写

`cw` --> 从当前位置删除到word末尾并插入

`yi"` `yi(` `yi<` `yi{` `yi[` --> 复制block里面的内容

## Sticker 9 书签

`m[a-z]` --> 记书签 <br/>
``[a-z]` --> 读书签 <br/>
`'[a-z]` --> 读书签，行首

`:marks` --> 书签列表

书签的__小写__字母: 用于同一文件内 <br/>
      __大写__字母: 用于编辑中的各个文件之间

`'0` --> 回到前1次编辑文档离开前的最后位置 <br/>
__'`__ --> 回到前2次编辑文档离开前的最后位置 <br/>
依次类推，Vim自动记录； *其实是.viminfo的功能 <br/>
__前次__指前次启动的Vim

## Sticker 10 Macro

`qa` --> 将宏录制于a，并开始 <br/>
  再`q` --> 结束录制宏

`@a` --> 调用宏a <br/>
  `10@a` --> 连续调用10次宏a

`@@` --> 执行上一次宏

`di"` --> 光标在""之间，删 <br/>
`yi(` --> 光标在()之间，复制 <br/>
`vi[` --> 光标在[]之间，选中

`dtx` --> 删除直到字符x <br/>
`ytx` --> 复制直到字符x

## Sticker 11 fold

`set fdm=[mannual, indent, marker, ...]` --> 设置fold模式

`zc, zC, zo, zO` --> 匹配折叠展开 (要预先设置过折叠会自动记录)

`zf%` --> 手动折叠 (在括号处用zf%，快捷)

`mkview` --> 保存折叠方案 <br/>
`loadview` --> 加载折叠方案

`zj, zk` --> 根据折叠上下移动

`{% raw %}{{{ 和 }}}{% endraw %}` <-- 系统默认折叠标记，可加 # //注释掉

`zd, zD` --> 删除折叠记录

`zE` --> 除去所有折叠

## Sticker 12 Command

`:Search **/<file-name-pattern>.file-type` --> 遍历搜索该目录下的文件，需要加上后缀

## Reference

<blockquote>
1. <a href="http://beiyuu.com/git-vim-tutorial/">Git时代的VIM不完全使用教程</a> <br/>
</blockquote>
