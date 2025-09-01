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
        actionPoints?: number;          // 玩家初始行动力
        hp?: number;                    // 玩家初始血量
        maxHp?: number;                 // 玩家最大血量
        deck?: Record<string, number> | (() => Record<string, number>);  // 玩家牌组配置，格式为 { 牌的id: 数量 }
        drawCount?: number;             // 玩家每回合抽牌数，默认为1
        initialDrawCount?: number;      // 玩家游戏开始时初始抽牌数，默认为3
    };
    
    opponent?: {
        actionPoints?: number;          // 对手初始行动力
        hp?: number;                    // 对手初始血量
        maxHp?: number;                 // 对手最大血量
        deck?: Record<string, number> | (() => Record<string, number>);  // 对手牌组配置，格式为 { 牌的id: 数量 }
        drawCount?: number;             // 对手每回合抽牌数，默认为1
        initialDrawCount?: number;      // 对手游戏开始时初始抽牌数，默认为3
    };
}