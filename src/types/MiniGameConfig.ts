// 跳一跳小游戏配置接口
export interface JumpingGameConfig {
    // 平台配置
    platformCount?: number;             // 平台数量
    minPlatformWidth?: number;          // 平台最小宽度
    maxPlatformWidth?: number;          // 平台最大宽度
    platformHeight?: number;            // 平台高度
    initialPlatformWidth?: number;      // 初始平台宽度
    minDistance?: number;               // 平台间最小距离。最大距离自动生成，确保玩家能跳上去

    // 物理配置
    gravity?: number;                   // 重力加速度
    maxJumpVelocity?: number;            // 最大跳跃速度，即蓄力满的跳跃速度 

    // 视角配置
    aimMinAngle?: number;               // 视角最小角度（弧度）
    aimMaxAngle?: number;               // 视角最大角度（弧度）
    aimSpeed?: number;                  // 视角移动速度（弧度/帧）

    // 其他配置
    maxChargeTime?: number;             // 最大蓄力时间（毫秒）
}

// 卡牌游戏配置接口
export interface CardGameConfig {
    player?: {
        actionPoints?: number | (() => number);          // 玩家初始行动力
        hp?: number | (() => number);                    // 玩家初始血量
        maxHp?: number | (() => number);                 // 玩家最大血量
        deck?: Record<string, number> | (() => Record<string, number>);  // 玩家牌组配置，格式为 { 牌的id: 数量 }
        drawCount?: number | (() => number);             // 玩家每回合抽牌数，默认为1
        initialDrawCount?: number | (() => number);      // 玩家游戏开始时初始抽牌数，默认为3
        name?: string;                  // 玩家名字
        initialBuffs?: Array<{          // 玩家初始buff
            id: string;                 // buff的id
            duration?: number;          // 持续时间
            target?: 'self' | 'other' | 'both';  // 目标
        }>; 
    };
    
    opponent?: {
        actionPoints?: number | (() => number);          // 对手初始行动力
        hp?: number | (() => number);                    // 对手初始血量
        maxHp?: number | (() => number);                 // 对手最大血量
        deck?: Record<string, number> | (() => Record<string, number>);  // 对手牌组配置，格式为 { 牌的id: 数量 }
        drawCount?: number | (() => number);             // 对手每回合抽牌数，默认为1
        initialDrawCount?: number | (() => number);      // 对手游戏开始时初始抽牌数，默认为3
        name?: string;                  // 对手名字
        initialBuffs?: Array<{          // 对手初始buff
            id: string;                 // buff的id
            duration?: number;          // 持续时间
            target?: 'self' | 'other' | 'both';  // 目标
        }>; 
    };
    
    // 添加背景音乐配置
    bgm?: string;                       // 卡牌游戏背景音乐
    
    // 添加背景图片配置
    backgroundImage?: string;           // 卡牌游戏背景图片路径
    
    // 添加选牌配置
    deckSelection?: {
        minDeckSize?: number;           // 玩家选牌时最小卡组数量
        maxDeckSize?: number;           // 玩家选牌时最大卡组数量
    };
}