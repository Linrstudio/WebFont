## WebFont 生成器

<img src="https://github.com/Linrstudio/WebFont/blob/master/video.gif?raw=true" />

### WebFont 功能特色

 * 将 svg 图形，一键生成 ttf, woff, svg, eot 字体文件；
 * 字体生成管理器，方便添加/修改/删除字体符号；
 * 与 Windows 资源管理器紧密整合，在 svg 文件上点击右键，即可添加；
 * Photoshop CC/CC 2014 扩展面板，批量导出 svg 并添加到字体项目；
 * 生成的字体及 CSS3 代码，兼容 IE6+ 及所有现代浏览器；
 * 离线工具，无需联网；
 * 后续更多特性，如果您也有好建议，请反馈给我们！

### Photoshop 面板特色

* 支持固定大小——在图层名后面添加 64x 则代表输出 64x64px 大小 svg；
* 支持添加 Padding——在图层名后面添加 +20 则代表在 svg 四周添加 20px 空白；
* 支持原始布局 svg 输出，即保持内容不被水平垂直居中——在图层后面添加 _raw 即可；
* 支持固定大小居顶、居左——64x0 输出 64x64px 大小，图标居顶；0x64 输出 64x64px 大小，图标居左；

### 下载 Download

请在 [Download](https://github.com/Linrstudio/WebFont/raw/master/download/WebFont-1.5.0.zip 'Download') 下载

### 安装 Install

#### Windows

下载安装 WebFont.exe，Windows 资源管理器右键菜单中将包含“WebFont”菜单项，您可以在 svg 文件上点击右键，即可添加字体项目；

安装成功后，可以在 Photoshop 菜单“窗口” > “扩展” 中找到 WebFont。
Once installed, you can find "WebFont" at Window > Extensions > WebFont.

#### Mac OS

需下载 src 中的程式，将其拷贝到 HOME 目录的 WebFont 目录下，另外 Mac OS 需要单独安装 Node 工具。我们还在进一步完善中，敬请期待。

### 版本要求 Version requred:
* Windows 7/8/8.1/10
* Photoshop CC / Photoshop CC 2014+ (14.2+)
* Mac OS（不完整，开发中...）

### 已知问题 issue

* 生成的字体在安卓部分低端机器中有部分字符不显示（暂理解为安卓的bug。icomoon.io, iconfont.cn 生成的 ttf 同样有在安卓某些版本的 webview 中不显示的 BUG。）


### 感谢 Thanks

程序中使用的以下开源程式，并进行了部分改动。版权归原作者，并特此感谢：

* webfont-generator https://github.com/moven/webfont-generator
* ttf2eot.exe https://code.google.com/p/ttf2eot/
