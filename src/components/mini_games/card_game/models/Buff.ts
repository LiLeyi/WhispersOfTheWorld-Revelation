// buff效果接口
export interface Buff {
    id: string; // 效果的id。把攻击、防御也算作效果，只不过不需要显示，因为马上就触发
    duration?: number; // 持续触发回合数
    target?: 'self' | 'other' | 'both';
}