import { Player } from "../models/Player";
import { Buff } from "../models/Buff";
import { Card } from "../models/Card";
import { CardService } from "./CardService";

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
                case 'machanical_guard':
                case 'fog':
                case 'unreal_spell':
                case 'erosive_heart':
                case 'erosive':
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
                case 'immunication':
                case 'transfer':
                case 'machanical_sentry':
                    if (buff.duration !== undefined && buff.duration > 0) {
                        buff.duration--;
                        if (buff.duration <= 0) {
                            player.buffs.splice(i, 1);
                        }
                    }
                    break;
            }
        }
    }
    
     // 抽牌
     // 抽牌
    static drawCards(player: Player, count: number, updateMessage?: (message: string) => void): void {
        console.log(`[DEBUG] ${player.name}抽${count}张牌`);
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
                this.shuffleDeck(player);
            }
            
            // 如果重新洗牌后仍然没有牌，停止抽牌
            if (player.deck.length === 0) {
                console.log(`[DEBUG] ${player.name}重新洗牌后仍无牌可抽，停止抽牌`);
                if (updateMessage) {
                    updateMessage(`${player.name}想要抽牌，但牌堆已空`);
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
    static shuffleDeck(player: Player): void {
        // 如果弃牌堆为空，无法洗牌
        if (player.discardPile.length === 0) {
            return;
        }
        
        // 将弃牌堆洗牌后作为新的牌组
        player.deck = [...player.discardPile];
        this.shuffleArray(player.deck);
        
        // 清空弃牌堆
        player.discardPile = [];
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