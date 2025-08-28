// 第0章第1幕分支1
import { Scene } from '../../../types/SceneTypes';
import gameScene from '../../../pages/game_scenes/game_scenes';
import { ArchiveManager } from '../../../components/ArchiveManager';

// 定义第0章第1幕分支1
const chapter0_scene_1_1: Scene = {
    id: "chapter_0_scene_1_1",
    title: "第0章：右边的道路",
    nodes: [
        {
            id: "start",
            elements: {
                background: "sc3.1/page4.0.JPG",
                name: "旁白",
                text: "你选择了右边的小路，走进了黑暗之中。四周越来越暗，你只能依靠微弱的月光前行。"
            }
        },
        {
            id: "node1",
            elements: {
                name: "旁白",
                text: "突然，你听到了脚步声，似乎有什么东西在跟踪你。"
            }
        },
        {
            id: "node2",
            elements: {
                name: "旁白",
                text: "你停下脚步，仔细聆听。脚步声也停了。你继续走，脚步声也继续。"
            },
            choices: [
                {
                    text: "转身面对跟踪者",
                    next: "face_stalker"
                },
                {
                    text: "加快脚步",
                    next: "hurry_up"
                },
                {
                    text: "躲起来",
                    next: "hide"
                }
            ]
        },
        // 转身面对跟踪者
        {
            id: "face_stalker",
            elements: {
                name: "旁白",
                text: "你猛然转身，看到一双绿色的眼睛在黑暗中闪闪发光。那是一只巨大的狼。"
            },
            next: "wolf_encounter"
        },
        {
            id: "hurry_up",
            elements: {
                name: "旁白",
                text: "你加快脚步，但脚步声也加快了。你开始奔跑，身后的脚步声紧追不舍。"
            },
            next: "running_from_wolf"
        },
        {
            id: "hide",
            elements: {
                name: "旁白",
                text: "你躲在一棵大树后，屏住呼吸。脚步声越来越近，然后停下了。"
            },
            next: "hiding_from_wolf"
        },
        // 面对狼
        {
            id: "wolf_encounter",
            elements: {
                name: "狼",
                text: "嗷呜！"
            },
            next: "wolf_dialogue"
        },
        {
            id: "wolf_dialogue",
            elements: {
                name: "旁白",
                text: "令人惊讶的是，这只狼居然开口说话了。"
            },
            choices: [
                {
                    text: "询问狼的目的",
                    next: "ask_wolf_purpose"
                },
                {
                    text: "试图逃跑",
                    next: "try_to_escape_wolf"
                }
            ]
        },
        {
            id: "ask_wolf_purpose",
            elements: {
                name: "你",
                text: "你...你会说话？你想要什么？"
            },
            next: "wolf_explanation"
        },
        {
            id: "wolf_explanation",
            elements: {
                name: "狼",
                text: "我一直在等你，就像那个给你钥匙的人一样。我是这片森林的守护者。"
            },
            action: () => {
                // 记录遇到狼
                const archiveManager = ArchiveManager.getInstance();
                archiveManager.setFlag("metWolf", true);
                // 增加狼的好感度
                archiveManager.increaseAffection("wolf", 10);
            }
        },
        {
            id: "wolf_explanation_1",
            elements: {
                name: "狼",
                text: "你手中的钥匙不仅是一把开门的工具，它还承载着古老的力量。但力量总是伴随着危险。"
            },
            next: "wolf_choice"
        },
        {
            id: "try_to_escape_wolf",
            elements: {
                name: "旁白",
                text: "你试图逃跑，但狼的速度比你快得多。它轻松地拦住了你。"
            },
            next: "wolf_dialogue"
        },
        // 加快速度
        {
            id: "running_from_wolf",
            elements: {
                name: "旁白",
                text: "你越跑越快，但那只野兽似乎总是在你身后不远处。"
            },
            next: "caught_by_wolf"
        },
        {
            id: "caught_by_wolf",
            elements: {
                name: "旁白",
                text: "突然，你被一根树枝绊倒了。在你挣扎着想要站起来时，狼已经站在了你面前。"
            },
            next: "wolf_encounter"
        },
        // 躲藏
        {
            id: "hiding_from_wolf",
            elements: {
                name: "旁白",
                text: "过了一会儿，脚步声渐渐远去。你小心翼翼地从藏身之处出来。"
            },
            next: "after_hiding"
        },
        {
            id: "after_hiding",
            elements: {
                name: "旁白",
                text: "你环顾四周，确认安全后继续前行。不久，你来到了一片开阔地。"
            },
            action: () => {
                // 记录躲藏事件
                const archiveManager = ArchiveManager.getInstance();
                archiveManager.setFlag("hidFromWolf", true);
                // 减少狼的好感度
                archiveManager.decreaseAffection("wolf", 5);
            }
        },
        // 狼的选择
        {
            id: "wolf_choice",
            elements: {
                name: "狼",
                text: "现在，你必须做出选择。是愿意接受我的帮助，还是继续独自前行？"
            },
            choices: [
                {
                    text: "接受狼的帮助",
                    next: "accept_wolf_help"
                },
                {
                    text: "拒绝狼的帮助",
                    next: "reject_wolf_help"
                }
            ]
        },
        {
            id: "accept_wolf_help",
            elements: {
                name: "你",
                text: "我愿意接受你的帮助。"
            },
            action: () => {
                // 玩家接受了狼的帮助
                const archiveManager = ArchiveManager.getInstance();
                archiveManager.setFlag("acceptedWolfHelp", true);
                archiveManager.increaseAffection("wolf", 15);
            },
            next: "wolf_help_result"
        },
        {
            id: "reject_wolf_help",
            elements: {
                name: "你",
                text: "我想独自解决我的问题。"
            },
            action: () => {
                // 玩家拒绝了狼的帮助
                const archiveManager = ArchiveManager.getInstance();
                archiveManager.setFlag("rejectedWolfHelp", true);
                archiveManager.decreaseAffection("wolf", 10);
            },
            next: "wolf_help_result"
        },
        {
            id: "wolf_help_result",
            elements: {
                name: "狼",
                text: "那么，祝你好运。记住，当你需要帮助时，只要呼唤我的名字就行。"
            },
            next: "end_scene"
        },
        {
            id: "end_scene",
            elements: {
                name: "旁白",
                text: "狼消失在夜色中，留下你独自一人。你继续前行，心中对刚才的经历充满疑惑。"
            },
            action: () => {
                // 结束场景
                const archiveManager = ArchiveManager.getInstance();
                archiveManager.setFlag("completedRightPath", true);
            },
            next: "chapter_0_scene_0#fork_in_road" // 返回分岔路口
        }
    ]
};

// 当DOM加载完成后启动场景
document.addEventListener("DOMContentLoaded", function() {
    gameScene.loadScene(chapter0_scene_1_1);
});

export default chapter0_scene_1_1;