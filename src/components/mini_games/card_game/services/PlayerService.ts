import { Player } from "../models/Player";
import { Buff } from "../models/Buff";
import { Card } from "../models/Card";
import { CardService } from "./CardService";
import { CARD_TEMPLATES } from "../data/CardData";

export class PlayerService {

    // 处理玩家buff效果
    static processBuffs(player: Player, opponent: Player, updateMessage: (message: string) => void, lastPlayedCard: Card | null = null): void {
        // 遍历所有buff
        for (let i = player.buffs.length - 1; i >= 0; i--) {
            const buff = player.buffs[i];
            
            // 执行buff效果
            CardService.executeBuffEffect(buff, player, opponent, updateMessage, (p, count) => {
                this.drawCards(p, count, updateMessage);
            }, lastPlayedCard);
            
            // 根据buff类型更新持续时间
            switch (buff.id) {
                // 这些buff每回合触发效果但不减少层数
                case 'defence':
                case 'true_defence':
                case 'sharp':
                case 'mechanical_guard':
                case 'fog':
                case 'unreal_spell':
                case 'erosive_heart':
                case 'erosive':
                case 'immunication':
                    // 不减少层数，保持buff
                    break;
                    
                // 这些buff在触发一次效果后消失
                case 'hard':
                case 'true_hard':
                case 'shadow':
                    player.buffs.splice(i, 1);
                    break;
                    
                // 这些buff每回合减少层数
                case 'incurable':
                case 'transfer':
                    if (buff.duration !== undefined && buff.duration > 0) {
                        buff.duration--;
                        if (buff.duration <= 0) {
                            player.buffs.splice(i, 1);
                        }
                    }
                    break;
                // 机械哨兵buff在回合开始时消失
                case 'mechanical_sentry':
                    player.buffs.splice(i, 1);
                    break;
            }
        }
    }
    

    // 抽牌
    static drawCards(player: Player, count: number, updateMessage?: (message: string) => void, forceDraw: boolean = false, usedOnceCards?: Set<string>): void {
        console.log(`[DEBUG] ${player.name}抽${count}张牌, usedOnceCards:`, usedOnceCards ? Array.from(usedOnceCards) : 'undefined');
        let drawnCount = 0; // 记录实际抽到的牌数
        
        for (let i = 0; i < count; i++) {
            // 如果手牌已满（7张），停止抽牌
            if (player.hand.length >= 7) {
                console.log(`[DEBUG] ${player.name}手牌已满，停止抽牌`);
                if (updateMessage) {
                    updateMessage(`${player.name}想要抽牌，但手牌已满`);
                }
                break;
            }
            
            // 如果牌组为空，重新洗牌
            if (player.deck.length === 0) {
                console.log(`[DEBUG] ${player.name}牌组为空，重新洗牌`);
                this.shuffleDeck(player, usedOnceCards);
            }
            
            // 如果重新洗牌后仍然没有牌，且需要强制抽牌
            if (player.deck.length === 0 && forceDraw) {
                console.log(`[DEBUG] ${player.name}重新洗牌后仍无牌可抽，但强制抽牌中...`);
                // 将弃牌堆洗牌后作为新的牌组（如果弃牌堆不为空）
                if (player.discardPile.length > 0) {
                    player.deck = [...player.discardPile];
                    this.shuffleArray(player.deck);
                    // 清空弃牌堆
                    player.discardPile = [];
                    console.log(`[DEBUG] ${player.name}将弃牌堆洗牌后作为新的牌组`);
                } else {
                    // 如果弃牌堆也为空，则从手牌中复制牌（如果手牌不为空）
                    console.log(`[DEBUG] ${player.name}弃牌堆也为空，从手牌中复制牌`);
                    if (player.hand.length > 0) {
                        // 复制所有手牌到deck中
                        for (const card of player.hand) {
                            player.deck.push({ ...card });
                        }
                        this.shuffleArray(player.deck);
                        console.log(`[DEBUG] ${player.name}从手牌复制了${player.hand.length}张牌到deck中`);
                    }
                }
            }
            
            // 如果仍然没有牌可抽，停止抽牌
            if (player.deck.length === 0) {
                console.log(`[DEBUG] ${player.name}没有任何牌可抽，停止抽牌`);
                if (updateMessage) {
                    updateMessage(`${player.name}想要抽牌，但没有牌可抽`);
                }
                break;
            }
            
            // 从牌组中抽取一张牌（从顶部抽取）
            const card = player.deck.pop();
            
            // 确保抽到的卡牌有效
            if (card && card.id) {
                player.hand.push(card);
                drawnCount++;
                console.log(`[DEBUG] ${player.name}抽到卡牌: ${card.name}`);
            } else {
                console.warn('抽到了无效卡牌:', card);
                // 如果抽到了无效卡牌，尝试再抽一张
                i--; // 重新尝试这一轮抽牌
            }
        }
        
        // 提供抽牌结果的反馈
        if (updateMessage) {
            if (drawnCount === count) {
                updateMessage(`${player.name}抽到了${drawnCount}张牌`);
            } else if (drawnCount < count) {
                updateMessage(`${player.name}想要抽${count}张牌，但只抽到了${drawnCount}张`);
            }
        }
    }
    
    // 洗牌
    static shuffleDeck(player: Player, usedOnceCards?: Set<string>): void {
        console.log(`[DEBUG] ${player.name}开始洗牌，弃牌堆数量: ${player.discardPile.length}`);
        // 如果弃牌堆为空，无法洗牌
        if (player.discardPile.length === 0) {
            console.log(`[DEBUG] ${player.name}弃牌堆为空，无法洗牌`);
            return;
        }
        
        // 将弃牌堆洗牌后作为新的牌组
        player.deck = [...player.discardPile];
        console.log(`[DEBUG] ${player.name}将弃牌堆复制到牌组，当前牌组数量: ${player.deck.length}`);
        
        // 如果提供了已使用一次性卡牌列表，则过滤掉这些卡牌
        if (usedOnceCards) {
            console.log(`[DEBUG] ${player.name}当前已使用一次性卡牌:`, Array.from(usedOnceCards));
            const beforeFilter = player.deck.length;
            player.deck = player.deck.filter(card => {
                // 如果卡牌不是一次性卡牌，则保留
                if (!card.useOnce) {
                    console.log(`[DEBUG] ${player.name}保留非一次性卡牌: ${card.name}(${card.id})`);
                    return true;
                }
                // 如果是一次性卡牌，且未被使用过，则保留
                const shouldKeep = !usedOnceCards.has(card.id);
                if (!shouldKeep) {
                    console.log(`[DEBUG] ${player.name}过滤掉已使用的一次性卡牌: ${card.name}(${card.id})`);
                } else {
                    console.log(`[DEBUG] ${player.name}保留未使用的一次性卡牌: ${card.name}(${card.id})`);
                }
                return shouldKeep;
            });
            console.log(`[DEBUG] ${player.name}过滤后牌组数量: ${player.deck.length} (过滤前: ${beforeFilter})`);
        } else {
            console.log(`[DEBUG] ${player.name}没有提供已使用一次性卡牌列表`);
        }
        
        this.shuffleArray(player.deck);
        console.log(`[DEBUG] ${player.name}洗牌完成，牌组数量: ${player.deck.length}`);
        
        // 清空弃牌堆
        player.discardPile = [];
        console.log(`[DEBUG] ${player.name}清空弃牌堆`);
    }
    
    // Fisher-Yates 洗牌算法
    static shuffleArray(array: any[]): void {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    // 设置初始化buff
    static setInitialBuffs(player: Player, initialBuffs: any[] | undefined): void {
        if (initialBuffs && Array.isArray(initialBuffs)) {
            console.log(`[DEBUG] 为${player.name}设置初始化buff:`, initialBuffs);
            // 添加初始化buff到玩家的buff列表中
            player.buffs = [...player.buffs, ...initialBuffs];
        }
    }
}