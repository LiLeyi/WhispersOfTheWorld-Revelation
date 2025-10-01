export class Achievement {
    constructor(
        public id: string,
        public cnName: string,
        public enName: string,
        public description: string
    ) {}
}

export class AchievementRegistry {
    private static achievements: Map<string, Achievement> = new Map();

    static {
        // 初始化所有成就
        // 结局类成就
        this.achievements.set("ending_1", new Achievement("ending_1", "永恒世界", "ETERNUM", "完成结局1"));
        this.achievements.set("ending_2", new Achievement("ending_2", "屠龙终成魔", "DRAGON SLAYER DEMON BORN", "完成结局2"));
        this.achievements.set("ending_3", new Achievement("ending_3", "爱与生的苦恼", "DIE LIEBE UND DAS LEIDEN DES LEBENS", "完成结局3"));
        this.achievements.set("ending_4", new Achievement("ending_4", "永劫无间", "NARAKA", "完成结局4"));
        this.achievements.set("ending_5", new Achievement("ending_5", "美丽新世界", "BRAVE NEW WORLD", "完成结局5"));
        this.achievements.set("ending_6", new Achievement("ending_6", "最终幻想", "FINAL FANTASY", "完成结局6"));
        this.achievements.set("ending_7", new Achievement("ending_7", "最后生还者", "THE LAST OF US", "完成结局7"));
        this.achievements.set("ending_8", new Achievement("ending_8", "消逝的光芒", "DYING LIGHT", "完成结局8"));
        
        // 物品类成就
        this.achievements.set("item_heart_of_prime", new Achievement("item_heart_of_prime", "始源之心", "HEART OF THE PRIME", "得到\"始源之心\""));
        this.achievements.set("item_eye_of_eternal_sun", new Achievement("item_eye_of_eternal_sun", "永昼之瞳", "EYE OF THE ETERNAL SUN", "得到\"永昼之瞳\""));
        this.achievements.set("item_tear_of_terminus", new Achievement("item_tear_of_terminus", "终焉之泪", "TEAR OF TERMINUS", "得到\"终焉之泪\""));
        this.achievements.set("item_key_items_all", new Achievement("item_key_items_all", "权力意志", "DER WILLE ZUR MACHT", "集齐三样\"关键之物\""));
        
        // 战斗类成就
        this.achievements.set("defeat_wraith", new Achievement("defeat_wraith", "鬼泣", "DEVIL MAY CRY", "击败恶魂（第三章）"));
        this.achievements.set("defeat_king", new Achievement("defeat_king", "蔑视", "SCORN", "击败\"国王\"（第二章）"));
        this.achievements.set("defeat_disaster", new Achievement("defeat_disaster", "致命一击", "FATAL FRAME", "击败灾厄之主（终章）"));
        
        // 特殊行为类成就
        this.achievements.set("escape_3_times", new Achievement("escape_3_times", "逃生", "OUTLAST", "三次临阵脱逃（拒绝考验、匆匆离开、退缩）"));
        this.achievements.set("enter_village", new Achievement("enter_village", "生化危机", "RESIDENT EVIL VILLAGE", "进入村庄（第一章）"));
        this.achievements.set("enter_gear", new Achievement("enter_gear", "化身为人", "DETROIT: BECOME HUMAN", "进入\"齿轮\"（第二章）"));
        this.achievements.set("enter_cave", new Achievement("enter_cave", "死或生", "DEAD OR ALIVE", "进入洞窟（第三章）"));
        this.achievements.set("death_ending", new Achievement("death_ending", "人类一败涂地", "HUMAN FALL FLAT", "进入任意死亡结局"));
        this.achievements.set("complete_stone_trials", new Achievement("complete_stone_trials", "心魔", "THE BEAST INSIDE", "通过巨石的所有考验（第一章）"));
        this.achievements.set("abandon_human", new Achievement("abandon_human", "恶灵附身", "THE EVIL WITHIN", "拒绝救下人类（第二章）"));
       this.achievements.set("hidden ending", new Achievement("hidden ending", "王者之证", "THE PROOF OF KINGSHIP", "在未集齐三件\"关键之物\"的情况下，击败灾厄之主（终章）"));
       this.achievements.set("infinite war", new Achievement("infinite war", "无限斗争", "INFINITE WAR", "在一局\"无尽\"模式中使敌方血量小于等于0Hp（真结局后）"));
    }
    static getAchievement(id: string): Achievement | undefined {
        return this.achievements.get(id);
    }

    static getAllAchievements(): Achievement[] {
        return Array.from(this.achievements.values());
    }
}