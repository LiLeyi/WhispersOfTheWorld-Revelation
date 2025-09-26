import { Scene } from '../../../types/SceneTypes';
import { ArchiveManager } from '../../../components/ArchiveManager';
import { CARD_TEMPLATES, CardManager } from '../../../components/mini_games/card_game';
import { BackgroundManager } from '../../../components/BackgroundManager';
import { AchievementManager } from '../../../components/AchievementManager';
import { BagManager } from '../../../components/BagManager';
import { CardGameEventData } from '../../../types/MiniGameEvents';
//终章第1幕//
const scene: Scene = {
id:"chapter_0_scene_4_0",
title:"终章第1幕",
nodes:[
 {
            id: "video_node",
            elements: {
                name: "旁白",
                text: "播放视频"
            },
            video: "4.mp4", // 视频文件应放在 src/assets/video/ 目录下
            next: "spirit_camel_1" // 可选，视频播放完成后跳转到的节点
        },   
  {  
    id: "spirit_camel_1",  
    elements: {  
        background:"sc4.1/1-1-3.jpg",
        bgm:"bgm16.MP3",
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
        text: "人类之所以可爱，正在于他是一个跨越的过程而非结果。",
        sprite: {
            left: null,
        }  
    }  
},  
{  
    id: "spirit_camel_2",  
    elements: {  
        name: "？",  
        text: "你可曾听闻过，精神的三种变形？",
        sprite: {
            left: "NPC/questionman.png",
        }  
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
        text: "因为再怎么重的负荷都需要强壮的精神来承接。",
        sprite: {
            left: "NPC/questionman.png",
        }  
    }  
},  
{  
    id: "spirit_camel_8",  
    elements: {  
        name: "旁白",  
        text: "有担当的精神如骆驼般地屈膝承受一切：",
        sprite: {
            left: null,
        }  
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
        text: "唯谦卑自抑以克制高傲；唯敛巧若愚以玩弄智慧。是否并非这个意思呢？",
        sprite: {
            left: "NPC/questionman.png",
        }    
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
        name: "你",  
        text: "善待轻蔑我们的人，并亲近畏惧我们的鬼怪？" ,
        sprite: {
            left: null,
        }   
    }  
},  
{  
  id: "spirit_lion_1",  
  elements: {  
      name: "？",  
      text: "就在这最寂寥的荒漠中，第二种变形产生了：" ,
      sprite: {
          left: "NPC/questionman.png",
      }   
  }  
},
{  
    id: "spirit_lion_1_1",  
    elements: {  
        name: "？",  
        background:"sc4.1/4-1-2.jpg",
        text: "在这里，满载重物的骆驼变成了狮子，它亟想争取自己，并主宰自己的荒漠。"  
    }  
},  
{  
    id: "spirit_lion_2",  
    elements: {  
        name: "旁白",  
        text: "荒漠渐渐消失，精神化作野兽，在峭壁之巅咆哮。",
        sprite: {
            left: null,
        }    
    }  
},  
{  
  id: "spirit_lion_2_1",  
  elements: {  
      name: "旁白",  
      text: "烈焰如意志般喷薄而出，击碎旧秩序的残骸。",
      sprite: {
          left: null,
      }    
  }  
},  
{  
    id: "spirit_lion_3",  
    elements: {  
        name: "？",
        background:"sc4.1/3-1-3.jpg",  
        text: "狮子要与主人及其最后的上帝为敌，它要与巨龙争强斗胜。",
        sprite: {
            left: "NPC/questionman.png",
        }    
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
        text: "这是反叛的阶段：精神学会拒绝，学会说“不”，学会直面虚无的空洞。",
        sprite: {
            left: null,
        }    
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
        text: "在峭壁之上，精神是狮子——破坏、反抗，却仍被愤怒与孤独所牵绊。",
        sprite: {
            left: null,
        }    
    }  
},  
{  
    id: "spirit_lion_6",  
    elements: {  
        name: "？",  
        text: "至高无上的龙说：“一切价值都已创造，而所有已被创造的价值就是我自身。”",
        sprite: {
            left: "NPC/questionman.png",
        }    
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
        name: "你",  
        text: "精神还要狮子何用？光是谦逊崇敬而能负重致远的骆驼不就够了吗？",
        sprite: {
            left: null,
        }    
    }  
},  
{  
    id: "spirit_lion_8",  
    elements: {  
        name: "？",  
        text: "要创造新的价值，那是狮子也无法做到的。",
        sprite: {
            left: "NPC/questionman.png",
        }    
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
        name: "你",  
        text: "那连狮子都无法做到的事，又还有谁能够做得到呢？",
        sprite: {
            left: null,
        }    
    }  
},  
{  
  id: "spirit_child_1",  
  elements: {  
      name: "旁白",  
      text: "烈焰熄灭，荒漠与峭壁的残影消散，精神像初生的孩童般轻盈而清澈。",
      sprite: {
          left: null,
      }    
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
        text: "它明白，人生或许永恒重复，或许无尽荒凉，但即便如此，它仍要为自己点亮火焰。",
        sprite: {
            left: null,
        }    
    }  
},  
{  
    id: "spirit_child_3",  
    elements: {  
        background:"sc4.1/4-1-5.jpg",
        name: "？",  
        text: "孩童是天真而健忘的，一个新的开始，一个游戏，一个自转的旋轮，一个原始的动作，一个神圣的肯定。",
        sprite: {
            left: "NPC/questionman.png",
        }    
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
        text: "然而，绝大多数人止步于荒漠，或在峭壁之上被怒火吞没。",
        sprite: {
            left: null,
        }    
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
        text: "它们是桥梁，通向未知，却必然指向未来——那个无人抵达，却等待被创造的境地。",
        sprite: {
            left: null,
        }    
    }  
},  
{  
    id: "spirit_child_6",  
    elements: {  
        name: "？",  
        text: "我已向你们阐明有关精神的三种变形：精神如何变成骆驼，骆驼如何变成狮子，最后狮子又如何变成孩童。",
        sprite: {
            left: "NPC/questionman.png",
        }    
    }  
},  
{  
    id: "battle_shadow_1",  
    elements: {  
        name: "旁白",  
        text: "——这是离开青铜门，重回斑牛镇后，遇到当初那位说出“上帝已死”之人时，与之展开的交谈。",
        sprite: {
            left: null,
        }    
    }  
},  
{  
    id: "battle_shadow_2",  
    elements: {  
        name: "旁白",  
        text: "不知怎么的，此刻却在脑海中回忆起来。"  
    }  
},  
{  
  id: "battle_shadow_2-1",  
  elements: {  
      name: "旁白",  
      text: "然而，现在来不及深究这其中的缘由。"  
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
        text: "短暂交手之后，谁也奈何不了谁。",
        sprite: {
            left: null,
        }  
    }  
},  
{  
    id: "battle_shadow_11",  
    elements: {  
        name: "？？？",  
        text: "你，只是那个被命运玩弄的骆驼！",
       sprite: {
            left: "NPC/zaie.png",
        }  
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
        text: "你所追求的创造与超越，真的存在吗——还是仅仅一场自欺的游戏？" ,
        sprite: {
            left: "NPC/zaie.png",
        }  
    }  ,
},  
{  
    id: "battle_shadow_19",  
    elements: {  
        name: "？？？",  
        text: "你所托付信任的人，真的值得信赖吗——还是说，仅仅是楚门的世界中的演员？"  ,
        sprite: {
            left: "NPC/zaie.png",
        }  
    }  ,
},  
{  
    id: "battle_shadow_20",  
    elements: {  
        name: "你",  
        text: "你到底是谁？" ,
        sprite: {
            left: null,
        } 
    }  
}, 
{  
  id: "battle_shadow_20-1",  
  elements: {  
      name: "你",  
      text: "你的目的究竟是什么？" ,
      sprite: {
          left: null,
      } 
  }  
}, 
{  
    id: "battle_shadow_21",  
    elements: {  
        name: "？？？",  
        text: "想要拨开迷雾窥见真相，那就随我而来吧！" ,
        sprite: {
            left: "NPC/zaie.png",
        }  
    }  
},  
{  
    id: "battle_shadow_21_1",  
    elements: {  
        name: "？？？",  
        text: "让我看看，你这一次是否具有独自面对真相的勇气？"  
    }  
},  //与影子发生战斗//
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
        text: "他是......你的影子。"  ,
        sprite:{
    left:"guangling/down.png",
}
    }  
},  
{  
    id: "battle_shadow_25",  
    elements: {  
        name: "光泠",  
        text: "你可以把他看作是另一个自己，或者说，是走上另一条道路的自己。"  
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
        text: "惟有叩问自己的内心，才能寻找到答案。" ,
         sprite:{
    left:"guangling/wubiaoqing.png",
}  
    },
    keyNode: true,
    choices: [
        {
            text: "你真的没有在欺骗我吗？",
            next: "battle_shadow_28_1",
            condition: () => {
          // 检查玩家背包中是否含有破碎蚀心刃或终焉之泪或蚀心暗寂
          const bagManager = BagManager.getInstance();
          return bagManager.hasCard("shattered_erosive_blade")||bagManager.hasCard("end_tears")||bagManager.hasCard("darkness_erosive_heart");
        }
        },
        {
            text: "我会努力去追寻这一切的真相。",
            next: "battle_shadow_28_2"
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
},//这里放成就（尔虞我诈）
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
    keyNode: true,
    choices: [
      {
        text: "已拾取蚀心刃",
        next: "battle_shadow_33",
        condition: () => {
          // 检查玩家背包中是否含有蚀心刃
          const bagManager = BagManager.getInstance();
          return bagManager.hasCard("darkness_erosive_heart");
        }
      },
      {
        text: "未拾取蚀心刃",
        next: "battle_shadow_33_1",
        condition: () => {
          // 检查玩家背包中是否含有破碎蚀心刃或终焉之泪
          const bagManager = BagManager.getInstance();
          return bagManager.hasCard("shattered_erosive_blade")||bagManager.hasCard("end_tears");
        }
      }
    ]
},
//蚀心刃分支//
{  
    id: "battle_shadow_33",  
    elements: {  
        name: "旁白",  
        bgm:"bgm20.MP3",
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
        text: "在跨过漫长的旅途后，依旧没能得到任何答案。"  ,
        sprite:{
    left:null,
}  
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
        name: "你",  
        text: "我早就觉得，这一切有问题了。"  
    }  
},  
{  
    id: "battle_shadow_35_1",  
    elements: {  
        name: "你",  
        text: "莫名其妙地把一无所知的我带上这样的道路，你一定也是个满嘴谎言的家伙。"  
    }  
},  
{  
    id: "battle_shadow_36",  
    elements: {  
        name: "你",  
        text: "为了欺骗我，不择手段，费尽心思。"  
    }  
},  
{  
    id: "battle_shadow_36_1",  
    elements: {  
        name: "你",  
        text: "为了愚弄我，把我弄得像一个骆驼。我已经受够了这一切！"  
    }  
},  
{  
    id: "battle_shadow_37",  
    elements: {  
        name: "你",  
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
        text: "为什么......在最后还要做出如此苦涩的选择？" ,
        sprite:{
    left:"guangling/down.png",
}   
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
        name: "你",  
        text: "错的不是我，而是这个世界！" ,
        sprite:{
    left:null,
}    
    }  
},  
{  
    id: "battle_shadow_44",  
    elements: {  
        background:"sc4.1/4-1-1.jpg",
        name: "旁白",  
        text: "理智早已被疯狂取代，癫狂的大笑中，拔出蚀心刃，将光泠的身体扔在脚下。"  ,
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
        name: "你",  
        text: "这样就好了吗？"  
    }  
},  
{  
  id: "battle_shadow_48-1",  
  elements: {  
      name: "旁白",  
      text: "喃喃自语道。"  
  }  
}, 
{  
  id: "battle_shadow_48-2",  
  elements: {  
      name: "旁白",  
      text: "这样就好。"  
  }  
}, 
{  
  id: "battle_shadow_48-3",  
  elements: {  
      name: "旁白",  
      text: "——不知是谁在替自己回答。"  
  }  
}, 
{  
    id: "battle_shadow_49",  
    elements: {  
        name: "旁白",  
        text: "然而，世界的躁动并未停息。"  
    }  
}, 
{  
  id: "battle_shadow_49-1",  
  elements: {  
      name: "旁白",  
      text: "大地燃烧起熊熊烈火，就好像世界在发怒；群山与森林在死亡的嘶吼中崩裂坍塌。"  
  }  
}, 
{  
  id: "battle_shadow_50",  
  elements: {  
      name: "旁白",  
      text: "面部突然感到一阵剧烈的灼痛，仿佛有什么东西要从脸上被剥离。"  
  }  
},  
{  
    id: "battle_shadow_50-1",  
    elements: {  
        name: "旁白",  
        text: "伸手捂住脸，却只摸到一片冰冷而陌生的空白。"  
    }  
},  
{  
    id: "battle_shadow_50-2",  
    elements: {  
        name: "旁白",  
        text: "五官如同被无形之手抹去：眼睛溶解成漆黑的虚空，鼻梁与嘴唇化作空洞的平面。"  
    }  
},  
{  
  id: "battle_shadow_50-3",  
  elements: {  
      name: "旁白",  
      text: "跪倒在地，双手在空白的面庞上颤抖游走，想要抓回失去的自己。"  
  }  
},  
{  
  id: "battle_shadow_50-4",  
  elements: {  
      name: "旁白",  
      text: "然而触到的，只有光滑而冰冷的虚无。"  
  }  
}, 
{  
  id: "battle_shadow_50-5",  
  elements: {  
      name: "旁白",  
      text: "想要痛苦的嘶吼，喉咙中却只能发出刺耳的呜咽。"  
  }  
},
{  
    id: "battle_shadow_51",  
    elements: {  
        name: "旁白",  
        text: "从四面八方传来的杂音不断撞击着耳膜，一遍又一遍。"  
    }  
},  
{  
  id: "battle_shadow_51-1",  
  elements: {  
      name: "旁白",  
      text: "似怒号，似哭喊，似咒骂，似讥讽。"  
  }  
}, 
{  
    id: "battle_shadow_51-2",  
    elements: {  
        name: "旁白",  
        text: "一遍又一遍......"  
    }  
},  
{  
  id: "battle_shadow_51-3",  
  elements: {  
      name: "旁白",  
      text: "直至，再次将自己彻底吞没。",  
  }  ,
  choices: [
    {
      text: "......",
      next: "battle_shadow_52",
      }
  ]
}, 
{  
    id: "battle_shadow_52",  
    elements: {  
        name: "？？？",  
        text: "没想到，居然会迎来这样的结局……分歧是在哪里出现的……？"  
    }  
},  
{  
    id: "battle_shadow_52_1",  
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
        text: "为了能让那个人一直停留在这里。"  
    }  
},
{  
  id: "battle_shadow_55-1",  
  elements: {  
      name: "？？？",  
      text: "多余的“眷恋”必须被剔除。"  
  }  
},
{  
  id: "battle_shadow_55-2",  
  elements: {  
      name: "？？？",  
      text: "那个人不需要到别的地方去。"  
  }  
},
{  
  id: "battle_shadow_55-3",  
  elements: {  
      name: "？？？",  
      text: "不需要，再回到那个悲惨的“现实”。"  
  }  
},
{  
    id: "battle_shadow_56",  
    elements: {  
        name: "旁白",  
        text: "在破败的废墟里醒来。"  
    }  
}, 
{  
  id: "battle_shadow_56-1",  
  elements: {  
      name: "旁白",  
      text: "总觉得这副场景似曾相识，可却又什么也回想不起来。"  
  }  
},
{  
    id: "battle_shadow_57",  
    elements: {  
        background:"sc0.1/0-1-1.jpg",
        bgm:"bgm2.mp3",
        name: "？？？",  
        text: "您醒了。",
        sprite:{
    left:"guangling/smile.png",
}     
    }  
},  
{  
    id: "battle_shadow_58",  
    elements: {  
        name: "你",  
        text: "你……是？" ,
        sprite:{
            left:null,
        }  
    }  
}, 
{  
  id: "battle_shadow_58-1",  
  elements: {  
      name: "旁白",  
      text: "此时才注意到，一名少女正站在身旁，笑着看着自己。" ,
      sprite:{
          left:null,
      }  
  }  
},
{  
    id: "battle_shadow_59",  
    elements: {  
        name: "？？？",  
        text: "您好，我的名字是光泠。", 
        sprite:{
            left:"guangling/smile.png",
        } 
    }  
},  
{  
  id: "battle_shadow_59",  
  elements: {  
      name: "光泠",  
      text: "是为了为世界带来新生，前来引导您的人。", 
      sprite:{
          left:"guangling/smile1.png",
      } 
  }  
},
{  
    id: "battle_shadow_60",  
    elements: {  
        name: "旁白",  
        text: "破败的废墟里，少女再一次，朝成为白纸的你露出微笑。" ,
        sprite:{
            left:null,
        }  
    }  ,
    action: () => {
                let am = AchievementManager.getInstance();
                am.unlockAchievementWithAnimation("ending_2");
            },
    choices: [
        {
            text: "达成结局二！！！",
            next: "chapter_0_scene_0",
        },
    ],
}, 
//无蚀心刃分支// 
{  
    id: "battle_shadow_33_1",  
    elements: {  
        
      name: "你",  
        bgm:"bgm23.MP3" ,
        text: "你说得对，这一切只能由我自己决定。" ,
        sprite:{
    left:null,
}  
    },
},
{  
    id: "battle_shadow_34_1",  
    elements: {  
        name: "你",  
        text: "希望我真的能走上正确的道路吧。" ,
        sprite:{
    left:null,
}  
    },
},
{  
    id: "battle_shadow_35_1",  
    elements: {  
        name: "光泠",  
        text: "但愿如此。" ,
        sprite:{
    left:"guangling/smile.png",
}  
    },
},
{  
    id: "battle_shadow_36_1",  
    elements: {  
        name: "你",  
        text: "抱歉，也许我真不该这样怀疑你。" ,
        sprite:{
    left:null,
}  
    },
},
{  
    id: "battle_shadow_37_1",  
    elements: {  
        name: "光泠",  
        text: "没关系，我能理解你的心情。" ,
        sprite:{
    left:"guangling/smile.png",
}  
    },
},
{  
    id: "battle_shadow_38_1",  
    elements: {  
        name: "光泠",  
        text: "面对谜团，想要追求背后的真相，这无可厚非。" ,
        sprite:{
    left:"guangling/smile.png",
}  
    },
},
{  
    id: "battle_shadow_39_1",  
    elements: {  
        name: "你",  
        text: "嗯，谢谢你，一路陪我走到这里。" ,
        sprite:{
    left:null,
}  
    },
},
{  
    id: "battle_shadow_40_1",  
    elements: {  
        name: "光泠",  
        text: "希望我们相处的每一刻时光，都能成为支撑彼此内心的力量。" ,
        sprite:{
    left:"guangling/smile.png",
}  
    },
  next:"ending_1",
},
//不怀疑光泠的分支//
{  
    id: "battle_shadow_28_2",  
    elements: {   
      name: "你",  
      bgm:"bgm23.MP3",  
      text: "谜题的答案，可不会主动送上门来啊。" ,
        sprite:{
    left:null,
}  
    },
},
{
    id: "battle_shadow_29_2",
    elements: {
        name: "你",
        text: "只要寒冷与黑夜还在，篝火就要继续燃烧。",
    },
},
{
    id: "battle_shadow_30_2",
    elements: {
        name: "你",
        text: "只要灾厄仍在世界上蔓延，我就会继续前进。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "battle_shadow_31_2",
    elements: {
        name: "光泠",
        text: "不要问篝火该不该燃烧，先问寒冷黑暗在不在。",
        sprite: {
            left: "guangling/smile.png",
        }
    },
},
{
    id: "battle_shadow_31_2_1",
    elements: {
        name: "光泠",
        text: "不要问正义该不该祭奠，先问人间不平还在不在。",
    },
},
{
    id: "battle_shadow_32_2",
    elements: {
        name: "光泠",
        text: "相信你一定会迎来你所期望的结局。",
        sprite: {
            left: "guangling/smile1.png",
        }
    },
},
//进入主线//
{
    id: "ending_1",
    elements: {
        name: "光泠",
        text: "请让我与你同行，一同见证那未知的未来吧。",
        sprite: {
            left: "guangling/smile1.png",
        }
    },
    keyNode: true,
    choices: [
        {
            text: "但我更想要依靠人类自己的力量。",
            next: "ending_1_3",
        },
        {
            text: "我想和你处于相同的时间，看向相同的世界。",
            next: "ending_1_4",
        },
    ],
},
//进入结局3//
{
    id: "ending_1_3",
    elements: {
       bgm:"bgm22.MP3" ,  
      name: "光泠",
        text: "人类......自己的力量？",
        sprite: {
            left: "guangling/smile1.png",
        }
    },
},
{
    id: "ending_2_3",
    elements: {
        name: "你",
        text: "即使已经在一起相处了这么久，我还是看不透你。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_3_3",
    elements: {
        name: "你",
        text: "但我能清晰地察觉到，你与我，不一样。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_4_3",
    elements: {
        name: "光泠",
        text: "......",
         sprite: {
            left: "guangling/wubiaoqing.png",
        }
    },
},
{
    id: "ending_5_3",
    elements: {
        name: "你",
        text: "你身上流动的，是不属于人类的力量。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_5_3_1",
    elements: {
        name: "你",
        text: "虽然纯净、圣洁，看上去和这个世界上正在发生的一切污浊的灾厄都大相径庭。",
    },
},
{
    id: "ending_5_3_2",
    elements: {
        name: "你",
        text: "但是，隐隐之中，两者间却又有某种难以言说的联系。",
    },
},
{
    id: "ending_5_3_3",
    elements: {
        name: "你",
        text: "就好像......两者原本同源一体......只不过因为某些原因而分离。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_6_3",
    elements: {
        name: "光泠",
        text: "......该夸赞你敏锐的洞察力吗？",
        sprite: {
            left: "guangling/smile1.png",
        }
    },
},
{
    id: "ending_7_3",
    elements: {
        name: "你",
        text: "我会依靠自己的力量，夺取属于人类的最终胜利。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_7_3_1",
    elements: {
        name: "你",
        text: "我要将自己的意志焚烧殆尽，终结这个千疮百孔的世界上的灾厄。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_8_3",
    elements: {
        name: "光泠",
        text: "这就是，你最后的选择吗。",
        sprite: {
            left: "guangling/down.png",
        }
    },
},
{
    id: "ending_9_3",
    elements: {
        name: "你",
        text: "真正的王牌只有自己而已。我会和命运战斗，并且赢给你看。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_10_3",
    elements: {
        name: "光泠",
        text: "......",
        sprite: {
            left: "guangling/down.png",
        }
    },
},
{
    id: "ending_11_3",
    elements: {
        name: "光泠",
        text: "你的心早已走在我看不见的地方。",
    },
},
{
    id: "ending_12_3",
    elements: {
        name: "光泠",
        text: "当时间的尺度被无限拉长，活着的注定死亡，守护的必然毁坏。",
    },
},
{
    id: "ending_12_3_1",
    elements: {
        name: "光泠",
        text: "所坚持的一切都显得毫无意义……",
    },
},
{
    id: "ending_12_3_2",
    elements: {
        name: "光泠",
        text: "所以不要一直将目光看得那么远，适当地回过头，看看身边吧。",
    },
},
{
    id: "ending_12_3_3",
    elements: {
        name: "光泠",
        text: "这姑且算是我的......一点私心吧。",
    },
},
{
    id: "ending_13_3",
    elements: {
        name: "你",
        text: "我意已决，不必多言。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_14_3",
    elements: {
        name: "光泠",
        text: "哪怕到了即将分离的时候，也希望你不要忘记，",
        sprite: {
            left: "guangling/tanqi.png",
        }
    },
},
{
    id: "ending_14_3_1",
    elements: {
        name: "光泠",
        text: "不论彼此身在何方，我们的目光都会在同一个终点相聚。",
    },
},
{
  id: "ending_14_4",
  elements: {
      name: "你",
      text: "就此道别吧。",
      sprite: {
          left: null,
      }
  },
},
{
    id: "ending_15_3",
    elements: {
        name: "你",
        text: "虽然很感激你所做的一切，但是——",
        sprite: {
            left: null,
        }
    },
},
{
  id: "ending_15_4",
  elements: {
      name: "你",
      text: "再见了，光泠。",
      sprite: {
          left: null,
      }
  },
},
{
    id: "ending_16_3",
    elements: {
        name: "光泠",
        text: "再见。",
        sprite: {
            left: "guangling/smile.png",
        }
    },
},
{
  id: "ending_16_4",
  elements: {
      name: "光泠",
      text: "愿胜利的光辉照亮你的前路。",
      sprite: {
          left: "guangling/smile.png",
      }
  },
},
{
  id: "ending_16_5",
  elements: {
      name: "光泠",
      text: "祈盼希望能永远伴你身旁。",
      sprite: {
          left: "guangling/smile.png",
      }
  },
},
{
    id: "ending_17_3",
    elements: {
        name: "旁白",
        text: "转身离去，不再回头。",
    sprite: {
            left: null,
        }
},
},
{
  id: "ending_17_3_1",
  elements: {
      name: "你",
      text: "如果战斗是种罪孽，那就让我一个人来承担吧。",
  },
},
{
  id: "ending_17_3_2",
  elements: {
      name: "旁白",
      text: "……",
  },
},
{
    id: "ending_17_3_3",
    elements: {
        name: "旁白",
        text: "独自向着无脸人离开的方向追去。",
    },
},
{
    id: "ending_18_3",
    elements: {
      background:"sc4.1/4-1-11.jpg",   
      name: "旁白",
        text: "风声撕裂夜空。追击着无脸人，不知不觉中又回到了当初苏醒时的废墟。",
    },
},
{
    id: "ending_18_3_1",
    elements: {
        name: "旁白",
        text: "穿过断裂的石柱，跨过坍塌的拱门。灰烬如同雪般飘落，脚下的废墟在沉默中低吟。",
    },
},
{
    id: "ending_18_3_2",
    elements: {
        name: "旁白",
        text: "一切在这里起始，也将在这里迎来终结。",
    },
},
{
    id: "ending_19_3",
    elements: {
       bgm:"bgm10.MP3" ,  
      name: "？？？",
        text: "竟然追上来了么？不错。",
        sprite: {
            left: "NPC/zaie.png",
        }
    },
},
{
    id: "ending_20_3",
    elements: {
        name: "旁白",
        background:"sc4.1/4-1-12.jpg", 
        text: "无脸人站立在废墟中央，发出毫无生机的声音。",
    },
},
{
    id: "ending_20_3_1",
    elements: {
        name: "你",
        text: "你已经准备好受死了吧。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_21_3",
    elements: {
        name: "？？？",
        text: "呵，大言不惭！",
        sprite: {
            left: "NPC/zaie.png",
        }
    },
},
{
  id: "ending_21_3_1",
  elements: {
      name: "？？？",
      text: "你的生命，你的愿望，你的力量，都是如此的微不足道。",
  },
},
{
    id: "ending_21_3_2",
    elements: {
        name: "？？？",
        text: "连你身边曾经最亲密的同伴，也没有和你并肩同行。",
    },
},
{
    id: "ending_21_3_3",
    elements: {
        name: "？？？",
        text: "如此弱小无助的你，也配妄言？",
    },
},
{
    id: "ending_22_3",
    elements: {
        name: "旁白",
        text: "话音未落，无脸人身后猛地冒出一团黑雾，瞬间化作一条条锁链，缠绕而来。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_22_3_1",
    elements: {
        name: "旁白",
        text: "将暗寂化为黑金色长剑，手起剑落，斩断了所有黑雾锁链。",
    },
},
{
    id: "ending_22_3_2",
    elements: {
        name: "你",
        text: "明白自我真正的困惑和恐惧，迎难而上才是真正的强大。",
    },
},
{
    id: "ending_23_3",
    elements: {
        name: "你",
        text: "对付你，我一人足矣！",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_24_3",
    elements: {
        name: "？？？",
        text: "哦？你难道不渴求真相么？你就不想知道，我是谁吗？",
        sprite: {
            left: "NPC/zaie.png",
        }
    },
},
{
    id: "ending_25_3",
    elements: {
        name: "你",
        text: "我只知道，我会粉碎你的阴谋，然后拯救这个世界。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_26_3",
    elements: {
        name: "？？？",
        text: "哈哈！可笑至极。告诉你真相吧！",
        sprite: {
            left: "NPC/zaie.png",
        }
    },
},
{
    id: "ending_26_3_1",
    elements: {
        name: "？？？",
        text: "我就是你，你就是我！",
    },
},
{
    id: "ending_26_3_2",
    elements: {
        name: "？？？",
        text: "我们是同样的存在，我们本就是同一个人！",
    },
},
{
    id: "ending_26_3_3",
    elements: {
        name: "？？？",
        text: "我就是你的过去，也将是你的未来！",
    },
},
{
    id: "ending_27_3",
    elements: {
        name: "你",
        text: "我怎么会，像你一样黑暗腐朽？",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_28_3",
    elements: {
        name: "？？？",
        text: "呵！",
        sprite: {
            left: "NPC/zaie.png",
        }
    },
},
{
  id: "ending_28_3_1",
  elements: {
      name: "？？？",
      text: "你可知：美丽的幻影永远不会令人生厌。",
  },
},
{
  id: "ending_28_3_2",
  elements: {
      name: "？？？",
      text: "对于幻影，你不能踢，也不能踩，否则跌跤的是你自己。",
  },
},
{
  id: "ending_28_3_3",
  elements: {
      name: "？？？",
      text: "既然你已经是孤身一人，不如和我一起掌控这个世界吧。",
  },
},
{
    id: "ending_28_3_4",
    elements: {
        name: "？？？",
        text: "我理解你的思想与心绪，我也知晓你内心深处的渴望与野心。",
    },
},
{
    id: "ending_28_3_5",
    elements: {
        name: "？？？",
        text: "我们拥有相同的力量，我们来自相同的地方。我们齐心合力，就没人能够阻止我们。",
    },
},
{
    id: "ending_28_3_6",
    elements: {
        name: "？？？",
        text: "好好想想吧！是与我同行？还是被我毁灭？",
    },
},
{
    id: "ending_29_3",
    elements: {
        name: "你",
        text: "你的话语，就像你自身现在一样软弱无力。",
        sprite: {
            left: null,
        }
    },
},
{
  id: "ending_29_4",
  elements: {
      name: "你",
      text: "与你同行？你还不配！",
      sprite: {
          left: null,
      }
  },
},
{
    id: "ending_30_3",
    elements: {
        
      name: "？？？",
        text: "这个世界，充斥着阴谋，卑鄙，丑陋，肮脏，腐朽。",
        sprite: {
            left: "NPC/zaie.png",
        }
    },
},
{
    id: "ending_30_3_1",
    elements: {
        name: "？？？",
        text: "并没有什么值得你去拯救的地方。",
    },
},
{
    id: "ending_31_3",
    elements: {
        name: "你",
        text: "每个时代都会有阴谋家的身影，但同样不会缺少团结与勇气。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_31_3_1",
    elements: {
        name: "你",
        text: "在唾弃黑暗时，也不要否认光明的存在。",
    },
},
{
    id: "ending_32_3",
    elements: {
        name: "？？？",
        text: "你以为你能做的了什么呢？",
        sprite: {
            left: "NPC/zaie.png",
        }
    },
},
{
    id: "ending_32_3_1",
    elements: {
        name: "？？？",
        text: "每时每刻，在很多你看不见的地方，都上演着一幕幕惨绝人寰的悲剧。",
    },
},
{
    id: "ending_33_3",
    elements: {
        name: "你",
        text: "太阳之所以伟大，是因为连尘埃都能照亮。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_33_3_1",
    elements: {
        name: "你",
        text: "我要成为新世界的太阳。",
    },
},
{
  id: "ending_33_3_2",
  elements: {
      name: "你",
      text: "我要行天之道，总司一切。",
  },
},
{
  id: "ending_34_1",
  elements: {
      name: "？？？",
      text: "你若执意如此，则将陷入万劫不复，付出生命的代价！",
      sprite: {
          left: "NPC/zaie.png",
      }
  },
},
{
  id: "ending_34_1-1",
  elements: {
      name: "？？？",
      text: "为了那些本来与自己无关的事，死的代价太大了。",
      sprite: {
          left: "NPC/zaie.png",
      }
  },
},
{
  id: "ending_34_1-2",
  elements: {
      name: "？？？",
      text: "对每个人来说，生命都是瑰宝。",
      sprite: {
          left: "NPC/zaie.png",
      }
  },
},
{
  id: "ending_34_1-3",
  elements: {
      name: "？？？",
      text: "每天坐在翠绿的枝头，看着那太阳驾着金色的马车，月亮乘着银色的玉辇来来去去，多么快活。",
      sprite: {
          left: "NPC/zaie.png",
      }
  },
},
{
  id: "ending_34_1-4",
  elements: {
      name: "？？？",
      text: "山楂花的味道那么香，山谷里的蓝铃草那么美，山坡上的石楠花笑得那么甜！",
      sprite: {
          left: "NPC/zaie.png",
      }
  },
},
{
  id: "ending_34_2",
  elements: {
      name: "？？？",
      text: "世界是如此的美好，不妨放下这痛苦的一切，去好好享受那美妙！",
      sprite: {
          left: "NPC/zaie.png",
      }
  },
},
{
  id: "ending_34_2-1",
  elements: {
      name: "你",
      text: "我所为之赴汤蹈火的使命，比我一个人的生命更重要。",
      sprite: {
          left: null,
      }
  },
},
{
    id: "ending_34_3",
    elements: {
        name: "？？？",
        text: "不成熟的果实会很酸，不成熟的人会打架。",
        sprite: {
            left: "NPC/zaie.png",
        }
    },
},
{
    id: "ending_34_3_1",
    elements: {
        name: "？？？",
        text: "你为什么要执着于与我战斗！我们团结起来，双赢的局面岂不是更好？",
    },
},
{
    id: "ending_34_3_2",
    elements: {
        name: "？？？",
        text: "放弃吧，不要再做无意义的抵抗！",
    },
},
{
    id: "ending_35_3",
    elements: {
        name: "你",
        text: "我是为了那些无法战斗的人而战斗！",
        sprite: {
            left: null,
        }
    },
},
{
  id: "ending_35_3-1",
  elements: {
      name: "你",
      text: "为了这个地方，不想再看到有人流泪，我想要大家的脸上拥有笑容。",
      sprite: {
          left: null,
      }
  },
},
{
    id: "ending_35_3-2",
    elements: {
        name: "你",
        text: "如果说世界的命运掌握在你手里的话，那我，就要把它夺回来！",
    },
},
{
    id: "ending_36_3",
    elements: {
        name: "旁白",
        text: "不再多言，握紧手中暗寂，向无脸人发起进攻。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_37_3",
    elements: {
        name: "？？？",
        text: "冥顽不灵！",
        sprite: {
            left: "NPC/zaie.png",
        }
    },
},
{
    id: "ending_38_3",
    elements: {
        name: "你",
        text: "什么！？",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_39_3",
    elements: {
        name: "旁白",
        text: "意外的是，暗寂竟直接穿过了无脸人的躯体，如所经之处空无一物一般。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_40_3",
    elements: {
        name: "？？？",
        text: "来吧，我会带你见证，真正的毁灭！",
        sprite: {
            left: "NPC/zaie.png",
        }
    },
},
{
    id: "ending_41_3",
    elements: {
        name: "旁白",
        text: "话音未落，无脸人逐渐消散，化作一团黑烟，径直冲入废墟地底。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_41_3_1",
    elements: {
         background:"sc4.1/4-1-15.jpg", 
      name: "旁白",
        text: "此刻，异变突生——",
    },
},
{
  id: "ending_41_3_2",
  elements: {
      name: "旁白",
      text: "在废墟的中央，一道漆黑的裂隙缓缓张开，仿佛世界的肌肤被撕开一道无法愈合的伤口。",
  },
},
{
    id: "ending_41_3_3",
    elements: {
        name: "旁白",
        text: "从裂隙中涌起了一团团令人窒息的黑雾，迅速向四周弥漫扩张，",
    },
},
{
    id: "ending_41_3_4",
    elements: {
        name: "旁白",
        text: "眨眼间遮天蔽日，天地失色。低沉的咆哮在天地间回荡，如同无数亡者的哭喊。",
    },
},
{
    id: "ending_42_3",
    elements: {
        name: "你",
        text: "这是——？",
    },
},
{
    id: "ending_43_3",
    elements: {
        name: "旁白",
        text: "吼——！一道来自裂缝中的嘶吼冲击着耳膜，大地随之震颤，碎石如雨坠落。",
    },
},
{
    id: "ending_43_3_1",
    elements: {
        name: "旁白",
        text: "深埋地底的岩层被撕扯翻涌，火焰与黑雾喷薄而出，仿佛迎来了末日。",
    },
},
{
  id: "ending_43_3_1",
  elements: {
      name: "旁白",
      text: "然后，祂出现了。",
  },
},
{
    id: "ending_44_3",
    elements: {
        name: "旁白",
        text: "一具由黑雾与碎骨拼凑的身躯缓缓升起，肩背如山岳般庞大，胸口燃烧着漆黑火焰，吞噬着天地的残光。",
    },
},
{
    id: "ending_44_3_1",
    elements: {
        name: "旁白",
        text: "一张模糊不清的面孔浮现，却不断变幻，时而是骷髅，时而是扭曲的人脸，时而则是一片空洞。",
    },
},
{
    id: "ending_44_3_2",
    elements: {
        name: "旁白",
        text: "他抬首的刹那，天空随之倾塌，赤红的裂纹在天空中扩散。",
    },
},
{
    id: "ending_45_3",
    elements: {
       background:"sc4.1/4-1-12.jpg",   
      name: "旁白",
        text: "这便是————",
    },
    choices: [
        {
            text: "灾厄之主(Dominus Calamitatis)!",
            next: "ending_46_3",
        },
    ],
},
{
    id: "ending_46_3",
    elements: {
       background:"sc4.1/4-1-15.jpg",   
      name: "旁白",
        text: "空气骤然凝固，废墟仿佛因祂的出现而失去了重量，整个世界都陷入停滞。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_47_3",
    elements: {
        name: "旁白",
        text: "废墟彻底崩裂，万千裂缝如蛛网般蔓延，将整片世界分割成破碎的碎片。"
    }
},
{
    id: "ending_48_3",
    elements: {
        name: "你",
        text: "呼——"
    }
},
{
    id: "ending_49_3",
    elements: {
        name: "你",
        text: "前所未有的强敌吗，真是可怕。"
    }
},
{
    id: "ending_50_3",
    elements: {
        name: "旁白",
        text: "面前是永无止境的毁灭之渊，是永无取胜机会的究极黑暗。"
    }
},
{
    id: "ending_51_3",
    elements: {
        name: "旁白",
        text: "做好投入其中的觉悟了吗?"
    }
},
{
    id: "ending_52_3",
    elements: {
        name: "你",
        text: "但既然选择了独自面对，不论怎样，我都会战斗到底！"
    }
},
{
    id: "ending_53_3",
    elements: {
        name: "你",
        text: "背负着拯救世界的使命，我不能输！"
    }
},
{
    id: "ending_54_3",
    elements: {
        name: "旁白",
        text: "燃烧着生命的力量，向灾厄之主发起了冲锋。"
    }
},
{
    id: "ending_55_3",
    elements: {
        name: "旁白",
        text: "……",
        sprite: {
            left: null,
        }
    }
},
{
    id: "ending_56_3",
    elements: {
        name: "光泠",
        text: "你做出了选择......那就要承担选择的代价......",
        sprite: {
            left: "guangling/wubiaoqing.png",
        }
    }
},
{
    id: "ending_57_3",
    elements: {
        name: "光泠",
        text: "你将面对永无止境的毁灭之渊......"
    }
},
{
    id: "ending_58_3",
    elements: {
        name: "光泠",
        text: "但我......依然将陪伴你至最后一刻......",
        sprite: {
            left: "guangling/smile.png",
        }
    }
},
{
    id: "ending_59_3",
    elements: {
        name: "旁白",
        text: "在目光所不及之处，少女将废墟之上发生的一切尽收眼底。",
        sprite: {
            left: null,
        }
    }
},
{
    id: "ending_60_3",
    elements: {
        name: "旁白",
        text: "……"
    }
},
{
    id: "ending_61_3",
    elements: {
        name: "旁白",
        text: "理想很丰满，现实很骨感。"
    }
},
{
    id: "ending_62_3",
    elements: {
       background:"sc4.1/4-1-21.jpg",   
      name: "旁白",
        text: "天地破碎，废墟在烈风中崩裂，赤红的天空裂纹如伤口般蔓延。"
    }
},
{
    id: "ending_63_3",
    elements: {
        name: "旁白",
        text: "黑雾翻涌，灾厄之主的巨影在天与地之间延伸，胸口的漆黑火焰燃烧着虚无的意志。"
    }
},
{
    id: "ending_64_3",
    elements: {
        name: "旁白",
        text: "奄奄一息地倒在废墟之上，眼前是一幅灾难般的场景，还有那强大又可怕的敌人。"
    }
},
{
    id: "ending_65_3",
    elements: {
        name: "你",
        text: "竟然......会是这样的结局......"
    }
},
{
    id: "ending_66_3",
    elements: {
        name: "你",
        text: "我......真的做错了选择么。"
    }
},
{
    id: "ending_67_3",
    elements: {
        name: "旁白",
        text: "挣扎着想再度起身，手中的暗寂已布满裂纹，曾经纹路中金色的微光此刻也无比暗淡。"
    }
},
{
    id: "ending_68_3",
    elements: {
        name: "旁白",
        text: "血迹顺着指尖滴落。"
    }
},
{
    id: "ending_69_3",
    elements: {
        name: "旁白",
        text: "世界在眼中逐渐模糊。"
    }
},
{
    id: "ending_70_3",
    elements: {
        name: "旁白",
        text: "过去自己曾一度觉得，只要能终结这一切就算付出生命的代价也无妨。"
    }
},
{
    id: "ending_71_3",
    elements: {
        name: "旁白",
        text: "现在才察觉到这只是一厢情愿的狂妄自大罢了。"
    }
},
{
    id: "ending_72_3",
    elements: {
        name: "旁白",
        text: "英雄很重要，但让英雄不再孤军奋战，"
    }
},
{
    id: "ending_72_3_1",
    elements: {
        name: "旁白",
        text: "让每个人都有勇气成为下一个英雄的风气，才是能否度过这场灾难的关键。"
    }
},
{
    id: "ending_73_3",
    elements: {
        name: "你",
        text: "不过......至少现在只有我一个人承受着这失败的苦痛。"
    }
},
{
    id: "ending_74_3",
    elements: {
        name: "旁白",
        text: "灾厄之主的怒吼震颤着耳膜，似乎天地之间发生了什么变化。"
    }
},
{
    id: "ending_75_3",
    elements: {
        name: "旁白",
        text: "下一刻，巨大的黑影伸手抓来。"
    }
},
{
    id: "ending_76_3",
    elements: {
         background:"sc4.1/4-1-8.jpg", 
      name: "旁白",
        text: "身体被无形之力拖拽，坠入一片无尽的黑暗之中。"
    }
},
{
    id: "ending_77_3",
    elements: {
        name: "旁白",
        text: "……"
    }
},
{
    id: "ending_78_3",
    elements: {
        name: "旁白",
        text: "…………",
    sprite: {
            left: null,
        }
    }
},
{
    id: "ending_79_3",
    elements: {
        name: "光泠",
        text: "......",
        sprite: {
            left: "guangling/wubiaoqing.png",
        }
    }
},
{
    id: "ending_80_3",
    elements: {
        name: "光泠",
        text: "为什么......？",
        sprite: {
            left: "guangling/down.png",
        }
    }
},
{
    id: "ending_81_3",
    elements: {
        name: "旁白",
         background:"sc4.1/4-1-7.jpg", 
        text: "少女的眼瞳难掩疑惑，她漫步于废墟之中。",
        sprite: {
            left: null,
        }
    }
},
{
    id: "ending_82_3",
    elements: {
        name: "旁白",
        text: "被尘沙覆盖的大地立满了腐朽的墓碑。"
    }
},
{
    id: "ending_83_3",
    elements: {
        name: "旁白",
        text: "曾与她同行的人类做出了最后的选择。"
    }
},
{
    id: "ending_84_3",
    elements: {
        name: "旁白",
        text: "人类的气息已然消失，为其所构建的世界也不再需要存在的理由。",
        sprite: {
            left: null,
        }
    }
},
{
    id: "ending_85_3",
    elements: {
        name: "光泠",
        text: "明明与我同行就能得到一切，为什么要在最后关头放弃?",
        sprite: {
            left: "guangling/down.png",
        }
    }
},
{
    id: "ending_86_3",
    elements: {
        name: "光泠",
        text: "明明没有人期待着这样的结局。"
    }
},
{
    id: "ending_87_3",
    elements: {
        name: "旁白",
        text: "她呢喃着一个不可能得到答案的问题。",
        sprite: {
            left: null,
        }
    }
},
{
    id: "ending_88_3",
    elements: {
        name: "光泠",
        text: "......结果，到头来，我还是什么也没能明白。",
        sprite: {
            left: "guangling/down.png",
        }
    }
},
{
    id: "ending_89_3",
    elements: {
        name: "旁白",
         background:"sc4.1/4-1-21.jpg", 
        text: "她注视着这个即将覆灭的世界，静候着自己的消亡。",
        sprite: {
            left: null,
        }
    }
},
{
    id: "ending_90_3",
    elements: {
        name: "旁白",
        text: "然而，片刻之后，她的嘴角忽然涌现一丝淡淡的笑意。",
        sprite: {
            left: null,
        }
    }
},
{
    id: "ending_91_3",
    elements: {
        name: "光泠",
        text: "虽然不明白，但也不代表这趟旅程没有意义。",
        sprite: {
            left: "guangling/smile1.png",
        }
    }
},
{
    id: "ending_92_3",
    elements: {
        name: "旁白",
         background:"sc4.1/4-1-7.jpg", 
        text: "她向那无数的墓碑低头行礼。",
        sprite: {
            left: null,
        }
    }
},
{
    id: "ending_93_3",
    elements: {
        name: "光泠",
        text: "感谢你，陪我走过如此之久的时光。",
        sprite: {
            left: "guangling/smile.png",
        }
    }
},
{
    id: "ending_94_3",
    elements: {
        name: "光泠",
        text: "感谢你直到最后都出乎我的预料，赠与我惊喜。",
        sprite: {
            left: "guangling/smile1.png",
        }
    }
},
{
    id: "ending_95_3",
    elements: {
        name: "光泠",
        text: "你所做的每一个决定，都会牢记于我心。",
        sprite: {
            left: "guangling/smile.png",
        }
    }
},
{
    id: "ending_96_3",
    elements: {
        name: "光泠",
        text: "我会妥善地保管......不，妥善地利用从你那里获得的一切。"
    }
},
{
    id: "ending_97_3",
    elements: {
        name: "光泠",
        text: "为了平静星球的浩瀚潮声，为了让生命凝聚出更为璀璨的结晶。"
    }
},
{
    id: "ending_98_3",
    elements: {
        name: "光泠",
        text: "为了下次......与“你们”更好的相遇。"
    }
},
{
    id: "ending_99_3",
    elements: {
        name: "旁白",
        text: "她心怀感激地向那名人类隔空致敬。",
        sprite: {
            left: null,
        }
    }
},
{
    id: "ending_100_3",
    elements: {
        name: "光泠",
        text: "啊......对了。",
        sprite: {
            left: "guangling/wubiaoqing.png",
        }
    }
},
{
    id: "ending_101_3",
    elements: {
        name: "光泠",
        text: "最后请允许我仅代表我自己，向你做最后的告别。",
        sprite: {
            left: "guangling/smile.png",
        }
    }
},
{
    id: "ending_102_3",
    elements: {
        name: "光泠",
        text: "由你......由“你们”编写出的故事，十分的......",
        sprite: {
            left: "guangling/smile1.png",
        }
    }
},
{
    id: "ending_103_3",
    elements: {
        name: "光泠",
        text: "十分的精彩。",
        sprite: {
            left: "guangling/smile.png",
        }
    }
},
{
    id: "ending_104_3",
    elements: {
        name: "旁白",
        text: "那之后——",
        sprite: {
            left: null,
        }
    }
},
{
    id: "ending_105_3",
    elements: {
        name: "旁白",
        text: "一阵微风吹过，吹起了少女的发丝。"
    }
},
{
    id: "ending_106_3",
    elements: {
        name: "旁白",
        text: "吹散了这个只存在于须臾之间的小小幻梦。"
    }
},
{
    id: "ending_107_3",
    elements: {
        name: "旁白",
        text: "……"
    }
},
{
    id: "ending_108_3",
    elements: {
        name: "旁白",
        text: "伸出手，却抓不到任何东西；脚步踏出，却落入无边空洞。"
    }
},
{
    id: "ending_109_3",
    elements: {
        name: "旁白",
        text: "时间在此失去了意义，空间在此化为无尽深渊。"
    }
},
{
    id: "ending_110_3",
    elements: {
        name: "旁白",
        text: "每一次呼喊，都被黑暗吸走；每一次挣扎，都像落入更深的漩涡。"
    }
},
{
    id: "ending_111_3",
    elements: {
        name: "旁白",
        text: "残存的意识在无边无际的绝对黑暗中漂浮。"
    }
},
{
    id: "ending_112_3",
    elements: {
        name: "旁白",
        text: "死寂如潮水般淹没了一切——痛苦、怒火、思念、悲伤......"
    }
},
{
    id: "ending_113_3",
    elements: {
        name: "旁白",
        text: "最终只剩下虚无与灵魂相拥，永远也无法分离。"
    },
},
{
    id: "ending_114_3",
    elements: {
        name: "旁白",
        text: "被灾厄之主流放至无尽虚无之中的你，惟有孤独与黑暗永恒作伴。"
    },
            action: () => {
                let am = AchievementManager.getInstance();
                am.unlockAchievementWithAnimation("ending_3");
              },
    choices: [
        {
            text: "(达成结局三！！！)",
            next: "chapter_0_scene_0",
        }
    ]
},
//结局4//
{
    id: "ending_1_4",
    elements: {
       bgm:"bgm10.MP3" ,  
      name: "你",
        text: "世上没有谁是完美的，相互扶持着走下去，这就是名为人生的游戏。",
        sprite: {
            left: null,
        }
    },
},
{
    id: "ending_2_4",
    elements: {
        name: "光泠",
        text: "我会一直在这里，就在你的身边，无论有什么需要或者想法都可以告诉我。",
sprite: {
            left: "guangling/smile.png",
        }
    }
},
{
    id: "ending_3_4",
    elements: {
        name: "你",
        text: "谢谢你，你总是能在关键时刻给予我力量。",
        sprite: {
            left: null,
        }
    }
},
{
    id: "ending_4_4",
    elements: {
        name: "你",
        text: "我会拼尽全力，终结一切灾厄的。",
        sprite: {
            left: null,
        }
    }
},
{
    id: "ending_5_4",
    elements: {
        name: "光泠",
        text: "这个时候，应该说我们.....之类的复数形式哦！",
        sprite: {
            left: "guangling/smile1.png",
        }
    }
},
{
    id: "ending_6_4",
    elements: {
        name: "你",
        text: "对，是我们。",
        sprite: {
            left: null,
        }
    }
},
{
    id: "ending_7_4",
    elements: {
        name: "你",
        text: "那么，出发吧，我们还有很多事要一起去完成。",
        sprite: {
            left: null,
        }
    }
},
{
    id: "ending_8_4",
    elements: {
        name: "光泠",
        text: "如你所愿。",
        sprite: {
            left: "guangling/smile.png",
        }
    }
},
{
    id: "ending_9_4",
    elements: {
        name: "旁白",
         background:"sc0.1/0-1-1.jpg", 
        text: "风声撕裂夜空。追击着无脸人，不知不觉中又回到了当初苏醒时的废墟。",
        sprite: {
            left: null,
        }
    }
},
{
    id: "ending_10_4",
    elements: {
         background:"sc4.1/4-1-11.jpg", 
      name: "旁白",
        text: "穿过断裂的石柱，跨过坍塌的拱门。灰烬如同雪般飘落，脚下的废墟在沉默中低吟。"
    }
},
{
    id: "ending_11_4",
    elements: {
        name: "旁白",
        text: "一切在这里起始，也将在这里迎来终结。"
    }
},
{
    id: "ending_12_4",
    elements: {
       background:"sc4.1/4-1-12.jpg",   
      name: "？？？",
        text: "竟然追上来了么？",
        sprite: {
            left: "NPC/zaie.png",
        }
    }
},
{
    id: "ending_13_4",
    elements: {
        name: "？？？",
        text: "不错。"
    }
},
{
    id: "ending_14_4",
    elements: {
        name: "旁白",
        text: "无脸人站立在废墟中央，发出毫无生机的声音。",
         sprite: {
            left: null,
        }
    }
},
{
    id: "ending_15_4",
    elements: {
        name: "你",
        text: "做好受死的准备了么？",
    }
},
{
  id: "ending_15-5",
  elements: {  
    name: "？？？",
      text: "大言不惭！",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15-5-1",
  elements: {  
    name: "？？？",
      text: "你难道不渴求真相么？",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "你就不想知道，我是谁吗？",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "你",
      text: "对你这样的家伙，说再多的话也没用。",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "你",
      text: "你身上那污秽而邪恶的气息，真是令人作呕。",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "可笑至极。",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "告诉你真相吧！我就是你，你就是我！",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "我们是同样的存在，我们本就是同一个人！",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "我就是你的过去，也将是你的未来！",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "你",
      text: "我可不会像你一样，堕落成这副模样。",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "冥顽不灵！",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "告诉你真相吧！这一切悲剧的始作俑者，就是你身边之人！",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "恶魔的耳语有时会听起来像天使的声音。",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "而她就是诱使你走向灭亡，堕入深渊的魔鬼！",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "她就是在你目光不及之处操纵一切、将你玩弄于鼓掌之中的幕后黑手！",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "与她同行，只会让你走向万劫不复！",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "只有我，才是值得你信赖的同道中人。",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "我理解你的一切，我也知晓你的渴望。",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "真的要与我为敌么？还是就此悔改，与她做个了断？",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "你",
      text: "你的话语，就像你本人一样软弱无力。",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "你",
      text: "我，绝不会像你一样，说着恬不知耻的话，还妄想挑拨他人的关系。",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "执迷不悟！",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "这个世界一向不缺谎言......你能肯定，自己活在“真相”中吗？",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "旁白",
      text: "无脸人的声音逐渐变得扭曲。",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "好吧！既然你执意选择错误的道路，那么绝望就是你的唯一结局！",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "来吧，享受地狱的乐趣吧。",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "旁白",
      text: "他癫狂地大笑。",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "我会将你那可笑的希望与信念，彻底粉碎！",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "你",
      text: "就凭你，也想阻止我么？",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "哈哈！大错特错！愚蠢至极！",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "你以为，我的力量仅此而已吗？",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "旁白",
      text: "一股危险的气息从无脸人身上爆发而出，他身上燃起仿佛来自地狱的黑炎，举起手中的暗寂，一把插进废墟的大地。",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "旁白",
      text: "黑炎灼烧着暗寂，蔓延到大地上，将所到之处的一切都焚烧殆尽。",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "旁白",
      text: "在废墟的中央，一道漆黑的裂隙缓缓张开，仿佛世界的肌肤被撕开一道无法愈合的伤口。",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "旁白",
      text: "从裂隙中涌起了一团团令人窒息的黑雾，迅速向四周弥漫扩张，眨眼间遮天蔽日，天地失色。",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "旁白",
      text: "低沉的咆哮在天地间回荡，如同无数亡者的哭喊。",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15-5-2",
  elements: {  
    name: "？？？",
      text: "终于......来了。",
      sprite: {
          left: "NPC/zaie.png",
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "旁白",
      text: "说完最后一句话，无脸人的面部出现数道裂纹，身影逐渐融化为一滩黑色液体，直到最后彻底崩散，不复存在。",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "你",
      text: "注意，大的要来了！",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "旁白",
      text: "吼——",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "旁白",
      text: "一道来自裂缝中的嘶吼冲击着耳膜，大地随之震颤，碎石如雨坠落。",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "旁白",
      text: "深埋地底的岩层被撕扯翻涌，火焰与黑雾喷薄而出，仿佛迎来了末日。",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "旁白",
      text: "然后，祂出现了。",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "旁白",
      text: "一具由黑雾与碎骨拼凑的身躯缓缓升起，肩背如山岳般庞大，胸口燃烧着漆黑火焰，吞噬着天地的残光。",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "旁白",
      text: "一张模糊不清的面孔浮现，却不断变幻，时而是骷髅，时而是扭曲的人脸，时而则是一片空洞。",
       sprite: {
          left: null,
      }
  }
},
{
  id: "ending_15_5-3",
  elements: {
      name: "旁白",
      text: "祂抬首的刹那，天空随之倾塌，赤红的裂纹在天空中扩散。",
       sprite: {
          left: null,
      }
  }
},
{
    id: "ending_16_4",
    elements: {
        name: "旁白",
        text: "这便是——"
    },
    choices: [
        {
            text: "灾厄之主(Dominus Calamitatis)",
            next: "ending_17_4",
        },
    ]
},
{
    id: "ending_17_4",
    elements: {
       background:"sc4.1/4-1-10.jpg",   
      name: "旁白",
        text: "空气骤然凝固，废墟仿佛因祂的出现而失去了重量，整个世界都陷入停滞。"
    }
},
{
    id: "ending_18_4",
    elements: {
      name: "旁白",
      text: "废墟彻底崩裂，万千裂缝如蛛网般蔓延，将整片世界分割成破碎的碎片。",
       sprite: {
            left: null,
        }
    }
  },
  {
    id: "ending_19_4",
    elements: {
      name: "光泠",
      text: "看来这是最后的战斗了。",
       sprite: {
            left: "guangling/smile.png",
        }
    }
  },
  {
    "id": "ending_20_4",
    "elements": {
      "name": "光泠",
      "text": "可敌人也是前所未有的强大。"
    }
  },
  {
    "id": "ending_21_4",
    "elements": {
      "name": "光泠",
      "text": "你感到害怕了吗？",
       sprite: {
            left: "guangling/smile1.png",
        }
    }
  },
  {
    "id": "ending_22_4",
    "elements": {
      "name": "你",
      "text": "从不畏惧。",
       sprite: {
            left: null,
        }
    }
  },
  {
    "id": "ending_23_4",
    "elements": {
      "name": "你",
      "text": "无论是面对怎样的敌人，我都不会畏缩不前。"
    }
  },
  {
    "id": "ending_24_4",
    "elements": {
      "name": "你",
      "text": "英雄可不能临阵脱逃啊。",
       sprite: {
            left: null,
        }
    }
  },
  {
    "id": "ending_25_4",
    "elements": {
      "name": "光泠",
      "text": "勇气，的确是取胜的关键。",
       sprite: {
            left: "guangling/smile.png",
        }
    }
  },
  {
    "id": "ending_26_4",
    "elements": {
      "name": "你",
      "text": "战斗，是为了让明天远离痛苦。",
       sprite: {
            left: null,
        }
    }
  },
  {
    "id": "ending_27_4",
    "elements": {
      "name": "你",
      "text": "准备好了吗？要上了。",
       sprite: {
            left: null,
        }
    }
  },
  {
    "id": "ending_28_4",
    "elements": {
      "name": "光泠",
      "text": "一切灾厄，都将回归于虚无。",
       sprite: {
            left: "guangling/smile.png",
        }
    }
  },
  {
    "id": "ending_29_4",
    "elements": {
      "name": "光泠",
      "text": "斩尽一切污秽吧！"
    }
  },
  {
    "id": "ending_30_4",
    "elements": {
      "name": "光泠",
      "text": "让我们一起，战斗到最后一刻！"
    }
  },
  {
    "id": "ending_31_4",
    "elements": {
      "name": "你",
      "text": "好了，来细数你的罪恶吧！",
       sprite: {
            left: null,
        }
    },
    keyNode: true,
    choices: [
      {
        text: "进入集齐结局",
        next: "ending_32_5",
        condition: () => {
          // 检查玩家是否拥有始源之心和永昼之瞳的成就以及终焉之泪的卡牌
          const achievementManager = AchievementManager.getInstance();
          const hasHeartOfPrime = achievementManager.isUnlocked("item_heart_of_prime");  // 始源之心
          const hasEyeOfEternalSun = achievementManager.isUnlocked("item_eye_of_eternal_sun");  // 永昼之瞳
          const bagManager = BagManager.getInstance();
          const hasTearOfTerminus = bagManager.hasCard("end_tears");  // 终焉之泪卡牌
          
          // 只有拥有始源之心和永昼之瞳的成就以及终焉之泪的卡牌才显示此选项
          return hasHeartOfPrime && hasEyeOfEternalSun && hasTearOfTerminus;
        }
      },
      {
        text: "进入未集齐结局",
        next: "test_game8",
        condition: () => {
          // 检查玩家是否拥有始源之心和永昼之瞳的成就以及终焉之泪的卡牌
          const achievementManager = AchievementManager.getInstance();
          const hasHeartOfPrime = achievementManager.isUnlocked("item_heart_of_prime");  // 始源之心
          const hasEyeOfEternalSun = achievementManager.isUnlocked("item_eye_of_eternal_sun");  // 永昼之瞳
          const bagManager = BagManager.getInstance();
          const hasTearOfTerminus = bagManager.hasCard("end_tears");  // 终焉之泪卡牌
          
          // 无论是否集齐都显示此选项
          return !(hasHeartOfPrime && hasEyeOfEternalSun && hasTearOfTerminus);
        }
      }
    ]
  },//进行最后的战斗//
//结局4//
{
    id: "test_game8",
    elements: {
        name: "灾厄之主",
        text: "我会亲手将你打入深渊。",
    },
    // 在游戏开始前设置特殊标志
    action: () => {
        // 设置特殊对战标志，使得灾厄之主第三阶段不会给玩家卡牌
        (window as any).isDisasterLordFinalBattle = true;
    },
    game: {
        id: "card_game",
        config: {
            player: {
                actionPoints: 5,
                hp: 60,
                maxHp: 60,
                 deck: () => {
                    const bagManager = BagManager.getInstance();
                    return bagManager.getCardDeckForGame();
                },
                drawCount: 3,           // 玩家每回合抽2张牌
                initialDrawCount: 5 ,    // 玩家开始时抽3张牌
            },
            deckSelection: {
                minDeckSize: 15,   // 设置最小选牌数量
                maxDeckSize: 20,   // 设置最大选牌数量
            },
            opponent: {
                name:"灾厄之主",
                actionPoints: 6,
                hp:30 ,
                maxHp: 30,
                deck: {
                    "little_stone": 1,        
                    "strange_stone": 1,         
                    "bedrock": 1, 
                    "large_rock": 1,
                    "red_stone":2,
                    "diamond":2,
                    "crushed_stone":2,
                    "pebble":2,
                    "meteorite":1,        
                },
                drawCount: 6,           // 对手每回合抽3张牌
                initialDrawCount: 6 ,    // 对手开始时抽6张牌
                initialBuffs: [  // 设置初始buff
                    {
                        id: "disaster_lord_phase1",
                        duration: -1,
                        target: "self"
                    }
                ],
            },
            backgroundImage:"game/zaiezhizhu.jpg",
            bgm:"zaiezhizhu",
            disasterLordBgm: {
                phase1: "zaiezhizhu_phase2",      // 灾厄之主第一阶段使用原来第二阶段的音乐
                phase2: "zaiezhizhu",             // 灾厄之主第二阶段使用原来第一阶段的音乐
                phase3: "zaiezhizhu"              // 灾厄之主第三阶段使用原来第一阶段的音乐
            }
        },                      
        end: [
            {
                condition: (gameData: CardGameEventData) => gameData.score >= 1,
                next: "ending_33_6",
            },
            {
                condition: (gameData: CardGameEventData) => gameData.score <= 0, // 明确表示输了的情况
                next: "ending_33_4",
            }
        ]
    }
},     
{
    "id": "ending_33_4",
    "elements": {
       background:"sc4.1/4-1-10.jpg", 
      bgm:"bgm26.MP3" ,
       "name": "旁白",
      "text": "漆黑的火焰燃烧在废墟之上，天地的裂痕不断扩大，宛如整个世界都在坠落。",
      sprite:{
        left:null,
      }
    }
},
  {
    "id": "ending_34_4",
    "elements": {
      "name": "旁白",
      "text": "灾厄之主伫立在破碎的天穹之下，身躯比群山更庞大，面孔在骷髅与虚无之间变幻。",
      "sprite": {
        "left": null
      }
    }
  },
  {
    "id": "ending_35_4",
    "elements": {
      "name": "你",
      "text": "真的，到此为止了吗......",
      "sprite": {
        "left": null,
      }
    }
  },
  {
    "id": "ending_36_4",
    "elements": {
      "name": "旁白",
      "text": "奄奄一息地倒在废墟之上，眼前是不断崩毁的天地，还有那可怕的敌人。",
      "sprite": {
        "left": null
      }
    }
  },
  {
    "id": "ending_37_4",
    "elements": {
      "name": "旁白",
      "text": "强行支撑起身体来，剧烈地喘着粗气，冷眼望向灾厄之主。",
      "sprite": {
        "left": null
      }
    }
  },
  {
    "id": "ending_38_4",
    "elements": {
      "name": "光泠",
      "text": "灾厄之主的力量，远远超出了我们的想象。",
      "sprite": {
        "left": "guangling/wubiaoqing.png",
      }
    }
  },
  {
    "id": "ending_39_4",
    "elements": {
      "name": "旁白",
      "text": "光泠跪倒在地上，身影被赤红的天空映照得苍白而脆弱。",
      "sprite": {
        "left": null
      }
    }
  },
  {
    "id": "ending_40_4",
    "elements": {
      "name": "你",
      "text": "果然还是因为......没有集齐那三样关键之物吗......",
      "sprite": {
        "left": null
      }
    }
  },
  {
    "id": "ending_41_4",
    "elements": {
      "name": "光泠",
      "text": "我想正是如此。",
      "sprite": {
        "left": "guangling/wubiaoqing.png",
      }
    }
  },
  {
    "id": "ending_42_4",
    "elements": {
      "name": "你",
      "text": "......",
      "sprite": {
        "left": null
      }
    }
  },
  {
    "id": "ending_43_4",
    "elements": {
      "name": "你",
      "text": "啊啊......",
    }
  },
  {
    "id": "ending_44_4",
    "elements": {
      "name": "你",
      "text": "但是......现在后悔已经来不及了......",

    }
  },
  {
    "id": "ending_45_4",
    "elements": {
      "name": "旁白",
      "text": "握紧暗寂，一瘸一拐地向灾厄之主走去。",
    
    }
  },
  {
    "id": "ending_46_4",
    "elements": {
      "name": "你",
      "text": "真是狼狈啊。",
      
    }
  },
  {
    "id": "ending_47_4",
    "elements": {
      "name": "旁白",
      "text": "在这最后的时刻，忍不住自嘲道。",
      
    }
  },
  {
    "id": "ending_48_4",
    "elements": {
      "name": "你",
      "text": "可是，就算是跌得粉身碎骨，我也不能放弃啊。",
    }
  },
  {
    "id": "ending_49_4",
    "elements": {
      "name": "旁白",
      "text": "凝聚最后的力量，将暗寂化为黑金色巨炮，对准了灾厄之主。",
    }
  },
  {
    "id": "ending_50_4",
    "elements": {
      "name": "你",
      "text": "即使已经看不到胜利的希望......我也要，发起最后的冲锋！",
      "sprite": {
        "left": null
      }
    }
  },
{
    "id": "ending_51_4",
    "elements": {
       background:"sc4.1/4-1-13.jpg", 
      "name": "旁白",
      "text": "猛烈的光线从暗寂中直冲而出，燃烧着最后的生命力量，承载着绝望中的希望，向肆虐天地的灾厄之主袭去。",
    }
  },
  {
    "id": "ending_52_4",
    "elements": {
      "name": "旁白",
      "text": "轰！",
    }
  },
  {
    "id": "ending_53_4",
    "elements": {
      
      "name": "旁白",
      "text": "瞬间，烟尘席卷天地，让人看不清眼前到底发生了什么。",
    }
  },
  {
    "id": "ending_54_4",
    "elements": {
      "name": "你",
      "text": "成功了么？",
    }
  },
  {
    "id": "ending_55_4",
    "elements": {
      "name": "旁白",
      "text": "瘫倒在地，呆呆地望向前方，努力想要穿过烟尘看清状况。",
    }
  },
  {
    "id": "ending_56_4",
    "elements": {
      "name": "旁白",
      "text": "然而——",
    }
  },
  {
    "id": "ending_56_4-1",
    "elements": {
      "name": "旁白",
      "text": "缺失的力量，让一切徒劳的行为都显得无比苍白。",
    }
  },
  {
    "id": "ending_57_4",
    "elements": {
      "name": "旁白",
      "text": "最后的攻击落在灾厄之主的身躯上，只能溅起如尘埃般微不足道的涟漪。",
    }
  },
  {
    "id": "ending_58_4",
    "elements": {
      "name": "旁白",
      "text": "天地间回荡着灾厄之主的鬼哭神嚎，似是在讥笑我们的弱小。",
    }
  },
  {
    "id": "ending_59_4",
    "elements": {
      "name": "旁白",
      "text": "瞬间，绝望淹没了心神。",
    }
  },
  {
    "id": "ending_60_4",
    "elements": {
      "name": "旁白",
      "text": "灾厄之主缓缓露出胸口的黑焰，刹那间漫天的黑雾化作锁链，将我们牢牢束缚。",
    }
  },
  {
    "id": "ending_61_4",
    "elements": {
      "name": "你",
      "text": "哈......哈......看来这就是终点了。",
      "sprite": { 
        "left": null
     }
    }
  },
  {
    "id": "ending_62_4",
    "elements": {
      "name": "光泠",
      "text": "你害怕了吗？",
      "sprite": { 
        "left": "guangling/smile.png", 
    }
    }
  },
  {
    "id": "ending_63_4",
    "elements": {
      "name": "你",
      "text": "也许吧。不过......已经不重要了。",
      "sprite": { 
        "left": null
     }
    }
  },
  {
    "id": "ending_64_4",
    "elements": {
      "name": "光泠",
      "text": "我不怕。",
      "sprite": { 
        "left": "guangling/smile.png", 
    }
    }
  },
  {
    "id": "ending_65_4",
    "elements": {
      "name": "光泠",
      "text": "和你在一起，我就不会害怕。",
      "sprite": { 
        "left": "guangling/smile1.png", 
    }
    }
  },
  {
    "id": "ending_66_4",
    "elements": {
      "name": "你",
      "text": "啊......是吗......",
      "sprite": {
         "left": null, 
        }
    }
  },
  {
    "id": "ending_66_5",
    "elements": {
      "name": "你",
      "text": "没想到......我还有这种魔力......",
      "sprite": {
         "left": null, 
        }
    }
  },
  {
    "id": "ending_67_4",
    "elements": {
      "name": "光泠",
      "text": "只可惜，还是没能做到啊。",
      "sprite": { 
        "left": "guangling/down.png", 
    }
  },
},
  {
    "id": "ending_68_4",
    "elements": {
      "name": "旁白",
      "text": "光泠的目光平静，却带着不舍的温柔。",
      "sprite": { 
        "left": null,
    }
    }
  },
  {
    "id": "ending_69_4",
    "elements": {
      "name": "光泠",
      "text": "不过，“我们”还会再见的。",
      "sprite": { 
        "left": "guangling/smile.png", 
    }
    }
  },
  {
    "id": "ending_70_4",
    "elements": {
      "name": "旁白",
      "text": "她轻声呢喃。",
      "sprite": { "left": null }
    }
  },
  {
    "id": "ending_71_4",
    "elements": {
       background:"sc4.1/4-1-21.jpg", 
      "name": "旁白",
      "text": "下一刻，漆黑的火焰倾泻而下，吞没了眼前的一切。",
    }
  },
  {
    "id": "ending_72_4",
    "elements": {
      "name": "旁白",
      "text": "两人的身影被吞没在黑焰中，像被画卷上抹去的痕迹，瞬间消散，无影无踪。",
    }
  },
  {
    "id": "ending_73_4",
    "elements": {
      "name": "旁白",
      "text": "废墟寂静无声，唯有灾厄之主的狂嚎在天地间回荡。",
    }
  },
  {
    "id": "ending_74_4",
    "elements": {
      "name": "旁白",
      "text": "......",
    }
  },
  {
    "id": "ending_75_4",
    "elements": {
      "name": "旁白",
      "text": "............",
    }
  },
  {
    "id": "ending_76_4",
    "elements": {
      "name": "旁白",
      "text": "......啊。",
    }
  },
  {
    "id": "ending_76_5",
    "elements": {
      "name": "旁白",
      "text": "谁都好，救救......",
    }
  },
  {
    "id": "ending_77_4",
    "elements": {
      "name": "旁白",
      "text": "首先是听觉。",
    }
  },
  {
    "id": "ending_77_4-1",
    "elements": {
      "name": "旁白",
      "text": "一声天光乍明般，魔咒似的啸声。",
    }
  },
  {
    "id": "ending_78_4",
    "elements": {
      "name": "旁白",
      "text": "紧接着的是视觉。",
    }
  },
  {
    "id": "ending_78_4-1",
    "elements": {
      "name": "旁白",
      "text": "无边界的黑暗在眼间弥散，视锥细胞开始重新接收光线。",
    }
  },
  {
    "id": "ending_79_4",
    "elements": {
      "name": "旁白",
      "text": "随后，知觉逐渐复苏，对肢体的掌控权重新回归。",
    }
  },
  {
    "id": "ending_80_4",
    "elements": {
      "name": "旁白",
      "text": "眼眶酸胀，鼻腔阻塞，短而尖锐的枯草摩擦着脸颊，手掌覆下是泥土和细碎的沙砾的触感。",
    }
  },
  {
    "id": "ending_81_4",
    "elements": {
      "name": "旁白",
      "text": "——于是，开始支配沉重的四肢，以手掌支地，膝盖撑起，费力地站起了身。",
    }
  },
  {
    "id": "ending_82_4",
    "elements": {
      "name": "旁白",
      "text": "五感慢慢变得敏锐，正提醒着自己，这是个崭新的地界。",
    }
  },
  {
    "id": "ending_83_4",
    "elements": {
      bgm:"bgm27.MP3" ,
      "name": "旁白",
      "text": "而当环顾四周之时，一切便如同帷幕拉开，登台亮相，世间万物伴随神秘悠长的旋律，开始流动了起来。",
      "sprite": {
         "left": null
         }
    }
  },
  {
    "id": "ending_84_4",
    "elements": {
      "name": "旁白",
      "text": "天地昏暗，四下无人，而异样的火光在天穹之上明灭，",
    }
  },
  {
    "id": "ending_84_4_1",
    "elements": {
      "name": "旁白",
      "text": "诡异的幽影在云层出没不定，令人心生畏惧。",
    }
  },
  {
    "id": "ending_85_4",
    "elements": {
      "name": "旁白",
      "text": "神秘的旋律在大地上回响，像是牵引驱赶猎犬的哨声，也攫住了心魂。",
    }
  },
  {
    "id": "ending_86_4",
    "elements": {
      "name": "旁白",
      "text": "而自己为何在此？脑袋空空，身无长物。无人相伴，无迹可寻。",
    }
  },
  {
    "id": "ending_87_4",
    "elements": {
      "name": "旁白",
      "text": "太阳穴鼓噪，模糊的记忆深海鲸越一般涌现在脑海，又迅速下落惊起波涛。",
    }
  },
  {
    "id": "ending_87_5",
    "elements": {
      "name": "旁白",
      "text": "心脏被冲撞得酸涩，感受倏忽变幻，思绪虚假如同与谁人的共享幻觉。",
    }
  },
  {
    "id": "ending_88_4",
    "elements": {
      "name": "旁白",
      "text": "突然感觉到十分疲惫，仿佛经过长途跋涉与漫长战斗之后，兜兜转转回到了起点。",
    }
  },
  {
    "id": "ending_89_4",
    "elements": {
      "name": "旁白",
      "text": "总觉得这一切似曾相识，然而记忆却空白如纸,",
    }
  },
  {
    "id": "ending_89_4_1",
    "elements": {
      "name": "旁白",
      "text": "任凭自己如何追忆，都无法捕捉到分毫痕迹。",
    }
  },
  {
    "id": "ending_90_4",
    "elements": {
      "name": "旁白",
      "text": "捡起手边一根黑色的手杖，摸索着，尝试离开这个地方。",
    }
  },
  {
    "id": "ending_91_4",
    "elements": {
       background:"sc4.1/4-1-7.jpg", 
      "name": "旁白",
      "text": "直至走到废墟的边缘，发现一片不知废弃了多久的墓地。",
    }
  },
  {
    "id": "ending_92_4",
    "elements": {
      "name": "？？？",
      "text": "您醒了？",
      "sprite": { 
        "left": null
     }
    }
  },
  {
    "id": "ending_93_4",
    "elements": {
      "name": "旁白",
      "text": "忽然，一个清澈的声音在耳畔响起。",
    }
  },
  {
    "id": "ending_94_4",
    "elements": {
      "name": "旁白",
      "text": "向声音的来源看去，才发现身后立着一名少女。",
      "sprite": {
         "left": null,
         }
    }
  },
{
    "id": "ending_94_4_1",
    "elements": {
      "name": "旁白",
      "text": "她衣袂轻扬，神情安宁，眼眸中盛着一抹温柔的光辉。",
    }
  },
{
    "id": "ending_95_4",
    "elements": {
      "name": "旁白",
      "text": "她微笑着注视自己，仿佛等待已久。",
    }
  },
  {
    "id": "ending_96_4",
    "elements": {
      "name": "你",
      "text": "你......是谁？"
    }
  },
  {
    id: "ending_97_4",
    elements: {
      name: "？？？",
      text: "您好，我的名字是——光泠。",
      sprite: {
         left: "guangling/smile.png",
         }
    }
  },
  {
    "id": "ending_98_4",
    "elements": {
      "name": "旁白",
      "text": "她的声音像溪水般流过破败的石隙，好似承载着难以言说的希望。",
      sprite: { 
        left: null 
    }
    }
  },
  {
    "id": "ending_99_4",
    "elements": {
      "name": "光泠",
      "text": "我是为了为这世界带来新生，前来引导您的人。",
      sprite: {
         left: "guangling/smile1.png",
         }
    }
  },
  {
    "id": "ending_100_4",
    "elements": {
      "name": "旁白",
      "text": "风声在废墟间穿行，像是命运的低语，带来世界的讯息。",
      sprite: { 
        left: null 
      }
    }
  },
  {
    "id": "ending_101_4",
    "elements": {
      "name": "旁白",
      "text": "一场新的旅程，即将再次缓缓开启。",
    }
  },
  {
    id: "ending_103_4",
    elements: {
      name: "旁白",
      text: "当废墟中的尘埃再次落定，唯有那名微笑的少女，成为你轮回中唯一不变的起点。",
      sprite: { 
        left: null,
     }
    },
            action: () => {
                let am = AchievementManager.getInstance();
                am.unlockAchievementWithAnimation("ending_4");
              },
    choices:[
        {
            text:"达成结局四！！！",
            next:"chapter_0_scene_0",
    }
    ]
  },
{
                    id: "ending_32_5",
                    elements: {
                        name: "灾厄之主",
                        text: "我会亲手将你打入深渊",
                    },
                    game: {
                        id: "card_game",
                        config: {
                            player: {
                                actionPoints: 5,
                                hp: 60,
                                maxHp: 60,
                                 deck: () => {
                                    const bagManager = BagManager.getInstance();
                                    return bagManager.getCardDeckForGame();
                                },
                                drawCount: 6,           // 玩家每回合抽6张牌
                                initialDrawCount: 5 ,    // 玩家开始时抽5张牌
                            },
                            deckSelection: {
                            minDeckSize: 15,   // 设置最小选牌数量
                            maxDeckSize: 20,   // 设置最大选牌数量
                        },
                            opponent: {
                              name:"灾厄之主",
                                actionPoints: 6,
                                hp:30 ,
                                maxHp: 30,
                                deck: {
                                    "little_stone": 1,        
                                "strange_stone": 1,         
                                "bedrock": 1, 
                                "large_rock": 1,
                                "red_stone":2,
                                "diamond":2,
                                "crushed_stone":2,
                                "pebble":2,
                                "meteorite":1,        
                                },
                                drawCount: 6,           // 对手每回合抽3张牌
                                initialDrawCount: 6 ,    // 对手开始时抽6张牌
                            initialBuffs: [  // 设置初始buff
                                {
                                     id: "disaster_lord_phase1",
                                     duration: -1,
                                     target: "self"
                                 }
                             ],
                              },
                            backgroundImage:"game/zaiezhizhu.jpg",
                            bgm:"zaiezhizhu",
                            disasterLordBgm: {
                                phase1: "zaiezhizhu_phase2",      // 灾厄之主第一阶段使用原来第二阶段的音乐
                                phase2: "zaiezhizhu",             // 灾厄之主第二阶段使用原来第一阶段的音乐
                                phase3: "zaiezhizhu"              // 灾厄之主第三阶段使用原来第一阶段的音乐
                            }
                        },
                          end: [
                            {
                                condition: (gameData: CardGameEventData) => {
                                    // 大获全胜：玩家在第三阶段获胜且血量为满血
                                    return gameData.player.hp  > 0 && gameData.opponent.maxHp === 1 && gameData.player.hp === gameData.player.maxHp;
                                },
                                next: "ending_33_5",
                            },
                            {
                                condition: (gameData: CardGameEventData) => {
                                    // 小胜：玩家在第三阶段获胜但血量不为满血
                                    return gameData.player.hp  > 0 && gameData.opponent.maxHp === 1 && gameData.player.hp < gameData.player.maxHp;
                                },
                                next: "ending_33_6",
                            },
                            {
                                condition: (gameData: CardGameEventData) => {
                                    // 完全惨败：玩家在前两个阶段就失败了（灾厄之主最大血量为30，说明还在第一或第二阶段）
                                    return gameData.player.hp <= 0 && gameData.opponent.maxHp === 30;
                                },
                                next: "ending_33_7",
                            },
                            {
                                condition: (gameData: CardGameEventData) => {
                                    // 小败：玩家在第三阶段失败了（灾厄之主最大血量为1，说明已经进入第三阶段）
                                    return gameData.player.hp <= 0 && gameData.opponent.maxHp === 1;
                                },
                                next: "ending_33_8",
                            },
                        ]
                    }
                },   
{
    id: "ending_33_5",
    elements: {
       background:"sc4.1/4-1-20.jpg", 
      bgm:"bgm27.MP3"  ,
       name: "旁白",
      text: "天地颤动，废墟在末日的轰鸣中崩塌。",
      sprite: { 
        left: null,
     }
    },
},
{
  id: "ending_34_5",
  elements: {
    name: "旁白",
    text: "灾厄之主的黑影高耸如山，胸口的漆黑火焰燃烧着虚无与绝望。"
  }
},
{
  id: "ending_34_5-1",
  elements: {
    name: "你",
    text: "胜利的法则已然确定！"
  }
},
{
  id: "ending_35_5",
  elements: {
    name: "旁白",
    text: "暗寂之上，闪耀着金色的光芒——那是比任何时候都要耀眼的希望之光。"
  }
},
{
  id: "ending_36_5",
  elements: {
    name: "旁白",
    text: "在光泠的法阵中，灾厄之主的力量被不断削弱。"
  }
},
{
  id: "ending_36_5-1",
  elements: {
    name: "旁白",
    text: "而有着三样关键之物加持的我们，却从未感到力量是如此的充沛！"
  }
},
{
  id: "ending_36_5-2",
  elements: {
    name: "旁白",
    text: "将终焉之泪与化为一把黑金巨扇的暗寂融为一体，瞬间一股侵蚀之力源源不断地从暗寂中释放而出——"
  }
},
{
  id: "ending_36_5-3",
  elements: {
    name: "旁白",
    text: "这一次，这股曾经让人心生恐惧地力量将为己所用。"
  }
},
{
  id: "ending_37_5",
  elements: {
    name: "你",
    text: "我要掀起黑洞风暴！"
  }
},
{
  id: "ending_38_5",
  elements: {
    name: "旁白",
    text: "向着灾厄之主用力挥动暗寂。"
  }
},
{
  id: "ending_39_5-1",
  elements: {
    name: "旁白",
    text: "霎时，一道巨大的龙卷风夹杂着毁灭一切的侵蚀之力，向着灾厄之主席卷而去。"
  }
},
{
  id: "ending_39_5-2",
  elements: {
    name: "旁白",
    text: "风暴之声，浓稠得如千万只狂蜂灌入耳膜。"
  }
},
{
  id: "ending_39_5-3",
  elements: {
    name: "旁白",
    text: "狂暴的湮灭之风将所经之处的一切统统揉碎，宣告着混沌的降临。"
  }
},
{
  id: "ending_40_5",
  elements: {
    name: "旁白",
    text: "灾厄之主在风暴中被撕扯、吞噬、侵蚀，不甘的哀嚎在天地间回响。"
  }
},
{
  id: "ending_41_5",
  elements: {
    name: "旁白",
    text: "胸口的黑焰骤然喷薄，妄图突破风暴，发起最后的反扑！"
  }
},
{
  id: "ending_42_5",
  elements: {
    name: "旁白",
    text: "漆黑的火焰倾泻而下，冲破风暴之墙，直扑希望之光。"
  }
},
{
  id: "ending_43_5",
  elements: {
    name: "旁白",
    text: "然而，黑焰尚未来得及灼烧大地，就被金色法阵尽数吸收、融解。"
  }
},
{
  id: "ending_44_5",
  elements: {
    name: "旁白",
    text: "那是来自始源之心的，最纯粹、最强大的生命力量。"
  }
},
{
  id: "ending_45_5",
  elements: {
    name: "你",
    text: "暖春自会在严寒中绽放！"
  }
},
{
  id: "ending_46_5",
  elements: {
    name: "旁白",
    text: "沐浴在始源之心的生命光辉中，将永昼之瞳嵌入暗寂。"
  }
},
{
  id: "ending_47_5",
  elements: {
    name: "你",
    text: "为黑夜带来伤口！"
  }
},
{
  id: "ending_48_5",
  elements: {
    name: "旁白",
    text: "暗寂化为黑金巨炮，对准灾厄之主，爆发出有史以来最猛烈的耀眼光线，一瞬间照亮了整个天地。"
  }
},
{
  id: "ending_49_5",
  elements: {
    name: "旁白",
    text: "仿佛其中蕴藏着无穷能量，以摧枯拉朽之势，将沿途的一切邪恶与污秽从这个世界上彻底抹除，不留痕迹。"
  }
},
{
  id: "ending_50_5",
  elements: {
    name: "你",
    text: "想战胜我，你还早了两万年呢！"
  }
},
{
  id: "ending_51_5",
  elements: {
    name: "旁白",
    text: "灾厄之主只能在不甘的咆哮中，看着自己的庞大身躯被轰得支离破碎。"
  }
},
{
  id: "ending_52_5",
  elements: {
    name: "你",
    text: "看我的‘六脉神剑’！"
  }
},
{
  id: "ending_53_5",
  elements: {
    name: "旁白",
    text: "暗寂化为六把黑金飞剑，不断斩击灾厄之主，使它原本就快倒塌的躯壳离毁灭的终点更进一步。"
  }
},
{
  id: "ending_54_5",
  elements: {
    name: "旁白",
    text: "最终，六剑合一，挟无可匹敌之力，在狂野风暴与山崩地裂中，刺进了灾厄之主燃着黑焰的胸膛。"
  }
},
{
  id: "ending_55_5",
  elements: {
    name: "你",
    text: "我要行天之道，总司一切！"
  }
},
{
  id: "ending_56_5",
  elements: {
     background:"sc4.1/4-1-14.jpg", 
    name: "旁白",
    text: "光与暗在废墟中央交汇，轰鸣震彻天地。灾厄之主的身躯在圣洁光芒中崩裂，腐朽黑雾化为哀嚎与悲鸣。"
  }
},
{
  id: "ending_57_5",
  elements: {
    name: "你",
    text: "我要作为新世界的开辟者，为这个伪造的世界画上句号！"
  }
},
{
  id: "ending_58_5",
  elements: {
    name: "旁白",
    text: "始源之心、永昼之瞳、终焉之泪三件至宝合而为一，焕发出创造的伟力，笼罩了整个残破的世界。"
  }
},
{
  id: "ending_59_5",
  elements: {
    name: "旁白",
    text: "就在灾厄之主彻底消失的刹那，天地骤然颤抖——"
  }
},
{
  id: "ending_59_5-1",
  elements: {
    name: "旁白",
    text: "不是大地，不是天空，而是来自时间！"
  }
},
{
  id: "ending_60_5",
  elements: {
    name: "旁白",
    text: "起初是微弱的脉动，像心跳般在天地间回响。"
  }
},
{
  id: "ending_61_5",
  elements: {
    name: "旁白",
    text: "紧接着，万物流转骤然加快。残垣化为齑粉，草木拔地而起，破碎的天空重新拼合。"
  }
},
{
  id: "ending_62_5",
  elements: {
    name: "旁白",
    text: "群星旋转闪烁，昼与夜交替如疾风，四季翻飞如同书页掠过。"
  }
},
{
  id: "ending_63_5",
  elements: {
     background:"sc4.1/4-1-22.jpg", 
    name: "旁白",
    text: "生与死、枯与荣在一瞬间彼此重叠。"
  }
},
{
  id: "ending_64_5",
  elements: {
    name: "你",
    text: "时间开始加速了！"
  }
},
{
  id: "ending_65_5",
  elements: {
    name: "旁白",
    text: "内心升起一股冲动，几乎想要喊出‘Made in Heaven’，却还是忍住了。"
  }
},
{
  id: "ending_66_5",
  elements: {
    name: "旁白",
    text: "心脏剧烈跳动，仿佛被卷入无可阻挡的洪流。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_67_5",
  elements: {
    name: "光泠",
    text: "别害怕。",
    sprite:{
        left:"guangling/smile.png",
    }
  }
},
{
  id: "ending_68_5",
  elements: {
    name: "旁白",
    text: "她牵起你的手，在耳边轻声说道。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_69_5",
  elements: {
    name: "光泠",
    text: "你已经来到了新世界的入口。",
     sprite:{
        left:"guangling/smile.png",
    }
  }
},
{
  id: "ending_70_5",
  elements: {
    name: "旁白",
    text: "时间愈发加速，直到一切化为白光。",
     sprite:{
        left:null,
    }
  }
},
{
  id: "ending_70_5-1",
  elements: {
    name: "旁白",
    text: "世界，即将迎来新生。",
     sprite:{
        left:null,
    }
  }
},
{
  id: "ending_70_5-2",
  elements: {
    name: "旁白",
    text: "……",
     sprite:{
        left:null,
    }
  }
},
{
  id: "ending_71_5",
  elements: {
    name: "旁白",
    text: "当时间的洪流终于归于宁静，天地间重现前所未有的清澈。"
  }
},
{
  id: "ending_72_5",
  elements: {
     background:"sc4.1/4-1-17.jpg", 
    name: "旁白",
    text: "光芒散尽，你睁开眼，发现自己伫立在陌生而纯净的天地。"
  }
},
{
  id: "ending_73_5",
  elements: {
    name: "旁白",
    text: "晨曦自东方洒落，光辉温柔如水，将大地一点点点亮。"
  }
},
{
  id: "ending_74_5",
  elements: {
    name: "旁白",
    text: "云谦卑地立在天边，晨光为它戴上金冠。"
  }
},
{
  id: "ending_75_5",
  elements: {
    name: "旁白",
    text: "空气里弥漫青草与花木的芬芳。风吹过，携来远山的清凉与流水的欢唱。"
  }
},
{
  id: "ending_75_5_1",
  elements: {
    name: "旁白",
    text: "荒芜大地化为碧野，花海随风摇晃，如大地的心脉在律动。"
  }
},
{
  id: "ending_76_5",
  elements: {
    name: "旁白",
    text: "鸟群振翅飞起，在天空描绘自由的弧线；溪流奔腾，水面折射出七彩虹影。"
  }
},
{
  id: "ending_77_5",
  elements: {
    name: "旁白",
    text: "世界向它的爱人揭下了它浩瀚的面具。。它变小了，小如一首歌，小如一个永恒的吻。"
  }
},
{
  id: "ending_78_5",
  elements: {
    name: "旁白",
    text: "在此之前，从未如此清晰地认识到，自己是这个世界的一份子。"
  }
},
{
  id: "ending_79_5",
  elements: {
    name: "旁白",
    text: "隐约间，感到前方有什么在等待着自己。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_79_5-1",
  elements: {
    name: "旁白",
    text: "于是便迈开步子，向一片树林深处走去。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_79_5-2",
  elements: {
    name: "旁白",
    text: "这份直觉在片刻后得到了回应。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_80_5",
  elements: {
     background:"sc4.1/4-1-6.jpg", 
    name: "？？？",
    text: "……"
  }
},
{
  id: "ending_80_5-1",
  elements: { 
    name: "？？？",
    text: "您来了。"
  }
},
{
  id: "ending_81_5",
  elements: {
    name: "旁白",
    text: "淡蓝色眼瞳的少女向自己露出微笑。"
  }
},
{
  id: "ending_81_5-1",
  elements: {
    name: "旁白",
    text: "她倚坐在一颗古树的树荫下，手里捏着一朵刚摘下的金黄色野花。"
  }
},
{
  id: "ending_82_5",
  elements: {
    name: "你",
    text: "光泠。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_83_5",
  elements: {
    name: "光泠",
    text: "太好了，你没有忘记我的名字。",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_83_5-1",
  elements: {
    name: "光泠",
    text: "很高兴，不用再和你说告别了。",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_84_5",
  elements: {
    name: "光泠",
    text: "你的抉择，让世界变成了它本该成为的样子。"
  }
},
{
  id: "ending_84_5-1",
  elements: {
    name: "你",
    text: "......",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_85_5",
  elements: {
    name: "光泠",
    text: "别担心，一切都很美好，不是么？",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_85_5-1",
  elements: {
    name: "光泠",
    text: "这就是美丽新世界啊。"
  }
},
{
  id: "ending_86_5",
  elements: {
    name: "光泠",
    text: "从毁灭中重获新生的世界。"
  }
},
{
  id: "ending_86_5-1",
  elements: {
    name: "光泠",
    text: "还记得在一开始，我与你说过的话吗？"
  }
},
{
  id: "ending_87_5",
  elements: {
    name: "光泠",
    text: "在这个什么也保证不了的世界里，我能保证的唯有一点。",
    sprite:{
        left:"guangling/smile.png",
    }
  }
},
{
  id: "ending_87_5_1",
  elements: {
    name: "光泠",
    text: "不论你的旅途到达了怎样的终点……我都会陪你到最后一刻。",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_88_5",
  elements: {
    name: "你",
    text: "现在已经是‘终点’了吗？",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_89_5",
  elements: {
    name: "光泠",
    text: "……是啊。",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_89_5-1",
  elements: {
    name: "光泠",
    text: "某种意义上，这里就是终点了。",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_89_5-2",
  elements: {
    name: "光泠",
    text: "恭喜你，属于你的旅途结束了。",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_90_5",
  elements: {
    name: "光泠",
    text: "但是，我的使命还没有结束。金色的花……还没能开满世界的每一处。"
  }
},
{
  id: "ending_91_5",
  elements: {
    name: "光泠",
    text: "我想将这代表着‘新生’的花种，撒到目所能及的地方。"
  }
},
{
  id: "ending_92_5",
  elements: {
    name: "光泠",
    text: "我想，你也不愿意就此停下自己的脚步吧？"
  }
},
{
  id: "ending_93_5",
  elements: {
    name: "光泠",
    text: "接下来……你愿意陪我到最后一刻吗？"
  },
  keyNode: true,
  choices: [
    {
      text: "愿意",
      next: "ending_94_5_1"
    },
    {
      text: "不愿意",
      next: "ending_94_5_2"
    }
  ],
},
{
  id: "ending_94_5_1",
  elements: {
    name: "光泠",
    text: "呵呵......我就知道你会这么回答。",
    sprite:{
        left:"guangling/smile1.png",
    }
  },
  next:"ending_95_5",
},
{
  id: "ending_94_5_2",
  elements: {
    name: "光泠",
    text: "呵呵......你如果真的不愿意的话，就不会站在我的面前了。",
    sprite:{
        left:"guangling/smile1.png",
    }
  },
},
{
  id: "ending_95_5",
  elements: {
    name: "光泠",
    text: "这是你所选择的结局，你和我定下的契约。",
    sprite:{
        left:"guangling/smile.png",
    }
  },
},
{
  id: "ending_96_5",
  elements: {
    name: "旁白",
    text: "她站了起来，牵起了自己的手。",
    sprite:{
        left:null,
    }
  },
},
{
  id: "ending_97_5",
  elements: {
    name: "光泠",
    text: "我们会在这个你所期望的世界里，一直旅行下去。",
    sprite:{
        left:"guangling/smile1.png",
    }
  },
},
{
  id: "ending_98_5",
  elements: {
    name: "旁白",
    text: "绝望与虚无被彻底驱散，新的生活即将展开。",
    sprite:{
        left:null,
    }
  },
},
{
  id: "ending_98_5",
  elements: {
    name: "旁白",
    text: "新的契约已然签订，少女将与你一起继续在新世界的旅途。",
    sprite:{
        left:null,
    }
  },
        action: () => {
                let am = AchievementManager.getInstance();
                am.unlockAchievementWithAnimation("ending_5");
              },
  choices: [
    {
      text: "达成结局五！！！(真结局)",
      next: "video_node111",
    },
  ],
},
{
            id: "video_node111",
            elements: {
                name: "旁白",
                text: "播放视频"
            },
            video: "baomu.mp4", // 视频文件应放在 src/assets/video/ 目录下
            next:"video_node22",
        },
        {
            id: "video_node22",
            elements: {
                name: "旁白",
                text: "是否进入无尽模式"
            },
            choices: [
                {
                    text: "是(有成就)",
                    next: "infinite_torture"
                },
                {
                    text: "否",
                    next: "test1"
                }
            ]
        },
        {
            id: "infinite_torture",
            elements: {
                name: "旁白",
                text: "无尽的折磨",
                sprite: {
                    left: null
                }
            },
            game: {
                id: "card_game",
                config: {
                    player: {
                        actionPoints: 5,
                        hp: 31,
                        maxHp: 31,
                        deck: () => {
                            // 返回所有卡牌各3张
                            const allCards: Record<string, number> = {};
                            for (const cardId in CARD_TEMPLATES) {
                                allCards[cardId] = 3;
                            }
                            return allCards;
                        },
                        drawCount: 4,           // 玩家每回合抽4张牌
                        initialDrawCount: 3,     // 玩家开始时抽3张牌
                    },
                    deckSelection: {
                        minDeckSize: 1,   // 设置最小选牌数量
                        maxDeckSize: 100,   // 设置最大选牌数量
                    },
                    opponent: {
                        name:"oiiaioooooiiai",
                        actionPoints: 12,
                        hp: 10000,
                        maxHp: 10000,
                        deck: () => {
                            // 返回所有卡牌各3张
                            const allCards: Record<string, number> = {};
                            for (const cardId in CARD_TEMPLATES) {
                                allCards[cardId] = 3;
                            }
                            return allCards;
                        },
                        drawCount: 4,           // 对手每回合抽4张牌
                        initialDrawCount: 3,     // 对手开始时抽3张牌
                    },
                    backgroundImage: "sc0.1/caidan.png",
                    bgm: "caidan"
                },
                end: [
                    {
                        condition: (gameData: CardGameEventData) => {
                                    if (gameData.opponent.hp <= 9900) {
                                        const am = AchievementManager.getInstance();
                                        am.unlockAchievementWithAnimation("infinite war");
                                    }
                                    return gameData.player.hp  > 0 ;},
                        next: "test1__3"
                    },
                     {
                        condition: (gameData: CardGameEventData) => {
                                    if (gameData.opponent.hp <= 9900) {
                                        const am = AchievementManager.getInstance();
                                        am.unlockAchievementWithAnimation("infinite war");
                                    }
                                    return gameData.player.hp  <= 0 ;},
                        next: "test2__3"
                    },
                ]
            }
        },
         {
            id: "test2__3",
            elements: {
                name: "旁白",
                text: "是否重新挑战？"
            },
            choices: [
                {
                    text: "是",
                    next: "infinite_torture"
                },
                {
                    text: "否（回到终章解锁其他结局）",
                    next: "chapter_0_scene_4_0"
                }
            ]
        },
        {
            id: "test1__3",
            elements: {
                name: "旁白",
                text: "你现在强的离谱！"
            },
            choices: [
                {
                    text: "回到终章解锁其他结局",
                    next: "chapter_0_scene_4_0"
                },
                {
                    text: "退出游戏",
                    next: "test100000000"
                }
            ]
        },
//结局6//
{
  id: "ending_33_6",
  elements: {
     bgm:"bgm27.MP3" ,
    name: "旁白",
    text: "灾厄之主的怒啸消散在风暴与裂痕中，天地间只剩下一片死寂。",
    sprite:{
        left:null,
    }
  },
},
{
  id: "ending_34_6",
  elements: {
     background:"sc4.1/4-1-19.jpg", 
    name: "旁白",
    text: "废墟中央，大地轰然塌陷，露出一条向深处延伸的阶梯。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_35_6",
  elements: {
    name: "光泠",
    text: "走吧，我们离目的地又近一步了。",
    sprite:{
        left:"guangling/smile.png",
    }
  }
},
{
  id: "ending_36_6",
  elements: {
     background:"sc4.1/4-1-8.jpg", 
    name: "旁白",
    text: "走入幽暗的裂口，沿着阶梯向下，深入伸手不见五指的黑暗地底。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_37_6",
  elements: {
    name: "旁白",
    text: "随着脚步深入，墙壁上浮现出古老的浮雕，刻画着无数生灭轮回的场景——"
  }
},
{
  id: "ending_37_6_1",
  elements: {
    name: "旁白",
    text: "火焰焚城，洪水覆世，又有繁花重生、黎明再起。"
  }
},
{
  id: "ending_38_6",
  elements: {
    name: "旁白",
    text: "地底的尽头，是一个被厚重的时间封闭于此的洞窟。"
  }
},
{
  id: "ending_39_6",
  elements: {
    name: "旁白",
    text: "一点幽光在洞窟尽头常亮。此刻心中已然清楚，那就是灾厄的胚胎，是制造混乱的始作俑者。"
  }
},
{
  id: "ending_40_6",
  elements: {
    name: "旁白",
    text: "破碎的光影收拢成一束——厄愿的轮回也即将停止……",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_41_6",
  elements: {
    name: "光泠",
    text: "触碰它吧。如此一来，你和我的使命也就达成了。",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_42_6",
  elements: {
    name: "你",
    text: "但我还没有知道世界的真相。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_43_6",
  elements: {
    name: "光泠",
    text: "世界的真相……？这个世界没有所谓的真相，有的只是无意义的挣扎。",
    sprite:{
        left:"guangling/wubiaoqing.png",
    }
  }
},
{
  id: "ending_44_6",
  elements: {
    name: "你",
    text: "我不那么认为。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_45_6",
  elements: {
    name: "旁白",
    text: "将关键之物轻握在手中，从手心里传来的异样感似乎在诉说着另一个故事。"
  }
},
{
  id: "ending_46_6",
  elements: {
    name: "旁白",
    text: "心里清楚光泠所说的并非事实，而现在的自己，已经具备了踏入更深处的资格。"
  }
},
{
  id: "ending_47_6",
  elements: {
    name: "你",
    text: "我要继续前进。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_48_6",
  elements: {
    name: "光泠",
    text: "......你？",
    sprite:{
        left:"guangling/wubiaoqing.png",
    }
  }
},
{
  id: "ending_49_6",
  elements: {
     background:"sc4.1/4-1-19.jpg", 
    name: "旁白",
    text: "越过光泠，在黑暗的更深处伸出双手。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_49_6_1",
  elements: {
    name: "旁白",
    text: "关键之物散发出强烈的光芒，刺眼到仿佛要将整个世界照亮。"
  }
},
{
  id: "ending_50_6",
  elements: {
    name: "旁白",
    text: "当你再度睁开眼时，已经身处在一个不同的世界。"
  }
},
{
  id: "ending_51_6",
  elements: {
     background:"sc4.1/4-1-18.jpg", 
    name: "旁白",
    text: "模糊的色块逐渐凝聚成型，眨了眨眼，让温热的液体顺着脸颊流下。"
  }
},
{
  id: "ending_51_6_1",
  elements: {
    bgm:"bgm22.MP3" ,
    name: "旁白",
    text: "喉咙收缩，发出无意义的呢喃。"
  }
},
{
  id: "ending_52_6",
  elements: {
    name: "医护人员",
    text: "你醒了。"
  }
},
{
  id: "ending_53_6",
  elements: {
    name: "旁白",
    text: "嘈杂的声音逐一钻进自己的耳畔，一点一点累积起所感受到的世界。"
  }
},
{
  id: "ending_54_6",
  elements: {
    name: "你",
    text: "这里是......？"
  }
},
{
  id: "ending_55_6",
  elements: {
    name: "医护人员",
    text: "临时医护点，你看上去恢复得不错？看来感染程度还不算深。"
  }
},
{
  id: "ending_56_6",
  elements: {
    name: "医护人员",
    text: "半小时后再注射一管血清，看看身体状况怎么样，没问题的话，过两天就能下地了。"
  }
},
{
  id: "ending_57_6",
  elements: {
    name: "你",
    text: "等等......发生了什么？",
    sprite: {
            left: null,
        }
  }
},
{
  id: "ending_58_6",
  elements: {
    name: "医护人员",
    text: "怎么了？难道你想不起来你是谁了？",
    sprite: {
            left: "NPC/doctor.png",
        }
  }
},
{
  id: "ending_59_6",
  elements: {
    name: "医护人员",
    text: "奇怪，应该没有过这种症状先例才对。"
  }
},
{
  id: "ending_60_6",
  elements: {
    name: "医护人员",
    text: "不过，之前也听说过，有的人在感染过病毒后，即使救了回来，性情也会大变......？"
  }
},
{
  id: "ending_61_6",
  elements: {
    name: "你",
    text: "病毒？",
    sprite: {
            left: null,
        }
  }
},
{
  id: "ending_62_6",
  elements: {
    name: "旁白",
    text: "像是触碰到了某个开关，记忆开始重新恢复活性。"
  }
},
{
  id: "ending_63_6",
  elements: {
    name: "你",
    text: "我是......感染了病毒？",
    sprite: {
            left: null,
        }
  }
},
{
  id: "ending_64_6",
  elements: {
    name: "医护人员",
    text: "哦？看来回过神来了？",
    sprite: {
            left: "NPC/doctor.png",
        }
  }
},
{
  id: "ending_65_6",
  elements: {
    name: "医护人员",
    text: "据说有人能在感染后看到很多不可思议的景象，你刚恢复意识，也许只是记忆有些混乱。"
  }
},
{
  id: "ending_66_6",
  elements: {
    name: "医护人员",
    text: "过段时间，应该自己就会好了。"
  }
},
{
  id: "ending_67_6",
  elements: {
    name: "旁白",
    text: "医护人员说完，便离开了。",
    sprite: {
            left: null,
        }
  }
},
{
  id: "ending_68_6",
  elements: {
    name: "旁白",
    text: "抱着脑袋，让自己的心绪沉静下来。"
  }
},
{
  id: "ending_69_6",
  elements: {
    name: "旁白",
    text: "床头边放着一个已经破的不成样子的单肩挎包，那里面放着的似乎是自己的东西。"
  }
},
{
  id: "ending_70_6",
  elements: {
    name: "旁白",
    text: "仔细翻找之后，才发现东西少的可怜——"
  }
},
{
  id: "ending_70_6_1",
  elements: {
    name: "旁白",
    text: "几罐接近发霉的压缩饼干、半卷绷带、用完的酒精瓶、一管钢笔、墨水瓶。"
  }
},
{
  id: "ending_70_6_2",
  elements: {
    name: "旁白",
    text: "以及......成叠的稿纸。"
  }
},
{
  id: "ending_71_6",
  elements: {
    name: "旁白",
    text: "那是一卷未写完的小说，也是自己坚持创作了多年的故事。"
  }
},
{
  id: "ending_72_6",
  elements: {
    name: "旁白",
    text: "后启示录的世界观，莫名出现的灾难，遗失的上古力量，前往深渊的旅途......"
  }
},
{
  id: "ending_73_6",
  elements: {
    name: "旁白",
    text: "无所谓的废话和故作高深的用词也是出于自己的老毛病。"
  }
},
{
  id: "ending_73_6_1",
  elements: {
    name: "旁白",
    text: "正因如此，还没有除自己外的第二个读者能耐心看完这部小说。"
  }
},
{
  id: "ending_74_6",
  elements: {
    name: "旁白",
    text: "在翻阅这些稿纸的同时，记忆也愈发清晰起来。"
  }
},
{
  id: "ending_75_6",
  elements: {
    name: "你",
    text: "所以......那是梦吗？"
  }
},
{
  id: "ending_76_6",
  elements: {
    name: "旁白",
    text: "说实话，自己几乎已经记不起有关那场旅途的任何事了。"
  }
},
{
  id: "ending_77_6",
  elements: {
    name: "旁白",
    text: "就如同真正的，醒来就会忘却的梦一般。"
  }
},
{
  id: "ending_78_6",
  elements: {
    name: "你",
    text: "还好，稿子没事就行。"
  }
},
{
  id: "ending_79_6",
  elements: {
    name: "旁白",
    text: "自己并非作家，或者说，目前的地面上也不需要作家。"
  }
},
{
  id: "ending_80_6",
  elements: {
    name: "旁白",
    text: "创作仅仅是个持续了很多年的爱好，哪怕只是没有才能之人的自娱自乐，自己也始终不想放弃。"
  }
},
{
  id: "ending_81_6",
  elements: {
    name: "？？？",
    text: "但是，如此便好吗？"
  }
},
{
  id: "ending_82_6",
  elements: {
    name: "？？？",
    text: "你不渴望有人阅读你的故事，感受你的所想吗？"
  }
},
{
  id: "ending_83_6",
  elements: {
    name: "？？？",
    text: "你不渴望，拥有一个真正能欣赏自己的人吗？"
  }
},
{
  id: "ending_84_6",
  elements: {
    name: "旁白",
    text: "脑海深处似乎残存这一股声音。"
  }
},
{
  id: "ending_85_6",
  elements: {
    name: "你",
    text: "......？"
  }
},
{
  id: "ending_86_6",
  elements: {
    name: "医护人员",
    text: "你没事吧？怎么昏昏沉沉的？"
  }
},
{
  id: "ending_87_6",
  elements: {
    name: "旁白",
    text: "之前交谈过的医护人员正好折返回来，注意到了自己的恍惚。",
    sprite: {
            left: null,
        }
  }
},
{
  id: "ending_88_6",
  elements: {
    name: "医护人员",
    text: "是不是太久没摄取营养了？你等着，我去看看还有没有没用完的葡萄糖，可以给你吊一小瓶。",
    sprite: {
            left: "NPC/doctor.png",
        }
  }
},
{
  id: "ending_89_6",
  elements: {
    name: "你",
    text: "不用了，我没......",
    sprite: {
            left: null,
        }
  }
},
{
  id: "ending_90_6",
  elements: {
    name: "旁白",
    text: "没等自己说完，那名医护人员就已经火急火燎地到别处去了。"
  }
},
{
  id: "ending_91_6",
  elements: {
    name: "旁白",
    text: "垂下半举起的手，重新审视摊在自己床上的那叠稿纸。"
  }
},
{
  id: "ending_92_6",
  elements: {
    name: "你",
    text: "读者么？"
  }
},
{
  id: "ending_93_6",
  elements: {
    name: "你",
    text: "不把故事改的更有趣些的话......"
  }
},
{
  id: "ending_94_6",
  elements: {
    name: "旁白",
    text: "旋开钢笔的笔帽，拿出一张空白的稿纸，开始书写。"
  }
},
{
  id: "ending_95_6",
  elements: {
    name: "旁白",
    text: "失去记忆的主角在陌生的废墟中苏醒，被告知自己是唯一能阻止灾厄的命定之人。"
  }
},
{
  id: "ending_96_6",
  elements: {
    name: "旁白",
    text: "在几十上百年就已经被无数作品沿用过的老掉牙设定，也不知道自己为什么会这么喜欢。"
  }
},
{
  id: "ending_97_6",
  elements: {
    name: "旁白",
    text: "突然，像是有一朵水花在心中溅起似的——莫名的灵感开始躁动。"
  }
},
{
  id: "ending_98_6",
  elements: {
    name: "旁白",
    text: "一个人踏上旅途的主人公，未免也太孤独了。"
  }
},
{
  id: "ending_99_6",
  elements: {
    name: "旁白",
    text: "他需要有人支撑，需要有人理解。"
  }
},
{
  id: "ending_100_6",
  elements: {
    name: "旁白",
    text: "他需要能引导他走上正确道路的人，需要知心的同伴。"
  }
},
{
  id: "ending_101_6",
  elements: {
    name: "你",
    text: "那么，似乎得新加一个角色。"
  }
},
{
  id: "ending_102_6",
  elements: {
    name: "？？？",
    text: "世界需要您这样的人去阻止灾厄。"
  }
},
{
  id: "ending_103_6",
  elements: {
    name: "？？？",
    text: "所以，我在等着您醒来。"
  }
},
{
  id: "ending_104_6",
  elements: {
    name: "？？？",
    text: "机械之城的王，唯有打倒他才能前进……"
  }
},
{
  id: "ending_105_6",
  elements: {
    name: "？？？",
    text: "……旅途的终点，就在前方。"
  }
},
{
  id: "ending_106_6",
  elements: {
    name: "？？？",
    text: "这样一来，你和我的使命就结束了……"
  }
},
{
  id: "ending_106_6-1",
  elements: {
    name: "旁白",
    text: "那得是一个一直关心着主人公，却有略带神秘感的少女。"
  }
},
{
  id: "ending_107_6",
  elements: {
    name: "？？？",
    text: "作为唯一理解你的存在。"
  }
},
{
  id: "ending_108_6",
  elements: {
    name: "？？？",
    text: "我会一直等着你归来。"
  }
},
{
  id: "ending_109_6",
  elements: {
    name: "你",
    text: "这个角色就叫做......"
  }
},
{
  id: "ending_110_6",
  elements: {
    name: "旁白",
    text: "没由来的，一个名字突然窜到自己的脑海中。"
  },
  choices: [
    {
      text: "“光泠”吧。",
      next: "ending_111_6"
    }
  ]
},
{
  id: "ending_111_6",
  elements: {
    name: "旁白",
    text: "孤独的主人公，需要新的同伴——那么，请为他的故事再添一笔吧。"
  },
        action: () => {
                // 检查玩家是否拥有始源之心和永昼之瞳的成就以及终焉之泪的卡牌
                const achievementManager = AchievementManager.getInstance();
                const hasHeartOfPrime = achievementManager.isUnlocked("item_heart_of_prime");  // 始源之心
                const hasEyeOfEternalSun = achievementManager.isUnlocked("item_eye_of_eternal_sun");  // 永昼之瞳
                const bagManager = BagManager.getInstance();
                const hasTearOfTerminus = bagManager.hasCard("end_tears");  // 终焉之泪卡牌
                // 只有拥有始源之心和永昼之瞳的成就以及终焉之泪的卡牌才解锁成就
                if (hasHeartOfPrime && hasEyeOfEternalSun && hasTearOfTerminus) {
                  let am = AchievementManager.getInstance();
                  am.unlockAchievementWithAnimation("ending_6");
                }
                if (!hasHeartOfPrime || !hasEyeOfEternalSun || !hasTearOfTerminus) {
                  let am = AchievementManager.getInstance();
                  am.unlockAchievementWithAnimation("hidden ending");
                }
              },
  choices: [
    {
        text: "达成结局六！！",
        next: "chapter_0_scene_0",
        condition: () => {
          // 检查玩家是否拥有始源之心和永昼之瞳的成就以及终焉之泪的卡牌
          const achievementManager = AchievementManager.getInstance();
          const hasHeartOfPrime = achievementManager.isUnlocked("item_heart_of_prime");  // 始源之心
          const hasEyeOfEternalSun = achievementManager.isUnlocked("item_eye_of_eternal_sun");  // 永昼之瞳
          const bagManager = BagManager.getInstance();
          const hasTearOfTerminus = bagManager.hasCard("end_tears");  // 终焉之泪卡牌
          // 只有拥有始源之心和永昼之瞳的成就以及终焉之泪的卡牌才显示此选项
          return hasHeartOfPrime && hasEyeOfEternalSun && hasTearOfTerminus;
        }
    },
    {
        text: "达成隐藏成就！！",
        next: "chapter_0_scene_0",
        condition: () => {
          // 检查玩家是否拥有始源之心和永昼之瞳的成就以及终焉之泪的卡牌
          const achievementManager = AchievementManager.getInstance();
          const hasHeartOfPrime = achievementManager.isUnlocked("item_heart_of_prime");  // 始源之心
          const hasEyeOfEternalSun = achievementManager.isUnlocked("item_eye_of_eternal_sun");  // 永昼之瞳
          const bagManager = BagManager.getInstance();
          const hasTearOfTerminus = bagManager.hasCard("end_tears");  // 终焉之泪卡牌
          // 除非未获得始源之心或永昼之瞳的成就或终焉之泪的卡牌才显示此选项
          return !hasHeartOfPrime || !hasEyeOfEternalSun || !hasTearOfTerminus;
        }
     },
  ],
},
//结局7//
{
  id: "ending_33_7",
  elements: {
   background:"sc4.1/4-1-10.jpg", 
    bgm:"bgm17.MP3" , 
   name: "旁白",
    text: "漆黑的火焰燃烧在废墟之上，天地的裂痕不断扩大，宛如整个世界都在坠落。",
    sprite:{
        left:null,
    }
  },
},
{
  id: "ending_34_7",
  elements: {
    name: "旁白",
    text: "灾厄之主伫立在破碎的天穹之下，身躯比群山更庞大，面孔在骷髅与虚无之间变幻。",
  }
},
{
  id: "ending_35_7",
  elements: {
    name: "你",
    text: "真的，到此为止了吗......",
  }
},
{
  id: "ending_36_7",
  elements: {
    name: "旁白",
    text: "奄奄一息地倒在废墟之上，眼前是不断崩毁的天地，还有那可怕的敌人。",
  }
},
{
  id: "ending_37_7",
  elements: {
    name: "你",
    text: "啊......还没有......到达胜利的彼岸......",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_38_7",
  elements: {
    name: "光泠",
    text: "如果你也和我一样期盼着世界跨越寒冬，迎来暖春的那一天......",
    sprite:{
        left:"guangling/down.png",
    }
  }
},
{
  id: "ending_38_7_1",
  elements: {
    name: "光泠",
    text: "能不能和我做个约定？嗯，我希望那个未来里有你。",
  }
},
{
  id: "ending_39_7",
  elements: {
    name: "旁白",
    text: "——此时此刻，脑海中却不自觉地回想起了光泠的话语。",
    sprite: {
      left: null
    }
  }
},
{
  id: "ending_40_7",
  elements: {
    name: "光泠",
    text: "在您为世界带来晨曦之前，这漫长的黑夜，还请让我陪您度过。",
    sprite:{
        left:"guangling/down.png",
    }
  }
},
{
  id: "ending_41_7",
  elements: {
    name: "旁白",
    text: "——还记得在刚与光泠相识时，她会这样安慰自己。",
    sprite: {
      left: null
    }
  }
},
{
  id: "ending_42_7",
  elements: {
    name: "你",
    text: "真令人怀念啊......",
    sprite: {
      left: null
    }
  }
},
{
  id: "ending_42_7-1",
  elements: {
    name: "你",
    text: "只可惜.....已经......",
    sprite: {
      left: null
    }
  }
},
{
  id: "ending_42_7-2",
  elements: {
    name: "旁白",
    text: "已经没有力气去回忆了。",
    sprite: {
      left: null
    }
  }
},
{
  id: "ending_43_7",
  elements: {
    name: "旁白",
    text: "生机在不断地流逝。",
    sprite: {
      left: null
    }
  }
},
{
  id: "ending_44_7",
  elements: {
    background:"sc3.1/3-1-11.jpg", 
    name: "旁白",
    text: "在某一刻，生命的火花悄然熄灭。",
    sprite: {
      left: null
    }
  }
},
{
  id: "ending_44_7-1",
  elements: {
    name: "旁白",
    text: "……",
    sprite: {
      left: null
    }
  }
},
{
  id: "ending_45_7",
  elements: {
    name: "旁白",
    text: "死亡或许是解除生命牵绊最温柔的一种方式。",
  },
},
{
  id: "ending_46_7",
  elements: {
    name: "旁白",
    text: "YOU ARE DEAD!",
      sprite: {
      left: null
    }
  },
      action: () => {
                let am = AchievementManager.getInstance();
                am.unlockAchievementWithAnimation("death_ending");
              },
  choices: [
    {
      text: "死亡结局",
      next: "chapter_0_scene_0",
    }
  ]
},
//结局八，九的选择//
{
  id: "ending_33_8",
  elements: {
    background:"sc4.1/4-1-20.jpg", 
    name: "旁白",
    text: "漆黑的火焰燃烧在废墟之上，天地的裂痕不断扩大，宛如整个世界都在坠落。",
    sprite: {
      left: null,
    }
  },
},
{
  id: "ending_34_8",
  elements: {
    name: "旁白",
    text: "灾厄之主伫立在破碎的天穹之下，身躯比群山更庞大，面孔在骷髅与虚无之间变幻。"
  }
},
{
  id: "ending_35_8",
  elements: {
    name: "旁白",
    text: "战斗的终局，是绝望的深渊。"
  }
},
{
  id: "ending_36_8",
  elements: {
    name: "旁白",
    text: "身躯摇摇欲坠，暗寂在战斗中被损坏，碎片纹路中的金色微光也已暗淡。"
  }
},
{
  id: "ending_37_8",
  elements: {
    name: "旁白",
    text: "而灾厄之主却依旧屹立，祂的黑影笼罩了整个世界。"
  }
},
{
  id: "ending_38_8",
  elements: {
    name: "旁白",
    text: "如同时间到达了尽头般，黑暗吞没了天地。"
  }
},
{
  id: "ending_39_8",
  elements: {
    name: "你",
    text: "到此为止了吗？"
  }
},
{
  id: "ending_40_8",
  elements: {
    name: "旁白",
    text: "大地的震颤，狂风的咆哮，天穹的崩裂，不断延续的灾厄宣告着我们的失败。"
  }
},
{
  id: "ending_41_8",
  elements: {
    name: "旁白",
    text: "现在正是一夜中最阴森的时刻，鬼魂都在此刻从坟墓里出来，地狱也要向人世吐放疠气。",
    sprite: {
            left: null,
        }
  }
},
{
  id: "ending_42_8",
  elements: {
    name: "？？？",
    text: "你的人生就是一台戏剧，现在正是终幕的时刻了。",
    sprite: {
            left: "NPC/zaie.png",
        }
  }
},
{
  id: "ending_43_8",
  elements: {
    name: "？？？",
    text: "看清世界的真相吧，接受这命运的终局，这戏剧的落幕。"
  }
},
{
  id: "ending_44_8",
  elements: {
    name: "旁白",
    text: "熟悉的声音回荡在耳边，那正是无脸人毫无生机的刺耳之声。",
    sprite: {
            left: null,
        }
  }
},
{
  id: "ending_45_8",
  elements: {
    name: "旁白",
    text: "默然忍受命运暴虐的毒箭，或者挺身反抗人世间无涯的苦难，哪种行为更高贵呢？"
  }
},
{
  id: "ending_46_8",
  elements: {
    name: "旁白",
    text: "生存还是毁灭？这是一个值得考虑的问题。"
  }
},
{
  id: "ending_47_8",
  elements: {
    name: "你",
    text: "我要扼住命运的咽喉。"
  }
},
{
  id: "ending_48_8",
  elements: {
    name: "我",
    text: "我要斩断苦难的枷锁。"
  },
  keyNode: true,
  choices: [
    {
      text: "我要终结世界的厄难！",
      next: "ending_49_8"
    },
    {
      text: "我要与身边之人永不分离！",
      next: "ending_49_9"
    }
  ]
},
//结局八//
{
  id: "ending_49_8",
  elements: {
     bgm:"bgm21.MP3" ,
    name: "旁白",
    text: "天地间回荡着灾厄之主的嚎叫，似是在讥笑我们的意志孱弱不堪。",
  }
},
{
  id: "ending_50_8",
  elements: {
    name: "旁白",
    text: "灾厄之主缓缓露出胸口的黑焰，刹那间漫天的黑雾化作锁链，将我们牢牢束缚。"
  }
},
{
  id: "ending_51_8",
  elements: {
    name: "你",
    text: "就算如此......"
  }
},
{
  id: "ending_52_8",
  elements: {
    name: "旁白",
    text: "拼尽全力，提起手中的暗寂，化为一面残破的黑色盾牌，蹒跚着走向灾厄之主。"
  }
},
{
  id: "ending_53_8",
  elements: {
    name: "你",
    text: "也要战斗到最后一刻......"
  }
},
{
  id: "ending_54_8",
  elements: {
    name: "旁白",
    text: "下一刻，漆黑的火焰倾泻而下，吞没了眼前的一切。"
  }
},
{
  id: "ending_55_8",
  elements: {
    name: "旁白",
    text: "然而——"
  }
},
{
  id: "ending_55_8-1",
  elements: {
    name: "旁白",
    text: "想象中被这黑焰焚烧殆尽的情景并没有出现。"
  }
},
{
  id: "ending_56_8",
  elements: {
    name: "你",
    text: "为什么？"
  }
},
{
  id: "ending_57_8",
  elements: {
    name: "旁白",
    text: "黑焰渐渐散去，在飞扬的烟尘中，才发现身前的闪烁着快要熄灭的光屏。"
  }
},
{
  id: "ending_58_8",
  elements: {
    name: "旁白",
    text: "是光泠，为自己挡下了这毁灭性的一击。"
  }
},
{
  id: "ending_59_8",
  elements: {
    name: "旁白",
    text: "但此刻内心中却并没有劫后余生的庆幸，反而涌上一种不妙的预感。"
  }
},
{
  id: "ending_60_8",
  elements: {
    name: "你",
    text: "......难道说？"
  }
},
{
  id: "ending_61_8",
  elements: {
    name: "旁白",
    text: "抬头望去，光泠站在前方，与灾厄之主对峙着。"
  }
},
{
  id: "ending_62_8",
  elements: {
    background:"sc4.1/4-1-13.jpg", 
    name: "旁白",
    text: "突然发现，光泠的周围，乃至灾厄之主——被一片白光笼罩的地方——都陷入了一种冻结的状态。"
  }
},
{
  id: "ending_63_8",
  elements: {
    name: "旁白",
    text: "而这片白光，就是光泠最后的力量了。"
  }
},
{
  id: "ending_64_8",
  elements: {
    name: "旁白",
    text: "灾厄之主发出了尖锐的叫声，躯体也因接触到纯白之光而产生了溃烂。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_65_8",
  elements: {
    name: "光泠",
    text: "啊......不要......再伤害他了......",
    sprite:{
        left:"guangling/wubiaoqing.png",
    }
  }
},
{
  id: "ending_66_8",
  elements: {
    name: "旁白",
    text: "为了对抗灾厄，她已经用尽了全力。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_67_8",
  elements: {
    name: "你",
    text: "为什么......做到这种地步......",
    sprite:{
        left:null,
    }
  },
},
{
  id: "ending_67_8_1",
  elements: {
    name: "你",
    text: "就算我死了，你也能活下去的吧。"
  }
},
{
  id: "ending_68_8",
  elements: {
    name: "你",
    text: "我早就察觉到了，你并不是，像我一样脆弱的存在。",
sprite:{
        left:null,
    }
  }
},
{
  id: "ending_69_8",
  elements: {
    name: "光泠",
    text: "为什么呢？",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_69_8-1",
  elements: {
    name: "光泠",
    text: "也许我自己也不知道。",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_69_8-2",
  elements: {
    name: "光泠",
    text: "只是身体不自觉地行动起来了。",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_70_8",
  elements: {
    name: "旁白",
    text: "灾厄之主咆哮着，妄图进行最后的反扑。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_71_8",
  elements: {
    name: "光泠",
    text: "......绝对不允许！",
    sprite:{
        left:"guangling/wubiaoqing.png",
    }
  }
},
{
  id: "ending_72_8",
  elements: {
    name: "旁白",
    text: "一道纯白光线从天而降，击穿了灾厄之主的头颅。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_73_8",
  elements: {
     bgm:"bgm24.MP3" ,
    name: "光泠",
    text: "在此被燃烧殆尽吧！世界的希望，将在灾厄的灰烬中重生！",
    sprite:{
        left:"guangling/wubiaoqing.png",
    }
  }
},
{
  id: "ending_74_8",
  elements: {
    background:"sc4.1/4-1-9.jpg", 
    name: "旁白",
    text: "如同太阳坠落在此处，光环从她的身体中爆裂开来！",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_75_8",
  elements: {
    name: "光泠",
    text: "在曙光到来之前点燃篝火吧！只要能驱散此刻流没大地的黑暗，将我的一切燃尽也无妨。",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_76_8",
  elements: {
    name: "旁白",
    text: "耀眼的白光在那一刻遮蔽了双目。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_77_8",
  elements: {
    name: "你",
    text: "那种事情......不要啊！"
  }
},
{
  id: "ending_78_8",
  elements: {
    name: "旁白",
    text: "在身心的双重折磨之下，脑海中回忆涌起。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_79_8",
  elements: {
    name: "光泠",
    text: "在您为世界带来晨曦之前，这漫长的黑夜，还请让我陪您度过。",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_80_8",
  elements: {
    name: "光泠",
    text: "能将夜空点亮的繁星很美，如同末世中的生命一般，在黑暗中熠熠生辉。"
  }
},
{
  id: "ending_80_8_1",
  elements: {
    name: "光泠",
    text: "所以我绝不希望看到死寂的天空与大地。"
  }
},
{
  id: "ending_81_8",
  elements: {
    name: "光泠",
    text: "这个世界上有很多压倒性的力量，但它们却从未真正掌握在任何人手中。"
  }
},
{
  id: "ending_81_8_1",
  elements: {
    name: "光泠",
    text: "不要畏惧强大的敌人，认为他们不可战胜。也不要轻视渺小之物，认为他们无足轻重。"
  }
},
{
  id: "ending_82_8",
  elements: {
    name: "光泠",
    text: "如果你也和我一样期盼着世界跨越寒冬，迎来暖春的那一天......"
  }
},
{
  id: "ending_82_8_1",
  elements: {
    name: "光泠",
    text: "能不能和我做个约定？嗯，我希望那个未来里有你。"
  }
},
{
  id: "ending_83_8",
  elements: {
    name: "光泠",
    text: "无论发生了什么，无论身处何处。"
  }
},
{
  id: "ending_83_8_1",
  elements: {
    name: "光泠",
    text: "我都不会忘记和你在一起的时间，这些记忆早就构成了我灵魂的一部分。"
  }
},
{
  id: "ending_84_8",
  elements: {
    name: "光泠",
    text: "人会因爱着人而变得软弱。但这不可耻，因为那不是真正的软弱。"
  }
},
{
  id: "ending_85_8",
  elements: {
    name: "光泠",
    text: "再多和我说一些话吧，无论是什么，我都愿意听。"
  }
},
{
  id: "ending_85_8-2",
  elements: {
    name: "光泠",
    text: "可以握住的手，千万别放开了呢。"
  }
},
{
  id: "ending_86_8",
  elements: {
    name: "旁白",
    text: "她的梦.",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_86_8-1",
  elements: {
    name: "旁白",
    text: "她的心。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_86_8-2",
  elements: {
    name: "旁白",
    text: "她的情。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_86_8-3",
  elements: {
    name: "旁白",
    text: "她的一切。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_86_8-4",
  elements: {
    name: "旁白",
    text: "一幕幕画面在脑中闪过，泪水无声地滴落。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_87_8",
  elements: {
    name: "旁白",
    text: "灾厄之主仍在怒吼。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_88_8",
  elements: {
    name: "光泠",
    text: "溶解于光，消散于光！",
    sprite:{
        left:"guangling/wubiaoqing.png",
    }
  }
},
{
  id: "ending_89_8",
  elements: {
    name: "旁白",
    text: "光泠张开双臂，光从她的身躯中奔涌而出，像一颗燃烧的星辰。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_89_8_1",
  elements: {
    name: "旁白",
    text: "那是灵魂的彻底献祭，以此撕开一条通向彼岸的渡口。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_90_8",
  elements: {
    name: "旁白",
    text: "就在这片混乱无序中，始源之心、永昼之瞳、终焉之泪三样关键之物结合在一起。"
  }
},
{
  id: "ending_90_8_1",
  elements: {
    name: "旁白",
    text: "焕发出一种创造的伟力，笼罩了整个残破的世界。"
  }
},
{
  id: "ending_91_8",
  elements: {
    name: "旁白",
    text: "刹那间，世界开始颤动——黑暗与光辉纠缠、撕裂，像两条古老的河流汇入同一处深渊。"
  }
},
{
  id: "ending_92_8",
  elements: {
    name: "旁白",
    text: "不是大地，不是天空，而是来自时间！"
  }
},
{
  id: "ending_93_8",
  elements: {
    name: "旁白",
    text: "时间，开始加速了。"
  }
},
{
  id: "ending_94_8",
  elements: {
    background:"sc4.1/4-1-14.jpg", 
    name: "旁白",
    text: "昼夜交替如风卷云涌，四季如页纸般翻飞，生与死在一瞬间彼此重叠。"
  }
},
{
  id: "ending_95_8",
  elements: {
    name: "旁白",
    text: "时光飞逝，把旧世界压缩成一息之间的幻影。"
  }
},
{
  id: "ending_96_8",
  elements: {
    background:"sc4.1/4-1-9.jpg", 
    name: "旁白",
    text: "光泠与灾厄之主的身影在加速的时间中消散，化作旧世最后一片涟漪。"
  }
},
{
  id: "ending_97_8",
  elements: {
    name: "旁白",
    text: "想要在时流中呼喊，却只有风声的轰鸣回应。"
  }
},
{
  id: "ending_98_8",
  elements: {
    background:"sc4.1/4-1-21.jpg", 
    name: "旁白",
    text: "下一刻，被光潮裹挟着推向前方，瞬息之间穿越过崩塌的废墟与扭曲的时空。"
  }
},
{
  id: "ending_98_8-1",
  elements: {
    name: "旁白",
    text: "……"
  }
},
{
  id: "ending_99_8",
  elements: {
    name: "旁白",
    text: "照亮黑暗，如梦似幻，涨满着哀伤的人们展开明亮的翅膀；"
  }
},
{
  id: "ending_100_8",
  elements: {
    name: "旁白",
    text: "出现在每个人心中，入夜就生，天亮即死；"
  }
},
{
  id: "ending_101_8",
  elements: {
    name: "旁白",
    text: "世人苦苦哀求，渴望得到的东西。"
  }
},
{
  id: "ending_102_8",
  elements: {
    name: "旁白",
    text: "——是什么呢？"
  }
},
{
  id: "ending_103_8",
  elements: {
    name: "旁白",
    text: "......"
  }
},
{
  id: "ending_104_8",
  elements: {
    name: "你",
    text: "......这样就结束了......吗？"
  }
},
{
  id: "ending_105_8",
  elements: {
    name: "旁白",
    text: "救世者渡厄，灾厄已消亡。"
  }
},
{
  id: "ending_106_8",
  elements: {
    name: "旁白",
    text: "灾厄摧毁了人们过往之日，却给人们的未来之日加上荣光。"
  }
},
{
  id: "ending_107_8",
  elements: {
    name: "旁白",
    text: "在这个崭新的世界里，人们会在欢庆中相拥、落泪，人们传唱着同一首希望的歌谣。"
  }
},
{
  id: "ending_108_8",
  elements: {
    name: "旁白",
    text: "歌谣里诅咒中永不绽放的花朵漫山遍野摇曳，雨水带着暖意涓涓落下，却不再夹带着风暴。"
  }
},
{
  id: "ending_109_8",
  elements: {
    name: "旁白",
    text: "只是，风再也不会拂过某位少女的脸庞。"
  }
},
{
  id: "ending_110_8",
  elements: {
background:"sc4.1/4-1-25.jpg", 
    name: "旁白",
    text: "旭日初升，照耀眼前所见的万物，湖面波光粼粼，山峦光明而壮美。"
  }
},
{
  id: "ending_111_8",
  elements: {
    name: "旁白",
    text: "孤独的行者越过了山川，路过了湖泊。"
  }
},
{
  id: "ending_112_8",
  elements: {
    name: "旁白",
    text: "行者行走在大地之上。"
  }
},
{
  id: "ending_113_8",
  elements: {
    name: "旁白",
    text: "他以双脚踏遍，以双眼见证。"
  }
},
{
  id: "ending_114_8",
  elements: {
    name: "旁白",
    text: "他看到种满谷物的膏田，羊群游息的茂草山坡；"
  }
},
{
  id: "ending_115_8",
  elements: {
    name: "旁白",
    text: "他看到了覆盖刍草的平原，生长繁花的堤岸；"
  }
},
{
  id: "ending_116_8",
  elements: {
    name: "旁白",
    text: "他看到了涌潮浪漫的海滨，风雨后的虹霞。"
  }
},
{
  id: "ending_117_8",
  elements: {
    name: "旁白",
    text: "他看到了世间一切伟大而浪漫的奇景。"
  }
},
{
  id: "ending_118_8",
  elements: {
    name: "旁白",
    text: "在新生的世界中，行者行走在生机勃勃的大地之上。"
  }
},
{
  id: "ending_119_8",
  elements: {
    name: "旁白",
    text: "最后一丝暮色黯淡下去，第一颗星开始闪耀，星轨轮转，斗转星移，天空之城流光溢彩。"
  }
},
{
  id: "ending_120_8",
  elements: {
    name: "旁白",
    text: "脚步在此驻足，群集的飞鸟振翅而来，久久盘旋不落。"
  }
},
{
  id: "ending_120_8_1",
  elements: {
    name: "旁白",
    text: "行者置身于金色的花海之中，一切如梦幻般。"
  }
},
{
  id: "ending_121_8",
  elements: {
    name: "旁白",
    text: "天空明明如此高远，夜幕却细腻而温柔，仿佛伸手可触。"
  }
},
{
  id: "ending_122_8",
  elements: {
    name: "旁白",
    text: "一路所见种种奇景皆是奇迹。"
  }
},
{
  id: "ending_123_8",
  elements: {
    name: "旁白",
    text: "内心酸涩而满足，非常奇妙......且久违的感觉。"
  }
},
{
  id: "ending_124_8",
  elements: {
    name: "旁白",
    text: "那份奇异的感觉牢牢地攀附着他，促使着他想要倾吐，想要诉说，想要分享此刻种种。"
  }
},
{
  id: "ending_125_8",
  elements: {
    name: "旁白",
    text: "而环视四野，茫茫大地，空寂无人。"
  }
},
{
  id: "ending_126_8",
  elements: {
    name: "旁白",
    text: "他希望有谁在这里吗？"
  }
},
{
  id: "ending_127_8",
  elements: {
    name: "旁白",
    text: "他想要和谁细细诉说呢？"
  }
},
{
  id: "ending_128_8",
  elements: {
    name: "旁白",
    text: "他想要向谁娓娓道来这一切呢？"
  }
},
{
  id: "ending_129_8",
  elements: {
    name: "旁白",
    text: "无人应答。"
  }
},
{
  id: "ending_130_8",
  elements: {
    name: "旁白",
    text: "脑海中的记忆如烟雾般朦胧离散，只有一根汇聚的细长的引线堪堪维系着。"
  }
},
{
  id: "ending_130_8_1",
  elements: {
    name: "旁白",
    text: "引线触动那一刹，行者仿佛受到感应般微微抬头。"
  }
},
{
  id: "ending_131_8",
  elements: {
    background:"sc4.1/4-1-23.jpg", 
    name: "旁白",
    text: "一颗曳尾的流星在此刻划过天际。"
  }
},
{
  id: "ending_132_8",
  elements: {
    name: "旁白",
    text: "——真美啊。"
  }
},
{
  id: "ending_133_8",
  elements: {
    name: "旁白",
    text: "注视着夜空，叹息一般的歌谣不自觉溢出了唇齿之间。"
  }
},
{
  id: "ending_134_8",
  elements: {
    name: "旁白",
    text: "遥远的天空之上会有什么吗？"
  }
},
{
  id: "ending_135_8",
  elements: {
    name: "旁白",
    text: "星辰之间会有人存在吗？"
  }
},
{
  id: "ending_136_8",
  elements: {
    name: "旁白",
    text: "行者不禁想着。"
  }
},
{
  id: "ending_137_8",
  elements: {
    name: "旁白",
    text: "当我们仰望天空，我们看到什么呢？"
  }
},
{
  id: "ending_138_8",
  elements: {
    name: "旁白",
    text: "遥远的繁星，来自过去的光芒。"
  }
},
{
  id: "ending_139_8",
  elements: {
    name: "旁白",
    text: "是氢聚变成氦核的过程释放的能量，因为光速的传播，那闪烁的光芒，"
  }
},
{
  id: "ending_139_8_1",
  elements: {
    name: "旁白",
    text: "可能在亿万年前就早已湮灭的恒星发出的光线，穿越宇宙时空，投上视网膜的倒反光斑。"
  }
},
{
  id: "ending_140_8",
  elements: {
    name: "旁白",
    text: "越过空间时间，延迟接收的信息。"
  }
},
{
  id: "ending_141_8",
  elements: {
    name: "旁白",
    text: "在某一天，在繁星间的小小一隅。"
  }
},
{
  id: "ending_142_8",
  elements: {
    name: "旁白",
    text: "蘸取墨水，平铺纸张。"
  }
},
{
  id: "ending_143_8",
  elements: {
    name: "旁白",
    text: "独行世间之人伏案，一笔一划，勾勒心境，在故事的终局写下收尾的诗句。"
  }
},
{
  id: "ending_144_8",
  elements: {
    name: "旁白",
    text: "星光交相辉映。"
  }
},
{
  id: "ending_145_8",
  elements: {
    name: "旁白",
    text: "抬头仰望过去。"
  }
},
{
  id: "ending_146_8",
  elements: {
    name: "旁白",
    text: "起笔，在页尾的空白。"
  }
},
//这里插入一个诗篇的视频//
 {
            id: "video_node",
            elements: {
                name: "旁白",
                text: "播放视频"
            },
            video: "poem.mp4", // 视频文件应放在 src/assets/video/ 目录下
            next: "ending_147_8" // 可选，视频播放完成后跳转到的节点
        }, 
{
  id: "ending_147_8",
  elements: {
    background:"sc4.1/4-1-26.jpg", 
    name: "旁白",
    text: "遥远的星体，即使从奇点到热寂，跨过星系，越过太阳日冕和银河旋臂，",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_147_8_1",
  elements: {
    name: "旁白",
    text: "穿过宇宙的时间空间，他们相互的光芒也终会互相映现，终会相见。"
  }
},
{
  id: "ending_148_8",
  elements: {
    name: "旁白",
    text: "……"
  }
},
{
  id: "ending_149_8",
  elements: {
    name: "旁白",
    text: "世界踏着心的琴弦匆匆而过"
  }
},
{
  id: "ending_150_8",
  elements: {
    name: "旁白",
    text: "低徊的心唱了很久忧伤的歌"
  }
},
{
  id: "ending_151_8",
  elements: {
    name: "旁白",
    text: "……"
  }
},
{
  id: "ending_152_8",
  elements: {
    name: "旁白",
    text: "我给你我设法保全的我自己的核心"
  }
},
{
  id: "ending_153_8",
  elements: {
    name: "旁白",
    text: "——不营字造句，不和梦交易，"
  }
},
{
  id: "ending_154_8",
  elements: {
    name: "旁白",
    text: "不被时间、欢乐和逆境触动的核心。"
  }
},
{
  id: "ending_155_8",
  elements: {
    name: "旁白",
    text: "我给你关于你生命的诠释，"
  }
},
{
  id: "ending_156_8",
  elements: {
    name: "旁白",
    text: "关于你自己的理论，"
  }
},
{
  id: "ending_157_8",
  elements: {
    name: "旁白",
    text: "你的真实而惊人的存在。"
  }
},
{
  id: "ending_158_8",
  elements: {
    name: "旁白",
    text: "———我用什么才能留住你。"
  }
},
{
  id: "ending_159_8",
  elements: {
    name: "旁白",
    text: "……"
  }
},
{
  id: "ending_160_8",
  elements: {
    name: "旁白",
    text: "我曾受罪"
  }
},
{
  id: "ending_161_8",
  elements: {
    name: "旁白",
    text: "我曾绝望"
  }
},
{
  id: "ending_162_8",
  elements: {
    name: "旁白",
    text: "我曾了解死亡"
  }
},
{
  id: "ending_163_8",
  elements: {
    name: "旁白",
    text: "我欢喜"
  }
},
{
  id: "ending_164_8",
  elements: {
    name: "旁白",
    text: "我在这个伟大的世界上"
  }
},
{
  id: "ending_165_8",
  elements: {
    name: "旁白",
    text: "孤独的行者漫步在新生的世界中，追寻着少女曾经存在过的证明。",
    sprite:{
        left:null,
    }
  },
    action: () => {
                let am = AchievementManager.getInstance();
                am.unlockAchievementWithAnimation("ending_7");
              },
  choices: [
    {
      text: "达成结局七！！！",
      next: "chapter_0_scene_0",
    }
  ]
},
//结局九//
{
  id: "ending_49_9",
  elements: {
    background:"sc4.1/4-1-10.jpg", 
    bgm:"bgm25.MP3" ,
    name: "旁白",
    text: "天地间回荡着灾厄之主的嚎叫，似是在讥笑我们的意志孱弱不堪。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_50_9",
  elements: {
    name: "旁白",
    text: "灾厄之主缓缓露出胸口的黑焰，刹那间漫天的黑雾化作锁链，将我们牢牢束缚。"
  }
},
{
  id: "ending_51_9",
  elements: {
    name: "旁白",
    text: "就算如此......"
  }
},
{
  id: "ending_52_9",
  elements: {
    name: "旁白",
    text: "拼尽全力，提起手中的暗寂，化为一面残破的黑色盾牌，蹒跚着走向灾厄之主。"
  }
},
{
  id: "ending_53_9",
  elements: {
    name: "旁白",
    text: "也要战斗到最后一刻......"
  }
},
{
  id: "ending_54_9",
  elements: {
    background:"sc4.1/4-1-21.jpg", 
    name: "旁白",
    text: "下一刻，漆黑的火焰倾泻而下，吞没了眼前的一切。"
  }
},
{
  id: "ending_55_9",
  elements: {
    name: "旁白",
    text: "然而——"
  }
},
{
  id: "ending_56_9",
  elements: {
    name: "旁白",
    text: "想象中自己被这黑焰焚烧殆尽的情景并没有出现。"
  }
},
{
  id: "ending_57_9",
  elements: {
    bgm:"bgm21.MP3" ,
    name: "你",
    text: "为什么？"
  }
},
{
  id: "ending_58_9",
  elements: {
    name: "旁白",
    text: "黑焰渐渐散去，在飞扬的烟尘中，才发现身前的闪烁着快要熄灭的光屏。"
  }
},
{
  id: "ending_59_9",
  elements: {
    name: "旁白",
    text: "是光泠，为自己挡下了这毁灭性的一击。"
  }
},
{
  id: "ending_60_9",
  elements: {
    background:"sc4.1/4-1-13.jpg", 
    name: "旁白",
    text: "灾厄之主被一片白光笼罩，陷入了一种“冻结”的状态。"
  }
},
{
  id: "ending_61_9",
  elements: {
    name: "旁白",
    text: "而这片白光，就是光泠真正意义上最后的力量了。"
  }
},
{
  id: "ending_62_9",
  elements: {
    name: "旁白",
    text: "灾厄之主发出了尖锐的怒号，躯体也因接触到纯白之光而产生了溃烂，但随即又被重新增生的部分愈合。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_63_9",
  elements: {
    name: "光泠",
    text: "啊......",
     sprite:{
        left:"guangling/down.png",
    }
  }
},
{
  id: "ending_64_9",
  elements: {
    name: "光泠",
    text: "不要......再伤害他了......"
  }
},
{
  id: "ending_65_9",
  elements: {
    name: "旁白",
    text: "为了对抗眼前的敌人，她已经用尽了全力。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_66_9",
  elements: {
    name: "你",
    text: "为什么......做到这种地步......"
  }
},
{
  id: "ending_67_9",
  elements: {
    name: "你",
    text: "就算你死了，你也能“活”下去的吧。"
  }
},
{
  id: "ending_68_9",
  elements: {
    name: "你",
    text: "我早就察觉到了，你并不是，像我一样脆弱的存在。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_69_9",
  elements: {
    name: "光泠",
    text: "为什么呢？",
    sprite:{
        left:"guangling/smile.png",
    }
  }
},
{
  id: "ending_70_9",
  elements: {
    name: "光泠",
    text: "也许我自己也不知道。",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_71_9",
  elements: {
    name: "光泠",
    text: "只是身体不自觉地行动起来了。"
  }
},
{
  id: "ending_72_9",
  elements: {
    name: "你",
    text: "你还有你的使命吧。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_73_9",
  elements: {
    name: "你",
    text: "我早就意识到了......你并不是为了我才出现在这里。"
  }
},
{
  id: "ending_74_9",
  elements: {
    name: "你",
    text: "也许你已经不知道经历过多少次这样的旅途了。"
  }
},
{
  id: "ending_75_9",
  elements: {
    name: "你",
    text: "我”，对“你”来说也不是那个唯一的存在吧。",
sprite:{
        left:null,
    }
  }
},
{
  id: "ending_76_9",
  elements: {
    name: "光泠",
    text: "你就是你，没有什么能取代！",
    sprite:{
        left:"guangling/tanqi.png",
    }
  }
},
{
  id: "ending_77_9",
  elements: {
    name: "旁白",
    text: "灾厄之主咆哮着，以横扫一切的绝对力量向光泠袭来。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_78_9",
  elements: {
    name: "光泠",
    text: "......绝对不允许！",
    sprite:{
        left:"guangling/wubiaoqing.png",
    }
  }
},
{
  id: "ending_79_9",
  elements: {
    name: "旁白",
    text: "一道纯白光线从天而降，射向灾厄之主的胸口，但无济于事。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_80_9",
  elements: {
    name: "旁白",
    text: "漫天的黑雾化作道道锁链，缠绕在光泠创造出的光屏上，逐渐收紧，欲挤碎二人最后的保护罩。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_81_9",
  elements: {
    name: "光泠",
    text: "呃......",
    sprite:{
        left:"guangling/wubiaoqing.png",
    }
  }
},
{
  id: "ending_82_9",
  elements: {
    name: "旁白",
    text: "她看上去正在遭受莫大的痛苦，眉间紧锁，剧烈地喘着气。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_83_9",
  elements: {
    background:"sc4.1/4-1-9.jpg", 
     bgm:"bgm24.MP3" ,
    name: "光泠",
    text: "在曙光到来之前点燃篝火吧！",
    sprite:{
        left:"guangling/smile.png",
    }
  }
},
{
  id: "ending_84_9",
  elements: {
    name: "光泠",
    text: "只要能驱散此刻流没大地的黑暗，将我的一切燃尽也无妨。",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_85_9",
  elements: {
    name: "你",
    text: "那种事情......不要啊！",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_86_9",
  elements: {
    name: "旁白",
    text: "在身心的双重折磨之下，脑海中回忆涌起。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_87_9",
  elements: {
    name: "光泠",
    text: "在您为世界带来晨曦之前，这漫长的黑夜，还请让我陪您度过。",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_88_9",
  elements: {
    name: "旁白",
    text: "在相遇时，她的问候。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_89_9",
  elements: {
    background:"sc4.1/4-1-26.jpg", 
    name: "光泠",
    text: "能将夜空点亮的繁星很美，如同末世中的生命一般，在黑暗中熠熠生辉。",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_89_9_1",
  elements: {
    name: "光泠",
    text: "所以我绝不希望看到死寂的天空......与大地。",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_90_9",
  elements: {
    name: "旁白",
    text: "她的期盼。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_91_9",
  elements: {
    name: "光泠",
    text: "这个世界上有很多压倒性的力量，但它们却从未真正掌握在任何人手中。",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_92_9",
  elements: {
    name: "光泠",
    text: "不要畏惧强大的敌人，认为他们不可战胜。"
  }
},
{
  id: "ending_93_9",
  elements: {
    name: "光泠",
    text: "也不要轻视渺小之物，认为他们无足轻重。"
  }
},
{
  id: "ending_94_9",
  elements: {
    name: "旁白",
    text: "她的鼓励。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_95_9",
  elements: {
    name: "光泠",
    text: "如果你也和我一样期盼着世界跨越寒冬，迎来暖春的那一天......",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_95_9_1",
  elements: {
    name: "光泠",
    text: "能不能和我做个约定？嗯，我希望那个未来里有你。"
  }
},
{
  id: "ending_96_9",
  elements: {
    name: "旁白",
    text: "她的约定。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_97_9",
  elements: {
    name: "光泠",
    text: "无论发生了什么，无论身处何处，我都不会忘记和你在一起的时间。",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_97_9_1",
  elements: {
    name: "光泠",
    text: "这些记忆早就构成了我灵魂的一部分。"
  }
},
{
  id: "ending_98_9",
  elements: {
    name: "光泠",
    text: "人会因爱着人而变得软弱。但这不可耻，因为那不是真正的软弱。"
  }
},
{
  id: "ending_99_9",
  elements: {
    name: "光泠",
    text: "再多和我说一些话吧，无论是什么，我都愿意听。"
  }
},
{
  id: "ending_100_9",
  elements: {
    name: "光泠",
    text: "可以握住的手，千万别放开了呢。"
  }
},
{
  id: "ending_101_9",
  elements: {
    name: "旁白",
    text: "她的梦。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_102_9",
  elements: {
    name: "旁白",
    text: "她的心。"
  }
},
{
  id: "ending_103_9",
  elements: {
    name: "旁白",
    text: "她的情。"
  }
},
{
  id: "ending_104_9",
  elements: {
    name: "旁白",
    text: "她的一切。"
  }
},
{
  id: "ending_105_9",
  elements: {
    name: "旁白",
    text: "一幕幕画面在脑中闪过，泪水无声地滴落。"
  }
},
{
  id: "ending_106_9",
  elements: {
    background:"sc4.1/4-1-16.jpg", 
    name: "旁白",
    text: "灾厄之主的黑影吞没了天穹，世界在祂的怒啸下濒临崩解。"
  }
},
{
  id: "ending_107_9",
  elements: {
    name: "旁白",
    text: "光泠的法阵再也坚持不住，轰然崩解。"
  }
},
{
  id: "ending_108_9",
  elements: {
    name: "旁白",
    text: "眼前的一切，俨然是一幅世界末日的景象。"
  }
},
{
  id: "ending_109_9",
  elements: {
    name: "旁白",
    text: "随着灾厄之主的肢体划过天空，捶击大地，令人震颤的事情发生了——"
  }
},
{
  id: "ending_110_9",
  elements: {
    background:"sc3.1/3-1-11.jpg", 
    name: "旁白",
    text: "大地上陡然裂开一条深渊巨口，一片黑暗死寂的天空竟然向下崩塌，似要挤压、吞噬世间的一切存在。"
  }
},
{
  id: "ending_111_9",
  elements: {
    name: "旁白",
    text: "光明逐渐被黑暗所侵蚀。"
  }
},
{
  id: "ending_112_9",
  elements: {
    name: "旁白",
    text: "一旦落入这黑暗的天罗地网中，等待着我们的，就将是失去自由——"
  }
},
{
  id: "ending_112_9_1",
  elements: {
    name: "旁白",
    text: "永远困于不见天日的虚空的牢笼。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_113_9",
  elements: {
    name: "光泠",
    text: "光泠深吸一口气，坚定地朝前走去。",
    sprite:{
        left:"guangling/tanqi.png",
    }
  }
},
{
  id: "ending_114_9",
  elements: {
    name: "你",
    text: "你要去哪？",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_115_9",
  elements: {
    name: "光泠",
    text: "用我的身躯，堵住这通向黑暗与虚无的裂缝。",
    sprite:{
        left:"guangling/smile.png",
    }
  }
},
{
  id: "ending_116_9",
  elements: {
    name: "光泠",
    text: "只要牺牲我这副承载着光之力的身躯......也许就能够让你存活下去......"
  }
},
{
  id: "ending_117_9",
  elements: {
    name: "光泠",
    text: "是我将你带上了这条并不美好，甚至可以说是充满着磨难与苦痛的道路。"
  }
},
{
  id: "ending_118_9",
  elements: {
    name: "光泠",
    text: "真是......对不起......"
  }
},
{
  id: "ending_119_9",
  elements: {
    name: "光泠",
    text: "现在，也该让我发挥最后的作用......将你送往或许不那么痛苦的彼岸了。"
  }
},
{
  id: "ending_120_9",
  elements: {
    name: "旁白",
    text: "周身的幻影如同画布一般在她身后卷起，被她抛在后面，而来自黑暗的束缚在她身后拉扯着她。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_121_9",
  elements: {
    name: "旁白",
    text: "如同抵足行走在刀尖上，每向前一步，她的痛苦便愈烈。"
  }
},
{
  id: "ending_122_9",
  elements: {
    name: "旁白",
    text: "——阴影即是阳光;"
  }
},
{
  id: "ending_123_9",
  elements: {
    name: "旁白",
    text: "——消逝的神在我面前显灵;"
  }
},
{
  id: "ending_123_9-1",
  elements: {
    name: "旁白",
    text: "——荣辱于我都一样;"
  }
},
{
  id: "ending_124_9",
  elements: {
    name: "旁白",
    text: "黑暗中，一个无机质的声音响起，似乎在蛊惑着她放弃抵抗，沉溺于黑暗中，推动着她自我吞噬。"
  }
},
{
  id: "ending_124_9_1",
  elements: {
    name: "旁白",
    text: "告诉她消解在至高无上的毁灭之力中、与虚无融为一体才是最好的结局。"
  }
},
{
  id: "ending_125_9",
  elements: {
    name: "旁白",
    text: "但......不，她现在就要送身边之人抵达那个属于幸存者的世界。"
  }
},
{
  id: "ending_126_9",
  elements: {
    name: "旁白",
    text: "伴随着愈加接近那黑暗的根源，刺痛感愈加强烈。"
  }
},
{
  id: "ending_127_9",
  elements: {
    name: "旁白",
    text: "汹涌而来的毁灭之力几乎将她冲垮，她挣扎着奋力伸出手去。"
  }
},
{
  id: "ending_128_9",
  elements: {
    name: "旁白",
    text: "似乎是有泪水从眼眶中流下来，巨大的疼痛撕裂着她。"
  }
},
{
  id: "ending_129_9",
  elements: {
    name: "旁白",
    text: "她突然感到，似乎有一双手握住了她。"
  }
},
{
  id: "ending_130_9",
  elements: {
    name: "旁白",
    text: "回头看去，却迎上一个坚毅的目光。"
  }
},
{
  id: "ending_131_9",
  elements: {
    name: "你",
    text: "......怎么能让你，独自走向虚无的深渊？"
  }
},
{
  id: "ending_132_9",
  elements: {
    name: "你",
    text: "比起一切礼物和誓言，留在我身边的你比什么都重要。"
  }
},
{
  id: "ending_133_9",
  elements: {
    name: "你",
    text: "和我做个约定吧，永远都不会分开的约定。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_134_9",
  elements: {
    name: "光泠",
    text: "......在这个时候，这种地方？",
    sprite:{
        left:"guangling/wubiaoqing.png",
    }
  }
},
{
  id: "ending_135_9",
  elements: {
    name: "你",
    text: "无论发生了什么，无论身处何处，我都不会忘记和你在一起的时间，这些记忆早就构成了我灵魂的一部分。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_136_9",
  elements: {
    name: "你",
    text: "——这是你曾对我说过的话，现在我把它还给你。"
  }
},
{
  id: "ending_137_9",
  elements: {
    name: "你",
    text: "这份以你的牺牲换来的“救赎”，我无法接受。"
  }
},
{
  id: "ending_138_9",
  elements: {
    name: "你",
    text: "可以握住的手，我不会再放开了。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_139_9",
  elements: {
    name: "光泠",
    text: "我希望你......能继续在这个世界上去找寻到自己的归宿。",
    sprite:{
        left:"guangling/down.png",
    }
  }
},
{
  id: "ending_140_9",
  elements: {
    name: "你",
    text: "没有你的世界，不存在我的归宿。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_141_9",
  elements: {
    name: "你",
    text: "我一定会尽力留在你身边，直到我生命的最后一刻也不停止。",
  }
},
{
  id: "ending_142_9",
  elements: {
    name: "你",
    text: "让我再看着你的眼睛吧，直到所有星辉都褪去，你的眼中只剩下我。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_143_9",
  elements: {
    name: "光泠",
    text: "......",
    sprite:{
        left:"guangling/wubiaoqing.png",
    }
  }
},
{
  id: "ending_144_9",
  elements: {
    name: "旁白",
    text: "光泠擦去眼角的泪水，露出一个笑容。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_145_9",
  elements: {
    name: "旁白",
    text: "她睁开眼，闪烁着的双眼中不再只有痛苦和悲悯，而是牵挂与勇气。"
  }
},
{
  id: "ending_146_9",
  elements: {
    name: "光泠",
    text: "即使前方就是万劫不复的深渊，你也愿意做出这样的选择吗？",
    sprite:{
        left:"guangling/smile.png",
    }
  }
},
{
  id: "ending_147_9",
  elements: {
    name: "你",
    text: "嗯。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_148_9",
  elements: {
    name: "旁白",
    text: "毫不犹豫地作出回答。"
  }
},
{
  id: "ending_149_9",
  elements: {
    name: "你",
    text: "我已经知道了，这样做的后果。"
  }
},
{
  id: "ending_150_9",
  elements: {
    name: "你",
    text: "做出这种选择的你，想必不会感到后悔吧？"
  }
},
{
  id: "ending_151_9",
  elements: {
    name: "你",
    text: "这一点......对我来说也一样。"
  }
},
{
  id: "ending_152_9",
  elements: {
    name: "你",
    text: "因为我深爱着，和你在一起的时光。"
  }
},
{
  id: "ending_153_9",
  elements: {
    name: "你",
    text: "我愿意为了保护我所深爱的生命而死，也愿意在你身边走向未来......"
  }
},
{
  id: "ending_154_9",
  elements: {
    name: "你",
    text: "就算......现在已经看不见未来......"
  }
},
{
  id: "ending_155_9",
  elements: {
    name: "你",
    text: "我也想和你一起......见证最后的结局。"
  }
},
{
  id: "ending_156_9",
  elements: {
    name: "你",
    text: "死亡，是生命将自身赠予了生命，从不是放弃……"
  }
},
{
  id: "ending_157_9",
  elements: {
    name: "你",
    text: "这就是我的答案。"
  }
},
{
  id: "ending_158_9",
  elements: {
    name: "旁白",
    text: "即使在隐痛与幻觉中被撕扯，少女依然露出了微笑。"
  }
},
{
  id: "ending_159_9",
  elements: {
    name: "旁白",
    text: "那绝非是带着伪装的笑容，而是以连绵无尽的痛苦为燃料，从绝望中绽放的微笑。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_160_9",
  elements: {
    name: "光泠",
    text: "好啊......",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_161_9",
  elements: {
    bgm:"bgm25.MP3" ,
    name: "光泠",
    text: "既然这残忍的世界无法容纳我们，那就让永恒的幻梦成为归宿。"
  }
},
{
  id: "ending_162_9",
  elements: {
    name: "旁白",
    text: "掌心用力，拉住光泠的手臂，面对面地拥抱着她。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_163_9",
  elements: {
    name: "旁白",
    text: "长时间的战斗紊乱了二人的呼吸，氤氲的温热扑打在彼此的脸颊上。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_164_9",
  elements: {
    name: "光泠",
    text: "你对我来说是如此的特别，不论多么瑰丽的语言，都不足以道出与你相遇的奇迹。",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_165_9",
  elements: {
    name: "光泠",
    text: "我希望能够延续这场奇迹，直到时间，或是生命的尽头。"
  }
},
{
  id: "ending_166_9",
  elements: {
    name: "旁白",
    text: "时间在言语间流逝着，那比美酒更醇烈，比琴声更悠远的思恋，正呼之欲出。",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_167_9",
  elements: {
    name: "你",
    text: "我希望，与光泠永不分离。"
  }
},
{
  id: "ending_168_9",
  elements: {
    name: "旁白",
    text: "在最后的时刻，许下愿望。"
  }
},
{
  id: "ending_169_9",
  elements: {
    name: "旁白",
    text: "黑暗骤然坍塌，将二人的身影吞没。"
  }
},
{
  id: "ending_170_9",
  elements: {
    name: "旁白",
    text: "闭上眼，世界渐渐离去。"
  }
},
{
  id: "ending_171_9",
  elements: {
    name: "旁白",
    text: "天地轰鸣，群星熄灭，最后一丝光芒消逝。"
  }
},
{
  id: "ending_172_9",
  elements: {
    name: "旁白",
    text: "整个世界都在震颤，只有彼此的时间停在了此刻。"
  }
},
{
  id: "ending_173_9",
  elements: {
    name: "旁白",
    text: "万物寂灭，无声无息，唯有两人胸膛里的心跳仍在共鸣。"
  }
},
{
  id: "ending_174_9",
  elements: {
    name: "旁白",
    text: "那一声声回响，成为虚无中唯一的律动。"
  }
},
{
  id: "ending_174_9-1",
  elements: {
    name: "旁白",
    text: "……"
  }
},
{
  id: "ending_175_9",
  elements: {
    name: "旁白",
    text: "黑暗与静谧，沉浸于平和而略显苍凉的梦中。"
  }
},
{
  id: "ending_176_9",
  elements: {
    name: "旁白",
    text: "肢体失去知觉，双眼无力睁开，心亦没有归属。"
  }
},
{
  id: "ending_177_9",
  elements: {
    name: "旁白",
    text: "随波逐流，任由意识向更深处探索，不断寻觅，直至迷失。"
  }
},
{
  id: "ending_178_9",
  elements: {
    name: "旁白",
    text: "空间不存在，时间无意义，连存在本身都显得多余。"
  }
},
{
  id: "ending_179_9",
  elements: {
    name: "旁白",
    text: "在虚无的包裹中，遥远的彼岸似乎传来了动听的歌谣。"
  }
},
{
  id: "ending_180_9",
  elements: {
    name: "旁白",
    text: "当音符触及水面时，波纹染上微光，暗流织成细网。"
  }
},
{
  id: "ending_181_9",
  elements: {
    name: "旁白",
    text: "终于，歌声隐匿，取而代之的是孱弱的律动。"
  }
},
{
  id: "ending_182_9",
  elements: {
    name: "你",
    text: "（睁眼）"
  }
},
{
  id: "ending_183_9",
  elements: {
    name: "旁白",
    text: "睁开眼，是一个安宁的世界。"
  }
},
{
  id: "ending_184_9",
  elements: {
    background:"sc4.1/4-1-24.jpg", 
    name: "旁白",
    text: "摇曳的树冠，温暖的阳光透过其间，尘埃飞舞。"
  }
},
{
  id: "ending_185_9",
  elements: {
    name: "旁白",
    text: "草地柔软，轻轻托起脚步，不让来客惊扰空气中的宁静。"
  }
},
{
  id: "ending_186_9",
  elements: {
    name: "旁白",
    text: "鸟鸣悠长而辽远，是这片空间唯一的声响。"
  }
},
{
  id: "ending_187_9",
  elements: {
    name: "旁白",
    text: "这里没有战火的喧嚣，没有刺耳的啸叫，静得可以听到彼此的心跳，细微的呼吸。"
  }
},
{
  id: "ending_188_9",
  elements: {
    name: "旁白",
    text: "偶尔有微风抚来,带来远方的消息。"
  }
},
{
  id: "ending_189_9",
  elements: {
    name: "旁白",
    text: "就在这时，耳畔捕捉到了前方的塞窣，有人正踩着林地里的杂草向自己走来。"
  }
},
{
  id: "ending_190_9",
  elements: {
    name: "你",
    text: "光泠？",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_191_9",
  elements: {
    name: "光泠",
    text: "我在这里哦！",
    sprite:{
        left:"guangling/smile1.png",
    }
  }
},
{
  id: "ending_192_9",
  elements: {
    name: "旁白",
    text: "熟悉的嗓音从树丛后传出，接着脚踩草地的怒窣声变得急促起来，一个熟悉的身影也从树荫里显现，向自己走来......",
    sprite:{
        left:null,
    }
  }
},
{
  id: "ending_193_9",
  elements: {
    name: "旁白",
    text: "听见了呼唤，少女的唇畔泛上了可媲美春日般明媚的笑意。"
  }
},
{
  id: "ending_194_9",
  elements: {
    name: "旁白",
    text: "她看向这边，轻轻呼唤自己的名字，眼中流露着憧憬与眷念。"
  }
},
{
  id: "ending_195_9",
  elements: {
    name: "旁白",
    text: "纤细的手臂环住了脖颈，光泠的重量渐渐倾倚在自己的胸前。"
  }
},
{
  id: "ending_196_9",
  elements: {
    name: "旁白",
    text: "她的身体轻轻贴了上来。"
  }
},
{
  id: "ending_197_9",
  elements: {
    name: "旁白",
    text: "温热在唇间留下痕迹，那些或是神圣的，或是私欲的情愫，正贪婪地攫取着彼此的温度。"
  }
},
{
  id: "ending_197_9-1",
  elements: {
    name: "旁白",
    text: "……"
  }
},
{
  id: "ending_198_9",
  elements: {
    name: "旁白",
    text: "日夜更替，四季轮迭，他们一齐淌过时间的长河，一起走过清晨的河畔，夜晚的幽径......"
  }
},
{
  id: "ending_199_9",
  elements: {
    name: "旁白",
    text: "途经恬谧的村庄，喧嚣的城都......"
  }
},
{
  id: "ending_200_9",
  elements: {
    name: "旁白",
    text: "行遍荆棘密布的干涸的荒野，漫步于雨后鸢尾盛开的花田之中，这一路伴随着说话声、笑声与歌声的回响。"
  }
},
{
  id: "ending_201_9",
  elements: {
    name: "旁白",
    text: "再也不用面临可能的离别......"
  }
},
{
  id: "ending_202_9",
  elements: {
    name: "旁白",
    text: "彼此的温度与心跳是那么得清晰，让人心安......"
  }
},
{
  id: "ending_203_9",
  elements: {
    name: "旁白",
    text: "这里，是独属于他们的，美丽幻梦。"
  }
},
{
  id: "ending_204_9",
  elements: {
    name: "旁白",
    text: "……"
  }
},
{
  id: "ending_205_9",
  elements: {
    name: "旁白",
    text: "但是，请不要为生命的消逝而悲伤。"
  }
},
{
  id: "ending_206_9",
  elements: {
    name: "旁白",
    text: "只要还有留有记忆，一瞬的绽放亦会成为永恒。"
  }
},
{
  id: "ending_207_9",
  elements: {
    name: "旁白",
    text: "在甜蜜的幻梦中，少女与你的故事将继续书写下去，相依的二人将永不再分离。"
  },
  action: () => {
                let am = AchievementManager.getInstance();
                am.unlockAchievementWithAnimation("ending_8");
            },
  choices: [
    {
      text: "达成结局八！！！",
      next: "chapter_0_scene_0"
    }
  ]
},
    ]
}
export default scene;
