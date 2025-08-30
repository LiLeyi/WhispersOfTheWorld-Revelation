# WhispersOfTheWorld-Revelation

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



## 剧情编写文档

### 文件结构

剧情数据全部放在src/story文件夹中。SceneRegistry.ts负责注册所有场景（每添加一幕就要在这里面添加一行对应代码）。

每一章放在一个文件夹中，文件夹名统一采用"chapter_" + 序号，例如"chapter_0"、"chapter_1"。

每一章的文件中，每一幕需要开一个文件夹，文件夹名统一采用"scene_" + 序号，或者"scene_" + 序号 + 序号，例如"scene_0"、"scene_1_1"。每一幕的文件中放一个ts文件，名字为文件夹名+"_data.ts"。

### 幕数据格式

每一幕的数据需要严格遵从以下模式：

```typescript
// 第x章场景数据
import { Scene } from '../../../types/SceneTypes';
import { ArchiveManager } from '../../../components/ArchiveManager';

// 定义第x章的起始场景
const scene: Scene = {
    id: "chapter_x_scene_y",       // 或 "chapter_x_scene_y_z"
    title: "这一幕的名称",          // 幕标题
    nodes: [
      // 节点...
    ]
};

export default scene;
```

nodes数组里存储每一个节点的数据（每一个节点都有对话呀什么的）。对于每一个节点，接口查看[这里](src/types/SceneTypes.ts)的SceneNode，注释都写出了配置的作用。也可以把已有代码作为参考。



## 注意事项（大家在编写代码过程中可以在这边加）

* 新开游戏时一定要在链接后面带参数new_game=true



## 剧情可视化编辑器

### Python虚拟环境配置及依赖安装

1. 进入editor目录：cd editor
2. 创建虚拟环境：python -m venv story-editor-env
3. 激活虚拟环境：story-editor-env\Scripts\activate   （mac and linux：source story-editor-env/bin/activate）
4. 安装依赖：pip install -r requirements.txt

### 运行

使用创建的虚拟环境中的解释器运行main.py。

也可以通过如下命令：

1. 进入editor目录：cd editor
2. 激活虚拟环境：story-editor-env\Scripts\python.exe main.py
3. 运行：python main.py（若已激活虚拟环境，则可以直接这一步）

### 功能说明

目前只完成了可视化，修改、添加节点等还未完成，敬请期待。