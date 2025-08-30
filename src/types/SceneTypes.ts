// 场景元素接口
export interface SceneElement {
    background?: string | null;         // 背景图片路径。这个路径的根目录是src/assets/images/background/
    soundEffect?: string | null;        // 还未实现。音效，进节点播放一次
    bgm?: string | null;                // 还未实现。背景音乐路径。这个路径的根目录是src/assets/audio/
    name?: string | null;               // 对话框左上角显示名称。填旁白不会显示
    text: string;                       // 对话内容
    sprite?: {                          // 角色立绘
        left?: string | null;           // 左侧角色立绘，不设置会沿用之前的立绘，清除就填null
        right?: string | null;          // 右侧角色立绘，不设置会沿用之前的立绘，清除就填null
        center?: string | null;         // 中间角色立绘，不设置会沿用之前的立绘，清除就填null
    } | null;
}

// 选项接口
export interface Choice {
    text: string;                       // 选项的文字
    next?: string | SceneNode;          // 选择此选项跳转的场景
    condition?: () => boolean;          // 选项的出现条件
    action?: () => void;                // 选项点击后执行的函数
}

// 场景节点接口
export interface SceneNode {
    id: string;                         // 节点ID
    elements: SceneElement;             // 场景元素，例如对话框、立绘一类
    choices?: Choice[];                 // 选项的数组
    next?: string;                      // 下一个节点或章节的id。不填的话默认进行到节点数组下一个元素
    autoNext?: boolean;                 // 是否自动跳转
    condition?: () => boolean;          // 节点条件。未达成条件则直接跳过这个节点
    actionCondition?: () => boolean;    // 执行action的条件。未设置就是无条件
    action?: () => void;                // 节点动作。进入节点时执行的动作
}

// 场景接口
export interface Scene {
    id: string;                         // 场景ID
    title: string;                      // 场景标题
    nodes: SceneNode[];
}