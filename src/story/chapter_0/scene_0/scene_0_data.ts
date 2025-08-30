import { Scene } from '../../../types/SceneTypes';
import { ArchiveManager } from '../../../components/ArchiveManager';

// 定义第0章场景
const scene: Scene = {
    id: "chapter_0_scene_0",
    title: "第0幕：开始",
    nodes: [
        {
            id: "start",
            elements: {
                background: "sc3.1/page1.JPG",
                name: "旁白",
                text: "准备好踏上旅程了吗？",
                bgm: "bgm1"
            }
        },
        {
            id: "node1",
            elements: {
                name: "旁白",
                text: "与那个女孩一起。"
            }
        },
        {
            id: "node2",
            elements: {
                name: "旁白",
                text: "铁与盐混杂的味道在嘴里蔓延开来，耳畔溢满了低沉的声响。"
            }
        },
        {
            id: "node3",
            elements: {
                name: "旁白",
                text: "像是滔天的巨浪击打峭壁，像是一阵永不休止的潮声。"
            }
        },
        {
            id: "node4",
            elements: {
                name: "旁白",
                text: "接受着这些不知从何而来的信息，以此为基点重构自己的意识。"
            }
        },
        {
            id: "node5",
            elements: {
                name: "旁白",
                text: "然后，在持续了不知多久的黑暗之中，忽然有一点微茫亮起。"
            }
        },
        {
            id: "node6",
            elements: {
                name: "旁白",
                text: "如同逐光的飞蛾，想要接近那团幽光。"
            }
        },
        {
            id: "node7",
            elements: {
                name: "旁白",
                text: "越是靠近那团光芒，自我就越趋于完整，潮声愈演愈烈。"
            }
        },
        {
            id: "node8",
            elements: {
                name: "旁白",
                text: "当手指触碰到那团光的一瞬间，剧烈的震荡传播开来，光芒填满了所有视野。"
            }
        },
        {
            id: "node9",
            elements: {
                name: "旁白",
                text: "但紧接着，整个世界重归死寂般的黑暗。"
            }
        },
        {
            id: "wake_up",
            elements: {
                name: "旁白",
                text: "就像被噩梦的余韵牵动着一般，从黑暗中惊醒。"
            }
        },
        {
            id: "node10",
            elements: {
                name: "旁白",
                text: "眼前是支离破碎的废墟，空气中弥漫着浓重的焦土气息，混杂着铁锈与血的味道。"
            }
        },
        {
            id: "find_stick",
            elements: {
                name: "旁白",
                text: "你在脚边发现了一根漆黑的手杖，拍去灰尘，手杖上隐约浮现出金色的复杂纹路。"
            }
        },
        {
            id: "node11",
            elements: {
                name: "旁白",
                text: "突然，它化为液态覆盖在你的右臂，给你带来一种前所未有的力量感。"
            }
        },
        {
            id: "explore_ruins",
            elements: {
                name: "旁白",
                text: "你环顾四周，迈开双腿，向某个方向摸索而去。"
            }
        },
        {
            id: "node12",
            elements: {
                name: "旁白",
                text: "脚下的碎石发出孤独的回响，时间在这里仿佛停止了。"
            }
        },
        {
            id: "graveyard",
            elements: {
                name: "旁白",
                text: "经过漫长的废土，你终于走出了这片死寂之地。"
            }
        },
        {
            id: "node13",
            elements: {
                name: "旁白",
                text: "眼前是一个小墓地，一位少女正跪坐在一块墓碑前，低头为死者哀悼。"
            }
        },
        {
            id: "meet_girl",
            elements: {
                name: "旁白",
                text: "少女缓缓抬起头，看到你后，她轻轻开口：‘您终于来了，虽然比预计的时间要稍迟一些，我在等着您醒来。’"
            },
            choices: [
                {
                    text: "问她是谁",
                    next: "ask_who_is_she"
                },
                {
                    text: "不发一语，继续观察",
                    next: "observe_silently"
                }
            ]
        },
        {
            id: "ask_who_is_she",
            elements: {
                name: "光泠",
                text: "‘我叫光泠。’少女微笑着说道，‘我在这里等您。’她向你解释道，这个世界已经濒临毁灭，你将承担起拯救它的使命。"
            },
            next: "light_clue"
        },
        {
            id: "observe_silently",
            elements: {
                name: "旁白",
                text: "你没有回答，只是默默地观察着这位少女，她似乎知道你的处境，言辞中透露着一种悲伤，但也隐约带着些许希望。"
            }
        },
        {
            id: "light_clue",
            elements: {
                name: "光泠",
                text: "‘您将成为这个世界的拯救者，您的使命就是终结这一切灾厄。’她继续说道，‘您需要集齐三样关键之物，才能实现这一切。’"
            }
        },
        {
            id: "leave_graveyard",
            elements: {
                name: "旁白",
                text: "光泠转身，等待着你的决定。"
            },
            choices: [
                {
                    text: "跟随光泠",
                    next: "follow_lightling"
                },
                {
                    text: "独自离开，探索废墟",
                    next: "leave_graveyard_1"
                }
            ]
        },
        {
            id: "follow_lightling",
            elements: {
                name: "旁白",
                text: "你决定跟随光泠，她微笑着转身，带领你向着远方走去。"
            },
            next: "arm_clue"
        },
        {
            id: "leave_graveyard_1",
            elements: {
                name: "旁白",
                text: "你决定暂时独自探索这个废墟，放眼望去，四周是满目疮痍的景象。"
            }
        },
        {
            id: "arm_clue",
            elements: {
                name: "旁白",
                text: "你忽然打量起覆盖右臂的黑色坚甲，感受到一股莫名的亲切感，便向光泠示意，询问它的来源。"
            }
        },
        {
            id: "lightling_answer",
            elements: {
                name: "光泠",
                text: "‘它是能为您斩断一切阻碍的利器，您可以叫它“暗寂(Eclipsera)”。’她微笑着说道。"
            }
        },
        {
            id: "final_choice",
            elements: {
                name: "光泠",
                text: "‘那么，如果您没有什么特殊的打算，就请让我与您同行。或者等您下定决心，再开始行动也不迟。’"
            },
            choices: [
                {
                    text: "决定跟随光泠",
                    next: "chapter_0_scene_1_0"  // 跳转到第一章场景ID
                },
                {
                    text: "独自行动",
                    next: "chapter_0_scene_1_0"   // 跳转到第一章场景ID
                }
            ]
        }
        /*{
            id: "begin_journey",
            elements: {
                name: "旁白",
                text: "你决定跟随光泠，踏上这段未知的旅程。她微笑着引导你，开始了你们的冒险。"
            }
        },
        {
            id: "start_alone",
            elements: {
                name: "旁白",
                text: "你选择独自行动，心中充满了疑问和困惑。或许有些事情，只有通过亲自经历才能找到答案。"
            }
        }
        */
    ]
};
export default scene;