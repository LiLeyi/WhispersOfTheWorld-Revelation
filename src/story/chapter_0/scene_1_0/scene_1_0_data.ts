import { Scene } from '../../../types/SceneTypes';
import { ArchiveManager } from '../../../components/ArchiveManager';

// 定义第1幕场景
const scene: Scene = {
    id: "chapter_0_scene_1",
    title: "第1幕：斑牛镇",
    nodes: [
        {
            id: "intro_black_screen_1",
            elements: {
                background: "sc0.1/待定.png",
                name: "旁白",
                text: "Listen, my heart, to the whispers of the world with which it makes love to you."
            }
        },
        {
            id: "intro_quote_1",
            elements: {
                name: "旁白",
                text: "“如果因为思念太阳而终日哭泣，那么星星也将离你而去。”"
            }
        },
        {
            id: "intro_quote_2",
            elements: {
                name: "旁白",
                text: "模糊的记忆中出现了这样的话语，但从何而来，却无从寻觅。"
            }
        },
        {
            id: "intro_quote_3",
            elements: {
                name: "旁白",
                text: "但那并不重要。重要的是，我在哪里？"
            }
        },
        {
            id: "intro_pain_1",
            elements: {
                name: "旁白",
                text: "如海啸般狂暴的剧痛不停撕扯着我的神经，动弹不得的麻木身躯如今除了那刻骨铭心的痛楚外一无所有。"
            }
        },
        {
            id: "intro_pain_2",
            elements: {
                name: "旁白",
                text: "将要崩塌的意识忽明忽灭，所幸这已足以让自己回想起到底发生了什么。"
            }
        },
        {
            id: "wake_up_1_1",
            elements: {
                name: "旁白",
                text: "是了，我的身躯被无情地撕碎，惟有仅剩的半截残躯还吊着最后一口气。"
            }
        },
        {
            id: "pain_1_1",
            elements: {
                name: "旁白",
                text: "被硬生生扯断的手臂已不知被丢弃至哪里，零碎的肢干被宣告永远与我分离。"
            }
        },
        {
            id: "pain_1_2",
            elements: {
                name: "旁白",
                text: "半截脊柱裸露在空气中，鲜红的液体从森然的断面下迸射而出。"
            }
        },
        {
            id: "thoughts_1_1",
            elements: {
                name: "旁白",
                text: "我大概要死了吧，我想。"
            }
        },
        {
            id: "thoughts_1_2",
            elements: {
                name: "旁白",
                text: "为什么我会在这里经受如此折磨？希求得到答案，但到底触碰不到。"
            }
        },
        {
            id: "voice_1_1",
            elements: {
                name: "？？？",
                text: "......帝王......奴隶......"
            }
        },
        {
            id: "near_death_1",
            elements: {
                name: "旁白",
                text: "耳边隐约传来冰冷的声音，好似在宣告着我的死亡。"
            }
        },
        {
            id: "near_death_2",
            elements: {
                name: "旁白",
                text: "意识将要涣散。"
            }
        },
        {
            id: "near_death_3",
            elements: {
                name: "旁白",
                text: "眼前最后出现的，是山一般的钢铁怪兽，还有闪烁着刺眼红芒的灼热炮口。"
            }
        },
        {
            id: "explosion_1",
            elements: {
                name: "旁白",
                text: "一切都结束了，我想。"
            }
        },
        {
            id: "explosion_2",
            elements: {
                name: "旁白",
                text: "轰鸣般的毁灭之音伴随着热浪，咆哮着吞没了一切。"
            }
        },
                {
            id: "explosion_3",
            elements: {
                name: "旁白",
                text: "…………"
            }
        },
        {
            id: "nightmare_wake_up_1",
            elements: {
                name: "旁白",
                text: "再次从噩梦中惊醒，发现冷汗从额间流下。"
            }
        },
        {
            id: "nightmare_wake_up_2",
            elements: {
                name: "旁白",
                text: "抬头看去，光泠正静静地注视着我。"
            }
        },
        {
            id: "lightling_concern_1",
            elements: {
                name: "光泠",
                text: "您还好吗？（微笑） 是做了什么可怕的噩梦吗？（微笑）"
            }
        },
        {
            id: "response_1_1",
            elements: {
                name: "你",
                text: "是有一些吓人画面。不过没事。"
            }
        },
        {
            id: "lightling_1_1",
            elements: {
                name: "光泠",
                text: "希望您不要被吓到哭鼻子。我怕哄不好您。（笑）"
            }
        },
        {
            id: "you_will_be_fine_1",
            elements: {
                name: "你",
                text: "当然不会，好吧。我们现在在哪里？"
            }
        },
        {
            id: "lightling_location_1",
            elements: {
                name: "光泠",
                text: "斑牛镇。（微笑） 看来您还需要一点时间。（微笑）"
            }
        },
        {
            id: "resting_1",
            elements: {
                name: "旁白",
                text: "抛开噩梦的余韵，记忆逐渐清晰起来。"
            }
        },
        {
            id: "resting_2",
            elements: {
                name: "旁白",
                text: "自从离开废墟，我发现自己对外界的感知变得十分敏锐而清晰，仿佛世间万物都在向我袒露心扉。"
            }
        },
        {
            id: "resting_3",
            elements: {
                name: "旁白",
                text: "也好像能听见某些神秘的絮语，不知从何处传来。"
            }
        },
        {
            id: "lightling_clue_1",
            elements: {
                name: "旁白",
                text: "光泠说，我会受到‘关键之物’的吸引。"
            }
        },
        {
            id: "lightling_clue_2",
            elements: {
                name: "旁白",
                text: "于是，听从内心的声音，跟随光泠的指引，我们来到了这个名为‘斑牛镇’的地方。"
            }
        },
        {
            id: "lightling_2_1",
            elements: {
                name: "旁白",
                text: "在这里找到了可以下榻的地方，便决定先稍作休息，养精蓄锐。"
            }
        },
        {
            id: "lightling_2_2",
            elements: {
                name: "你",
                text: "既然被指引到了这里，那么确有必要好好探索一番。"
            }
        },
        {
            id: "you_rest_1",
            elements: {
                name: "你",
                text: "你也需要好好休息一下吧。"
            }
        },
        {
            id: "lightling_response_1",
            elements: {
                name: "光泠",
                text: "我已经休息得足够，谢谢您。（笑）"
            }
        },
        {
            id: "you_ask_1",
            elements: {
                name: "你",
                text: "你去过镇上了么？"
            }
        },
        {
            id: "lightling_no_1",
            elements: {
                name: "光泠",
                text: "不，我一直在您身边，等您醒来。（微笑）"
            }
        },
        {
            id: "knowledge_of_town_1",
            elements: {
                name: "你",
                text: "对于这里，你知道多少？"
            }
        },
        {
            id: "lightling_info_1",
            elements: {
                name: "光泠",
                text: "斑牛镇看上去就是个很普通的小镇。"
            }
        },
        {
            id: "lightling_info_2",
            elements: {
                name: "光泠",
                text: "居民自给自足，安居乐业，对自己的生活感到很满足。（微笑）"
            }
        },
        {
            id: "you_wonder_1",
            elements: {
                name: "你",
                text: "听上去不错。"
            }
        },
        {
            id: "lightling_wonder_1",
            elements: {
                name: "光泠",
                text: "是的。似乎是这样。（微笑）"
            }
        },
        {
            id: "lightling_3_1",
            elements: {
                name: "我",
                text: "似乎？"
            }
        },
        {
            id: "you_acknowledge_1",
            elements: {
                name: "光泠",
                text: "您好些了吗？我们可以出去逛逛，探索一下这里。（笑）"
            }
        },
        {
            id: "lightling_response_2_1",
            elements: {
                name: "你",
                text: "嗯，谢谢你陪着我。（微笑）"
            }
        },
        {
            id: "lightling_4_1",
            elements: {
                name: "光泠",
                text: "您已经谢过了。（微笑）"
            }
        },
        {
            id: "humor_conversation_1",
            elements: {
                name: "你",
                text: "之前是因为你耐心等我缓过神，这次是因为你一直和我在一起。"
            }
        },
         {
            id: "humor_conversation_2",
            elements: {
                name: "你",
                text: "如果我真的被噩梦吓哭了，确实得劳烦你安慰我了。"
            }
        },
        {
            id: "lightling_laugh_1",
            elements: {
                name: "光泠",
                text: "幸好您胆量足够。（微笑）"
            }
        },
        {
            id: "lightling_suggestion_1",
            elements: {
                name: "光泠",
                text: "假如您真的哭了，我会像哄小孩子一样把您抱在怀里，然后唱首摇篮曲。（笑）"
            }
        },
        {
            id: "you_tease_1",
            elements: {
                name: "你",
                text: "哄我睡着吗？搞不好又要做噩梦了。"
            }
        },
        {
            id: "lightling_magic_1",
            elements: {
                name: "光泠",
                text: "那我就用神奇的魔法，把噩梦赶走。（微笑）"
            }
        },
        {
            id: "you_decline_1",
            elements: {
                name: "你",
                text: "不过我再怎么样也不是什么小孩子了。"
            }
        },
        {
            id: "lightling_playful_1",
            elements: {
                name: "光泠",
                text: "是吗？那也可以用大人的方法。（微笑）"
            }
        },
        {
            id: "you_question_1",
            elements: {
                name: "你",
                text: "嗯？那是什么？"
            }
        },
        {
            id: "lightling_secret_1",
            elements: {
                name: "光泠",
                text: "既然您没有被吓哭，那么请原谅我暂时保密。（微笑）"
            }
        },
        {
            id: "you_sigh_1",
            elements: {
                name: "你",
                text: "可惜了，我还想体验一下的。或许下次真的该哭一哭了。"
            }
        },
        {
            id: "lightling_refuse_1",
            elements: {
                name: "光泠",
                text: "拒绝假哭。（笑）"
            }
        },
        {
            id: "you_thank_1",
            elements: {
                name: "你",
                text: "到时候再说吧。总之谢谢你陪我说这些。"
            }
        },
        {
            id: "lightling_repeated_thanks_1",
            elements: {
                name: "光泠",
                text: "已经是第三次说谢谢了。（微笑）"
            }
        },
        {
            id: "you_explain_1",
            elements: {
                name: "你",
                text: "唉，我总是忍不住想要表达我的感激之情。"
            }
        },
        {
            id: "lightling_welcome_1",
            elements: {
                name: "光泠",
                text: "那么请您尽管说吧！我并不讨厌。（微笑）"
            }
        },
        {
            id: "you_agree_1",
            elements: {
                name: "你",
                text: "好好好，我会的。"
            }
        },
        {
            id: "town_outside_1",
            elements: {
                name: "旁白",
                text: "走出门，来到镇上，人们正聚集在集市广场上。"
            }
        },
        {
            id: "town_outside_2",
            elements: {
                name: "旁白",
                text: "房屋色彩斑驳，墙面涂抹着不合章法的彩漆，仿佛小孩随意涂抹的图画。"
            }
        },
        {
            id: "town_outside_3",
            elements: {
                name: "旁白",
                text: "街道上悬挂着花环与旗帜，色彩艳丽而刺眼，却掩盖不住腐败的气息。"
            }
        },
        {
            id: "town_outside_4",
            elements: {
                name: "你",
                text: "想不到竟然还有这样的地方。"
            }
        },
        {
            id: "town_outside_5",
            elements: {
                name: "你",
                text: "我是说，在这濒临崩毁的世界里，这镇子实在是有些奇特。"
            }
        },
        {
            id: "lightling_1_1",
            elements: {
                name: "光泠",
                text: "还不算太坏。"
            }
        },
        {
            id: "town_outside_6",
            elements: {
                name: "你",
                text: "走在道路上打量着四周，突然传来一阵骚动。"
            }
        },
        {
            id: "town_outside_7",
            elements: {
                name: "你",
                text: "去看看。"
            }
        },
        {
            id: "town_square_1",
            elements: {
                name: "旁白",
                text: "镇中心的广场人声鼎沸。灰暗的天空之下，居民们挤在一起，喊叫，嘲笑，狂欢。"
            }
        },
        {
            id: "town_square_2",
            elements: {
                name: "旁白",
                text: "从旁人的谈论中，结合眼前所见，大概能明白发生了什么。"
            }
        },
        {
            id: "town_square_3",
            elements: {
                name: "旁白",
                text: "一个走钢索的人将要进行他的表演。"
            }
        },
        {
            id: "town_square_4",
            elements: {
                name: "旁白",
                text: "广场中央耸立着一座高塔，一根铁索自塔顶垂下，延伸到另一端的城墙。"
            }
        },
        {
            id: "town_square_5",
            elements: {
                name: "旁白",
                text: "一个走钢索的人，独自站在高塔之巅。"
            }
        },
        {
            id: "town_square_6",
            elements: {
                name: "旁白",
                text: "人群开始欢呼。"
            }
        },
        {
            id: "town_square_7",
            elements: {
                name: "旁白",
                text: "走钢索者开始登上高塔，他必须从一根细索上走过。"
            }
        },
        {
            id: "town_square_8",
            elements: {
                name: "旁白",
                text: "走钢索者的脚放上细索。"
            }
        },
        {
            id: "town_square_9",
            elements: {
                name: "旁白",
                text: "走钢索者走出第二步。"
            }
        },
        {
            id: "town_square_10",
            elements: {
                name: "旁白",
                text: "走钢索者颤抖前行。"
            }
        },
        {
            id: "town_square_11",
            elements: {
                name: "旁白",
                text: "？"
            }
        },
        {
            id: "town_square_12",
            elements: {
                name: "旁白",
                text: "突然，一个小丑般的身影爬上高塔，在走钢索者背后狂跳乱舞，大声嘲弄。"
            }
        },
        {
            id: "town_square_13",
            elements: {
                name: "旁白",
                text: "铁索被他弄得剧烈摇晃。"
            }
        },
        {
            id: "town_square_14",
            elements: {
                name: "旁白",
                text: "人群中爆发出哄笑。"
            }
        },
        {
            id: "town_square_15",
            elements: {
                name: "你",
                text: "不好！"
            }
        },
        {
            id: "town_square_16",
            elements: {
                name: "旁白",
                text: "走钢索者左倒右晃，如断线木偶般失足从钢索上坠落，跌入广场。"
            }
        },
        {
            id: "town_square_17",
            elements: {
                name: "旁白",
                text: "砰！一声闷响后，血染红了尘土。"
            }
        },
        {
            id: "town_square_18",
            elements: {
                name: "旁白",
                text: "人群爆发出更大的喧嚣与笑声。"
            }
        },
        {
            id: "town_square_19",
            elements: {
                name: "光泠",
                text: "真是糟糕，令人作呕。"
            }
        },
        {
            id: "town_square_20",
            elements: {
                name: "你",
                text: "远远看着这一切，我感到无比的悲哀。"
            }
        },
        {
            id: "lightling_2_1",
            elements: {
                name: "光泠",
                text: "看来这就是斑牛镇的真面目。（悲伤）"
            }
        },
        {
            id: "town_square_21",
            elements: {
                name: "旁白",
                text: "你所行的道，充满危险。"
            }
        },
        {
            id: "town_square_22",
            elements: {
                name: "旁白",
                text: "你没有达到目的，却已被人嘲笑。"
            }
        },
        {
            id: "town_square_23",
            elements: {
                name: "光泠",
                text: "但你并未因此白活，因为你的失败，仍然比人群的庸俗要高贵。"
            }
        },
        {
            id: "town_square_24",
            elements: {
                name: "你",
                text: "我想这里没有我们要找的东西。也许该走了。"
            }
        },
        {
            id: "town_square_25",
            elements: {
                name: "旁白",
                text: "转身离开时，又听见旁边的交谈声。"
            }
        },
        {
            id: "town_square_26",
            elements: {
                name: "隐者",
                text: "你为何要下山？在林中你是纯净的，可以与上帝同在。"
            }
        },
        {
            id: "town_square_27",
            elements: {
                name: "隐者",
                text: "人类太喧闹、太污浊，何必到他们那里去？"
            }
        },
        {
            id: "town_square_28",
            elements: {
                name: "隐者",
                text: "留下来吧，和我一起在荒林里歌颂上帝。"
            }
        },
        {
            id: "mysterious_person_0",
            elements: {
                name: "？",
                text: "我爱人类，不是因为他们与上帝同在，而是因为他们需要超越。"
            }
        },
        {
            id: "mysterious_person_1",
            elements: {
                name: "？",
                text: "上帝已死。人类必须学会创造新的意义，否则他们将沉沦。"
            }
        },
        {
            id: "mysterious_person_2",
            elements: {
                name: "隐者",
                text: "你太年轻，还不懂。人类需要上帝来安慰他们的痛苦。"
            }
        },
        {
            id: "mysterious_person_3",
            elements: {
                name: "？",
                text: "难道他还没有听说吗？——上帝已经死了！"
            }
        },
        {
            id: "mysterious_person_4",
            elements: {
                name: "你",
                text: "你好。"
            }
        },
        {
            id: "mysterious_person_5",
            elements: {
                name: "？",
                text: "我看见你了，行走在深渊之索上的人。"
},
        },
        {
            id: "mysterious_person_5",
            elements: {
                name: "？",
                text: "你空无一物，却背负全世界的重量。"
},
        },
        {
            id: "mysterious_person_5_1",
            elements: {
                name: "旁白",
                text: "你不知自己是谁，却被迫回答为何。"
},
        },
        {
            id: "mysterious_person_6",
            elements: {
                name: "你",
                text: "你在说我？"
            }
        },
        {
            id: "mysterious_person_7",
            elements: {
                name: "？",
                text: "我见过上帝的坟墓，也听见了人群的笑声。"
            }
        },
        {
            id: "mysterious_person_7_1",
            elements: {
                name: "？",
                text: "我告诉你：上帝已死，而人群仍在为幻影歌唱。"
            }
        },
        {
            id: "mysterious_person_7_2",
            elements: {
                name: "？",
                text: "他们沉醉于节庆与嘲笑，却不曾知晓虚无正环伺在侧。"
            }
        },
        {
            id: "lightling_3_1",
            elements: {
                name: "光泠",
                text: "我们该去往何方？（无表情）"
            }
        },
        {
            id: "mysterious_person_8",
            elements: {
                name: "？",
                text: "去那座荒废的村庄吧。那是灵魂的镜子，也是门槛。"
            }
        },
        {
            id: "mysterious_person_8_1",
            elements: {
                name: "？",
                text: "那里会有巨石考问你，也会有真正珍贵的事物在等待你。"
            }
        },
        {
            id: "mysterious_person_9",
            elements: {
                name: "？",
                text: "若你失败，那便坠落。人们会在你的坠落中大笑，你将一无所有。"
            }
        },
        {
            id: "mysterious_person_10",
            elements: {
                name: "你",
                text: "我已明白。"
            }
        },
        {
            id: "mysterious_person_11",
            elements: {
                name: "？",
                text: "他转身而去，背影消失在视线中。"
            }
        },
        {
            id: "you_know_1",
            elements: {
                name: "你",
                text: "我想我已知道该去哪里了。"
            }
        },
        {
            id: "lightling_4_1",
            elements: {
                name: "光泠",
                text: "嗯。（微笑）"
            }
        },
        {
            id: "lightling_5_1",
            elements: {
                name: "光泠",
                text: "我会为您指引方向。（微笑）"
            }
        },
        {
            id: "town_exit_1",
            elements: {
                name: "旁白",
                text: "离开斑牛镇，朝着那人所指方向走去。"
            }
        },
        {
            id: "town_exit_2",
            elements: {
                name: "旁白",
                text: "“......这边......”"
            }
        },
        {
            id: "town_exit_3",
            elements: {
                name: "旁白",
                text: "耳边依约传来呢喃。"
            }
        },
        {
            id: "town_exit_4",
            elements: {
                name: "旁白",
                text: "往声音传来的方向走，跟随着内心的指引，并不担心迷路。"
            }
        },
        {
            id: "town_exit_5",
            elements: {
                name: "旁白",
                text: "就算迷路，也还有光泠在。"
            }
        },
        {
            id: "lightling_6_1",
            elements: {
                name: "光泠",
                text: "到了。（无表情）"
            }
        },
        {
            id: "town_entrance_1",
            elements: {
                name: "旁白",
                text: "往前看去，大概能看出是一座村庄的入口。"
            }
        },
        {
            id: "town_entrance_2",
            elements: {
                name: "旁白",
                text: "从散发的腐败气息来看，大约已经废弃有一段时间了。"
            }
        },
        {
            id: "town_entrance_3",
            elements: {
                name: "旁白",
                text: "这就是那人口中的巨石吗？"
            }
        },
        {
            id: "town_entrance_4",
            elements: {
                name: "旁白",
                text: "一块巨石横在道路中央，让人难以忽略它的存在。"
            }
        },
        {
            id: "lightling_7_1",
            elements: {
                name: "光泠",
                text: "想必是了。（无表情）"
            }
        },
        {
            id: "stone_1",
            elements: {
                name: "旁白",
                text: "靠近巨石，一行字便映入眼帘。"
            }
        },
        {
            id: "stone_2",
            elements: {
                name: "旁白",
                text: "“欲寻所需，必经此关”"
            }
        },
        {
            id: "lightling_8_1",
            elements: {
                name: "光泠",
                text: "那么，是要我们通过这石头的考验了。（无表情）"
            }
        },
        {
            id: "lightling_9_1",
            elements: {
                name: "光泠",
                text: "您准备好了吗？（微笑）"
            }
        },
        {
            id: "stone_3",
            elements: {
                name: "你",
                text: "等等，如果不理会这块石头，直接进入村庄呢？"
            }
        },
        {
            id: "stone_4",
            elements: {
                name: "旁白",
                text: "试着绕过巨石进入村庄，却发现眼前变得空无一物。"
            }
        },
        {
            id: "lightling_10_1",
            elements: {
                name: "光泠",
                text: "看来，这样就什么都发现不了了。（微笑）"
            }
        },
        {
            id: "lightling_11_1",
            elements: {
                name: "光泠",
                text: "还挺狡猾的。"
            }
        },
        {
            id: "lightling_12_1",
            elements: {
                name: "你",
                text: "是啊。（微笑）"
            }
        },
        {
            id: "lightling_13_1",
            elements: {
                name: "光泠",
                text: "那么，您准备好接受巨石的考验了吗？（笑）"
            }
        },
        {
            id: "choice_1",
            elements: {
                name: "旁白",
                text: "1尽管来吧。/2不，也许这是一个陷阱呢。"
            }
        },
        {
            id: "choice_1_1",
            elements: {
                name: "你",
                text: "①"
            }
        },
        {
            id: "lightling_14_1",
            elements: {
                name: "光泠",
                text: "您不会退缩的，我就知道。（笑）"
            }
        },
        {
            id: "lightling_15_1",
            elements: {
                name: "光泠",
                text: "您不会让我失望，我一直相信您。（笑）"
            }
        },
        {
            id: "you_1",
            elements: {
                name: "你",
                text: "看来我也不能辜负你的信任了。"
            }
        },
        {
            id: "lightling_16_1",
            elements: {
                name: "光泠",
                text: "嗯，我很荣幸。（微笑）"
            }
        },
        {
            id: "lightling_17_1",
            elements: {
                name: "光泠",
                text: "跟您在一起的时候，我总是会很安心。（笑）"
            }
        },
        {
            id: "you_2",
            elements: {
                name: "你",
                text: "是吗？"
            }
        },
        {
            id: "lightling_18_1",
            elements: {
                name: "光泠",
                text: "我们会一起走下去，对吧？（微笑）"
            }
        },
        {
            id: "you_3",
            elements: {
                name: "你",
                text: "毫无疑问。"
            }
        },
        {
            id: "lightling_19_1",
            elements: {
                name: "光泠",
                text: "谢谢您。愿意承担如此沉重的使命，也愿意相信我。（笑）"
            }
        },
        {
            id: "you_4",
            elements: {
                name: "你",
                text: "第一眼看到你的时候，就觉得我们曾经在哪里相遇过。"
            }
        },
        {
            id: "you_5",
            elements: {
                name: "你",
                text: "现在这股感觉更强烈了。"
            }
        },
        {
            id: "lightling_21_1",
            elements: {
                name: "光泠",
                text: "也许是真的发生过呢？只可惜您已没有过往的记忆。（沮丧）"
            }
        },
        {
            id: "you_6",
            elements: {
                name: "你",
                text: "但至少现在我们在一起。"
            }
        },
        {
            id: "you_7",
            elements: {
                name: "你",
                text: "既然往昔不可追忆，那不妨好好把握当下。"
            }
        },
        {
            id: "lightling_22_1",
            elements: {
                name: "光泠",
                text: "您还是很乐观呢。（微笑）"
            }
        },
        {
            id: "lightling_23_1",
            elements: {
                name: "光泠",
                text: "世界本来就已糟糕至极，若还整日郁郁寡欢，那么就算幸福在身边驻足，也会遗憾地失之交臂。"
            }
        },
        {
            id: "lightling_24_1",
            elements: {
                name: "光泠",
                text: "您说的对。（微笑）"
            }
        },
        {
            id: "lightling_25_1",
            elements: {
                name: "光泠",
                text: "光泠拉起我的手，将我们两人的手轻按在巨石上。"
            }
        },
        {
            id: "lightling_26_1",
            elements: {
                name: "光泠",
                text: "让我们开始吧。（笑）"
            }
        },
        {
            id: "lightling_27_1",
            elements: {
                name: "光泠",
                text: "也许是吧。但我们似乎也别无他法。（沮丧）"
            }
        },
        {
            id: "lightling_28_1",
            elements: {
                name: "光泠",
                text: "您打算放弃吗？（无表情）"
            }
        },
        {
            id: "you_8",
            elements: {
                name: "你",
                text: "我想我们应该试试别的方法，或者到其他地方去。"
            }
        },
        {
            id: "you_9",
            elements: {
                name: "你",
                text: "我可不敢冒这个风险。"
            }
        },
        {
            id: "lightling_29_1",
            elements: {
                name: "光泠",
                text: "实在是遗憾。不过我尊重您的选择。（沮丧）"
            }
        },
        {
            id: "lightling_30_1",
            elements: {
                name: "光泠",
                text: "将您带到这里，我的任务就完成了。（无表情）"
            }
        },
        {
            id: "you_10",
            elements: {
                name: "你",
                text: "我知道。只是我实在不放心。"
            }
        },
        {
            id: "lightling_31_1",
            elements: {
                name: "光泠",
                text: "没关系。（无表情）"
            }
        },
        {
            id: "lightling_32_1",
            elements: {
                name: "光泠",
                text: "走吧。"
            }
        },
        {
            id: "you_11",
            elements: {
                name: "你",
                text: "嗯。（无表情）"
            }
        }
    ]
};
export default scene;