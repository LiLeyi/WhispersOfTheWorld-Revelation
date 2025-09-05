import { Scene } from '../../../types/SceneTypes';
import { ArchiveManager } from '../../../components/ArchiveManager';
import { CardManager } from '../../../components/mini_games/card_game';
// 定义第2幕场景
const scene: Scene = {
id:"chapter_0_scene_3_0",
title:"第三章第1幕:",
nodes: [
{
    id: "mountain_1",
    elements: {
        name: "旁白",
        text: "有两个灵魂居住在我心胸，一个想从另一个挣脱掉。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_2",
    elements: {
        name: "旁白",
        text: "一个在粗鄙的爱欲中以固执的器官附着于世界。"
    },
},
{
    id: "mountain_3",
    elements: {
        name: "旁白",
        text: "另一个则奋力超脱尘渣，进入到崇高的先人的灵境。"
    },
},
{
    id: "mountain_4",
    elements: {
        name: "旁白",
        text: "夜幕沉沉，群山如兽，静默间张开漆黑的獠牙。"
    },
},
{
    id: "mountain_5",
    elements: {
        name: "旁白",
        text: "谷风刺骨，若有呼号。"
    },
},
{
    id: "mountain_6",
    elements: {
        name: "旁白",
        text: "枯木横生，枝桠扭曲。"
    },
},
{
    id: "mountain_7",
    elements: {
        name: "旁白",
        text: "鸟兽啼鸣，幽鬼沉吟。"
    },
},
{
    id: "mountain_8",
    elements: {
        name: "旁白",
        text: "越是深入，越能感受到一股直击心底的吸引力。"
    },
},
{
    id: "mountain_9",
    elements: {
        name: "旁白",
        text: "第三样关键之物，不出意外的话，应该就在这深山之中。"
    },
},
{
    id: "mountain_10",
    elements: {
        name: "旁白",
        text: "自山脚始，癫狂的魔物与鬼怪便遍布了整个山林。"
    },
},
{
    id: "mountain_11",
    elements: {
        name: "旁白",
        text: "不过直至走到半山腰，还没有太费什么力气。"
    },
},
{
    id: "mountain_12",
    elements: {
        name: "旁白",
        text: "不知为何，山中游荡的低等鬼物们似乎对光泠有一种天生的畏惧感。"
    },
},
{
    id: "mountain_12_1",
    elements: {
        name: "旁白",
        text: "因此一路上还没有遇见什么难缠的敌人。"
    },
},
{
    id: "mountain_13",
    elements: {
        name: "旁白",
        text: "多亏了光泠。"
    },
},
{
    id: "mountain_14",
    elements: {
        name: "旁白",
        text: "也不知道它们为什么这样惧怕你。"
    },
},
{
    id: "mountain_15",
    elements: {
        name: "光泠",
        text: "也许不是惧怕我，而是惧怕你呢。（微笑）",
        sprite: {
            left: "guangling/smile.png",
        }
    },
},
{
    id: "mountain_16",
    elements: {
        name: "你",
        text: "我猜是因为你身上流动的力量。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_17",
    elements: {
        name: "你",
        text: "神秘，纯净，深邃。"
    },
},
{
    id: "mountain_18",
    elements: {
        name: "你",
        text: "这些邪恶的东西最怕了。"
    },
},
{
    id: "mountain_19",
    elements: {
        name: "光泠",
        text: "那你怕我么？（笑）",
        sprite: {
            left: "guangling/smile1.png",
        }
    },
},
{
    id: "mountain_20",
    elements: {
        name: "旁白",
        text: "光泠用双手轻轻拍了拍我的脸。",
        sprite: {
            left: null,
        }
    },
    choices: [
        {
            text: "呃啊，你的力量让我感到无比的恐惧。",
            next: "mountain_21_1",
        },
        {
            text: "我猜你怕我",
            next: "mountain_21_2",
        },
    ]
},
//分支1-1//
{
    id: "mountain_21_1",
    elements: {
        name: "光泠",
        text: "看来你也是个邪恶的家伙。（惊讶）",
        sprite: {
            left: "guangling/jingya.pn",
        }
    },
},
{
    id: "mountain_22_1",
    elements: {
        name: "你",
        text: "终于还是瞒不住了么？",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_23_1",
    elements: {
        name: "旁白",
        text: "手里的暗寂化为黑色利爪，在空中挥舞。"
    },
},
{
    id: "mountain_24_1",
    elements: {
        name: "你",
        text: "我，就是黑暗！"
    },
},
{
    id: "mountain_25_1",
    elements: {
        name: "光泠",
        text: "演得不像。（微笑）",
        sprite: {
            left: "guangling/smile.png",
        }
    },
},
{
    id: "mountain_26_1",
    elements: {
        name: "旁白",
        text: "光泠微笑着，静静注视着我。"
    },
},
{
    id: "mountain_27_1",
    elements: {
        name: "你",
        text: "......",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_28_1",
    elements: {
        name: "你",
        text: "一触碰到你的目光，我便仿佛沐浴在那被神火烧沸的清泉中。"
    },
},
{
    id: "mountain_29_1",
    elements: {
        name: "光泠",
        text: "......（微笑）",
        sprite: {
            left: "guangling/smile.png",
        }
    },
},
{
    id: "mountain_30_1",
    elements: {
        name: "光泠",
        text: "从容或许源自悸动已久后的习惯。（笑）",
        sprite: {
            left: "guangling/smile1.png",
        }
    },
},
{
    id: "mountain_31_1",
    elements: {
        name: "你",
        text: "初见乍惊欢，久处亦怦然。",
        sprite: {
            left: null,
        }
    },
    next:"mountain_32"
},
//分支1-2//
{
    id: "mountain_21_2",
    elements: {
        name: "光泠",
        text: "哦？总有些事物，是比恶鬼更可怖的。（微笑）",
        sprite: {
            left: "guangling/smile.png",
        }
    },
},
{
    id: "mountain_22_2",
    elements: {
        name: "你",
        text: "我相信你会站在我这边的，对吧？",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_23_2",
    elements: {
        name: "光泠",
        text: "当然。（笑）",
        sprite: {
            left: "guangling/smile1.png",
        }
    },
},
{
    id: "mountain_24_2",
    elements: {
        name: "你",
        text: "既然同我站在一起，那就算你真的是魔鬼，我也不会怕你。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_25_2",
    elements: {
        name: "你",
        text: "在你身边，纷扰的黑夜也会变成宁静的清晨。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_26_2",
    elements: {
        name: "光泠",
        text: "人唯一无法舍弃的，就是被他者理解的渴望。（笑）",
        sprite: {
            left: "guangling/smile1.png",
        }
    },
},
{
    id: "mountain_26_2_1",
    elements: {
        name: "光泠",
        text: "所以我们才会在相遇相识后如此欣喜。（笑）",
    },
},
{
    id: "mountain_27_2",
    elements: {
        name: "你",
        text: "熟悉不会让我们乏味彼此，我似乎总不如明天的自己了解你。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_28_2",
    elements: {
        name: "光泠",
        text: "不妨将我看做一个久别重逢的故友。（微笑）",
        sprite: {
            left: "guangling/smile.png",
        }
    },
    next:"mountain_32",
},
//主线//
{
    id:"mountain_32",
    elements: {
        name: "你",
        text: "这个世界总是变化的很快，雅致的，急躁的，激昂的，哀沉的……",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_33",
    elements: {
        name: "你",
        text: "太多调子混在了一起，使得耳畔的回音杂乱无序。"
    },
},
{
    id: "mountain_34",
    elements: {
        name: "你",
        text: "但还好，你始终如一。"
    },
},
{
    id: "mountain_35",
    elements: {
        name: "旁白",
        text: "与光泠交谈着前进，忽然隐约感知到远方传来危险的味道。"
    },
},
{
    id: "mountain_36",
    elements: {
        name: "你",
        text: "小心。"
    },
},
{
    id: "mountain_37",
    elements: {
        name: "旁白",
        text: "一股黑雾笼罩而来，夹杂着不祥的气息。"
    },
},
{
    id: "mountain_38",
    elements: {
        name: "旁白",
        text: "光泠轻轻挥手，一层光屏挡在黑雾前，却直接被这股黑雾吞噬。"
    },
},
{
    id: "mountain_39",
    elements: {
        name: "你",
        text: "来者不善。"
    },
},
{
    id: "mountain_40",
    elements: {
        name: "旁白",
        text: "将暗寂化为一根长满棘刺的黑色锁链，向黑雾中袭去。"
    },
},
{
    id: "mountain_40_1",
    elements: {
        name: "旁白",
        text: "但好像与什么坚硬之物相撞，被径直弹回。"
    },
},
{
    id: "mountain_41",
    elements: {
        name: "旁白",
        text: "黑雾渐渐凝聚成一张扭曲的面孔，随机化作一个高挑的身影。"
    },
},
{
    id: "mountain_42",
    elements: {
        name: "旁白",
        text: "阴影中，隐约看见他身着红黑配色华服。"
    },
},
{
    id: "mountain_42_1",
    elements: {
        name: "旁白",
        text: "面色苍白，眼眸幽黑，脸上挂着讥讽而玩味的微笑。"
    },
},
{
    id: "mountain_43",
    elements: {
        name: "？",
        text: "你们又来了，袅袅悠悠的影像。"
    },
},
{
    id: "mountain_44",
    elements: {
        name: "？",
        text: "你们曾映入我那惝恍的目光？"
    },
},
{
    id: "mountain_45",
    elements: {
        name: "？",
        text: "这一次我该设法将你们定住？"
    },
},
{
    id: "mountain_46",
    elements: {
        name: "？",
        text: "我的心还在迷恋着那些遐想？"
    },
},
{
    id: "mountain_47",
    elements: {
        name: "旁白",
        text: "他走出阴影。"
    },
},
{
    id: "mountain_48",
    elements: {
        name: "？",
        text: "攀登者！你们前行得如此辛苦！"
    },
},
{
    id: "mountain_49",
    elements: {
        name: "？",
        text: "告诉我，你们究竟要前往何处？"
    },
},
{
    id: "mountain_50",
    elements: {
        name: "你",
        text: "向别人提问之前，不先表明一下身份么？"
    },
},
{
    id: "mountain_51",
    elements: {
        name: "？",
        text: "听见了吗？这山峦的沉默与怒吼！"
    },
},
{
    id: "mountain_52",
    elements: {
        name: "？",
        text: "然而既非警告，也非咒怨，而是诉说。"
    },
},
{
    id: "mountain_53",
    elements: {
        name: "？",
        text: "等待你们的，并非殿堂，而是坟茔！"
    },
},
{
    id: "mountain_54",
    elements: {
        name: "？",
        text: "我是低语的舌，我是怀疑的影。"
    },
},
{
    id: "mountain_55",
    elements: {
        name: "？",
        text: "凡心存信念者，便会听见我的声音。"
    },
},
{
    id: "mountain_56",
    elements: {
        name: "你",
        text: "嗯，有趣。你是来表演戏剧的吗？先生。"
    },
},
{
    id: "mountain_57",
    elements: {
        name: "光泠",
        text: "的确像个蹩脚的演员。（笑）",
        sprite: {
            left: "guangling/smile1.png",
        }
    },
},
{
    id: "mountain_58",
    elements: {
        name: "？",
        text: "哈哈！每一个踏上此路的人，都追寻着崇高，追求那永恒的真理。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_59",
    elements: {
        name: "？",
        text: "我对你们说：如果要追问我的名字，就请记住我的话语。"
    },
},
{
    id: "mountain_60",
    elements: {
        name: "？",
        text: "我是怀疑，我是虚无，我是永恒的否定。"
    },
},
{
    id: "mountain_61",
    elements: {
        name: "？",
        text: "我是定义一切的那个“不”。"
    },
},
{
    id: "mountain_62",
    elements: {
        name: "？",
        text: "我是梅菲斯特，我是你们的阴影。"
    },
},
{
    id: "mountain_63",
    elements: {
        name: "你",
        text: "话说完了吗，说完了就请让开吧。"
    },
},
{
    id: "mountain_64",
    elements: {
        name: "你",
        text: "恶魔。"
    },
},
{
    id: "mountain_65",
    elements: {
        name: "梅菲斯特",
        text: "我并非恶魔，而是答案。"
    },
},
{
    id: "mountain_66",
    elements: {
        name: "梅菲斯特",
        text: "告诉我，攀登者。你要继续背负痛苦，如同驮兽般走向虚无？"
    },
},
{
    id: "mountain_67",
    elements: {
        name: "梅菲斯特",
        text: "还是放下重担，得享安宁？"
    },
},
{
    id: "mountain_68",
    elements: {
        name: "梅菲斯特",
        text: "在我怀里，连死亡都将变得温柔。"
    },
},
{
    id: "mountain_69",
    elements: {
        name: "你",
        text: "你的话语是如此的无力。"
    },
},
{
    id: "mountain_70",
    elements: {
        name: "你",
        text: "让开，我将要获得真理。"
    },
},
{
    id: "mountain_71",
    elements: {
        name: "梅菲斯特",
        text: "旅人啊，你们为何如此匆忙地奔向痛苦？"
    },
},
{
    id: "mountain_72",
    elements: {
        name: "梅菲斯特",
        text: "难道你看不见，你所追求的这一切————"
    },
},
{
    id: "mountain_72_1",
    elements: {
        name: "梅菲斯特",
        text: "光芒、誓言、乃至你们愿为之赴死的信念——都不过是永恒漩涡中偶然聚散的浮沫？"
    },
},
{
    id: "mountain_73",
    elements: {
        name: "梅菲斯特",
        text: "看罢！这天地万象，不过是“太一”永恒的织机上，一段毫无意义的纹路。"
    },
},
{
    id: "mountain_74",
    elements: {
        name: "梅菲斯特",
        text: "你道是壮丽辉煌，我见其重复枯朽。你听风吟是歌，我闻之不过是空无永恒的叹息。"
    },
},
{
    id: "mountain_75",
    elements: {
        name: "旁白",
        text: "他的话语似乎有种惑人心智的魔力，不断在耳边回响。"
    },
},
{
    id: "mountain_76",
    elements: {
        name: "梅菲斯特",
        text: "正如我曾对那位博学的博士所言："
    },
},
{
    id: "mountain_77",
    elements: {
        name: "梅菲斯特",
        text: "‘我是永远否定的精灵！’"
    },
},
{
    id: "mountain_78",
    elements: {
        name: "梅菲斯特",
        text: "‘这一切之所创，理应归于空无；’"
    },
},
{
    id: "mountain_79",
    elements: {
        name: "梅菲斯特",
        text: "‘所以，倒不如无所创生。’"
    },
},
{
    id: "mountain_80",
    elements: {
        name: "梅菲斯特",
        text: "你此刻的奋斗，与那终将吞噬一切的空无相比，岂非最为悲怆的幻戏？"
    },
},
{
    id: "mountain_81",
    elements: {
        name: "梅菲斯特",
        text: "你所点燃的每一盏灯，都投下更深重的影；"
    },
},
{
    id: "mountain_82",
    elements: {
        name: "梅菲斯特",
        text: "你每一次的“拯救”，都在为下一次“毁灭”写下伏笔。"
    },
},
{
    id: "mountain_83",
    elements: {
        name: "梅菲斯特",
        text: "我要告诉你：我是部分的一部分，这部分原本是一切。"
    },
},
{
    id: "mountain_84",
    elements: {
        name: "梅菲斯特",
        text: "是黑暗的部分，它生出了光。"
    },
},
{
    id: "mountain_85",
    elements: {
        name: "梅菲斯特",
        text: "傲慢的光，如今竟要争夺母亲的地位，妄想将古老的母体笼罩并吞噬！"
    },
},
{
    id: "mountain_86",
    elements: {
        name: "梅菲斯特",
        text: "何必再背负这存在之重？"
    },
},
{
    id: "mountain_86_1",
    elements: {
        name: "梅菲斯特",
        text: "何必在这注定倾覆的舟楫上，苦苦舀取不断涌入的虚无？"
    },
},
{
    id: "mountain_87",
    elements: {
        name: "梅菲斯特",
        text: "不如就此放手，承认这博弈的虚妄。"
    },
},
{
    id: "mountain_88",
    elements: {
        name: "梅菲斯特",
        text: "安眠吧！无梦地安眠！"
    },
},
{
    id: "mountain_89",
    elements: {
        name: "梅菲斯特",
        text: "我将予你真正的宁静，那不是微光的慰藉，而是鸿蒙未开之初的、无苦无悲的永恒寂灭。"
    },
},
{
    id: "mountain_90",
    elements: {
        name: "梅菲斯特",
        text: "那是终极的自由——从意义中解脱的自由。"
    },
},
{
    id: "mountain_91",
    elements: {
        name: "梅菲斯特",
        text: "低下头吧，承认吧！你心底早已回响着我的声音。"
    },
},
{
    id: "mountain_91",
    elements: {
        name: "梅菲斯特",
        text: "那疲惫，那怀疑，那对意义的诘问......便是你迈向真理的第一步。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_92",
    elements: {
        name: "梅菲斯特",
        text: "与我同行，你并非坠入黑暗，你只是......睁开了眼睛。"
    },
    choices: [
        {
            text: "也许......你说得对。或许这一切根本毫无意义。",
            next: "mountain_93_1"
        },
        {
            text: "惟有前行，才能超越。",
            next: "mountain_93_2"
        },
    ]
},
//分支2—1//
{
    id: "mountain_93_1",
    elements: {
        name: "旁白",
        text: "脑海里回荡着梅菲斯特的话语。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_94_1",
    elements: {
        name: "旁白",
        text: "不久前还坚信不疑的信条，此刻想来却空洞得令人发笑。"
    },
},
{
    id: "mountain_95_1",
    elements: {
        name: "旁白",
        text: "一次又一次地抵挡潮水，明知它终将漫过一切？"
    },
},
{
    id: "mountain_96_1",
    elements: {
        name: "旁白",
        text: "所谓的壮丽，在永恒的空无面前，岂非连一瞬的涟漪都算不上？"
    },
},
{
    id: "mountain_97_1",
    elements: {
        name: "你",
        text: "也许.....你是对的。"
    },
},
{
    id: "mountain_97_1_1",
    elements: {
        name: "你",
        text: "也许真正的勇气......不是盲目地燃烧。"
    },
},
{
    id: "mountain_97_1_2",
    elements: {
        name: "你",
        text: "而是有尊严地......承认这燃烧毫无意义。"
    },
},
{
    id: "mountain_98_1",
    elements: {
        name: "光泠",
        text: "意义不是被谁给予，而是由你去创造。（无表情）",
        sprite: {
            left: "guangling/wubiaoqing.png",
        }
    },
},
{
    id: "mountain_99_1",
    elements: {
        name: "旁白",
        text: "光泠拉起我的手，静静地凝视着我。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_100_1",
    elements: {
        name: "你",
        text: "保护意味着恐惧，拥有预示着失去。"
    },
},
{
    id: "mountain_101_1",
    elements: {
        name: "你",
        text: "这就是世界运行的基本法则。"
    },
},
{
    id: "mountain_102_1",
    elements: {
        name: "你",
        text: "此行注定一无所获。"
    },
},
{
    id: "mountain_103_1",
    elements: {
        name: "旁白",
        text: "梅菲斯特的话语冲撞着大脑，突然头痛欲裂，跪倒在地。"
    },
},
{
    id: "mountain_104_1",
    elements: {
        name: "旁白",
        text: "耳边已经听不见外面的声音，惟有梅菲斯特的话语还在回响。"
    },
},
{
    id: "mountain_105_1",
    elements: {
        name: "你",
        text: "就此安眠......无梦地安眠......"
    },
},
{
    id: "mountain_106_1",
    elements: {
        name: "旁白",
        text: "疼痛忽然消散，身体感到前所未有的轻盈。"
    },
},
{
    id: "mountain_107_1",
    elements: {
        name: "旁白",
        text: "意识逐渐模糊。"
    },
},
{
    id: "mountain_108_1",
    elements: {
        name: "你",
        text: "就此安眠......"
    },
},
{
    id: "mountain_109_1",
    elements: {
        name: "旁白",
        text: "口中喃喃着。"
    },
},
{
    id: "mountain_110_1",
    elements: {
        name: "你",
        text: "无梦地安眠......"
    },
    choices: [
        {
            text: "YOU ARE DEAD.",
            next: "chapter_0_scene_1_0",
        },
    ]
},
//分支2—2//
{
    id: "mountain_93_2",
    elements: {
        name: "旁白",
        text: "心怀决意，向梅菲斯特作出回应。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_94_2",
    elements: {
        name: "你",
        text: "你这“永远否定的精灵”，你的智慧固然深邃，却如冰般寒冷，如夜般死寂！"
    },
},
{
    id: "mountain_95_2",
    elements: {
        name: "你",
        text: "你向我揭示的，并非终极的真理，只是真理投下的阴影！"
    },
},
{
    id: "mountain_96_2",
    elements: {
        name: "旁白",
        text: "向前一步，以凛然的目光看着梅菲斯特。"
    },
},
{
    id: "mountain_97_2",
    elements: {
        name: "你",
        text: "你言说空无为万物归宿，便断言过程毫无价值？"
    },
},
{
    id: "mountain_98_2",
    elements: {
        name: "你",
        text: "那么，晨露必干，便否认其曾映照朝阳？"
    },
},
{
    id: "mountain_98_2_1",
    elements: {
        name: "你",
        text: "花朵必凋，便嘲笑其曾绽放芬芳？"
    },
},
{
    id: "mountain_99_2",
    elements: {
        name: "你",
        text: "正是这“终将逝去”，才赋予此刻以无上的珍贵！"
    },
},
{
    id: "mountain_99_2_1",
    elements: {
        name: "你",
        text: "你的逻辑，是坟墓的逻辑！"
    },
},
{
    id: "mountain_100_2",
    elements: {
        name: "你",
        text: "你予我的‘宁静’，是绝对停滞的死亡！"
    },
},
{
    id: "mountain_100_2_1",
    elements: {
        name: "你",
        text: "你予我的‘自由’，是放弃选择的虚空！"
    },
},
{
    id: "mountain_101_2",
    elements: {
        name: "你",
        text: "而我，宁可选择这负重的痛苦，这挣扎的疲惫，"
    },
},
{
    id: "mountain_101_2_1",
    elements: {
        name: "你",
        text: "这充满怀疑却永不屈服的前行——我感受到为巨人与神奋斗的力量！"
    },
},
{
    id: "mountain_102_2",
    elements: {
        name: "旁白",
        text: "梅菲斯特脸色阴暗，嘴角的笑容也消失不见。"
    },
},
{
    id: "mountain_103_2",
    elements: {
        name: "你",
        text: "梅菲斯特，你永恒的“否”确是世界的一部分。"
    },
},
{
    id: "mountain_104_2",
    elements: {
        name: "你",
        text: "但我的心，我的灵魂，我对这世界炽热的‘是’——同样也是！"
    },
},
{
    id: "mountain_105_2",
    elements: {
        name: "你",
        text: "继续你的否定吧，而我，将永恒地肯定下去，直至时间的尽头！"
    },
},
{
    id: "mountain_106_2",
    elements: {
        name: "你",
        text: "这便是我的选择，我的救赎，以及…对你虚无之声最彻底的反驳！"
    },
},
{
    id: "mountain_107_2",
    elements: {
        name: "旁白",
        text: "梅菲斯特脸上的悲悯与讥讽骤然碎裂，完美的面容上。"
    },
},
{
    id: "mountain_107_2_1",
    elements: {
        name: "旁白",
        text: "第一次浮现出近乎惊讶的神情，随机化为一种冰冷中燃烧的怒火。"
    },
},
{
    id: "mountain_108_2",
    elements: {
        name: "梅菲斯特",
        text: "呵呵。"
    },
},
{
    id: "mountain_109_2",
    elements: {
        name: "旁白",
        text: "他发出一声并非人类喉咙能产生的叹息，像是无数否定交织成的和弦。"
    },
},
{
    id: "mountain_110_2",
    elements: {
        name: "梅菲斯特",
        text: "竟敢在那永恒的织机前，妄谈选择？"
    },
},
{
    id: "mountain_111_2",
    elements: {
        name: "旁白",
        text: "周围的空间开始震颤。梅菲斯特的身影依旧优雅地站在原地。"
    },
},
{
    id: "mountain_111_2_1",
    elements: {
        name: "旁白",
        text: "但身后的阴影却向四周膨胀、吞噬着周围的光线。"
    },
},
{
    id: "mountain_112_2",
    elements: {
        name: "梅菲斯特",
        text: "就让我看看吧！信念的血肉能否抵御深渊的利齿！"
    },
},
{
    id: "mountain_113_2",
    elements: {
        name: "梅菲斯特",
        text: "就让我亲手撕碎你那可笑的意志！"
    },
},










]
}
export default scene;