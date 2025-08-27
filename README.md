# 项目

## 项目结构（src中内容）

为了防止项目变成屎山，以及让协作的各位能懂他人写的部分，请按照项目结构存放文件。以及代码多写点注释，尽量在每个函数前写一个多行注释（写出函数作用就行，如果函数输入和输出比较复杂，需要进行相关阐述）

* assets：放静态资源

  * images：图片
  * audio：音频

* pages：页面的html和ts

  * about\_us：关于我们

    * about\_us.html：关于我们的导航页面
    * about\_us\_detail：这里面放每个人的介绍页面及脚本、css等，每个人一个文件夹

  * archive\_page：存档页面，删除、选择存档等功能
* components：复用的组件到时放在这里
* utils：工具类
* index.html：主页面（先显示登录页面，登录完后为主页面）
* index.ts：主页面脚本

## 环境配置

### 配置步骤

1. 先下载nodejs（这个网上教程比较多）
2. 在项目根目录里打开终端，输入npm install（这一步安装package中的所有依赖包，包括webpack和typescript等）
3. 输入npm run dev（这一步会启动webpack，并监听文件变化，自动编译。也就是说在你对项目有改动后，会自动重新编译，然后显示。若有时改动了未显示，刷新页面，还是不显示那就关闭终端，重新运行这一条命令即可）
4. 在浏览器中打开 http://localhost:8080/

安装过程有问题可以找lly

### 有关库解释

以下是用到的一些库的解释（在上面第二步中安装的）：

* webpack：打包工具。可以在脚本中使用import，而不是直接在网页中用标签引入js文件（会导致很多的冲突、加载顺序问题）。有个这个工具，typescript也可以循环导入（例如两个文件A和B，A中引入B，B中引入A）。
* typescript：ts是js的超集，ts可以识别js中的错误，并给出提示（方便调试）。静态类型，方便写代码时候检查错误以及查看变量类型。**注：ts有些写法和js不同，可以问ai或者找lly**。

### 网页构建步骤

平常测试采用npm run dev。但最终项目导出时，使用npm run build，然后会在项目根目录生成dist文件夹，这里面为最终的文件，打开index.js即可

### 根目录中有关配置文件说明

以下列出的这些文件基本以后都很少改动，作用了解即可：

* .gitignore：git忽略文件。有些文件，例如node_modules，我们不希望被git管理，所以需要添加到.gitignore中。因为这些文件过大，而github有大小限制（以后我们是否要把assets忽略也待考虑）
* package.json：项目依赖包版本信息，例如我们要用到、下载的webpack、ts这些都记录在里面。还有项目的构建、监视指令也写在这里的
* tsconfig：typescript的配置文件，里面有ts的编译选项，比如编译成es5、es6、es2017等等，以及编译时是否生成sourcemap等等
* webpack.config.js：webpack的配置文件，里面有webpack的配置项，比如入口文件、输出文件、loader、plugin等等