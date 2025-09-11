import { Card } from "../models/Card";
import { Player } from "../models/Player";
import { Buff } from "../models/Buff";
import { PlayerService } from "./PlayerService";

export class CardService {
    // 执行卡牌效果
    static executeCardEffects(
        player: Player, 
        card: Card, 
        opponent: Player,
        updateMessage: (message: string) => void
    ): void {
        // 初始化消息
        let message = `${player.name} 使用 ${card.name}`;
        
        // 执行所有效果
        for (const effect of card.effect) {
            this.executeEffect(effect, player, opponent, updateMessage);
        }
        
        updateMessage(message);
    }
    
    // 执行单个效果
    static executeEffect(
        effect: any, 
        player: Player, 
        opponent: Player,
        updateMessage: (message: string) => void
    ): void {
        const target = effect.target === 'self' ? player : effect.target === 'other' ? opponent : null;
        if (!target) return;
        
        console.log(`[DEBUG] 执行效果: ${effect.id}，目标: ${target.name}，数值: ${effect.duration}`);
        
        switch (effect.id) {
            case 'do_attack':
                // 使用executeAttack方法来处理攻击，以便触发combo等buff效果
                this.executeAttack(player, target, effect.duration || 0, opponent);
                break;
                
            case 'do_true_attack':
                // 真攻无视防御直接扣血
                console.log(`[DEBUG] 真攻直接扣血: ${target.name}血量${target.hp} -> ${target.hp - (effect.duration || 0)}`);
                target.hp -= effect.duration || 0;
                // 检查国王和恶魂效果
                BuffService.checkKingEffect(target, target === player ? opponent : player);
                BuffService.checkGhastEffect(target, target === player ? opponent : player, target === player ? player : opponent);
                break;
                
            case 'do_defence':
                // 添加或更新防御buff
                const existingDefenceBuff = player.buffs.find(buff => buff.id === 'defence');
                if (existingDefenceBuff) {
                    // 如果已有防御buff，增加其持续时间（在这里表示防御点数）
                    existingDefenceBuff.duration = (existingDefenceBuff.duration || 0) + (effect.duration || 0);
                } else {
                    // 如果没有防御buff，添加新的
                    player.buffs.push({
                        id: 'defence',
                        duration: effect.duration || 0,
                        target: 'self'
                    });
                }
                console.log(`[DEBUG] ${target.name}获得${effect.duration || 0}点防御`);
                console.log(`[DEBUG] ${target.name}当前所有buff:`, target.buffs);
                break;
                
            case 'do_defence_decrease':
                // 减少防御值
                target.buffs.push({
                    id: 'defence_decrease',
                    duration: effect.duration || 0,
                    target: 'self'
                });
                console.log(`[DEBUG] ${target.name}减少${effect.duration || 0}点防御`);
                break;
                
            case 'do_true_defence':
                // 添加或更新真防buff
                const existingTrueDefenceBuff = player.buffs.find(buff => buff.id === 'true_defence');
                if (existingTrueDefenceBuff) {
                    // 如果已有真防buff，增加其持续时间（在这里表示真防点数）
                    existingTrueDefenceBuff.duration = (existingTrueDefenceBuff.duration || 0) + (effect.duration || 0);
                } else {
                    // 如果没有真防buff，添加新的
                    player.buffs.push({
                        id: 'true_defence',
                        duration: effect.duration || 0,
                        target: 'self'
                    });
                }
                console.log(`[DEBUG] ${target.name}获得${effect.duration || 0}点真防`);
                console.log(`[DEBUG] ${target.name}当前所有buff:`, target.buffs);
                break;
                
            case 'do_true_defence_decrease':
                // 减少真防值
                target.buffs.push({
                    id: 'true_defence_decrease',
                    duration: effect.duration || 0,
                    target: 'self'
                });
                console.log(`[DEBUG] ${target.name}减少${effect.duration || 0}点真防`);
                break;
                
            case 'do_action_add':
                target.actionPoints += effect.duration || 0;
                // 确保行动点不为负数
                target.actionPoints = Math.max(0, target.actionPoints);
                console.log(`[DEBUG] ${target.name}行动点变化: ${target.actionPoints - (effect.duration || 0)} -> ${target.actionPoints}`);
                break;
                
            case 'do_health':
                // 检查是否有不治效果
                if (!BuffService.hasIncurable(target)) {
                    const newHp = Math.min(target.maxHp, target.hp + (effect.duration || 0));
                    console.log(`[DEBUG] ${target.name}恢复生命值: ${target.hp} -> ${newHp}`);
                    target.hp = newHp;
                } else {
                    console.log(`[DEBUG] ${target.name}有不治效果，无法恢复生命值`);
                }
                break;
                
            case 'do_get_card':
                // 抽牌逻辑
                console.log(`[DEBUG] ${target.name}抽${effect.duration || 0}张牌`);
                PlayerService.drawCards(target, effect.duration || 0);
                break;
                
            case 'do_drop_card':
                // 随机弃牌逻辑
                if (target.hand.length > 0) {
                    const randomIndex = Math.floor(Math.random() * target.hand.length);
                    console.log(`[DEBUG] ${target.name}弃掉手牌: ${target.hand[randomIndex]?.name}`);
                    target.hand.splice(randomIndex, 1);
                }
                break;
                
            case 'do_copy_target_card':
                // 复制对方手牌
                if (target.id !== player.id && target.hand.length > 0) {
                    const randomIndex = Math.floor(Math.random() * target.hand.length);
                    const cardToCopy = target.hand[randomIndex];
                    player.hand.push({...cardToCopy});
                    console.log(`[DEBUG] ${player.name}复制${target.name}的手牌: ${cardToCopy.name}`);
                }
                break;
                
            case 'do_copy_self_card':
                // 复制自己手牌
                if (target.hand.length > 0) {
                    const randomIndex = Math.floor(Math.random() * target.hand.length);
                    const cardToCopy = target.hand[randomIndex];
                    target.hand.push({...cardToCopy});
                    console.log(`[DEBUG] ${target.name}复制自己的手牌: ${cardToCopy.name}`);
                }
                break;
                
            case 'do_reflesh':
                // 刷新手牌（弃掉所有手牌并重新抽牌）
                const cardCount = target.hand.length;
                console.log(`[DEBUG] ${target.name}刷新手牌，弃掉${cardCount}张牌`);
                target.hand = [];
                // 直接抽牌
                PlayerService.drawCards(target, cardCount);
                break;
                
            case 'do_defence_switch':
                // 交换防御和真防
                target.buffs.push({
                    id: 'defence_switch',
                    target: 'self'
                });
                console.log(`[DEBUG] ${target.name}添加防御交换效果`);
                break;
                
            default:
                // 处理持续性buff效果
                if (this.isBuffEffect(effect.id)) {
                    const buff: Buff = {
                        id: effect.id,
                        duration: effect.duration,
                        target: effect.target
                    };
                    target.buffs.push(buff);
                    console.log(`[DEBUG] ${target.name}获得buff: ${effect.id}，持续时间: ${effect.duration}`);
                }
                break;
        }
    }
    
    // 判断是否为buff效果
    static isBuffEffect(effectId: string): boolean {
        const buffEffects = [
            'defence', 'true_defence', 'attack_increase_once', 'immunication', 
            'incurable', 'hard', 'true_hard', 'sharp', 'transfer', 'battery_bomb',
            'the_king', 'machanical_sentry', 'machanical_bomb', 'machanical_guard',
            'delay_attack', 'conduction', 'ban', 'fog', 'ghast', 'unreal_spell',
            'erosive_heart', 'erosive', 'shadow', 'combo'
        ];
        return buffEffects.includes(effectId);
    }
    
    // 应用伤害（处理防御和真防）
    static applyDamage(
        player: Player, 
        damage: number, 
        isTrueDamage: boolean = false, 
        attacker: Player | null = null,
        opponent: Player | null = null
    ): void {
        console.log(`[DEBUG] ${attacker?.name || '未知'}对${player.name}造成${damage}点伤害，是否为真伤: ${isTrueDamage}`);
        console.log(`[DEBUG] ${player.name}当前所有buff:`, player.buffs);
        
        // 检查是否有免疫效果
        if (!isTrueDamage && BuffService.hasImmunity(player)) {
            console.log(`[DEBUG] ${player.name}有免疫效果，伤害被免疫`);
            BuffService.consumeImmunity(player);
            return;
        }
        
        // 检查是否有蚀心效果（所有攻击变为真攻）
        if (attacker && BuffService.hasErosiveHeart(attacker)) {
            console.log(`[DEBUG] ${attacker.name}有蚀心效果，所有攻击变为真攻`);
            isTrueDamage = true;
        }
        
        if (isTrueDamage) {
            // 真伤直接扣血
            console.log(`[DEBUG] 真伤直接扣血: ${player.name}血量${player.hp} -> ${player.hp - damage}`);
            player.hp -= damage;
            
            // 检查恶魂效果
            BuffService.checkGhastEffect(player, attacker, opponent);
            // 检查国王效果
            BuffService.checkKingEffect(player, attacker);
            return;
        }
        
        // 查找防御和真防buff
        let defense = 0;
        let trueDefense = 0;
        
        // 计算总防御值
        const defenseBuff = player.buffs.find(buff => buff.id === 'defence');
        defense = defenseBuff ? (defenseBuff.duration || 0) : 0;
        
        // 计算总真防值
        const trueDefenseBuff = player.buffs.find(buff => buff.id === 'true_defence');
        trueDefense = trueDefenseBuff ? (trueDefenseBuff.duration || 0) : 0;
        
        console.log(`[DEBUG] ${player.name}当前防御情况 - 普通防御: ${defense}, 真防: ${trueDefense}`);
        
        // 处理转化效果（将伤害转化为真防）
        if (attacker) {
            BuffService.processTransfer(attacker, damage);
        }
        
        // 先扣除普通防御
        if (defense > 0) {
            if (defense >= damage) {
                // 防御足够，只减少防御
                console.log(`[DEBUG] 普通防御足够，减少${damage}点普通防御`);
                this.reduceDefense(player, damage);
                return;
            } else {
                // 防御不足，减少所有防御并继续
                console.log(`[DEBUG] 普通防御不足，减少所有${defense}点普通防御，剩余伤害${damage - defense}`);
                damage -= defense;
                this.clearDefense(player);
            }
        }
        
        // 再扣除真防
        if (trueDefense > 0) {
            if (trueDefense >= damage) {
                // 真防足够，只减少真防
                console.log(`[DEBUG] 真防足够，减少${damage}点真防`);
                this.reduceTrueDefense(player, damage);
                return;
            } else {
                // 真防不足，减少所有真防并继续
                console.log(`[DEBUG] 真防不足，减少所有${trueDefense}点真防，剩余伤害${damage - trueDefense}`);
                damage -= trueDefense;
                this.clearTrueDefense(player);
            }
        }
        
        // 最后扣除生命值
        console.log(`[DEBUG] 扣除生命值: ${player.name}血量${player.hp} -> ${player.hp - damage}`);
        player.hp -= damage;
        
        // 检查恶魂效果
        BuffService.checkGhastEffect(player, attacker, opponent);
        // 检查国王效果
        BuffService.checkKingEffect(player, attacker);
    }
    
    // 减少防御值
    static reduceDefense(player: Player, amount: number): void {
        console.log(`[DEBUG] 减少${player.name}的防御值: ${amount}`);
        const defenceBuff = player.buffs.find(buff => buff.id === 'defence');
        if (defenceBuff && defenceBuff.duration !== undefined) {
            if (defenceBuff.duration > amount) {
                console.log(`[DEBUG] 减少防御buff 从${defenceBuff.duration}到${defenceBuff.duration - amount}`);
                defenceBuff.duration -= amount;
            } else {
                console.log(`[DEBUG] 消耗防御buff ${defenceBuff.duration}点`);
                defenceBuff.duration = 0;
                // 移除已经耗尽的防御buff
                player.buffs = player.buffs.filter(buff => buff.id !== 'defence');
            }
        }
    }
    
    // 清除所有防御
    static clearDefense(player: Player): void {
        console.log(`[DEBUG] 清除${player.name}的所有普通防御`);
        player.buffs = player.buffs.filter(buff => buff.id !== 'defence');
    }
    
    // 减少真防值
    static reduceTrueDefense(player: Player, amount: number): void {
        console.log(`[DEBUG] 减少${player.name}的真防值: ${amount}`);
        const trueDefenseBuff = player.buffs.find(buff => buff.id === 'true_defence');
        if (trueDefenseBuff && trueDefenseBuff.duration !== undefined) {
            if (trueDefenseBuff.duration > amount) {
                console.log(`[DEBUG] 减少真防buff 从${trueDefenseBuff.duration}到${trueDefenseBuff.duration - amount}`);
                trueDefenseBuff.duration -= amount;
            } else {
                console.log(`[DEBUG] 消耗真防buff ${trueDefenseBuff.duration}点`);
                trueDefenseBuff.duration = 0;
                // 移除已经耗尽的真防buff
                player.buffs = player.buffs.filter(buff => buff.id !== 'true_defence');
            }
        }
    }
    
    // 清除所有真防
    static clearTrueDefense(player: Player): void {
        console.log(`[DEBUG] 清除${player.name}的所有真防`);
        player.buffs = player.buffs.filter(buff => buff.id !== 'true_defence');
    }
    
    // 获取玩家当前防御值
    static getPlayerDefense(player: Player): number {
        const defenceBuff = player.buffs.find(buff => buff.id === 'defence');
        const defence = defenceBuff ? (defenceBuff.duration || 0) : 0;
        console.log(`[DEBUG] 计算${player.name}的普通防御值: ${defence}，防御buff:`, defenceBuff);
        return defence;
    }
    
    // 获取玩家当前真防值
    static getPlayerTrueDefense(player: Player): number {
        const trueDefenceBuff = player.buffs.find(buff => buff.id === 'true_defence');
        const trueDefence = trueDefenceBuff ? (trueDefenceBuff.duration || 0) : 0;
        console.log(`[DEBUG] 计算${player.name}的真防值: ${trueDefence}，真防buff:`, trueDefenceBuff);
        return trueDefence;
    }

    
    static executeBuffEffect(
        buff: Buff,
        player: Player,
        opponent: Player,
        updateMessage: (message: string) => void,
        drawCardsCallback: (player: Player, count: number) => void,
        lastPlayedCard: import("../models/Card").Card | null = null
    ): void {
        switch (buff.id) {
            case 'delay_attack':
                // 延迟攻击效果
                this.applyDamage(opponent, buff.duration || 0, false, player, opponent);
                break;
                
            case 'incurable':
                // 不治状态，无法回血，这个效果在回血时检查
                break;
                
            case 'hard':
                // 坚硬：回合开始获得5点防御
                const existingDefenceBuff = player.buffs.find(b => b.id === 'defence');
                if (existingDefenceBuff) {
                    existingDefenceBuff.duration = (existingDefenceBuff.duration || 0) + 5;
                } else {
                    player.buffs.push({
                        id: 'defence',
                        duration: 5,
                        target: 'self'
                    });
                }
                break;
                
            case 'true_hard':
                // 真坚：回合开始获得5真防
                const existingTrueDefenceBuff = player.buffs.find(b => b.id === 'true_defence');
                if (existingTrueDefenceBuff) {
                    existingTrueDefenceBuff.duration = (existingTrueDefenceBuff.duration || 0) + 5;
                } else {
                    player.buffs.push({
                        id: 'true_defence',
                        duration: 5,
                        target: 'self'
                    });
                }
                break;
                
            case 'sharp':
                // 锋利：攻击永久增加，这个效果应该在攻击时增加伤害
                break;
                
            case 'transfer':
                // 转化：将攻击伤害转化为真防，这个效果在受到攻击时触发
                break;
                
            case 'unreal_spell':
                // 虚幻咒语：每回合进行1攻击，获得1行动
                this.applyDamage(opponent, 1, false, player, opponent);
                player.actionPoints += 1;
                break;
                
            case 'erosive':
                // 腐蚀：每回合受到攻击
                this.applyDamage(player, 1, false, null, null);
                break;
                
            case 'defence_switch':
                // 交换防御和真防
                const currentDefense = this.getPlayerDefense(player);
                const currentTrueDefense = this.getPlayerTrueDefense(player);
                
                // 清除现有防御和真防
                this.clearDefense(player);
                this.clearTrueDefense(player);
                
                // 交换数值
                if (currentDefense > 0) {
                    const existingTrueDefenceBuff = player.buffs.find(b => b.id === 'true_defence');
                    if (existingTrueDefenceBuff) {
                        existingTrueDefenceBuff.duration = (existingTrueDefenceBuff.duration || 0) + currentDefense;
                    } else {
                        player.buffs.push({
                            id: 'true_defence',
                            duration: currentDefense,
                            target: 'self'
                        });
                    }
                }
                
                if (currentTrueDefense > 0) {
                    const existingDefenceBuff = player.buffs.find(b => b.id === 'defence');
                    if (existingDefenceBuff) {
                        existingDefenceBuff.duration = (existingDefenceBuff.duration || 0) + currentTrueDefense;
                    } else {
                        player.buffs.push({
                            id: 'defence',
                            duration: currentTrueDefense,
                            target: 'self'
                        });
                    }
                }
                
                // 移除交换buff本身
                player.buffs = player.buffs.filter(b => b !== buff);
                break;
                
            case 'attack_increase_once':
                // 单次攻击加成，这个效果在攻击时使用
                break;
                
            case 'combo':
                // 连击效果，这个效果在攻击时使用
                break;
                
            case 'immunication':
                // 免疫效果，在受到伤害时检查
                break;
                
            case 'battery_bomb':
                // 电池炸弹：每回合受到2真攻，获得1真防，当真防大于5时，9攻击，buff消失
                this.applyDamage(player, 2, true, null, null); // 真伤
                const existingTBuff = player.buffs.find(b => b.id === 'true_defence');
                if (existingTBuff) {
                    existingTBuff.duration = (existingTBuff.duration || 0) + 1;
                } else {
                    player.buffs.push({
                        id: 'true_defence',
                        duration: 1,
                        target: 'self'
                    });
                }
                
                // 检查真防是否大于5
                const trueDefense = this.getPlayerTrueDefense(player);
                if (trueDefense > 5) {
                    this.applyDamage(opponent, 9, false, player, opponent);
                    // 移除buff
                    player.buffs = player.buffs.filter(b => b.id !== 'battery_bomb');
                }
                break;
                
            case 'machanical_bomb':
                // 机械炸弹：每回合受到duration点伤害
                this.applyDamage(player, buff.duration || 0, false, null, null);
                break;
                
            case 'the_king':
                // 国王：受到致命伤害时，血量上限+5，恢复所有血量，对方获得机械炸弹3层，机械炸弹卡牌3张
                // 这个效果在受到致命伤害时触发
                break;
                
            case 'ghast':
                // 恶魂：受到致命伤害时，血量上限-10，恢复所有血量，对方血量上限减少一半，恢复所有血量，获得雾buff
                // 这个效果在受到致命伤害时触发
                break;
                
            case 'shadow':
                // 影子：复制上一张牌效果
                if (lastPlayedCard) {
                    // 复制上一张牌的所有效果
                    for (const effect of lastPlayedCard.effect) {
                        this.executeEffect(effect, player, opponent, (message: string) => {
                            // 这里可以处理消息，但在影子效果中我们不显示消息
                        });
                    }
                }
                // 移除影子buff
                player.buffs = player.buffs.filter(b => b.id !== 'shadow');
                break;
                
            case 'draw_card_pending':
                // 处理抽牌效果
                drawCardsCallback(player, buff.duration || 0);
                // 移除buff
                player.buffs = player.buffs.filter(b => b.id !== 'draw_card_pending');
                break;
        }
    }
    
    // 执行攻击，处理所有相关buff
    static executeAttack(
        attacker: Player,
        target: Player,
        baseDamage: number,
        opponent: Player
    ): void {
        let damage = baseDamage;
        
        // 处理连击效果
        const comboMultiplier = BuffService.processCombo(attacker);
        damage *= comboMultiplier;
        
        // 处理单次攻击加成
        const attackIncrease = BuffService.processAttackIncrease(attacker);
        damage += attackIncrease;
        
        // 处理锋利效果
        const sharpIncrease = BuffService.processSharp(attacker);
        damage += sharpIncrease;
        
        // 处理机械哨兵效果
        const sentryBonus = BuffService.processMachanicalSentry(attacker, "攻击牌");
        damage += sentryBonus;
        
        // 处理传导效果
        BuffService.processConduction(target, damage);
        
        // 应用伤害
        this.applyDamage(target, damage, false, attacker, opponent);
    }
}

// Buff服务类，处理各种buff效果
export class BuffService {
    // 检查是否有免疫效果
    static hasImmunity(player: Player): boolean {
        return player.buffs.some(buff => buff.id === 'immunication');
    }
    
    // 消耗一层免疫效果
    static consumeImmunity(player: Player): void {
        const immunityIndex = player.buffs.findIndex(buff => buff.id === 'immunication');
        if (immunityIndex !== -1) {
            const immunityBuff = player.buffs[immunityIndex];
            if (immunityBuff.duration !== undefined) {
                immunityBuff.duration -= 1;
                if (immunityBuff.duration <= 0) {
                    player.buffs.splice(immunityIndex, 1);
                }
            }
        }
    }
    
    // 检查是否有不治效果
    static hasIncurable(player: Player): boolean {
        return player.buffs.some(buff => buff.id === 'incurable');
    }
    
    // 处理连击效果
    static processCombo(player: Player): number {
        const comboIndex = player.buffs.findIndex(buff => buff.id === 'combo');
        if (comboIndex !== -1) {
            // 移除连击buff
            player.buffs.splice(comboIndex, 1);
            // 返回伤害倍数
            return 2;
        }
        return 1;
    }
    
    // 处理单次攻击加成
    static processAttackIncrease(player: Player): number {
        let totalIncrease = 0;
        const buffsToRemove: number[] = [];
        
        // 查找所有单次攻击加成buff
        for (let i = player.buffs.length - 1; i >= 0; i--) {
            const buff = player.buffs[i];
            if (buff.id === 'attack_increase_once') {
                totalIncrease += buff.duration || 0;
                buffsToRemove.push(i);
            }
        }
        
        // 移除已使用的buff
        for (const index of buffsToRemove) {
            player.buffs.splice(index, 1);
        }
        
        return totalIncrease;
    }
    
    // 处理锋利效果
    static processSharp(player: Player): number {
        let totalSharp = 0;
        
        // 查找所有锋利buff
        const sharpBuffs = player.buffs.filter(buff => buff.id === 'sharp');
        for (const buff of sharpBuffs) {
            totalSharp += buff.duration || 0;
        }
        
        return totalSharp;
    }
    
    // 处理传导效果
    static processConduction(player: Player, damage: number): void {
        // 查找传导buff
        const hasConduction = player.buffs.some(buff => buff.id === 'conduction');
        if (hasConduction) {
            // 减少自己的真防
            const trueDefenseBuffs = player.buffs.filter(buff => buff.id === 'true_defence_add');
            let remaining = damage;
            
            for (const buff of trueDefenseBuffs) {
                if (remaining <= 0) break;
                
                if (buff.duration !== undefined) {
                    if (buff.duration > remaining) {
                        buff.duration -= remaining;
                        remaining = 0;
                    } else {
                        remaining -= buff.duration;
                        buff.duration = 0;
                    }
                }
            }
            
            // 清理已耗尽的真防buff
            player.buffs = player.buffs.filter(buff => 
                !(buff.id === 'true_defence_add' && buff.duration === 0)
            );
        }
    }
    
    // 处理转化效果
    static processTransfer(player: Player, damage: number): void {
        // 查找转化buff
        const transferBuffs = player.buffs.filter(buff => buff.id === 'transfer');
        for (const buff of transferBuffs) {
            // 将伤害转化为真防
            player.buffs.push({
                id: 'true_defence_add',
                duration: damage,
                target: 'self'
            });
            
            // 减少转化buff的持续时间
            if (buff.duration !== undefined) {
                buff.duration -= 1;
                if (buff.duration <= 0) {
                    player.buffs = player.buffs.filter(b => b !== buff);
                }
            }
        }
    }
    
    // 处理蚀心效果
    static hasErosiveHeart(player: Player): boolean {
        return player.buffs.some(buff => buff.id === 'erosive_heart');
    }
    
    // 处理禁言效果
    static isBanned(player: Player): boolean {
        return player.buffs.some(buff => buff.id === 'ban');
    }
    
    // 检查恶魂效果
    static checkGhastEffect(
        player: Player, 
        attacker: Player | null, 
        opponent: Player | null
    ): void {
        // 检查是否有恶魂buff且血量降到0或以下
        if (player.hp <= 0 && player.buffs.some(buff => buff.id === 'ghast')) {
            // 移除恶魂buff
            player.buffs = player.buffs.filter(buff => buff.id !== 'ghast');
            
            // 血量上限-10
            player.maxHp = Math.max(1, player.maxHp - 10);
            // 恢复所有血量
            player.hp = player.maxHp;
            
            // 如果有对手，对其施加效果
            if (opponent) {
                // 对方血量上限减少一半
                opponent.maxHp = Math.max(1, Math.floor(opponent.maxHp / 2));
                // 恢复所有血量
                opponent.hp = opponent.maxHp;
                // 获得雾buff
                opponent.buffs.push({
                    id: 'fog',
                    duration: undefined,
                    target: 'self'
                });
            }
        }
    }
    
    // 检查国王效果
    static checkKingEffect(
        player: Player, 
        opponent: Player | null
    ): void {
        // 检查是否有国王buff且血量降到0或以下
        if (player.hp <= 0 && player.buffs.some(buff => buff.id === 'the_king')) {
            // 移除国王buff
            player.buffs = player.buffs.filter(buff => buff.id !== 'the_king');
            
            // 血量上限+5
            player.maxHp += 5;
            // 恢复所有血量
            player.hp = player.maxHp;
            
            // 如果有对手，对其施加效果
            if (opponent) {
                // 对方获得机械炸弹3层
                opponent.buffs.push({
                    id: 'machanical_bomb',
                    duration: 3,
                    target: 'self'
                });
                // 添加3张机械炸弹卡牌到对方牌组
                for (let i = 0; i < 3; i++) {
                    opponent.deck.push({
                        id: "mechanical_bomb",
                        name: "机械炸弹",
                        description: "自身的\"机械炸弹\"buff减少一层，消耗1行动。",
                        priority: 1,
                        effect: [
                            {
                                id: "machanical_bomb",
                                duration: -1,
                                target: "self"
                            }
                        ],
                        cost: {
                            action: 1
                        }
                    });
                }
            }
        }
    }
    
    // 检查是否有雾效果
    static hasFog(player: Player): boolean {
        return player.buffs.some(buff => buff.id === 'fog');
    }
    
    // 处理机械哨兵效果
    static processMachanicalSentry(player: Player, cardName: string): number {
        if (cardName === "机械哨兵") {
            // 查找机械哨兵buff
            const sentryBuffs = player.buffs.filter(buff => buff.id === 'machanical_sentry');
            let bonusDamage = 0;
            
            // 计算总加成伤害
            for (const buff of sentryBuffs) {
                bonusDamage += buff.duration || 0;
            }
            
            // 移除所有机械哨兵buff
            player.buffs = player.buffs.filter(buff => buff.id !== 'machanical_sentry');
            
            return bonusDamage;
        }
        return 0;
    }
    
    // 检查机械护卫队效果
    static hasMachanicalGuard(player: Player): boolean {
        return player.buffs.some(buff => buff.id === 'machanical_guard');
    }
    
    // 处理机械护卫队效果
    static processMachanicalGuard(player: Player, cardName: string): number {
        if (cardName === "机械护卫队" && this.hasMachanicalGuard(player)) {
            return 1; // 减少1点行动消耗
        }
        return 0;
    }
    
    // 处理影子效果
    static processShadow(player: Player, lastPlayedCard: import("../models/Card").Card | null): void {
        const shadowIndex = player.buffs.findIndex(buff => buff.id === 'shadow');
        if (shadowIndex !== -1) {
            // 移除影子buff
            player.buffs.splice(shadowIndex, 1);
            
            // 如果有上一张使用的卡牌，则复制其效果
            if (lastPlayedCard) {
                // 复制上一张牌的所有效果
                for (const effect of lastPlayedCard.effect) {
                    CardService.executeEffect(effect, player, player, (message) => {
                        // 这里可以处理消息，但在影子效果中我们不显示消息
                    });
                }
            }
        }
    }
}