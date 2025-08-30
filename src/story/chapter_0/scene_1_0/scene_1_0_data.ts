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
                background: "black_screen_white_text.jpg",
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
            id: "black_screen_1",
            elements: {
                name: "旁白",
                text: "<背景全黑>"
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
                name: "光泠",
                text: "光泠说，我会受到‘关键之物’的吸引。"
            }
        },
        {
            id: "lightling_clue_2",
            elements: {
                name: "光泠",
                text: "于是，听从内心的声音，跟随光泠的指引，我们来到了这个名为‘斑牛镇’的地方。"
            }
        },
        {
            id: "lightling_2_1",
            elements: {
                name: "光泠",
                text: "在这里找到了可以下榻的地方，便决定先稍作休息，养精蓄锐。"
            }
        },
        {
            id: "lightling_2_2",
            elements: {
                name: "光泠",
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
                name: "光泠",
                text: "似乎？"
            }
        },
        {
            id: "you_acknowledge_1",
            elements: {
                name: "你",
                text: "我们可以出去逛逛，探索一下这里。（笑）"
            }
        },
        {
            id: "lightling_response_2_1",
            elements: {
                name: "光泠",
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
                text: "之前是因为你耐心等我缓过神，这次是因为你一直和我在一起。如果我真的被噩梦吓哭了，确实得劳烦你安慰我了。"
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
            },
            action: () => {
                alert('测试结束')
            }
        }
    ]
};

export default scene;