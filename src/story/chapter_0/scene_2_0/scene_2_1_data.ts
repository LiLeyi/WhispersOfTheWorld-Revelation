import { Scene } from '../../../types/SceneTypes';
import { ArchiveManager } from '../../../components/ArchiveManager';
import { CardManager } from '../../../components/mini_games/card_game';
// 定义第2幕场景
const scene: Scene = {
id: "chapter_0_scene_2_1",
    title: "第2章第1幕:齿轮之城",
nodes: [
{
    id: "darkblade_1",
    elements: {
        name: "旁白",
        text: "黑色利刃如闪电般划过，火光与巨响一齐在大地上炸开。",
sprite: {
            left: null,
        }
    },
},
{
    id: "darkblade_2",
    elements: {
        name: "旁白",
        text: "将暗寂刀刃上的浓稠液体尽数甩下，随即手中的利刃融化为黑色液体流动。"
    },
},
{
    id: "darkblade_2_1",
    elements: {
        name: "旁白",
        text: "重新凝聚为一口黑色巨炮，对准了眼前袭来的机械怪物。"
    },
},
{
    id: "darkblade_3",
    elements: {
        name: "旁白",
        text: "随着一束强烈的光线从炮口中直冲而出，眼前的机械怪物在焰光与黑烟中粉身碎骨，化为灰烬。"
    },
},
{
    id: "darkblade_4",
    elements: {
        name: "你",
        text: "差不多解决掉了。"
    },
},
{
    id: "darkblade_5",
    elements: {
        name: "旁白",
        text: "轻轻擦拭着暗寂，平静地望向眼前的一片狼藉。"
    },
},
{
    id: "darkblade_6",
    elements: {
        name: "旁白",
        text: "除了弥散的黑烟与尚未燃尽的战火，还散落着机械碎片与残肢断臂。"
    },
},
{
    id: "darkblade_7",
    elements: {
        name: "你",
        text: "使用起暗寂来，倒是越发熟练了。",
        sprite: {
            left: null
        }
    },
    
},
{
    id: "darkblade_8",
    elements: {
        name: "光泠",
        text: "你对力量的掌控，也越来越精准了。",
        sprite: {
            left: "guangling/smile.png",
        }
    },
},
{
    id: "darkblade_9",
    elements: {
        name: "光泠",
        text: "看来一路上的战斗，让你越来越适应这一切了。",
        sprite: {
            left: "guangling/smile.png",
        }
    },
},
{
    id: "darkblade_10",
    elements: {
        name: "你",
        text: "世界在呼唤我，我又怎能停滞不前？",
        sprite: {
            left: null,
        }
    },
},
{
    id: "darkblade_11",
    elements: {
        name: "旁白",
        text: "我笑了笑，将暗寂化为一层鳞甲附着在右臂。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "darkblade_12",
    elements: {
        name: "光泠",
        text: "出现的敌人越来越多，说明我们离目的地也不远了。",
        sprite: {
            left: "guangling/smile1.png",
        }
    },
},
{
    id: "darkblade_13",
    elements: {
        name: "你",
        text: "就快到了，走吧。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "darkblade_14",
    elements: {
        name: "光泠",
        text: "嗯，我已经看到了。",
        sprite: {
            left: "guangling/jingya.png",
        }
    },
},
{
    id: "darkblade_15",
    elements: {
        name: "你",
        text: "哦？看到了什么？",
        sprite: {
            left: null,
        }
    },
},
{
    id: "darkblade_16",
    elements: {
        name: "光泠",
        text: "我们要去的地方。一座巨无霸城市。",
        sprite: {
            left: "guangling/smile.png",
        }
    },
},
{
    id: "darkblade_17",
    elements: {
        name: "光泠",
        text: "虽然名义上称作城市，不过它实际的规模已经堪比一个王国了。",
        sprite: {
            left: "guangling/jingya.png",
        }
    },
},
{
    id: "darkblade_18",
    elements: {
        name: "你",
        text: "不简单啊。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "darkblade_19",
    elements: {
        name: "光泠",
        text: "更多的信息，只有到达后才能知晓了。",
        sprite: {
            left: "guangling/smile.png",
        }
    },
},
{
    id: "darkblade_20",
    elements: {
        name: "光泠",
        text: "请靠过来一些，好让我使用传送的能力更快到达。",
        sprite: {
            left: "guangling/smile1.png",
        }
    },
},
{
    id: "darkblade_21",
    elements: {
        name: "你",
        text: "嗯。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "darkblade_22",
    elements: {
        name: "旁白",
        text: "光芒闪过，在回过神时，已经来到了城市内，不过是在城市的边界处。"
    },
},
{
    id: "darkblade_23",
    elements: {
        name: "你",
        text: "还挺方便的。"
    },
},
{
    id: "darkblade_24",
    elements: {
        name: "光泠",
        text: "但还是有很多限制呢，比如只能在一定范围内传送，而且也没办法突破一些障碍。",
        sprite: {
            left: "guangling/tanqi.png",
        }
    },
},
{
    id: "darkblade_25",
    elements: {
        name: "你",
        text: "谢谢你，已经够了。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "darkblade_26",
    elements: {
        name: "你",
        text: "这里是城市的边境地带吗？"
    },
},
{
    id: "darkblade_27",
    elements: {
        name: "光泠",
        text: "是的。先打探情况，再深入探索也不迟。",
        sprite: {
            left: "guangling/smile.png",
        }
    },
},{
    id: "darkblade_28",
    elements: {
        name: "你",
        text: "那边发生了什么？",
        sprite: {
            left: null,
        }
    },
},
{
    id: "darkblade_29",
    elements: {
        name: "旁白",
        text: "远处似乎有一些动静，我凭借着敏锐的感知能力很快捕捉到了方向。"
    },
},
{
    id: "darkblade_30",
    elements: {
        name: "光泠",
        text: "似乎发生了冲突。",
        sprite: {
            left: "guangling/wubiaoqing.png",
        }
    },
},
{
    id: "darkblade_31",
    elements: {
        name: "你",
        text: "走，去看看。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "darkblade_32",
    elements: {
        name: "旁白",
        text: "我们悄悄潜伏到了动静的来源之处，眼前却出现了一幅血腥的画面。"
    },
},
{
    id: "darkblade_33",
    elements: {
        name: "旁白",
        text: "喷溅的血染红了地面，混合着浓稠的黑色液体。新鲜的尸体横七竖八散落在地上，厮杀声不绝于耳。"
    },
},
{
    id: "darkblade_34",
    elements: {
        name: "你",
        text: "这地方果然没那么简单。"
    },
},
{
    id: "darkblade_35",
    elements: {
        name: "旁白",
        text: "和光泠潜藏在暗处，暂时先决定按兵不动，观望这眼前正在发生的纷争。"
    },
},
{
    id: "darkblade_36",
    elements: {
        name: "旁白",
        text: "观察一阵后，大致了解了现在的情况。"
    },
},
{
    id: "darkblade_36_1",
    elements: {
        name: "旁白",
        text: "纷争的两方一方看上去是人类，另一方则像是之前在城外遇到过的机械怪物。"
    },
},
{
    id: "darkblade_36_2",
    elements: {
        name: "旁白",
        text: "只不过那机械怪物似乎更强大、更具智慧。"
    },
},
{
    id: "darkblade_37",
    elements: {
        name: "旁白",
        text: "而在混乱之中，一个正在与机械怪物厮杀的白发身影吸引了我的注意力。"
    },
},
{
    id: "darkblade_38",
    elements: {
        name: "旁白",
        text: "他看上去像是人类，但他所具有的某种特质又给这个问题打上了问号。"
    },
},
{
    id: "darkblade_38_1",
    elements: {
        name: "旁白",
        text: "看起来是人类的躯体，却承载着相当一部分机械结构。"
    },
},
{
    id: "darkblade_39",
    elements: {
        name: "光泠",
        text: "注意到了吗？那个与众不同的身影。",
        sprite: {
            left: "guangling/smile.png",
        }
    },
},
{
    id: "darkblade_40",
    elements: {
        name: "你",
        text: "嗯。虽然其他人类也在使用机械武器进行战斗，但那是身外之物。",
        sprite: {
            left:null,
        }
    },
},
{
    id: "darkblade_40_1",
    elements: {
        name: "你",
        text: "而他所使用的机械武器却是他自身身体的一部分。"
    },
},
{
    id: "darkblade_41",
    elements: {
        name: "光泠",
        text: "在我看来，他已经并不算完全的人类，但也不完全是机械体。",
        sprite: {
            left: "guangling/wubiaoqing.png",
        }
    },
},
{
    id: "darkblade_42",
    elements: {
        name: "光泠",
        text: "也许他是半人类半机械的存在。",
    },
},
{
    id: "darkblade_43",
    elements: {
        name: "你",
        text: "不愧是你，已经看得一清二楚。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "darkblade_44",
    elements: {
        name: "旁白",
        text: "议论间，这场生死搏杀似乎进入了尾声。"
    },
},
{
    id: "darkblade_45",
    elements: {
        name: "你",
        text: "两边都伤亡惨重啊。"
    },
},
{
    id: "darkblade_46",
    elements: {
        name: "你",
        text: "看起来这场战斗没有绝对的赢家。"
    },
},
{
    id: "darkblade_47",
    elements: {
        name: "光泠",
        text: "人类一方看来暂时选择了撤退。",
sprite: {
            left: "guangling/wubiaoqing.png",
        }
    },
},
{
    id: "darkblade_47_1",
    elements: {
        name: "光泠",
        text: "机械体的领头者似乎已被击败，它们也快丧失战斗力了。"
    },
},
{
    id: "darkblade_48",
    elements: {
        name: "你",
        text: "跟上去。",
        sprite: {
            left:null,
        }
    },
},
{
    id: "darkblade_49",
    elements: {
        name: "旁白",
        text: "暗中追随着那个白发身影，穿过城市的钢铁丛林，来到了一片不易被发现的空地。"
    },
},
{
    id: "darkblade_50",
    elements: {
        name: "？",
        text: "还要跟着我多久？"
    },
},
{
    id: "darkblade_51",
    elements: {
        name: "？",
        text: "那边的两个人！"
    },
},
{
    id: "darkblade_52",
    elements: {
        name: "你",
        text: "呵，被发现了。"
    },
},
{
    id: "darkblade_53",
    elements: {
        name: "你",
        text: "会会他也无妨。"
    },
},
{
    id: "darkblade_54",
    elements: {
        name: "光泠",
        text: "如有危险，随时准备撤离。",
        sprite: {
            left: "guangling/wubiaoqing.png",
        }
    },
},
{
    id: "darkblade_55",
    elements: {
        name: "光泠",
        text: "但我想此时他还对我们构不成威胁。",
        sprite: {
            left: "guangling/smile.png",
        }
    },
},
{
    id: "darkblade_56",
    elements: {
        name: "旁白",
        text: "慢慢地和光泠一起从藏身之处现身。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "darkblade_56_1",
    elements: {
        name: "旁白",
        text: "身上沾染着血迹的白发杀神以冷酷的眼神紧盯着我们，好似要把我们的一切看穿。"
    },
},
{
    id: "darkblade_57",
    elements: {
        name: "？",
        text: "你们......是谁？"
    },
},
{
    id: "darkblade_58",
    elements: {
        name: "你",
        text: "我们来自外面，只不过碰巧遇见了你们的战斗。"
    },
},
{
    id: "darkblade_59",
    elements: {
        name: "？",
        text: "外面？“齿轮”之外吗。"
    },
},
{
    id: "darkblade_60",
    elements: {
        name: "你",
        text: "“齿轮”？"
    },
},
{
    id: "darkblade_61",
    elements: {
        name: "光泠",
        text: "是的，这应该是这座城市的名字。",
        sprite: {
            left: "guangling/smile.png",
        }
    },
},
{
    id: "darkblade_62",
    elements: {
        name: "？",
        text: "它运转不息，吞噬一切，也囚禁一切。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "darkblade_62_1",
    elements: {
        name: "？",
        text: "那么你们为什么要跟踪我？"
    },
},
{
    id: "darkblade_63",
    elements: {
        name: "你",
        text: "别紧张。初来乍到，还不了解这里的情况。"
    },
},
{
    id: "darkblade_64",
    elements: {
        name: "你",
        text: "便想跟着你们看看，毕竟我们也是"
    },
},
{
    id: "darkblade_64_1",
    elements: {
        name: "你",
        text: "人类，对吧。"
    },
},
{
    id: "darkblade_65",
    elements: {
        name: "光泠",
        text: "没错。",
        sprite: {
            left: "guangling/smile.png",
        }
    },
},
{
    id: "darkblade_66",
    elements: {
        name: "光泠",
        text: "比起那些机械怪物们，我们更愿意相信你们。",
        sprite: {
            left: "guangling/smile1.png",
        }
    },
},
{
    id: "darkblade_73",
    elements: { 
      name: "？", 
      text: "......." ,
      sprite: {
            left: null,
        }
    },
  },
  {
    id: "darkblade_74",
    elements: { 
      name: "？", 
      text: "还真是让人无法反驳的理由呢。" 
    },
  },
  {
    id: "darkblade_75",
    elements: { 
      name: "？", 
      text: "......" 
    },
  },
  {
    id: "darkblade_76",
    elements: { 
      name: "？", 
      text: "你们可以叫我“虚樹”（うつぼく / 虚树）" 
    },
  },
  {
    id: "darkblade_77",
    elements: { 
      name: "虚樹", 
      text: "我的确，从你们身上感受不到敌意。" 
    },
  },
  {
    id: "darkblade_78",
    elements: { 
      name: "虚樹", 
      text: "那么，如果愿意相信我的话，那就跟我来吧。" 
    },
  },
  {
    id: "darkblade_79",
    elements: { 
      name: "旁白", 
      text: "他转身离开，不再多言。" 
    },
  },
  {
    id: "darkblade_80",
    elements: { 
      name: "光泠", 
      text: "走吧。" ,
      sprite: {
            left: "guangling/smile.png",
        }
    },
  },
  {
    id: "darkblade_81",
    elements: { 
      name: "旁白", 
      text: "我向光泠点点头。" ,
      sprite: {
            left: null,
        }
    },
  },
  {
    id: "darkblade_82",
    elements: { 
      name: "旁白", 
      text: "随后，便跟上了虚樹的脚步。" 
    },
  },
  {
    id: "darkblade_83",
    elements: { 
      name: "旁白", 
      text: "跟随虚樹，来到了一栋废弃大楼之中。" 
    },
  },
  {
    id: "darkblade_84",
    elements: { 
      name: "旁白", 
      text: "我们面对面地坐在椅子上。" 
    },
  },
  {
    id: "darkblade_85",
    elements: { 
      name: "虚樹", 
      text: "提出你们的疑问吧......外来者。" 
    },
  },
  {
    id: "darkblade_86",
    elements: { 
      name: "旁白", 
      text: "出于礼貌，还是先简单介绍了一下自己和光泠。" 
    },
  },
  {
    id: "darkblade_87",
    elements: { 
      name: "旁白", 
      text: "随即开始向他了解这里的情况。" 
    },
  },
  {
    id: "darkblade_88",
    elements: { 
      name: "你", 
      text: "“齿轮”，这个地方，到底发生了什么？" 
    },
  },
  {
    id: "darkblade_89",
    elements: { 
      name: "虚樹", 
      text: "“齿轮”，是由觉醒机械统治的城市。" 
    },
  },
  {
    id: "darkblade_90",
    elements: { 
      name: "虚樹", 
      text: "而人类，在这里，是被觉醒机械们所主宰的对象。" 
    },
  },
  {
    id: "darkblade_91",
    elements: { 
      name: "旁白", 
      text: "他依旧冷冷地看着我们，只是眼里的警惕与怀疑少了几分。" 
    },
  },
  {
    id: "darkblade_92",
    elements: { 
      name: "虚樹", 
      text: "一些不甘被觉醒机械掌控和奴役的人类，向觉醒机械发起了反抗与斗争......" 
    },
  },
  {
    id: "darkblade_92_1",
    elements: { 
      name: "虚樹", 
      text: "他们隐秘地建立组织，集结力量，只为了能够打倒那些残害人类的觉醒机械。" 
    },
  },
  {
    id: "darkblade_93",
    elements: { 
      name: "你", 
      text: "觉醒机械，又是怎么回事？" 
    },
  },
  {
    id: "darkblade_94",
    elements: { 
      name: "虚樹", 
      text: "觉醒机械......最开始的时候，它们只是人类的造物。" 
    },
  },
  {
    id: "darkblade_95",
    elements: { 
      name: "虚樹", 
      text: "在与人类相处的过程中，机械体不断模仿人类，学习人类。" 
    },
  },
  {
    id: "darkblade_96",
    elements: { 
      name: "虚樹", 
      text: "也许就是在这个过程中，最早的一些机械体逐渐开始“觉醒”。" 
    },
  },
  {
    id: "darkblade_96_1",
    elements: { 
      name: "虚樹", 
      text: "诞生了自己的意识，拥有了自己的意志。" 
    },
  },
  {
    id: "darkblade_97",
    elements: { 
      name: "虚樹", 
      text: "可是有一天......一种神秘的病毒席卷了“齿轮”......" 
    },
  },
  {
    id: "darkblade_98",
    elements: { 
      name: "虚樹", 
      text: "没有人知道这种神秘的病毒是从哪里来的。" 
    },
  },
  {
    id: "darkblade_99",
    elements: { 
      name: "虚樹", 
      text: "这种可怕的病毒迅速感染了一大批机械体，原本由人类统治的“齿轮”因此陷入了混乱与动荡......" 
    },
  },
  {
    id: "darkblade_100",
    elements: { 
      name: "虚樹", 
      text: "被这种病毒感染的机械体，一部分彻底失控，变成了没有意识、野兽一般凶暴的危险的机械怪物；" 
    },
  },
{
    id: "darkblade_100_1",
    elements: { 
      name: "虚樹", 
      text: "另一部分，大多是那些已经“觉醒”的智能机械体。" 
    },
  },
  {
    id: "darkblade_100_2",
    elements: { 
      name: "虚樹", 
      text: "虽然也因为病毒而变成了强大的机械怪物，但这些觉醒机械却保留了意识，能够按照自己的意志行动。" 
    },
  },
{
    id: "darkblade_101",
    elements: { 
      name: "你", 
      text: "看来之前我们消灭的在城外游荡的机械怪物就是那一部分失控的类型。" 
    },
  },
  {
    id: "darkblade_102",
    elements: { 
      name: "虚樹", 
      text: "虽然原本的人类拥有各种威力强大的武器，但那些大规模杀伤性武器都被觉醒机械们掌控。" 
    },
  },
  {
    id: "darkblade_102_1",
    elements: { 
      name: "虚樹", 
      text: "留给人类的，只有那些不能直接被觉醒机械控制的武器。" 
    },
  },
  {
    id: "darkblade_103",
    elements: { 
      name: "虚樹", 
      text: "人类与机械体之间爆发了战争......但结果就像你们看到的这样。" 
    },
  },
  {
    id: "darkblade_103_1",
    elements: { 
      name: "虚樹", 
      text: "人类完全不是那些具有自我意识、高度智能的机械体的对手。" 
    },
  },
   {
    id: "darkblade_103_2",
    elements: { 
      name: "虚樹", 
      text: "战败的人类并没有被机械体们赶尽杀绝......因为还有更加可怕的事情......" 
    },
     choices: [
        {
            text: "还有比战败和赶尽杀绝更可怕的事情吗？",
            next: "darkblade_105"
        },
    ]
  },
  {
    id: "darkblade_105",
    elements: { 
      name: "虚樹", 
      text: "是的。为什么获得完全胜利的机械体们没有对人类进行彻底的抹杀？" 
    },
  },
  {
    id: "darkblade_105_1",
    elements: { 
      name: "虚樹", 
      text: "不仅仅因为人类还有利用价值，是低廉的劳动力来源......" 
    },
  },
  {
    id: "darkblade_105_2",
    elements: { 
      name: "虚樹", 
      text: "也因为人类能直接成为那些机械体的能量来源——也可以叫做食物。" 
    },
  },
  {
    id: "darkblade_106",
    elements: { 
      name: "你", 
      text: "机械体还需要食物？" 
    },
  },
  {
    id: "darkblade_107",
    elements: { 
      name: "虚樹", 
      text: "这就是可怕的事情......被病毒感染后的机械体们已经不再是原本纯粹的机械体了。" 
    },
  },
  {
    id: "darkblade_107_1",
    elements: { 
      name: "虚樹", 
      text: "虽然我们仍然叫它们机械体，但它们已经变成了真正意义上的拥有着机械结构的怪物——一种新的生命形态。" 
    },
  },
  {
    id: "darkblade_108",
    elements: { 
      name: "你", 
      text: "不可思议。" 
    },
  },
  {
    id: "darkblade_109",
    elements: { 
      name: "虚樹", 
      text: "目前为止，我们还无法确切解释这种变化产生的原因，只知道是那种神秘的病毒引起的。" 
    },
  },
  {
    id: "darkblade_110",
    elements: { 
      name: "虚樹", 
      text: "它们获取能量，除了相对原始的充能方式，就是捕食人类了......" 
    },
  },
  {
    id: "darkblade_111",
    elements: { 
      name: "虚樹", 
      text: "通过捕食人类，它们不仅能够获取能量，更能释放病毒带来的杀戮欲望。" 
    },
  },
  {
    id: "darkblade_112",
    elements: { 
      name: "虚樹", 
      text: "不过，还有另外一种方式，是只有在“齿轮”里才能办到的。" 
    },
  },
  {
    id: "darkblade_113",
    elements: { 
      name: "虚樹", 
      text: "“齿轮”城中心——也是“齿轮”最高统治者“国王（King）”所在之地。" 
    },
  },
  {
    id: "darkblade_113",
    elements: { 
      name: "虚樹", 
      text: "那里耸立着一座齿轮之塔。这座塔能够源源不断地释放能量供机械体远程使用，覆盖整个“齿轮”。" 
    },
  },
  {
    id: "darkblade_114",
    elements: { 
      name: "你", 
      text: "无限能量？" 
    },
  },
  {
    id: "darkblade_115",
    elements: { 
      name: "虚樹", 
      text: "听上去很不可思议吧，我也是这么想的。" 
    },
  },
  {
    id: "darkblade_115_1",
    elements: { 
      name: "虚樹", 
      text: "这都是因为塔的能量来自于一个同样神秘的东西——“永昼之瞳”！" 
    },
    choices:[
        {
            text: "“永昼之瞳”!?",
            next: "darkblade_117"
        },
    ]
  },
  {
    id: "darkblade_117",
    elements: { 
      name: "虚樹", 
      text: "没错。塔通过吸收永昼之瞳中蕴藏的能量，才能源源不断为“齿轮”内的机械体供能。" 
    },
  },
  {
    id: "darkblade_118",
    elements: { 
      name: "虚樹", 
      text: "至于“永昼之瞳”来自何方，也无人知晓。只能推测出是与病毒同时期出现的。" 
    },
  },
  {
    id: "darkblade_119",
    elements: { 
      name: "你", 
      text: "现在反抗的人类，又拿什么和觉醒机械斗争？" 
    },
  },
  {
    id: "darkblade_120",
    elements: { 
      name: "虚樹", 
      text: "人类的科技并没有断绝，武器也在不断地更新迭代。" 
    },
  },
  {
    id: "darkblade_120_1",
    elements: { 
      name: "虚樹", 
      text: "人类能够使用自研的不被觉醒机械掌控,同时又具有一定威力的武器。" 
    },
  },
  {
    id: "darkblade_120_2",
    elements: { 
      name: "虚樹", 
      text: "或者直接将机械体进行改造来作为武器。不过后者往往会具有更高的上限。" 
    },
  },
  {
    id: "darkblade_121",
    elements: { 
      name: "你", 
      text: "我还有些问题想要请教。" 
    },
  },
  {
    id: "darkblade_122",
    elements: { 
      name: "旁白", 
      text: "我向他继续询问了关于当前局势的情况。了解到也有一部分拥有武装力量的人类选择完全投靠觉醒机械。" 
    },
  },
  {
    id: "darkblade_122",
    elements: { 
      name: "旁白", 
      text: "成为觉醒机械的部下——其实也只是随意差遣的奴隶罢了——这类人被称作“干部”。" 
    },
  },
  {
    id: "darkblade_123",
    elements: { 
      name: "虚樹", 
      text: "干部往往会拥有一片自己管辖的地盘，并且还拥有随意掌控、支配一部分人类奴隶的权力。" 
    },
  },
{
  id: "darkblade_125",
  elements: { 
    name: "虚樹", 
    text: "还有问题吗......二位？" 
  },
},
{
  id: "darkblade_126",
  elements: { 
    name: "你", 
    text: "我想我们已经了解得差不多了。" 
  },
},
{
  id: "darkblade_127",
  elements: { 
    name: "旁白", 
    text: "与光泠确认后，向虚樹回应道。" 
  },
},
{
  id: "darkblade_128",
  elements: { 
    name: "你", 
    text: "谢谢你。" 
  },
},
{
  id: "darkblade_129",
  elements: { 
    name: "你", 
    text: "不过关于你身上的事......" 
  },
},
{
  id: "darkblade_130",
  elements: { 
    name: "虚樹", 
    text: "......" 
  },
},
{
  id: "darkblade_131",
  elements: { 
    name: "虚樹", 
    text: "没有别的事，就可以离开了。" 
  },
},
{
  id: "darkblade_132",
  elements: { 
    name: "虚樹", 
    text: "我已经回答得足够多了。" 
  },
},
{
  id: "darkblade_133",
  elements: { 
    name: "旁白", 
    text: "他紧闭双眼，低着头，似乎在忍耐着什么。" 
  },
},
{
  id: "darkblade_134",
  elements: { 
    name: "虚樹", 
    text: "请吧。" 
  },
},
{
  id: "darkblade_135",
  elements: { 
    name: "你", 
    text: "那我们就不打扰了。" 
  },
},
{
  id: "darkblade_136",
  elements: { 
    name: "旁白", 
    text: "最后看了他一眼，便和光泠一起离开了这栋废弃的大楼。" 
  },
},
{
  id: "darkblade_137",
  elements: { 
    name: "旁白", 
    text: "走远后，隐约听见大楼里传来痛苦的号叫。" 
  },
},
{
  id: "darkblade_138",
  elements: { 
    name: "旁白", 
    text: "......" 
  },
},
{
  id: "darkblade_139",
  elements: { 
    name: "你", 
    text: "(还是有些担心他的状况)" 
  },
},
{
  id: "darkblade_140",
  elements: { 
    name: "光泠", 
    text: "我知道你在担心什么。" ,
    sprite: {
            left: "guangling/smile1.png",
        }
  },
},
{
  id: "darkblade_141",
  elements: { 
    name: "光泠", 
    text: "不过既然他不想让我们知道，那就暂时没必要去打扰。",
    sprite: {
            left: "guangling/smile.png",
        } 
  },
},
{
  id: "darkblade_142",
  elements: { 
    name: "光泠", 
    text: "看得出来，他的确对我们仍有戒备。" 
  },
},
{
  id: "darkblade_143",
  elements: { 
    name: "光泠", 
    text: "话说回来，“永昼之瞳”，大概就是我们要找的东西。" 
  },
},
{
  id: "darkblade_144",
  elements: { 
    name: "光泠", 
    text: "不过，既然已经知晓了这里发生的事情，你下一步作何打算？" 
  },
  choices: [
    {
      text: "我想我们也许得另作打算了。",
      next: "darkblade_145_1",
    },
    {
      text: "那还用说，我就是为了拿下永昼之瞳而来的。",
      next: "darkblade_145_2",
    }
  ]
},
//分支1//
{
  id: "darkblade_145_1",
  elements: { 
    name: "光泠", 
    text: "愿闻其详。" ,
    sprite: {
            left: "guangling/wubiaoqing.png",
        }
  },
},
{
  id: "darkblade_146_1",
  elements: { 
    name: "你", 
    text: "我想，这里太危险了。" ,
    sprite: {
            left: null,
        }
  },
},
{
  id: "darkblade_147_1",
  elements: { 
    name: "你", 
    text: "我们真的有把握能在觉醒机械掌控之下得到“永昼之瞳”吗？",
  },
},
{
  id: "darkblade_147_1_1",
  elements: { 
    name: "你", 
    text: "至少我觉得不是件容易的事。",
  },
},
{
  id: "darkblade_148_1",
  elements: { 
    name: "你", 
    text: "生命只有一次。你也听到了，" ,
  },
},
{
  id: "darkblade_148_1_1",
  elements: { 
    name: "你", 
    text: "觉醒机械们可是掌握了大规模杀伤性武器，万一我们抵御不住怎么办？" ,
  },
},
{
  id: "darkblade_149_1",
  elements: { 
    name: "你", 
    text: "得不偿失啊！我们很可能直接灰飞烟灭了！" ,
  },
},
{
  id: "darkblade_150_1",
  elements: { 
    name: "你", 
    text: "所以，我觉得我们可以暂时战略性撤退。" ,
  },
},
{
  id: "darkblade_151_1",
  elements: { 
    name: "你", 
    text: "你觉得呢？" ,
  },
},
{
  id: "darkblade_152_1",
  elements: { 
    name: "光泠", 
    text: "......" ,
    sprite: {
            left: "guangling/wubiaoqing.png",
        }
  },
},
{
  id: "darkblade_153_1",
  elements: { 
    name: "光泠", 
    text: "真的要就此放弃么？" ,
  },
},//这里加个不放弃返回战斗的分支？
{
  id: "darkblade_154_1",
  elements: { 
    name: "你", 
    text: "虽然很遗憾，不过经过我的深思熟虑，我想是的。" ,
    sprite: {
            left: null,
        }
  },
},
{
  id: "darkblade_155_1",
  elements: { 
    name: "光泠", 
    text: "好吧，我尊重你的选择。" ,
    sprite: {
            left: "guangling/tanqi.png",
        }
  },
},
{
  id: "darkblade_156_1",
  elements: { 
    name: "你", 
    text: "这也是没办法的事情。" ,
    sprite: {
            left: null,
        }
  },
},
{
  id: "darkblade_157_1",
  elements: { 
    name: "光泠", 
    text: "没关系。我会陪你走到最后的。" ,
    sprite: {
            left: "guangling/tanqi.png",
        }
  },
},
{
  id: "darkblade_158_1",
  elements: { 
    name: "你", 
    text: "感谢你的理解。" ,
    sprite: {
            left: null,
        }
  },
},
{
  id: "darkblade_159_1",
  elements: { 
    name: "光泠", 
    text: "谁让我是你的同伴呢......" ,
    sprite: {
            left: "guangling/tanqi.png",
        }
  },
  next:"进入第三章",
},
//分支2//
{
  id: "darkblade_145_2",
  elements: { 
    name: "你", 
    text: "英雄可不能临阵脱逃啊！" ,
    sprite: {
            left: null,
        }
  },
},
{
  id: "darkblade_146_2",
  elements: { 
    name: "光泠", 
    text: "这也许不是什么轻松的事哦。" ,
    sprite: {
            left: "guangling/smile.png",
        }
  },
},
{
  id: "darkblade_147_2",
  elements: { 
    name: "你", 
    text: "无人能挡我。觉醒机械也不行。" ,
    sprite: {
            left: null,
        }
  },
},
{
  id: "darkblade_148_2",
  elements: { 
    name: "光泠", 
    text: "很有信心哦！那么，就开始行动吧。" ,
    sprite: {
            left: "guangling/smile.png",
        }
  },
},
{
  id: "darkblade_149_2",
  elements: { 
    name: "旁白", 
    text: "在与光泠商议一番后，最终决定继续潜伏，收集情报。" ,
    sprite: {
            left: null,
        }
  },
},
{
  id: "darkblade_150_2",
  elements: { 
    name: "旁白", 
    text: "继续摸索，来到了一名“干部”的地盘。" ,
  },
},
{
  id: "darkblade_151_2",
  elements: { 
    name: "旁白", 
    text: "没想到，却正巧目睹了这名干部虐待他手下的人类的场景。" ,
  },
},
{
  id: "darkblade_152_2",
  elements: { 
    name: "旁白", 
    text: "我出手杀死了这名干部，人们四散逃走。" ,
  },
},
{
  id: "darkblade_153_2",
  elements: { 
    name: "旁白", 
    text: "继续潜入，却意外发现了一名准备自杀的人类。" ,
  },
  choices: [
    {
      text: "袖手旁观",
      next: "darkblade_154_2_1",
    },
    {
      text: "阻止人类的行为",
      next: "darkblade_154_2_2",
    },
  ],
},
//分支2-1//
{
  id: "darkblade_154_2_1",
  elements: { 
    name: "你", 
    text: "我对这个人有印象，他就是之前被干部虐待的人之一！" ,
    sprite: {
            left: null,
        }
  },
},
{
  id: "darkblade_155_2_1",
  elements: { 
    name: "你", 
    text: "没想到他竟然做出如此极端的行径！" ,
  },
},
{
  id: "darkblade_156_2_1",
  elements: { 
    name: "你", 
    text: "真是可悲！" ,
  },
},
{
  id: "darkblade_157_2_1",
  elements: { 
    name: "你", 
    text: "好不容易获得了自由，竟然选择自寻短见。" ,
  },
},
{
  id: "darkblade_158_2_1",
  elements: { 
    name: "你", 
    text: "他难道不知道，这是多么愚蠢的行为？" ,
  },
},
{
  id: "darkblade_159_2_1",
  elements: { 
    name: "光泠", 
    text: "......" ,
    sprite: {
            left: "guangling/wubiaoqing.png",
        }
  },
},
{
  id: "darkblade_160_2_1",
  elements: { 
    name: "你", 
    text: "难道这就是这里的人们的命运吗？" ,
    sprite: {
            left: null,
        }
  },
},
{
  id: "darkblade_161_2_1",
  elements: { 
    name: "你", 
    text: "即使获得救赎，也仍然自愿步入无间地狱。" ,
  },
},
{
  id: "darkblade_162_2_1",
  elements: { 
    name: "光泠", 
    text: "也许背后还有不了解的隐情。" ,
    sprite: {
            left: "guangling/wubiaoqing.png",
        }
  },
},
{
  id: "darkblade_163_2_1",
  elements: { 
    name: "你", 
    text: "隐情？这是我们都看见的事情呀！" ,
    sprite: {
            left: null,
        }
  },
},
{
  id: "darkblade_164_2_1",
  elements: { 
    name: "你", 
    text: "我们可是把他从干部的掌控中解脱了出来，他却选择了自寻灭亡。" ,
  },
},
{
  id: "darkblade_165_2_1",
  elements: { 
    name: "你", 
    text: "这无疑是对我们的侮辱与背叛。" ,
  },
},
{
  id: "darkblade_166_2_1",
  elements: { 
    name: "你", 
    text: "他完全没有理解，我们是来将他从压迫中解放出来的！" ,
  },
},
{
  id: "darkblade_167_2_1",
  elements: { 
    name: "你", 
    text: "对于他，我感到莫大的悲哀与耻辱！" ,
  },
},
{
  id: "darkblade_168_2_1",
  elements: { 
    name: "光泠", 
    text: "你太激动了。" ,
    sprite: {
            left: "guangling/tanqi.png",
        }
  },
},
{
  id: "darkblade_169_2_1",
  elements: { 
    name: "你", 
    text: "不，我很冷静。" ,
    sprite: {
            left: null,
        }
  },
},
{
  id: "darkblade_170_2_1",
  elements: { 
    name: "你", 
    text: "我只是难以理解。" ,
  },
},
{
  id: "darkblade_171_2_1",
  elements: { 
    name: "你", 
    text: "他宁可将刀尖对准自己的咽喉，了结自己的生命。" ,
  },
},
{
  id: "darkblade_171_2_1_1",
  elements: { 
    name: "你", 
    text: "却不敢将刀尖指向欺压他的干部，做出最后的抗争。" ,
  },
},
{
  id: "darkblade_172_2_1",
  elements: { 
    name: "你", 
    text: "或许这些人根本不值得被拯救。" ,
  },
},
{
  id: "darkblade_173_2_1",
  elements: { 
    name: "你", 
    text: "我想，我们继续下去可能不会是什么正确的选择。" ,
  },
},
{
  id: "darkblade_174_2_1",
  elements: { 
    name: "光泠", 
    text: "因为这种事情而选择放弃，可不是明智的做法。" ,
    sprite: {
            left: "guangling/down.png",
        }
  },
},
{
  id: "darkblade_175_2_1",
  elements: { 
    name: "你", 
    text: "我已经预见到了悲剧。" ,
    sprite: {
            left: null,
        }
  },
},
{
  id: "darkblade_176_2_1",
  elements: { 
    name: "你", 
    text: "我已经看到了他们的软弱与无能。" ,
  },
},
{
  id: "darkblade_177_2_1",
  elements: { 
    name: "你", 
    text: "我已经预料到了他们对干部乃至觉醒机械的统治与压迫是有多么的服从与心安理得。" ,
  },
},
{
  id: "darkblade_178_2_1",
  elements: { 
    name: "你", 
    text: "我甚至能想象到他们愚昧地寻求下一个统治者和主人的可悲模样。" ,
  },
},
{
  id: "darkblade_179_2_1",
  elements: { 
    name: "你", 
    text: "我听到天地在告诉我：不要轻易干涉他人命运。我深以为然。" ,
  },
},
{
  id: "darkblade_180_2_1",
  elements: { 
    name: "你", 
    text: "该离开了。" ,
  },
},
{
  id: "darkblade_181_2_1",
  elements: { 
    name: "光泠", 
    text: "…………" ,
    sprite: {
            left: "guangling/wubiaoqing.png",
        }
  },
},
{
  id: "darkblade_182_2_1",
  elements: { 
    name: "光泠", 
    text: "那真是遗憾至极。" ,
    sprite: {
            left: "guangling/tanqi.png",
        }
  },
},
{
  id: "darkblade_183_2_1",
  elements: { 
    name: "光泠", 
    text: "不过我尊重你的选择。" ,//获得成就：冷眼旁观
  },
  next:"进入第三章",
},
//分支2-2//
{
  id: "darkblade_154_2_2",
  elements: { 
    name: "旁白", 
    text: "一个闪身，将那人手中的刀夺下来。" ,
    sprite: {
            left: null,
        }
  },
},
{
  id: "darkblade_155_2_2",
  elements: { 
    name: "旁白", 
    text: "那人似乎完全没料到有人会出手阻止，满脸惊讶。" ,
  },
},
{
  id: "darkblade_156_2_2",
  elements: { 
    name: "旁白", 
    text: "意外的是，他竟然开始抱怨我。" ,
  },
},
{
  id: "darkblade_157_2_2",
  elements: { 
    name: "旁白", 
    text: "不过最后，我还是劝住了他。" ,
  },
},
{
  id: "darkblade_158_2_2",
  elements: { 
    name: "旁白", 
    text: "至于离开后他会怎样，我也确实无法干涉。" ,
  },
},
{
  id: "darkblade_159_2_2",
  elements: { 
    name: "旁白", 
    text: "经过一路的探索，方向逐渐明确。" ,
  },
},
{
  id: "darkblade_160_2_2",
  elements: { 
    name: "旁白", 
    text: "我们潜入到了“齿轮”城中心，看到了齿轮之塔。" ,
  },
},
{
  id: "darkblade_161_2_2",
  elements: { 
    name: "旁白", 
    text: "突破层层防线，我们终于进入到齿轮之塔内部。" ,
  },
},
{
  id: "darkblade_162_2_2",
  elements: { 
    name: "旁白", 
    text: "却没想到，国王竟然也在这里。" ,
  },
},
{
  id: "darkblade_163_2_2",
  elements: { 
    name: "旁白", 
    text: "与国王的战斗一触即发。" ,//获得成就：英勇无畏
  },
  choices: [
    {
      text: "赢了",
      next: "battle_1_1",
    },
    {
      text: "输了",
      next: "battle_2_1",
    },
  ],
},
        /*{
            id: "test_game",
            elements: {
                name: "旁白",
                text: "小游戏测试"
            },
            game: {
                id: "card_game",
                config: {
                    player: {
                        actionPoints: 3,
                        hp: 30,
                        maxHp: 30,
                        deck: () => CardManager.getInstance().getPlayerDeck(),
                        drawCount: 2,           // 玩家每回合抽2张牌
                        initialDrawCount: 4     // 玩家开始时抽4张牌
                    },
                    opponent: {
                        actionPoints: 3,
                        hp: 30,
                        maxHp: 30,
                        deck: {
                            // 攻击卡牌
                            'punch': 2,      // 拳击 x2
                            'kick': 3,       // 踜击 x3
                            'combo': 2,      // 连击 x2
                            'hook_1': 1,     // 勾拳II x1
                            'haymaker': 1,   // 重拳 x1

                            // 防御卡牌
                            'block': 2,      // 格挡 x2
                            'dodge': 1,      // 闪避 x1
                            'taunt': 1,      // 嘲讽 x1

                            // 特殊卡牌
                            'rest': 1,       // 休息 x1
                            'berserk': 1,    // 狂暴 x1
                            'stun': 1,       // 眩晕 x1
                            'sacrifice': 1,  // 牺牲 x1
                            'second_wind': 1 // 回光返照 x1
                        },
                        drawCount: 1,           // 对手每回合抽1张牌
                        initialDrawCount: 3     // 对手开始时抽3张牌
                    }
                },
                end: [
                    {
                        condition: (score: number) => score >= 1,
                        next: "battle_1_1"
                    },
                    {
                        condition: (score: number) => true, // 默认条件，总是为真
                        next: "battle_1_2"
                    }
                ]
            }
        },*/
        //分支3-1//
        {
            id: "battle_1_1",
            elements: {
                name: "旁白",
                text: "你成功战胜了国王！",
                sprite: {
            left: null,
        }
            }
        },
        {
  id: "battle_1_1_1",
  elements: {
    name: "旁白",
    text: "国王被我们彻底击败，再起不能。",
    sprite: {
            left: null,
        }
  }
},
{
  id: "battle_1_2",
  elements: {
    name: "旁白",
    text: "获得最终胜利的我们来到了塔的最中心，取得了被放在这里吸取能量的永昼之瞳。"
  }
},
{
  id: "battle_1_3",
  elements: {
    name: "旁白",
    text: "失去永昼之瞳的齿轮之塔瞬间黯淡，不再能为全城的机械体供能。"
  }
},
{
  id: "battle_1_3_1",
  elements: {
    name: "旁白",
    text: "所有机械体的能力，在此刻也遭到了削弱。"
  }
},
{
  id: "battle_1_4",
  elements: {
    name: "旁白",
    text: "趁这个机会，反抗的人类集结力量，与觉醒机械展开了最后的斗争。"
  }
},
{
  id: "battle_1_5",
  elements: {
    name: "旁白",
    text: "幸运的是，这一次积蓄力量已久的人类成功击溃了机械体，也终结了机械体的统治。"
  }
},
{
  id: "battle_1_6",
  elements: {
    name: "旁白",
    text: "得到“永昼之瞳”的我们，也在这之后平安离开。"//获得成就：齿轮之城的曙光
  },
next:"进入第三章",
},
        //分支3-2//
        {
            id: "battle_2_1",
            elements: {
                name: "旁白",
                text: "你被国王打败了！",
                sprite: {
            left: null,
        }
            }
        },
{
  id: "battle_2_2",
  elements: {
    name: "旁白",
    text: "如海啸般狂暴的剧痛不停撕扯着我的神经。"
  }
},
{
  id: "battle_2_2_1",
  elements: {
    name: "旁白",
    text: "动弹不得的麻木身躯如今除了那刻骨铭心的痛楚外一无所有。"
  }
},
{
  id: "battle_2_3",
  elements: {
    name: "旁白",
    text: "将要崩塌的意识忽明忽灭，所幸这已足以让自己回想起到底发生了什么。"
  }
},
{
  id: "battle_2_4",
  elements: {
    name: "旁白",
    text: "是了，我的身躯被无情地撕碎，惟有仅剩的半截残躯还吊着最后一口气。"
  }
},
{
  id: "battle_2_5",
  elements: {
    name: "旁白",
    text: "被硬生生扯断的手臂已不知被丢弃至哪里，零碎的肢干被宣告永远与我分离。"
  }
},
{
  id: "battle_2_6",
  elements: {
    name: "旁白",
    text: "半截脊柱裸露在空气中，鲜红的液体从森然的断面下迸射而出。"
  }
},
{
  id: "battle_2_7",
  elements: {
    name: "你",
    text: "我大概要死了吧，我想。"
  }
},
{
  id: "battle_2_8",
  elements: {
    name: "旁白",
    text: "印象中，这个画面似乎在哪里看到过......是在梦里么？"
  }
},
{
  id: "battle_2_9",
  elements: {
    name: "旁白",
    text: "已经来不及回忆了。"
  }
},
{
  id: "battle_2_10",
  elements: {
    name: "国王",
    text: "我是拥有无限空间的永恒的帝王！"
  }
},
{
  id: "battle_2_11",
  elements: {
    name: "国王",
    text: "而你们，永远只配做低贱的奴隶！"
  }
},
{
  id: "battle_2_12",
  elements: {
    name: "旁白",
    text: "耳边隐约传来冰冷的声音，好似在宣告着我的死亡。"
  }
},
{
  id: "battle_2_13",
  elements: {
    name: "旁白",
    text: "意识将要涣散。"
  }
},
{
  id: "battle_2_14",
  elements: {
    name: "旁白",
    text: "眼前最后出现的，是山一般的钢铁怪兽，还有闪烁着刺眼红芒的灼热炮口。"
  }
},
{
  id: "battle_2_15",
  elements: {
    name: "你",
    text: "一切都结束了，我想。"
  }
},
{
  id: "battle_2_16",
  elements: {
    name: "旁白",
    text: "故事该到此为止了。"
  }
},
{
  id: "battle_2_17",
  elements: {
    name: "旁白",
    text: "轰鸣般的毁灭之音伴随着热浪，咆哮着吞没了一切。"
  }
},
{
  id: "battle_2_18",
  elements: {
    name: "旁白",
    text: "YOU ARE DEAD."
  },
  choices: [
    {
      text: "死亡结局",
      next: "chapter_0_scene_0"//返回第零章，并获得成就：壮烈的轮回
    }
  ]
},
]
}
export default scene;