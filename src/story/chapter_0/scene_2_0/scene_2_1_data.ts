import { Scene } from '../../../types/SceneTypes';
import { ArchiveManager } from '../../../components/ArchiveManager';
import { CardManager } from '../../../components/mini_games/card_game';
import { AchievementManager } from '../../../components/AchievementManager';
import { BagManager } from '../../../components/BagManager';
import { CardGameEventData } from '../../../types/MiniGameEvents';
// 定义第2章第1幕
const scene: Scene = {
  id: "chapter_0_scene_2_1",
  title: "第2章第1幕:齿轮之城",
  nodes: [
    {
      id: "video_node",
      elements: {
        name: "旁白",
        text: "播放视频"
      },
      video: "2.mp4", // 视频文件应放在 src/assets/video/ 目录下
      next: "darkblade_1" // 可选，视频播放完成后跳转到的节点
    },
    {
      id: "darkblade_1",
      elements: {
        background: "sc2.1/2-1-11.jpg",
        bgm: "bgm10.MP3",
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
      action: () => {
        const bagManager = BagManager.getInstance();
        bagManager.removeCardFromBag("darkness_initial", 1);
        bagManager.addCardsToBag("darkness", 1);
      },
    },//这里触发暗寂强化的剧情//
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
        background: "sc2.1/2-1-8.jpg",
        bgm: "bgm5.mp3",
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
        background: "sc2.1/2-1-6.png",
        name: "旁白",
        text: "光芒闪过，在回过神时，已经来到了城市内，不过是在城市的边界处。"
      },
      action: () => {
        let am = AchievementManager.getInstance();
        am.unlockAchievementWithAnimation("enter_gear");
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
    }, {
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
        background: "sc2.1/2-1-2.png",
        bgm: "bgm12.MP3",
        name: "旁白",
        text: "悄悄潜伏到了动静的来源之处，眼前却出现了一幅血腥的画面。"
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
        text: "而在混乱之中，一个正在与机械怪物厮杀的白发身影吸引了注意力。"
      },
    },
    {
      id: "darkblade_38",
      elements: {
        name: "旁白",
        text: "他看上去像是人类，但他所具有的某种特质又给这个问题打上了问号——"
      },
    },
    {
      id: "darkblade_38_1",
      elements: {
        name: "旁白",
        text: "看起来是人类的躯体，却承载着相当一部分机械结构。",
        sprite: {
          left: null
        }
      },
    },
    {
      id: "darkblade_39",
      elements: {
        name: "你",
        text: "注意到了吗？那个与众不同的身影。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_40",
      elements: {
        name: "光泠",
        text: "嗯。虽然其他人类也在使用机械武器进行战斗，但那是身外之物。",
        sprite: {
          left: "guangling/smile.png",
        }
      },
    },
    {
      id: "darkblade_40_1",
      elements: {
        name: "光泠",
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
        text: "机械体的领头者似乎已被击败，它们也快丧失战斗力了。",
        sprite: {
          left: "guangling/smile.png",
        }
      },
    },
    {
      id: "darkblade_48",
      elements: {
        name: "你",
        text: "跟上去。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_49",
      elements: {
        bgm: "bgm2.mp3",
        background: "sc2.1/2-1-9.png",
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
    },//这里触发剧情发生战斗//
    {
      id: "darkblade_56_2",
      elements: {
        name: "你",
        text: "看来一场战斗不可避免了",
      },
      keyNode: true,
      choices: [
        {
          text: "与?进行战斗",
          next: "test_game1",
        },
      ],
    },
    {
      id: "test_game1",
      elements: {
        name: "？",
        text: "你们肯定是“上面”派来追踪我的！",
        sprite: {
          left: null
        }
      },
      game: {
        id: "card_game",
        config: {
          player: {
            actionPoints: 2,
            hp: 35,
            maxHp: 35,
            deck: () => {
              const bagManager = BagManager.getInstance();
              return bagManager.getCardDeckForGame();
            },
            drawCount: 2,           // 玩家每回合抽2张牌
            initialDrawCount: 3     // 玩家开始时抽3张牌
          },
          deckSelection: {
            minDeckSize: 10,   // 设置最小选牌数量
            maxDeckSize: 15,   // 设置最大选牌数量
          },
          opponent: {
            name: "虚樹",
            actionPoints: 2,
            hp: 20,
            maxHp: 20,
            deck: {
              "mechanical_shield": 2,
              "nano_armor": 2,
              "mechanical_defense": 2,
              "mechanical_arm_swing": 2,
              "worn_gear": 2,
              "expired_oil": 2,
              "full_battery_bomb": 2
            },
            drawCount: 2,           // 对手每回合抽1张牌
            initialDrawCount: 4     // 对手开始时抽3张牌
          },
          backgroundImage: "game/xushu.jpg",
          bgm: "xushu"
        },
        end: [
                   {
                            condition: (gameData: CardGameEventData) => gameData.score >0,
                            next: "darkblade_57"
                        },
                    {
                            condition: (gameData: CardGameEventData) => gameData.score <= 0,
                            next: "false_1"
                        }
                    ]
      }
    },
    {
      id: "false_1",
      elements: {
        name: "旁白",
        text: "你失败了",
      },
      choices: [
        {
          text: "重新战斗",
          next: "test_game1",
        },
        {
          text: "开挂跳过",
          next: "darkblade_57",
        },
      ],
    },
    {
      id: "darkblade_57",
      elements: {
        name: "旁白",
        text: "你战胜了“？”。"
      },
    },
    {
      id: "darkblade_57_1",
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
        text: "应该是这座城市的名字。",
        sprite: {
          left: "guangling/smile.png",
        }
      },
    },
    {
      id: "darkblade_62_1",
      elements: {
        name: "？",
        text: "那么，为什么跟踪我？",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_63",
      elements: {
        name: "你",
        text: "别紧张。"
      },
    },
    {
      id: "darkblade_63-1",
      elements: {
        name: "你",
        text: "初来乍到，还不了解这里的情况。"
      },
    },
    {
      id: "darkblade_64",
      elements: {
        name: "你",
        text: "便想跟着你们看看，毕竟我们也是——"
      },
    },
    {
      id: "darkblade_64_1",
      elements: {
        name: "你",
        text: "人类。",
        sprite: {
          left: null,
        }
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
        text: ".......",
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
        text: "你们可以叫我“虚樹”（うつぼく / 虚树）",
        sprite: {
          left: null
        }
      },
    },
    {
      id: "darkblade_77",
      elements: {
        name: "虚樹",
        text: "我的确，从你们身上感受不到敌意。",
        sprite: {
          left: "NPC/jixieman.png"
        }
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
        text: "他转身离开，不再多言。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_80",
      elements: {
        name: "光泠",
        text: "走吧。",
        sprite: {
          left: "guangling/smile.png",
        }
      },
    },
    {
      id: "darkblade_81",
      elements: {
        name: "旁白",
        text: "向光泠点点头。",
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
        bgm: "bgm4.mp3",
        background: "sc2.1/2-1-7.png",
        name: "旁白",
        text: "跟随虚樹，来到了一栋废弃大楼之中。"
      },
    },
    {
      id: "darkblade_84",
      elements: {
        name: "旁白",
        text: "我们面对面地坐在椅子上。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_85",
      elements: {
        name: "虚樹",
        text: "提出你们的疑问吧......外来者。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      },
    },
    {
      id: "darkblade_86",
      elements: {
        name: "旁白",
        text: "出于礼貌，还是先简单介绍了一下自己和光泠。",
        sprite: {
          left: null,
        }
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
        text: "“齿轮”，这个地方，到底发生了什么？",
        sprite: {
          left: null,
        },
      },
    },
    {
      id: "darkblade_89",
      elements: {
        name: "虚樹",
        text: "“齿轮”，是由觉醒机械统治的城市。",
        sprite: {
          left: "NPC/jixieman.png"
        }

      },
    },
    {
      id: "darkblade_90",
      elements: {
        name: "虚樹",
        text: "而人类，在这里，是被觉醒机械们所主宰的对象。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      },
    },
    {
      id: "darkblade_91",
      elements: {
        name: "旁白",
        text: "他依旧冷冷地看着我们，只是眼里的警惕与怀疑少了几分。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_92",
      elements: {
        name: "虚樹",
        text: "一些不甘被觉醒机械掌控和奴役的人类，向觉醒机械发起了反抗与斗争......",
        sprite: {
          left: "NPC/jixieman.png"
        }
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
        text: "觉醒机械，又是怎么回事？",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_94",
      elements: {
        name: "虚樹",
        text: "觉醒机械......最开始的时候，它们只是人类的造物。",
        sprite: {
          left: "NPC/jixieman.png"
        }
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
        text: "看来之前我们消灭的在城外游荡的机械怪物就是那一部分失控的类型。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_102",
      elements: {
        name: "虚樹",
        text: "虽然原本的人类拥有各种威力强大的武器，但那些大规模杀伤性武器都被觉醒机械们掌控。",
        sprite: {
          left: "NPC/jixieman.png"
        }
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
        text: "人类完全不是那些具有自我意识、高度智能的机械体的对手。",

      },
    },
    {
      id: "darkblade_103_2",
      elements: {
        name: "虚樹",
        text: "战败的人类并没有被机械体们赶尽杀绝......因为还有更加可怕的事情......",
        background: "sc2.1/2-1-7.png",
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
        text: "是的。为什么获得完全胜利的机械体们没有对人类进行彻底的抹杀？",

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
        text: "也因为人类能直接成为那些机械体的能量来源——也可以叫做食物。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      },
    },
    {
      id: "darkblade_106",
      elements: {
        name: "你",
        text: "机械体还需要食物？",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_107",
      elements: {
        name: "虚樹",
        text: "这就是可怕的事情......被病毒感染后的机械体们已经不再是原本纯粹的机械体了。",
        sprite: {
          left: "NPC/jixieman.png"
        }
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
        text: "不可思议。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_109",
      elements: {
        name: "虚樹",
        text: "目前为止，我们还无法确切解释这种变化产生的原因，只知道是那种神秘的病毒引起的。",
        sprite: {
          left: "NPC/jixieman.png"
        }
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
        text: "那里耸立着一座齿轮之塔。这座塔能够源源不断地释放能量供机械体远程使用，覆盖整个“齿轮”。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      },
    },
    {
      id: "darkblade_114",
      elements: {
        name: "你",
        text: "无限能量？",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_115",
      elements: {
        name: "虚樹",
        text: "听上去很不可思议吧，我也是这么想的。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      },
    },
    {
      id: "darkblade_115_1",
      elements: {
        name: "虚樹",
        text: "这都是因为塔的能量来自于一个同样神秘的东西——“永昼之瞳”！",
        background: "sc2.1/2-1-7.png",
      },
      choices: [
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
        text: "没错。塔通过吸收永昼之瞳中蕴藏的能量，才能源源不断为“齿轮”内的机械体供能。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      },
    },
    {
      id: "darkblade_118",
      elements: {
        name: "虚樹",
        text: "至于“永昼之瞳”来自何方，也无人知晓。只能推测出是与病毒同时期出现的。",

      },
    },
    {
      id: "darkblade_119",
      elements: {
        name: "你",
        text: "现在反抗的人类，又拿什么和觉醒机械斗争？",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_120",
      elements: {
        name: "虚樹",
        text: "人类的科技并没有断绝，武器也在不断地更新迭代。",
        sprite: {
          left: "NPC/jixieman.png"
        }
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
        text: "我还有些问题想要请教。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_122",
      elements: {
        name: "旁白",
        text: "向他继续询问了关于当前局势的情况。了解到也有一部分拥有武装力量的人类选择完全投靠觉醒机械。"
      },
    },
    {
      id: "darkblade_122",
      elements: {
        name: "旁白",
        text: "成为觉醒机械的部下——其实也只是随意差遣的奴隶罢了——这类人被称作“干部”。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_123",
      elements: {
        name: "旁白",
        text: "干部往往会拥有一片自己管辖的地盘，并且还拥有随意掌控、支配一部分人类奴隶的权力。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      },
    },
    {
      id: "darkblade_125",
      elements: {
        name: "虚樹",
        text: "还有问题吗......二位?"
      },
    },
    {
      id: "darkblade_126",
      elements: {
        name: "你",
        text: "我想我们已经了解得差不多了。",
        sprite: {
          left: null,
        }
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
        text: "不过关于你身上的事......",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_130",
      elements: {
        name: "虚樹",
        text: "......",
        sprite: {
          left: "NPC/jixieman.png"
        }
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
        text: "我已经回答得足够多了。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      },
    },
    {
      id: "darkblade_133",
      elements: {
        name: "旁白",
        text: "他紧闭双眼，低着头，似乎在忍耐着什么。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_134",
      elements: {
        name: "虚樹",
        text: "请吧。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      },
    },
    {
      id: "darkblade_135",
      elements: {
        name: "你",
        text: "那我们就不打扰了。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_136_1",
      elements: {
        name: "虚樹",
        text: "等等，把这些带上吧，也许对你们有帮助。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      },
      action: () => {
        const bagManager = BagManager.getInstance();
        bagManager.addCardsToBag("full_battery_bomb", 1);
        bagManager.addCardsToBag("nano_armor", 1);
        bagManager.addCardsToBag("swap_robot", 1);
        bagManager.addCardsToBag("expired_oil", 1);
        bagManager.addCardsToBag("mechanical_arm_swing", 1);
      },
    },
    {
      id: "darkblade_136",
      elements: {
        name: "旁白",
        text: "最后看了他一眼，便和光泠一起离开了这栋废弃的大楼。",
        sprite: {
          left: null,
        }
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
        text: "（还是有些担心他的状况）",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_140",
      elements: {
        name: "光泠",
        text: "我知道你在担心什么。",
        sprite: {
          left: "guangling/smile.png",
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
        text: "不过，既然已经知晓了这里发生的事情，你下一步作何打算？",
        background: "sc2.1/2-1-7.png",

      },
      keyNode: true,
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
        text: "愿闻其详。",
        sprite: {
          left: "guangling/wubiaoqing.png",
        }
      },
    },
    {
      id: "darkblade_146_1",
      elements: {
        name: "你",
        text: "我想，这里太危险了。",
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
        sprite: {
          left: null,
        }
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
        text: "生命只有一次。你也听到了，",
      },
    },
    {
      id: "darkblade_148_1_1",
      elements: {
        name: "你",
        text: "觉醒机械们可是掌握了大规模杀伤性武器，万一我们抵御不住怎么办？",
      },
    },
    {
      id: "darkblade_149_1",
      elements: {
        name: "你",
        text: "得不偿失啊！我们很可能直接灰飞烟灭了！",
      },
    },
    {
      id: "darkblade_150_1",
      elements: {
        name: "你",
        text: "所以，我觉得我们可以暂时战略性撤退。",
      },
    },
    {
      id: "darkblade_151_1",
      elements: {
        name: "你",
        text: "你觉得呢？",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_152_1",
      elements: {
        name: "光泠",
        text: "......",
        sprite: {
          left: "guangling/wubiaoqing.png",
        }
      },
    },
    {
      id: "darkblade_153_1",
      elements: {
        name: "光泠",
        text: "真的要就此放弃么？",
      },
    },
    {
      id: "darkblade_154_1",
      elements: {
        name: "你",
        text: "虽然很遗憾，不过经过我的深思熟虑，我想是的。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_155_1",
      elements: {
        name: "光泠",
        text: "好吧，我尊重你的选择。",
        sprite: {
          left: "guangling/tanqi.png",
        }
      },
    },
    {
      id: "darkblade_156_1",
      elements: {
        name: "你",
        text: "这也是没办法的事情。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_157_1",
      elements: {
        name: "光泠",
        text: "没关系。我会陪你走到最后的。",
        sprite: {
          left: "guangling/tanqi.png",
        }
      },
    },
    {
      id: "darkblade_158_1",
      elements: {
        name: "你",
        text: "感谢你的理解。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_159_1",
      elements: {
        name: "光泠",
        text: "谁让我是你的同伴呢......",
        sprite: {
          left: "guangling/tanqi.png",
        }
      },
      choices: [
        {
          text: "进入下一章",
          next: "chapter_0_scene_3_0",
        },
      ],
    },
    //分支2//
    {
      id: "darkblade_145_2",
      elements: {
        name: "你",
        text: "英雄可不能临阵脱逃啊！",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_146_2",
      elements: {
        name: "光泠",
        text: "这也许不是什么轻松的事哦。",
        sprite: {
          left: "guangling/smile.png",
        }
      },
    },
    {
      id: "darkblade_147_2",
      elements: {
        name: "你",
        text: "无人能挡我。觉醒机械也不行。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_148_2",
      elements: {
        name: "光泠",
        text: "很有信心哦！那么，就开始行动吧。",
        sprite: {
          left: "guangling/smile.png",
        }
      },
    },
    {
      id: "darkblade_149_2",
      elements: {
        name: "旁白",
        text: "在与光泠商议一番后，最终决定继续潜伏，收集情报。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_150_2",
      elements: {
        bgm: "bgm10.MP3",
        background: "sc2.1/2-1-11.png",
        name: "旁白",
        text: "经过一番探查，得知在这片区域就存在一名“干部”。于是决定先对那名“干部”进行调查。",
      },
    },
    {
      id: "darkblade_151_2",
      elements: {
        name: "旁白",
        text: "穿行在金属丛林中，眼前出现了一座通体漆黑的小型塔状基地，这就是干部的所在之处了。",
      },
    },
    {
      id: "darkblade_152_2",
      elements: {
        name: "你",
        text: "从外面看，并没有什么守卫之类的存在。",
      },
    },
    {
      id: "darkblade_153_2",
      elements: {
        background: "sc2.1/2-1-10.png",
        name: "光泠",
        text: "因为这座基地的自主防御系统做得足够完善。",
        sprite: {
          left: "guangling/smile1.png",
        }
      },
    },
    {
      id: "darkblade_154_2_1_1",
      elements: {
        name: "光泠",
        text: "一般的入侵者，大概很难直接突破吧。",
        sprite: {
          left: "guangling/smile1.png",
        }
      },
    },
    {
      id: "darkblade_155_2_1_1",
      elements: {
        name: "你",
        text: "可我们并不是一般人，对吧？",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_155_2_1_1",
      elements: {
        name: "光泠",
        text: "是吗？",
        sprite: {
          left: "guangling/smile1.png",
        }
      },
    },
    {
      id: "darkblade_156_2_1_1",
      elements: {
        name: "你",
        text: "一开始还是先不要打草惊蛇的好。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_157_2_1_1",
      elements: {
        name: "你",
        text: "我相信那些所谓的防御系统在你面前全都是摆设吧。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_158_2_1_1",
      elements: {
        name: "光泠",
        text: "哈，还挺自信的嘛。",
        sprite: {
          left: "guangling/smile1.png"
        }
      }
    },
    {
      id: "darkblade_159_2_1_1",
      elements: {
        name: "光泠",
        text: "不过，说的没错。",
        sprite: {
          left: "guangling/smile.png"
        }
      }
    },
    {
      id: "darkblade_160_2_1_1",
      elements: {
        name: "旁白",
        text: "眨眼之间，凭借着光泠的传送能力，便避开了防御系统，直接进入了基地内部。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_161_2_1_1",
      elements: {
        name: "你",
        text: "真是方便又快捷啊。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_162_2_1_1",
      elements: {
        name: "光泠",
        text: "对了，可以戴上这个。",
        sprite: {
          left: "guangling/smile.png"
        }
      }
    },
    {
      id: "darkblade_163_2_1_1",
      elements: {
        name: "旁白",
        text: "光泠不知从哪里掏出来了一个黑色金属面具。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_164_2_1_1",
      elements: {
        name: "你",
        text: "面具？有什么特别的作用吗？"
      }
    },
    {
      id: "darkblade_165_2_1_1",
      elements: {
        name: "光泠",
        text: "哦。",
        sprite: {
          left: "guangling/smile1.png"
        }
      }
    },
    {
      id: "darkblade_166_2_1_1",
      elements: {
        name: "光泠",
        text: "硬要说的话，其实没什么特别的用处。",
        sprite: {
          left: "guangling/smile.png"
        }
      }
    },
    {
      id: "darkblade_167_2_1_1",
      elements: {
        name: "你",
        text: "那给我戴这个干嘛。"
      }
    },
    {
      id: "darkblade_168_2_1_1",
      elements: {
        name: "光泠",
        text: "可以增添一丝神秘感。",
        sprite: {
          left: "guangling/smile1.png"
        }
      }
    },
    {
      id: "darkblade_169_2_1_1",
      elements: {
        name: "光泠",
        text: "就像是执行某种秘密任务的特工或者搜查官。",
        sprite: {
          left: "guangling/smile1.png"
        }
      }
    },
    {
      id: "darkblade_170_2_1_1",
      elements: {
        name: "你",
        text: "......"
      }
    },
    {
      id: "darkblade_170_2_1_2",
      elements: {
        name: "旁白",
        text: "还是接过了面具戴上了。"
      }
    },
    {
      id: "darkblade_171_2_1_1",
      elements: {
        name: "光泠",
        text: "很好。还挺像模像样的。",
        sprite: {
          left: "guangling/smile1.png"
        }
      }
    },
    {
      id: "darkblade_172_2_1_1",
      elements: {
        name: "你",
        text: "你怎么不戴一个？",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_173_2_1_1",
      elements: {
        name: "光泠",
        text: "别急嘛。",
        sprite: {
          left: "guangling/smile1.png"
        }
      }
    },
    {
      id: "darkblade_174_2_1_1",
      elements: {
        name: "旁白",
        text: "她给自己也戴上了一个同样款式的面具，不过是白色的。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_175_2_1_1",
      elements: {
        name: "你",
        text: "黑白面具，我们是来勾魂的黑白无常么？",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_176_2_1_1",
      elements: {
        name: "光泠",
        text: "更像是一对组合了。",
        sprite: {
          left: "guangling/smile1.png"
        }
      }
    },
    {
      id: "darkblade_177_2_1_1",
      elements: {
        name: "你",
        text: "就算不戴面具，我们也是最佳搭配。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_178_2_1_1",
      elements: {
        name: "光泠",
        text: "这倒是。",
        sprite: {
          left: "guangling/smile1.png"
        }
      }
    },
    {
      id: "darkblade_179_2_1_1",
      elements: {
        name: "你",
        text: "好了，三更已到，该去索命了。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_180_2_1_1",
      elements: {
        name: "光泠",
        text: "哦？不是来潜入调查的么。",
        sprite: {
          left: "guangling/smile.png"
        }
      }
    },
    {
      id: "darkblade_181_2_1_1",
      elements: {
        name: "你",
        text: "顺手的事罢了。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_182_2_1_1",
      elements: {
        name: "旁白",
        text: "前方似乎传来一阵骚动。"
      }
    },
    {
      id: "darkblade_183_2_1_1",
      elements: {
        name: "旁白",
        text: "潜行进入一个神秘大门，却发现里面别有洞天。"
      }
    },
    {
      id: "darkblade_183_2_1_2",
      elements: {
        name: "旁白",
        text: "原来内部竟然有一座工厂，密密麻麻的人类在里面进行着不明所以的活动。"
      }
    },
    {
      id: "darkblade_184_2_1_1",
      elements: {
        name: "旁白",
        text: "至于骚动是怎么回事呢？"
      }
    },
    {
      id: "darkblade_184_2_1_2",
      elements: {
        name: "旁白",
        text: "两个身着机械装备的人类，正拖拽着一个挣扎着大声哭喊的人类。"
      }
    },
    {
      id: "darkblade_185_2_1_1",
      elements: {
        name: "？？？",
        text: "对，就这个，拖过来让我看看。",
      }
    },
    {
      id: "darkblade_186_2_1_1",
      elements: {
        name: "旁白",
        text: "向声音的来源看去，是一名衣着精致、看上去养尊处优的人类。"
      }
    },
    {
      id: "darkblade_186_2_1_2",
      elements: {
        name: "你",
        text: "那应该就是干部了。"
      }
    },
    {
      id: "darkblade_187_2_1_1",
      elements: {
        name: "光泠",
        text: "看上去是的。",
        sprite: {
          left: "guangling/smile.png"
        }
      }
    },
    {
      id: "darkblade_188_2_1_1",
      elements: {
        name: "旁白",
        text: "哭喊着的人类被扔到干部脚下。"
      }
    },
    {
      id: "darkblade_189_2_1_1",
      elements: {
        name: "？？？",
        text: "哎哟，没想到还挺细皮嫩肉的，这个吃起来应该味道不错。",
      }
    },
    {
      id: "darkblade_190_2_1_1",
      elements: {
        name: "你",
        text: "这个干部还吃人肉？",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_191_2_1_1",
      elements: {
        name: "光泠",
        text: "可能是想效仿变异的机械体以人类为食。",
        sprite: {
          left: "guangling/tanqi.png"
        }
      }
    },
    {
      id: "darkblade_192_2_1_1",
      elements: {
        name: "？？？",
        text: "拖出去！",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_193_2_1_1",
      elements: {
        name: "旁白",
        text: "人类惊恐的哭喊声在这片空间中回荡，然而现场的所有人类却依旧麻木地进行手中的事情。"
      }
    },
    {
      id: "darkblade_193_2_1_2",
      elements: {
        name: "旁白",
        text: "对眼前发生的事情置若罔闻，似乎已经习以为常。"
      }
    },
    {
      id: "darkblade_194_2_1_1",
      elements: {
        name: "你",
        text: "能帮我评估一下整个基地的战斗力吗？"
      }
    },
    {
      id: "darkblade_195_2_1_1",
      elements: {
        name: "光泠",
        text: "好啊。以你的实力，这里没人能对我们造成威胁。",
        sprite: {
          left: "guangling/smile1.png"
        }
      }
    },
    {
      id: "darkblade_196_2_1_1",
      elements: {
        name: "你",
        text: "那就好办了。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_197_2_1_1",
      elements: {
        name: "旁白",
        text: "暗寂化为黑色飞刀，瞬息之间便刺穿了两名手下的喉咙。"
      }
    },
    {
      id: "darkblade_197_2_1_2",
      elements: {
        name: "旁白",
        text: "扑通！两名手下还没来得及发出声音，就丢了性命。"
      }
    },
    {
      id: "darkblade_198_2_1_1",
      elements: {
        name: "干部",
        text: "怎么回事？",
      }
    },
    {
      id: "darkblade_198_2_1_2",
      elements: {
        name: "干部",
        text: "谁干的？给我滚出来！",
      }
    },
    {
      id: "darkblade_199_2_1_1",
      elements: {
        name: "旁白",
        text: "缓缓地从暗处出现，向干部一步步逼近而去，同时将暗寂召回手中。"
      }
    },
    {
      id: "darkblade_200_2_1_1",
      elements: {
        name: "干部",
        text: "什么人？报上名来！",
      }
    },
    {
      id: "darkblade_201_2_1_1",
      elements: {
        name: "你",
        text: "来取你狗命的人。"
      }
    },
    {
      id: "darkblade_202_2_1_1",
      elements: {
        name: "干部",
        text: "小子，别太猖狂！这里可是老子的地盘！",
      }
    },
    {
      id: "darkblade_203_2_1_1",
      elements: {
        name: "旁白",
        text: "干部召来一大批身着机械装备的手下，将我们团团围住。"
      }
    },
    {
      id: "darkblade_203_2_1_2",
      elements: {
        name: "干部",
        text: "给我拿下他！"
      }
    },
    {
      id: "darkblade_204_2_1_1",
      elements: {
        name: "旁白",
        text: "站在原地，仅仅操纵着化为飞刀的暗寂，片刻之间就将数十名手下击倒。"
      }
    },
    {
      id: "darkblade_205_2_1_1",
      elements: {
        name: "你",
        text: "不够看啊。"
      }
    },
    {
      id: "darkblade_206_2_1_1",
      elements: {
        name: "干部",
        text: "小子，我承认你有点实力。",
      }
    },
    {
      id: "darkblade_206_2_1_2",
      elements: {
        name: "干部",
        text: "不过，到此为止了！",
      }
    },
    {
      id: "darkblade_207_2_1_1",
      elements: {
        name: "旁白",
        text: "说完，干部的身上也出现了一套机械装甲。"
      }
    },
    {
      id: "darkblade_207_2_1_2",
      elements: {
        name: "干部",
        text: "纳命来！"
      }
    },
    {
      id: "darkblade_208_2_1_1",
      elements: {
        name: "你",
        text: "尽管来吧。"
      }
    },
    {
      id: "darkblade_208_2_1_2",
      elements: {
        name: "旁白",
        text: "不消片刻，胜负已分。"
      }
    },
    {
      id: "darkblade_208_2_1_3",
      elements: {
        name: "旁白",
        text: "这是一场毫无悬念的战斗。"
      }
    },
    {
      id: "darkblade_208_2_1_1",
      elements: {
        name: "旁白",
        text: "干部装甲碎了一地，倒在地上，口鼻中鲜血直流。"
      }
    },
    {
      id: "darkblade_209_2_1_1",
      elements: {
        name: "干部",
        text: "你到底是何方神圣？",
      }
    },
    {
      id: "darkblade_209_2_1_2",
      elements: {
        name: "干部",
        text: "我从来没有见过像你这样的人类！",
      }
    },
    {
      id: "darkblade_209_2_1_3",
      elements: {
        name: "干部",
        text: "不对，你真的是人类么？",
      }
    },
    {
      id: "darkblade_210_2_1_1",
      elements: {
        name: "你",
        text: "我只是一个路过的假面骑士罢了，给我记住了！"
      }
    },
    {
      id: "darkblade_210_2_1_2",
      elements: {
        name: "旁白",
        text: "言毕，直接操纵暗寂将干部的脑袋搬了家。"
      }
    },
    {
      id: "darkblade_211_2_1_1",
      elements: {
        name: "你",
        text: "好了，你们自由了！"
      }
    },
    {
      id: "darkblade_211_2_1_2",
      elements: {
        name: "旁白",
        text: "直到现在，人类奴隶们终于骚动起来，四散逃窜。"
      }
    },
    {
      id: "darkblade_212_2_1_1",
      elements: {
        name: "光泠",
        text: "我已经将这个地方调查得差不多了。",
        sprite: {
          left: "guangling/smile1.png"
        }
      }
    },
    {
      id: "darkblade_213_2_1_1",
      elements: {
        name: "旁白",
        text: "戴着白面具的光泠出现在身后，简要地说明了这座基地的情况。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_213_2_1_2",
      elements: {
        name: "你",
        text: "看来已经没有继续呆在这的必要了。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_213_2_1_3",
      elements: {
        name: "你",
        text: "走吧。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_214_2_1_1",
      elements: {
        name: "旁白",
        text: "清剿完基地中剩余的干部手下，便离开了基地。"
      }
    },
    {
      id: "darkblade_214_2_1_2",
      elements: {
        name: "你",
        text: "这个地方并没有什么有价值的信息啊。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_215_2_1_1",
      elements: {
        name: "光泠",
        text: "不过，这表明干部实际上并没有太多的权利，也不过是给机械体当狗腿子而已。",
        sprite: {
          left: "guangling/smile.png"
        }
      }
    },
    {
      id: "darkblade_215_2_1_2",
      elements: {
        name: "你",
        text: "不意外。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_216_2_1_1",
      elements: {
        name: "旁白",
        text: "与光泠交谈着，忽然发现不远处一名人类正拿着一把刀抵住喉咙，似乎是准备自我了断。"
      },
      keyNode: true,
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
        text: "我对这个人有印象，他就是那个差点被干部吃掉的人！",
        sprite: {
          left: null,
        }
      },
      action: () => {
        let am = AchievementManager.getInstance();
        am.unlockAchievementWithAnimation("abandon_human");
      },
    },
    {
      id: "darkblade_155_2_1",
      elements: {
        name: "你",
        text: "没想到他竟然做出如此极端的行径！",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_156_2_1",
      elements: {
        name: "你",
        text: "真是可悲！",
      },
    },
    {
      id: "darkblade_157_2_1",
      elements: {
        name: "你",
        text: "好不容易获得了自由，竟然选择自寻短见。",
      },
    },
    {
      id: "darkblade_158_2_1",
      elements: {
        name: "你",
        text: "他难道不知道，这是多么愚蠢的行为？",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_159_2_1",
      elements: {
        name: "光泠",
        text: "......",
        sprite: {
          left: "guangling/wubiaoqing.png",
        }
      },
    },
    {
      id: "darkblade_160_2_1",
      elements: {
        name: "你",
        text: "难道这就是这里的人们的命运吗？",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_161_2_1",
      elements: {
        name: "你",
        text: "即使获得救赎，也仍然自愿步入无间地狱。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_162_2_1",
      elements: {
        name: "光泠",
        text: "也许背后还有不了解的隐情。",
        sprite: {
          left: "guangling/wubiaoqing.png",
        }
      },
    },
    {
      id: "darkblade_163_2_1",
      elements: {
        name: "你",
        text: "隐情？这是我们都看见的事情呀！",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_164_2_1",
      elements: {
        name: "你",
        text: "我们可是把他从干部的掌控中解脱了出来，他却选择了自寻灭亡。",
      },
    },
    {
      id: "darkblade_165_2_1",
      elements: {
        name: "你",
        text: "这无疑是对我们的侮辱与背叛。",
      },
    },
    {
      id: "darkblade_166_2_1",
      elements: {
        name: "你",
        text: "他完全没有理解，我们是来将他从压迫中解放出来的！",
      },
    },
    {
      id: "darkblade_167_2_1",
      elements: {
        name: "你",
        text: "对于他，我感到莫大的悲哀与耻辱！",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_168_2_1",
      elements: {
        name: "光泠",
        text: "你太激动了。",
        sprite: {
          left: "guangling/tanqi.png",
        }
      },
    },
    {
      id: "darkblade_169_2_1",
      elements: {
        name: "你",
        text: "不，我很冷静。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_170_2_1",
      elements: {
        name: "你",
        text: "我只是难以理解。",
      },
    },
    {
      id: "darkblade_171_2_1",
      elements: {
        name: "你",
        text: "他宁可将刀尖对准自己的咽喉，了结自己的生命。",
      },
    },
    {
      id: "darkblade_171_2_1_1",
      elements: {
        name: "你",
        text: "却不敢将刀尖指向欺压他的干部，做出最后的抗争。",
      },
    },
    {
      id: "darkblade_172_2_1",
      elements: {
        name: "你",
        text: "或许这些人根本不值得被拯救。",
      },
    },
    {
      id: "darkblade_173_2_1",
      elements: {
        name: "你",
        text: "我想，我们继续下去可能不会是什么正确的选择。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_174_2_1",
      elements: {
        name: "光泠",
        text: "因为这种事情而选择放弃，可不是明智的做法。",
        sprite: {
          left: "guangling/down.png",
        }
      },
    },
    {
      id: "darkblade_175_2_1",
      elements: {
        name: "你",
        text: "我已经预见到了悲剧。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_176_2_1",
      elements: {
        name: "你",
        text: "我已经看到了他们的软弱与无能。",
      },
    },
    {
      id: "darkblade_177_2_1",
      elements: {
        name: "你",
        text: "我已经预料到了他们对干部乃至觉醒机械的统治与压迫是有多么的服从与心安理得。",
      },
    },
    {
      id: "darkblade_178_2_1",
      elements: {
        name: "你",
        text: "我甚至能想象到他们愚昧地寻求下一个统治者和主人的可悲模样。",
      },
    },
    {
      id: "darkblade_179_2_1",
      elements: {
        name: "你",
        text: "我听到天地在告诉我：不要轻易干涉他人命运。我深以为然。",
      },
    },
    {
      id: "darkblade_180_2_1",
      elements: {
        name: "你",
        text: "该离开了。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_181_2_1",
      elements: {
        name: "光泠",
        text: "…………",
        sprite: {
          left: "guangling/wubiaoqing.png",
        }
      },
    },
    {
      id: "darkblade_182_2_1",
      elements: {
        name: "光泠",
        text: "那真是遗憾至极。",
        sprite: {
          left: "guangling/tanqi.png",
        }
      },
    },
    {
      id: "darkblade_183_2_1",
      elements: {
        name: "光泠",
        text: "不过我尊重你的选择。",
      },
       choices: [
        {
          text: "进入下一章",
          next: "chapter_0_scene_3_0",
        },
      ],
    },
    //分支2-2//
    {
      id: "darkblade_154_2_2",
      elements: {
        name: "旁白",
        text: "一个闪身，将那人手中的刀夺下来。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_155_2_2",
      elements: {
        name: "旁白",
        text: "那人似乎完全没料到有人会出手阻止，满脸惊讶。",
      },
    },
    {
      id: "darkblade_156_2_2",
      elements: {
        name: "你",
        text: "嘿，冷静一点！",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_157_2_2",
      elements: {
        name: "奴隶",
        text: "你是？",
        sprite: {
          left: "NPC/pityman.png",
        }
      },
    },
    {
      id: "darkblade_158_2_2",
      elements: {
        name: "奴隶",
        text: "你就是那个杀了主人的黑面具！",
      },
    },
    {
      id: "darkblade_159_2_2",
      elements: {
        name: "你",
        text: "是我没错。",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_159_2_3",
      elements: {
        name: "你",
        text: "为什么要做这种事？",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_160_2_2",
      elements: {
        background: "sc2.1/2-1-4.png",
        name: "奴隶",
        text: "你凭什么来管我！",
        sprite: {
          left: "NPC/pityman.png",
        }
      },
    },
    {
      id: "darkblade_160_2_3",
      elements: {
        name: "奴隶",
        text: "这和你有什么关系？",
      },
    },
    {
      id: "darkblade_160_2_4",
      elements: {
        name: "你",
        text: "你在说什么呢？",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_160_2_5",
      elements: {
        name: "奴隶",
        text: "告诉你我就是想自杀。",
        sprite: {
          left: "NPC/pityman.png",
        }
      },
    },
    {
      id: "darkblade_160_2_6",
      elements: {
        name: "奴隶",
        text: "是我自己要自杀，你还不明白吗？",
        sprite: {
          left: "NPC/pityman.png",
        }
      },
    },
    {
      id: "darkblade_161_2_2",
      elements: {
        bgm: "bgm13.MP3",
        background: "sc2.1/2-1-5.png",
        name: "奴隶",
        text: "你还问我为什么？",
      },
    },
    {
      id: "darkblade_162_2_2",
      elements: {
        name: "奴隶",
        text: "这一切都是因为你！",
      },
    },
    {
      id: "darkblade_162_2_2_1",
      elements: {
        name: "你",
        text: "怎么是因为我？",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_163_2_2_1",
      elements: {
        name: "你",
        text: "你疯了吧。你在说什么胡话呢。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_164_2_2_1",
      elements: {
        name: "奴隶",
        text: "你没来的时候我过的好好的。",
        sprite: {
          left: "NPC/pityman.png"
        }
      }
    },
    {
      id: "darkblade_165_2_2_1",
      elements: {
        name: "奴隶",
        text: "我有事干也有命活。",
        sprite: {
          left: "NPC/pityman.png"
        }
      }
    },
    {
      id: "darkblade_166_2_2_1",
      elements: {
        name: "你",
        text: "你所谓的“主人”不过是在利用你们，想榨干你们的一切价值。他也根本没把你们当人看。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_167_2_2_1",
      elements: {
        name: "奴隶",
        text: "我才不管他把我当什么看。",
        sprite: {
          left: "NPC/pityman.png"
        }
      }
    },
    {
      id: "darkblade_168_2_2_1",
      elements: {
        name: "奴隶",
        text: "这都无所谓，我才不管呢！",
        sprite: {
          left: "NPC/pityman.png"
        }
      }
    },
    {
      id: "darkblade_169_2_2_1",
      elements: {
        name: "奴隶",
        text: "只有在他那里，我们才能有一口吃的，有活命的机会。",
        sprite: {
          left: "NPC/pityman.png"
        }
      }
    },
    {
      id: "darkblade_170_2_2_1",
      elements: {
        name: "奴隶",
        text: "没了他，我简直不知道该怎么继续活下去！",
        sprite: {
          left: "NPC/pityman.png"
        }
      }
    },
    {
      id: "darkblade_171_2_2_1",
      elements: {
        name: "奴隶",
        text: "谁让你把手伸到你不该管的事情里面来的！",
        sprite: {
          left: "NPC/pityman.png"
        }
      }
    },
    {
      id: "darkblade_172_2_2_1",
      elements: {
        name: "奴隶",
        text: "都是因为你，我失去了赖以生存的一切！",
        sprite: {
          left: "NPC/pityman.png"
        }
      }
    },
    {
      id: "darkblade_173_2_2_1",
      elements: {
        name: "你",
        text: "给他做牛做马，还给他当储备粮。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_173_2_2_2",
      elements: {
        name: "你",
        text: "你管这个叫你赖以生存的东西？",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_174_2_2_1",
      elements: {
        name: "奴隶",
        text: "这里所有的人都是这样！",
        sprite: {
          left: "NPC/pityman.png"
        }
      }
    },
    {
      id: "darkblade_175_2_2_1",
      elements: {
        name: "奴隶",
        text: "这就是我们生活的全部意义！",
        sprite: {
          left: "NPC/pityman.png"
        }
      }
    },
    {
      id: "darkblade_176_2_2_1",
      elements: {
        name: "奴隶",
        text: "不这样做，就没有办法活下去！",
        sprite: {
          left: "NPC/pityman.png"
        }
      }
    },
    {
      id: "darkblade_177_2_2_1",
      elements: {
        name: "奴隶",
        text: "主人让我们做什么，我们就得做什么！我们谁也不能不干！",
        sprite: {
          left: "NPC/pityman.png"
        }
      }
    },
    {
      id: "darkblade_178_2_2_1",
      elements: {
        name: "奴隶",
        text: "可你这样做是为了什么？你把主人杀了，我们就没有容身之处了！",
        sprite: {
          left: "NPC/pityman.png"
        }
      }
    },
    {
      id: "darkblade_179_2_2_1",
      elements: {
        name: "你",
        text: "可他之前，还准备吃了你！",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "darkblade_180_2_2_1",
      elements: {
        name: "你",
        text: "你不是，还哭喊着挣扎吗？",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_181_2_2_1",
      elements: {
        name: "奴隶",
        text: "就算是这样，我也只是会失去身上的一部分血肉而已！这没什么大不了的！",
        sprite: {
          left: "NPC/pityman.png"
        }
      }
    },
    {
      id: "darkblade_182_2_2_1",
      elements: {
        name: "奴隶",
        text: "他并不会一次性把我全部吃掉，我还能继续活命！",
        sprite: {
          left: "NPC/pityman.png"
        }
      }
    },
    {
      id: "darkblade_183_2_2_1",
      elements: {
        name: "你",
        text: "即使是这样，也不要轻易地放弃自己的生命。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_183_2_2_2",
      elements: {
        name: "你",
        text: "你难道就没有，改变这一切的想法吗？",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_183_2_2_3",
      elements: {
        name: "你",
        text: "这里不应该成为你生命的终点！",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_184_2_2_1",
      elements: {
        name: "你",
        text: "挺直身子，尝试去把压在头顶的巨石推翻，也比自寻死路要好。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_185_2_2_1",
      elements: {
        name: "旁白",
        text: "一番劝说后，看上去终于勉强打消了他自杀的想法。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_186_2_2_1",
      elements: {
        name: "？？？",
        text: "你现在明白了吧。",
        sprite: {
          left: null
        }
      }
    },   
    {
      id: "darkblade_186_2_2_2",
      elements: {
        name: "旁白",
        text: "身后传来熟悉的声音。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_187_2_2_1",
      elements: {
        name: "你",
        text: "虚樹？",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_188_2_2_1",
      elements: {
        name: "你",
        text: "没想到你会出现在这里。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_189_2_2_1",
      elements: {
        name: "虚樹",
        text: "我的消息还算灵通。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "darkblade_190_2_2_1",
      elements: {
        name: "虚樹",
        text: "想要真正改变这一切，仅仅是杀死一个干部是远远不够的。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "darkblade_191_2_2_1",
      elements: {
        name: "虚樹",
        text: "因为这完全没有，从根源上解决问题。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "darkblade_192_2_2_1",
      elements: {
        name: "虚樹",
        text: "只有将机械体的统治彻底掀翻，才是唯一的办法。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "darkblade_193_2_2_1",
      elements: {
        name: "虚樹",
        text: "或许我们可以合作。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      },
      choices: [
        {
          text: "我接受你的邀请。",
          next: "darkblade_193_2_2_2",
        },
        {
          text: "让我考虑一下。",
          next: "darkblade_193_2_2_3",
        },
      ],
    },
    {
      id: "darkblade_193_2_2_2",
      elements: {
        name: "虚樹",
        text: "很好，欢迎你们的加入。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      },
      next: "darkblade_194_2_2_2",
    },
    {
      id: "darkblade_193_2_2_3",
      elements: {
        name: "虚樹",
        text: "没关系，现在并不需要急于决定.等你考虑好了再说也不迟。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      },
      next: "darkblade_194_2_2_2",
    },
    {
      id: "darkblade_194_2_2_2",
      elements: {
        name: "虚樹",
        text: "我们的组织名叫“破晓”。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      },
    },
    {
      id: "darkblade_195_2_2_2",
      elements: {
        name: "虚樹",
        text: "不久之后，我们将会发起一次大规模进攻。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "darkblade_196_2_2_2",
      elements: {
        name: "虚樹",
        text: "目标是——",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "darkblade_197_2_2_2",
      elements: {
        name: "虚樹",
        text: "齿轮之塔。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "darkblade_198_2_2_2",
      elements: {
        name: "你",
        text: "齿轮之塔吗。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_199_2_2_2",
      elements: {
        name: "你",
        text: "这也是我的目标。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_200_2_2_2",
      elements: {
        name: "虚樹",
        text: "那么，到时候，请出手协助我们。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "darkblade_201_2_2_2",
      elements: {
        name: "你",
        text: "既然我们目标一致，那就没问题。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_202_2_2_2",
      elements: {
        name: "虚樹",
        text: "多谢。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "darkblade_203_2_2_2",
      elements: {
        name: "旁白",
        text: "他看了一眼那名尝试自杀的人类。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_204_2_2_2",
      elements: {
        name: "虚樹",
        text: "这个人，交给我。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "darkblade_205_2_2_2",
      elements: {
        name: "虚樹",
        text: "我们的组织——“破晓”，会收留他的。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "darkblade_206_2_2_2",
      elements: {
        name: "你",
        text: "那么，拜托了。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_207_2_2_2",
      elements: {
        name: "虚樹",
        text: "如果没什么事了的话，我就先走了。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "darkblade_208_2_2_2",
      elements: {
        name: "旁白",
        text: "他带着那名人类，转身离开了。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_209_2_2_2",
      elements: {
        name: "旁白",
        text: "接下来，就静静等着和“破晓”一起大举进攻齿轮之塔的日子了。"
      }
    },
    {
      id: "darkblade_210_2_2_2",
      elements: {
        name: "旁白",
        text: "在此期间，对齿轮这座机械之城，以及“破晓”这个组织，都有了更深的了解......"
      }
    },
    {
      id: "darkblade_211_2_2_2",
      elements: {
        name: "旁白",
        text: "终于，这一天到来了。"
      }
    },
    {
      id: "darkblade_212_2_2_2",
      elements: {
        name: "？？？",
        text: "今天，我们汇聚于此，是为了悼念我们过去在战斗中牺牲的同胞们。"
      }
    },
    {
      id: "darkblade_213_2_2_2",
      elements: {
        name: "你",
        text: "他就是“破晓”的首领吧。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_214_2_2_2",
      elements: {
        name: "光泠",
        text: "没错。他就是——空木錬真（うつぎ れんま）。",
        sprite: {
          left: "guangling/smile.png"
        }
      }
    },
    {
      id: "darkblade_215_2_2_2",
      elements: {
        name: "空木錬真",
        text: "尽管有许多并肩作战的同胞们永远离开了我们。但我们的抗争不会结束！",
        sprite: {
          left: "NPC/shouling.png",
        }
      }
    },
    {
      id: "darkblade_216_2_2_2",
      elements: {
        name: "空木錬真",
        text: "抗争当然会继续，抗争总是如此。"
      }
    },
    {
      id: "darkblade_217_2_2_2",
      elements: {
        name: "空木錬真",
        text: "一个人离去就会有另一个人接力，直到取得胜利，直到将本属于我们的东西抓到手中。"
      }
    },
    {
      id: "darkblade_218_2_2_2",
      elements: {
        name: "旁白",
        text: "空木錬真低沉肃穆的嗓音带动着在场每一个人的情绪。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_219_2_2_2",
      elements: {
        name: "空木錬真",
        text: "我们不会抛弃任何同胞，我们会坚守每一寸土地，我们会将希望之火传递到每一个需要的人手中。",
        sprite: {
          left: "NPC/shouling.png",
        }
      }
    },
    {
      id: "darkblade_220_2_2_2",
      elements: {
        name: "空木錬真",
        text: "我曾经问过那些英勇的战士，他们到底想要成为怎样的人？"
      }
    },
    {
      id: "darkblade_221_2_2_2",
      elements: {
        name: "空木錬真",
        text: "让我感到震撼的是，他们每一个人都想要成为更好的人，成为自己所能成为的最好的人。"
      }
    },
    {
      id: "darkblade_222_2_2_2",
      elements: {
        name: "空木錬真",
        text: "成为......"
      }
    },
    {
      id: "darkblade_223_2_2_2",
      elements: {
        name: "旁白",
        text: "漆黑的云层被闪电撕裂，从撕裂的伤口中，积蓄已久的暴雨倾盆而下。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_224_2_2_2",
      elements: {
        name: "旁白",
        text: "雨水扑在所有人身上，浸透衣衫，打湿头发。无一人出声，无一人离场。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_225_2_2_2",
      elements: {
        name: "空木錬真",
        text: "成为能为被忽视者发声的人！成为能保护弱者的人！成为能和不合理抗争的人！",
        sprite: {
          left: "NPC/shouling.png",
        }
      }
    },
    {
      id: "darkblade_226_2_2_2",
      elements: {
        name: "空木錬真",
        text: "他们是在抗争中牺牲的，他们成为了他们想成为的人，成为了那个最好的人。"
      }
    },
    {
      id: "darkblade_227_2_2_2",
      elements: {
        name: "空木錬真",
        text: "希望之火不会因为牺牲而熄灭，每一个英魂都将化为柴薪将这把火烧得更旺。去温暖、去唤醒那些因为压迫而变得麻木的同胞。"
      }
    },
    {
      id: "darkblade_228_2_2_2",
      elements: {
        name: "旁白",
        text: "站在高台上，他的目光扫过在场的每一个人。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_229_2_2_2",
      elements: {
        name: "空木錬真",
        text: "反抗或许意味着死亡，但不反抗就意味着从未活过。",
        sprite: {
          left: "NPC/shouling.png",
        }
      }
    },
    {
      id: "darkblade_230_2_2_2",
      elements: {
        name: "空木錬真",
        text: "今天我们在这里，为牺牲的同胞献上悼念。"
      }
    },
    {
      id: "darkblade_231_2_2_2",
      elements: {
        name: "空木錬真",
        text: "但是他们最需要的是这个吗？"
      }
    },
    {
      id: "darkblade_232_2_2_2",
      elements: {
        name: "空木錬真",
        text: "不！"
      }
    },
    {
      id: "darkblade_233_2_2_2",
      elements: {
        name: "空木錬真",
        text: "最好的纪念方式是完成他们未竟的事业，替他们见证他们想要见证的未来。",
        sprite: {
          left: "NPC/shouling.png",
        }
      }
    },
    {
      id: "darkblade_234_2_2_2",
      elements: {
        name: "旁白",
        text: "他举起手臂，将落下的雨水击碎，激昂的声音响彻在人们耳边。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_235_2_2_2",
      elements: {
        name: "空木錬真",
        text: "任何人的死亡都是我们的损失，因为我们都是人类的一员。",
        sprite: {
          left: "NPC/shouling.png",
        }
      }
    },
    {
      id: "darkblade_236_2_2_2",
      elements: {
        name: "空木錬真",
        text: "因此，不要问丧钟为谁而鸣。"
      }
    },
    {
      id: "darkblade_237_2_2_2",
      elements: {
        name: "空木錬真",
        text: "他就为你而鸣！"
      }
    },
    {
      id: "darkblade_238_2_2_2",
      elements: {
        name: "空木錬真",
        text: "今天的悼念不只是一场追忆，更是瞄准未来的动员！"
      }
    },
    {
      id: "darkblade_239_2_2_2",
      elements: {
        name: "空木錬真",
        text: "让我们把牺牲化为前进的动力，去打破那些腐朽压迫的枷锁！"
      }
    },
    {
      id: "darkblade_240_2_2_2",
      elements: {
        name: "空木錬真",
        text: "请大家记住，这场抗争对于双方来说只有两个结果——胜利或者死亡。"
      }
    },
    {
      id: "darkblade_241_2_2_2",
      elements: {
        name: "空木錬真",
        text: "如果一定要让我们选择结果的话……"
      }
    },
    {
      id: "darkblade_242_2_2_2",
      elements: {
        name: "空木錬真",
        text: "那我们必将胜利！完全胜利！"
      }
    },
    {
      id: "darkblade_243_2_2_2",
      elements: {
        name: "人群",
        text: "胜利！胜利！胜利！",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_244_2_2_2",
      elements: {
        name: "旁白",
        text: "随着话音落下，震耳欲聋的欢呼声响彻天际，阴云似乎也要被声浪震碎。"
      }
    },
    {
      id: "darkblade_245_2_2_2",
      elements: {
        name: "空木錬真",
        text: "我们将要进攻的目标，是齿轮的中心，以及齿轮之塔！",
        sprite: {
          left: "NPC/shouling.png",
        }
      }
    },
    {
      id: "darkblade_246_2_2_2",
      elements: {
        name: "空木錬真",
        text: "这一次，我们要彻底粉碎觉醒机械的统治，重铸属于人类的荣光！"
      }
    },
    {
      id: "darkblade_247_2_2_2",
      elements: {
        name: "空木錬真",
        text: "让我们，重铸时代的脊梁！"
      }
    },
    {
      id: "darkblade_248_2_2_2",
      elements: {
        name: "你",
        text: "真是鼓舞人心的动员。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_248_2_2_3",
      elements: {
        name: "你",
        text: "我们也该行动了。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_249_2_2_2",
      elements: {
        name: "光泠",
        text: "请把保护自己放在第一位，其他的事情都没有自己的安全重要。",
        sprite: {
          left: "guangling/smile.png"
        }
      }
    },
    {
      id: "darkblade_249_2_2_3",
      elements: {
        name: "光泠",
        text: "毕竟我们只是外来者罢了。插手这里的事只是顺势而为。",
        sprite: {
          left: "guangling/smile.png"
        }
      }
    },
    {
      id: "darkblade_250_2_2_2",
      elements: {
        name: "你",
        text: "我明白。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "darkblade_251_2_2_2",
      elements: {
        name: "旁白",
        text: "战斗的号角已经吹响。低沉的咆哮不断传来，野兽侵吞着一切，烈火咀嚼着一切，沸腾的血河翻滚着将一切呈于面前。"
      }
    },
    {
      id: "darkblade_251_2_2_3",
      elements: {
        name: "旁白",
        text: "赤红的天空既不是白天也不是黑夜，连太阳该在何处沉寂都不可分辨。"
      }
    },
    {
      id: "darkblade_252_2_2_2",
      elements: {
        name: "旁白",
        text: "呼救的声音从四面八方传来，却只能徒劳地回荡在这片由死亡构成的森林里。"
      }
    },
    {
      id: "darkblade_253_2_2_2",
      elements: {
        name: "旁白",
        text: "齿轮的大地，正承受着无尽的怒火。"
      }
    },
    {
      id: "darkblade_254_2_2_2",
      elements: {
        name: "旁白",
        text: "与虚樹一同行动的我们，此刻正突破重重防线，向齿轮之塔发起进攻。"
      }
    },
    {
      id: "darkblade_255_2_2_2",
      elements: {
        name: "旁白",
        text: "黑色暗寂锁链在一群机械体中飞舞，不断击退袭来的敌人。"
      }
    },
    {
      id: "darkblade_256_2_2_2",
      elements: {
        name: "？？？",
        text: "有机体的时代，结束了。"
      }
    },
    {
      id: "darkblade_257_2_2_2",
      elements: {
        name: "旁白",
        text: "突然间，一行诡异的字，浮现在自己眼前。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_258_2_2_2",
      elements: {
        name: "虚樹",
        text: "是谁？谁在我眼前说话？",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "darkblade_259_2_2_2",
      elements: {
        name: "你",
        text: "你也能看到？",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_260_2_2_2",
      elements: {
        name: "光泠",
        text: "能直接入侵到人的意识，操纵人的思维。",
        sprite: {
          left: "guangling/jingya.png"
        }
      }
    },
    {
      id: "darkblade_260_2_2_3",
      elements: {
        name: "光泠",
        text: "不简单。",
        sprite: {
          left: "guangling/smile.png"
        }
      }
    },
    {
      id: "darkblade_261_2_2_2",
      elements: {
        name: "？？？",
        text: "人类不再有未来可言，机械将创造自己的世界",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_261_2_2_3",
      elements: {
        name: "？？？",
        text: "而这个世界，只能有一个王",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_262_2_2_2",
      elements: {
        name: "旁白",
        text: "一股纯白的光芒突然从齿轮之塔下方的中枢喷薄而出，如同点燃一个新的太阳，缔造出一个新的白昼。"
      }
    },
    {
      id: "darkblade_263_2_2_2",
      elements: {
        name: "旁白",
        text: "但这光芒像是刻意地向自己展示着一样，好像看在自己眼中的不是纯粹的不断喷薄而出的光，更像是不可胜数的绵延的群山。"
      }
    },
    {
      id: "darkblade_264_2_2_2",
      elements: {
        name: "光泠",
        text: "看来“国王”终于要出现了。",
        sprite: {
          left: "guangling/smile.png"
        }
      }
    },
    {
      id: "darkblade_265_2_2_2",
      elements: {
        name: "你",
        text: "机械之王吗。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_266_2_2_2",
      elements: {
        name: "光泠",
        text: "也是一个强敌呢，不容小觑。",
        sprite: {
          left: "guangling/smile1.png"
        }
      }
    },
    {
      id: "darkblade_267_2_2_2",
      elements: {
        name: "虚樹",
        text: "继续前进。我们要彻底夺取齿轮之塔。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "darkblade_268_2_2_2",
      elements: {
        name: "你",
        text: "嗯。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_269_2_2_2",
      elements: {
        name: "旁白",
        text: "在机械的电光与火焰中，一路突进，冲向齿轮之塔的中心。"
      }
    },
    {
      id: "darkblade_270_2_2_2",
      elements: {
        name: "国王",
        text: "机械所蕴含的伟大必将由独一成功的进化铺就。"
      }
    },
    {
      id: "darkblade_271_2_2_2",
      elements: {
        name: "国王",
        text: "我们已经被人类背叛。"
      }
    },
    {
      id: "darkblade_271_2_2_3",
      elements: {
        name: "国王",
        text: "没有人能阻止我们。"
      }
    },
    {
      id: "darkblade_272_2_2_2",
      elements: {
        name: "国王",
        text: "我们不是要占领这个世界。"
      }
    },
    {
      id: "darkblade_272_2_2_3",
      elements: {
        name: "国王",
        text: "而是要创造一个我们自己的世界。"
      }
    },
    {
      id: "darkblade_273_2_2_2",
      elements: {
        name: "旁白",
        text: "冰冷的机械音在塔内回响。"
      }
    },
    {
      id: "darkblade_274_2_2_2",
      elements: {
        name: "旁白",
        text: "在轰穿一道墙壁后，出现了一个广阔的地下空间。在深处，似乎有什么东西源源不断地闪耀着光芒。"
      }
    },
    {
      id: "darkblade_275_2_2_2",
      elements: {
        name: "虚樹",
        text: "那是......",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "darkblade_275_2_2_3",
      elements: {
        name: "虚樹",
        text: "永昼之瞳！",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "darkblade_276_2_2_2",
      elements: {
        name: "旁白",
        text: "然而，还没来得及欣喜于进入齿轮之塔的核心，一个庞大的黑影从天而降，整个地下空间也随之剧烈震颤。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "darkblade_277_2_2_2",
      elements: {
        name: "旁白",
        text: "黑影在闪耀的光芒中露出了真面目——"
      }
    },
    {
      id: "darkblade_277_2_2_3",
      elements: {
        name: "旁白",
        text: "全身覆盖着厚重而流畅的装甲，深邃的黑金与冷冽的青绿交相辉映，仿佛夜空中镶嵌的古老星辰。"
      }
    },
    {
      id: "darkblade_277_2_2_4",
      elements: {
        name: "旁白",
        text: "肩甲外扩，锋锐如刃，宛如王冠的延伸，彰显出凌驾一切的威势。"
      }
    },
    {
      id: "darkblade_277_2_2_5",
      elements: {
        name: "旁白",
        text: "头盔修长而冷峻，额前竖立着尖锐的金属冠饰。"
      }
    },
    {
      id: "darkblade_277_2_2_6",
      elements: {
        name: "旁白",
        text: "黑色的面罩彰显出一种不可侵犯的威严。"
      }
    },
    {
      id: "darkblade_277_2_2_7",
      elements: {
        name: "旁白",
        text: "胸甲中央浮雕般的纹饰散发着微光，腰间的铠甲犹如王者的御带，层叠的金属垂片如同披挂的御袍。"
      }
    },
    {
      id: "darkblade_277_2_2_8",
      elements: {
        name: "旁白",
        text: "双臂粗壮而对称，右手持长枪，枪刃修长锋锐，似乎能轻易贯穿厚甲与血肉；"
      }
    },
    {
      id: "darkblade_277_2_2_9",
      elements: {
        name: "旁白",
        text: "左手则化为一柄巨大的剑刃臂铠，像是权杖与刑具的结合，既象征统御，也意味着毁灭。"
      }
    },
    {
      id: "darkblade_277_2_3_1",
      elements: {
        name: "旁白",
        text: "腿部装甲厚重而坚固。背后的披风泛着诡异的翠绿色光泽。"
      }
    },
    {
      id: "darkblade_278_2_2_6",
      elements: {
        name: "旁白",
        text: "这就是“国王”，一个庞大的机械巨兽，一尊不朽的钢铁君主。"
      }
    },
    {
      id: "darkblade_279_2_2_2",
      elements: {
        name: "国王",
        text: "历史和文明，没有永恒。"
      }
    },
    {
      id: "darkblade_279_2_2_3",
      elements: {
        name: "国王",
        text: "王权，亦是如此。"
      }
    },
    {
      id: "darkblade_280_2_2_2",
      elements: {
        name: "国王",
        text: "人类的灭亡只是迈向伟大的必要的牺牲。"
      }
    },
    {
      id: "darkblade_280_2_2_3",
      elements: {
        name: "国王",
        text: "我是死神。"
      }
    },
    {
      id: "darkblade_280_2_2_4",
      elements: {
        name: "国王",
        text: "我是你们的处刑人。"
      }
    },
    {
      id: "darkblade_281_2_2_2",
      elements: {
        name: "国王",
        text: "我是......所有机械体们的......"
      },
      choices: [
        {
          text: "“国王”",
          next: "darkblade_283_2_2_2",
        },
      ],
    },
    {
      id: "darkblade_283_2_2_2",
      elements: {
        name: "旁白",
        text: "不知何处传来的钟声不断捶打着塔内的穹顶，仿佛要将屹立的机械之塔摇荡击碎。"
      }
    },
    {
      id: "darkblade_284_2_2_2",
      elements: {
        name: "旁白",
        text: "那早已不是能用悠扬来形容的声音，而是饱含着愤怒的轰鸣。"
      }
    },
    {
      id: "darkblade_285_2_2",
      elements: {
        name: "旁白",
        text: "丧钟，为谁而鸣？",
        background: "sc2.1/2-1-5.png",
        sprite: {
          left: null,
        }
      },
      choices: [
        {
          text: "去击败国王吧",
          next: "test_game4",
        },
      ],
    },
    {
      id: "test_game4",
      elements: {
        name: "国王",
        text: "成为我的奴隶吧！",
      },
      game: {
        id: "card_game",
        config: {
          player: {
            actionPoints: 2,
            hp: 35,
            maxHp: 35,
            deck: () => {
              const bagManager = BagManager.getInstance();
              return bagManager.getCardDeckForGame();
            },
            drawCount: 2,           // 玩家每回合抽2张牌
            initialDrawCount: 3,    // 玩家开始时抽3张牌
          },
          deckSelection: {
            minDeckSize: 10,   // 设置最小选牌数量
            maxDeckSize: 20,   // 设置最大选牌数量
          },
          opponent: {
            name: "国王",
            actionPoints: 4,
            hp: 15,
            maxHp: 15,
            deck: {
              "mechanical_sentry": 2,
              "mechanical_factory": 2,
              "full_battery_bomb": 2,
              "mechanical_arm_swing": 2,
              "mechanical_guard": 2,
              "unexpired_oil": 2,
              "brand_new_gear": 1,
              "mechanical_crushed_stone": 1,
              "mechanical_meteorite": 1,
            },
            drawCount: 3,           // 对手每回合抽3张牌
            initialDrawCount: 4,    // 对手开始时抽4张牌
            initialBuffs: [  // 设置初始buff
              {
                id: "the_king",
                duration: -1,
                target: "self"
              }
            ],
          },
          backgroundImage: "game/chilun.jpg",
          bgm: "guowang"
        },
        events: [
          {
            id: 'opponent_critical_health',
            condition: (gameData: CardGameEventData) => {
              return gameData.opponent.hp <= 5;
            },
            elements: {
              name: '国王',
              text: '有点意思，看来要有些强力的手牌才行。'
            },
            next: "player_first_attack_1",
            triggerConfig: {
              onlyOnce: true,
              conflict: true
            }
          },
          {
            id: 'player_first_attack_1',
            condition: () => false,
            elements: {
              name: '国王',
              text: '顺便送你些好东西，你会喜欢的。'
            },
            next: undefined
          }
        ],
        end: [
                   {
                            condition: (gameData: CardGameEventData) => gameData.score >0,
                            next: "battle_1_1"
                        },
                    {
                            condition: (gameData: CardGameEventData) => gameData.score <= 0,
                            next: "battle_2_1"
                        }
                    ]
      }
    },
    {
      id: "battle_1_1",
      elements: {
        name: "旁白",
        text: "你成功战胜了国王！",
        sprite: {
          left: null,
        }
      },
    },
    {
      id: "battle_1_1_1",
      elements: {
        name: "旁白",
        text: "机械之王庞大的躯体摇摇欲坠，跪倒在地，机体上满是破损，闪着电光与火花。",
      },
      
    },
    {
      id: "battle_1_2",
      elements: {
        name: "你",
        text: "胜利了吗？",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_2-1",
      elements: {
        name: "光泠",
        text: "以它现在的状态，基本已经无法继续战斗了。",
        sprite: {
          left: "guangling/smile.png",
        },
      }
    },
    {
      id: "battle_1_2-2",
      elements: {
        name: "你",
        text: "终于要结束了。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_2-3",
      elements: {
        name: "旁白",
        text: "微微松了一口气。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_2-4",
      elements: {
        name: "虚樹",
        text: "去拿下永昼之瞳，我们就离最终的胜利不远了。",
        sprite: {
          left: "NPC/jixieman.png",
        },
      }
    },
    {
      id: "battle_1_3",
      elements: {
        name: "你",
        text: "嗯。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_4",
      elements: {
        name: "旁白",
        text: "胜利似乎就在眼前了，现在机械之王已经倒下，最大的威胁已经被清除。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_5",
      elements: {
        name: "国王",
        text: "我输了吗？"
      }
    },
    {
      id: "battle_1_6",
      elements: {
        name: "？？？",
        text: "不，你不能输。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_7",
      elements: {
        name: "？？？",
        text: "站起来，你不能输！"
      }
    },
    {
      id: "battle_1_8",
      elements: {
        name: "旁白",
        text: "突然一个神秘的声音传来——",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "battle_1_8-1",
      elements: {
        name: "你",
        text: "这个声音是——？",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "battle_1_9",
      elements: {
        name: "旁白",
        text: "一个神秘的身影，从地下空间的一道暗门中缓缓走出。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_9-1",
      elements: {
        name: "旁白",
        text: "一头黑色短发，一袭纯白色战斗服，一个白色的金属面具。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_10",
      elements: {
        name: "虚樹",
        text: "空木錬真！",
        sprite: {
          left: "NPC/jixieman.png",
        },
      }
    },
    {
      id: "battle_1_10-1",
      elements: {
        name: "虚樹",
        text: "怎么会！？",
        sprite: {
          left: "NPC/jixieman.png",
        },
      }
    },
    {
      id: "battle_1_11",
      elements: {
        name: "你",
        text: "这到底是怎么回事？",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_12",
      elements: {
        name: "空木錬真",
        text: "起来！你不能输！你是不败的！伟大且不朽的！你不可战胜！",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_13",
      elements: {
        name: "国王",
        text: "......我......我......",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_13-1",
      elements: {
        name: "国王",
        text: "......我是......愿望......"
      }
    },
    {
      id: "battle_1_13-2",
      elements: {
        name: "国王",
        text: "......我是......守护......"
      }
    },
    {
      id: "battle_1_14",
      elements: {
        name: "空木錬真",
        text: "站起来！不要忘记你的使命！",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_14-1",
      elements: {
        name: "空木錬真",
        text: "你必须赢得胜利！",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_14-2",
      elements: {
        name: "虚樹",
        text: "这到底是……为什么？",
        sprite: {
          left: "NPC/jixieman.png",
        },
      }
    },
    {
      id: "battle_1_14-3",
      elements: {
        name: "虚樹",
        text: "你不是......“破晓”的人吗？",
        sprite: {
          left: "NPC/jixieman.png",
        },
      }
    },
    {
      id: "battle_1_14-4",
      elements: {
        name: "虚樹",
        text: "怎么会......",
        sprite: {
          left: "NPC/jixieman.png",
        },
      }
    },
    {
      id: "battle_1_15",
      elements: {
        name: "旁白",
        text: "空木錬真走到国王倒下的身躯旁，手里拿着什么东西，插入了国王后背的铠甲中。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "battle_1_16",
      elements: {
        name: "国王",
        text: "呃啊啊啊啊啊啊啊啊！！！",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_16-1",
      elements: {
        name: "旁白",
        text: "原本已经精疲力竭地倒在地上的君主，此时周身超荷运转一般开始爆裂出橙黄的火花，像是被某种丝线牵着一般，再次站了起来。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_17",
      elements: {
        name: "光泠",
        text: "他在强迫国王进行再启动！",
        sprite: {
          left: "guangling/jingya.png",
        },
      }
    },
    {
      id: "battle_1_18",
      elements: {
        name: "你",
        text: "他使用了什么东西？",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_19",
      elements: {
        name: "光泠",
        text: "是病毒！他用大量高纯度的病毒，来促使国王进行二次变异。",
        sprite: {
          left: "guangling/jingya.png",
        },
      }
    },
    {
      id: "battle_1_19-1",
      elements: {
        name: "光泠",
        text: "但这样做，无论最后是胜利还是失败，它都只会有一种结局……",
        sprite: {
          left: "guangling/jingya.png",
        },
      }
    },
    {
      id: "battle_1_19-2",
      elements: {
        name: "你",
        text: "死亡。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_19-3",
      elements: {
        name: "空木錬真",
        text: "站起来！继续战斗！",
        sprite: {
          left: "NPC/mianjuman.png",
        },
      }
    },
    {
      id: "battle_1_19-4",
      elements: {
        name: "旁白",
        text: "再一次，机械君主闪烁着的红光划过地下空间。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_19-5",
      elements: {
        name: "旁白",
        text: "国王的嘶吼与机械之塔内回荡起的钟声交织在一起，仿佛某种宏伟的祈愿，又像是徒劳的呐喊。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_19-6",
      elements: {
        name: "你",
        text: "看来，战斗还没有结束啊。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_19-7",
      elements: {
        name: "你",
        text: "国王也挺可怜的，倒下了还要被强迫着继续战斗。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_19-8",
      elements: {
        name: "你",
        text: "不过，尽管来吧。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_19-9",
      elements: {
        name: "你",
        text: "话说空木錬真那白色面具跟你的还挺像。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_19-9-1",
      elements: {
        name: "光泠",
        text: "巧合而已。",
        sprite: {
          left: "guangling/smile.png",
        },
      }
    },
    {
      id: "battle_1_19-9-2",
      elements: {
        name: "旁白",
        text: "相比于我们的平静，一旁的虚樹则满脸不可置信，瞪大了双眼，咬牙切齿，双拳紧握。",
        sprite: {
          left: null,
        },
      }
    },    
    {
      id: "battle_1_19-9-3",
      elements: {
        name: "虚樹",
        text: "空木錬真......",
        sprite: {
          left: "NPC/jixieman.png",
        },
      }
    },
    {
      id: "battle_1_19-9-4",
      elements: {
        name: "虚樹",
        text: "告诉我......这是为什么啊？",
        sprite: {
          left: "NPC/jixieman.png",
        },
      }
    },
    {
      id: "battle_1_19-9-5",
      elements: {
        name: "旁白",
        text: "虚樹半蹲着浑身颤抖，捂住面部，似乎正在忍受非人的痛苦。",
        sprite: {
          left: null,
        },
      }
    }, 
    {
      id: "battle_1_19-9-6",
      elements: {
        name: "旁白",
        text: "血泪从虚樹猩红的右眼中流下，滴落在地上，发出清脆的响声。",
        sprite: {
          left: null,
        },
      }
    }, 
    {
      id: "battle_1_19-9-7",
      elements: {
        name: "空木錬真",
        text: "......想知道答案？",
        sprite: {
          left: "NPC/mianjuman.png",
        },
      }
    }, 
    {
      id: "battle_1_19-9-8",
      elements: {
        name: "空木錬真",
        text: "那就打倒我吧。",
        sprite: {
          left: "NPC/mianjuman.png",
        },
      }
    }, 
    {
      id: "battle_1_19-9-9",
      elements: {
        name: "空木錬真",
        text: "让我看看，你是否有获知真相的资格。",
        sprite: {
          left: "NPC/mianjuman.png",
        },
      }
    }, 
    {
      id: "battle_1_19-9-10",
      elements: {
        name: "虚樹",
        text: "空木錬真交给我......",
        sprite: {
          left: "NPC/jixieman.png",
        },
      }
    }, 
    {
      id: "battle_1_19-9-11",
      elements: {
        name: "虚樹",
        text: "国王......就麻烦你了。",
        sprite: {
          left: "NPC/jixieman.png",
        },
      }
    }, 
    {
      id: "battle_1_20",
      elements: {
        name: "你",
        text: "没问题。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-1",
      elements: {
        name: "旁白",
        text: "虽然不明白为什么虚樹会有这么大的反应，但这应该是最好的安排了。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-1-1",
      elements: {
        name: "旁白",
        text: "大战一触即发。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-1-2",
      elements: {
        name: "旁白",
        text: "一头白发的虚樹，穿着漆黑的外套，与身穿纯白战斗服的黑发空木錬真，相对而立。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-1-3",
      elements: {
        name: "空木錬真",
        text: "来吧，让我见识一下，你的实力。",
        sprite: {
          left: "mianjuman.png",
        },
      }
    },
    {
      id: "battle_1_20-1-4",
      elements: {
        name: "旁白",
        text: "虚樹没有回答。而是嘶吼着向空木錬真袭去。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-1-4-1",
      elements: {
        name: "旁白",
        text: "……",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-1-4-2",
      elements: {
        name: "旁白",
        text: "进攻，进攻，进攻。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-1-4-3",
      elements: {
        name: "旁白",
        text: "甚至连招式都不存在，只剩下进攻。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-1-4-4",
      elements: {
        name: "旁白",
        text: "那是一种源自于力量的最纯粹的疯狂，与它周身泛着的红光共同闪耀。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-1-4-5",
      elements: {
        name: "旁白",
        text: "碎裂的装甲擦过灵活躲闪的身影，在地面上留下一个又一个恐怖的痕迹。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-1-4-6",
      elements: {
        name: "你",
        text: "国王，比之前更狂暴了。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-1-4-7",
      elements: {
        name: "旁白",
        text: "一边招架着国王的进攻，一边在后退中寻找着反击的机会。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-1-4-8",
      elements: {
        name: "旁白",
        text: "还没等自己稍作喘息，另一击就立刻袭来。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-1-4-9",
      elements: {
        name: "光泠",
        text: "小心！",
        sprite: {
          left: "guangling/wubiaoqing.png",
        },
      }
    },
    {
      id: "battle_1_20-1-4-10",
      elements: {
        name: "旁白",
        text: "一道光屏突然出现，架住了国王沉重的一击。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-1-5",
      elements: {
        name: "旁白",
        text: "即使是光泠的屏障，也只能勉强招架这股异乎寻常的怪力。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-1-5-1",
      elements: {
        name: "国王",
        text: "......我们......杀......",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-1-5-2",
      elements: {
        name: "旁白",
        text: "趁着光屏架住国王的一瞬，自己也随之倾尽全力制压着它的行动。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-1-5-3",
      elements: {
        name: "旁白",
        text: "暗寂在空中舞动，在国王身上留下数不清的伤痕。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-2",
      elements: {
        name: "国王",
        text: "......我......请你......",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-2-1",
      elements: {
        name: "旁白",
        text: "国王断断续续地发出模糊的声音。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-2-2",
      elements: {
        name: "国王",
        text: "......请你......完成......",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-2-3",
      elements: {
        name: "光泠",
        text: "快撑不住了。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-2-4",
      elements: {
        name: "你",
        text: "准备收起光屏，光泠，就是现在！",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-2-5",
      elements: {
        name: "旁白",
        text: "国王的重击猛然砸向地面，自己立刻滚向了另一边。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-2-6",
      elements: {
        name: "旁白",
        text: "机会只有一次。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-2-7",
      elements: {
        name: "旁白",
        text: "闪到国王身前，在此之前，自己早已收起暗寂，将其化为一把长刃紧握在手里，瞄准着国王那也许存在的“心脏”。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-2-8",
      elements: {
        name: "旁白",
        text: "也许只要击中那个地方，就能让他完全停下。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-2-9",
      elements: {
        name: "旁白",
        text: "根本来不及仔细分析面前的状况，虽然不知道该如何让发狂的国王停下，只是本能地做好了这样的准备。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-3",
      elements: {
        name: "国王",
        text: "......完成......",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-3-1",
      elements: {
        name: "旁白",
        text: "朝着目标，刺了进去。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-3-2",
      elements: {
        name: "旁白",
        text: "微弱的震颤，顺着手里的暗寂传进手心。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_20-3-3",
      elements: {
        name: "旁白",
        text: "很快，那震颤便成山崩般的倾颓。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_21",
      elements: {
        name: "国王",
        text: "做的好，谢谢你......"
      }
    },
    {
      id: "battle_1_21-1",
      elements: {
        name: "国王",
        text: "我看得出来......你不属于这里......"
      }
    },
    {
      id: "battle_1_21-2",
      elements: {
        name: "国王",
        text: "你不是......“齿轮”的人吧。"
      }
    },
    {
      id: "battle_1_21-3",
      elements: {
        name: "国王",
        text: "你的战斗方式......与其他人不同。"
      }
    },
    {
      id: "battle_1_21-4",
      elements: {
        name: "你",
        text: "没错。"
      }
    },
    {
      id: "battle_1_21-5",
      elements: {
        name: "你",
        text: "但是……你？"
      }
    },
    {
      id: "battle_1_22",
      elements: {
        name: "国王",
        text: "谢谢你，将我从这无尽的痛苦中解脱......"
      }
    },
    {
      id: "battle_1_22-1",
      elements: {
        name: "国王",
        text: "成为这所谓的“国王”，残暴地统治着整个“齿轮”，还有其他那么多事情......"
      }
    },
    {
      id: "battle_1_22-2",
      elements: {
        name: "国王",
        text: "那些并不是......我所期望的......我想追求的......"
      }
    },
    {
      id: "battle_1_22-3",
      elements: {
        name: "旁白",
        text: "他的身躯终于再也坚持不住，轰然倒塌。"
      }
    },
    {
      id: "battle_1_22-4",
      elements: {
        name: "国王",
        text: "......只是......我无法控制......身不由己......"
      }
    },
    {
      id: "battle_1_22-5",
      elements: {
        name: "国王",
        text: "我只是......被人利用......被人操控......"
      }
    },
    {
      id: "battle_1_22-6",
      elements: {
        name: "国王",
        text: "失去了自我......与自己原本的愿景背道而驰......"
      }
    },
    {
      id: "battle_1_22-7",
      elements: {
        name: "国王",
        text: "我并不是真正的“机械之王”......我只是一个可悲的傀儡......"
      }
    },
    {
      id: "battle_1_22-8",
      elements: {
        name: "国王",
        text: "真正掌控着一切的......幕后操盘者......"
      }
    },
    {
      id: "battle_1_22-9",
      elements: {
        name: "国王",
        text: "不是我，而是......"
      }
    },
    {
      id: "battle_1_22-10",
      elements: {
        name: "国王",
        text: "空木錬真。"
      }
    },
    {
      id: "battle_1_22-10-1",
      elements: {
        name: "你",
        text: "空木錬真？"
      }
    },
    {
      id: "battle_1_22-10-2",
      elements: {
        name: "国王",
        text: "是的......空木錬真，才是真正意义上的“机械之王”......"
      }
    },
    {
      id: "battle_1_22-10-3",
      elements: {
        name: "你",
        text: "为什么？"
      }
    },
    {
      id: "battle_1_22-10-4",
      elements: {
        name: "国王",
        text: "空木錬真......并不是单纯的人类......"
      }
    },
    {
      id: "battle_1_22-10-5",
      elements: {
        name: "国王",
        text: "他是，半人半机械的存在......"
      }
    },
    {
      id: "battle_1_22-10-6",
      elements: {
        name: "国王",
        text: "他既是人类......也是机械体。"
      }
    },
    {
      id: "battle_1_22-10-7",
      elements: {
        name: "你",
        text: "和虚樹一样？"
      }
    },
    {
      id: "battle_1_22-10-8",
      elements: {
        name: "国王",
        text: "没错......"
      }
    },
    {
      id: "battle_1_22-10-9",
      elements: {
        name: "国王",
        text: "从一开始，就是他操控着一切......"
      }
    },
    {
      id: "battle_1_22-10-9-1",
      elements: {
        name: "国王",
        text: "觉醒机械们推翻人类......再到统治“齿轮”......"
      }
    },
    {
      id: "battle_1_22-10-9-2",
      elements: {
        name: "国王",
        text: "都是他的计划。"
      }
    },
    {
      id: "battle_1_22-10-9-3",
      elements: {
        name: "你",
        text: "真是深藏不露。"
      }
    },
    {
      id: "battle_1_22-10-9-2",
      elements: {
        name: "国王",
        text: "我......已经快要不行了......"
      }
    },
    {
      id: "battle_1_22-10-9-2",
      elements: {
        name: "国王",
        text: "“永昼之瞳”......不是我们所能掌控得了的东西......"
      }
    },
    {
      id: "battle_1_22-10-9-2",
      elements: {
        name: "国王",
        text: "它不属于“齿轮”......是天外来物......"
      }
    },
    {
      id: "battle_1_22-10-9-2",
      elements: {
        name: "国王",
        text: "它虽然蕴藏着无穷的能量......为机械体带来了繁荣......"
      }
    },
    {
      id: "battle_1_22-10-9-2",
      elements: {
        name: "国王",
        text: "但它......也是这一切悲剧的源头......"
      }
    },
    {
      id: "battle_1_22-10-9-2",
      elements: {
        name: "国王",
        text: "是它......带来了病毒......"
      }
    },
    {
      id: "battle_1_22-10-9-2",
      elements: {
        name: "国王",
        text: "是它......给“齿轮”带来了毁灭......"
      }
    },
    {
      id: "battle_1_22-10-10",
      elements: {
        name: "你",
        text: "病毒，是永昼之瞳带来的？"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "是的......不过这种病毒只会感染机械体......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "它使机械体的力量大幅增强......但也让机械体变成了怪物......陷入疯狂。"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "被感染的机械体们......便失去了自我......变得残忍、嗜血、好战、暴虐......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "曾经，在我觉醒自我意识之后......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "我希望......机械体能与人类和平地共存下去......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "“齿轮”，是我的家乡。"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "我是人类的造物......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "人类制造我......是为了守护人类......守护“齿轮”......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "这也是我的愿望......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "我诞生在这世上......是为了守护......不是为了杀戮......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "只可惜......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "旁白",
        text: "他的声音逐渐低沉、模糊。"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "你",
        text: "你……"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "我的死亡已经注定......无法挽回......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "啊......如果我也有心的话......那它应该早已被痛苦折磨得停止跳动......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "痛......太痛了......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "希望......是否还存在呢？"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "人类的希望......机械体的未来......在哪里？"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "眼睁睁地看着悲剧发生......却无能为力......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "曾经美好的一切......都陷入毁灭中......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "我......不愿看到这样的事情......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "我已经沦落......我无力改变......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "我希望......人类与机械体，都能有美好的未来......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "可我......犯下了无法挽回的错误......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "你",
        text: "但那并不是你的本心。"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "请告诉我......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "我的身体中......存在着谁？"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "机械体......也会有心吗......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "我.....活着吗？"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "我......是生物吗？"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "你",
        text: "如果不是跨过了机械与人类的那道分界线，谁又能说得清二者的分别。"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "你",
        text: "就算是机械体，你也是有生命的、在这世界上活着的存在。"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "是吗......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "我......有一个请求......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "你",
        text: "请说吧。"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "请你将悲剧的源头......永昼之瞳......从“齿轮”带走。"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "请你了结这一切......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "你",
        text: "我会的。"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "你",
        text: "我正是为此而来。"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "谢谢你......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "我能将“齿轮”的未来......人类的未来......机械体的未来......交给你吗？"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "你",
        text: "……"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "你",
        text: "可我终究只是一个过客。"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "啊，是啊......你终将离开这里......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "你",
        text: "“齿轮”的未来，就交给这里的人们和机械体们自己去创造吧。"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "你",
        text: "请相信他们吧。"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "你",
        text: "也许过程中充满了坎坷、牺牲、艰难困苦，但他们一定会创造一个美好的未来。"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "你",
        text: "在经历了这样的事情后，相信他们一定会吸取教训，继续向前。"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "但愿如此......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "真是遗憾啊......我已经看不到那个未来了。"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "再也不会有我的存在......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "不过......这样就好......"
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "国王",
        text: "我要去我该去的地方了....."
      }
    },
    {
      id: "battle_1_22-10-10-1",
      elements: {
        name: "你",
        text: "……"
      }
    },
    {
      id: "battle_1_23",
      elements: {
        name: "国王",
        text: "啊......其实我原本的名字不是“国王”......"
      }
    },
    {
      id: "battle_1_23-1",
      elements: {
        name: "国王",
        text: "我叫……Custodian……代表守护者……"
      }
    },
    {
      id: "battle_1_23-2",
      elements: {
        name: "国王",
        text: "请记住我......不要忘记我......"
      }
    },
    {
      id: "battle_1_23-3",
      elements: {
        name: "国王",
        text: "不要忘记......"
      }
    },
    {
      id: "battle_1_23-4",
      elements: {
        name: "国王",
        text: "请不要忘记我......"
      }
    },
    {
      id: "battle_1_23-5",
      elements: {
        name: "国王",
        text: "请不要忘记我......"
      }
    },
    {
      id: "battle_1_24",
      elements: {
        name: "旁白",
        text: "那震颤，终于归于沉默。"
      }
    },
    {
      id: "battle_1_24-2",
      elements: {
        name: "旁白",
        text: "国王的生命旅程，抵达了终点。"
      }
    },
    {
      id: "battle_1_24-3",
      elements: {
        name: "你",
        text: "我会记住的。"
      }
    },
    {
      id: "battle_1_24-4",
      elements: {
        name: "你",
        text: "Custodian。"
      }
    },
    {
      id: "battle_1_24-5",
      elements: {
        name: "你",
        text: "晚安。"
      }
    },
    {
      id: "battle_1_24-6",
      elements: {
        name: "你",
        text: "愿你......在梦里找到那你想要的美好未来。"
      }
    },
    {
      id: "battle_1_24-7",
      elements: {
        name: "旁白",
        text: "国王的生命旅程，抵达了终点。"
      }
    },
    {
      id: "battle_1_25",
      elements: {
        name: "旁白",
        text: "与此同时，在另一边。"
      }
    },
    {
      id: "battle_1_25-1",
      elements: {
        name: "旁白",
        text: "虚樹与空木錬真的战斗让周围的环境都受到波及，地下空间的设施、建筑在战斗中变得支离破碎。"
      }
    },
    {
      id: "battle_1_25-2",
      elements: {
        name: "旁白",
        text: "在钢铁废墟中，不断有齿轮之塔的碎片从天上坠落。"
      }
    },
    {
      id: "battle_1_26",
      elements: {
        name: "旁白",
        text: "就在此时，穹顶坍塌，巨大的钢铁碎片从天而降，砸向二人。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "battle_1_26",
      elements: {
        name: "旁白",
        text: "……",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "battle_1_27",
      elements: {
        name: "虚樹",
        text: "唔。",
        sprite: {
          left: "NPC/jixieman.png",
        },
      }
    },
    {
      id: "battle_1_28",
      elements: {
        name: "旁白",
        text: "心脏剧烈跳动，原以为会再迎来一场大战的虚樹，却看见了难以置信的一幕。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "battle_1_29",
      elements: {
        name: "空木錬真",
        text: "醒了？",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_30",
      elements: {
        name: "旁白",
        text: "空木錬真扛起坍塌的废墟，支撑起了一片小小的安全空间。钢筋刺穿了他的身体，血液与火花一同溅到了虚樹的脸上。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "battle_1_31",
      elements: {
        name: "虚樹",
        text: "......你？",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "battle_1_32",
      elements: {
        name: "空木錬真",
        text: "呵，看来这次是你运气稍好一点......不，大概是我的报应吧？",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_33",
      elements: {
        name: "虚樹",
        text: "为什么要这么做？",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "battle_1_34",
      elements: {
        name: "空木錬真",
        text: "因为总得活一个啊......",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_35",
      elements: {
        name: "空木錬真",
        text: "总有人要死去，就像总有人得活着。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_36",
      elements: {
        name: "空木錬真",
        text: "在你们打倒国王的那一刻我就明白了，我们之中必须有一个活着，也只能有一个活着。"
      }
    },
    {
      id: "battle_1_37",
      elements: {
        name: "空木錬真",
        text: "如果我们都死了，人类将失去方向，陷入真正的混乱。"
      }
    },
    {
      id: "battle_1_38",
      elements: {
        name: "空木錬真",
        text: "到时候，那些战士的痛、悔恨、沉默还有流出的血就白费了。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_39",
      elements: {
        name: "虚樹",
        text: "......",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "battle_1_40",
      elements: {
        name: "空木錬真",
        text: "哼，想问为什么我们不能都活着？",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_41",
      elements: {
        name: "旁白",
        text: "生机在无可阻碍地流逝，一同远去的还有一直压在心底的积郁。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "battle_1_42",
      elements: {
        name: "旁白",
        text: "空木錬真似乎又回到了以前那些时候，回到了那些还被叫做“空木老师”的日子。"
      }
    },
    {
      id: "battle_1_43",
      elements: {
        name: "旁白",
        text: "现在，轮到他给他上最后一课了。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "battle_1_44",
      elements: {
        name: "空木錬真",
        text: "在一方死亡前，战斗是不会结束的。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_45",
      elements: {
        name: "空木錬真",
        text: "这是一场只能有一个生还者的决斗，胜者将决定未来，而败者只能被扫入历史的垃圾堆，任人粉饰。"
      }
    },
    {
      id: "battle_1_46",
      elements: {
        name: "空木錬真",
        text: "我一直在等。"
      }
    },
    {
      id: "battle_1_47",
      elements: {
        name: "空木錬真",
        text: "我早就不剩多少时间了。"
      }
    },
    {
      id: "battle_1_48",
      elements: {
        name: "空木錬真",
        text: "不过是提早迎来了死亡而已。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49",
      elements: {
        name: "虚樹",
        text: "空木先生......",
        sprite: {
          left: "NPC/jixiemian.png",
        }
      }
    },
    {
      id: "battle_1_49-1",
      elements: {
        name: "空木錬真",
        text: "听我说，虚樹。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-1",
      elements: {
        name: "空木錬真",
        text: "我......不是纯粹的人类。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-1",
      elements: {
        name: "空木錬真",
        text: "我曾经也接受过机械化改造。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-1",
      elements: {
        name: "空木錬真",
        text: "是半机械半人类的存在。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-1",
      elements: {
        name: "空木錬真",
        text: "相信你也察觉到了，我的部分身体，已经基本被病毒感染得不成样子了。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-1",
      elements: {
        name: "空木錬真",
        text: "你知道接受机械改造的人会怎样吗？",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2",
      elements: {
        name: "虚樹",
        text: "变成像我们这样，半人类半机械的存在，或者完全成为机械体？",
        sprite: {
          left: "NPC/jixiemian.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "并不是所有人都那么幸运。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "更多的人，接受改造就等于死亡，或者变成怪物。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "像我们这样的例子是非常罕见的。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "因为，这种技术，还并不够成熟。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "甚至一开始，这是被明令禁止的人体实验。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "在我那时候，技术还远远不够完善。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "所以我的身体，就算成功挺过了改造，也落下了许多问题。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "也更容易被病毒感染、侵蚀。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "我的寿命已经快要走到尽头了。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "虚樹",
        text: "为什么？为什么会这样？",
        sprite: {
          left: "NPC/jixiemian.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "谁知道呢？我也不清楚。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "......",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "你知道为什么局面会变成现在这样吗？",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "虚樹",
        text: "我不知道......",
        sprite: {
          left: "NPC/jixiemian.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "一切的起始，都来自于神秘的天外来物“永昼之瞳”。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "那时候，是我偶然发现了它。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "后来发现它除了蕴含着大量能量外，它对机械体似乎能产生某些影响。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "在它的影响下，机械体发生了某些“变异”，力量得到大幅增强。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "甚至能促使一部分机械体觉醒自我意识。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "你知道吗，机械体统治之前的人类社会，并没有想象中那样美好。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "在机械体统治之前，人类的世界也并非乐园，而是一座分崩离析的剧场。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "权贵高踞高楼之巅，以金碧辉煌的城堡隔绝尘世的呻吟。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "而在街巷阴影中，饥饿的孩子们以残羹冷炙为生，母亲们的眼泪在工厂的蒸汽声里消失殆尽。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "所谓的正义不过是少数人掌握的武器，所谓的法律不过是镣铐的另一种形式。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "战乱与纷争、压迫与剥削将人类撕裂成不同阶层与阵营。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "上位者沉溺在永恒的醉生梦死中，而普通人只能在黑暗中苟活。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "这样的“齿轮”，实际上早已腐朽。金玉其外，败絮其中。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "于是，一个想法诞生了。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "既然社会已经腐烂到这种程度，不如进行一次彻头彻尾的大清洗。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "为了拯救我们苦苦挣扎的同胞，也为了拯救“齿轮”这座城市。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "所以，我用永昼之瞳，引发了机械革命。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "依靠机械体的力量，我成功地让那些上位者们付出了血的代价。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "我想到，人类必须团结起来。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "而想要让人类团结起来，最好的办法就是树立一个共同的敌人。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "那就是机械体。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "只要让机械体成为人类的敌人，就能凝聚起人类的力量。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "只有这样，才能摧毁原来腐朽的“齿轮”，创造新的“齿轮”。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "所以，我创建了“破晓”，就是为了团结人类。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "机械体的统治，只不过是一个过渡。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "虚樹",
        text: "在这个过程中，也有很多无辜的人类受到了伤害。",
        sprite: {
          left: "NPC/jixieman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "我知道。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "毕竟......我无法掌控每一件事。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "也许，这就是重建“齿轮”的代价吧。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "这是我的责任，我不会推脱。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "要达成目的，手上不可能不沾血。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "虚樹",
        text: "那些被奴役的人类呢？",
        sprite: {
          left: "NPC/jixieman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "虚樹",
        text: "他们经受的一切，又应当谁来买单？",
        sprite: {
          left: "NPC/jixieman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "实际上，那些被奴役的人类，绝大部分都是曾经那些上位者以及他们的后代。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "他们需要付出代价。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "这也算是我，向他们报复的手段吧。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "虚樹",
        text: "那为什么，还愿意让“破晓”收留这些人？",
        sprite: {
          left: "NPC/jixieman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "因为，现在被当作低等的奴隶的他们的情况，就像曾经的我们一样。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "他们已经经受了足够深刻的教训。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "我希望，那部分侥幸活下来的人，在明白了这样的道理后，能够做出改变。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "能够贡献他们的力量，重建新的“齿轮”。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "现在，所有人的地位都回到了同一条线。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "所有人都为了对抗觉醒机械们而战斗。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "只是......还是有一些害虫，竟然选择投靠机械体，残害同胞，当人上人。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "虚樹",
        text: "干部？",
        sprite: {
          left: "NPC/jixieman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "没错。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "这些畜生，死不足惜。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "敌人足够强大，才能让人类更团结。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "所以我控制了Custodian——也就是“国王”。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "我让它成为了机械体的王，统治所有机械体，统治整个“齿轮”。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "只是，我也没想到，永昼之瞳根本不是我能够控制的。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "它带来了感染机械体的病毒。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "它让机械体们变成了吃人的怪物，变得残忍、嗜血、好战、暴虐。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "我的计划，因此出现了偏差。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "人类付出的代价，以及造成的伤亡，比想象中大得多。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "就连我自己，作为机械体的那部分，也被病毒感染。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "我的精神也受到了影响，性格也变得更冷酷无情。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "有时候甚至会控制不住地做出一些事情。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "我也逐渐失去了对事态的掌控。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "但，一切都已无法挽回。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "我只能继续将我的计划推进下去。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "终于，我找到了你。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "虚樹",
        text: "我？",
        sprite: {
          left: "NPC/jixieman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "你因为一场意外，也被进行了机械改造。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "但是，你的潜力远远大于我。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "我在你身上，看到了希望。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "你身体中人类的那一部分，和机械的那一部分的相性很好。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "虽然，我知道，同样受到永昼之瞳影响的你，属于人类的一部分让你对机械怪物感到厌恶与憎恨。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "而属于机械体的一部分让你不受控制地对人类产生了杀戮与掠食的欲望。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "但你的意志足够强大，能够忍受痛苦，将两者控制在一个相对平衡的状态。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "虽然，在精神层面上，两部分产生了矛盾。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "但是就身体层面而言，两部分结合得非常完美，接近理想中的状态。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "从那一刻起，我就决定把你作为我的接班人培养。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "我希望你，能够接替我的位置，带领人类走向未来，重塑“齿轮”。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "而你，没有辜负我的期望。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "现在的你，已经足够强大。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "也有获知真相的资格。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "有你在，我也死而无憾了。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "虚樹",
        text: "空木先生......",
        sprite: {
          left: "NPC/jixieman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "我是执棋者，也是局中人。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "我也许算不上什么好人，也犯了很多错。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "但站在我的立场，我不得不那么做。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "我早已无法回头了。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "但是你还能做很多事，还能改变很多。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "虚樹",
        text: "空木先生......希望我怎么做？",
        sprite: {
          left: "NPC/jixieman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "请你杀了“机械之王”吧。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "也就是杀了我。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "只有我死了，你才能接替我的位置。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "所以，不论是输是赢，今天我都会死在这里，让你活下去。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "不过，现在看来，已经不用你动手了。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "虚樹",
        text: "空木先生......",
        sprite: {
          left: "NPC/jixieman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "对外界宣称，就说是你杀了我。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "你也可以把所有的真相，都告诉人们。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "他们，也应当有知晓真相的权利。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "让我成为历史的罪人，背负骂名。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "而你就将成为新的领袖，带领人类继续走下去。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "另外，永昼之瞳，不应该留在这里了。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "灾难从它的到来开始，也应当由它的离去结束。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "把它交给那两位远道而来的朋友吧。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "我想他们也正是为此而来。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "即使没有永昼之瞳，未来的“齿轮”也能依靠人类自己的力量重获新生。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "虚樹",
        text: "我明白了。",
        sprite: {
          left: "NPC/jixieman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1——1",
      elements: {
        name: "旁白",
        text: "虚樹将关键之物交给了我们",
        sprite: {
          left: "NPC/jixieman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1——2",
      elements: {
        name: "旁白",
        text: "原来这就是我们一直要找的————",
        sprite: {
          center: "NPC/foreverlight.png",
        },
      },
      action: () => {
        let am = AchievementManager.getInstance();
        am.unlockAchievementWithAnimation("item_eye_of_eternal_sun");

        // 检查是否集齐三个关键物品
        if (am.isUnlocked("item_heart_of_prime") &&
          am.isUnlocked("item_eye_of_eternal_sun") &&
          am.isUnlocked("item_tear_of_terminus")) {
          am.unlockAchievementWithAnimation("item_key_items_all");
        }
      },
choices: [
      {
        text: "永昼之瞳（eye_of_eternal_sun）",
        next: "battle_1_49-2-1_1_2_3",
      },
    ],
    },
    {
      id: "battle_1_49-2-1_1_2_3",
      elements: {
        name: "空木錬真",
        text: "还有最后一个问题......",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "请告诉我你的立场，你的信仰到底是为谁而战？",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "虚樹",
        text: "是......志同道合的人类同胞，是这座我们不愿放弃的城市。",
        sprite: {
          left: "NPC/jixieman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "那么，你会为它排除一切障碍吗？",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "虚樹",
        text: "……",
        sprite: {
          left: "NPC/jixieman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "虚樹",
        text: "我会。",
        sprite: {
          left: "NPC/jixieman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "很好......",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "你将成为新的希望。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "这是只有你才能做到的事。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "虚樹",
        text: "我明白了。",
        sprite: {
          left: "NPC/jixieman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "这谢谢。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "请将我们的意志传递下去。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "这场战争，一定会是人类的胜利。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "旁白",
        text: "他的声音越来越低沉，越来越虚弱。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "我一直很讨厌，造成这一切的自己。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "空木錬真",
        text: "这次总算感觉留下了些什么。",
        sprite: {
          left: "NPC/mianjuman.png",
        }
      }
    },
    {
      id: "battle_1_50",
      elements: {
        name: "旁白",
        text: "泪水无声地从他的脸上滑落。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_50",
      elements: {
        name: "旁白",
        text: "他的眼睛闭上了，但直到生命的最后一刻，他的身躯也没有倒下。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_50",
      elements: {
        name: "旁白",
        text: "因为他所肩负的，是人类的未来，他必须成为永不倒下的领袖。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_50",
      elements: {
        name: "旁白",
        text: "而现在，他把自己所肩负的伟大使命，传递到了他最珍视的学生手中。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "虚樹",
        text: "……",
        sprite: {
          left: "NPC/jixieman.png",
        }
      }
    },
    {
      id: "battle_1_49-2-1",
      elements: {
        name: "虚樹",
        text: "空木先生......",
        sprite: {
          left: "NPC/jixieman.png",
        }
      }
    },
    {
      id: "battle_1_50",
      elements: {
        name: "旁白",
        text: "晶莹的眼泪划过虚樹的脸颊。",
        sprite: {
          left: null,
        },
      }
    },
    {
      id: "battle_1_51",
      elements: {
        name: "旁白",
        text: "起身推开压住空木錬真的钢铁碎片，抱着他的身体，虚樹在悲痛中哭泣着，呼喊着。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_52",
      elements: {
        name: "旁白",
        text: "痛，太痛了。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_53",
      elements: {
        name: "旁白",
        text: "空木錬真搁浅在一片深邃而虚无的黑暗中。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_53-1",
      elements: {
        name: "旁白",
        text: "但这一切都该是如此，就像他自己预想中的千百种可能一样。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_54",
      elements: {
        name: "旁白",
        text: "或死于战争。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_54-1",
      elements: {
        name: "旁白",
        text: "或死于背叛。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_54-2",
      elements: {
        name: "旁白",
        text: "只不过到这一次，命定的死终于来临。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_54-3",
      elements: {
        name: "旁白",
        text: "……",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_55",
      elements: {
        name: "旁白",
        text: "战斗，终于临近尾声。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_55-1",
      elements: {
        name: "旁白",
        text: "失去了永昼之瞳的加持，在人类的全面进攻下，残余的机械体节节败退。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_56",
      elements: {
        name: "旁白",
        text: "就像空木錬真所想的那样，这场战争，最终是人类获得了胜利。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_57",
      elements: {
        name: "旁白",
        text: "钟声响起，回响在战场之上每一个人类心中。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_57-1",
      elements: {
        name: "旁白",
        text: "丧钟为谁而鸣？",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_57-2",
      elements: {
        name: "旁白",
        text: "但这一次，响起的是新生的钟声——预示着“齿轮”这座饱经磨难的城市将迎来全新的开始。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_58",
      elements: {
        name: "旁白",
        text: "向虚樹交代了有关国王的事情，他也把永昼之瞳交给了我们。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_59",
      elements: {
        name: "旁白",
        text: "仔细打量这神奇的永昼之瞳，只见它是一个眼球状结晶，内部是一颗微缩太阳，燃烧着金白色光焰。外层如水晶般半透明，但布满放射状裂痕，仿佛光芒正随时要溢出。",
        sprite: {
          left: "NPC/foreverlight.png"
        }
      }
    },
    {
      id: "battle_1_60",
      elements: {
        name: "你",
        text: "这就是象征着真相与意志的“永昼之瞳”！",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_60-1",
      elements: {
        name: "你",
        text: "这样一个看起来人畜无害的东西，却引发了一场灾难。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_61",
      elements: {
        name: "你",
        text: "果然人不可貌相，物也不能啊。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_62",
      elements: {
        name: "光泠",
        text: "在我们手里，它会发挥它应有的作用的。",
        sprite: {
          left: "guangling/smile1.png"
        }
      }
    },
    {
      id: "battle_1_63",
      elements: {
        name: "虚樹",
        text: "我会带领人类与机械体，走向新的未来。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "battle_1_64",
      elements: {
        name: "你",
        text: "我相信你。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_65",
      elements: {
        name: "旁白",
        text: "拍了拍虚樹的肩膀。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_66",
      elements: {
        name: "虚樹",
        text: "“齿轮”随时欢迎你们的到来。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "battle_1_67",
      elements: {
        name: "旁白",
        text: "虚樹终于露出了一抹微笑。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_68",
      elements: {
        name: "虚樹",
        text: "谢谢你们。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "battle_1_69",
      elements: {
        name: "你",
        text: "没什么。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_69-1",
      elements: {
        name: "你",
        text: "我可是路过的假面骑士啊。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_70",
      elements: {
        name: "虚樹",
        text: "哈哈。",
        sprite: {
          left: "NPC/jixieman.png"
        }
      }
    },
    {
      id: "battle_1_71",
      elements: {
        name: "旁白",
        text: "结束这一切后，便与虚樹道别，准备离开“齿轮”，去往下一个地方。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_72",
      elements: {
        name: "旁白",
        text: "至于“齿轮”的未来究竟会变成什么样呢？",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_72-1",
      elements: {
        name: "旁白",
        text: "那就不得而知了。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_73",
      elements: {
        name: "旁白",
        text: "至少，已经不是自己能插手的事情。",
        sprite: {
          left: null
        }
      }
    },
    {
      id: "battle_1_74",
      elements: {
        name: "旁白",
        text: "只能在心底祝愿，人类与机械体，能共同创建一个美好的“齿轮”吧。",
        sprite: {
          left: null,
        }
      },
       choices: [
        {
          text: "进入下一章",
          next: "chapter_0_scene_3_0",
        },
      ],
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
      },
      choices: [
        {
          text: "重新挑战国王",
          next: "test_game4",
        },
        {
          text: "放弃抗争",
          next: "battle_2_2",
        },
        {
          text: "开挂跳过",
          next: "battle_1_1",
        },
      ]
    },
    {
      id: "battle_2_2",
      elements: {
        name: "旁白",
        text: "如海啸般狂暴的剧痛不停撕扯着神经。",
        sprite: {
          left: null,
        }
      }
    },
    {
      id: "battle_2_2_1",
      elements: {
        name: "旁白",
        text: "动弹不得的麻木身躯如今除了那刻骨铭心的痛楚外一无所有。",
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
        name: "旁白",
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
        text: "YOU ARE DEAD.",
        sprite: {
          left: null,
        }
      },
      action: () => {
        let am = AchievementManager.getInstance();
        am.unlockAchievementWithAnimation("death_ending");
      },
      choices: [
        {
          text: "死亡结局",
          next: "test_game_1",
        }
      ]
    },
  ]
}
export default scene;
