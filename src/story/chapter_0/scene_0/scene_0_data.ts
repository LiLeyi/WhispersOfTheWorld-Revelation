import { Scene } from '../../../types/SceneTypes';
import { ArchiveManager } from '../../../components/ArchiveManager';

// 定义第0章场景
const scene: Scene = {
    id: "chapter_0_scene_0",
    title: "第0章：开始",
    nodes: [   {
    id: "node1",
    elements: {
        name: "旁白",
        text: "？？？：准备好踏上旅程了吗？与那个女孩一起。"
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
        text: "然后......"
    }
},
{
    id: "node6",
    elements: {
        name: "旁白",
        text: "在持续了不知多久的黑暗之中，忽然有一点微茫亮起。"
    }
},
{
    id: "node7",
    elements: {
        name: "旁白",
        text: "如同逐光的飞蛾，想要接近那团幽光。"
    }
},
{
    id: "node8",
    elements: {
        name: "旁白",
        text: "被想要前进的意志所驱动着，能够迈开步伐的双脚被创造出来。"
    }
},
{
    id: "node9",
    elements: {
        name: "旁白",
        text: "被想要触碰的意志所驱动着，能够伸出的双手也被创造出来。"
    }
},
{
    id: "node10",
    elements: {
        name: "旁白",
        text: "越是靠近那团光芒，自我就越趋于完整。"
    }
},
{
    id: "node11",
    elements: {
        name: "旁白",
        text: "越是靠近那团光芒，冗长的潮声便愈演愈烈。"
    }
},
{
    id: "node12",
    elements: {
        name: "旁白",
        text: "而在手指触碰到那团光的一瞬间。"
    }
},
{
    id: "node13",
    elements: {
        name: "旁白",
        text: "剧烈的震荡传播开来，就像将死的恒星在坍缩中毁灭。"
    }
},
{
    id: "node14",
    elements: {
        name: "旁白",
        text: "刹那间的光芒填满了自己所有的视野。"
    }
},
{
    id: "node15",
    elements: {
        name: "旁白",
        text: "但紧接着——"
    }
},
{
    id: "node16",
    elements: {
        name: "旁白",
        text: "整个世界重归死寂般的黑暗。"
    }
},
{
    id: "node17",
    elements: {
        name: "旁白",
        text: "......"
    }
},
{
    id: "node17.5",
    elements: {
        background:"sc0.1/0-1-1.jpg",
        name: "旁白",
        text: "就像被噩梦的余韵牵动着一般，从黑暗中惊醒。"
    }
},
{
    id: "node18",
    elements: {
        name: "旁白",
        text: "仿佛被烈火与铁蹄碾碎的大地，支离破碎的骨骸，断裂横陈的高耸石柱，残垣间散落着扭曲的金属与焦黑的木梁。空气中弥漫着浓重的焦土气息，混杂着铁锈与血的味道。"
    }
},
{
    id: "node19",
    elements: {
        name: "旁白",
        text: "不仅是对这糟糕的环境，更是对自己感到陌生。"
    }
},
{
    id: "node20",
    elements: {
        name: "旁白",
        text: "为何会身处此处，为何会在这里醒来。"
    }
},
{
    id: "node21",
    elements: {
        name: "旁白",
        text: "脑海里一片空白，思考的火星也无从燃起。"
    }
},
{
    id: "node22",
    elements: {
        name: "旁白",
        text: "某个声音在心中响起，遵循那莫名的呼唤，支撑起身体，从地上站起来。"
    }
},
{
    id: "node23",
    elements: {
        name: "旁白",
        text: "天空没有色彩，灰白如旧纸，偶尔有大片灰烬随风飘落，像失却温度的雪。风声低沉而空洞，吹过裂缝与残骸时，仿佛在诉说一段无声的哀歌。"
    }
},
{
    id: "node24",
    elements: {
        name: "旁白",
        text: "似乎有某个坚硬的物体在脚边。定睛一看，是一柄漆黑的手杖。"
    }
},
{
    id: "node25",
    elements: {
        name: "旁白",
        text: "捡起脚边的手杖，拍去灰尘，漆黑的手杖上隐约浮现出金色的复杂纹路。"
    }
},
{
    id: "node26",
    elements: {
        name: "旁白",
        text: "还没来得及仔细观察，手中的漆黑之物似乎启动了某种开关，倏忽之间化为液态游走在手臂上。眨眼之间，便覆盖了整条右臂，如铠甲般附着其上。一股柔和的力量从包裹着右臂向全身蔓延，顿时感到先前的虚弱一扫而空。"
    }
},
{
    id: "node27",
    elements: {
        name: "旁白",
        text: "虽然不知道这到底是何种奇物，但莫名地有种亲切感。不过似乎暂时对自己无害，也不妨碍行动，那就暂时先不去思考怎样处理它。"
    }
},
{
    id: "node28",
    elements: {
        name: "旁白",
        text: "环顾四周，迈开双腿，先试试看能不能找到离开这里的路。"
    }
},
{
    id: "node29",
    elements: {
        name: "旁白",
        text: "似乎是收到了某种神秘的指引，便不自觉地朝某个方向摸索过去。"
    }
},
{
    id: "node30",
    elements: {
        name: "旁白",
        text: "脚下的碎石发出浑浊而孤独的回响，像是荒芜与死亡的低吼。在这片废墟之上，时间似乎停滞了。没有未来，没有希望，只有过去的影子与世界濒死的低语。"
    }
},
{
    id: "node31",
    elements: {
        name: "旁白",
        text: "不知踏过了多少残骸，不知流逝了多长时间，终于快要走出这片废土。"
    }
},
{
    id: "node32",
    elements: {
        name: "旁白",
        text: "张口想要释放内心的呐喊，眼睛却在视野的边角捕捉到了什么。"
    }
},
{
    id: "node33",
    elements: {
        name: "旁白",
        text: "废墟的边界，似乎建有一块小小的墓地。",
        background:"sc0.1/0-1-2.jpg",
    }
},
{
    id: "node34",
    elements: {
        name: "旁白",
        text: "身披长袍的少女跪坐在一块墓碑之前。"
    }
},
{
    id: "node35",
    elements: {
        name: "旁白",
        text: "她低着头，双掌合拢，像是在为埋葬在此处的死者哀悼。"
    }
},
{
    id: "node36",
    elements: {
        name: "旁白",
        text: "即使在自己靠近之后，她也仍保持着这个姿势数分钟的时间。"
    }
},
{
    id: "node37",
    elements: {
        name: "旁白",
        text: "你在这里......做什么？"
    }
},
{
    id: "node38",
    elements: {
        name: "旁白",
        text: "疑惑不自觉地溜过自己的声带，少女听到了自己的发问，也缓缓地站起来。"
    }
},
{
    id: "node39",
    elements: {
        name: "？",
        text: "没什么......只是在“告别”。"
    }
},
{
    id: "meet_girl",
    elements: {
        name: "？",
        text: "啊...您终于来了。虽然比预计的时间要稍迟一些，我在等着您醒来。"
    },
    choices: [
                {
                    text: "你是谁？",
                    next: "ask_who_is_she"
                },
                {
                    text: "......为什么要等我？",
                    next: "ask_who_is_she"
                }
            ]
},
{
    id: "ask_who_is_she",
    elements: {
        name: "？",
        text: "嗯，您可以叫我光泠。出于某种原因，在这里与您相遇。"
    }
},
{
    id: "node42",
    elements: {
        name: "光泠",
        text: "您真的对您的处境一无所知吗？还是说，还记得些什么？"
    }
},
{
    id: "node43",
    elements: {
        name: "旁白",
        text: "我不知道。"
    }
},
{
    id: "node44",
    elements: {
        name: "光泠",
        text: "您注意到了吗？这片荒芜的土地，还有那些断壁残垣，以及尘土中无名的骸骨。"
    }
},
{
    id: "node45",
    elements: {
        name: "光泠",
        text: "曾经一场可怕的灾难降临在这个世界。大地被烈火焚烧，天空被灰烬笼罩。"
    }
},
{
    id: "node46",
    elements: {
        name: "光泠",
        text: "森林枯败而失去生机，海洋干涸而沉寂腐朽。"
    }
},
{
    id: "node47",
    elements: {
        name: "光泠",
        text: "是的，这个世界病了，病得快要无可救药。"
    }
},
{
    id: "node48",
    elements: {
        name: "光泠",
        text: "而您将会成为这个世界的拯救者，您的使命就是终结这一切灾厄。而我的职责，就是指引您创造一个没有这一切灾难的美好世界。"
    }
},
{
    id: "node49",
    elements: {
        name: "光泠",
        text: "您正是为了为世界带来新生，才从这里醒来。"
    }
},
{
    id: "node50",
    elements: {
        name: "光泠",
        text: "也许当您结束了这一切，您曾被消去的空白才会被重新填满。"
    }
},
{
    id: "node51",
    elements: {
        name: "旁白",
        text: "名为光泠的少女，向忘却了一切的自己解释道。"
    }
},
{
    id: "node52",
    elements: {
        name: "旁白",
        text: "遗憾的是，突如其来的庞大信息量让自己难以完全理解她的每一句话。"
    }
},
{
    id: "node53",
    elements: {
        name: "旁白",
        text: "好在自己很快冷静下来，反复咀嚼思索她的语句。"
    },
    choices: [
                {
                    text: "发生了什么灾难？为什么会变成这样糟糕的情况？",
                    next: "node54"
                },
            ]
},
{
    id: "node54",
    elements: {
        name: "光泠",
        text: "很抱歉，关于这背后更深层次的真相，我也无法向您解释。只知道这是一场涤荡世界的灾厄。"
    }
},
{
    id: "node55",
    elements: {
        name: "光泠",
        text: "您需要集齐三样关键之物，才可能解决这一切。"
    }
},
{
    id: "node56",
    elements: {
        name: "旁白",
        text: "去那里得到这三样关键之物？"
    }
},
{
    id: "node57",
    elements: {
        name: "光泠",
        text: "我会给予您指引。"
    }
},
{
    id: "node58",
    elements: {
        name: "旁白",
        text: "它们是什么？"
    }
},
{
    id: "node59",
    elements: {
        name: "光泠",
        text: "恕我无法为您解答。不过我会和您一起去寻找。"
    }
},
{
    id: "node60",
    elements: {
        name: "旁白",
        text: "我凭什么相信你？"
    }
},
{
    id: "node61",
    elements: {
        name: "光泠",
        text: "您不相信我也没有关系。"
    }
},
{
    id: "node62",
    elements: {
        name: "光泠",
        text: "您才是故事的主角，我的使命只是引导和陪伴您。至于您做出怎样的选择，我无从干涉。"
    }
},
{
    id: "node63",
    elements: {
        name: "光泠",
        text: "即使您现在想离开我，一个人到其他地方逛逛也可以。"
    }
},
{
    id: "node64",
    elements: {
        name: "光泠",
        text: "您一定又会回到这里。所以在您回心转意之前，我会一直等着您。"
    }
},
{
    id: "node65",
    elements: {
        name: "旁白",
        text: "暗暗思索着，自己似乎也别无选择。"
    }
},
{
    id: "node66",
    elements: {
        name: "旁白",
        text: "世界的真相是什么，自己又为何莫名其妙地背负起这样沉重的使命。"
    }
},
{
    id: "node67",
    elements: {
        name: "旁白",
        text: "但无论如何，自己无法逃避，必须行动起来。"
    }
},
{
    id: "node68",
    elements: {
        name: "旁白",
        text: "还有一个问题，你知道这是什么吗？"
    }
},
{
    id: "node69",
    elements: {
        name: "旁白",
        text: "一边打量着覆盖右臂的黑色坚甲，一边向光泠示意。"
    }
},
{
    id: "node70",
    elements: {
        name: "光泠",
        text: "它是能为您斩断一切阻碍的利器，您可以叫它“暗寂(Eclipsera)”。"
    }
},
{
    id: "node71",
    elements: {
        name: "旁白",
        text: "......"
    }
},
{
    id: "node72",
    elements: {
        name: "光泠",
        text: "那么，如果您没有什么特殊的打算，就请让我与您同行。"
    }
},
{
    id: "node73",
    elements: {
        name: "光泠",
        text: "或者等您下定决心，再开始行动也不迟。"
    }
},
{
    id: "node74",
    elements: {
        name: "旁白",
        text: "似乎也别无选择了。"
    }
},
{
    id: "node75",
    elements: {
        name: "光泠",
        text: "比起苍白的语言，直观的体验更能告诉您答案。您会知道的。"
    }
},
{
    id: "node76",
    elements: {
        name: "光泠",
        text: "这个世界什么也无法保证，但我能向您确定一点。（微笑）"
    }
},
{
    id: "node77",
    elements: {
        name: "光泠",
        text: "我会跟随您见证旅途的所有景色，陪您到最后一刻。（笑）"
    },
    next:"chapter_1_scene_0"
},

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