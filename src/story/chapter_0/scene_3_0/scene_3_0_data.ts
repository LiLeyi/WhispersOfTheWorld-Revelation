import { Scene } from '../../../types/SceneTypes';
import { ArchiveManager } from '../../../components/ArchiveManager';
import { CardManager } from '../../../components/mini_games/card_game';
import { BackgroundManager } from '../../../components/BackgroundManager';
import { AchievementManager } from '../../../components/AchievementManager';
import { BagManager } from '../../../components/BagManager';
import { CardGameEventData } from '../../../types/MiniGameEvents';
// 定义第3章第1幕场景
const scene: Scene = {
id:"chapter_0_scene_3_0",
title:"第三章第1幕:",
nodes: [
 {
            id: "video_node",
            elements: {
                name: "旁白",
                text: "播放视频"
            },
            video: "3.mp4", // 视频文件应放在 src/assets/video/ 目录下
        },    
{
    id: "mountain_2",
    elements: {
        background:"sc3.1/3-1-3.jpg",
        bgm:"bgm3.mp3",
        name: "旁白",
        text: "一个在粗鄙的爱欲中以固执的器官附着于世界。",
        sprite: {
            left: null,
        }
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
        text: "也许不是惧怕我，而是惧怕你呢。",
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
        text: "那你怕我么？",
        sprite: {
            left: "guangling/smile1.png",
        }
    },
},
{
    id: "mountain_20",
    elements: {
        name: "旁白",
        background:"sc3.1/3-1-3.jpg",
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
        text: "看来你也是个邪恶的家伙。",
        sprite: {
            left: "guangling/jingya.png",
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
        text: "演得不像。",
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
        text: "......",
        sprite: {
            left: "guangling/smile.png",
        }
    },
},
{
    id: "mountain_30_1",
    elements: {
        name: "光泠",
        text: "从容或许源自悸动已久后的习惯。",
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
        text: "哦？总有些事物，是比恶鬼更可怖的。",
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
        text: "当然。",
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
        text: "人唯一无法舍弃的，就是被他者理解的渴望。",
        sprite: {
            left: "guangling/smile1.png",
        }
    },
},
{
    id: "mountain_26_2_1",
    elements: {
        name: "光泠",
        text: "所以我们才会在相遇相识后如此欣喜。",
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
        text: "不妨将我看做一个久别重逢的故友。",
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
        background:"sc3.1/3-1-4.jpg",
        bgm:"bgm14.MP3",
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
        background:"sc3.1/3-1-5.jpg",
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
        background:"sc3.1/3-1-1.jpg",
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
        text: "的确像个蹩脚的演员。",
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
        background:"sc3.1/3-1-6.jpg",
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
        text: "恶魔。",
        sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_65",
    elements: {
        name: "梅菲斯特",
        text: "我并非恶魔，而是答案。",
         sprite: {
            left: "NPC/zaie.png",
        }
    },
},
{
    id: "mountain_66",
    elements: {
        background:"sc3.1/3-1-1.jpg",
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
        text: "你的话语是如此的无力。",
        sprite: {
            left:null,
        }
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
        text: "旅人啊，你们为何如此匆忙地奔向痛苦？",
       sprite: {
            left: "NPC/zaie.png",
        }
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
        text: "他的话语似乎有种惑人心智的魔力，不断在耳边回响。",
        sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_76",
    elements: {
        name: "梅菲斯特",
        text: "正如我曾对那位博学的博士所言：",
        sprite: {
            left: "NPC/zaie.png",
        }
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
        background:"sc3.1/3-1-6.png",
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
            left: "NPC/zaie.png",
        }
    },
},
{
    id: "mountain_92",
    elements: {
        background:"sc3.1/3-1-11.jpg",
        name: "梅菲斯特",
        text: "与我同行，你并非坠入黑暗，你只是......睁开了眼睛。"
    },
    keyNode: true,
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
       background:"sc3.1/3-1-7.jpg",
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
       background:"sc3.1/3-1-11.jpg",
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
        text: "意义不是被谁给予，而是由你去创造。",
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
        background:"sc3.1/3-1-5.jpg",
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
    action: () => {
                let am = AchievementManager.getInstance();
                am.unlockAchievementWithAnimation("death_ending");
            },
    choices: [
        {
            text: "YOU ARE DEAD.",
            next: "chapter_0_scene_0",
        },
    ]
},
//分支2—2//
{
    id: "mountain_93_2",
    elements: {
        background:"sc3.1/3-1-1.jpg",
        bgm: "bgm7.mp3",
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
        text: "第一次浮现出近乎惊讶的神情，随机化为一种冰冷中燃烧的怒火。",
        sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_108_2",
    elements: {
        name: "梅菲斯特",
        text: "呵呵。",
        sprite: {
            left: "NPC/zaie.png",
        }
    },
},
{
    id: "mountain_109_2",
    elements: {
        name: "旁白",
        text: "他发出一声并非人类喉咙能产生的叹息，像是无数否定交织成的和弦。",
        sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_110_2",
    elements: {
        name: "梅菲斯特",
        text: "竟敢在那永恒的织机前，妄谈选择？",
        sprite: {
            left: "NPC/zaie.png",
        }
    },
},
{
    id: "mountain_111_2",
    elements: {
        name: "旁白",
        text: "周围的空间开始震颤。梅菲斯特的身影依旧优雅地站在原地。",
        sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_111_2_1",
    elements: {
        name: "旁白",
        text: "但身后的阴影却向四周膨胀、吞噬着周围的光线。",
        sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_112_2",
    elements: {
        background:"sc3.1/3-1-1.jpg",
        name: "梅菲斯特",
        text: "就让我看看吧！信念的血肉能否抵御深渊的利齿！",
       sprite: {
            left: "NPC/zaie.png",
        }
    },
},
{
                id: "test_game4",
                elements: {
                    name: "梅菲斯特",
                    text: "我将亲手撕碎你那可笑的意志！",
                   sprite: {
            left: "NPC/zaie.png",
        }
                },
                game: {
                    id: "card_game",
                    config: {
                        player: {
                            actionPoints: 4,
                            hp: 45,
                            maxHp: 45,
                             deck: () => {
                                const bagManager = BagManager.getInstance();
                                return bagManager.getCardDeckForGame();
                            },
                            drawCount: 2,           // 玩家每回合抽2张牌
                            initialDrawCount: 3 ,    // 玩家开始时抽3张牌
                        },
                        deckSelection: {
                        minDeckSize: 10,   // 设置最小选牌数量
                        maxDeckSize: 20,   // 设置最大选牌数量
                    },
                        opponent: {
                            name:"梅菲斯特",
                            actionPoints: 7,
                            hp: 25,
                            maxHp: 25,
                            deck: {
                                 "reapers_whisper":6,       
                            },
                            drawCount: 2,           // 对手每回合抽3张牌
                            initialDrawCount: 4 ,    // 对手开始时抽4张牌
                          },
                        backgroundImage:"game/meifeisite.jpg",
                        bgm:"sishen"
                    },
                    end: [
                        {
                            condition: (gameData: CardGameEventData) => gameData.score >= 1,
                            next: "victory",
                        },
                        {
                            condition: () => true, // 默认条件，总是为真
                            next: "fail",
                        }
                    ]
                }
            },     
{
    id: "fail",
    elements: {
        background:"sc3.1/3-1-11.jpg",
        bgm: "bgm14.MP3",
        name: "旁白",
        text: "你失败了",
        sprite: {
            left:null,
        }
    },
    choices:[
        {
            text:"请重新挑战",
            next:"test_game4",
        },
        {
            text:"安详离世",
            next:"mountain_114_2_1",
        },
        {
            text:"继续前进",
            next:"mountain_114_2_2",
        }
    ]
},      
            {
    id: "victory",
    elements: {
       background:"sc3.1/3-1-1.jpg",
        bgm: "bgm10.MP3",
        name: "旁白",
        text: "你成功战胜了死神",
        sprite: {
            left:null,
        }
    },
    choices:[
        {
            text:"继续前进",
            next:"mountain_114_2_2",
        }
    ]
}, 
//分支2-2-1//
{
    id: "mountain_114_2_1",
    elements: {
        background:"sc3.1/3-1-11.jpg",
        bgm: "bgm14.MP3",
        name: "旁白",
        text: "被巨大的冲击力震飞，重重地甩在地上，眼前只剩下一片虚无。",
        sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_115_2_1",
    elements: {
        name: "旁白",
        text: "梅菲斯特的黑影向我席卷而来，彻底包裹了我。",
        sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_116_2_1",
    elements: {
        name: "旁白",
        text: "在这片死寂的黑暗的空间中，惟有梅菲斯特的话语在耳边回响。"
    },
},
{
    id: "mountain_117_2_1",
    elements: {
        name: "梅菲斯特",
        text: "就此安眠......无梦地安眠......",
        sprite: {
            left: "NPC/zaie.png",
        }
    },
    action: () => {
                let am = AchievementManager.getInstance();
                am.unlockAchievementWithAnimation("death_ending");
            },
    choices: [
        {
            text: "YOU ARE DEAD.",
            next: "chapter_0_scene_0",
        },
    ]
},
//分支2-2-2//
{
    id: "mountain_114_2_2",
    elements: {
        background:"sc3.1/3-1-1.jpg",
        bgm: "bgm10.MP3",
        name: "旁白",
        text: "融合光泠的力量的暗寂刺穿了梅菲斯特的咽喉。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_115_2_2",
    elements: {
        name: "你",
        text: "你本人就像你的话语一样软弱无力。",
        sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_116_2_2",
    elements: {
        background:"sc3.1/3-1-6.jpg",
        name: "旁白",
        text: "瞬息之间，将梅菲斯特的身躯四分五裂，化为飘散的黑烟。",
        sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_117_2_2",
    elements: {
        name: "梅菲斯特",
        text: "怀疑已在心中扎根，虚无将会张开怀抱。",
        sprite: {
            left: "NPC/zaie.png",
        }
    },
},
{
    id: "mountain_118_2_2",
    elements: {
        name: "旁白",
        text: "梅菲斯特的头颅依旧在地上蠕动。他的面容上泛起了悲悯。",
        sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_119_2_2",
    elements: {
        background:"sc3.1/3-1-7.jpg",
        name: "梅菲斯特",
        text: "我是杀不死的，我是永恒的。",
        sprite: {
            left: "NPC/zaie.png",
        }
    },
},
{
    id: "mountain_120_2_2",
    elements: {
        name: "梅菲斯特",
        text: "只要你们尚在世上，我就会一直凝视着你们。"
    },
},
{
    id: "mountain_121_2_2",
    elements: {
        name: "旁白",
        text: "头颅开始化作黑烟消散。",
        sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_122_2_2",
    elements: {
        name: "梅菲斯特",
        text: "攀登者啊，请聆听我最后的献词：",
       sprite: {
            left: "NPC/zaie.png",
        }
    },
},
{
    id: "mountain_123_2_2",
    elements: {
        name: "梅菲斯特",
        text: "旧痛变成了新伤，又重新怨诉生活里纷乱复杂的舛误行程。"
    },
},
{
    id: "mountain_124_2_2",
    elements: {
        name: "梅菲斯特",
        text: "在美好时光遭到命运欺骗的那些善良人已从我眼前凋零。"
    },
},
{
    id: "mountain_125_2_2",
    elements: {
        name: "梅菲斯特",
        text: "那些听过我初遍诗句的人们再也听不到这些日后的歌吟。"
    },
},
{
    id: "mountain_126_2_2",
    elements: {
        name: "梅菲斯特",
        text: "曾友好追随的朋辈已经泯没，连那最初的反响啊，也已消沉。"
    },
},
{
    id: "mountain_127_2_2",
    elements: {
        name: "梅菲斯特",
        text: "把我的悲哀唱给陌生的观众，他们的喝彩只折磨我的心魂。"
    },
},
{
    id: "mountain_128_2_2",
    elements: {
        name: "梅菲斯特",
        text: "往日喜欢我的歌声的朋友，纵活着也已向人间四散离分。"
    },
},
{
    id: "mountain_129_2_2",
    elements: {
        name: "梅菲斯特",
        text: "我泪水滔滔不住，一阵颤抖，苦涩的心情感觉到柔静安舒。"
    },
},
{
    id: "mountain_130_2_2",
    elements: {
        name: "梅菲斯特",
        text: "流失的一切就将要成为现实，曾经把住的却像已消失远处。"
    },
},
{
    id: "mountain_131_2_2",
    elements: {
        name: "旁白",
        text: "唱完这最后一句，梅菲斯特的头颅彻底灰飞烟灭。",
        sprite: {
            left:null,
        },
    },
action: () => {
                const bagManager = BagManager.getInstance();
                bagManager.addCardsToBag("reapers_groan", 1);
}
},
{
    id: "mountain_132_2_2",
    elements: {
        background:"sc3.1/3-1-4.jpg",
        name: "你",
        text: "......"
    },
},
{
    id: "mountain_133_2_2",
    elements: {
        name: "旁白",
        text: "长舒一口气，平复内心的波澜。"
    },
},
{
    id: "mountain_134_2_2",
    elements: {
        name: "你",
        text: "走吧。"
    },
},
{
    id: "mountain_135_2_2",
    elements: {
        
        name: "旁白",
        text: "越过流水与悬崖，行至山林深处，眼前出现了一座高大而神秘的青铜门。"
    },
},
{
    id: "mountain_136_2_2",
    elements: {
        background:"sc3.1/3-1-8.jpg",
        name: "旁白",
        text: "锈迹斑斑的青铜门好似历经了千百年的风吹雨打，散发着岁月的厚重感。"
    },
},
{
    id: "mountain_137_2_2",
    elements: {
        name: "旁白",
        text: "门间挂着沉重的锁链，仿佛要将门后的一切封印在黑暗中。"
    },
},
{
    id: "mountain_138_2_2",
    elements: {
        name: "旁白",
        text: "陈旧之下，却弥漫着诡异的气息。"
    },
},
{
    id: "mountain_138_2_2_1",
    elements: {
        background:"sc3.1/3-1-9.jpg",
        bgm: "bgm14.MP3",
        name: "旁白",
        text: "细看才发觉门上雕刻着山林中各类鬼怪，张牙舞爪，仿佛要从门中挣脱而出。",
    sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_139_2_2",
    elements: {
        name: "光泠",
        text: "啊，我们所寻之物，也应当在这门后了。",
        sprite: {
            left: "guangling/smile.png",
        }
    },
    keyNode: true,
    choices: [
        {
            text: "等等吧。",
            next: "mountain_140_2_2_1",
        },
        {
            text: "走吧。我会斩断一切阻碍。",
            next: "mountain_140_2_2_2",
        },
    ]
},//选择分支2，进入与鬼怪的战斗//
//分支2-2-2-1//
{
    id: "mountain_140_2_2_1",
    elements: {
        background:"sc3.1/3-1-9.jpg",
        name: "你",
        text: "我觉得还是太危险了。",
         sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_141_2_2_1",
    elements: {
        name: "你",
        text: "回想起梅菲斯特的话，我总觉得有问题。"
    },
},
{
    id: "mountain_142_2_2_1",
    elements: {
        name: "你",
        text: "说不定门后正是梅菲斯特为我们精心设计的陷阱，想要我们踏入。"
    },
},
{
    id: "mountain_143_2_2_1",
    elements: {
        name: "光泠",
        text: "“我将永远地肯定下去，直至时间的尽头。”",
        sprite: {
            left: "guangling/smile.png",
        }
    },
},
{
    id: "mountain_144_2_2_1",
    elements: {
        name: "光泠",
        text: "这可是你说的话。",
    },
},
{
    id: "mountain_145_2_2_1",
    elements: {
        name: "你",
        text: "虽然是这样，但我觉得应当慎重考虑。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_146_2_2_1",
    elements: {
        name: "你",
        text: "谁也不能确定，只有这一条路可以走吧？"
    },
},
{
    id: "mountain_147_2_2_1",
    elements: {
        name: "你",
        text: "“流失的一切就将要成为现实，曾经把住的却像已消失远处。”"
    },
},
{
    id: "mountain_148_2_2_1",
    elements: {
        name: "你",
        text: "如果真的陷入万劫不复，我们可就前功尽弃了。"
    },
},
{
    id: "mountain_149_2_2_1",
    elements: {
        name: "光泠",
        text: "......",
        sprite: {
            left: "guangling/wubiaoqing.png",
        }
    },
},
{
    id: "mountain_150_2_2_1",
    elements: {
        name: "光泠",
        text: "若你执意离去，我也无法阻止。",
        sprite: {
            left: "guangling/tanqi.png",
        }
    },
},
{
    id: "mountain_151_2_2_1",
    elements: {
        name: "光泠",
        text: "就让我看看，你所做出的选择，会导向何种结局吧。",
    },
    next:"chapter_0_scene_4_0",
},
//分支2-2-2-2//
{
    id: "mountain_140_2_2_2",
    elements: {
        background:"sc3.1/3-1-2.jpg",
        name: "旁白",
        text: "将暗寂化为黑色巨炮，在光芒中轰飞了青铜门上的锁链。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_141_2_2_2",
    elements: {
        name: "旁白",
        text: "随后又将暗寂化为黑色巨拳，跃至空中一把甩下。",
    },
},
{
    id: "mountain_142_2_2_2",
    elements: {
        name: "旁白",
        text: "轰隆隆！在巨力的击打下，沉重的青铜门应声而开。"
    },
},
{
    id: "mountain_143_2_2_2",
    elements: {
        name: "你",
        text: "走吧。"
    },
},
{
    id: "mountain_144_2_2_2",
    elements: {
        background:"sc3.1/3-1-10.jpg",
        bgm: "bgm15.MP3",
        name: "旁白",
        text: "进入门后，发现内部别有洞天。门后的世界比想象中的要宽广，也不像原本预想的那样黑暗。"
    },
},
{
    id: "mountain_145_2_2_2",
    elements: {
        name: "旁白",
        text: "吼！一只双眼猩红的恶鬼飞扑而来，但还没接近便被光泠的屏障击飞。"
    },
},
{
    id: "mountain_146_2_2_2",
    elements: {
        name: "旁白",
        text: "随后更多猩红的眼睛在暗处闪烁，形态各异的恶鬼向我们袭来。"
    },
},
{
    id: "mountain_147_2_2_2",
    elements: {
        name: "你",
        text: "看来这里的鬼物，比之前那些小喽喽要强，甚至都不再怕你了。"
    },
},
{
    id: "mountain_148_2_2_2",
    elements: {
        name: "你",
        text: "反而看起来对你的攻击欲望更强了，似乎是把你当作了猎物。"
    },
},
{
    id: "mountain_149_2_2_2",
    elements: {
        name: "光泠",
        text: "听上去不是什么好事啊。",
        sprite: {
            left: "guangling/smile.png",
        }
    },
choices: [
        {
            text: "与鬼怪发生战斗",
            next: "test_game5",
        },
    ]
},
{
                id: "test_game5",
                elements: {
                    name: "鬼怪",
                    text: "鎴戜滑浼氬湪浣犱滑鐨勫潫澶翠笂韫﹁开銆�",//（我们会在你们的坟头蹦迪）
                },
                game: {
                    id: "card_game",
                    config: {
                        player: {
                            actionPoints: 4,
                            hp: 45,
                            maxHp: 45,
                             deck: () => {
                                const bagManager = BagManager.getInstance();
                                return bagManager.getCardDeckForGame();
                            },
                            drawCount: 2,           // 玩家每回合抽2张牌
                            initialDrawCount: 3 ,    // 玩家开始时抽3张牌
                        },
                        deckSelection: {
                        minDeckSize: 15,   // 设置最小选牌数量
                        maxDeckSize: 20,   // 设置最大选牌数量
                    },
                        opponent: {
                            name:"鬼怪",
                            actionPoints: 7,
                            hp: 25,
                            maxHp: 25,
                            deck: {
                                 "mountain_ghoul":3,
                                "forest_ghoul":2,
                                 "drowned_ghoul":2,
                                 "hungry_ghoul":2,
                                 "lonely_ghoul":1,
                                 "stingy_ghoul":2,
                            },
                            drawCount: 5,           // 对手每回合抽3张牌
                            initialDrawCount: 6 ,    // 对手开始时抽4张牌
                          },
                        backgroundImage:"game/guiguai.jpg",
                        bgm:"guiguai"
                    },
                    end: [
                        {
                            condition: (gameData: CardGameEventData) => gameData.score >= 1,
                            next: "victory_1",
                        },
                        {
                            condition: (score: number) => true, // 默认条件，总是为真
                            next: "fail_1",
                        }
                    ]
                }
            }, 
            {
                id: "victory_1",
                elements: {
                    name: "旁白",
                    text: "你胜利了",
                },
                choices: [
                        {
                            text: "重新挑战",
                            next: "test_game5",
                        },
                        {
                            text: "继续前进",
                            next: "mountain_150_2_2_2",
                        },           
],
            },    
{
    id: "mountain_150_2_2_2",
    elements: {
        name: "旁白",
        text: "片刻之后，袭来的恶鬼尽数被斩杀。",
        sprite: {
            left: null,
        }
    },
    action: () => {
                const bagManager = BagManager.getInstance();
                bagManager.addCardsToBag("ghostly_figures", 1);
}
},
{
    id: "mountain_150_2_2_2_1",
    elements: {
        name: "旁白",
        text: "恶鬼的尸体却化作一团黑雾聚集在一起，突然向我们席卷而来。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_151_2_2_2",
    elements: {
        name: "旁白",
        text: "然而，正欲防御，黑雾却又不见踪影。有点神秘。"
    },
},
{
    id: "mountain_152_2_2_2",
    elements: {
        name: "光泠",
        text: "仍需小心。",
        sprite: {
            left: "guangling/wubiaoqing.png",
        }
    },
},
{
    id: "mountain_153_2_2_2",
    elements: {
        
        name: "你",
        text: "继续前进吧。深入一路，也灭杀了一路的恶鬼。",
    sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_153_2_2_2_1",
    elements: {
        background:"sc3.1/3-1-1.jpg",
        bgm: "bgm16.MP3",
        name: "旁白",
        text: "不知走了多久，终于发现了一个隐秘的洞窟。",
    sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_154_2_2_2",
    elements: {
        name: "你",
        text: "我已经感应到了，就在这里。"
    },
},
{
    id: "mountain_155_2_2_2",
    elements: {
        name: "光泠",
        text: "嗯。不过恐怕我们不能轻松地得到它了。",
        sprite: {
            left: "guangling/wubiaoqing.png",
        }
    },
},
{
    id: "mountain_156_2_2_2",
    elements: {
        name: "你",
        text: "虽然很糟糕，但你说的没错。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_157_2_2_2",
    elements: {
        name: "旁白",
        text: "洞窟前方传来令人毛骨悚然的声音。"
    },
},
{
    id: "mountain_157_2_2_2_1",
    elements: {
        name: "旁白",
        text: "起初是一种极其细微的、仿佛来自极远之处的呜咽，像是无数失去至亲之人在深渊尽头哀哭。"
    },
},
{
    id: "mountain_158_2_2_2",
    elements: {
        name: "旁白",
        text: "但随着这声音迅速放大、逼近，转眼间变得尖锐而扭曲，不再是悲伤的呜咽。"
    },
},
{
    id: "mountain_158_2_2_2_1",
    elements: {
        name: "旁白",
        text: "而是充满了纯粹的、针对一切生者与光明的憎恨的诅咒。"
    },
},
{
    id: "mountain_159_2_2_2",
    elements: {
        background:"sc3.1/3-1-13.jpg",
        name: "旁白",
        text: "四周的岩壁上，开始浮现出淡淡的、磷火般的幽绿光芒。"
    },
},
{
    id: "mountain_159_2_2_2_1",
    elements: {
        name: "旁白",
        text: "这些光点如同痛苦的蠕虫般扭曲、爬行，逐渐汇聚起来。"
    },
},
{
    id: "mountain_160_2_2_2",
    elements: {
        name: "旁白",
        text: "眼前浮现出一个恐怖的身影。它——或者说它们——从黑暗中最浓稠的地方渗出。"
    },
},
{
    id: "mountain_160_2_2_2_1",
    elements: {
        name: "旁白",
        text: "它们不具有固定的形态，更像是一团不断翻滚着、尖叫着的雾气。"
    },
},
{
    id: "mountain_161_2_2_2",
    elements: {
        name: "旁白",
        text: "无数张扭曲而痛苦的面孔在那半透明的躯体表面浮现又湮灭。"
    },
},
{
    id: "mountain_161_2_2_2_1",
    elements: {
        name: "旁白",
        text: "四肢、头颅、破碎的躯干试图挣脱出来，却又被无形的力量拉回整体的混沌之中。"
    },
},
{
    id: "mountain_162_2_2_2",
    elements: {
        name: "旁白",
        text: "它就像一片绝对的虚空，甚至算不上黑暗，只是一个吞噬所有光与希望的“无”之点。"
    },
},
{
    id: "mountain_163_2_2_2",
    elements: {
        name: "旁白",
        text: "它没有眼睛，却让人感受到一种贪婪而冰冷的注视——那种邪恶的凝视，正牢牢锁定着光泠。"
    },
},
{
    id: "mountain_164_2_2_2",
    elements: {
        name: "旁白",
        text: "骤然间，那混杂着无数痛苦的尖啸戛然而止。"
    },
},
//主线//
{
    id: "mountain_165",
    elements: {
        
        name: "你",
        bgm: "bgm10.MP3",
        text: "恶魂(ghost)",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_166",
    elements: {
        name: "旁白",
        text: "下一刻，它动了。"
    },
},
{
    id: "mountain_166_1",
    elements: {
        name: "旁白",
        text: "并非奔跑或者跳跃，而是如同噩梦中的影像般剽掠而至，无声无息，却快得令人窒息。"
    },
},
{
    id: "mountain_167",
    elements: {
        name: "旁白",
        text: "所经之处瞬间凝结起白霜，仿佛空气都被抽光了生机，陷入死寂。"
    },
},
{
    id: "mountain_168",
    elements: {
        name: "旁白",
        text: "它伸出由哀嚎着的灵魂凝聚成的扭曲“手臂”，径直向光泠抓去，"
    },
},
{
    id: "mountain_168_1",
    elements: {
        name: "旁白",
        text: "夹带着一种比物理攻击更可怕的力量——冻结灵魂，将生机化为枯朽死寂的侵蚀之力。"
    },
},
{
    id: "mountain_169",
    elements: {
        name: "你",
        text: "小心！"
    },
},
{
    id: "mountain_170",
    elements: {
        name: "旁白",
        text: "将光泠护至身后，手中的暗寂瞬间化为一张铺天盖地的黑色大网拦在恶魂前。"
    },
},
{
    id: "mountain_171",
    elements: {
        name: "旁白",
        text: "那雾状的身体却毫无障碍地穿过了暗寂。"
    },
},
{
    id: "mountain_172",
    elements: {
        name: "旁白",
        text: "收起暗寂，顺便撕裂岩壁击起碎石飞向恶魂。"
    },
},
{
    id: "mountain_173",
    elements: {
        name: "旁白",
        text: "不给自己喘息的时间，抱起光泠的瞬间，又将暗寂化为黑色棘刺锁链，钩住岩壁，向洞窟外拉去。"
    },
},
{
    id: "mountain_174",
    elements: {
        name: "旁白",
        text: "光泠抬手释放光屏",
    },
},
{
    id: "mountain_175",
    elements: {
        name: "旁白",
        text: "光屏使恶魂的行动受阻，攻势减缓。"
    },
},
{
    id: "mountain_175_1",
    elements: {
        name: "旁白",
        text: "大小不一的碎石砸向恶魂，洞穿了它的“手臂”。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_176",
    elements: {
        name: "旁白",
        text: "最后一刻，我们成功避开了恶魂的袭击，逃离了洞窟。真是可怕的力量。"
    },
    keyNode: true,
    choices: [
        {
            text:"我们得好好想想，怎么面对这个前所未有的强敌。",
            next:"mountain_177_2",
        },
        {
            text: "该到此为止了。",
            next: "mountain_177_1",
        },
    ],
},
//分支3-1//
{
    id: "mountain_177_1",
    elements: {
        background:"sc3.1/3-1-11.jpg",
        name: "旁白",
        text: "我感到前所未有的恐惧，却没有发现一团黑雾在周围浮现。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_177_1",
    elements: {
        name: "你",
        text: "差一点，就要栽在这了。",
    },
},
{
    id: "mountain_178_1",
    elements: {
        name: "旁白",
        text: "我惊魂未定，大口喘息着，全然没有发觉自己吸进了大片黑雾。"
    },
},
{
    id: "mountain_179_1",
    elements: {
        name: "你",
        text: "你差点就死了。我也是。"
    },
},
{
    id: "mountain_180_1",
    elements: {
        name: "旁白",
        text: "越是回想刚才的情景，就越是感到一阵后怕。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_181_1",
    elements: {
        name: "光泠",
        text: "你还好吗？",
        sprite: {
            left: "guangling/down.png",
        }
    },
},
{
    id: "mountain_182_1",
    elements: {
        name: "旁白",
        text: "光泠扶住我，我感觉一阵瘫软。恐惧，在这一刻彻底占领了大脑。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_183_1",
    elements: {
        name: "光泠",
        text: "去！",
        sprite: {
            left: "guangling/wubiaoqing.png",
        }
    },
},
{
    id: "mountain_184_1",
    elements: {
        name: "旁白",
        text: "一股黑雾从我口中吐出，似乎夹杂着尖叫与呜咽，被光泠一把抓在手中，在空中消散。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_185_1",
    elements: {
        name: "旁白",
        text: "慢慢的，恐惧的潮水退去。理智渐渐恢复，占据高地。支撑着站起身来。"
    },
},
{
    id: "mountain_186_1",
    elements: {
        name: "你",
        text: "我好些了。不过，先离开这里再说。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_187_1",
    elements: {
        name: "光泠",
        text: "嗯。",
        sprite: {
            left: "guangling/wubiaoqing.png",
        }
    },
},
{
    id: "mountain_188_1",
    elements: {
        background:"sc3.1/3-1-8.jpg",
        bgm: "bgm2.mp3",
        name: "旁白",
        text: "走出青铜门，回望门内，仍感到心有余悸。呼。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_188_1_1",
    elements: {
        name: "旁白",
        text: "这一次，是真的没有办法了。我甚至无法直接攻击到恶魂。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_189_1",
    elements: {
        name: "光泠",
        text: "我们一起想想有什么办法。",
        sprite: {
            left: "guangling/smile.png",
        }
    },
},
{
    id: "mountain_190_1",
    elements: {
        name: "你",
        text: "不。我想得很清楚了。这里不是我们该来的地方。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_191_1",
    elements: {
        name: "光泠",
        text: "嗯？我想，我应该已经将那种放大内心恐惧的雾气清除了吧。",
        sprite: {
            left: "guangling/down.png",
        }
    },
},
{
    id: "mountain_192_1",
    elements: {
        name: "你",
        text: "是的，非常谢谢你。不过恶魂可不是闹着玩的。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_192_1_1",
    elements: {
        name: "你",
        text: "现在想想，避开它才是正确的选择。"
    },
},
{
    id: "mountain_193_1",
    elements: {
        background:"sc3.1/3-1-2.jpg",
        name: "旁白",
        text: "‘在美好时光遭到命运欺骗的那些善良人已从我眼前凋零。’",
    },
},
{
    id: "mountain_193_1_1",
    elements: {
        name: "旁白",
        text: "梅菲斯特说得不错，或许我们这样的善良人就是遭到了命运的欺骗，才会来到这里。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_194_1",
    elements: {
        name: "光泠",
        text: "凋零了也没有关系，一朵花没落不了整个春天。",
        sprite: {
            left: "guangling/smile1.png"
        }
    },
},
{
    id: "mountain_195_1",
    elements: {
        name: "光泠",
        text: "......",
        sprite: {
            left: "guangling/wubiaoqing.png",
        }
    },
},
{
    id: "mountain_196_1",
    elements: {
        name: "光泠",
        text: "不过看来梅菲斯特的确说得不错。",
        sprite: {
            left: "guangling/tanqi.png",
        }
    },
},
{
    id: "mountain_197_1",
    elements: {
        name: "你",
        text: "是的。",
         sprite: {
            left: "guangling/tanqi.png",
        }
    },
},
{
    id: "mountain_198_1",
    elements: {
        name: "光泠",
        text: "他果然还在凝视着我们。",
        sprite: {
            left: "guangling/sigh.png",
        }
    },
},
{
    id: "mountain_199_1",
    elements: {
        name: "你",
        text: "这又是什么意思？",
         sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_200_1",
    elements: {
        name: "光泠",
        text: "没什么。",
        sprite: {
            left: "guangling/down.png"
        }
    },
},
{
    id: "mountain_201_1",
    elements: {
        name: "光泠",
        text: "如果你执意离去，我也愿与你同往。",
        sprite: {
            left: "guangling/tanqi.png"
        }
    },
},
{
    id: "mountain_202_1",
    elements: {
        name: "你",
        text: "谢谢你。有你在是我的荣幸。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_203_1",
    elements: {
        name: "光泠",
        text: "谁让我是你的同伴呢？",
        sprite: {
            left: "guangling/tanqi.png"
        }
    },
    next:"chapter_0_scene_4_0",
},
//节点3-2//
{
    id: "mountain_177_2",
    elements: {
        background:"sc3.1/3-1-13.jpg",
        bgm: "bgm14.MP3",
        name: "光泠",
        text: "看来你并没有被吓退。",
        sprite: {
            left: "guangling/smile.png",
        }
    },
},
{
    id: "mountain_178_2",
    elements: {
        name: "你",
        text: "有你在身边，就不怕。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_179_2",
    elements: {
        name: "你",
        text: "我相信，一定有办法实现我们的目标的。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_180_2",
    elements: {
        name: "光泠",
        text: "干劲十足嘛。",
        sprite: {
            left: "guangling/smile1.png"
        }
    },
},
{
    id: "mountain_181_2",
    elements: {
        name: "光泠",
        text: "那么，你有什么想法吗？",
        sprite: {
            left: "guangling/smile.png"
        }
    },
},
{
    id: "mountain_182_2",
    elements: {
        name: "你",
        text: "嗯。我看到了，胜利的机会。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_183_2",
    elements: {
        name: "你",
        text: "被你的光屏阻拦的恶魂，不仅速度稍微变慢，并且还能被石头砸穿“手臂”。"
    },
},
{
    id: "mountain_184_2",
    elements: {
        name: "你",
        text: "它的主要目标是你，结合我的发现，我可以推测：你的力量能够克制它。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_185_2",
    elements: {
        name: "光泠",
        text: "观察得很细致哦。",
        sprite: {
            left: "guangling/smile.png"
        }
    },
},
{
    id: "mountain_186_2",
    elements: {
        name: "你",
        text: "可不要小瞧我啊。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_187_2",
    elements: {
        name: "你",
        text: "我猜想，你的力量能削弱恶魂的能力。"
    },
},
{
    id: "mountain_187_2_1",
    elements: {
        name: "你",
        text: "也能让它实体化。这样，我就能与之一战。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_188_2",
    elements: {
        name: "光泠",
        text: "嗯。",
        sprite: {
            left: "guangling/smile.png",
        }
    },
},
{
    id: "mountain_189_2",
    elements: {
        name: "光泠",
        text: "正确的判断！",
        sprite: {
            left: "guangling/smile1.png"
        }
    },
},
{
    id: "mountain_190_2",
    elements: {
        name: "你",
        text: "遇到事情不能坐以待毙。不战斗就无法生存。做好觉悟，一起上吧。",
    },
},//这里可以将觉悟卡升级//
{
    id: "mountain_191_2",
    elements: {
        name: "光泠",
        text: "随时准备着。",
        sprite: {
            left: "guangling/smile.png"
        }
    },
},
{
    id: "mountain_192_2",
    elements: {
        name: "旁白",
        text: "重回洞窟，恶魂依旧在空中游荡。光泠汇聚起力量，一个法阵覆盖了整个洞窟。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_192_2_1",
    elements: {
        name: "旁白",
        text: "刹那间，恶魂仿佛受到了某种刺激，洞窟中瞬间爆发了刺耳的尖啸。"
    },
},
{
    id: "mountain_193_2",
    elements: {
        name: "你",
        text: "果然，这就是它的弱点。"
    },
},
{
    id: "mountain_194_2",
    elements: {
        name: "光泠",
        text: "我会在这里掌控法阵，辅助你的战斗。",
        sprite: {
            left: "guangling/smile.png"
        }
    },
},
{
    id: "mountain_195_2",
    elements: {
        name: "旁白",
        text: "向她点了点头，随后将暗寂化为黑色巨炮，指向恶魂。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_196_2",
    elements: {
        name: "你",
        text: "来吧，你这家伙。",
        background:"sc3.1/3-1-13.jpg",
    },
    keyNode: true,},//进入与恶魂之间的战斗//
    {
                    id: "test_game6",
                    elements: {
                        name: "恶魂",
                        text: "楦′綘澶編",//鸡你太美
                    },
                    game: {
                        id: "card_game",
                        config: {
                            player: {
                                actionPoints: 3,
                                hp: 35,
                                maxHp: 35,
                                 deck: () => {
                                    const bagManager = BagManager.getInstance();
                                    return bagManager.getCardDeckForGame();
                                },
                                drawCount: 2,           // 玩家每回合抽2张牌
                                initialDrawCount: 3 ,    // 玩家开始时抽3张牌
                            },
                            deckSelection: {
                            minDeckSize: 15,   // 设置最小选牌数量
                            maxDeckSize: 20,   // 设置最大选牌数量
                        },
                            opponent: {
                                name:"恶魂",
                                actionPoints: 6,
                                hp: 30,
                                maxHp: 30,
                                deck: {
                                    "yin_spirit": 2,        
                                    "yang_spirit": 2,         
                                    "curse": 2, 
                                    "devour": 2, 
                                    "will_o_wisp":2,      
                                },
                                drawCount: 3,           // 对手每回合抽3张牌
                                initialDrawCount: 6 ,    // 对手开始时抽6张牌
                            initialBuffs: [  // 设置初始buff
                                {
                                     id: "ghast",
                                     duration: -1,
                                     target: "self"
                                 }
                             ],
                              },
                            backgroundImage:"game/ehun.jpg",
                            bgm:"ehun"
                        },
                        end: [
                            {
                                condition: (gameData: CardGameEventData) => gameData.score >= 1,
                                next: "battle_1_1_1",
                            },
                            {
                                condition: () => true, // 默认条件，总是为真
                                next: "battle_1_1",
                            }
                        ]
                    }
                },     
    
    {
    id: "battle_1_1_1",
    elements: {
        name: "旁白",
        text: "你战胜了恶魂",
        background:"sc3.1/3-1-13.jpg",
    },
    choices: [
        {
            text: "大获全胜。",
            next: "mountain_197_2_3",
        },
        {
            text: "你彻底的失败了。",
            next: "mountain_197_2_1",
        },
        {
            text: "你和恶魂不相上下。",
            next: "mountain_197_2_2",
        },
        {
            text: "重新挑战",
            next: "test_game6",
        },
    ]
},
//分支3-2-1//
{
    id: "mountain_197_2_1",
    elements: {
        background:"sc3.1/3-1-13.jpg",
        name: "旁白",
        text: "战斗并不像想象中的那样顺利。",
        bgm: "bgm2.mp3",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_198_2_1",
    elements: {
        name: "你",
        text: "呃啊！",
    },
},
{
    id: "mountain_199_2_1",
    elements: {
        name: "旁白",
        text: "一个不慎，恶魂伸出的触手洞穿了胸膛。"
    },
},
{
    id: "mountain_199_2_1_1",
    elements: {
        name: "旁白",
        text: "刹那间，生命沿着触手从身体中流逝，化作了虚无。"
    },
},
{
    id: "mountain_200_2_1",
    elements: {
        name: "旁白",
        text: "砰！重重的一击，将你直挺挺摔在岩壁上。"
    },
},
{
    id: "mountain_201_2_1",
    elements: {
        name: "旁白",
        text: "口鼻中鲜血直流，这才发觉下半身已不知何处。耳朵也听不见了。"
    },
},
{
    id: "mountain_202_2_1",
    elements: {
        name: "旁白",
        text: "恶魂爆发出嘲笑般的尖啸，整个洞窟止不住地颤抖。"
    },
},
{
    id: "mountain_203_2_1",
    elements: {
        name: "你",
        text: "真是……狼狈啊。"
    },
},
{
    id: "mountain_204_2_1",
    elements: {
        name: "旁白",
        text: "你沉沉地闭上双眼。"
    },
},
{
    id: "mountain_205_2_1",
    elements: {
        name: "旁白",
        text: "可惜，还没来得及看光泠最后一眼。"
    },
},
{
    id: "mountain_206_2_1",
    elements: {
        background:"sc3.1/3-1-11.jpg",
        name: "旁白",
        text: "等待着你的，是无穷无尽的黑暗。"
    },
    action: () => {
                let am = AchievementManager.getInstance();
                am.unlockAchievementWithAnimation("death_ending");
            },
    choices: [
        {
            text: "YOU ARE DEAD.",
            next: "chapter_0_scene_1_0",
        },
    ]
},
//分支3-2-2//
{
    id: "mountain_197_2_2",
    elements: {
        background:"sc3.1/3-1-13.jpg",
        bgm:"bgm16.MP3",
        name: "旁白",
        text: "战斗并不像想象中的那样顺利。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_198_2_2",
    elements: {
        name: "你",
        text: "呃啊！",
    },
},
{
    id: "mountain_199_2_2",
    elements: {
        name: "旁白",
        text: "一个不慎，恶魂伸出的触手洞穿了胸膛。"
    },
},
{
    id: "mountain_199_2_2_1",
    elements: {
        name: "旁白",
        text: "刹那间，生命沿着触手从身体中流逝，化作了虚无。"
    },
},
{
    id: "mountain_200_2_2",
    elements: {
        name: "旁白",
        text: "砰！重重的一击，将你直挺挺摔在岩壁上。"
    },
},
{
    id: "mountain_200_2_2_1",
    elements: {
        name: "旁白",
        text: "口鼻中鲜血直流，胸口的大洞也预示着死亡的结局。"
    },
},
{
    id: "mountain_201_2_2",
    elements: {
        name: "旁白",
        text: "恶魂爆发出嘲笑般的尖叫，整个洞窟止不住地颤抖。"
    },
},
{
    id: "mountain_202_2_2",
    elements: {
        name: "你",
        text: "真是狼狈啊……在这最后的时刻，我忍不住自嘲道。"
    },
},
{
    id: "mountain_203_2_2",
    elements: {
        name: "你",
        text: "可是，就算是跌得粉身碎骨，我也不能放弃啊。"
    },
},
{
    id: "mountain_204_2_2",
    elements: {
        name: "你",
        text: "你，也快到末路了吧。"
    },
},
{
    id: "mountain_205_2_2",
    elements: {
        name: "旁白",
        text: "你向恶魂发出最后的嘲笑。"
    },
},
{
    id: "mountain_206_2_2",
    elements: {
        name: "旁白",
        text: "用尽最后一丝力气，将暗寂化为黑色巨炮。"
    },
},
{
    id: "mountain_206_2_2_1",
    elements: {
        name: "旁白",
        text: "举起暗寂，对准恶魂，将最后的生命力量全部注入其中。"
    },
},
{
    id: "mountain_207_2_2",
    elements: {
        name: "你",
        text: "收下吧，这是我最后的光芒！！！聆听死亡的终音！"
    },
},
{
    id: "mountain_208_2_2",
    elements: {
        name: "旁白",
        text: "轰！！！猛烈的光线从暗寂中直冲而出。"
    },
},
{
    id: "mountain_208_2_2_1",
    elements: {
        name: "旁白",
        text: "爆发出前所未有的强悍威力，瞬间蒸发了沿途的一切黑暗与腐朽！"
    },
},
{
    id: "mountain_209_2_2",
    elements: {
        name: "旁白",
        text: "啊啊啊啊啊——恶魂在刺眼的光芒中爆发出最后一声尖叫，像是在哀嚎，又像是在诅咒。"
    },
},
{
    id: "mountain_210_2_2",
    elements: {
       background:"sc3.1/3-1-11.jpg",
        name: "旁白",
        text: "结束了。头脑一沉，你便失去了意识。"
    },
},
{
    id: "mountain_211_2_2",
    elements: {
        name: "旁白",
        text: "记忆，是从被冲上海岸时开始的。记不起过去的事，记不起自己为何会来到这里。"
    },
},
{
    id: "mountain_212_2_2",
    elements: {
        background:"sc3.1/3-1-12.jpg",
        name: "旁白",
        text: "几个拾荒者在浅滩上发现了你，被救起之后，也就顺理成章地在这里定居下来。"
    },
},
{
    id: "mountain_213_2_2",
    elements: {
        name: "旁白",
        text: "小镇上年事已高的修理工正在寻找一名学徒，而你似乎理所当然地就被收留了过去。"
    },
},
{
    id: "mountain_214_2_2",
    elements: {
        name: "旁白",
        text: "这门技艺并不算难，学了不久就能自主修理一些简单的小玩意儿。",
    },
},
{
    id: "mountain_215_2_2",
    elements: {
        name: "旁白",
        text: "在不用为生计发愁之后，日子似乎过得相当之快。",
    },
},
{
    id: "mountain_216_2_2",
    elements: {
        name: "旁白",
        text: "思考过去的时间变得越来越少。",
    },
},
{
    id: "mountain_217_2_2",
    elements: {
        name: "旁白",
        text: "为何自己会漂泊至此呢？",
    },
},
{
    id: "mountain_218_2_2",
    elements: {
        name: "旁白",
        text: "对于沉浸在每日吹拂的海风之中，逐渐适应这里生活节奏的自己而言，这些问题的答案慢慢变得不再重要了。",
    },
},
{
    id: "mountain_219_2_2",
    elements: {
        name: "？？？",
        text: "不要考虑“为什么”，而要思考接下来该“怎么做”。",
    },
},
{
    id: "mountain_220_2_2",
    elements: {
        name: "旁白",
        text: "过去似乎曾有人对自己说过这样一番话。",
    },
},
{
    id: "mountain_221_2_2",
    elements: {
        name: "旁白",
        text: "已经记不起那个人究竟是谁，但感觉很受用。",
    },
},
{
    id: "mountain_222_2_2",
    elements: {
        name: "旁白",
        text: "今天的订单是……",
    },
},
{
    id: "mountain_223_2_2",
    elements: {
        name: "旁白",
        text: "揭开工坊的卷帘门，拿下挂在招牌旁的笔记本。",
    },
},
{
    id: "mountain_224_2_2",
    elements: {
        name: "旁白",
        text: "当镇民们需要修理工的时候，会在笔记本上备注好具体事项，",
    },
},
{
    id: "mountain_224_2_2_1",
    elements: {
        name: "旁白",
        text: "自己和师傅会在次日一一整理，并逐条登门服务。",
    },
},
{
    id: "mountain_225_2_2",
    elements: {
        name: "修理工",
        text: "今天的订单就让你一个人去吧，我留下来守店。",
    },
},
{
    id: "mountain_226_2_2",
    elements: {
        name: "你",
        text: "知道了。",
    },
},
{
    id: "mountain_227_2_2",
    elements: {
        name: "旁白",
        text: "备齐工具箱，踏出工坊的门。",
    },
},
{
    id: "mountain_228_2_2",
    elements: {
        name: "旁白",
        text: "今天的订单不多，第一条是在镇外渔夫的小屋。",
    },
},
{
    id: "mountain_229_2_2",
    elements: {
        name: "旁白",
        text: "他的渔具坏了，需要修复。",
    },
},
{
    id: "mountain_230_2_2",
    elements: {
        name: "旁白",
        text: "海浪声伴随着呼啸的风扑面而来。",
    },
},
{
    id: "mountain_231_2_2",
    elements: {
        name: "旁白",
        text: "一阵恍惚之中，似乎听见了某种低语。",
    },
},
{
    id: "mountain_232_2_2",
    elements: {
        name: "？？？",
        text: "……终于找到你了。",
    },
},
{
    id: "mountain_233_2_2",
    elements: {
        name: "你",
        text: "谁？！",
    },
},
{
    id: "mountain_234_2_2",
    elements: {
        name: "旁白",
        text: "环顾四周，却没有发现半个人影。",
    },
},
{
    id: "mountain_235_2_2",
    elements: {
        name: "旁白",
        text: "风声渐渐平息，仿佛什么都没有发生过。",
    },
},
{
    id: "mountain_236_2_2",
    elements: {
        name: "旁白",
        text: "摇了摇头，继续前行。",
    },
},
{
    id: "mountain_237_2_2",
    elements: {
        name: "旁白",
        text: "修理完渔具，完成几单零散的小活，太阳渐渐西斜。",
    },
},
{
    id: "mountain_238_2_2",
    elements: {
        name: "旁白",
        text: "最后一单是在镇边的小屋。",
    },
},
{
    id: "mountain_239_2_2",
    elements: {
        name: "旁白",
        text: "推开吱呀作响的木门，一个熟悉的身影出现在眼前。",
    },
},
{
    id: "mountain_240_2_2",
    elements: {
        name: "你",
        text: "是……你？！",
    },
},
{
    id: "mountain_241_2_2",
    elements: {
        name: "少女",
        text: "好久不见呀。",
    },
},
{
    id: "mountain_242_2_2",
    elements: {
        name: "旁白",
        text: "那是一个记忆中反复出现过的面孔。",
    },
},
{
    id: "mountain_243_2_2",
    elements: {
        name: "旁白",
        text: "虽然记忆模糊，但可以确定的是，她和自己有着某种说不清的羁绊。",
    },
},
{
    id: "mountain_244_2_2",
    elements: {
        name: "少女",
        text: "看来你过得还不错嘛，成为修理工的学徒了？",
    },
},
{
    id: "mountain_245_2_2",
    elements: {
        name: "你",
        text: "你……是谁？",
    },
},
{
    id: "mountain_246_2_2",
    elements: {
        name: "少女",
        text: "啊，这个嘛……",
    },
},
{
    id: "mountain_247_2_2",
    elements: {
        name: "少女",
        text: "或许你暂时还想不起来也没关系。",
    },
},
{
    id: "mountain_248_2_2",
    elements: {
        background:"sc3.1/3-1-12.jpg",
        name: "少女",
        text: "对了，在这里的日子，过得还开心吗？",
    },
    choices: [
        {
            text: "挺开心的。",
            next: "mountain_249_2_2_2",
        },
        {
            text: "马马虎虎。",
            next: "mountain_249_2_2_1",
        },
    ],
},
{
    id: "mountain_249_2_2_1",
    elements: {
        name: "少女",
        text: "是吗？",
    },
    next:"mountain_250_2_2",
},
{
    id: "mountain_249_2_2_2",
    elements: {
        name: "少女",
        text: "是吗？太好了。",
    },
},
{
    id: "mountain_250_2_2",
    elements: {
        name: "少女",
        text: "她不知为何开始反问过来。",
    },
},
{
    id: "mountain_251_2_2",
    elements: {
        name: "旁白",
        text: "自己并没有多想，毕竟，把昏迷的自己救起这件事情。",
    },
},
{
    id: "mountain_251_2_2_1",
    elements: {
        name: "旁白",
        text: "在镇上引起了不小的轰动，这名少女很可能是在那时认识自己的。",
    },
},
{
    id: "mountain_252_2_2",
    elements: {
        name: "旁白",
        text: "正因如此，自己对她没有抱有任何印象，也是正常的。",
    },
},
{
    id: "mountain_253_2_2",
    elements: {
        name: "少女",
        text: "那么，我是时候该离开了。",
    },
},
{
    id: "mountain_254_2_2",
    elements: {
        name: "少女",
        text: "有缘再见。",
    },
},
{
    id: "mountain_255_2_2",
    elements: {
        name: "你",
        text: "再见……？",
    },
},
{
    id: "mountain_256_2_2",
    elements: {
        name: "旁白",
        text: "想挥手与少女告别，伴随这个动作，一份异样感向自己袭来。",
    },
},
{
    id: "mountain_257_2_2",
    elements: {
        name: "旁白",
        text: "在哪里见过她吗？",
    },
},
{
    id: "mountain_258_2_2",
    elements: {
        name: "旁白",
        text: "往日喜欢我的歌声的朋友，纵活着,也已向人间四散离分。",
    },
},
{
    id: "mountain_259_2_2",
    elements: {
        name: "旁白",
        text: "——似乎曾经听谁说过这样的话语。",
    },
},
{
    id: "mountain_260_2_2",
    elements: {
        name: "旁白",
        text: "默默看着少女渐行渐远的身影，直至她彻底消失在视野的尽头。",
    },
},
{
    id: "mountain_261_2_2",
    elements: {
        name: "旁白",
        text: "算了，是错觉吧。",
    },
    action: () => {
                let am = AchievementManager.getInstance();
                am.unlockAchievementWithAnimation("ending_1");
            },
    choices: [
        {
            text: "在重获新生的世界，少女向你献上告别。",//恭喜达成结局一！！！！
            next: "chapter_0_scene_0",
        },
    ],
},
//分支3-2-3//
{
    id: "mountain_197_2_3",
    elements: {
        background:"sc3.1/3-1-13.jpg",
        bgm:"bgm10.MP3",
        name: "恶魂",
        text: "啊啊啊啊啊啊——",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_198_2_3",
    elements: {
        name: "旁白",
        text: "恶魂爆发出尖锐刺耳的惨叫。",
    },
},
{
    id: "mountain_199_2_3",
    elements: {
        name: "旁白",
        text: "暗寂化为黑色巨炮，对准了恶魂。",
    },
},
{
    id: "mountain_200_2_3",
    elements: {
        name: "你",
        text: "由我来献上终曲。",
    },
},
{
    id: "mountain_201_2_3",
    elements: {
        name: "旁白",
        text: "轰！！！猛烈的光线从暗寂中直冲而出，爆发出强大的威力。",
    },
},
{
    id: "mountain_202_2_3",
    elements: {
        name: "旁白",
        text: "恶魂的躯体被撕裂成两半，摇摇欲坠。",
    },
},
{
    id: "mountain_203_2_3",
    elements: {
        name: "你",
        text: "你已是风中残烛！",
    },
},
{
    id: "mountain_204_2_3",
    elements: {
        name: "旁白",
        text: "恶魂发出不甘的尖啸。",
    },
},
{
    id: "mountain_205_2_3",
    elements: {
        name: "旁白",
        text: "忽然间，我感应到了什么。",
    },
},
{
    id: "mountain_206_2_3",
    elements: {
        name: "旁白",
        text: "从恶魂的躯体之中，掉落了什么东西。",
    },
},
{
    id: "mountain_207_2_3",
    elements: {
        name: "旁白",
        text: "那是——",
    },
    choices: [
        {
            text: "所寻的关键之物!？",
            next: "mountain_209_2_3",
        },
    ],
},
{
    id: "mountain_209_2_3",
    elements: {
        name: "旁白",
        text: "远远望去，看上去像是一颗暗紫色的泪滴。",
    },
},
{
    id: "mountain_210_2_3",
    elements: {
        name: "你",
        text: "呵呵。恶魂也会有眼泪么？",
    },
},
{
    id: "mountain_211_2_3",
    elements: {
        name: "你",
        text: "我收下了！",
    },
},
{
    id: "mountain_212_2_3",
    elements: {
        name: "旁白",
        text: "似乎是察觉到了我的意图，恶魂扭曲的身体竟然直接一分为二，变成两个恶魂！",
    },
},
{
    id: "mountain_213_2_3",
    elements: {
        name: "你",
        text: "两个，也不是我的对手！",
    },
},
{
    id: "mountain_214_2_3",
    elements: {
        name: "旁白",
        text: "出乎意料的是，分裂的两个恶魂，却并没有向我袭来。",
    },
},
{
    id: "mountain_215_2_3",
    elements: {
        name: "你",
        text: "难道？",
    },
},
{
    id: "mountain_216_2_3",
    elements: {
        name: "旁白",
        text: "爆发出刺耳的悲鸣，一个恶魂瞬间吞噬了掉落的暗紫色泪滴，以侵蚀之力想要化其为无物。",
    },
},
{
    id: "mountain_217_2_3",
    elements: {
        background:"sc3.1/3-1-13.jpg",
        name: "旁白",
        text: "而另一个恶魂，却径直冲向了光泠所在的方向！",
    },
    keyNode: true,
    choices: [
        {
            text: "先去保护光泠。",
            next: "mountain_218_2_3_1",
        },
        {
            text: "先去夺取泪滴。",
            next: "mountain_218_2_3_2",
        },
    ],
},
//分支3-2-3-1//
{
    id: "mountain_218_2_3_1",
    elements: {
        background:"sc3.1/3-1-13.jpg",
        name: "你",
        text: "可恶啊！",
    },
},
{
    id: "mountain_219_2_3_1",
    elements: {
        name: "你",
        text: "咬咬牙，还是决定先保证光泠的周全。",
    },
},
{
    id: "mountain_220_2_3_1",
    elements: {
        name: "旁白",
        text: "将暗寂化为一杆黑色长棍，紧接着立棍而起，借着棍势弹向恶魂。",
    },
},
{
    id: "mountain_221_2_3_1",
    elements: {
        name: "旁白",
        text: "在半空中，又顺势把暗寂化为一把黑色盾牌，借势一扔，砸向恶魂。",
    },
},
{
    id: "mountain_222_2_3_1",
    elements: {
        name: "你",
        text: "你这鬼东西，别想动我的光泠！",
    },
},
{
    id: "mountain_223_2_3_1",
    elements: {
        name: "旁白",
        text: "恶魂被这一击砸得倒飞出去，但紧接着扭曲起身体。",
    },
},
{
    id: "mountain_223_2_3_1_1",
    elements: {
        name: "旁白",
        text: "向光泠所在的方向喷射出携有侵蚀之力的吐息。",
    },
},
{
    id: "mountain_224_2_3_1",
    elements: {
        name: "旁白",
        text: "飞身来到光泠身前，同时收回暗寂，化为更大的暗黑坚盾，挡在两人面前。",
    },
},
{
    id: "mountain_225_2_3_1",
    elements: {
        name: "你",
        text: "将你的光之力量，借给我吧！",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_226_2_3_1",
    elements: {
        name: "光泠",
        text: "嗯！",
        sprite: {
            left: "guangling/smile1.png",
        }
    },
},
{
    id: "mountain_227_2_3_1",
    elements: {
        name: "旁白",
        text: "光泠的手搭在我的肩膀上。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "mountain_227_2_3_1_1",
    elements: {
        name: "旁白",
        text: "一股纯净的力量瞬间在全身涌动，最后凝聚到暗寂之上。",
    },
},
{
    id: "mountain_228_2_3_1",
    elements: {
        name: "旁白",
        text: "轰！侵蚀的吐息冲击到暗寂上，却被尽数消解。",
    },
},
{
    id: "mountain_229_2_3_1",
    elements: {
        name: "旁白",
        text: "发出一声不甘的尖啸，恶魂迅速逃走，向另一个恶魂的方向飞去。",
    },
},
{
    id: "mountain_230_2_3_1",
    elements: {
        name: "旁白",
        text: "向光泠点了点头，便飞身追去。",
    },
},
{
    id: "mountain_231_2_3_1",
    elements: {
        name: "旁白",
        text: "追逐着恶魂，来到了两个恶魂集结之地。",
    },
},
{
    id: "mountain_232_2_3_1",
    elements: {
        name: "旁白",
        text: "两个恶魂同时发起了进攻，夹杂着侵蚀之力，飞掠而来。",
    },
},
{
    id: "mountain_233_2_3_1",
    elements: {
        name: "你",
        text: "刀，该出鞘了。",
    },
},
{
    id: "mountain_234_2_3_1",
    elements: {
        name: "旁白",
        text: "手中的暗寂化为一把暗黑古刀，刀锋之上，却流淌着圣光的力量。",
    },
},
{
    id: "mountain_235_2_3_1",
    elements: {
        name: "你",
        text: "你们的生路，我斩断了。",
    },
},
{
    id: "mountain_236_2_3_1",
    elements: {
        name: "旁白",
        text: "一刀斩去，一个恶魂被撕裂，喷发出白色烟雾。",
    },
},
{
    id: "mountain_237_2_3_1",
    elements: {
        name: "你",
        text: "我将跨越光芒，斩断黑暗！",
    },
},
{
    id: "mountain_238_2_3_1",
    elements: {
        name: "旁白",
        text: "一刀斩去，另一个恶魂被洞穿，碎片残躯散落一地。",
    },
},
{
    id: "mountain_239_2_3_1",
    elements: {
        name: "你",
        text: "我将照亮黑暗，击退邪恶！",
    },
},
{
    id: "mountain_240_2_3_1",
    elements: {
        name: "旁白",
        text: "最后一刀斩下，随着一道耀眼的光芒闪过。",
    },
},
{
    id: "mountain_240_2_3_1_1",
    elements: {
        name: "旁白",
        text: "恶魂的悲鸣与咒怨瞬间在这洁白的圣光中灰飞烟灭，不复存在。",
    },
},
{
    id: "mountain_241_2_3_1",
    elements: {
        name: "你",
        text: "消逝在光明中吧！刀下亡魂！",
    },
},
{
    id: "mountain_242_2_3_1",
    elements: {
        name: "旁白",
        text: "名为恶魂的存在，此刻在背后迎来了属于它的终结。",
    },
},
{
    id: "mountain_243_2_3_1",
    elements: {
        name: "旁白",
        text: "转过身望向一地的混乱，忽然在一片恶魂残躯碎片中发现了什么。",
    },
},
{
    id: "mountain_244_2_3_1",
    elements: {
        name: "你",
        text: "那是——",
    },
},
{
    id: "mountain_245_2_3_1",
    elements: {
        name: "旁白",
        text: "将那个东西捡起来，却发现正是自己要寻求的关键之物——代表牺牲与救赎的暗紫色泪滴——",
        sprite: {
            center: "NPC/zhongyantear.png",
        }
    },
    action: () => {
                let am = AchievementManager.getInstance();
                am.unlockAchievementWithAnimation("item_tear_of_terminus");
                
                // 检查是否集齐三个关键物品
                if (am.isUnlocked("item_heart_of_prime") && 
                    am.isUnlocked("item_eye_of_eternal_sun") && 
                    am.isUnlocked("item_tear_of_terminus")) {
                    am.unlockAchievementWithAnimation("item_key_items_all");
                }
            },
    choices: [
        {
            text: "终焉之泪（Tear of Terminus）！",
            next: "mountain_246_2_3_1",
            
        },
    ]
},
{
    id: "mountain_246_2_3_1",
    elements: {
        name: "旁白",
        text: "没想到恶魂竟然没有将它毁掉。",
    },
},
{
    id: "mountain_247_2_3_1",
    elements: {
        name: "旁白",
        text: "也许是光泠给我的力量保全了它。",
    },
},
{
    id: "mountain_248_2_3_1",
    elements: {
        name: "旁白",
        text: "暗紫色的终焉之泪并不是坚硬而稳定的形态。",
    },
},
{
    id: "mountain_248_2_3_1_1",
    elements: {
        name: "旁白",
        text: "而是质地柔软且覆有纹理、形态不定的，透露着一种苍凉与破碎感。",
    },
},//这里与无痕之泪融合//
{
    id: "mountain_249_2_3_1",
    elements: {
        name: "旁白",
        text: "边缘微微散发着细微的、叹息般的黑雾。",
    },
},
{
    id: "mountain_249_2_3_1_1",
    elements: {
        name: "旁白",
        text: "仿佛随时会崩解，却又被一种内在的力量永恒定格。",
    },
},
{
    id: "mountain_250_2_3_1",
    elements: {
        name: "旁白",
        text: "拿在手中，能感受到一种来自虚无的真空之冷。",
    },
},
{
    id: "mountain_250_2_3_1_1",
    elements: {
        name: "旁白",
        text: "而在这冰冷后，又隐约能感到一丝生命的余温。",
        sprite: {
            left:null,
        }
    },
    action: () => {
                const bagManager = BagManager.getInstance();
                  bagManager.removeCardFromBag("darkness", 1);
                bagManager.addCardsToBag("darkness_shadow_form", 1);
                bagManager.addCardsToBag("end_tears", 1);
  },
},
{
    id: "mountain_251_2_3_1",
    elements: {
        name: "光泠",
        text: "看来已经结束了。",
        sprite: {
            left:"guangling/smile.png",
        }
    },
},
{
    id: "mountain_252_2_3_1",
    elements: {
        name: "旁白",
        text: "她微笑着向我走来。胜利，是我们之间的誓言。",
        sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_253_2_3_1",
    elements: {
        name: "光泠",
        text: "你完美地守住了誓言呢。",
        sprite: {
            left:"guangling/smile1.png",
        }
    },
},
{
    id: "mountain_254_2_3_1",
    elements: {
        name: "光泠",
        text: "真厉害呀，就这样粉碎了那样的强敌。",
        sprite: {
            left:"guangling/smile.png",
        }
    },
},
{
    id: "mountain_255_2_3_1",
    elements: {
        name: "你",
        text: "拥有你的力量，胜利是必然的。",
        sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_256_2_3_1",
    elements: {
        name: "你",
        text: "走吧。让我们面对最后的战役吧。",
        sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_257_2_3_1",
    elements: {
        name: "光泠",
        text: "与你同行，光泠在所不辞。",
        sprite: {
            left:"guangling/smile1.png",
        }
    },
},
{
    id: "mountain_258_2_3_1",
    elements: {
        name: "光泠",
        text: "无论是无路可通的大海，还是梦想不及的海滨，我都愿与你一同。",
    },
    next:"chapter_0_scene_4_0",
},
//分支3-2-3-2//
{
    id: "mountain_218_2_3_2",
    elements: {
        background:"sc3.1/3-1-13.jpg",
        bgm:"bgm10.MP3",
        name: "你",
        text: "不管了，先把关键之物拿到手再说！",
        sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_219_2_3_2",
    elements: {
        name: "你",
        text: "来不及往光泠那边看一眼。",
    },
},
{
    id: "mountain_219_2_3_2_1",
    elements: {
        name: "你",
        text: "将暗寂化为一杆黑色长棍，紧接着立棍而起，借着棍势弹向恶魂与泪滴。",
    },
},
{
    id: "mountain_220_2_3_2",
    elements: {
        name: "旁白",
        text: "在半空中，又顺势把暗寂化为一把黑色长戟，借势一扔，刺向恶魂。",
    },
},
{
    id: "mountain_221_2_3_2",
    elements: {
        name: "旁白",
        text: "长戟刺穿了恶魂的同时，又一把抓住，脚下发力。",
    },
},
{
    id: "mountain_221_2_3_2_1",
    elements: {
        name: "旁白",
        text: "握着长戟冲刺向前，将恶魂在地上拖拽了一路，最后狠狠地插在了岩壁之中。",
    },
},
{
    id: "mountain_222_2_3_2",
    elements: {
        name: "旁白",
        text: "恶魂妄图进行最后的挣扎。",
    },
},
{
    id: "mountain_223_2_3_2",
    elements: {
        name: "你",
        text: "给我！",
    },
},
{
    id: "mountain_224_2_3_2",
    elements: {
        name: "旁白",
        text: "踩在恶魂扭曲的躯体上，用饱含力量的一拳直朝恶魂挥去。",
    },
},
{
    id: "mountain_224_2_3_2_1",
    elements: {
        name: "旁白",
        text: "恶魂躯体之上又瞬间被炸出了一个大洞。",
    },
},
{
    id: "mountain_225_2_3_2",
    elements: {
        name: "旁白",
        text: "伴随着刺耳的悲鸣，从恶魂的身体中飞出了什么东西。",
    },
},
{
    id: "mountain_225_2_3_2_1",
    elements: {
        name: "旁白",
        text: "定睛一看，却不是暗紫色泪滴，而是一把散发着不详气息的匕首。",
    },
},
{
    id: "mountain_226_2_3_2",
    elements: {
        name: "你",
        text: "交出来！",
    },
},
{
    id: "mountain_227_2_3_2",
    elements: {
        name: "旁白",
        text: "将暗寂化为暗黑色拳刃覆于双拳之上，不知怎么，心中突然爆发出一股疯狂。",
    },
},
{
    id: "mountain_228_2_3_2",
    elements: {
        name: "你",
        text: "交出来！",
    },
},
{
    id: "mountain_229_2_3_2",
    elements: {
        name: "旁白",
        text: "一拳砸下去，恶魂的身躯瞬间布满裂纹。",
    },
},
{
    id: "mountain_230_2_3_2",
    elements: {
        name: "你",
        text: "交出来！",
    },
},
{
    id: "mountain_231_2_3_2",
    elements: {
        name: "旁白",
        text: "又一拳砸下去，从恶魂身上的裂纹中瞬间喷发出白色的雾气。",
    },
},
{
    id: "mountain_232_2_3_2",
    elements: {
        name: "你",
        text: "给我，交出来！",
    },
},
{
    id: "mountain_233_2_3_2",
    elements: {
        name: "旁白",
        text: "双拳齐下，恶狠狠地砸向恶魂。瞬间，恶魂的躯体四分五裂，直接炸开！",
    },
},
{
    id: "mountain_234_2_3_2",
    elements: {
        name: "旁白",
        text: "但是，在一地的碎片之中，并没有发现泪滴，连影子也没见到。",
    },
},
{
    id: "mountain_235_2_3_2",
    elements: {
        name: "你",
        text: "可恶啊！",
    },
},
{
    id: "mountain_236_2_3_2",
    elements: {
        name: "旁白",
        text: "怒气直冲大脑，顿时丧失了理智。",
    },
},
{
    id: "mountain_236_2_3_2_1",
    elements: {
        name: "旁白",
        text: "一股黑白交杂的烟雾环绕周身，不远处的匕首似乎是感应到了什么，发出强烈的震动。",
    },
},
{
    id: "mountain_237_2_3_2",
    elements: {
        name: "你",
        text: "不管了，先把关键之物拿到手再说！",
    },
    keyNode: true,
    choices: [
        {
            text: "毁掉“蚀心刃”",
            next: "mountain_238_2_3_2_2",
        },
        {
            text: "捡起“蚀心刃”",
            next: "mountain_238_2_3_2_1",
        },
    ],
},
//分支3-2-3-2-1//
{
    id: "mountain_238_2_3_2_1",
    elements: {
        background:"sc3.1/3-1-13.jpg",
        name: "旁白",
        text: "拿起匕首的一瞬，脑海中就出现了它的名字。",
    },
    choices: [
        {
            text: "蚀心刃（Cor Corrumpens）!",
            next: "mountain_239_2_3_2_1",
        },
    ],
},
{
    id: "mountain_239_2_3_2_1",
    elements: {
        name: "旁白",
        text: "从蚀心刃中溢散出一种奇异的能量，让我感到一股神清气爽，精神焕发。",
    },
},
{
    id: "mountain_240_2_3_2_1",
    elements: {
        name: "你",
        text: "好东西，我收下了。。",
    },
},//融合暗寂//
{
    id: "mountain_241_2_3_2_1",
    elements: {
        name: "旁白",
        text: "黑白交杂的烟气渐渐没入身体，此刻却如同重获新生般，浑身充满了崭新的力量。。",
    },
},
{
    id: "mountain_242_2_3_2_1",
    elements: {
        name: "你",
        text: "哈哈哈哈！！！。",
    },
},
{
    id: "mountain_243_2_3_2_1",
    elements: {
        name: "旁白",
        text: "一阵压抑不住的狂笑后，向另一个恶魂的方向走去。",
        sprite: {
            left:null,
        }
    },
    next:"mountain_244_2_3_2",
},
//分支3-2-3-2-2//
{
    id: "mountain_238_2_3_2_2",
    elements: {
        background:"sc3.1/3-1-13.jpg",
        name: "旁白",
        text: "将暗寂化为硕大的黑色拳头，狠狠地从半空中砸下。",
    },
},
{
    id: "mountain_239_2_3_2_2",
    elements: {
        name: "旁白",
        text: "砰！",
    },
},
{
    id: "mountain_240_2_3_2_2",
    elements: {
        name: "旁白",
        text: "地上的匕首瞬间被砸成了碎片。",
    },
},
{
    id: "mountain_241_2_3_2_2",
    elements: {
        name: "你",
        text: "这种东西我不需要。",
    },
},
{
    id: "mountain_242_2_3_2_2",
    elements: {
        name: "旁白",
        text: "黑白交杂的烟气逐渐散去。",
    },
},
{
    id: "mountain_243_2_3_2_2",
    elements: {
        name: "旁白",
        text: "连看也不看一眼，利落地转身，收回暗寂，",
    },
},
{
    id: "mountain_243_2_3_2_2_1",
    elements: {
        name: "旁白",
        text: "冲向另一个恶魂，只留下一地狼藉。",
        sprite: {
            left:null,
        }
    },
},
//主线//
{
    id: "mountain_244_2_3_2",
    elements: {
        name: "光泠",
        text: "你......",
        sprite: {
            left:"guangling/wubiaoqing.png",
        }
},
},
{
    id: "mountain_245_2_3_2",
    elements: {
        name: "你",
        text: "我很好，谢谢。",
        sprite: {
            left:null,
        }
},
},
{
    id: "mountain_246_2_3_2",
    elements: {
        name: "你",
        text: "倒是你，还好吗？",
         sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_247_2_3_2",
    elements: {
        name: "光泠",
        text: "......",
        sprite: {
            left:"guangling/tanqi.png",
        }
    },
},
{
    id: "mountain_248_2_3_2",
    elements: {
        name: "光泠",
        text: "不算太差。",
        sprite: {
            left:"guangling/wubiaoqing.png",
        }
    },
},
{
    id: "mountain_249_2_3_2",
    elements: {
        name: "光泠",
        text: "勉强解决掉了那个恶魂分身。",
    },
},
{
    id: "mountain_250_2_3_2",
    elements: {
        name: "光泠",
        text: "不过确实是一番苦斗。",
        sprite: {
            left:"guangling/tanqi.png",
        }
    },
},
{
    id: "mountain_251_2_3_2",
    elements: {
        name: "旁白",
        text: "此刻才发现，光泠也受了些伤，不过在她力量的加持下，伤势在慢慢被治愈。",
        sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_252_2_3_2",
    elements: {
        name: "你",
        text: "非常不幸，我们要找的关键之物被恶魂毁掉了。",
        sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_253_2_3_2",
    elements: {
        name: "光泠",
        text: "没关系。",
        sprite: {
            left:"guangling/wubiaoqing.png",
        }
    },
},
{
    id: "mountain_254_2_3_2",
    elements: {
        name: "光泠",
        text: "也许还会有别的出路。",
        sprite: {
            left:"guangling/tanqi.png",
        }
    },
},
{
    id: "mountain_255_2_3_2",
    elements: {
        name: "你",
        text: "但愿如此吧。我太累了。",
         sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_256_2_3_2",
    elements: {
        name: "光泠",
        text: "......",
        sprite: {
            left:"guangling/tanqi.png",
        }
    },
},
{
    id: "mountain_257_2_3_2",
    elements: {
        name: "光泠",
        text: "让我为你恢复身体。",
    },
},
{
    id: "mountain_258_2_3_2",
    elements: {
        name: "你",
        text: "拜托了。",
        sprite: {
            left:null,
        }
    },
},
{
    id: "mountain_259_2_3_2",
    elements: {
        name: "光泠",
        text: "应该的。",
        sprite: {
            left:"guangling/tanqi.png",
        }
    },
},
{
    id: "mountain_260_2_3_2",
    elements: {
        name: "光泠",
        text: "慢一点也可以，请更多考虑自己。",
    },
},
{
    id: "mountain_261_2_3_2",
    elements: {
        background:"sc3.1/3-1-13.jpg",
        name: "旁白",
        text: "轻轻靠在光泠身上，心里却一阵翻江倒海，久久不能平息。",
         sprite: {
            left:null,
        }
    },
    next:"chapter_0_scene_4_0",
}
]
}
export default scene;