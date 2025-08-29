// 第0章场景数据
import { Scene } from '../../../types/SceneTypes';
import { ArchiveManager } from '../../../components/ArchiveManager';

// 定义第0章的起始场景
const scene: Scene = {
    id: "chapter_0_scene_0",
    title: "第0章：开始",
    nodes: [
        {
            id: "start",
            elements: {
                background: "sc3.1/page1.JPG",
                name: "旁白",
                text: "夜幕降临，你走在一条空旷的街道上。街灯昏暗，四周寂静无声。"
            }
        },
        {
            id: "node1",
            elements: {
                name: "旁白",
                text: "突然，你注意到前方有一个模糊的身影。"
            }
        },
        {
            id: "node2",
            elements: {
                name: "神秘人",
                text: "你终于来了...我已等候多时。",
                sprite: {
                    center: 'mysterious_man/mysterious_man.png'
                }
            }
        },
        {
            id: "node3",
            elements: {
                name: "你",
                text: "你是谁？为什么等我？"
            }
        },
        {
            id: "node4",
            elements: {
                name: "神秘人",
                text: "我是谁并不重要。重要的是，你即将面临一个选择，而这个选择将决定你的命运。"
            }
        },
        {
            id: "node5",
            elements: {
                name: "旁白",
                text: "神秘人递给你一把古老的钥匙。"
            }
        },
        {
            id: "node6",
            elements: {
                name: "神秘人",
                text: "这把钥匙将引导你走向真相，但记住，每个选择都有其代价。"
            },
            choices: [
                {
                    text: "继续",
                    next: "take_key_1",
                    action: () => {
                        // 使用 ArchiveManager 管理物品
                        const archiveManager = ArchiveManager.getInstance();
                        archiveManager.addItem("ancient_key");
                        // 增加神秘人好感度
                        archiveManager.increaseAffection("mysterious_man", 10);
                    }
                },
                {
                    text: "拒绝钥匙",
                    next: "refuse_key"
                }
            ]
        },
        // 接过钥匙的分支
        {
            id: "take_key",
            elements: {
                name: "你",
                text: "我接受你的钥匙。"
            }
        },
        {
            id: "take_key_1",
            elements: {
                name: "神秘人",
                text: "明智的选择。记住，当你来到分岔路口时，用心去选择。"
            }
        },
        {
            id: "take_key_2",
            elements: {
                name: "旁白",
                text: "神秘人消失在夜色中，只留下你和那把冰冷的钥匙。",
                sprite: {
                    center: null
                }
            }
        },
        {
            id: "take_key_3",
            elements: {
                name: "旁白",
                text: "你将钥匙小心地收好，继续向前走去。前方的道路分成了两条，一条通向左边的古老建筑，另一条通向右边的森林。",
                background: "sc3.1/page3.0.JPG"
            },
            choices: [
                {
                    text: "走向左边的建筑",
                    next: "chapter_0_scene_1_0" // 跳转到新场景
                },
                {
                    text: "走向右边的森林",
                    next: "chapter_0_scene_1_1" // 跳转到另一个新场景
                }
            ]
        },
        // 拒绝钥匙的分支
        {
            id: "refuse_key",
            elements: {
                name: "你",
                text: "我不需要你的钥匙。"
            }
        },
        {
            id: "refuse_key_1",
            elements: {
                name: "神秘人",
                text: "你真的确定吗？一旦错过，可能再也没有机会了。"
            },
            choices: [
                {
                    text: "坚持拒绝",
                    next: "refuse_key_2"
                },
                {
                    text: "改变主意，接受钥匙",
                    next: "take_key"
                }
            ]
        },
        {
            id: "refuse_key_2",
            elements: {
                name: "神秘人",
                text: "那么，祝你好运。希望你不会后悔这个决定。"
            }
        },
        {
            id: "refuse_key_3",
            elements: {
                name: "旁白",
                text: "神秘人消失在夜色中。你继续向前走去。前方的道路分成了两条，一条通向左边的古老建筑，另一条通向右边的森林。",
                background: "sc3.1/page3.0.JPG",
                sprite: {
                    center: null
                }
            },
            choices: [
                {
                    text: "走向左边的建筑",
                    next: "chapter_0_scene_1_0" // 跳转到新场景
                },
                {
                    text: "走向右边的森林",
                    next: "chapter_0_scene_1_1" // 跳转到另一个新场景
                }
            ]
        }
    ]
};

export default scene;