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

// 卡牌数据接口
export interface CardData {
    id: string;
    name: string;
    description: string;
    type: 'attack' | 'defense' | 'special';
    cost: number;
    power: number;
    priority: number;
    effects: CardEffect[];
}

// 所有卡牌数据
export const CARD_TEMPLATES: Record<string, CardData> = {
    // 直拳系列
    'straight_punch_1': { 
        id: 'straight_punch_1', 
        name: '直拳I', 
        description: '造成1点伤害', 
        type: 'attack', 
        cost: 0, 
        power: 1, 
        priority: 1,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 1
            }
        ]
    },
    'straight_punch_2': { 
        id: 'straight_punch_2', 
        name: '直拳II', 
        description: '造成2点伤害', 
        type: 'attack', 
        cost: 0, 
        power: 2, 
        priority: 2,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 2
            }
        ]
    },
    'straight_punch_3': { 
        id: 'straight_punch_3', 
        name: '直拳III', 
        description: '造成3点伤害', 
        type: 'attack', 
        cost: 0, 
        power: 3, 
        priority: 3,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 3
            }
        ]
    },

    // 上勾拳系列
    'uppercut_1': { 
        id: 'uppercut_1', 
        name: '上勾拳I', 
        description: '消耗1行动力，造成3伤害，敌方行动力减1', 
        type: 'attack', 
        cost: 1, 
        power: 3, 
        priority: 4,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 3
            },
            {
                type: 'debuff',
                target: 'opponent',
                value: 1,
                buffType: 'action_point_reduce',
                duration: 0,
                description: '敌方行动力减1'
            }
        ]
    },
    'uppercut_2': { 
        id: 'uppercut_2', 
        name: '上勾拳II', 
        description: '消耗1行动力，造成4伤害，敌方行动力减1', 
        type: 'attack', 
        cost: 1, 
        power: 4, 
        priority: 5,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 4
            },
            {
                type: 'debuff',
                target: 'opponent',
                value: 1,
                buffType: 'action_point_reduce',
                duration: 0,
                description: '敌方行动力减1'
            }
        ]
    },
    'uppercut_3': { 
        id: 'uppercut_3', 
        name: '上勾拳III', 
        description: '消耗1行动力，造成5伤害，敌方行动力减1', 
        type: 'attack', 
        cost: 1, 
        power: 5, 
        priority: 6,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 5
            },
            {
                type: 'debuff',
                target: 'opponent',
                value: 1,
                buffType: 'action_point_reduce',
                duration: 0,
                description: '敌方行动力减1'
            }
        ]
    },

    // 踢击系列
    'kick_1': { 
        id: 'kick_1', 
        name: '踢击I', 
        description: '消耗1行动力，造成4伤害', 
        type: 'attack', 
        cost: 1, 
        power: 4, 
        priority: 4,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 4
            }
        ]
    },
    'kick_2': { 
        id: 'kick_2', 
        name: '踢击II', 
        description: '消耗1行动力，造成5伤害', 
        type: 'attack', 
        cost: 1, 
        power: 5, 
        priority: 5,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 5
            }
        ]
    },
    'kick_3': { 
        id: 'kick_3', 
        name: '踢击III', 
        description: '消耗1行动力，造成6伤害', 
        type: 'attack', 
        cost: 1, 
        power: 6, 
        priority: 6,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 6
            }
        ]
    },

    // 高消耗攻击卡
    'push_kick': { 
        id: 'push_kick', 
        name: '直蹬', 
        description: '消耗3行动力，造成9伤害', 
        type: 'attack', 
        cost: 3, 
        power: 9, 
        priority: 8,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 9
            }
        ]
    },
    'skull_crusher': { 
        id: 'skull_crusher', 
        name: '碎颅', 
        description: '消耗4行动力，造成15伤害', 
        type: 'attack', 
        cost: 4, 
        power: 15, 
        priority: 10,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 15
            }
        ]
    },

    // 牺牲系列
    'sacrifice_1': { 
        id: 'sacrifice_1', 
        name: '牺牲I', 
        description: '消耗5血量，造成10伤害', 
        type: 'attack', 
        cost: 0, 
        power: 10, 
        priority: 7,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 10
            },
            {
                type: 'damage',
                target: 'self',
                value: 5
            }
        ]
    },
    'sacrifice_2': { 
        id: 'sacrifice_2', 
        name: '牺牲II', 
        description: '消耗6血量，造成15伤害', 
        type: 'attack', 
        cost: 0, 
        power: 15, 
        priority: 9,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 15
            },
            {
                type: 'damage',
                target: 'self',
                value: 6
            }
        ]
    },
    'sacrifice_3': { 
        id: 'sacrifice_3', 
        name: '牺牲III', 
        description: '消耗7血量，造成20伤害', 
        type: 'attack', 
        cost: 0, 
        power: 20, 
        priority: 11,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 20
            },
            {
                type: 'damage',
                target: 'self',
                value: 7
            }
        ]
    },

    // 眩晕
    'dizzy': { 
        id: 'dizzy', 
        name: '眩晕', 
        description: '消耗2行动力，造成5伤害，敌方下回合行动力减2', 
        type: 'attack', 
        cost: 2, 
        power: 5, 
        priority: 6,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 5
            },
            {
                type: 'debuff',
                target: 'opponent',
                value: 2,
                buffType: 'action_point_reduce',
                duration: 1,
                description: '敌方下回合行动力减2'
            }
        ]
    },

    // 计谋系列
    'strategy_1': { 
        id: 'strategy_1', 
        name: '计谋I', 
        description: '下回合行动力加1', 
        type: 'special', 
        cost: 0, 
        power: 0, 
        priority: 1,
        effects: [
            {
                type: 'buff',
                target: 'self',
                value: 1,
                buffType: 'action_point_boost',
                duration: 1,
                description: '下回合行动力加1'
            }
        ]
    },
    'strategy_2': { 
        id: 'strategy_2', 
        name: '计谋II', 
        description: '下回合行动力加2', 
        type: 'special', 
        cost: 0, 
        power: 0, 
        priority: 2,
        effects: [
            {
                type: 'buff',
                target: 'self',
                value: 2,
                buffType: 'action_point_boost',
                duration: 1,
                description: '下回合行动力加2'
            }
        ]
    },

    // 肾上腺素
    'adrenaline': { 
        id: 'adrenaline', 
        name: '肾上腺素', 
        description: '消耗2行动力，抽2张牌', 
        type: 'special', 
        cost: 2, 
        power: 0, 
        priority: 3,
        effects: [
            {
                type: 'draw',
                target: 'self',
                value: 2
            }
        ]
    },

    // 疾行
    'swift': { 
        id: 'swift', 
        name: '疾行', 
        description: '行动力加2', 
        type: 'special', 
        cost: 0, 
        power: 0, 
        priority: 1,
        effects: [
            {
                type: 'buff',
                target: 'self',
                value: 2,
                buffType: 'action_point_boost',
                duration: 0,
                description: '行动力加2'
            }
        ]
    },

    // 包扎系列
    'bandage_1': { 
        id: 'bandage_1', 
        name: '包扎I', 
        description: '行动力减1，血量加5', 
        type: 'special', 
        cost: 0, 
        power: 0, 
        priority: 1,
        effects: [
            {
                type: 'heal',
                target: 'self',
                value: 5
            },
            {
                type: 'debuff',
                target: 'self',
                value: 1,
                buffType: 'action_point_reduce',
                duration: 0,
                description: '行动力减1'
            }
        ]
    },
    'bandage_2': { 
        id: 'bandage_2', 
        name: '包扎II', 
        description: '行动力减2，血量加8', 
        type: 'special', 
        cost: 0, 
        power: 0, 
        priority: 2,
        effects: [
            {
                type: 'heal',
                target: 'self',
                value: 8
            },
            {
                type: 'debuff',
                target: 'self',
                value: 2,
                buffType: 'action_point_reduce',
                duration: 0,
                description: '行动力减2'
            }
        ]
    },
    'bandage_3': { 
        id: 'bandage_3', 
        name: '包扎III', 
        description: '行动力减2，血量加12', 
        type: 'special', 
        cost: 0, 
        power: 0, 
        priority: 3,
        effects: [
            {
                type: 'heal',
                target: 'self',
                value: 12
            },
            {
                type: 'debuff',
                target: 'self',
                value: 2,
                buffType: 'action_point_reduce',
                duration: 0,
                description: '行动力减2'
            }
        ]
    },

    // 兴奋系列
    'excite_1': { 
        id: 'excite_1', 
        name: '兴奋I', 
        description: '消耗1行动力，造成1伤害，抽1张牌', 
        type: 'attack', 
        cost: 1, 
        power: 1, 
        priority: 2,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 1
            },
            {
                type: 'draw',
                target: 'self',
                value: 1
            }
        ]
    },
    'excite_2': { 
        id: 'excite_2', 
        name: '兴奋II', 
        description: '消耗1行动力，造成3伤害，抽1张牌', 
        type: 'attack', 
        cost: 1, 
        power: 3, 
        priority: 4,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 3
            },
            {
                type: 'draw',
                target: 'self',
                value: 1
            }
        ]
    },
    'excite_3': { 
        id: 'excite_3', 
        name: '兴奋III', 
        description: '消耗1行动力，造成5伤害，抽1张牌', 
        type: 'attack', 
        cost: 1, 
        power: 5, 
        priority: 6,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 5
            },
            {
                type: 'draw',
                target: 'self',
                value: 1
            }
        ]
    },

    // 格挡系列
    'block_1': { 
        id: 'block_1', 
        name: '格挡I', 
        description: '消耗1行动力，防御力加3', 
        type: 'defense', 
        cost: 1, 
        power: 0, 
        priority: 3,
        effects: [
            {
                type: 'buff',
                target: 'self',
                value: 3,
                buffType: 'defense_boost',
                duration: 0,
                description: '防御力加3'
            }
        ]
    },
    'block_2': { 
        id: 'block_2', 
        name: '格挡II', 
        description: '消耗1行动力，防御力加4', 
        type: 'defense', 
        cost: 1, 
        power: 0, 
        priority: 4,
        effects: [
            {
                type: 'buff',
                target: 'self',
                value: 4,
                buffType: 'defense_boost',
                duration: 0,
                description: '防御力加4'
            }
        ]
    },
    'block_3': { 
        id: 'block_3', 
        name: '格挡III', 
        description: '消耗1行动力，防御力加5', 
        type: 'defense', 
        cost: 1, 
        power: 0, 
        priority: 5,
        effects: [
            {
                type: 'buff',
                target: 'self',
                value: 5,
                buffType: 'defense_boost',
                duration: 0,
                description: '防御力加5'
            }
        ]
    },

    // 闪避
    'dodge': { 
        id: 'dodge', 
        name: '闪避', 
        description: '消耗3行动力，防御力加7', 
        type: 'defense', 
        cost: 3, 
        power: 0, 
        priority: 3,
        effects: [
            {
                type: 'buff',
                target: 'self',
                value: 7,
                buffType: 'defense_boost',
                duration: 0,
                description: '防御力加7'
            }
        ]
    },

    // 架势
    'stance': { 
        id: 'stance', 
        name: '架势', 
        description: '消耗1行动力，获得本回合造成伤害的点数的防御力', 
        type: 'defense', 
        cost: 1, 
        power: 0, 
        priority: 4,
        effects: []
        // 这个效果需要在游戏主逻辑中特殊处理
    },

    // 蓄力
    'power_up': { 
        id: 'power_up', 
        name: '蓄力', 
        description: '消耗3行动力，本回合伤害翻倍', 
        type: 'attack', 
        cost: 3, 
        power: 0, 
        priority: 5,
        effects: []
        // 这个效果需要在游戏主逻辑中特殊处理
    },

    // 减速
    'slow': { 
        id: 'slow', 
        name: '减速', 
        description: '消耗1行动力，抽一张牌', 
        type: 'special', 
        cost: 1, 
        power: 0, 
        priority: 2,
        effects: [
            {
                type: 'draw',
                target: 'self',
                value: 1
            }
        ]
    },

    // 拖延
    'delay': { 
        id: 'delay', 
        name: '拖延', 
        description: '消耗1行动力', 
        type: 'special', 
        cost: 1, 
        power: 0, 
        priority: 1,
        effects: []
    },

    // 荆棘
    'thorns': { 
        id: 'thorns', 
        name: '荆棘', 
        description: '消耗3血量，抽一张牌', 
        type: 'special', 
        cost: 0, 
        power: 0, 
        priority: 2,
        effects: [
            {
                type: 'damage',
                target: 'self',
                value: 3
            },
            {
                type: 'draw',
                target: 'self',
                value: 1
            }
        ]
    }
};