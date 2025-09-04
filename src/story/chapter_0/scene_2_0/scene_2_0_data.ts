import { Scene } from '../../../types/SceneTypes';
import { ArchiveManager } from '../../../components/ArchiveManager';
import { CardManager } from '../../../components/mini_games/card_game';
// 定义第2幕场景
const scene: Scene = {
id: "chapter_0_scene_2_0",
    title: "第2幕:斑牛镇",
nodes: [
        {
            id: "mother_1",
            elements: {
                background: "sc0.1/待定.png",
                name: "旁白",
                text: "妈妈今天死了，但也有可能是在昨天。直到现在，我都无法确定。"
            },
        },
        {
            id: "mother_2",
            elements: {
                background: "sc0.1/待定.png",
                name: "旁白",
                text: "养老院只是发来了一封无比简洁的电报：“令堂身故，明日下葬，节哀。"
            },
        },
        {
            id: "mother_3",
            elements: {
                background: "sc0.1/待定.png",
                name: "旁白",
                text: "这反而让妈妈去世的日期变得更加扑朔迷离。"
            },
        },
{
            id: "mother_4",
            elements: {
                background: "sc0.1/待定.png",
                name: "旁白",
                text: "我想，昨天的可能性也许更大。要请假两天了。"
            },
        },
        {
        id: "office_1",
        elements: {
            name: "老板",
            text: "是吗？你的母亲去世了......"
        }
    },
    {
        id: "office_2",
        elements: {
            name: "我",
            text: "对不起先生，但这也不是我的过错。"
        }
    },
    {
        id: "office_3",
        elements: {
            name: "旁白",
            text: "老板似乎很不情愿，但实在找不到什么好的说辞，最后还是批准了我的请求。"
        }
    },
    {
        id: "office_4",
        elements: {
            name: "旁白",
            text: "不过离开后我才觉得自己不该那样说。"
        }
    },
    {
        id: "office_4",
        elements: {
            name: "旁白",
            text: "毕竟我没做什么需要道歉的事，明明是他应当对我表示同情。"
        }
    },
    {
        id: "road_1",
        elements: {
            name: "旁白",
            text: "汽车驶往养老院，路途中的炎热让我昏昏欲睡。"
        }
    },
    {
        id: "road_1",
        elements: {
            name: "旁白",
            text: "我在距离养老院两公里的地方下了车，徒步走了过去。"
        }
    },
    {
        id: "nursing_home_1",
        elements: {
            name: "旁白",
            text: "院长每天都有很多事务需要处理，我不得不在一旁耐心等待。直到院长从办公室里探出身子示意。"
        }
    },
    {
        id: "nursing_home_2",
        elements: {
            name: "院长",
            text: "您母亲在这里过得不错，还交了朋友。"
        }
    },
    {
        id: "nursing_home_3",
        elements: {
            name: "院长",
            text: "您要不要再看母亲最后一眼？"
        },
        choices: [
        {
            text: "好。",
            next: "nursing_home_3_1"
        },
        {
            text: " 不用了。",
            next: "nursing_home_3_2"
        },
    ]
    },
    {
        id: "nursing_home_3_1",
        elements: {
            name: "旁白",
            text: "院长点点头，准备让我把握这最后的机会。"
        },
    },
{
        id: "nursing_home_3_1_1",
        elements: {
            name: "旁白",
            text: "还是算了吧。我突然觉得有些疲倦。"
        },
    },
{
        id: "nursing_home_3_1_2",
        elements: {
            name: "院长",
            text: "好吧，您说了算。"
        },
        next:"ending"
    },
{
        id: "nursing_home_3_2",
        elements: {
            name: "你",
            text: "我感觉有些疲倦了。"
        },
    },
{
        id: "nursing_home_3_2_1",
        elements: {
            name: "院长",
            text: "好吧，您说了算。"
        },
        next:"ending"
    },
{
        id: "ending",
        elements: {
            name: "旁白",
            text: "老实说，我是真的感到困倦，眼皮沉重。"
        },
    },
{
    id: "wake_1",
    elements: {
        name: "旁白",
        text: "守灵的夜晚，老人们哭泣。"
    }
},
{
    id: "wake_2",
    elements: {
        name: "旁白",
        text: "有人偷偷看我，似乎在等待我落泪。"
    }
},
{
    id: "wake_3",
    elements: {
        name: "旁白",
        text: "我低下头，点烟，眼睛被烟呛得发酸，像要流泪，但那只是生理反应。"
    }
},
{
    id: "wake_4",
    elements: {
        name: "我",
        text: "如果我哭，他们就会安心吧？"
    }
},
{
    id: "wake_5",
    elements: {
        name: "旁白",
        text: "我心里想。"
    }
},
{
    id: "wake_6",
    elements: {
        name: "旁白",
        text: "可母亲死了，这是一个事实。。"
    }
},
{
    id: "wake_7",
    elements: {
        name: "旁白",
        text: "不管我哭不哭都不会改变。"
    }
},
{
    id: "wake_8",
    elements: {
        name: "旁白",
        text: "守灵的夜晚，老人们哭泣。"
    }
},
{
    id: "wake_9",
    elements: {
        name: "旁白",
        text: "有人偷偷看我，似乎在等待我落泪。"
    }
},
{
    id: "wake_10",
    elements: {
        name: "我",
        text: "我低下头，点烟。"
    }
},
{
    id: "wake_11",
    elements: {
        name: "旁白",
        text: "眼睛被烟呛得发酸，像要流泪，但那只是生理反应。"
    }
},
{
    id: "wake_12",
    elements: {
        name: "你",
        text: "如果我哭，他们就会安心吧？（我心想）可母亲死了，这是一个事实，不管我哭不哭都不会改变。"
    }
},
{
    id: "wake_12",
    elements: {
        name: "你",
        text: "可母亲死了，这是一个事实，不管我哭不哭都不会改变。"
    }
},
{
    id: "wake_13",
    elements: {
        name: "旁白",
        text: "守灵的夜晚，老人们哭泣。"
    }
},
{
    id: "wake_14",
    elements: {
        name: "旁白",
        text: "有人偷偷看我，似乎在等待我落泪。"
    }
},
{
    id: "wake_15",
    elements: {
        name: "我",
        text: "葬礼当天，太阳火辣辣地烤着大地。"
    }
},
{
    id: "wake_16",
    elements: {
        name: "旁白",
        text: "眼睛被烟呛得发酸，像要流泪，但那只是生理反应。"
    }
},
{
    id: "wake_17",
    elements: {
        name: "旁白",
        text: "我的西装被汗水浸透，身体被压得发闷。"
    }
},
{
    id: "wake_18",
    elements: {
        name: "旁白",
        text: "脚下的尘土腻，阳光让我眼前发白。"
    }
},
{
    id: "wake_19",
    elements: {
        name: "我",
        text: " 我听见有人叹气，也感受到周围投来不解和审视的目光。"
    }
},
{
    id: "wake_20",
    elements: {
        name: "旁白",
        text: "可我真的很疲惫。我认为我已经做了我能做的,只想早点结束这一切。"
    }
},
{
    id: "beach_1",
    elements: {
        name: "旁白",
        text: "星期六，玛丽来到了我家。"
    }
},
{
    id: "beach_2",
    elements: {
        name: "旁白",
        text: "她身穿一件红白条纹裙子，脚上穿一双皮凉鞋，丰满的乳房轮廓清晰可见。"
    }
},
{
    id: "beach_3",
    elements: {
        name: "旁白",
        text: "在微微晒黑的皮肤衬托下，她的脸庞像一朵娇艳欲滴的花朵。"
    }
},
{
    id: "beach_4",
    elements: {
        name: "旁白",
        text: "当她出现在我眼前的那一刻，我几乎无法克制自己的欲望。"
    }
},
{
    id: "beach_6",
    elements: {
        name: "旁白",
        text: "我们搭乘公交车去一个海滩游泳。"
    }
},
{
    id: "beach_7",
    elements: {
        name: "旁白",
        text: "玛丽教会了我一个小游戏——游泳时，含一口浪尖上的水沫，接着翻身仰泳，最后把水沫喷向天空。"
    }
},
{
    id: "beach_8",
    elements: {
        name: "旁白",
        text: "不过没玩多久，我的嘴巴里就充满了又咸又苦的味道。"
    }
},
{
    id: "beach_9",
    elements: {
        name: "旁白",
        text: "玛丽不一会游了过来，在水下紧挨着我的身体，把她的嘴唇贴在我的嘴唇上。"
    }
},
{
    id: "beach_10",
    elements: {
        name: "旁白",
        text: "她微凉的舌头瞬间冷却了我火辣辣的双唇。"
    }
},
{
    id: "beach_11",
    elements: {
        name: "旁白",
        text: "我俩就这样在水里嬉戏了好一阵子。"
    }
},
{
    id: "beach_12",
    elements: {
        name: "旁白",
        text: "回到海滩后，我们换好衣服。"
    }
},
{
    id: "beach_13",
    elements: {
        name: "旁白",
        text: "玛丽看着我，眼睛里闪闪发光。"
    }
},
{
    id: "beach_14",
    elements: {
        name: "旁白",
        text: "我上前吻了她。"
    }
},
{
    id: "beach_15",
    elements: {
        name: "旁白",
        text: "这之后，我俩心领神会，没有再多说话。"
    }
},
 {
    id: "scene_1",
    elements: {
        name: "旁白",
        text: "一回到家，我们就立刻翻云覆雨了一番。"
    }
},
{
    id: "scene_2",
    elements: {
        name: "旁白",
        text: "第二天早上，玛丽没有离开。"
    }
},
{
    id: "scene_3",
    elements: {
        name: "玛丽",
        text: "你爱我吗？"
    }
},
{
    id: "scene_4",
    elements: {
        name: "我",
        text: "当下说的爱或者不爱没有任何意义，而且我也不确定自己是不是爱你。"
    }
},
{
    id: "scene_5",
    elements: {
        name: "旁白",
        text: "她看上去很是伤心。"
    }
},
{
    id: "scene_6",
    elements: {
        name: "旁白",
        text: "但一到午餐时间，她又莫名开心了起来。"
    }
},
{
    id: "scene_7",
    elements: {
        name: "我",
        text: "我越过餐桌，吻了她。"
    }
},
{
    id: "scene_8",
    elements: {
        name: "旁白",
        text: "突然之间，一阵激烈的打斗声从邻居雷蒙德的房间传了进来。"
    }
},
{
    id: "scene_10",
    elements: {
        name: "旁白",
        text: "不过不是什么不得了的事。雷蒙德和他的情妇起了纠纷。"
    }
},
{
    id: "scene_10_1",
    elements: {
        name: "旁白",
        text: "街坊邻居们都跑来看热闹，甚至还惹来了警察。"
    }
},
{
    id: "scene_11",
    elements: {
        name: "旁白",
        text: "先前雷蒙德怀疑女人不忠，想写信诱骗她来在惩罚她。"
    }
},
{
    id: "scene_11_1",
    elements: {
        name: "旁白",
        text: "他请我代他写信，我也没有拒绝的理由。"
    }
},
{
    id: "scene_12",
    elements: {
        name: "旁白",
        text: "雷蒙德请我为他在法庭上作证，咬定是那个女人欺骗他在先。"
    }
},
{
    id: "scene_12_1",
    elements: {
        name: "旁白",
        text: "果然，他因此获得了轻判。"
    }
},
{
    id: "scene_13",
    elements: {
        name: "旁白",
        text: "生活就是这样荒谬，我只能做好我自己。"
    }
},
{
    id: "scene_15",
    elements: {
        name: "旁白",
        text: "第二天，雷蒙德邀请我和玛丽周末去海滩度假。我没有理由不接受。"
    }
},
{
    id: "scene_16",
    elements: {
        name: "旁白",
        text: "晚上，玛丽来到我的公寓。刚进门就向我发问。"
    }
},
{
    id: "scene_17",
    elements: {
        name: "玛丽",
        text: "你愿不愿意和我结婚？"
    }
},
{
    id: "scene_18",
    elements: {
        name: "我",
        text: "如果你想的话，我们就结婚，我怎样都无所谓。"
    }
},
{
    id: "scene_19",
    elements: {
        name: "玛丽",
        text: "你到底爱不爱我？"
    }
},
{
    id: "scene_20",
    elements: {
        name: "我",
        text: "当下说的爱或者不爱没有任何意义，而且我也不确定自己是不是爱你。"
    }
},
{
    id: "scene_21",
    elements: {
        name: "玛丽",
        text: "既然你都不爱我，那为什么还准备娶我呢？"
    }
},
{
    id: "scene_22",
    elements: {
        name: "我",
        text: "这一点同样毫无意义。你愿意就结。"
    }
},
{
    id: "scene_23",
    elements: {
        name: "玛丽",
        text: "婚姻明明是一件意义重大的事情。"
    }
},
{
    id: "scene_24",
    elements: {
        name: "我",
        text: "不是的。"
    }
},
{
    id: "scene_25",
    elements: {
        name: "玛丽",
        text: "如果换了别的跟你有着恋人关系的女人向你求婚，你会答应吗？"
    }
},
{
    id: "scene_26",
    elements: {
        name: "我",
        text: "当然会。"
    }
},
{
    id: "scene_27",
    elements: {
        name: "玛丽",
        text: "我现在不知道自己爱不爱你了，而你也不确定是不是爱你。"
    }
},
{
    id: "scene_28",
    elements: {
        name: "玛丽",
        text: "你可真是个怪人。也许正是因为这一点，我才会爱上你。"
    }
},
{
    id: "scene_28_1",
    elements: {
        name: "玛丽",
        text: "但我不知道未来会不会因为相同的原因而恨透你。"
    }
},
{
    id: "scene_29",
    elements: {
        name: "旁白",
        text: "她一把挽住我的手，微笑起来。"
    }
},
{
    id: "scene_30",
    elements: {
        name: "玛丽",
        text: "我要嫁给你。"
    }
},
{
    id: "scene_31",
    elements: {
        name: "我",
        text: "只要你愿意。"
    }
},
{
    id: "scene_32",
    elements: {
        name: "我",
        text: "我想不出理由不接受。"
    }
},
{
    id: "scene_34",
    elements: {
        name: "旁白",
        text: "星期天到了。我们和雷蒙德一行人到海滩度假。"
    }
},
{
    id: "scene_34_1",
    elements: {
        name: "旁白",
        text: "天气很不错，我们遇见了两个阿拉伯人，其中一个是雷蒙德情妇的兄弟。"
    }
},
{
    id: "scene_35",
    elements: {
        name: "旁白",
        text: "他们和雷蒙德发生了冲突，用刀划伤了雷蒙德。"
    }
},
{
    id: "scene_35_1",
    elements: {
        name: "旁白",
        text: "虽然这场纠纷最后平息，但两边人各自的敌意还没消散。"
    }
},
{
    id: "scene_36",
    elements: {
        name: "旁白",
        text: "阿拉伯人密切地注视着雷蒙德的一举一动。"
    }
},
{
    id: "scene_37",
    elements: {
        name: "我",
        text: "把枪给我，你去把你的死对头引到别的地方去。"
    }
},
{
    id: "scene_38",
    elements: {
        name: "我",
        text: "只要另一个人跟去或者他拔刀，我就开枪。"
    }
},
{
    id: "scene_39",
    elements: {
        name: "旁白",
        text: "雷蒙德把枪递给了我。"
    }
},
{
    id: "scene_40",
    elements: {
        name: "旁白",
        text: "不过看来暂时还不需要开枪。"
    }
},
{
    id: "scene_41",
    elements: {
        name: "旁白",
        text: "下午，我独自回到海滩。"
    }
},
{
    id: "scene_41_1",
    elements: {
        name: "旁白",
        text: "烈日更加灼人，耀眼的阳光让我的眼睛刺痛得厉害，我感到一阵呼吸困难。"
    }
},
{
    id: "scene_42",
    elements: {
        name: "旁白",
        text: "那个阿拉伯人竟然也在这里。实在是让我始料未及。"
    }
},
{
    id: "scene_43",
    elements: {
        name: "旁白",
        text: "阿拉伯人抽出了匕首。刀刃反射出的光线像一把长矛刺向我的前额。"
    }
},
{
    id: "scene_44",
    elements: {
        name: "旁白",
        text: "汗水模糊了我的双眼。我感觉刀刃随时会割断我的睫毛，刺穿我的眼珠。"
    }
},
{
    id: "scene_45",
    elements: {
        name: "旁白",
        text: "我握紧了手枪。"
    }
},
{
    id: "scene_46",
    elements: {
        name: "旁白",
        text: "汗珠从额头滴落。"
    }
},
{
    id: "scene_47",
    elements: {
        name: "旁白",
        text: "原地爆发出震耳欲聋的巨响。"
    }
},
{
    id: "scene_48",
    elements: {
        name: "旁白",
        text: "阿拉伯人的身体倒下了。"
    }
},
{
    id: "scene_49",
    elements: {
        name: "旁白",
        text: "紧接着四次连续的响声，就像不幸之门被急促地敲响了四下。"
    }
},
{
    id: "scene_50",
    elements: {
        name: "旁白",
        text: "海滩依旧宁静祥和。"
    }
},
{
    id: "scene_51",
    elements: {
        name: "旁白",
        text: "<以上背景为海滩>"
    }
},
{
    id: "scene_52",
    elements: {
        name: "旁白",
        text: "法庭上，法官要求我把整个案发过程复述一遍。"
    }
},
{
    id: "scene_52_1",
    elements: {
        name: "旁白",
        text: "我把之前已经告诉她的事情再次说了一遍，我感觉自己像是一台复读机。"
    }
},
{
    id: "scene_53",
    elements: {
        name: "旁白",
        text: "他们谈论我为什么在母亲葬礼上不哭、为什么第二天就和女人去看电影。"
    }
},
{
    id: "scene_54",
    elements: {
        name: "旁白",
        text: "玛丽出庭作证，说出我们一起的事，法庭一片哗然。"
    }
},
{
    id: "scene_55",
    elements: {
        name: "检察官",
        text: "他没有灵魂，没有丝毫人性，没有任何一条在人类灵魂中占神圣地位的道德。"
    }
},
{
    id: "scene_56",
    elements: {
        name: "旁白",
        text: "我的律师试图为我辩解，说这是一场偶然冲突，但无人在意。"
    }
},
{
    id: "scene_57",
    elements: {
        name: "你",
        text: "我的生命只属于我自己。没有眼泪，没有哀求，没有忏悔。"
    }
},
{
    id: "scene_58",
    elements: {
        name: "你",
        text: "我认为没有必要撒谎遮掩什么，也并不感到悔恨。"
    }
},
{
    id: "scene_59",
    elements: {
        name: "你",
        text: "人生在世，永远也不该演戏作假。"
    }
},
{
    id: "scene_60",
    elements: {
        name: "旁白",
        text: "最终他们判我死刑，我进了牢房。"
    }
},
{
    id: "scene_62",
    elements: {
        name: "旁白",
        text: "起初，我期待奇迹：上诉成功，绞刑延迟，甚至刽子手突然怜悯。"
    }
},
{
    id: "scene_63",
    elements: {
        name: "旁白",
        text: "可是后来我明白，这只是自欺。"
    }
},
{
    id: "scene_63_1",
    elements: {
        name: "旁白",
        text: "死亡是必然的，无论何时，它都会到来。"
    }
},
{
    id: "scene_64",
    elements: {
        name: "旁白",
        text: "我开始学会在牢房中生活。我回忆玛丽的笑声，回忆海水拍打的声音，回忆母亲的脸。记忆成了我的陪伴。"
    }
},
{
    id: "scene_65",
    elements: {
        name: "旁白",
        text: "神父来探望我，要我接受上帝，悔改灵魂。他说这样我能得到救赎。"
    }
},
{
    id: "scene_66",
    elements: {
        name: "旁白",
        text: "我拒绝了。"
    }
},
{
    id: "scene_67",
    elements: {
        name: "我",
        text: "没有上帝，没有永恒，一切都是荒诞。人必然死去，这就是全部。"
    }
},
{
  id: "star_1",
  elements: {
    name: "旁白",
    text: "夜晚，微风吹拂。"
  }
},
{
  id: "star_2",
  elements: {
    name: "旁白",
    text: "我面对繁星密布的天空敞开心扉。"
  }
},
{
  id: "star_2",
  elements: {
    name: "旁白",
    text: "第一次感到宇宙是如此广阔、冷漠，却也如此温柔。"
  }
},
{
  id: "star_3",
  elements: {
    name: "旁白",
    text: "我想到母亲在养老院里重新开始生活，直到生命尽头才安静离去。"
  }
},
{
  id: "star_4",
  elements: {
    name: "旁白",
    text: "此刻我也领悟到了她的幸福。"
  }
},
{
  id: "star_5",
  elements: {
    name: "旁白",
    text: "明天我就要死去。"
  }
},
{
  id: "star_6",
  elements: {
    name: "旁白",
    text: "我好像是两手空空，一无所有，但我对自己很有把握，对一切都有把握。"
  }
},
{
  id: "star_7",
  elements: {
    name: "旁白",
    text: "我希望处决我的那一天有很多人来看，对我发出仇恨的喊叫声。"
  }
},
{
  id: "star_8",
  elements: {
    name: "旁白",
    text: "那样，我就能融入这喧嚣，与世界合为一体。"
  }
},
{
  id: "star_9",
  elements: {
    name: "旁白",
    text: "此刻，我接受了死亡。"
  }
},
{
  id: "star_10",
  elements: {
    name: "旁白",
    text: "在世界的冷漠怀抱里，我感到无比的幸福。"
  }
},
{
  id: "reborn_1",
  elements: {
    name: "旁白",
    text: "睁眼。"
  }
},
{
  id: "reborn_2",
  elements: {
    name: "旁白",
    text: "像是度过了漫长的一生，也像是身上的重担被卸下，扶着巨石轻轻地喘息。"
  }
},
{
  id: "reborn_3",
  elements: {
    name: "旁白",
    text: "抬起头，看见一双充满着热切与柔情的淡蓝色双眼，内心便不由自主地平静下来。"
  }
},
{
  id: "reborn_4",
  elements: {
    name: "你",
    text: "我跨越了它。"
  }
},
{
  id: "reborn_5",
  elements: {
    name: "旁白",
    text: "光泠微笑着向我点头。"
  }
},
{
  id: "reborn_6",
  elements: {
    name: "光泠",
    text: "您果然没有让人失望。"
  }
},
{
  id: "reborn_7",
  elements: {
    name: "光泠",
    text: "我从不怀疑您。看来我做出了正确的选择。"
  }
},
{
  id: "reborn_8",
  elements: {
    name: "你",
    text: "你也成功了。"
  }
},
{
  id: "reborn_9",
  elements: {
    name: "光泠",
    text: "有您在，失败的事就不会发生。"
  }
},
{
  id: "reborn_10",
  elements: {
    name: "你",
    text: "我们可以进去了。"
  }
},
{
  id: "reborn_11",
  elements: {
    name: "光泠",
    text: "走吧。我会陪您一同面对。（笑）"
  }
},
{
  id: "village_1",
  elements: {
    name: "旁白",
    text: "踏入村庄，阴风阵阵在耳边哭号，一片死寂静静地等待着我们的到来。"
  }
},
{
  id: "village_2",
  elements: {
    name: "旁白",
    text: "阴森与压抑的氛围让人一阵毛骨悚然。"
  }
},
{
  id: "village_3",
  elements: {
    name: "旁白",
    text: "斑驳陈旧的木房子毫无章法地坐落在村里的各个角落。"
  }
},
{
  id: "village_3_1",
  elements: {
    name: "旁白",
    text: "蒙尘的窗户遮挡住了一切窥视的目光，风干的破布悬挂在院子里随风摆荡。"
  }
},
{
  id: "village_4",
  elements: {
    name: "旁白",
    text: "空气中弥漫着腐朽与湿气的气味，像是多年来无人问津的死气。"
  }
},
{
  id: "village_5",
  elements: {
    name: "旁白",
    text: "也许这里曾是人们的归属，但如今却已满是腐朽。"
  }
},
{
  id: "village_6",
  elements: {
    name: "旁白",
    text: "推开锈迹斑斑的沉重铁门，在并不宽敞的小道上前行。"
  }
},
{
  id: "village_7",
  elements: {
    name: "旁白",
    text: "微弱的风声似乎夹杂着些许呢喃，仿佛在耳边低语。"
  }
},
{
  id: "village_8",
  elements: {
    name: "旁白",
    text: "干枯的树枝张牙舞爪地指向天空。"
  }
},
{
  id: "village_8_1",
  elements: {
    name: "旁白",
    text: "路旁的雕像与墓碑似乎在告诉来者，这里曾是生命与文明的根据地。"
  }
},
{
  id: "village_9",
  elements: {
    name: "光泠",
    text: "请沿着这条路走下去，我们所需之物也许就在那里。"
  }
},
{
  id: "village_10",
  elements: {
    name: "旁白",
    text: "推开又一道沉重的石门，走过一座摇荡的吊桥。"
  }
},
{
  id: "village_10_1",
  elements: {
    name: "旁白",
    text: "穿过一片枯败的树丛。眼前似有幽光悬浮在空中游荡。"
  }
},
{
  id: "village_11",
  elements: {
    name: "旁白",
    text: "就是这里了。"
  }
},
{
  id: "village_12",
  elements: {
    name: "旁白",
    text: "不知出于何种原因，内心如此笃定道。"
  }
},
{
  id: "altar_1",
  elements: {
    name: "旁白",
    text: "朝着幽光走去，一座神秘的祭坛毫无征兆地出现在视野中。"
  }
},
{
  id: "altar_2",
  elements: {
    name: "光泠",
    text: "越来越近了。(无表情)"
  }
},
{
  id: "altar_3",
  elements: {
    name: "旁白",
    text: "祭坛四周插着燃烧着微弱焰火的蜡烛，为这黑暗的世界增添了一份难得的光明。"
  }
},
{
  id: "altar_4",
  elements: {
    name: "旁白",
    text: "祭坛上仿佛有人影闪动，不过还来不及被双眼捕捉，便消失在微光中。"
  }
},
{
  id: "altar_5",
  elements: {
    name: "你",
    text: "我们去看看。"
  }
},
{
  id: "altar_6",
  elements: {
    name: "旁白",
    text: "来到祭坛边，看到暗红色的祭坛上散落着大小不一的石块，仿佛仍有一场未完的仪式等待着延续。"
  }
},
{
  id: "altar_7",
  elements: {
    name: "旁白",
    text: "如同受到神秘的指引，鬼使神差地捡起了祭坛上的一块刻有诡异符号的黑石。"
  }
},
{
  id: "altar_8",
  elements: {
    name: "光泠",
    text: "请小心。（谨慎）"
  }
},
{
  id: "altar_9",
  elements: {
    name: "旁白",
    text: "话音未落，一丝黑烟从手中飘出——确切的说，是手中的黑石。"
  }
},
{
  id: "altar_10",
  elements: {
    name: "旁白",
    text: "来不及作出反应，黑色细烟紧接着化为一股黑雾从黑石中涌出。"
  }
},
{
  id: "altar_10",
  elements: {
    name: "旁白",
    text: "如冲破封印的恶鬼重见天日，在身后渐渐凝聚成一个人形。"
  }
},
{
  id: "altar_11",
  elements: {
    name: "旁白",
    text: "缓过神来的时候，手中的黑石已然四分五裂。"
  }
},
{
  id: "altar_12",
  elements: {
    name: "旁白",
    text: "光泠挡在我与人形之间，将我护在身后。"
  }
},
{
  id: "altar_13",
  elements: {
    name: "旁白",
    text: "那个人形不动声色地将右臂的暗寂幻化为一柄黑色长剑。"
  }
},
{
  id: "altar_13_1",
  elements: {
    name: "旁白",
    text: "我轻拍光泠，示意她到身后。"
  }
},
{
  id: "altar_14",
  elements: {
    name: "旁白",
    text: "黑雾逐渐散去，一颗骷髅头骨在眼前出现。"
  }
},
{
  id: "altar_15",
  elements: {
    name: "旁白",
    text: "骷髅头骨露出了它的全貌——原来只是一根权杖顶部的装饰。"
  }
},
{
  id: "altar_16",
  elements: {
    name: "旁白",
    text: "拄着权杖的，是一个披着黑色斗篷，满脸皱纹的巫婆。"
  }
},
{
  id: "altar_17",
  elements: {
    name: "旁白",
    text: "巫婆的白色眼珠盯着我。不由得握紧手中剑，蓄势待发。"
  }
},
{
  id: "altar_18",
  elements: {
    name: "巫婆",
    text: "是你吗？来到这里的渡厄之人？"
  }
},
{
  id: "altar_19",
  elements: {
    name: "旁白",
    text: "沙哑刺耳的声音从她的口中挣扎着挤出。"
  }
},
{
  id: "altar_20",
  elements: {
    name: "巫婆",
    text: "我知道是你，你终于还是来到了这里。"
  }
},
{
  id: "altar_21",
  elements: {
    name: "巫婆",
    text: "我等了很久，终于等到你了。"
  }
},
{
  id: "altar_22",
  elements: {
    name: "巫婆",
    text: "就连死亡也拦不住你的脚步。"
  }
},
{
  id: "altar_22_1",
  elements: {
    name: "巫婆",
    text: "在无法改变的轮回中，你又一次成功进入了这里。"
  }
},
{
  id: "altar_23",
  elements: {
    name: "你",
    text: "你这家伙在说些什么啊。"
  }
},
{
  id: "altar_24",
  elements: {
    name: "光泠",
    text: "告诉我，我们所寻的关键之物在哪里？"
  }
},
{
  id: "altar_25",
  elements: {
    name: "巫婆",
    text: "我知道你们正是为此而来。"
  }
},
{
  id: "altar_26",
  elements: {
    name: "巫婆",
    text: "我也知道你，这位拥有美丽的金黄色头发的姑娘。"
  }
},
{
  id: "altar_27",
  elements: {
    name: "你",
    text: "废话少说。"
  }
},
{
  id: "altar_28",
  elements: {
    name: "巫婆",
    text: "好吧，苦苦追寻“始源之心”者。你是如此地急切与局促不安。"
  }
},
{
  id: "altar_29",
  elements: {
    name: "巫婆",
    text: "你们要的关键之物，正是名为“始源之心”之至宝。"
  }
},
{
  id: "altar_30",
  elements: {
    name: "巫婆",
    text: "经由“始源之心”，我们能看到那生命的根源。"
  }
},
{
  id: "altar_31",
  elements: {
    name: "巫婆",
    text: "哈哈哈哈——生命的根源在哪里？"
  }
},
{
  id: "altar_31_1",
  elements: {
    name: "巫婆",
    text: "这里就是生命的起始，也是生命的终结！"
  }
},
{
  id: "altar_32",
  elements: {
    name: "巫婆",
    text: "人们的鲜血融汇在这里，人们的灵魂在这里交融，人们的尸骨也在这里还给世界。"
  }
},
{
  id: "altar_33",
  elements: {
    name: "巫婆",
    text: "我们的一切，你们的一切，他们的一切!所有的一切都在这里得到新生，也在这里埋葬！"
  }
},
{
  id: "altar_33_1",
  elements: {
    name: "巫婆",
    text: "所有的一切都在这里得到新生，也在这里埋葬！"
  }
},
{
  id: "altar_34",
  elements: {
    name: "你",
    text: "始源之心，在哪？"
  }
},
{
  id: "altar_35",
  elements: {
    name: "旁白",
    text: "巫婆没有回答，而是径直走上了祭坛，来到了祭坛中央。"
  }
},
{
  id: "altar_36",
  elements: {
    name: "旁白",
    text: "脚下的祭坛突然泛起微光，隐约传来震动。"
  }
},
{
  id: "altar_37",
  elements: {
    name: "你",
    text: "小心！"
  }
},
{
  id: "altar_38",
  elements: {
    name: "旁白",
    text: "我抱起光泠，远离了祭坛。"
  }
},
{
  id: "altar_38_1",
  elements: {
    name: "旁白",
    text: "紧接着，祭坛之上被一股暗黑的旋风包裹。祭坛周围的烛光疯狂跳动，但没有熄灭。"
  }
},
{
  id: "altar_39",
  elements: {
    name: "旁白",
    text: "片刻之间，黑风散去，烛光平静。"
  }
},
{
  id: "altar_39_1",
  elements: {
    name: "旁白",
    text: "巫婆仍拄着权杖站在祭坛中央，只不过手中似乎多出了什么事物。"
  }
},
{
  id: "altar_40",
  elements: {
    name: "旁白",
    text: "巫婆缓缓走下祭坛，权杖上的头骨随之摇动，发出奇怪的声响。"
  }
},
{
  id: "altar_41",
  elements: {
    name: "巫婆",
    text: "收下吧。如今我将这始源之心交予你，就像是悲剧的开幕。"
  }
},
{
  id: "altar_42",
  elements: {
    name: "旁白",
    text: "巫婆摊开手，手中是一个暗红色的心脏——不，其实是一块石头。"
  }
},
{
  id: "altar_42_1",
  elements: {
    name: "旁白",
    text: "一块闪着暗红微光、心脏形状的石头，一块半透明、似有血液流动其中的石头。"
  },
  choices: [
    {
      text: "收下",
      next: "altar_43_1"
    },
    {
        text: "质疑",
        next: "altar_43_2"
    }
  ]
},
//分支1//
{
  id: "altar_43_1",
  elements: {
    name: "旁白",
    text: "将这始源之心握在手中，隐约能感受到不息的跳动。"
  }
},
{
  id: "altar_44",
  elements: {
    name: "旁白",
    text: "巫婆看着我接过它，发出一阵沙哑的诡异笑声，随风化作黑烟散去，无影无踪。"
  }
},
{
  id: "altar_45",
  elements: {
    name: "旁白",
    text: "我们真的得到了第一个关键之物吗？"
  }
},
{
  id: "altar_46",
  elements: {
    name: "光泠",
    text: "这就是真正的“始源之心”吗？是我们要找的第一个关键之物。"
  }
},
{
  id: "altar_47",
  elements: {
    name: "旁白",
    text: "听闻此言，我不由得长舒一口气。"
  }
},
{
  id: "altar_48",
  elements: {
    name: "旁白",
    text: "我们终于迈出了真正意义上第一步。"
  }
},
{
  id: "altar_49",
  elements: {
    name: "光泠",
    text: "我为您感到由衷的喜悦。（笑）"
  }
},
{
  id: "altar_50",
  elements: {
    name: "光泠",
    text: "我知道您有多不容易。（微笑）"
  }
},
{
  id: "altar_51",
  elements: {
    name: "你",
    text: "其实也没什么。不过总算没有白费力气。"
  }
},
{
  id: "altar_52",
  elements: {
    name: "光泠",
    text: "嗯哼⁓（笑）"
  }
},
{
  id: "altar_53",
  elements: {
    name: "你",
    text: "谢谢你，光泠。"
  }
},
{
  id: "altar_54",
  elements: {
    name: "光泠",
    text: "让我们继续，走向胜利吧。"
  },
  next:"待定",
},//分支2//
{
  id: "altar_43_2",
  elements: {
    name: "你",
    text: "你会这么容易把始源之心交给我们吗？"
  }
},

]
}
export default scene;