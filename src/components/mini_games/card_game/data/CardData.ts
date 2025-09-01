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
    // 基础攻击卡牌
    'punch': { 
        id: 'punch', 
        name: '拳击', 
        description: '造成2点伤害', 
        type: 'attack', 
        cost: 1, 
        power: 2, 
        priority: 1,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 2
            }
        ]
    },
    'kick': { 
        id: 'kick', 
        name: '踢击', 
        description: '造成3点伤害', 
        type: 'attack', 
        cost: 1, 
        power: 3, 
        priority: 2,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 3
            }
        ]
    },
    'combo': { 
        id: 'combo', 
        name: '连击', 
        description: '造成4点伤害', 
        type: 'attack', 
        cost: 2, 
        power: 4, 
        priority: 3,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 4
            }
        ]
    },
    'uppercut': { 
        id: 'uppercut', 
        name: '上勾拳', 
        description: '造成5点伤害', 
        type: 'attack', 
        cost: 2, 
        power: 5, 
        priority: 4,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 5
            }
        ]
    },
    'jab_1': { 
        id: 'jab_1', 
        name: '刺拳II', 
        description: '造成6点伤害', 
        type: 'attack', 
        cost: 3, 
        power: 6, 
        priority: 5,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 6
            }
        ]
    },
    'hook_1': { 
        id: 'hook_1', 
        name: '勾拳II', 
        description: '造成7点伤害', 
        type: 'attack', 
        cost: 3, 
        power: 7, 
        priority: 6,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 7
            }
        ]
    },
    'haymaker': { 
        id: 'haymaker', 
        name: '重拳', 
        description: '造成8点伤害', 
        type: 'attack', 
        cost: 4, 
        power: 8, 
        priority: 7,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 8
            }
        ]
    },
    
    // 防御卡牌
    'block': { 
        id: 'block', 
        name: '格挡', 
        description: '减少2点伤害', 
        type: 'defense', 
        cost: 1, 
        power: 2, 
        priority: 1,
        effects: [
            {
                type: 'buff',
                target: 'self',
                value: 2,
                buffType: 'defense_boost',
                duration: 0,
                description: '获得2点防御'
            }
        ]
    },
    'dodge': { 
        id: 'dodge', 
        name: '闪避', 
        description: '减少3点伤害', 
        type: 'defense', 
        cost: 1, 
        power: 3, 
        priority: 2,
        effects: [
            {
                type: 'buff',
                target: 'self',
                value: 3,
                buffType: 'defense_boost',
                duration: 0,
                description: '获得3点防御'
            }
        ]
    },
    'counter': { 
        id: 'counter', 
        name: '反击', 
        description: '减少2点伤害，行动点+1', 
        type: 'defense', 
        cost: 2, 
        power: 2, 
        priority: 3,
        effects: [
            {
                type: 'buff',
                target: 'self',
                value: 2,
                buffType: 'defense_boost',
                duration: 0,
                description: '获得2点防御'
            },
            {
                type: 'buff',
                target: 'self',
                value: 1,
                buffType: 'action_point_boost',
                duration: 0,
                description: '行动点+1'
            }
        ]
    },
    'guard_1': { 
        id: 'guard_1', 
        name: '严密防守II', 
        description: '减少5点伤害', 
        type: 'defense', 
        cost: 2, 
        power: 5, 
        priority: 4,
        effects: [
            {
                type: 'buff',
                target: 'self',
                value: 5,
                buffType: 'defense_boost',
                duration: 0,
                description: '获得5点防御'
            }
        ]
    },
    'taunt': { 
        id: 'taunt', 
        name: '嘲讽', 
        description: '减少1点伤害，敌人行动点-1', 
        type: 'defense', 
        cost: 1, 
        power: 1, 
        priority: 2,
        effects: [
            {
                type: 'buff',
                target: 'self',
                value: 1,
                buffType: 'defense_boost',
                duration: 0,
                description: '获得1点防御'
            },
            {
                type: 'debuff',
                target: 'opponent',
                value: 1,
                buffType: 'action_point_reduce',
                duration: 0,
                description: '敌人行动点-1'
            }
        ]
    },
    
    // 特殊卡牌
    'rest': { 
        id: 'rest', 
        name: '休息', 
        description: '恢复3点生命', 
        type: 'special', 
        cost: 1, 
        power: 3, 
        priority: 1,
        effects: [
            {
                type: 'heal',
                target: 'self',
                value: 3
            }
        ]
    },
    'focus': { 
        id: 'focus', 
        name: '专注', 
        description: '恢复2点行动点', 
        type: 'special', 
        cost: 1, 
        power: 2, 
        priority: 3,
        effects: [
            {
                type: 'buff',
                target: 'self',
                value: 2,
                buffType: 'action_point_boost',
                duration: 0,
                description: '恢复2点行动点'
            }
        ]
    },
    'adrenaline': { 
        id: 'adrenaline', 
        name: '肾上腺素', 
        description: '恢复2点生命，行动点+1', 
        type: 'special', 
        cost: 2, 
        power: 2, 
        priority: 4,
        effects: [
            {
                type: 'heal',
                target: 'self',
                value: 2
            },
            {
                type: 'buff',
                target: 'self',
                value: 1,
                buffType: 'action_point_boost',
                duration: 0,
                description: '行动点+1'
            }
        ]
    },
    'berserk': { 
        id: 'berserk', 
        name: '狂暴', 
        description: '消耗3点生命，造成10点伤害', 
        type: 'special', 
        cost: 2, 
        power: 10, 
        priority: 6,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 10
            },
            {
                type: 'damage',
                target: 'self',
                value: 3
            }
        ]
    },
    'feint': { 
        id: 'feint', 
        name: '虚招', 
        description: '造成4点伤害，行动点+1', 
        type: 'special', 
        cost: 2, 
        power: 4, 
        priority: 5,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 4
            },
            {
                type: 'buff',
                target: 'self',
                value: 1,
                buffType: 'action_point_boost',
                duration: 0,
                description: '行动点+1'
            }
        ]
    },
    'stun': { 
        id: 'stun', 
        name: '眩晕', 
        description: '造成3点伤害，敌人行动点-1', 
        type: 'special', 
        cost: 3, 
        power: 3, 
        priority: 5,
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
                description: '敌人行动点-1'
            }
        ]
    },
    'sacrifice': { 
        id: 'sacrifice', 
        name: '牺牲', 
        description: '消耗5点生命，造成15点伤害', 
        type: 'special', 
        cost: 3, 
        power: 15, 
        priority: 7,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 15
            },
            {
                type: 'damage',
                target: 'self',
                value: 5
            }
        ]
    },
    'medkit': { 
        id: 'medkit', 
        name: '医疗包', 
        description: '恢复6点生命', 
        type: 'special', 
        cost: 2, 
        power: 6, 
        priority: 2,
        effects: [
            {
                type: 'heal',
                target: 'self',
                value: 6
            }
        ]
    },
    'second_wind': { 
        id: 'second_wind', 
        name: '回光返照', 
        description: '恢复4点生命，行动点+2', 
        type: 'special', 
        cost: 3, 
        power: 4, 
        priority: 5,
        effects: [
            {
                type: 'heal',
                target: 'self',
                value: 4
            },
            {
                type: 'buff',
                target: 'self',
                value: 2,
                buffType: 'action_point_boost',
                duration: 0,
                description: '行动点+2'
            }
        ]
    },
    
    // 高级卡牌
    'devastate': { 
        id: 'devastate', 
        name: '毁灭打击', 
        description: '造成12点伤害', 
        type: 'attack', 
        cost: 4, 
        power: 12, 
        priority: 8,
        effects: [
            {
                type: 'damage',
                target: 'opponent',
                value: 12
            }
        ]
    },
    'invigorate': { 
        id: 'invigorate', 
        name: '振奋', 
        description: '恢复3点生命，行动点+1', 
        type: 'special', 
        cost: 2, 
        power: 3, 
        priority: 4,
        effects: [
            {
                type: 'heal',
                target: 'self',
                value: 3
            },
            {
                type: 'buff',
                target: 'self',
                value: 1,
                buffType: 'action_point_boost',
                duration: 0,
                description: '行动点+1'
            }
        ]
    },
    'overclock': { 
        id: 'overclock', 
        name: '超频', 
        description: '行动点+2，但行动点-1', 
        type: 'special', 
        cost: 1, 
        power: 2, 
        priority: 3,
        effects: [
            {
                type: 'buff',
                target: 'self',
                value: 2,
                buffType: 'action_point_boost',
                duration: 0,
                description: '行动点+2'
            },
            {
                type: 'debuff',
                target: 'self',
                value: 1,
                buffType: 'action_point_reduce',
                duration: 0,
                description: '行动点-1'
            }
        ]
    }
};