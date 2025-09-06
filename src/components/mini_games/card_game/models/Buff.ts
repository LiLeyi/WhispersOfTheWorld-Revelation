// buff效果接口
export interface Buff {
    id: string;           // buff ID
    name: string;         // buff名称
    duration: number;     // 持续回合数 (-1表示永久)
    effect: 'action_point_boost' | 'action_point_reduce' | 'defense_boost' | 'defense_on_damage' | 'damage_boost'; // 效果类型
    value: number;        // 效果值
    target: 'self' | 'opponent'; // 目标
}