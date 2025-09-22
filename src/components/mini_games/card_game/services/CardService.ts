import { Card } from "../models/Card";
import { Player } from "../models/Player";
import { Buff } from "../models/Buff";
import { PlayerService } from "./PlayerService";
import { CARD_TEMPLATES } from "../data/CardData";
import { ArchiveManager } from "../../../ArchiveManager";
import { CardManager } from "../CardManager";
import { BagManager } from "../../../BagManager";

export class CardService {
    static executeCardEffects(
        player: Player,
        card: Card,
        opponent: Player,
        updateMessage: (message: string) => void,
        lastPlayedCard: import("../models/Card").Card | null = null,
        usedOnceCards?: Set<string> // 添加usedOnceCards参数
    ): void {
        // 初始化消息
        let message = `${player.name} 使用 ${card.name}`;

        // 执行当前卡牌的所有效果
        for (const effect of card.effect) {
            this.executeEffect(effect, player, opponent, updateMessage, card, usedOnceCards);
        }

        updateMessage(message);
    }
    private static executeEffect(
        effect: import("../models/Card").CardEffect,
        player: Player,
        opponent: Player,
        updateMessage: (message: string) => void,
        sourceCard: Card,
        usedOnceCards?: Set<string> // 添加usedOnceCards参数
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
                BuffService.checkKingEffect(target, player);
                BuffService.checkGhastEffect(target, player);
                BuffService.checkDisasterLordPhase(target, player);
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
                // 直接减少目标的防御值，而不是添加buff
                const defenceBuff = target.buffs.find(buff => buff.id === 'defence');
                if (defenceBuff && defenceBuff.duration && defenceBuff.duration > 0) {
                    const reduceAmount = Math.min(defenceBuff.duration, effect.duration || 0);
                    defenceBuff.duration -= reduceAmount;
                    // 如果防御值减到0，移除防御buff
                    if (defenceBuff.duration <= 0) {
                        target.buffs = target.buffs.filter(buff => buff.id !== 'defence');
                    }
                    console.log(`[DEBUG] ${target.name}减少${reduceAmount}点防御`);
                } else {
                    console.log(`[DEBUG] ${target.name}没有防御值，防御减少效果无效`);
                }
                break;

            case 'do_defence_add_to_true_defence':
                // 将当前防御数值加到真防上并清空当前防御（防御叠加到真防上）
                const defenceValue = this.getPlayerDefense(target);

                if (defenceValue > 0) {
                    // 清除防御
                    this.clearDefense(target);

                    // 将防御数值添加到真防上
                    const existingTrueDefenceBuff = target.buffs.find(b => b.id === 'true_defence');
                    if (existingTrueDefenceBuff) {
                        existingTrueDefenceBuff.duration = (existingTrueDefenceBuff.duration || 0) + defenceValue;
                    } else {
                        target.buffs.push({
                            id: 'true_defence',
                            duration: defenceValue,
                            target: 'self'
                        });
                    }

                    console.log(`[DEBUG] ${target.name}将${defenceValue}点防御加到真防上并清空防御`);
                }
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
                // 检查目标是否拥有真防值
                const trueDefenceBuff = target.buffs.find(buff => buff.id === 'true_defence');
                if (trueDefenceBuff && trueDefenceBuff.duration && trueDefenceBuff.duration > 0) {
                    const reduceAmount = Math.min(trueDefenceBuff.duration, effect.duration || 0);
                    trueDefenceBuff.duration -= reduceAmount;
                    // 如果真防值减到0，移除真防buff
                    if (trueDefenceBuff.duration <= 0) {
                        target.buffs = target.buffs.filter(buff => buff.id !== 'true_defence');
                    }
                    console.log(`[DEBUG] ${target.name}减少${reduceAmount}点真防`);
                } else {
                    console.log(`[DEBUG] ${target.name}没有真防值，真防减少效果无效`);
                }
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
                PlayerService.drawCards(target, effect.duration || 0, updateMessage, false, usedOnceCards);
                break;

            case 'do_drop_card':
                // 随机弃牌逻辑
                if (target.hand.length > 0) {
                    const randomIndex = Math.floor(Math.random() * target.hand.length);
                    console.log(`[DEBUG] ${target.name}弃掉手牌: ${target.hand[randomIndex]?.name}`);
                    const [discardedCard] = target.hand.splice(randomIndex, 1);
                    target.discardPile.push(discardedCard);
                }
                break;

            case 'do_copy_target_card':
                // 复制对方手牌
                // 修复逻辑：确保目标是对手且对手手牌不为空
                const opponentPlayer = target.id !== player.id ? target : opponent;
                if (opponentPlayer && opponentPlayer.hand.length > 0) {
                    const randomIndex = Math.floor(Math.random() * opponentPlayer.hand.length);
                    const cardToCopy = opponentPlayer.hand[randomIndex];
                    // 根据效果目标决定将复制的卡牌给谁
                    if (effect.target === 'other') {
                        // 如果目标是other，将复制的卡牌给对手
                        opponentPlayer.hand.push({ ...cardToCopy });
                        console.log(`[DEBUG] ${player.name}复制${opponentPlayer.name}的手牌并给对方: ${cardToCopy.name}`);
                    } else {
                        // 如果目标是self，将复制的卡牌给自己
                        player.hand.push({ ...cardToCopy });
                        console.log(`[DEBUG] ${player.name}复制${opponentPlayer.name}的手牌: ${cardToCopy.name}`);
                    }
                } else {
                    console.log(`[DEBUG] ${player.name}尝试复制对方手牌，但对方没有手牌`);
                }
                break;

            case 'do_copy_self_card':
                // 复制自己手牌
                if (target.hand.length > 0) {
                    const randomIndex = Math.floor(Math.random() * target.hand.length);
                    const cardToCopy = target.hand[randomIndex];
                    target.hand.push({ ...cardToCopy });
                    console.log(`[DEBUG] ${target.name}复制自己的手牌: ${cardToCopy.name}`);
                }
                break;

            case 'do_reflesh':
                // 刷新手牌（弃掉所有手牌并重新抽牌）
                const cardCount = target.hand.length;
                console.log(`[DEBUG] ${target.name}刷新手牌，弃掉${cardCount}张牌`);
                // 将手牌移到弃牌堆而不是直接清空
                target.discardPile.push(...target.hand);
                target.hand = [];
                // 直接抽牌，强制抽牌以确保抽到牌
                PlayerService.drawCards(target, cardCount, updateMessage, true, usedOnceCards);
                break;

            case 'do_defence_switch':
                // 立即交换防御和真防
                const currentDefense = this.getPlayerDefense(target);
                const currentTrueDefense = this.getPlayerTrueDefense(target);

                // 清除现有防御和真防
                this.clearDefense(target);
                this.clearTrueDefense(target);

                // 交换数值 - 防御变为真防
                if (currentDefense > 0) {
                    const existingTrueDefenceBuff = target.buffs.find(b => b.id === 'true_defence');
                    if (existingTrueDefenceBuff) {
                        existingTrueDefenceBuff.duration = (existingTrueDefenceBuff.duration || 0) + currentDefense;
                    } else {
                        target.buffs.push({
                            id: 'true_defence',
                            duration: currentDefense,
                            target: 'self'
                        });
                    }
                }

                // 交换数值 - 真防变为防御
                if (currentTrueDefense > 0) {
                    const existingDefenceBuff = target.buffs.find(b => b.id === 'defence');
                    if (existingDefenceBuff) {
                        existingDefenceBuff.duration = (existingDefenceBuff.duration || 0) + currentTrueDefense;
                    } else {
                        target.buffs.push({
                            id: 'defence',
                            duration: currentTrueDefense,
                            target: 'self'
                        });
                    }
                }

                console.log(`[DEBUG] ${target.name}立即交换防御和真防: ${currentDefense}防御 -> ${currentDefense}真防, ${currentTrueDefense}真防 -> ${currentTrueDefense}防御`);
                break;

            case 'do_mechanical_bomb_decrease':
                // 立即减少一层机械炸弹buff
                console.log('触发do_mechanical_bomb_decrease')
                const mechanicalBombBuff = target.buffs.find(buff => buff.id === 'mechanical_bomb');
                if (mechanicalBombBuff) {
                    // 如果存在机械炸弹buff，减少其持续时间
                    if (mechanicalBombBuff.duration !== undefined) {
                        mechanicalBombBuff.duration -= 1;
                        // 如果持续时间为0，移除该buff
                        if (mechanicalBombBuff.duration <= 0) {
                            target.buffs = target.buffs.filter(buff => buff.id !== 'mechanical_bomb');
                        }
                    }
                }
                break;

            case 'do_mechanical_factory':
                // 机械工厂效果：血量≥8时，获得一张机械哨兵卡牌；血量<8时，恢复3点血量
                if (player.hp >= 8) {
                    // 血量≥8时，获得一张机械哨兵卡牌
                    const mechanicalSentryCard = CARD_TEMPLATES.mechanical_sentry;
                    if (mechanicalSentryCard) {
                        player.hand.push({ ...mechanicalSentryCard });
                        console.log(`[DEBUG] ${player.name}获得一张机械哨兵卡牌`);
                    }
                } else {
                    // 血量<8时，恢复3点血量
                    const newHp = Math.min(player.maxHp, player.hp + 3);
                    console.log(`[DEBUG] ${player.name}恢复3点血量: ${player.hp} -> ${newHp}`);
                    player.hp = newHp;
                }
                break;

            case 'do_mechanical_guard':
                // 机械护卫队效果：直接增加行动力
                // 基于当前机械护卫队buff层数增加行动力（不包括即将添加的新buff）
                const currentGuardBuffs = player.buffs.filter(buff => buff.id === 'mechanical_guard');
                let currentGuardLevel = 0;
                for (const buff of currentGuardBuffs) {
                    currentGuardLevel += buff.duration || 0;
                }

                player.actionPoints += currentGuardLevel;
                console.log(`[DEBUG] ${player.name}使用机械护卫队，基于现有${currentGuardLevel}层buff，行动力增加${currentGuardLevel}点，当前行动力: ${player.actionPoints}`);
                break;

            default:                // 处理持续性buff效果
                if (this.isBuffEffect(effect.id)) {
                    // 对于需要合并的buff类型，检查是否已经存在相同类型的buff
                    const mergeableBuffs = ['incurable', 'mechanical_sentry', 'mechanical_guard', 'delay_attack', 'sharp',
                        'unreal_spell'
                    ]; // 可以合并的buff类型
                    // 腐蚀效果只能叠加一层
                    if (effect.id === 'erosive') {
                        // 检查是否已经存在腐蚀效果
                        const existingErosiveBuff = target.buffs.find(buff => buff.id === 'erosive');
                        if (!existingErosiveBuff) {
                            // 只有在不存在腐蚀效果时才添加
                            const buff: Buff = {
                                id: effect.id,
                                duration: effect.duration,
                                target: effect.target
                            };
                            target.buffs.push(buff);
                            console.log(`[DEBUG] ${target.name}获得buff: ${effect.id}，持续时间: ${effect.duration}`);
                        } else {
                            console.log(`[DEBUG] ${target.name}已存在腐蚀效果，不重复添加`);
                        }
                    } else if (effect.id === 'shadow') {
                        // 影子效果不应该作为buff处理，而应该在出牌时立即执行
                        // 由于影子牌现在直接替换为上一张牌，这里不需要处理
                        console.log(`[DEBUG] ${target.name}的影子效果已通过卡牌替换方式处理`);
                    } else if (mergeableBuffs.includes(effect.id)) {
                        const existingBuff = target.buffs.find(buff => buff.id === effect.id);
                        if (existingBuff) {
                            // 如果已有相同buff，增加其持续时间
                            existingBuff.duration = (existingBuff.duration || 0) + (effect.duration || 0);
                        } else {
                            // 如果没有相同buff，添加新的
                            const buff: Buff = {
                                id: effect.id,
                                duration: effect.duration,
                                target: effect.target
                            };
                            target.buffs.push(buff);
                        }
                    } else {
                        // 其他buff直接添加
                        const buff: Buff = {
                            id: effect.id,
                            duration: effect.duration,
                            target: effect.target
                        };
                        target.buffs.push(buff);
                    }
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
            'the_king', 'mechanical_sentry', 'mechanical_bomb', 'mechanical_guard',
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
            BuffService.checkGhastEffect(player, attacker);
            // 检查国王效果
            BuffService.checkKingEffect(player, attacker);
            // 检查灾厄之主阶段转换
            BuffService.checkDisasterLordPhase(player, attacker);
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
                this.reduceTrueDefense(player, trueDefense);
                damage -= trueDefense;
            }
        }

        // 最后扣除生命值
        console.log(`[DEBUG] 扣除生命值: ${player.name}血量${player.hp} -> ${player.hp - damage}`);
        player.hp -= damage;


        // 检查恶魂效果
        BuffService.checkGhastEffect(player, attacker);
        // 检查国王效果
        BuffService.checkKingEffect(player, attacker);
        // 检查灾厄之主阶段转换
        BuffService.checkDisasterLordPhase(player, attacker);
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

            case 'mechanical_bomb':
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
                // 由于影子机制已更改为在卡牌使用时直接替换，这里不再需要处理
                console.log(`[DEBUG] 影子机制已更新为卡牌替换模式，不再通过buff处理`);
                // 移除影子buff
                player.buffs = player.buffs.filter(b => b.id !== 'shadow');
                break;

            case 'draw_card_pending':
                // 处理抽牌效果
                drawCardsCallback(player, buff.duration || 0);
                // 移除buff
                player.buffs = player.buffs.filter(b => b.id !== 'draw_card_pending');
                break;
            case 'disaster_lord_phase1':
                // 灾厄之主第一阶段
                // 每回合手牌上限10，每回合8行动点
                // player.maxHandSize = 10;
                break;

            case 'disaster_lord_phase2':
                // 灾厄之主第二阶段
                // 每回合结束清除玩家剩余行动点
                // 注意：不要在这里给灾厄之主添加机械炸弹牌，因为这是给玩家的惩罚
                break;

            case 'disaster_lord_phase3':
                // 灾厄之主第三阶段
                // 每回合结束清除玩家剩余行动点
                // 血量回复至满，但上限减为6
                // player.maxHp = 6;
                // player.hp = 6;
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
        const sentryBonus = BuffService.processmechanicalSentry(attacker, "攻击牌");
        damage += sentryBonus;

        // 处理传导效果
        BuffService.processConduction(attacker, damage);

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

    static processConduction(player: Player, damage: number): void {
        // 查找传导buff
        const hasConduction = player.buffs.some(buff => buff.id === 'conduction');
        if (hasConduction) {
            // 将造成的伤害转化为自己的真防
            const existingTrueDefenceBuff = player.buffs.find(buff => buff.id === 'true_defence');
            if (existingTrueDefenceBuff) {
                // 如果已有真防buff，增加其持续时间（在这里表示真防点数）
                existingTrueDefenceBuff.duration = (existingTrueDefenceBuff.duration || 0) + damage;
            } else {
                // 如果没有真防buff，添加新的
                player.buffs.push({
                    id: 'true_defence',
                    duration: damage,
                    target: 'self'
                });
            }
            console.log(`[DEBUG] ${player.name}通过传导效果获得${damage}点真防`);
        }
    }

    // 处理转化效果
    static processTransfer(player: Player, damage: number): void {
        // 查找转化buff
        const transferBuffs = player.buffs.filter(buff => buff.id === 'transfer');
        for (const buff of transferBuffs) {
            // 将伤害转化为真防
            // 添加或更新真防buff
            const existingTrueDefenceBuff = player.buffs.find(buff => buff.id === 'true_defence');
            if (existingTrueDefenceBuff) {
                // 如果已有真防buff，增加其持续时间（在这里表示真防点数）
                existingTrueDefenceBuff.duration = (existingTrueDefenceBuff.duration || 0) + (damage || 0);
            } else {
                // 如果没有真防buff，添加新的
                player.buffs.push({
                    id: 'true_defence',
                    duration: damage || 0,
                    target: 'self'
                });
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
                    duration: 0, // 永久效果
                    target: 'self'
                });
            }

            console.log(`[DEBUG] ${player.name}触发恶魂效果`);
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
                    id: 'mechanical_bomb',
                    duration: 3,
                    target: 'self'
                });
                // 添加3张机械炸弹卡牌到对方牌组
                for (let i = 0; i < 3; i++) {
                    opponent.deck.push({ ...CARD_TEMPLATES.mechanical_bomb });
                }
            }

            // ✅ 将自己的手牌替换为6张“满蓄电池炸弹”
            player.hand = [];

            for (let i = 0; i < 6; i++) {
                const fullBatteryBombCard = CARD_TEMPLATES.full_battery_bomb;
                if (fullBatteryBombCard) {
                    player.hand.push({ ...fullBatteryBombCard });
                }
            }

            console.log(`[DEBUG] ${player.name}触发国王效果，手牌替换为6张满蓄电池炸弹`);
        }
    }


    // 检查灾厄之主阶段转换
    static checkDisasterLordPhase(
        player1: Player,  // 可能是灾厄之主或玩家
        player2: Player | null  // 另一个玩家或null
    ): void {
        console.log(`[DEBUG] checkDisasterLordPhase called with player1: ${player1.name}, player2: ${player2?.name}`);

        // 确定哪个是灾厄之主，哪个是玩家
        let disasterLord: Player | null = null;
        let player: Player | null = null;

        // 检查player1是否是灾厄之主
        if (player1.buffs.some(buff => buff.id === 'disaster_lord_phase1' ||
            buff.id === 'disaster_lord_phase2' ||
            buff.id === 'disaster_lord_phase3')) {
            disasterLord = player1;
            player = player2;
            console.log(`[DEBUG] player1 (${player1.name}) is disaster lord`);
        }
        // 检查player2是否是灾厄之主
        else if (player2 && player2.buffs.some(buff => buff.id === 'disaster_lord_phase1' ||
            buff.id === 'disaster_lord_phase2' ||
            buff.id === 'disaster_lord_phase3')) {
            disasterLord = player2;
            player = player1;
            console.log(`[DEBUG] player2 (${player2.name}) is disaster lord`);
        } else {
            console.log(`[DEBUG] No disaster lord found`);
        }

        // 如果没有找到灾厄之主，直接返回
        if (!disasterLord) {
            console.log(`[DEBUG] No disaster lord found, returning`);
            return;
        }

        // 检查是否有灾厄之主第一阶段buff且血量降到0或以下
        if (disasterLord.hp <= 0 && disasterLord.buffs.some(buff => buff.id === 'disaster_lord_phase1')) {
            console.log(`[DEBUG] ${disasterLord.name}触发灾厄之主第二阶段效果`);
            // 移除第一阶段buff
            disasterLord.buffs = disasterLord.buffs.filter(buff => buff.id !== 'disaster_lord_phase1');

            // 进入第二阶段
            disasterLord.buffs.push({
                id: 'disaster_lord_phase2',
                duration: 0,
                target: 'self'
            });

            // 设置第二管血的血量
            disasterLord.hp = 2;
            disasterLord.maxHp = 30;

            disasterLord.hand = [];

            // 如果有玩家，给玩家添加10张机械炸弹卡牌和10层机械炸弹buff（参考the_king效果）
            if (player) {
                // 玩家获得机械炸弹10层
                player.buffs.push({
                    id: 'mechanical_bomb',
                    duration: 10,
                    target: 'self'
                });
                // 添加10张机械炸弹卡牌到玩家牌组
                for (let i = 0; i < 10; i++) {
                    player.deck.push({ ...CARD_TEMPLATES.mechanical_bomb });
                }
            }
        }
        // 检查是否有灾厄之主第二阶段buff且血量降到0或以下
        else if (disasterLord.hp <= 0 && disasterLord.buffs.some(buff => buff.id === 'disaster_lord_phase2')) {
            console.log(`[DEBUG] ${disasterLord.name}触发灾厄之主第三阶段效果`);
            // 移除第二阶段buff
            disasterLord.buffs = disasterLord.buffs.filter(buff => buff.id !== 'disaster_lord_phase2');

            // 进入第三阶段
            disasterLord.buffs.push({
                id: 'disaster_lord_phase3',
                duration: 0,
                target: 'self'
            });
            disasterLord.buffs.push({
                id: 'true_defence',
                duration: 140,
                target: 'self'
            });

            disasterLord.hand = [];

            // 设置第三管血的血量
            disasterLord.hp = 1;
            disasterLord.maxHp = 1;

            // 检查是否是特殊对战（通过检查游戏配置中的特殊标志）
            // 我们可以通过检查window对象上的特殊属性来判断
            const isSpecialBattle = (window as any).isDisasterLordFinalBattle === true;

            // 如果有玩家且不是特殊对战，则给玩家添加终焉之泪和影子卡牌
            if (player && !isSpecialBattle) {
                // 玩家血量回复至满，但上限减为4
                player.hp = 4;
                player.maxHp = 4;

                // 添加终焉之泪和影子手牌到玩家手中（如果有的话）
                const bagManager = BagManager.getInstance();
                if (bagManager.hasCard('end_tears')) {
                    const endTearsCard = CARD_TEMPLATES.end_tears;
                    player.hand.push({ ...endTearsCard });
                }

                console.log(`[DEBUG] Checking for shadow_card in deck: ${bagManager.hasCard('shadow_card')}`);
                if (bagManager.hasCard('shadow_card')) {
                    const shadowCard = CARD_TEMPLATES.shadow_card;
                    player.hand.push({ ...shadowCard });
                }
            } else if (player) {
                // 在特殊对战中，只调整玩家血量，不给终焉之泪和影子卡牌
                player.hp = 4;
                player.maxHp = 4;
            }
        }
    }

    // 检查是否有雾效果
    static hasFog(player: Player): boolean {
        return player.buffs.some(buff => buff.id === 'fog');
    }

    // 检查是否为灾厄之主第一阶段
    static isDisasterLordPhase1(player: Player): boolean {
        return player.buffs.some(buff => buff.id === 'disaster_lord_phase1');
    }

    // 检查是否为灾厄之主第二阶段
    static isDisasterLordPhase2(player: Player): boolean {
        return player.buffs.some(buff => buff.id === 'disaster_lord_phase2');
    }

    // 检查是否为灾厄之主第三阶段
    static isDisasterLordPhase3(player: Player): boolean {
        return player.buffs.some(buff => buff.id === 'disaster_lord_phase3');
    }

    // 处理灾厄之主的牌组轮换
    static processDisasterLordDeckRotation(player: Player, turn: number): void {
        console.log(`[DEBUG] 开始处理灾厄之主牌组轮换 - 玩家: ${player.name}, 回合: ${turn}`);
        console.log(`[DEBUG] 玩家当前buff:`, player.buffs);

        // 确定当前阶段
        if (this.isDisasterLordPhase1(player)) {
            console.log(`[DEBUG] 灾厄之主第一阶段`);
            // 第一阶段：每4回合为一个循环
            // 第1回合：巨石卡组
            // 第2回合：虚樹卡组
            // 第3回合：梅菲斯特卡组
            // 第4回合：山鬼卡组
            const phase = ((turn - 1) % 4) + 1;
            console.log(`[DEBUG] 第一阶段 - 当前阶段: ${phase}`);

            // 清空当前牌组
            player.deck = [];

            switch (phase) {
                case 1: // 巨石卡组
                    console.log(`[DEBUG] 添加巨石卡组`);
                    // 添加巨石卡组卡牌
                    for (let i = 0; i < 3; i++) {
                        player.deck.push({ ...CARD_TEMPLATES.little_stone });
                    }
                    for (let i = 0; i < 2; i++) {
                        player.deck.push({ ...CARD_TEMPLATES.strange_stone });
                    }
                    for (let i = 0; i < 3; i++) {
                        player.deck.push({ ...CARD_TEMPLATES.bedrock });
                    }
                    for (let i = 0; i < 2; i++) {
                        player.deck.push({ ...CARD_TEMPLATES.large_rock });
                    }
                    break;

                case 2: // 虚樹卡组
                    console.log(`[DEBUG] 添加虚樹卡组`);
                    // 添加虚樹卡组卡牌
                    for (let i = 0; i < 2; i++) {
                        player.deck.push({ ...CARD_TEMPLATES.mechanical_shield });
                    }
                    player.deck.push({ ...CARD_TEMPLATES.nano_armor });
                    for (let i = 0; i < 2; i++) {
                        player.deck.push({ ...CARD_TEMPLATES.mechanical_defense });
                    }
                    player.deck.push({ ...CARD_TEMPLATES.mechanical_arm_swing });
                    player.deck.push({ ...CARD_TEMPLATES.battery_bomb });
                    player.deck.push({ ...CARD_TEMPLATES.full_battery_bomb });
                    player.deck.push({ ...CARD_TEMPLATES.worn_gear });
                    player.deck.push({ ...CARD_TEMPLATES.expired_oil });
                    break;

                case 3: // 梅菲斯特卡组
                    console.log(`[DEBUG] 添加梅菲斯特卡组`);
                    // 添加梅菲斯特卡组卡牌
                    player.deck.push({ ...CARD_TEMPLATES.reapers_whisper });
                    for (let i = 0; i < 3; i++) {
                        player.deck.push({ ...CARD_TEMPLATES.reapers_groan });
                    }
                    break;

                case 4: // 山鬼卡组
                    console.log(`[DEBUG] 添加山鬼卡组`);
                    // 添加山鬼卡组卡牌
                    for (let i = 0; i < 2; i++) {
                        player.deck.push({ ...CARD_TEMPLATES.mountain_ghoul });
                    }
                    player.deck.push({ ...CARD_TEMPLATES.forest_ghoul });
                    player.deck.push({ ...CARD_TEMPLATES.drowned_ghoul });
                    player.deck.push({ ...CARD_TEMPLATES.hungry_ghoul });
                    player.deck.push({ ...CARD_TEMPLATES.lonely_ghoul });
                    player.deck.push({ ...CARD_TEMPLATES.stingy_ghoul });
                    player.deck.push({ ...CARD_TEMPLATES.ghostly_figures });
                    break;
            }
            console.log(`[DEBUG] 第一阶段牌组轮换完成，当前牌组数量: ${player.deck.length}`);
        } else if (this.isDisasterLordPhase2(player)) {
            console.log(`[DEBUG] 灾厄之主第二阶段`);
            // 第二阶段：每3回合为一个循环
            // 第1回合：巫婆卡组（强化版）
            // 第2回合：国王卡组
            // 第3回合：恶魂卡组
            const phase = ((turn - 1) % 3) + 1;
            console.log(`[DEBUG] 第二阶段 - 当前阶段: ${phase}`);

            // 清空当前牌组
            player.deck = [];

            switch (phase) {
                case 1: // 巫婆卡组（强化版）
                    console.log(`[DEBUG] 添加巫婆卡组（强化版）`);
                    // 添加巫婆强化卡组卡牌
                    player.deck.push({ ...CARD_TEMPLATES.well_fitting_robe });
                    for (let i = 0; i < 2; i++) {
                        player.deck.push({ ...CARD_TEMPLATES.brand_new_page });
                    }
                    player.deck.push({ ...CARD_TEMPLATES.normal_candlelight });
                    for (let i = 0; i < 2; i++) {
                        player.deck.push({ ...CARD_TEMPLATES.interesting_staff });
                    }
                    player.deck.push({ ...CARD_TEMPLATES.wonderful_potion });
                    player.deck.push({ ...CARD_TEMPLATES.intelligence_reducing_hat });
                    player.deck.push({ ...CARD_TEMPLATES.lovable_clock });
                    break;

                case 2: // 国王卡组
                    console.log(`[DEBUG] 添加国王卡组`);
                    // 添加国王卡组卡牌
                    for (let i = 0; i < 2; i++) {
                        player.deck.push({ ...CARD_TEMPLATES.mechanical_sentry });
                    }
                    player.deck.push({ ...CARD_TEMPLATES.mechanical_factory });
                    for (let i = 0; i < 2; i++) {
                        player.deck.push({ ...CARD_TEMPLATES.full_battery_bomb });
                    }
                    for (let i = 0; i < 2; i++) {
                        player.deck.push({ ...CARD_TEMPLATES.brand_new_gear });
                    }
                    player.deck.push({ ...CARD_TEMPLATES.unexpired_oil });
                    player.deck.push({ ...CARD_TEMPLATES.mechanical_guard });
                    player.deck.push({ ...CARD_TEMPLATES.mechanical_crushed_stone });
                    player.deck.push({ ...CARD_TEMPLATES.mechanical_meteorite });
                    break;

                case 3: // 恶魂卡组
                    console.log(`[DEBUG] 添加恶魂卡组`);
                    // 添加恶魂卡组卡牌
                    for (let i = 0; i < 2; i++) {
                        player.deck.push({ ...CARD_TEMPLATES.yin_spirit });
                    }
                    for (let i = 0; i < 2; i++) {
                        player.deck.push({ ...CARD_TEMPLATES.yang_spirit });
                    }
                    player.deck.push({ ...CARD_TEMPLATES.curse });
                    player.deck.push({ ...CARD_TEMPLATES.devour });
                    player.deck.push({ ...CARD_TEMPLATES.will_o_wisp });
                    break;
            }
            console.log(`[DEBUG] 第二阶段牌组轮换完成，当前牌组数量: ${player.deck.length}`);
        } else {
            console.log(`[DEBUG] 不是灾厄之主阶段，跳过牌组轮换`);
        }
        // 第三阶段不需要牌组，因为灾厄之主没有手牌
        // 在第三阶段，我们保持player.deck为空数组
    }

    // 处理机械哨兵效果
    static processmechanicalSentry(player: Player, cardName: string): number {
        // 查找机械哨兵buff
        const sentryBuffs = player.buffs.filter(buff => buff.id === 'mechanical_sentry');
        let bonusDamage = 0;

        // 计算总加成伤害
        for (const buff of sentryBuffs) {
            bonusDamage += buff.duration || 0;
        }

        return bonusDamage;
    }

    // 处理影子效果
    static processShadow(player: Player, lastPlayedCard: import("../models/Card").Card | null): void {
        const shadowIndex = player.buffs.findIndex(buff => buff.id === 'shadow');
        if (shadowIndex !== -1) {
            // 移除影子buff
            player.buffs.splice(shadowIndex, 1);

            // 由于影子机制已更改为在卡牌使用时直接替换，这里不再需要处理
            console.log(`[DEBUG] 影子机制已更新为卡牌替换模式，不再通过buff处理`);
        }
    }

    // 在回合结束时处理灾厄之主效果
    static processDisasterLordEndTurn(player: Player): void {
        // 检查是否为灾厄之主的第二或第三阶段
        if (this.isDisasterLordPhase2(player) || this.isDisasterLordPhase3(player)) {
            // 清除玩家剩余行动点（但不清除灾厄之主自己的行动点）
            // 只有当玩家不是灾厄之主时才清除行动点
            if (!this.isDisasterLordPhase1(player) &&
                !this.isDisasterLordPhase2(player) &&
                !this.isDisasterLordPhase3(player)) {
                player.actionPoints = 0;
            }
        }
    }

    // 在回合开始时处理灾厄之主牌组轮换
    static processDisasterLordTurnStart(player: Player, turn: number): void {
        // 检查是否为灾厄之主
        const isPhase1 = this.isDisasterLordPhase1(player);
        const isPhase2 = this.isDisasterLordPhase2(player);
        const isPhase3 = this.isDisasterLordPhase3(player);

        console.log(`[DEBUG] 检查灾厄之主阶段 - Phase1: ${isPhase1}, Phase2: ${isPhase2}, Phase3: ${isPhase3}`);

        if (isPhase1 || isPhase2 || isPhase3) {
            console.log(`[DEBUG] 处理灾厄之主牌组轮换 - 回合: ${turn}`);
            // 处理牌组轮换
            this.processDisasterLordDeckRotation(player, turn);
        }
    }
}