import { Player } from "../models/Player";
import { Buff } from "../models/Buff";

export class PlayerService {
    // 处理玩家buff效果
    static processBuffs(player: Player, opponent: Player, updateMessage: (message: string) => void): void {
        const buffsToRemove: Buff[] = [];
        
        for (const buff of player.buffs) {
            switch (buff.effect) {
                case 'action_point_boost':
                    if (buff.target === 'self') {
                        player.actionPoints += buff.value;
                        updateMessage(` ${player.name}因${buff.name}获得${buff.value}点行动点`);
                    } else {
                        opponent.actionPoints += buff.value;
                        updateMessage(` ${opponent.name}因${buff.name}获得${buff.value}点行动点`);
                    }
                    break;
                    
                case 'action_point_reduce':
                    if (buff.target === 'self') {
                        player.actionPoints = Math.max(0, player.actionPoints - buff.value);
                        updateMessage(` ${player.name}因${buff.name}失去${buff.value}点行动点`);
                    } else {
                        opponent.actionPoints = Math.max(0, opponent.actionPoints - buff.value);
                        updateMessage(` ${opponent.name}因${buff.name}失去${buff.value}点行动点`);
                    }
                    break;
                    
                case 'defense_boost':
                    if (buff.target === 'self') {
                        player.defense += buff.value;
                        updateMessage(` ${player.name}因${buff.name}获得${buff.value}点防御`);
                    } else {
                        opponent.defense += buff.value;
                        updateMessage(` ${opponent.name}因${buff.name}获得${buff.value}点防御`);
                    }
                    break;
            }
            
            // 更新buff持续时间
            if (buff.duration > 0) {
                buff.duration--;
                if (buff.duration <= 0) {
                    buffsToRemove.push(buff);
                }
            }
        }
        
        // 移除过期的buff
        player.buffs = player.buffs.filter(buff => !buffsToRemove.includes(buff));
    }
    
    // 抽牌
    static drawCards(player: Player, count: number): void {
        for (let i = 0; i < count; i++) {
            // 如果手牌已满，停止抽牌
            if (player.hand.length >= 7) {
                break;
            }
            
            // 如果牌组为空，重新洗牌
            if (player.deck.length === 0) {
                this.shuffleDeck(player);
            }
            
            // 如果重新洗牌后仍然没有牌，停止抽牌
            if (player.deck.length === 0) {
                break;
            }
            
            // 从牌组中随机抽取一张牌
            const cardIndex = Math.floor(Math.random() * player.deck.length);
            const card = player.deck.splice(cardIndex, 1)[0];
            player.hand.push(card);
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
}