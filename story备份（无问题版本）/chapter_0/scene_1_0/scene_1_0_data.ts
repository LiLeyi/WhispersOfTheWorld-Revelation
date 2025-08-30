// 第0章第1幕分支0
import { Scene } from '../../../types/SceneTypes';
import { ArchiveManager } from '../../../components/ArchiveManager';

// 定义第0章第1幕分支0
const scene: Scene = {
    id: "chapter_0_scene_1_0",
    title: "第0章：左边的道路",
    nodes: [
        {
            id: "start",
            elements: {
                background: "sc3.1/page3.0.JPG",
                name: "旁白",
                text: "你选择了左边的小路，走向那座古老的建筑。随着你的靠近，建筑的轮廓逐渐清晰起来。"
            }
        },
        {
            id: "node1",
            elements: {
                name: "旁白",
                text: "这是一座废弃的教堂，斑驳的墙壁上爬满了藤蔓。大门紧闭，但你注意到门锁已经锈蚀。"
            }
        },
        {
            id: "node2",
            elements: {
                name: "旁白",
                text: "应该如何进去呢？"
            },
            choices: [
                {
                    text: "尝试用钥匙开门",
                    next: "use_key",
                    condition: () => {
                        const archiveManager = ArchiveManager.getInstance();
                        return archiveManager.hasItem("ancient_key");
                    }
                },
                {
                    text: "寻找其他入口",
                    next: "find_another_entrance"
                }
            ],
            action: ()=>{
                const archiveManager = ArchiveManager.getInstance();
                // 可以根据需要添加其他逻辑
            }
        },
        // 有用钥匙的分支
        {
            id: "use_key",
            elements: {
                name: "旁白",
                text: "你拿出那把神秘的钥匙，插入锁孔。钥匙完美地契合了锁芯。"
            }
        },
        {
            id: "use_key_1",
            elements: {
                name: "旁白",
                text: "随着一声轻响，门锁打开了。你推开门，走进了教堂。"
            },
            next: "enter_church"
        },
        // 没有钥匙或不使用钥匙的分支
        {
            id: "find_another_entrance",
            elements: {
                name: "旁白",
                text: "你绕着教堂走了一圈，寻找其他的入口。在建筑的侧面，你发现了一扇半开的窗户。"
            }
        },
        {
            id: "find_another_entrance_1",
            elements: {
                name: "旁白",
                text: "你小心地爬进窗户，进入了教堂内部。"
            },
            next: "enter_church"
        },
        // 进入教堂
        {
            id: "enter_church",
            elements: {
                background: "sc3.1/page3.1.JPG",
                name: "旁白",
                text: "教堂内部昏暗而寂静。月光透过彩色玻璃窗洒在地面上，形成斑驳的光影。"
            },
            action: () => {
                // 记录玩家进入教堂
                const archiveManager = ArchiveManager.getInstance();
                archiveManager.setFlag("enteredChurch", true);
            }
        },
        {
            id: "enter_church_1",
            elements: {
                name: "旁白",
                text: "在祭坛前，你看到一个古老的箱子。箱子上刻着复杂的符号，与你钥匙上的符号相似。"
            },
            choices: [
                {
                    text: "检查箱子",
                    next: "examine_chest"
                },
                {
                    text: "离开教堂",
                    next: "leave_church"
                }
            ]
        },
        {
            id: "examine_chest",
            elements: {
                name: "旁白",
                text: "你走近箱子，仔细观察上面的符号。突然，箱子自动打开了，里面放着一本古老的书籍。"
            },
            condition: () => {
                const archiveManager = ArchiveManager.getInstance();
                // 只有拥有钥匙的玩家才能看到这个节点
                return archiveManager.hasItem("ancient_key");
            },
            action: () => {
                const archiveManager = ArchiveManager.getInstance();
                // 玩家获得了书籍
                archiveManager.addItem("ancient_book");
                // 增加神秘人好感度
                archiveManager.increaseAffection("mysterious_man", 5);
            }
        },
        {
            id: "examine_chest_1",
            elements: {
                name: "旁白",
                text: "你拿起书籍，封面上写着《世界的低语》。就在这时，教堂开始摇晃，你意识到这里即将坍塌。"
            },
            choices: [
                {
                    text: "带着书逃离",
                    next: "escape_with_book"
                }
            ]
        },
        {
            id: "escape_with_book",
            elements: {
                name: "旁白",
                text: "你紧紧抱着书籍冲出教堂，在身后建筑坍塌的瞬间逃了出来。你安全了，但手中多了一本神秘的书。"
            },
            next: "../scene_2/scene_2_data.ts", // 跳转到下一场景
            action: () => {
                const archiveManager = ArchiveManager.getInstance();
                // 玩家成功带着书逃离
                const escapedWithBook = archiveManager.getFlag("escapedWithBook", false);
                if (!escapedWithBook) {
                    archiveManager.setFlag("escapedWithBook", true);
                    // 增加更多好感度
                    archiveManager.increaseAffection("mysterious_man", 15);
                }
                alert("测试结束！");
            }
        },
        {
            id: "leave_church",
            elements: {
                name: "旁白",
                text: "你感到这里充满了不祥的气息，决定不冒险探索。你悄悄离开教堂，回到分岔路口。"
            },
            next: "chapter_0_scene_0#fork_in_road", // 返回分岔路口
            action: () => {
                const archiveManager = ArchiveManager.getInstance();
                // 玩家离开了教堂
                archiveManager.setFlag("leftChurch", true);
                // 减少神秘人好感度
                archiveManager.decreaseAffection("mysterious_man", 5);
                alert("测试结束！");
            }
        }
    ]
};

export default scene;