import { Player } from "../models/Player";
import { Card } from "../models/Card";
import { CARD_TEMPLATES, CardData } from "../data/CardData";
import { CardType } from "../models/Card";

export class GameService {
    // 创建初始卡组
    static createInitialDeck(deckConfig: { [key: string]: number } | undefined, isPlayer: boolean = true): Card[] {
        // 获取配置的牌组
        // 如果有配置，使用配置创建牌组
        if (deckConfig) {
            const deck: Card[] = [];
            
            // 根据配置创建牌组
            for (const [cardId, count] of Object.entries(deckConfig)) {
                const cardTemplate = CARD_TEMPLATES[cardId];
                if (cardTemplate) {
                    for (let i = 0; i < count; i++) {
                        // 转换CardData为Card
                        const card: Card = {
                            id: cardTemplate.id,
                            name: cardTemplate.name,
                            description: cardTemplate.description,
                            type: cardTemplate.type as CardType,
                            cost: cardTemplate.cost,
                            power: cardTemplate.power,
                            priority: cardTemplate.priority,
                            effects: cardTemplate.effects
                        };
                        deck.push(card);
                    }
                }
            }
            
            return deck;
        }
        
        // 如果没有配置，返回空牌组
        return [];
    }
}