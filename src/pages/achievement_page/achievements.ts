// src/pages/achievement_page/achievements.ts
// 移除下面这行不必要的导入
// import "./achievement.css";

export interface Achievement {
    id: number;
    name: string;
    description: string;
    unlocked: boolean;
    icon?: string;
}

export const Achievements: Achievement[] = [
    {
        id: 1,
        name: "初入江湖",
        description: "完成新手教程",
        unlocked: false
    },
    {
        id: 2,
        name: "探索者",
        description: "解锁5个地区",
        unlocked: false
    },
    {
        id: 3,
        name: "故事大师",
        description: "完成所有主线剧情",
        unlocked: false
    },
    {
        id: 4,
        name: "收藏家",
        description: "收集100个物品",
        unlocked: false
    },
    {
        id: 5,
        name: "完美主义者",
        description: "完成所有支线任务",
        unlocked: false
    }
];