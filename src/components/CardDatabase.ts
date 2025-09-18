import { Card } from './mini_games/card_game';


// 卡牌数据库
export const CARD_DATABASE: Record<string, Card> =  { 
    // 卡牌数据
    "punch": {
        id: "punch",
        name: "拳击",
        description: "造成1点攻击。",
        priority: 1,
        
        effect: []
    },
    "parry": {
        id: "parry",
        name: "招架",
        description: "造成1点攻击，消耗1行动，并减少对方1点行动力。",
        priority: 2,
        effect: [],
        cost: {
            action: 1
        }
    },
    "hook": {
        id: "hook",
        name: "勾拳",
        description: "造成3点攻击，消耗2行动。",
        priority: 3,
        effect: [],
        cost: {
            action: 2
        }
    },
    "dodge": {
        id: "dodge",
        name: "闪避",
        description: "获得2点防御，消耗1行动。",
        priority: 2,
        effect: [],
        cost: {
            action: 1
        }
    },
    "combo": {
        id: "combo",
        name: "连击",
        description: "下次伤害翻倍。",
        priority: 2,
        effect: []
    },
    "holy_shield": {
        id: "holy_shield",
        name: "圣盾",
        description: "获得3点真防，消耗3行动。",
        priority: 2,
        effect: [],
        cost: {
            action: 3
        }
    },
    "holiness": {
        id: "holiness",
        name: "圣洁",
        description: "恢复3点血量，消耗2行动。",
        priority: 2,
        effect: [],
        cost: {
            action: 2
        }
    },
    "darkness_initial": {
        id: "darkness_initial",
        name: "暗寂（初）",
        description: "造成5点攻击，但自身受到1点伤害，消耗2行动。",
        priority: 4,
        effect: [],
        cost: {
            action: 2,
            health: 1
        }
    },
    "darkness": {
        id: "darkness",
        name: "暗寂",
        description: "造成5点攻击，消耗2行动。",
        priority: 4,
        effect: [],
        cost: {
            action: 2
        }
    },
    "darkness_final": {
        id: "darkness_final",
        name: "暗寂（终）",
        description: "造成5点攻击，消耗1行动。",
        priority: 4,
        effect: [],
        cost: {
            action: 1
        }
    },
    "enlightenment": {
        id: "enlightenment",
        name: "觉悟",
        description: "自身受到2点攻击，增加1行动，免疫下一次伤害。",
        priority: 3,
        effect: [],
        cost: {
            health: 2
        }
    },
    "little_stone": {
        id: "little_stone",
        name: "小石子",
        description: "造成1点攻击，消耗1行动。",
        priority: 1,
        effect: [],
        cost: {
            action: 1
        }
    },
    "strange_stone": {
        id: "strange_stone",
        name: "奇怪的石头",
        description: "抽一张牌。",
        priority: 2,
        effect: []
    },
    "bedrock": {
        id: "bedrock",
        name: "磐石",
        description: "获得2点防御，消耗1行动。",
        priority: 2,
        effect: [],
        cost: {
            action: 1
        }
    },
    "large_rock": {
        id: "large_rock",
        name: "大石块",
        description: "获得2点攻击加成，消耗2行动。",
        priority: 3,
        effect: [],
        cost: {
            action: 2
        }
    },
    "red_stone": {
        id: "red_stone",
        name: "赤石",
        description: "造成4点攻击，消耗2行动。",
        priority: 3,
        effect: [],
        cost: {
            action: 2
        }
    },
    "diamond": {
        id: "diamond",
        name: "钻石",
        description: "获得5点防御，消耗2行动。",
        priority: 3,
        effect: [],
        cost: {
            action: 2
        }
    },
    "crushed_stone": {
        id: "crushed_stone",
        name: "碎石",
        description: "造成1点攻击，使对方2回合无法回血，消耗1行动。",
        priority: 2,
        effect: [],
        cost: {
            action: 1
        }
    },
    "pebble": {
        id: "pebble",
        name: "鹅卵石",
        description: "造成2点攻击，获得2点防御，消耗2行动。",
        priority: 2,
        effect: [],
        cost: {
            action: 2
        }
    },
    "meteorite": {
        id: "meteorite",
        name: "陨石",
        description: "造成7点攻击，消耗4行动。",
        priority: 5,
        effect: [],
        cost: {
            action: 4
        }
    },
    "tear_of_no_trace": {
        id: "tear_of_no_trace",
        name: "无痕之\"泪\"",
        description: "造成2点真攻，消耗2行动。",
        priority: 3,
        effect: [],
        cost: {
            action: 2
        }
    },
    "ill_fitting_robe": {
        id: "ill_fitting_robe",
        name: "不合身的长袍",
        description: "自身受到2点伤害，获得5点防御和2点真防。",
        priority: 2,
        effect: [],
        cost: {
            health: 2
        }
    },
    "faded_page": {
        id: "faded_page",
        name: "泛黄书页",
        description: "造成1点攻击，获得1点真防，消耗1行动。",
        priority: 2,
        effect: [],
        cost: {
            action: 1
        }
    },
    "eerie_candlelight": {
        id: "eerie_candlelight",
        name: "诡异烛光",
        description: "自身受到2点攻击，随机弃掉对方一张手牌。",
        priority: 3,
        effect: [],
        cost: {
            health: 2
        }
    },
    "boring_staff": {
        id: "boring_staff",
        name: "无趣法杖",
        description: "造成2点真攻，消耗1行动。",
        priority: 3,
        effect: [],
        cost: {
            action: 1
        }
    },
    "useless_potion": {
        id: "useless_potion",
        name: "无用药瓶",
        description: "将当前的防御全部变为真防。",
        priority: 2,
        effect: []
    },
    "wise_hat": {
        id: "wise_hat",
        name: "睿智帽子",
        description: "随机复制一张对方的卡牌。",
        priority: 3,
        effect: []
    },
    "annoying_clock": {
        id: "annoying_clock",
        name: "惹人生厌的钟表",
        description: "造成10点攻击，消耗2行动，并使敌方获得1层锋利。",
        priority: 5,
        effect: [],
        cost: {
            action: 2
        }
    },
    "witchs_gift": {
        id: "witchs_gift",
        name: "巫婆的馈赠",
        description: "重新抽取所有手牌。",
        priority: 1,
        effect: []
    },
    "mechanical_shield": {
        id: "mechanical_shield",
        name: "机械坚盾",
        description: "获得3点防御，消耗1行动。",
        priority: 2,
        effect: [],
        cost: {
            action: 1
        }
    },
    "nano_armor": {
        id: "nano_armor",
        name: "纳米护甲",
        description: "获得2点防御，免疫下一次攻击，消耗2行动。",
        priority: 3,
        effect: [],
        cost: {
            action: 2
        }
    },
    "mechanical_defense": {
        id: "mechanical_defense",
        name: "机械防御",
        description: "获得2点真防，消耗2行动。",
        priority: 3,
        effect: [],
        cost: {
            action: 2
        }
    },
    "mechanical_arm_swing": {
        id: "mechanical_arm_swing",
        name: "机械挥臂",
        description: "自身受到2点攻击，造成1点攻击，并获得1回合\"转化\"效果，消耗3行动。",
        priority: 3,
        effect: [],
        cost: {
            action: 3,
            health: 2
        }
    },
    "worn_gear": {
        id: "worn_gear",
        name: "破旧齿轮",
        description: "造成1点攻击。",
        priority: 1,
        effect: []
    },
    "expired_oil": {
        id: "expired_oil",
        name: "过期机油",
        description: "自身受到2点攻击，增加2点行动力。",
        priority: 2,
        effect: [],
        cost: {
            health: 2
        }
    },
    "swap_robot": {
        id: "swap_robot",
        name: "交换机器人",
        description: "交换自身真防和防御的数值，消耗2行动。",
        priority: 3,
        effect: [],
        cost: {
            action: 2
        }
    },
    "mechanical_sentry": {
        id: "mechanical_sentry",
        name: "机械哨兵",
        description: "造成1点攻击，并获得1层\"机械哨兵\"效果，消耗1行动。",
        priority: 2,
        effect: [],
        cost: {
            action: 1
        }
    },
    "mechanical_factory": {
        id: "mechanical_factory",
        name: "机械工厂",
        description: "血量≥8时，获得一张\"机械哨兵\"卡牌；血量＜8时，恢复3点血量。",
        priority: 3,
        effect: []
    },
    "full_battery_bomb": {
        id: "full_battery_bomb",
        name: "满蓄电池炸弹",
        description: "造成9点攻击，消耗3行动。",
        priority: 5,
        effect: [],
        cost: {
            action: 3
        }
    },
    "mechanical_bomb": {
        id: "mechanical_bomb",
        name: "机械炸弹",
        description: "自身的\"机械炸弹\"buff减少一层，消耗1行动。",
        priority: 2,
        effect: [],
        cost: {
            action: 1
        }
    },
    "brand_new_gear": {
        id: "brand_new_gear",
        name: "崭新齿轮",
        description: "造成2点攻击。",
        priority: 1,
        effect: []
    },
    "unexpired_oil": {
        id: "unexpired_oil",
        name: "没过期的机油",
        description: "增加2点行动力。",
        priority: 2,
        effect: []
    },
    "mechanical_guard": {
        id: "mechanical_guard",
        name: "机械护卫队",
        description: "获得1真防，每使用一次该牌，行动力会增加用该牌的次数，消耗2行动。",
        priority: 3,
        effect: [],
        cost: {
            action: 2
        }
    },
    "mechanical_crushed_stone": {
        id: "mechanical_crushed_stone",
        name: "机械碎石",
        description: "造成2点攻击，下回合再造成2点攻击，消耗1行动。",
        priority: 2,
        effect: [],
        cost: {
            action: 1
        }
    },
    "mechanical_meteorite": {
        id: "mechanical_meteorite",
        name: "机械陨石",
        description: "降低对方4层防御和4层真防，造成4点攻击，消耗3行动。",
        priority: 4,
        effect: [],
        cost: {
            action: 3
        }
    },
    "reapers_whisper": {
        id: "reapers_whisper",
        name: "死神低语",
        description: "造成15点真攻，消耗3行动。",
        priority: 5,
        effect: [],
        cost: {
            action: 3
        }
    },
    "reapers_groan": {
        id: "reapers_groan",
        name: "死神的呻吟",
        description: "造成9点真攻，消耗4行动。",
        priority: 5,
        effect: [],
        cost: {
            action: 4
        }
    },
    "mountain_ghoul": {
        id: "mountain_ghoul",
        name: "山鬼",
        description: "造成1点攻击，并获得1层锋利，消耗1行动。",
        priority: 2,
        effect: [],
        cost: {
            action: 1
        }
    },
    "forest_ghoul": {
        id: "forest_ghoul",
        name: "林鬼",
        description: "造成1点攻击，获得1回合\"传导\"效果，消耗3行动。",
        priority: 2,
        effect: [],
        cost: {
            action: 3
        }
    },
    "drowned_ghoul": {
        id: "drowned_ghoul",
        name: "溺鬼",
        description: "获得2点真防和1点防御，消耗1行动。",
        priority: 2,
        effect: [],
        cost: {
            action: 1
        }
    },
    "hungry_ghoul": {
        id: "hungry_ghoul",
        name: "饿鬼",
        description: "造成1点攻击，增加1点行动力。",
        priority: 2,
        effect: []
    },
    "lonely_ghoul": {
        id: "lonely_ghoul",
        name: "孤鬼",
        description: "造成7点攻击，本回合无法继续出牌，消耗1行动。",
        priority: 4,
        effect: [],
        cost: {
            action: 1
        }
    },
    "stingy_ghoul": {
        id: "stingy_ghoul",
        name: "吝鬼",
        description: "造成1点攻击，减少对方1点行动力和1点真防，消耗2行动。",
        priority: 2,
        effect: [],
        cost: {
            action: 2
        }
    },
    "ghostly_figures": {
        id: "ghostly_figures",
        name: "魑魅魍魉",
        description: "造成2点攻击，下回合再造成2点攻击，获得2点真防和2点防御，减少对方2点行动力，消耗2行动。",
        priority: 3,
        effect: [],
        cost: {
            action: 2
        }
    },
    "yin_spirit": {
        id: "yin_spirit",
        name: "阴魂",
        description: "减少对方2点真防，恢复2点血量，消耗2行动。",
        priority: 2,
        effect: [],
        cost: {
            action: 2
        }
    },
    "yang_spirit": {
        id: "yang_spirit",
        name: "阳魂",
        description: "造成3点攻击，获得2点真防，消耗2行动。",
        priority: 3,
        effect: [],
        cost: {
            action: 2
        }
    },
    "curse": {
        id: "curse",
        name: "诅咒",
        description: "获得\"虚幻咒语\"效果。",
        priority: 1,
        effect: []
    },
    "devour": {
        id: "devour",
        name: "吞噬",
        description: "减少对方2点行动力，消耗1行动。",
        priority: 2,
        effect: [],
        cost: {
            action: 1
        }
    },
    "will_o_wisp": {
        id: "will_o_wisp",
        name: "鬼火",
        description: "弃掉对方一张手牌，消耗1行动。",
        priority: 2,
        effect: [],
        cost: {
            action: 1
        }
    },
    "end_tears": {
        id: "end_tears",
        name: "终焉之泪",
        description: "造成10点攻击，扣除对方70点真防，消耗3行动。",
        priority: 5,
        effect: [],
        cost: {
            action: 3
        }
    },
    "darkness_enhanced": {
        id: "darkness_enhanced",
        name: "暗寂强化",
        description: "造成10点攻击，恢复3点血量，获得2点真防。",
        priority: 4,
        effect: []
    },
    "darkness_erosive_heart": {
        id: "darkness_erosive_heart",
        name: "暗寂（蚀心）",
        description: "自身受到3点攻击，造成18点攻击，消耗1行动。",
        priority: 5,
        effect: [],
        cost: {
            action: 1,
            health: 3
        }
    },
    "shattered_erosive_blade": {
        id: "shattered_erosive_blade",
        name: "破碎蚀心刃",
        description: "使对方获得\"腐蚀\"效果（只能有一层）。",
        priority: 4,
        effect: []
    },
    "darkness_shattered_erosive": {
        id: "darkness_shattered_erosive",
        name: "暗寂（破碎蚀心）",
        description: "受到5攻击后，进行15攻击，消耗1行动。",
        priority: 5,
        effect: [],
        cost: {
            action: 1
        }
    },
    "darkness_shadow_form": {
        id: "darkness_shadow_form",
        name: "暗寂影化",
        description: "造成15点攻击，恢复7点血量，获得5点防御和5点真防。",
        priority: 5,
        effect: []
    },
    "darkness_erosive_weakened": {
        id: "darkness_erosive_weakened",
        name: "暗寂（蚀心弱化）",
        description: "自身受到2点攻击，造成5点攻击，消耗2行动。",
        priority: 3,
        effect: [],
        cost: {
            action: 2,
            health: 2
        }
    },
    "shadow_card": {
        id: "shadow_card",
        name: "影子",
        description: "使用时变为上一张打出的手牌。",
        priority: 3,
        effect: []
    },
    "well_fitting_robe": {
        id: "well_fitting_robe",
        name: "合身长袍",
        description: "自身受到2点攻击，获得5点防御和2点真防。",
        priority: 2,
        effect: [],
        cost: {
            health: 2
        }
    },
    "brand_new_page": {
        id: "brand_new_page",
        name: "崭新书页",
        description: "造成1点攻击，获得1点真防，消耗1行动。",
        priority: 2,
        effect: [],
        cost: {
            action: 1
        }
    },
    "normal_candlelight": {
        id: "normal_candlelight",
        name: "正常烛光",
        description: "随机弃掉对方一张牌。",
        priority: 2,
        effect: []
    },
    "interesting_staff": {
        id: "interesting_staff",
        name: "有趣法杖",
        description: "造成2点真攻。",
        priority: 3,
        effect: []
    },
    "wonderful_potion": {
        id: "wonderful_potion",
        name: "妙用药瓶",
        description: "将当前的防御全部变为真防。",
        priority: 2,
        effect: []
    },
    "intelligence_reducing_hat": {
        id: "intelligence_reducing_hat",
        name: "降智帽子",
        description: "恢复5点血量，并复制一张对方卡牌给对方。",
        priority: 3,
        effect: []
    },
    "lovable_clock": {
        id: "lovable_clock",
        name: "惹人喜爱的钟表",
        description: "造成10点攻击，消耗2行动。",
        priority: 5,
        effect: [],
        cost: {
            action: 2
        }
    }
};
