import { Card } from "../CardGame";

// 卡牌效果类型定义
export interface CardEffect {
    type: 'damage' | 'heal' | 'buff' | 'debuff' | 'draw' | 'discard';
    target: 'self' | 'opponent' | 'both';
    value?: number;
    // 对于buff/debuff效果的额外参数
    buffType?: 'action_point_boost' | 'action_point_reduce' | 'defense_boost';
    duration?: number;
    description?: string;
}

// 所有卡牌数据
export const CARD_TEMPLATES: Record<string, Card> = {
  punch: {
    id: "punch",
    name: "拳击",
    description: "造成1点攻击。",
    priority: 10,
    effect: [
      {
        id: "do_attack",
        duration: 1000,
        target: "other"
      }
    ],
    cost: {}
  },
  parry: {
    id: "parry",
    name: "招架",
    description: "造成1点攻击，消耗1行动，并减少对方1点行动力。",
    priority: 12,
    effect: [
      {
        id: "do_attack",
        duration: 1,
        target: "other"
      },
      {
        id: "do_action_add",
        duration: -1,
        target: "other"
      }
    ],
    cost: {
      action: 1
    }
  },
  hook: {
    id: "hook",
    name: "勾拳",
    description: "造成3点攻击，消耗2行动。",
    priority: 15,
    effect: [
      {
        id: "do_attack",
        duration: 3,
        target: "other"
      }
    ],
    cost: {
      action: 2
    }
  },
  dodge: {
    id: "dodge",
    name: "闪避",
    description: "获得2点防御，消耗1行动。",
    priority: 8,
    effect: [
      {
        id: "do_defence",
        duration: 2,
        target: "self"
      }
    ],
    cost: {
      action: 1
    }
  },
  combo: {
    id: "combo",
    name: "连击",
    description: "下次伤害翻倍。",
    priority: 10,
    effect: [
      {
        id: "combo",
        duration: 1,
        target: "self"
      }
    ],
    cost: {}
  },
  holy_shield: {
    id: "holy_shield",
    name: "圣盾",
    description: "获得3点真防，消耗1行动。",
    priority: 8,
    effect: [
      {
        id: "do_true_defence",
        duration: 3,
        target: "self"
      }
    ],
    cost: {
      action: 1
    }
  },
  holiness: {
    id: "holiness",
    name: "圣洁",
    description: "恢复3点血量，消耗1行动。",
    priority: 5,
    effect: [
      {
        id: "do_health",
        duration: 3,
        target: "self"
      }
    ],
    cost: {
      action: 1
    }
  },
  darkness_initial: {
    id: "darkness_initial",
    name: "暗寂（初）",
    description: "造成5点攻击，但自身受到1点伤害，消耗2行动。一场战斗只能用一次。",
    priority: 20,
    useOnce: true,
    effect: [
      {
        id: "do_attack",
        duration: 5,
        target: "other"
      },
      {
        id: "do_attack",
        duration: 1,
        target: "self"
      }
    ],
    cost: {
      action: 2
    }
  },
  darkness: {
    id: "darkness",
    name: "暗寂",
    description: "造成5点攻击，消耗2行动。一场战斗只能用一次。",
    priority: 22,
    useOnce: true,
    effect: [
      {
        id: "do_attack",
        duration: 5,
        target: "other"
      }
    ],
    cost: {
      action: 2
    }
  },
  darkness_final: {
    id: "darkness_final",
    name: "暗寂（终）",
    description: "造成5点攻击，消耗1行动。一场战斗只能用一次。",
    priority: 25,
    useOnce: true,
    effect: [
      {
        id: "do_attack",
        duration: 5,
        target: "other"
      }
    ],
    cost: {
      action: 1
    }
  },
  enlightenment: {
    id: "enlightenment",
    name: "觉悟",
    description: "自身受到2点攻击，增加1行动，免疫下一次伤害。",
    priority: 18,
    effect: [
      {
        id: "do_attack",
        duration: 2,
        target: "self"
      },
      {
        id: "do_action_add",
        duration: 1,
        target: "self"
      },
      {
        id: "immunication",
        duration: 1,
        target: "self"
      }
    ],
    cost: {}
  },
  little_stone: {
    id: "little_stone",
    name: "小石子",
    description: "造成1点攻击，消耗1行动。",
    priority: 9,
    effect: [
      {
        id: "do_attack",
        duration: 1,
        target: "other"
      }
    ],
    cost: {
      action: 1
    }
  },
  strange_stone: {
    id: "strange_stone",
    name: "奇怪的石头",
    description: "抽一张牌。",
    priority: 4,
    effect: [
      {
        id: "do_get_card",
        duration: 1,
        target: "self"
      }
    ],
    cost: {}
  },
  bedrock: {
    id: "bedrock",
    name: "磐石",
    description: "获得2点防御，消耗1行动。",
    priority: 6,
    effect: [
      {
        id: "do_defence",
        duration: 2,
        target: "self"
      }
    ],
    cost: {
      action: 1
    }
  },
  large_rock: {
    id: "large_rock",
    name: "大石块",
    description: "获得2点攻击加成，消耗2行动。",
    priority: 11,
    effect: [
      {
        id: "do_attack",
        duration: 2,
        target: "other"
      }
    ],
    cost: {
      action: 2
    }
  },
  red_stone: {
    id: "red_stone",
    name: "赤石",
    description: "造成4点攻击，消耗2行动。",
    priority: 14,
    effect: [
      {
        id: "do_attack",
        duration: 4,
        target: "other"
      }
    ],
    cost: {
      action: 2
    }
  },
  diamond: {
    id: "diamond",
    name: "钻石",
    description: "获得5点防御，消耗2行动。",
    priority: 7,
    effect: [
      {
        id: "do_defence",
        duration: 5,
        target: "self"
      }
    ],
    cost: {
      action: 2
    }
  },
  crushed_stone: {
    id: "crushed_stone",
    name: "碎石",
    description: "造成1点攻击，使对方2回合无法回血，消耗1行动。",
    priority: 13,
    effect: [
      {
        id: "do_attack",
        duration: 1,
        target: "other"
      },
      {
        id: "incurable",
        duration: 2,
        target: "other"
      }
    ],
    cost: {
      action: 1
    }
  },
  pebble: {
    id: "pebble",
    name: "鹅卵石",
    description: "造成2点攻击，获得2点防御，消耗2行动。",
    priority: 16,
    effect: [
      {
        id: "do_attack",
        duration: 2,
        target: "other"
      },
      {
        id: "do_defence",
        duration: 2,
        target: "self"
      }
    ],
    cost: {
      action: 2
    }
  },
  meteorite: {
    id: "meteorite",
    name: "陨石",
    description: "造成7点攻击，消耗4行动。",
    priority: 25,
    effect: [
      {
        id: "do_attack",
        duration: 7,
        target: "other"
      }
    ],
    cost: {
      action: 4
    }
  },
  tear_of_no_trace: {
    id: "tear_of_no_trace",
    name: "无痕之“泪”",
    description: "无视任何效果造成3伤害，消耗1行动。",
    priority: 17,
    effect: [
      {
        id: "do_true_attack",
        duration: 3,
        target: "other"
      }
    ],
    cost: {
      action: 1
    }
  },
  ill_fitting_robe: {
    id: "ill_fitting_robe",
    name: "不合身的长袍",
    description: "自身受到2点伤害，获得5点防御和2点真防。",
    priority: 5,
    effect: [
      {
        id: "do_attack",
        duration: 2,
        target: "self"
      },
      {
        id: "do_defence",
        duration: 5,
        target: "self"
      },
      {
        id: "do_true_defence",
        duration: 2,
        target: "self"
      }
    ],
    cost: {}
  },
  faded_page: {
    id: "faded_page",
    name: "泛黄书页",
    description: "造成1点攻击，获得1点真防，消耗1行动。",
    priority: 10,
    effect: [
      {
        id: "do_attack",
        duration: 1,
        target: "other"
      },
      {
        id: "do_true_defence",
        duration: 1,
        target: "self"
      }
    ],
    cost: {
      action: 1
    }
  },
  eerie_candlelight: {
    id: "eerie_candlelight",
    name: "诡异烛光",
    description: "自身受到2点攻击，随机弃掉对方一张手牌。",
    priority: 8,
    effect: [
      {
        id: "do_attack",
        duration: 2,
        target: "self"
      },
      {
        id: "do_drop_card",
        duration: 1,
        target: "other"
      }
    ],
    cost: {}
  },
  boring_staff: {
    id: "boring_staff",
    name: "无趣法杖",
    description: "无视任何效果造成2点伤害，消耗1行动。",
    priority: 16,
    effect: [
      {
        id: "do_true_attack",
        duration: 2,
        target: "other"
      }
    ],
    cost: {
      action: 1
    }
  },
  useless_potion: {
    id: "useless_potion",
    name: "无用药瓶",
    description: "将当前的防御全部变为真防。",
    priority: 3,
    effect: [
      {
        id: "do_defence_switch",
        target: "self"
      }
    ],
    cost: {}
  },
  wise_hat: {
    id: "wise_hat",
    name: "睿智帽子",
    description: "随机复制一张对方的卡牌。",
    priority: 2,
    effect: [
      {
        id: "do_copy_target_card",
        duration: 1,
        target: "self"
      }
    ],
    cost: {}
  },
  annoying_clock: {
    id: "annoying_clock",
    name: "惹人生厌的钟表",
    description: "造成10点攻击，消耗2行动，并使敌方获得1层锋利。",
    priority: 24,
    effect: [
      {
        id: "do_attack",
        duration: 10,
        target: "other"
      },
      {
        id: "sharp",
        duration: 1,
        target: "other"
      }
    ],
    cost: {
      action: 2
    }
  },
  witchs_gift: {
    id: "witchs_gift",
    name: "巫婆的馈赠",
    description: "重新抽取所有手牌。回复5Hp",
    priority: 1,
    effect: [
      {
        id: "do_reflesh",
        target: "self"
      },
      {
        id: "do_health",
        target: "self",
        duration: 5,
      },
    ],
    cost: {}
  },
  mechanical_shield: {
    id: "mechanical_shield",
    name: "机械坚盾",
    description: "获得3点防御，消耗1行动。",
    priority: 6,
    effect: [
      {
        id: "do_defence",
        duration: 3,
        target: "self"
      }
    ],
    cost: {
      action: 1
    }
  },
  nano_armor: {
    id: "nano_armor",
    name: "纳米护甲",
    description: "获得2点防御，免疫下一次攻击，消耗2行动。",
    priority: 10,
    effect: [
      {
        id: "do_defence",
        duration: 2,
        target: "self"
      },
      {
        id: "immunication",
        duration: 1,
        target: "self"
      }
    ],
    cost: {
      action: 2
    }
  },
  mechanical_defense: {
    id: "mechanical_defense",
    name: "机械防御",
    description: "获得2点真防，消耗2行动。",
    priority: 9,
    effect: [
      {
        id: "do_true_defence",
        duration: 2,
        target: "self"
      }
    ],
    cost: {
      action: 2
    }
  },
  mechanical_arm_swing: {
    id: "mechanical_arm_swing",
    name: "机械挥臂",
    description: "自身受到2点攻击，造成1点攻击，并获得1回合“转化”效果，消耗3行动。",
    priority: 12,
    effect: [
      {
        id: "do_attack",
        duration: 2,
        target: "self"
      },
      {
        id: "do_attack",
        duration: 1,
        target: "other"
      },
      {
        id: "transfer",
        duration: 1,
        target: "self"
      }
    ],
    cost: {
      action: 3
    }
  },
  worn_gear: {
    id: "worn_gear",
    name: "破旧齿轮",
    description: "造成1点攻击。",
    priority: 8,
    effect: [
      {
        id: "do_attack",
        duration: 1,
        target: "other"
      }
    ],
    cost: {}
  },
  expired_oil: {
    id: "expired_oil",
    name: "过期机油",
    description: "自身受到2点攻击，增加2点行动力。",
    priority: 4,
    effect: [
      {
        id: "do_attack",
        duration: 2,
        target: "self"
      },
      {
        id: "do_action_add",
        duration: 2,
        target: "self"
      }
    ],
    cost: {}
  },
  swap_robot: {
    id: "swap_robot",
    name: "交换机器人",
    description: "交换自身真防和防御的数值，回复3Hp",
    priority: 5,
    effect: [
      {
        id: "do_defence_switch",
        target: "self"
      },
      {
        id: "do_health",
        duration: 3,
        target: "self",
      }
    ],
    cost: {
    }
  },
  mechanical_sentry: {
    id: "mechanical_sentry",
    name: "机械哨兵",
    description: "造成1点攻击，并获得1层“机械哨兵”效果，消耗1行动。",
    priority: 10,
    effect: [
      {
        id: "do_attack",
        duration: 1,
        target: "other"
      },
      {
        id: "mechanical_sentry",
        duration: 1,
        target: "self"
      }
    ],
    cost: {
      action: 1
    }
  },
  mechanical_factory: {
    id: "mechanical_factory",
    name: "机械工厂",
    description: "血量≥8时，获得一张“机械哨兵”卡牌；血量＜8时，恢复3点血量。",
    priority: 7,
    effect: [
      {
        id: "do_mechanical_factory",
        duration: 0,
        target: "self"
      }
    ],
    cost: {
    }
  },
  full_battery_bomb: {
    id: "full_battery_bomb",
    name: "满蓄电池炸弹",
    description: "造成9点攻击，消耗3行动。",
    priority: 23,
    effect: [
      {
        id: "do_attack",
        duration: 9,
        target: "other"
      }
    ],
    cost: {
      action: 3
    }
  },
  mechanical_bomb: {
    id: "mechanical_bomb",
    name: "机械炸弹",
    description: "自身的“机械炸弹”buff减少一层，消耗1行动。一场战斗只能使用一次。",
    useOnce: true,
    priority: 1,
    effect: [
      {
        id: "do_mechanical_bomb_decrease",
        duration: 1,
        target: "self"
      }
    ],
    cost: {
      action: 1
    }
  },
  brand_new_gear: {
    id: "brand_new_gear",
    name: "崭新齿轮",
    description: "造成2点攻击。",
    priority: 10,
    effect: [
      {
        id: "do_attack",
        duration: 2,
        target: "other"
      }
    ],
    cost: {}
  },
  unexpired_oil: {
    id: "unexpired_oil",
    name: "没过期的机油",
    description: "增加2点行动力。",
    priority: 5,
    effect: [
      {
        id: "do_action_add",
        duration: 2,
        target: "self"
      }
    ],
    cost: {}
  },
  mechanical_guard: {
    id: "mechanical_guard",
    name: "机械护卫队",
    description: "获得1真防，每使用一次该牌，行动力会增加用该牌的次数，消耗2行动。",
    priority: 10,
    effect: [
      {
        id: "do_true_defence",
        duration: 1,
        target: "self"
      },
      {
        id: "do_mechanical_guard",
        duration: 1,
        target: "self"
      },
      {
        id: "mechanical_guard",
        duration: 1,
        target: "self"
      }
    ],
    cost: {
      action: 2
    }
  },
  mechanical_crushed_stone: {
    id: "mechanical_crushed_stone",
    name: "机械碎石",
    description: "造成2点攻击，下回合再造成2点攻击，消耗1行动。",
    priority: 13,
    effect: [
      {
        id: "do_attack",
        duration: 2,
        target: "other"
      },
      {
        id: "delay_attack",
        duration: 2,
        target: "self"
      }
    ],
    cost: {
      action: 1
    }
  },
  mechanical_meteorite: {
    id: "mechanical_meteorite",
    name: "机械陨石",
    description: "降低对方4层防御和4层真防，造成4点攻击，消耗3行动。",
    priority: 25,
    effect: [
      {
        id: "do_defence_decrease",
        duration: 4,
        target: "other"
      },
      {
        id: "do_true_defence_decrease",
        duration: 4,
        target: "other"
      },
      {
        id: "do_attack",
        duration: 4,
        target: "other"
      }
    ],
    cost: {
      action: 3
    }
  },
  reapers_whisper: {
    id: "reapers_whisper",
    name: "死神低语",
    description: "无视任何效果造成15点伤害，消耗3行动。获得3真防",
    priority: 30,
    effect: [
      {
        id: "do_true_attack",
        duration: 15,
        target: "other"
      },
      {
      id:"do_true_defence",
      duration:3,
      target:"self",
      }
    ],
    cost: {
      action: 3
    }
    
  },
  reapers_groan: {
    id: "reapers_groan",
    name: "死神的呻吟",
    description: "无视任何效果造成9点伤害，消耗2行动。",
    priority: 28,
    effect: [
      {
        id: "do_true_attack",
        duration: 9,
        target: "other"
      }
    ],
    cost: {
      action: 2
    }
  },
  mountain_ghoul: {
    id: "mountain_ghoul",
    name: "山鬼",
    description: "造成1点攻击，并获得1层锋利，消耗1行动。",
    priority: 10,
    effect: [
      {
        id: "do_attack",
        duration: 1,
        target: "other"
      },
      {
        id: "sharp",
        duration: 1,
        target: "self"
      }
    ],
    cost: {
      action: 1
    }
  },
  forest_ghoul: {
    id: "forest_ghoul",
    name: "林鬼",
    description: "造成1点攻击，获得1回合“传导”效果，消耗3行动。",
    priority: 35,
    effect: [
      {
        id: "do_attack",
        duration: 1,
        target: "other"
      },
      {
        id: "conduction",
        duration: 1,
        target: "self"
      }
    ],
    cost: {
      action: 3
    }
  },
  drowned_ghoul: {
    id: "drowned_ghoul",
    name: "溺鬼",
    description: "获得2点真防和1点防御，消耗1行动。",
    priority: 7,
    effect: [
      {
        id: "do_true_defence",
        duration: 2,
        target: "self"
      },
      {
        id: "do_defence",
        duration: 1,
        target: "self"
      }
    ],
    cost: {
      action: 1
    }
  },
  hungry_ghoul: {
    id: "hungry_ghoul",
    name: "饿鬼",
    description: "造成1点攻击，增加1点行动力。",
    priority: 10,
    effect: [
      {
        id: "do_attack",
        duration: 1,
        target: "other"
      },
      {
        id: "do_action_add",
        duration: 1,
        target: "self"
      }
    ],
    cost: {}
  },
  lonely_ghoul: {
    id: "lonely_ghoul",
    name: "孤鬼",
    description: "造成7点攻击，本回合无法继续出牌，消耗1行动。",
    priority: 25,
    effect: [
      {
        id: "do_attack",
        duration: 7,
        target: "other"
      },
      {
        id: "ban",
        duration: 1,
        target: "self"
      }
    ],
    cost: {
      action: 1
    }
  },
  stingy_ghoul: {
    id: "stingy_ghoul",
    name: "吝鬼",
    description: "造成1点攻击，减少对方1点行动力和1点真防，消耗1行动。",
    priority: 15,
    effect: [
      {
        id: "do_attack",
        duration: 1,
        target: "other"
      },
      {
        id: "do_action_add",
        duration: -1,
        target: "other"
      },
      {
        id: "do_true_defence_decrease",
        duration: 1,
        target: "other"
      }
    ],
    cost: {
      action: 1
    }
  },
  ghostly_figures: {
    id: "ghostly_figures",
    name: "魑魅魍魉",
    description: "造成2点攻击，下回合再造成2点攻击，获得2点真防和2点防御，减少对方2点行动力，消耗2行动。",
    priority: 20,
    effect: [
      {
        id: "do_attack",
        duration: 2,
        target: "other"
      },
      {
        id: "delay_attack",
        duration: 2,
        target: "self"
      },
      {
        id: "do_true_defence",
        duration: 2,
        target: "self"
      },
      {
        id: "do_defence",
        duration: 2,
        target: "self"
      },
      {
        id: "do_action_add",
        duration: -2,
        target: "other"
      }
    ],
    cost: {
      action: 2
    }
  },
  yin_spirit: {
    id: "yin_spirit",
    name: "阴魂",
    description: "减少对方2点真防，恢复2点血量，消耗2行动。",
    priority: 12,
    effect: [
      {
        id: "do_true_defence_decrease",
        duration: 2,
        target: "other"
      },
      {
        id: "do_health",
        duration: 2,
        target: "self"
      }
    ],
    cost: {
      action: 2
    }
  },
  yang_spirit: {
    id: "yang_spirit",
    name: "阳魂",
    description: "造成3点攻击，获得2点真防，消耗2行动。",
    priority: 18,
    effect: [
      {
        id: "do_attack",
        duration: 3,
        target: "other"
      },
      {
        id: "do_true_defence",
        duration: 2,
        target: "self"
      }
    ],
    cost: {
      action: 2
    }
  },
  curse: {
    id: "curse",
    name: "诅咒",
    description: "获得“虚幻咒语”效果。",
    priority: 3,
    effect: [
      {
        id: "unreal_spell",
        duration: 1,
        target: "self"
      }
    ],
    cost: {}
  },
  devour: {
    id: "devour",
    name: "吞噬",
    description: "减少对方2点行动力，消耗1行动。",
    priority: 10,
    effect: [
      {
        id: "do_action_add",
        duration: -2,
        target: "other"
      }
    ],
    cost: {
      action: 1
    }
  },
  will_o_wisp: {
    id: "will_o_wisp",
    name: "鬼火",
    description: "弃掉对方一张手牌，消耗1行动。",
    priority: 9,
    effect: [
      {
        id: "do_drop_card",
        duration: 1,
        target: "other"
      }
    ],
    cost: {
      action: 1
    }
  },
  end_tears: {
    id: "end_tears",
    name: "终焉之泪",
    description: "造成10点攻击，扣除对方70点真防，消耗3行动。",
    priority: 35,
    effect: [
      {
        id: "do_attack",
        duration: 10,
        target: "other"
      },
      {
        id: "do_true_defence_decrease",
        duration: 70,
        target: "other"
      }
    ],
    cost: {
      action: 3
    }
  },
  darkness_enhanced: {
    id: "darkness_enhanced",
    name: "暗寂强化",
    description: "造成10点攻击，恢复3点血量，获得2点真防。一场战斗只能用一次。",
    priority: 28,
    useOnce: true,
    effect: [
      {
        id: "do_attack",
        duration: 10,
        target: "other"
      },
      {
        id: "do_health",
        duration: 3,
        target: "self"
      },
      {
        id: "do_true_defence",
        duration: 2,
        target: "self"
      }
    ],
    cost: {}
  },
  darkness_erosive_heart: {
    id: "darkness_erosive_heart",
    name: "暗寂（蚀心）",
    description: "自身受到3点攻击，造成18点攻击，消耗1行动。一场战斗只能用一次。",
    priority: 32,
    useOnce: true,
    effect: [
      {
        id: "do_attack",
        duration: 3,
        target: "self"
      },
      {
        id: "do_attack",
        duration: 18,
        target: "other"
      }
    ],
    cost: {
      action: 1
    }
  },
  shattered_erosive_blade: {
    id: "shattered_erosive_blade",
    name: "破碎蚀心刃",
    description: "使对方获得“腐蚀”效果（只能有一层）。",
    priority: 15,
    effect: [
      {
        id: "erosive",
        duration: 1,
        target: "other"
      }
    ],
    cost: {}
  },
  darkness_shattered_erosive: {
    id: "darkness_shattered_erosive",
    name: "暗寂（破碎蚀心）",
    description: "受到5攻击后，进行15攻击，消耗1行动。一场战斗只能用一次。",
    priority: 18,
    useOnce: true,
    effect: [
      {
        id: "do_attack",
        duration: 5,
        target: "self"
      },   
      {
        id: "do_attack",
        duration: 15,
        target: "other"
      },
    ],
    cost: {
      action: 1
    }
  },
  darkness_shadow_form: {
    id: "darkness_shadow_form",
    name: "暗寂影化",
    description: "造成15点攻击，恢复7点血量，获得5点防御和5点真防。一场战斗只能用一次。",
    priority: 30,
    useOnce: true,
    effect: [
      {
        id: "do_attack",
        duration: 15,
        target: "other"
      },
      {
        id: "do_health",
        duration: 7,
        target: "self"
      },
      {
        id: "do_defence",
        duration: 5,
        target: "self"
      },
      {
        id: "do_true_defence",
        duration: 5,
        target: "self"
      }
    ],
    cost: {}
  },
  darkness_erosive_weakened: {
    id: "darkness_erosive_weakened",
    name: "暗寂（蚀心弱化）",
    description: "自身受到2点攻击，造成5点攻击，消耗2行动。一场战斗只能用一次。",
    priority: 20,
    useOnce: true,
    effect: [
      {
        id: "do_attack",
        duration: 2,
        target: "self"
      },
      {
        id: "do_attack",
        duration: 5,
        target: "other"
      }
    ],
    cost: {
      action: 2
    }
  },
  shadow_card: {
    id: "shadow_card",
    name: "影子",
    description: "使用时变为上一张打出的手牌。",
    priority: 2,
    effect: [],
    cost: {}
  },
  well_fitting_robe: {
    id: "well_fitting_robe",
    name: "合身长袍",
    description: "自身受到2点攻击，获得5点防御和2点真防。",
    priority: 5,
    effect: [
      {
        id: "do_attack",
        duration: 2,
        target: "self"
      },
      {
        id: "do_defence",
        duration: 5,
        target: "self"
      },
      {
        id: "do_true_defence",
        duration: 2,
        target: "self"
      }
    ],
    cost: {}
  },
  brand_new_page: {
    id: "brand_new_page",
    name: "崭新书页",
    description: "造成1点攻击，获得1点真防。",
    priority: 10,
    effect: [
      {
        id: "do_attack",
        duration: 1,
        target: "other"
      },
      {
        id: "do_true_defence",
        duration: 1,
        target: "self"
      }
    ],
    cost: {
    }
  },
  normal_candlelight: {
    id: "normal_candlelight",
    name: "正常烛光",
    description: "随机弃掉对方一张牌。",
    priority: 8,
    effect: [
      {
        id: "do_drop_card",
        duration: 1,
        target: "other"
      }
    ],
    cost: {}
  },
  interesting_staff: {
    id: "interesting_staff",
    name: "有趣法杖",
    description: "无视任何效果造成2点伤害。",
    priority: 16,
    effect: [
      {
        id: "do_true_attack",
        duration: 2,
        target: "other"
      }
    ],
    cost: {}
  },
  wonderful_potion: {
    id: "wonderful_potion",
    name: "妙用药瓶",
    description: "将当前的防御全部变为真防，回复3Hp。",
    priority: 3,
    effect: [
      {
        id: "do_defence_add_to_true_defence",
        target: "self"
      },
      {
        id: "do_health",
        duration: 3,
        target: "self"
      }
    ],
    cost: {}
  },
  intelligence_reducing_hat: {
    id: "intelligence_reducing_hat",
    name: "降智帽子",
    description: "恢复5点血量，并复制一张对方卡牌给对方。",
    priority: 2,
    effect: [
      {
        id: "do_health",
        duration: 5,
        target: "self"
      },
      {
        id: "do_copy_target_card",
        duration: 1,
        target: "other"
      }
    ],
    cost: {}
  },
  lovable_clock: {
    id: "lovable_clock",
    name: "惹人喜爱的钟表",
    description: "造成10点攻击，消耗2行动。",
    priority: 24,
    effect: [
      {
        id: "do_attack",
        duration: 10,
        target: "other"
      }
    ],
    cost: {
      action: 2
    }
  }
};