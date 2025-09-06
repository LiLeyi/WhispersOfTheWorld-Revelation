import { Scene } from '../../../types/SceneTypes';
import { ArchiveManager } from '../../../components/ArchiveManager';
import { CardManager } from '../../../components/mini_games/card_game';
import { AchievementManager } from '../../../components/AchievementManager';
//终章第1幕//
const scene: Scene = {
id:"chapter_0_scene_4_0",
title:"终章第1幕",
nodes:[
{  
    id: "spirit_camel_1",  
    elements: {  
        background:"sc4.1/1-1-3.jpg",
        name: "旁白",  
      text: "人类之所以伟大，正在于他是一座桥梁而非目的：",
        sprite: {
            left:null,
        }
    } ,
},  
{  
    id: "spirit_camel_1_1",  
    elements: {  
        name: "旁白",  
        text: "人类之所以可爱，正在于他是一个跨越的过程而非结果。"  
    }  
},  
{  
    id: "spirit_camel_2",  
    elements: {  
        name: "？",  
        text: "你可曾听闻过，精神的三种变形？"  
    }  
},  
{  
    id: "spirit_camel_3",  
    elements: {  
        name: "？",  
        text: "人并非终点，而是一座桥梁。"  
    }  
},  
{  
    id: "spirit_camel_4",  
    elements: {  
        name: "？",  
        text: "桥的彼端，伫立着名为“超人”的未来。"  
    }  
},  
{  
    id: "spirit_camel_5",  
    elements: {  
        name: "？",  
        text: "而灵魂若要到达，则必须经历那三次蜕变。"  
    }  
},  
{  
    id: "spirit_camel_6",  
    elements: {  
        name: "？",  
        text: "有许多重荷，要让那内怀崇敬而能坚毅致远的精神来担负。"  
    }  
},  
{  
    id: "spirit_camel_7",  
    elements: {  
        name: "？",  
        text: "因为再怎么重的负荷都需要强壮的精神来承接。"  
    }  
},  
{  
    id: "spirit_camel_8",  
    elements: {  
        name: "旁白",  
        text: "有担当的精神如骆驼般地屈膝承受一切："  
    }  
},  
{  
    id: "spirit_camel_8_1",  
    elements: {  
        name: "旁白",  
        text: "“都让我来背负吧，也好让我的力量充分发挥”。"  
    }  
},  
{  
    id: "spirit_camel_9",  
    elements: {  
        name: "旁白",  
        text: "有担当的精神在那荒漠之上缓慢行进，每一步都踩在那陈旧的律令与无声的枷锁之上。”"  
    }  
},  
{  
    id: "spirit_camel_9_1",  
    elements: {  
        name: "旁白",  
        text: "风声低语：“你该如何生活？你应当信奉谁？你应当成为什么样的人？”"  
    }  
},  
{  
    id: "spirit_camel_10",  
    elements: {  
        name: "旁白",  
        text: "人学会承受，学会顺从，学会把自身的渴望埋入灰尘之下。"  
    }  
},  
{  
    id: "spirit_camel_11",  
    elements: {  
        name: "旁白",  
        text: "在这里，精神是负重的骆驼，沉默而谨慎,却未曾拥有自己的意志。"  
    }  
},  
{  
    id: "spirit_camel_11_1",  
    elements: {  
        name: "旁白",  
        text: "它不质问命运，只在重复的步伐中迷失自己。"  
    }  
},  
{  
    id: "spirit_camel_12",  
    elements: {  
        name: "？",  
        text: "唯谦卑自抑以克制高傲；唯敛巧若愚以玩弄智慧。是否并非这个意思呢？"  
    }  
},  
{  
    id: "spirit_camel_13",  
    elements: {  
        name: "？",  
        text: "或者是：舍弃我们已然获胜的主张，登上高山之顶去挑唆诱惑者？"  
    }  
},  
{  
    id: "spirit_camel_14",  
    elements: {  
        name: "？",  
        text: "只要是真理之水，不管如何污秽，也要纵身跃入；"  
    }  
},  
{  
    id: "spirit_camel_14_1",  
    elements: {  
        name: "？",  
        text: "无论是美丽的青蛙或丑陋的癞蛤蟆，一概包容不弃？"  
    }  
},  
{  
    id: "spirit_camel_14_2",  
    elements: {  
        name: "？",  
        text: "善待轻蔑我们的人，并亲近畏惧我们的鬼怪？"  
    }  
},  
{  
    id: "spirit_lion_1",  
    elements: {  
        name: "旁白",  
        text: "就在这最寂寥的荒漠中，第二种变形产生了："  
    }  
},  
{  
    id: "spirit_lion_1_1",  
    elements: {  
        name: "旁白",  
        background:"sc4.1/4-1-2.jpg",
        text: "在这里，满载重物的骆驼变成了狮子，它亟想争取自己，并主宰自己的荒漠。"  
    }  
},  
{  
    id: "spirit_lion_2",  
    elements: {  
        name: "旁白",  
        text: "荒漠渐渐消失，精神化作野兽，在峭壁之巅咆哮。"  
    }  
},  
{  
    id: "spirit_lion_2_1",  
    elements: {  
        name: "旁白",  
        text: "烈焰如意志般喷薄而出，击碎旧秩序的残骸。"  
    }  
},  
{  
    id: "spirit_lion_3",  
    elements: {  
        name: "？",
        background:"sc4.1/3-1-3.jpg",  
        text: "狮子要与主人及其最后的上帝为敌，它要与巨龙争强斗胜。"  
    }  
},  
{  
    id: "spirit_lion_3_1",  
    elements: {  
        name: "？",  
        text: "什么才是精神不愿称之为主人与上帝的巨龙呢？"  
    }  
},  
{  
    id: "spirit_lion_4",  
    elements: {  
        name: "？",  
        text: "“你应”是它的名字。但狮子的精神却说“我要”。"  
    }  
},  
{  
    id: "spirit_lion_5",  
    elements: {  
        background:"sc3.1/3-1-11.jpg",
        name: "旁白",  
        text: "这是反叛的阶段：精神学会拒绝，学会说“不”，学会直面虚无的空洞。"  
    }  
},  
{  
    id: "spirit_lion_5_1",  
    elements: {  
        name: "旁白",  
        text: "它的吼声震撼大地，也震碎自身的安宁；它明白自由的代价，却尚未学会创造。"  
    }  
},  
{  
    id: "spirit_lion_5_2",  
    elements: {  
        name: "旁白",  
        text: "在峭壁之上，精神是狮子——破坏、反抗，却仍被愤怒与孤独所牵绊。"  
    }  
},  
{  
    id: "spirit_lion_6",  
    elements: {  
        name: "？",  
        text: "至高无上的龙说：“一切价值都已创造，而所有已被创造的价值就是我自身。”"  
    }  
},  
{  
    id: "spirit_lion_6_1",  
    elements: {  
        name: "？",  
        text: "事实上，‘我要’是不存在的。”"  
    }  
},  
{  
    id: "spirit_lion_7",  
    elements: {  
        name: "旁白",  
        text: "精神还要狮子何用？光是谦逊崇敬而能负重致远的骆驼不就够了吗？"  
    }  
},  
{  
    id: "spirit_lion_8",  
    elements: {  
        name: "？",  
        text: "要创造新的价值，那是狮子也无法做到的。"  
    }  
},  
{  
    id: "spirit_lion_8_1",  
    elements: {  
        name: "？",  
        text: "然而，若要争取创造的自由，则非有赖狮子的力量不可。"  
    }  
},  
{  
    id: "spirit_lion_9",  
    elements: {  
        name: "？",  
        text: "要支配新的价值，那是崇敬而负重的精神最艰巨的任务。"  
    }  
},  
{  
    id: "spirit_lion_9_1",  
    elements: {  
        name: "？",  
        text: "对它来说，这无异于一种掠夺，一种弱肉强食的行为。 "  
    }  
},  
{  
    id: "spirit_lion_9_2",  
    elements: {  
        name: "？",  
        text: " 那连狮子都无法做到的事，又还有谁能够做得到呢？"  
    }  
},  
{  
    id: "spirit_child_1",  
    elements: {  
        name: "旁白",  
        text: "烈焰熄灭，荒漠与峭壁的残影消散，精神像初生的孩童般轻盈而清澈。"  
    }  
},  
{  
    id: "spirit_child_1_1",  
    elements: {  
        name: "旁白",  
        text: "在这里，精神不再被命令驱使，也不再只会破坏，它成为创造者。"  
    }  
},  
{  
    id: "spirit_child_2",  
    elements: {  
        name: "旁白",  
        text: "它承受孤独，却不屈服；它拥抱痛苦，却能化其为力量。"  
    }  
},  
{  
    id: "spirit_child_2_1",  
    elements: {  
        name: "旁白",  
        text: "它明白，人生或许永恒重复，或许无尽荒凉，但即便如此，它仍要为自己点亮火焰。"  
    }  
},  
{  
    id: "spirit_child_3",  
    elements: {  
        background:"sc4.1/4-1-5.jpg",
        name: "？",  
        text: "孩童是天真而健忘的，一个新的开始，一个游戏，一个自转的旋轮，一个原始的动作，一个神圣的肯定。"  
    }  
},  
{  
    id: "spirit_child_4",  
    elements: {  
        name: "？",  
        text: "是的，为了创造的游戏，生命需要有一个神圣的肯定："  
    }  
},  
{  
    id: "spirit_child_4_1",  
    elements: {  
        name: "？",  
        text: "此刻精神有了自己的意志，世界的流放者又重回自己的世界。"  
    }  
},  
{  
    id: "spirit_child_5",  
    elements: {  
        name: "旁白",  
        text: "然而，绝大多数人止步于荒漠，或在峭壁之上被怒火吞没。"  
    }  
},  
{  
    id: "spirit_child_5_2",  
    elements: {  
        name: "旁白",  
        text: "少数精神，才能穿越三道暗礁，抵达光林。"  
    }  
},  
{  
    id: "spirit_child_5_1",  
    elements: {  
        name: "旁白",  
        text: "它们是桥梁，通向未知，却必然指向未来——那个无人抵达，却等待被创造的境地。"  
    }  
},  
{  
    id: "spirit_child_6",  
    elements: {  
        name: "？",  
        text: "我已向你们阐明有关精神的三种变形：精神如何变成骆驼，骆驼如何变成狮子，最后狮子又如何变成孩童。"  
    }  
},  
{  
    id: "battle_shadow_1",  
    elements: {  
        name: "旁白",  
        text: "——这是离开青铜门，重回斑牛镇后，遇到当初那位说出“上帝已死”之人时，与之展开的交谈。"  
    }  
},  
{  
    id: "battle_shadow_2",  
    elements: {  
        name: "旁白",  
        text: "不知怎么的，此刻却在脑海中回忆起来。 然而，现在来不及深究这其中的缘由。"  
    }  
},  
{  
    id: "battle_shadow_3",  
    elements: {  
        background:"sc4.1/4-1-4.jpg",
        name: "旁白",  
        text: "一抹黑影泛着猩红的微光在眼前划过，手中的暗寂化为暗金坚盾，用力将这抹黑影击飞。"  
    }  
},  
{  
    id: "battle_shadow_4",  
    elements: {  
        name: "旁白",  
        text: "黑影在空中盘旋，最后稳稳地落入一人手中。"  
    }  
},  
{  
    id: "battle_shadow_4",  
    elements: {  
        name: "旁白",  
        text: "对这飞袭而来的黑红之影，自己并不感到陌生，因为那是——"  
    } ,
    choices: [
        {
            text: "另一把暗寂？",
            next: "battle_shadow_5"
        },
    ] 
},  
{  
    id: "battle_shadow_5",  
    elements: {  
        name: "旁白",  
        text: "那黑红之影，与自己的暗寂长得别无二致。唯一不同的是,自己的暗寂上布满着闪着金色的纹路；"  
    }  
},  
{  
    id: "battle_shadow_5_1",  
    elements: {  
        name: "旁白",  
        text: "而那人手中的“暗寂”，纹理中却闪着猩红之光，弥散着一种嗜血的邪气。"  
    }  
},  
{  
    id: "battle_shadow_6",  
    elements: {  
        name: "旁白",  
        text: "而这个人——没有脸？ "  
    }  
},  
{  
    id: "battle_shadow_6_1",  
    elements: {  
        name: "旁白",  
        text: "并不是在怒斥那人不要脸面，而是他那原本应该映照灵魂的面部确确实实是一片空无。"  
    }  
},  
{  
    id: "battle_shadow_7",  
    elements: {  
        name: "旁白",  
        text: "——没有眉眼，没有鼻子，也没有嘴巴。"  
    }  
},  
{  
    id: "battle_shadow_7",  
    elements: {  
        name: "旁白",  
        text: "黑暗如同浓稠的墨水，吞没了他的脸，留下的只有一片死寂的平面。"  
    }  
},  
{  
    id: "battle_shadow_8",  
    elements: {  
        name: "旁白",  
        text: "然而，这个神秘来者的一举一动，以及操纵暗寂的方式，都让自己感到无比的熟悉。"  
    }  
},  
{  
    id: "battle_shadow_9",  
    elements: {  
        name: "旁白",  
        text: "等不及有更多的反应，他便操弄着猩红暗寂，朝自己袭来。自己只能被迫与其展开战斗。"  
    }  
},  
{  
    id: "battle_shadow_10",  
    elements: {  
        name: "旁白",  
        text: "短暂交手之后，谁也奈何不了谁。"  
    }  
},  
{  
    id: "battle_shadow_11",  
    elements: {  
        name: "？？？",  
        text: "你，只是那个被命运玩弄的骆驼！"  
    }  
},  
{  
    id: "battle_shadow_11_1",  
    elements: {  
        name: "？？？",  
        text: "他的声音混合着杂音，刺耳而诡异，仿佛是来自地狱的恶鬼在呜咽。"  
    }  
},  
{  
    id: "battle_shadow_12",  
    elements: {  
        name: "？？？",  
        text: "你害怕停下，也害怕倒下。"  
    }  
},  
{  
    id: "battle_shadow_13",  
    elements: {  
        name: "？？？",  
        text: "你害怕虚无吞噬你，于是拼命向前，却从未问过自己：这一切究竟是为何？"  
    }  
},  
{  
    id: "battle_shadow_14",  
    elements: {  
        name: "？？？",  
        text: "若一切都将重复，无限轮回，你是否仍愿选择现在的道路？"  
    }  
},  
{  
    id: "battle_shadow_15",  
    elements: {  
        name: "？？？",  
        text: "你所称的勇气，只是对恐惧的逃避。你所称的意志，不过是逃离虚无的幻想。"  
    }  
},  
{  
    id: "battle_shadow_16",  
    elements: {  
        name: "？？？",  
        text: "告诉我，若没有他人的期待，你所做的一切是否值得？"  
    }  
},  
{  
    id: "battle_shadow_17",  
    elements: {  
        name: "？？？",  
        text: "若没有同伴的相随，你还能坚持多久？"  
    }  
},  
{  
    id: "battle_shadow_18",  
    elements: {  
        name: "？？？",  
        text: "你所追求的创造与超越，真的存在吗——还是,"  
    }  ,
    choices: [
        {
            text: "仅仅一场自欺的游戏？",
            next: "battle_shadow_19"
        },
    ]
},  
{  
    id: "battle_shadow_19",  
    elements: {  
        name: "？？？",  
        text: "你所托付信任的人，真的值得信赖吗——还是说，"  
    }  ,
    choices: [
        {
            text: "仅仅是楚门的世界中的演员？",
            next: "battle_shadow_20"
        },
    ]
},  
{  
    id: "battle_shadow_20",  
    elements: {  
        name: "你",  
        text: "你到底是谁？你的目的究竟是什么？"  
    }  
},  
{  
    id: "battle_shadow_21",  
    elements: {  
        name: "？？？",  
        text: "想要拨开迷雾窥见真相，那就随我而来吧！"  
    }  
},  
{  
    id: "battle_shadow_21_1",  
    elements: {  
        name: "？？？",  
        text: "让我看看，你这一次是否具有独自面对真相的勇气？"  
    }  
},  
{  
    id: "battle_shadow_22",  
    elements: {  
        name: "旁白",  
        text: "说罢，无脸人一跃而起，向远处飞去。"  
    }  
},  
{  
    id: "battle_shadow_23",  
    elements: {  
        name: "你",  
        text: "你知道他的身份吗？" , 
sprite:{
    left:null,
}
    }  
},  
{  
    id: "battle_shadow_24",  
    elements: {  
        name: "光泠",  
        text: "他是......你的影子。（闭目）"  ,
        sprite:{
    left:"guangling/down.png",
}
    }  
},  
{  
    id: "battle_shadow_25",  
    elements: {  
        name: "光泠",  
        text: "你可以把他看作是另一个自己，或者说，是走上另一条道路的自己。（悲伤）"  
    }  
},  
{  
    id: "battle_shadow_26",  
    elements: {  
        name: "你",  
        text: "他最后说的话，是什么意思？",
        sprite:{
    left:null,
}  
    }  
},  
{  
    id: "battle_shadow_27",  
    elements: {  
        name: "光泠",  
        text: "惟有叩问自己的内心，才能寻找到答案。（无表情）" ,
         sprite:{
    left:"guangling/wubiaoqing.png",
}  
    },
    choices: [
        {
            text: "你真的没有在欺骗我吗吗？",
            next: "battle_shadow_28_1"
        },
        {
            text: "我会努力去追寻这一切的真相。",
            next: "chapter_0_scene_0"
        },
    ]  
}, 
//分支1//
{  
    id: "battle_shadow_28_1",  
    elements: {  
        name: "你",  
        text: "或者说，这一切，到底是不是对我的愚弄？" ,
         sprite:{
    left:null,
}  
    },
},
{  
    id: "battle_shadow_29_1",  
    elements: {  
        name: "你",  
        text: "我像个小丑一样，只是在舞台上表演戏耍供人取乐？" ,
        sprite:{
    left:null,
}  
    },
},
{  
    id: "battle_shadow_30_1",  
    elements: {  
        name: "光泠",  
        text: "......" ,
        sprite:{
    left:"guangling/wubiaoqing.png",
}  
    },
},
{  
    id: "battle_shadow_31_1",  
    elements: {  
        name: "光泠",  
        text: "恕我无法直接回答" ,
        sprite:{
    left:"guangling/tanqi.png",
}  
    },
},
{  
    id: "battle_shadow_32_1",  
    elements: {  
        name: "光泠",  
        text: "你才是故事的主角。至于你做出怎样的选择，我不会干涉。" ,
        sprite:{
    left:"guangling/wubiaoqing.png",
}  
    },
    choices: [
        {
            text: "已拾取蚀心刃",
            next: "battle_shadow_33"
        },
    ]
},
{  
    id: "battle_shadow_33",  
    elements: {  
        name: "旁白",  
        text: "少女的使命是为何呢？世界的真相又为何呢？" ,
        sprite:{
    left:"guangling/wubiaoqing.png",
}  
    },
},
{  
    id: "battle_shadow_34",  
    elements: {  
        name: "旁白",  
        text: "在跨过漫长的旅途后，依旧没能得到任何答案。"  
    }  
},  
{  
    id: "battle_shadow_34_1",  
    elements: {  
        name: "旁白",  
        text: "种种猜疑在心底里爆发，或许，不该再由她摆布自己的命运了……"  
    }  
},  
{  
    id: "battle_shadow_35",  
    elements: {  
        name: "我",  
        text: "我早就觉得，这一切有问题了。"  
    }  
},  
{  
    id: "battle_shadow_35_1",  
    elements: {  
        name: "我",  
        text: "莫名其妙地把一无所知的我带上这样的道路，你一定也是个满嘴谎言的家伙。"  
    }  
},  
{  
    id: "battle_shadow_36",  
    elements: {  
        name: "我",  
        text: "为了欺骗我，不择手段，费尽心思。"  
    }  
},  
{  
    id: "battle_shadow_36_1",  
    elements: {  
        name: "我",  
        text: "为了愚弄我，把我弄得像一个骆驼。我已经受够了这一切！"  
    }  
},  
{  
    id: "battle_shadow_37",  
    elements: {  
        name: "我",  
        text: "到底还要在戏弄我多久？这令人憎恶的世界，还有你！"  
    }  
},  
{  
    id: "battle_shadow_38",  
    elements: {  
        name: "旁白",  
        text: "眼前一片癫狂的猩红，此刻只感觉到无穷无尽的怒火在燃烧。黑白交杂的烟气在周身弥漫。"  
    }  
},  
{  
    id: "battle_shadow_39",  
    elements: {  
        name: "旁白",  
        text: "将暗寂覆在左臂化为暗黑利爪,"  
    }  
},  
{  
    id: "battle_shadow_39_1",  
    elements: {  
        name: "旁白",  
        text: "以迅雷不及掩耳之势，恶狠狠地掐住光泠的脖子，拎在半空。"  
    }  
},  
{  
    id: "battle_shadow_40",  
    elements: {  
        name: "光泠",  
        text: "呃......"  
    }  
},  
{  
    id: "battle_shadow_41",  
    elements: {  
        
        name: "旁白",  
        text: "右手掏出早就准备好的蚀心刃，一把刺向光泠的心脏处，血液沿着刀柄不断滴落。"  
    }  
},  
{  
    id: "battle_shadow_42",  
    elements: {  
        name: "光泠",  
        text: "为什么......在最后还要做出如此苦涩的选择？"  
    }  
},  
{  
    id: "battle_shadow_42_1",  
    elements: {  
        name: "光泠",  
        text: "在囚笼之间辗转......强迫自己将饮不尽的苦水视作甜美的甘露……"  
    }  
},  
{  
    id: "battle_shadow_43",  
    elements: {  
        name: "我",  
        text: "错的不是我，而是这个世界！"  
    }  
},  
{  
    id: "battle_shadow_44",  
    elements: {  
        background:"sc4.1/4-1-1.jpg",
        name: "旁白",  
        text: "理智早已被疯狂取代，癫狂的大笑中，拔出蚀心刃，将光泠的身体扔在脚下。"  
    }  
},  
{  
    id: "battle_shadow_44_1",  
    elements: {  
        name: "旁白",  
        text: "紧接着张开腿骑在光泠身上，一刀，又一刀，在喷涌的鲜血中捅下。"  
    }  
},  
{  
    id: "battle_shadow_45",  
    elements: {  
        name: "旁白",  
        text: "血染红了大地。天空被无边黑暗笼罩。"  
    }  
},  
{  
    id: "battle_shadow_45_1",  
    elements: {  
        name: "旁白",  
        text: "暗寂金色的微光早已消失，转而被血液染上一片猩红。"  
    }  
},  
{  
    id: "battle_shadow_46",  
    elements: {  
        name: "旁白",  
        text: "刺穿少女身躯的刀刃仍在淌血。冰冷的尸体躺在脚边，逐渐消融至无边的黑暗之中。"  
    }  
},  
{  
    id: "battle_shadow_47",  
    elements: {  
        name: "旁白",  
        text: "踉跄着站起身来，迷茫地望着身前血红的一片，眼里控制不住地流下痛苦的泪水。"  
    }  
},  
{  
    id: "battle_shadow_48",  
    elements: {  
        name: "我",  
        text: "这样就好了吗？这样就好。"  
    }  
},  
{  
    id: "battle_shadow_49",  
    elements: {  
        name: "旁白",  
        text: "然而，世界的躁动并未停息。大地燃烧起熊熊烈火；群山与森林在死亡的嘶吼中崩裂坍塌。"  
    }  
},  
{  
    id: "battle_shadow_50",  
    elements: {  
        name: "旁白",  
        text: "伸手捂住脸，却只摸到一片冰冷而陌生的空白。"  
    }  
},  
{  
    id: "battle_shadow_50",  
    elements: {  
        name: "旁白",  
        text: "五官如同被无形之手抹去：眼睛溶解成漆黑的虚空，鼻梁与嘴唇化作空洞的平面。"  
    }  
},  
{  
    id: "battle_shadow_51",  
    elements: {  
        name: "旁白",  
        text: "从四面八方传来的杂音不断撞击着耳膜，似怒号，似哭喊，"  
    }  
},  
{  
    id: "battle_shadow_51",  
    elements: {  
        name: "旁白",  
        text: "似咒骂，似讥讽——一遍又一遍，直至再次被彻底吞没。"  
    }  
},  
{  
    id: "battle_shadow_52",  
    elements: {  
        name: "？？？",  
        text: "没想到，居然会迎来这样的结局……分歧是在哪里出现的……？"  
    }  
},  
{  
    id: "battle_shadow_52",  
    elements: {  
        name: "？？？",  
        text: "这样一来，一切就不得不从头开始了。"  
    }  
},  
{  
    id: "battle_shadow_53",  
    elements: {  
        name: "？？？",  
        text: "不过，“旅途”还能继续。只要灾厄还停留于此，残存的低语就不会消逝。"  
    }  
},  
{  
    id: "battle_shadow_54",  
    elements: {  
        name: "？？？",  
        text: "所以，拜托了，“光泠”。让那个人结束灾厄……放弃无谓的挣扎。"  
    }  
},  
{  
    id: "battle_shadow_55",  
    elements: {  
        name: "？？？",  
        text: "为了能让那个人一直停留在这里。多余的“眷恋”必须被剔除。"  
    }  
},  
{  
    id: "battle_shadow_56",  
    elements: {  
        name: "旁白",  
        text: "在破败的废墟里醒来。总觉得这副场景似曾相识，可却又什么也回想不起来。"  
    }  
},  
{  
    id: "battle_shadow_57",  
    elements: {  
        background:"sc0.1/0-1-1.jpg",
        name: "？？？",  
        text: "您醒了。"  
    }  
},  
{  
    id: "battle_shadow_58",  
    elements: {  
        name: "我",  
        text: "你……是？" ,
        sprite:{
            left:null,
        }  
    }  
},  
{  
    id: "battle_shadow_59",  
    elements: {  
        name: "光泠",  
        text: "您好，我的名字是光泠。是为了为世界带来新生，前来引导您的人。", 
        sprite:{
            left:"guangling/smile.png",
        } 
    }  
},  
{  
    id: "battle_shadow_60",  
    elements: {  
        name: "旁白",  
        text: "破败的废墟里，少女再一次，朝成为白纸的你露出微笑。" ,
        sprite:{
            left:"guangling/smile.png",
        }  
    }  ,
    choices: [
        {
            text: "达成结局二！！！",
            next: "chapter_0_scene_0",
        },
    ],
},  



    ]
}
export default scene;