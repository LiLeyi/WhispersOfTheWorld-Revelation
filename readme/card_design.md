# 卡牌设计

* 拳击（id：punch）：1攻击
* 招架（id：parry）：1攻击，消耗1行动，对方减少1行动
* 勾拳（id：hook）：3攻击，消耗2行动
* 闪避（id：dodge）：获得2防御，消耗1行动
* 连击（id：combo）：下次伤害翻倍
* 圣盾（id：holy_shield）：获得3真防，消耗3行动
* 圣洁（id：holiness）：恢复3血量，消耗2行动
* 暗寂（初）（id：darkness_initial）：5攻击，受到1攻击，消耗2行动
* 暗寂（id：darkness）：5攻击，消耗2行动
* 暗寂（终）（id：darkness_final）：5攻击，消耗1行动
* 觉悟（id：enlightenment）：受到2攻击，增加1行动，免疫下一次伤害
* 小石子（id：little_stone）：1攻击，消耗1行动
* 奇怪的石头（id：strange_stone）：抽一张牌
* 磐石（id：bedrock）：获得2防御，消耗1行动
* 大石块（id：large_rock）：获得2攻击，消耗2行动
* 赤石（id：red_stone）：4攻击，消耗2行动
* 钻石（id：diamond）：获得5防御，消耗2行动
* 碎石（id：crushed_stone）：1攻击，造成2回合不治，消耗1行动
* 鹅卵石（id：pebble）：2攻击，获得2防御，消耗2行动
* 陨石（id：meteorite）：7攻击，消耗4行动
* 无痕之"泪"（id：tear_of_no_trace）：2真攻，消耗2行动
* 不合身的长袍（id：ill_fitting_robe）：受到2伤害，获得5防御，2真防
* 泛黄书页（id：faded_page）：1攻击，获得1真防，消耗1行动
* 诡异烛光（id：eerie_candlelight）：受到2攻击，随机弃掉对方一张手牌
* 无趣法杖（id：boring_staff）：2真攻，消耗1行动
* 无用药瓶（id：useless_potion）：将当前的防御全部变为真防
* 睿智帽子（id：wise_hat）：随机复制一张对方的卡牌
* 惹人生厌的钟表（id：annoying_clock）：10攻击，消耗2行动，敌方锋利层数+1
* 巫婆的馈赠（id：witchs_gift）：重新抽取所有手牌
* 机械坚盾（id：mechanical_shield）：获得3防御，消耗1行动
* 纳米护甲（id：nano_armor）：获得2防御，免疫下一次攻击，消耗2行动
* 机械防御（id：mechanical_defense）：获得2真防，消耗2行动
* 机械挥臂（id：mechanical_arm_swing）：受到2攻击，1攻击，获得效果转化一回合，消耗3行动
* 破旧齿轮（id：worn_gear）：1攻击
* 过期机油（id：expired_oil）：受到2攻击，增加2行动
* 交换机器人（id：swap_robot）：交换真防和防御的数值，消耗2行动
* 机械哨兵（id：mechanical_sentry）：1攻击，获得buff机械哨兵一层，消耗1行动
* 机械工厂（id：mechanical_factory）：血量大于等于8时，手牌获得一张机械哨兵。血量小于8时，恢复3血量
* 满蓄电池炸弹（id：full_battery_bomb）：9攻击，消耗3行动
* 机械炸弹（id：mechanical_bomb）：自己的机械炸弹buff减一层，消耗1行动
* 崭新齿轮（id：brand_new_gear）：2攻击
* 没过期的机油（id：unexpired_oil）：增加2行动
* 机械护卫队（id：mechanical_guard）：获得1真防，获得机械护卫队buff一层，消耗2行动
* 机械碎石（id：mechanical_crushed_stone）：2攻击，下回合2攻击，消耗1行动
* 机械陨石（id：mechanical_meteorite）：降低对方4层防御，4层真防，4攻击，消耗3行动
* 死神低语（id：reapers_whisper）：15真攻，消耗3行动
* 死神的呻吟（id：reapers_groan）：9真攻，消耗4行动
* 山鬼（id：mountain_ghoul）：1攻击，获得锋利一层，消耗1行动
* 林鬼（id：forest_ghoul）：1攻击，消耗2行动。获得传导1回合
* 溺鬼（id：drowned_ghoul）：获得2真防，1防御，消耗1行动
* 饿鬼（id：hungry_ghoul）：1攻击，增加1行动力
* 孤鬼（id：lonely_ghoul）：7攻击，本回合无法继续出牌，消耗1行动
* 吝鬼（id：stingy_ghoul）：1攻击，减少对方1行动，1真防，消耗2行动
* 魑魅魍魉（id：ghostly_figures）：2攻击，下回合进行2攻击，获得2真防，2防御，减少对方2行动力，消耗2行动
* 阴魂（id：yin_spirit）：减少对方2真防，恢复2血量，消耗2行动
* 阳魂（id：yang_spirit）：3攻击，获得2真防，消耗2行动
* 诅咒（id：curse）：获得虚幻咒语效果
* 吞噬（id：devour）：减少对方2行动，消耗1行动
* 鬼火（id：will_o_wisp）：弃掉对方一张手牌，消耗1行动
* 终焉之泪（id：end_tears）：10攻击，扣除对方70真防，消耗3行动
* 暗寂强化（id：darkness_enhanced）：10攻击，恢复3血量，获得2真防
* 暗寂（蚀心）（id：darkness_erosive_heart）：受到3攻击，进行18攻击，消耗1行动
* 破碎蚀心刃（id：shattered_erosive_blade）：对方获得buff腐蚀（只能有一层）
* 暗寂（破碎蚀心）（id：darkness_shattered_erosive）：受到攻击进行攻击，消耗行动
* 暗寂影化（id：darkness_shadow_form）：15攻击，恢复7血量，获得5防御，5真防
* 暗寂（蚀心弱化）（id：darkness_erosive_weakened）：受到2攻击，进行5攻击，消耗2行动
* 影子（id：shadow_card）：复制上一张牌的效果
* 合身长袍（id：well_fitting_robe）：受到2攻击，获得5防，2真防
* 崭新书页（id：brand_new_page）：1攻击，获得1真防，消耗1行动
* 正常烛光（id：normal_candlelight）：随机弃掉对方一张牌
* 有趣法杖（id：interesting_staff）：2真攻
* 妙用药瓶（id：wonderful_potion）：将当前的真防全部变为防御
* 降智帽子（id：intelligence_reducing_hat）：恢复5血量，复制一张对方卡牌给对方
* 惹人喜爱的钟表（id：lovable_clock）：10攻击，消耗2行动

# Buff列表

格式：

id；名称；描述（描述需写在程序中）；补充描述（对Buff作用进一步描述，只作说明用，不需要写在程序中。不写就是无）

立刻触发的效果：

* do_attack；进行攻击；无描述；立刻对target造成duration点伤害
* do_true_attack：进行真攻；无描述；无视target任何防御，直接扣血
* do_defence；进行防御；无描述；立即让target增加defence共duration点。
* do_defence_decrease：减少防御；无描述；立即让target减少defence共duration点
* do_true_defence；进行真防御；无描述；立即让target增加true_defence共duration点。
* do_true_defence_decrease：减少真防御；无描述；立即让target减少true_defence共duration点
* do_action_add；增加行动；无描述；立即让target增加duration点行动点数（为负数时减少）。
* do_health；恢复生命；无描述；立即让target增加duration点生命值。
* do_get_card；获得手牌；无描述；立即让target抽取duration张手牌
* do_drop_card；弃掉手牌；无描述；立即让target随机弃掉duration张手牌
* do_copy_target_card：复制对方手牌；无描述；立即随机复制target对方的duration张手牌给target
* do_copy_self_card：复制自己手牌；无描述；立即复制target的duration张手牌给target
* do_reflesh：刷新手牌；无描述；立即让target弃掉所有手牌，并获抽取同数量的新手牌
* do_defence_switch：交换真防、防御；无描述；立即交换target的真防、防御数值

会保持的效果：

* defence；防御；抵挡对手的伤害，每抵挡一点防御减少一点，下次玩家出牌回合时消失。
* true_defence；真防；抵挡对手的伤害，每抵挡一点防御减少一点，不会在下个玩家出牌回合消失，受到攻击时会先消耗防御，之后再消耗真防。
* attack_increase_once；单次攻击加成；下次攻击的伤害增加duration点，使用后buff消失。
* combo；连击；下次伤害翻倍，作用后buff消失
* immunication；免疫；免疫以后duration次伤害；每免疫一次减一层
* incurable；不治；无法回血
* hard；坚硬；回合开始获得5点防御，buff消失
* true_hard：真坚；回合开始获得5真防，buff消失
* sharp；锋利；攻击永久增加duration，buff一直保持
* transfer；转化；将攻击伤害转化为真防，buff每回合层数-1
* battery_bomb：电池炸弹；每回合受到2真攻，获得1真防，当真防大于5时，9攻击，buff消失
* the_king；国王；受到致命伤害时，血量上限+5，恢复所有血量，对方获得机械炸弹3层，机械炸弹卡牌3张，buff消失
* machanical_sentry：机械哨兵；本回合“机械哨兵”卡片牌伤害+duration，下回合buff消失
* machanical_bomb；机械炸弹；每回合受到duration点伤害，只能通过特定卡牌去消除buff
* machanical_guard；机械护卫队；使用机械护卫队卡牌时，行动力消耗-1，buff一直保持
* delay_attack；延迟攻击；下回合进行duration点攻击
* conduction；传导；本回合造成的攻击，会等量扣除到真防
* ban；禁言；本回合无法再出牌
* fog；雾；无法看见血量、行动值等数值
* ghast：恶魂；受到致命伤害时，血量上限-10，恢复所有血量，对方血量上限减少一半，恢复所有血量，获得雾buff
* unreal_spell；虚幻咒语；每回合进行1攻击，获得1行动，buff一直保持
* erosive_heart；蚀心；所有攻击变为真攻，buff一直保持
* erosive；腐蚀；每回合受到攻击
* shadow；影子；复制上一张牌效果，作用后消失

接口：

```typescript
interface CardData {
    id: string;
    name: string; // 名字，显示在卡面的标题位置
    description: string; // 描述，显示在卡面上
    priority: number; // 电脑出牌的优先级，越高电脑越优先出。这个不要显示在卡面上
    effect: CardEffect[];
    cost?: {
        action?: number;
        health?: number;
    }
}

interface Effect {
    id: string; // 效果的id。把攻击、防御也算作效果，只不过不需要显示，因为马上就触发
    duration?: number; // 持续触发回合数
    target?: 'self' | 'other' | 'both';
}
```

## 注释

1. 虚樹的电池炸弹改为buff
2. 移除所有回血卡牌通过存档系统进行