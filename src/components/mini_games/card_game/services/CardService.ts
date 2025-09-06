import { Card, CardEffect } from "../models/Card";
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
        let effectExecuted = false;
        
        // 处理特殊卡牌效果
        if (card.id === 'stance') {
            // 架势卡牌 - 获得本回合造成伤害的点数的防御力
            // 这个效果将在造成伤害时处理，这里只添加标记
            player.buffs.push({
                id: `stance_${Date.now()}`,
                name: '架势',
                duration: 1, // 仅在本回合有效
                effect: 'defense_on_damage',
                value: 1, // 1:1转换伤害为防御
                target: 'self'
            });
            message += ` 获得架势效果`;
            effectExecuted = true;
        } else if (card.id === 'power_up') {
            // 蓄力卡牌 - 本回合伤害翻倍
            player.buffs.push({
                id: `power_up_${Date.now()}`,
                name: '蓄力',
                duration: 1, // 仅在本回合有效
                effect: 'damage_boost',
                value: 2, // 伤害翻倍
                target: 'self'
            });
            message += ` 获得蓄力效果`;
            effectExecuted = true;
        }
        
        // 执行所有常规效果
        for (const effect of card.effects) {
            switch (effect.type) {
                case 'damage':
                    const target = effect.target === 'self' ? player : opponent;
                    this.applyDamage(target, effect.value || 0, player, opponent);
                    const targetName = effect.target === 'self' ? player.name : opponent.name;
                    message += ` 对${targetName}造成${effect.value}点伤害`;
                    effectExecuted = true;
                    break;
                    
                case 'heal':
                    player.hp = Math.min(player.maxHp, player.hp + (effect.value || 0));
                    message += ` 恢复${effect.value}点生命`;
                    effectExecuted = true;
                    break;
                    
                case 'buff':
                    // 添加buff效果
                    const buffTarget = effect.target === 'self' ? player : opponent;
                    if (effect.buffType) {
                        // 如果是立即生效的防御提升或行动点提升效果，则立即应用
                        if (effect.duration === 0 && 
                            (effect.buffType === 'defense_boost' || effect.buffType === 'action_point_boost')) {
                            switch (effect.buffType) {
                                case 'defense_boost':
                                    buffTarget.defense += effect.value || 0;
                                    message += ` 防御+${effect.value}`;
                                    break;
                                case 'action_point_boost':
                                    buffTarget.actionPoints += effect.value || 0;
                                    message += ` 行动点+${effect.value}`;
                                    break;
                            }
                        } else {
                            // 否则添加到buff列表中（持续效果）
                            buffTarget.buffs.push({
                                id: `${card.id}_buff_${Date.now()}`,
                                name: effect.description || card.name,
                                duration: effect.duration || 0,
                                effect: effect.buffType!,
                                value: effect.value || 0,
                                target: effect.target as 'self' | 'opponent' // 类型转换
                            });
                            
                            switch (effect.buffType) {
                                case 'action_point_boost':
                                    message += ` 行动点+${effect.value}`;
                                    if (effect.duration && effect.duration > 0) {
                                        message += `(持续${effect.duration}回合)`;
                                    }
                                    break;
                                case 'defense_boost':
                                    message += ` 防御+${effect.value}`;
                                    if (effect.duration && effect.duration > 0) {
                                        message += `(持续${effect.duration}回合)`;
                                    }
                                    break;
                            }
                        }
                    }
                    effectExecuted = true;
                    break;
                    
                case 'debuff':
                    // 添加debuff效果
                    const debuffTarget = effect.target === 'self' ? player : opponent;
                    if (effect.buffType) {
                        // 如果是立即生效的行动点减少效果，则立即应用
                        if (effect.buffType === 'action_point_reduce' && effect.duration === 0) {
                            debuffTarget.actionPoints = Math.max(0, debuffTarget.actionPoints - (effect.value || 0));
                            message += ` ${debuffTarget.name}行动点-${effect.value}`;
                        } else {
                            // 否则添加到buff列表中（持续效果）
                            debuffTarget.buffs.push({
                                id: `${card.id}_debuff_${Date.now()}`,
                                name: effect.description || card.name,
                                duration: effect.duration || 0,
                                effect: effect.buffType!,
                                value: effect.value || 0,
                                target: effect.target as 'self' | 'opponent' // 类型转换
                            });
                            
                            switch (effect.buffType) {
                                case 'action_point_reduce':
                                    message += ` ${debuffTarget.name}行动点-${effect.value}`;
                                    if (effect.duration && effect.duration > 0) {
                                        message += `(持续${effect.duration}回合)`;
                                    }
                                    break;
                            }
                        }
                    }
                    effectExecuted = true;
                    break;
                    
                case 'draw':
                    // 抽牌效果
                    PlayerService.drawCards(player, effect.value || 0);
                    message += ` 抽${effect.value || 0}张牌`;
                    effectExecuted = true;
                    break;
            }
        }
        
        // 如果没有任何效果被执行，使用默认消息
        if (!effectExecuted) {
            message += ` 使用了这张卡牌`;
        }
        
        updateMessage(message);
    }
    
    // 应用伤害（先扣除防御点数，再扣除生命值）
    static applyDamage(player: Player, damage: number, sourcePlayer: Player, opponent: Player): void {
        // 检查是否有伤害加成buff
        let finalDamage = damage;
        const damageBoostBuffs = sourcePlayer.buffs.filter(buff => buff.effect === 'damage_boost' && buff.duration > 0);
        for (const buff of damageBoostBuffs) {
            finalDamage *= buff.value;
        }
        
        // 如果有防御点数，先扣除防御点数
        if (player.defense > 0) {
            if (player.defense >= finalDamage) {
                // 防御点数足够抵挡全部伤害
                player.defense -= finalDamage;
            } else {
                // 防御点数只能抵挡部分伤害，剩余伤害扣除生命值
                const remainingDamage = finalDamage - player.defense;
                player.defense = 0;
                player.hp -= remainingDamage;
            }
        } else {
            // 没有防御点数，直接扣除生命值
            player.hp -= finalDamage;
        }
        
        // 检查是否有架势效果，如果有则增加防御
        const stanceBuffs = sourcePlayer.buffs.filter(buff => buff.effect === 'defense_on_damage' && buff.duration > 0);
        if (stanceBuffs.length > 0) {
            // 增加与造成伤害相等的防御力
            sourcePlayer.defense += finalDamage;
            // 移除架势效果，因为已经触发
            sourcePlayer.buffs = sourcePlayer.buffs.filter(buff => buff.effect !== 'defense_on_damage');
        }
    }
}