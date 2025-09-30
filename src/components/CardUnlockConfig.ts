/**
 * 卡片解锁配置系统
 * 
 * 这个模块实现了一个基于游戏进度的卡片解锁系统，用于控制card_library中显示哪些卡片。
 * 系统根据玩家的游戏进度（场景ID、节点索引等）来决定哪些卡片应该被解锁和显示。
 * 
 * 核心设计理念：
 * 1. 渐进式解锁：卡片随着游戏进度逐步解锁，而不是一开始就显示所有卡片
 * 2. 条件驱动：每个卡片都有明确的解锁条件，确保玩家在合适的时机获得卡片
 * 3. 替换机制：支持卡片升级，如darkness_initial升级为darkness
 * 4. 灵活配置：可以轻松添加新的解锁规则和条件
 */

/**
 * 卡片解锁规则接口
 * 定义了单个卡片的解锁条件和相关属性
 */
export interface CardUnlockRule {
    /** 卡片ID，对应CardDatabase中的卡片标识符 */
    cardId: string;
    
    /** 解锁条件对象，包含所有需要满足的条件 */
    unlockConditions: {
        /** 需要到达的场景ID - 玩家必须在这个场景中 */
        sceneId?: string;
        
        /** 需要到达的节点ID - 玩家必须到达这个特定节点 */
        nodeId?: string;
        
        /** 需要完成的最小节点索引 - 玩家必须达到或超过这个节点进度 */
        minNodeIndex?: number;
        
        /** 需要拥有的前置卡片 - 玩家必须先拥有这些卡片才能解锁新卡片 */
        requiredCards?: string[];
        
        /** 需要达到的好感度 - 与特定角色的好感度要求 */
        affection?: { [character: string]: number };
    };
    
    /** 解锁时给予的卡片数量 */
    count: number;
    
    /** 是否替换现有卡片 - 用于卡片升级机制 */
    replace?: boolean;
    
    /** 被替换的卡片ID - 当replace为true时，指定要被替换的卡片 */
    replaceCardId?: string;
}

/**
 * 卡片解锁规则配置数组
 * 
 * 这个数组包含了游戏中所有卡片的解锁规则。系统会遍历这个数组，
 * 检查每个规则的条件是否满足，从而决定哪些卡片应该被解锁。
 * 
 * 规则按游戏进度顺序排列：
 * 1. 初始卡片（游戏开始时就有）
 * 2. 第一章节解锁的卡片
 * 3. 第二章节解锁的卡片
 * 4. 第三章节解锁的卡片
 * 5. 第四章节解锁的卡片
 * 6. 特殊解锁条件的卡片
 */
export const CARD_UNLOCK_RULES: CardUnlockRule[] = [
    // ==================== 初始卡片 ====================
    // 这5张基础卡片在游戏开始时就可以使用，是所有玩家的起始卡片
    // 条件：minNodeIndex >= 0（即游戏开始后立即解锁）
    
    {
        cardId: "punch",        // 拳击卡片
        unlockConditions: {
           
            nodeId: "node1" 
        },
        count: 3                // 给予3张
    },
    {
        cardId: "dodge",        // 闪避卡片
        unlockConditions: {
            nodeId: "node1" 
        },
        count: 3                // 给予3张
    },
    {
        cardId: "parry",        // 格挡卡片
        unlockConditions: {
            nodeId: "node1" 
        },
        count: 3                // 给予3张
    },
    {
        cardId: "hook",         // 钩拳卡片
        unlockConditions: {
            
            nodeId: "node1" 
        },
        count: 3                // 给予3张
    },
    {
        cardId: "combo",        // 连击卡片
        unlockConditions: {
            nodeId: "node1" 
            // 游戏开始即可解锁
        },
        count: 3                // 给予3张
    },

    // ==================== 第一章节解锁的卡片 ====================
    // 这些卡片需要玩家推进到第一章节的特定场景和节点才能解锁
    
    {
        cardId: "enlightenment",    // 觉悟卡片 - 第一章节的重要卡片
        unlockConditions: {
            nodeId:"mysterious_person_10"

            // 必须在第一章节的第一个场景
                    // 必须推进到节点10或以上
        },
        count: 1                    // 给予1张
    },
    
    // ==================== 第二章节解锁的卡片 ====================
    // 这些卡片需要玩家推进到第二章节才能解锁
    
    {
        cardId: "holy_shield",      // 神圣护盾卡片
        unlockConditions: {
            nodeId: "node70"//过node3节点才能解锁
        },
        count: 2                    // 给予2张
    },
    {
        cardId: "holiness",         // 神圣卡片
        unlockConditions: {
            nodeId: "node70"// 必须在第二章节的第一个场景
                       
        },
        count: 2                    // 给予2张
    },
    {
        cardId: "darkness_initial", // 暗寂初始卡片（后续会被升级为darkness）
        unlockConditions: {
            nodeId: "node70" // 必须在第二章节的第一个场景
                 
        },
        count: 1                    // 给予1张
    },

    // ==================== 卡片升级机制 ====================
    // 这个规则展示了卡片升级机制：darkness_initial升级为darkness
    
    {
        cardId: "darkness",         // 暗寂卡片（升级版）
        unlockConditions: {
           nodeId: "darkblade_8"                // 必须推进到节点5或以上
        },
        count: 1,                   // 给予1张
        replace: true,              // 启用替换机制
        replaceCardId: "darkness_initial"  // 替换darkness_initial卡片
    },
    
    // ==================== 石头试炼相关卡片 ====================
    // 这些卡片在第一章节的石头试炼中解锁
    
    {
        cardId: "strange_stone",    // 奇异石头卡片
        unlockConditions: {
         nodeId: "lightling_13_1"
                         // 必须推进到节点20或以上（石头试炼完成）
        },
        count: 2                    // 给予2张
    },
    {
        cardId: "pebble",           // 鹅卵石卡片
        unlockConditions: {
            nodeId:"lightling_13_1"
                         // 必须ter_0_scene_1_0"推进到节点20或以上（石头试炼完成）
        },
        count: 2                    // 给予2张
    },

    // ==================== 第三章节解锁的卡片 ====================
    // 这些卡片需要玩家推进到第三章节才能解锁
    
    {
        cardId: "meteorite",        // 陨石卡片
        unlockConditions: {
            nodeId:"mountain_1" // 必须在第三章节的第一个场景
                         // 必须推进到节点10或以上
        },
        count: 1                    // 给予1张
    },
    {
        cardId: "reapers_whisper",  // 死神低语卡片
        unlockConditions: {
            sceneId: "chapter_0_scene_3_0",  // 必须在第三章节的第一个场景
                         // 必须推进到节点15或以上
        },
        count: 1                    // 给予1张
    },
    {
        cardId: "reapers_groan",    // 死神呻吟卡片
        unlockConditions: {
            nodeId: "mountain_131_2_2",  // 必须在第三章节的第一个场景
                           // 必须推进到节点20或以上
        },
        count: 1                    // 给予1张
    },

    // ==================== 第四章节解锁的卡片 ====================
    // 这些卡片需要玩家推进到第四章节才能解锁
    
    {
        cardId: "end_tears",        // 终焉之泪卡片 - 最终章节的重要卡片
        unlockConditions: {
            sceneId: "chapter_0_scene_4_0",  // 必须在第四章节的第一个场景
            minNodeIndex: 10                 // 必须推进到节点10或以上
        },
        count: 1                    // 给予1张
    },

    // ==================== 特殊解锁条件的卡片 ====================
    // 这些卡片需要玩家达到特定的高级节点才能解锁
    
    // 机械系列卡片 - 需要深入第二章节
    {
        cardId: "full_battery_bomb",    // 满电炸弹卡片
        unlockConditions: {
            // 必须在第二章节的第二个场景
            nodeId: "darkblade_56_2",     
                        // 必须推进到节点30或以上（深入剧情）
        },
        count: 1                    // 给予1张
    },
    {
        cardId: "nano_armor",        // 纳米装甲卡片
        unlockConditions: {
            nodeId: "darkblade_56_2",  // 必须在第二章节的第二个场景
                           // 必须推进到节点30或以上（深入剧情）
        },
        count: 1                    // 给予1张
    },
    {
        cardId: "swap_robot",        // 交换机器人卡片
        unlockConditions: {
            nodeId: "darkblade_56_2",                  // 必须推进到节点30或以上（深入剧情）
        },
        count: 1                    // 给予1张
    },
    
    // 巫婆系列卡片 - 需要深入第二章节
    {
        cardId: "witchs_gift",       // 巫婆的礼物卡片
        unlockConditions: {
            nodeId: "altar_42"                // 必须推进到节点25或以上（深入剧情）
        },
        count: 1                    // 给予1张
    },
    {
        cardId: "wise_hat",          // 智慧帽子卡片
        unlockConditions: {
            nodeId: "altar_42"          // 必须推进到节点25或以上（深入剧情）
        },
        count: 1                    // 给予1张
    },
    {
        cardId: "useless_potion",    // 无用药水卡片
        unlockConditions: {
            nodeId: "altar_42"          // 必须推进到节点25或以上（深入剧情）
        },
        count: 1                    // 给予1张
    },
    {
        cardId: "eerie_candlelight", // 诡异烛光卡片
        unlockConditions: {
            nodeId: "altar_42"          // 必须推进到节点25或以上（深入剧情）
        },
        count: 1                    // 给予1张
    },

    // ==================== 测试 nodeId 功能的卡片 ====================
    // 这些卡片用于测试和演示 nodeId 解锁条件
    {
        cardId: "ghostly_figures", // 诡异烛光卡片
        unlockConditions: {
            nodeId: "mountain_150_2_2_2"          // 必须推进到节点25或以上（深入剧情）
        },
        count: 1                    // 给予1张
    },

    // ==================== 补充CardDatabase中的所有卡牌 ====================
    // 根据story文件分析，添加所有缺失的卡牌解锁规则

    // 石头系列卡牌
    {
        cardId: "little_stone",
        unlockConditions: {
            nodeId: "lightling_13_1"
        },
        count: 1
    },
    {
        cardId: "bedrock",
        unlockConditions: {
            nodeId: "lightling_13_1"
        },
        count: 1
    },
    {
        cardId: "large_rock",
        unlockConditions: {
            nodeId: "lightling_13_1"
        },
        count: 1
    },
    {
        cardId: "red_stone",
        unlockConditions: {
            nodeId: "lightling_13_1"
        },
        count: 1
    },
    {
        cardId: "diamond",
        unlockConditions: {
            nodeId: "lightling_13_1"
        },
        count: 1
    },
    {
        cardId: "crushed_stone",
        unlockConditions: {
            nodeId: "lightling_13_1"
        },
        count: 1
    },
    {
        cardId: "meteorite",
        unlockConditions: {
            nodeId: "mountain_1"
        },
        count: 1
    },

    // 暗寂系列卡牌
    {
        cardId: "darkness_final",
        unlockConditions: {
            nodeId: "mountain_150_2_2_2_2"
        },
        count: 1,
        replace: true,
        replaceCardId: "darkness"
    },
    {
        cardId: "darkness_shadow_form",
        unlockConditions: {
            nodeId: "mountain_242_2_3_2_1"
        },
        count: 1,
        replace: true,
        replaceCardId: "darkness_final"
    },
    {
        cardId: "darkness_erosive_heart",
        unlockConditions: {
            nodeId: "mountain_241_2_3_2_1"
        },
        count: 1,
        replace: true,
        replaceCardId: "darkness_final"
    },
    {
        cardId: "darkness_shattered_erosive",
        unlockConditions: {
            nodeId: "mountain_242_2_3_2_2"
        },
        count: 1,
        replace: true,
        replaceCardId: "darkness_final"
    },
    {
        cardId: "darkness_enhanced",
        unlockConditions: {
            nodeId: "darkblade_8"
        },
        count: 1
    },
    {
        cardId: "darkness_erosive_weakened",
        unlockConditions: {
            nodeId: "mountain_242_2_3_2_2"
        },
        count: 1
    },

    // 无痕系列卡牌
    {
        cardId: "tear_of_no_trace",
        unlockConditions: {
            nodeId: "wake_15"
        },
        count: 1
    },
    {
        cardId: "end_tears",
        unlockConditions: {
            nodeId: "mountain_242_2_3_2_1"
        },
        count: 1,
        replace: true,
        replaceCardId: "tear_of_no_trace"
    },

    // 巫婆系列卡牌
    {
        cardId: "ill_fitting_robe",
        unlockConditions: {
            nodeId: "altar_42"
        },
        count: 1
    },
    {
        cardId: "faded_page",
        unlockConditions: {
            nodeId: "altar_42"
        },
        count: 1
    },
    {
        cardId: "eerie_candlelight",
        unlockConditions: {
            nodeId: "altar_42"
        },
        count: 1
    },
    {
        cardId: "boring_staff",
        unlockConditions: {
            nodeId: "altar_42"
        },
        count: 1
    },
    {
        cardId: "useless_potion",
        unlockConditions: {
            nodeId: "altar_42"
        },
        count: 1
    },
    {
        cardId: "annoying_clock",
        unlockConditions: {
            nodeId: "altar_42"
        },
        count: 1
    },

    // 机械系列卡牌
    {
        cardId: "mechanical_shield",
        unlockConditions: {
            nodeId: "darkblade_56_2"
        },
        count: 1
    },
    {
        cardId: "mechanical_defense",
        unlockConditions: {
            nodeId: "darkblade_56_2"
        },
        count: 1
    },
    {
        cardId: "worn_gear",
        unlockConditions: {
            nodeId: "darkblade_56_2"
        },
        count: 1
    },
    {
        cardId: "mechanical_sentry",
        unlockConditions: {
            nodeId: "darkblade_56_2"
        },
        count: 1
    },
    {
        cardId: "mechanical_factory",
        unlockConditions: {
            nodeId: "darkblade_56_2"
        },
        count: 1
    },
    {
        cardId: "mechanical_bomb",
        unlockConditions: {
            nodeId: "darkblade_56_2"
        },
        count: 1
    },
    {
        cardId: "brand_new_gear",
        unlockConditions: {
            nodeId: "darkblade_56_2"
        },
        count: 1
    },
    {
        cardId: "unexpired_oil",
        unlockConditions: {
            nodeId: "darkblade_56_2"
        },
        count: 1
    },
    {
        cardId: "mechanical_guard",
        unlockConditions: {
            nodeId: "darkblade_56_2"
        },
        count: 1
    },
    {
        cardId: "mechanical_crushed_stone",
        unlockConditions: {
            nodeId: "darkblade_56_2"
        },
        count: 1
    },
    {
        cardId: "mechanical_meteorite",
        unlockConditions: {
            nodeId: "darkblade_56_2"
        },
        count: 1
    },

    // 死神系列卡牌
    {
        cardId: "reapers_whisper",
        unlockConditions: {
            nodeId: "mountain_1"
        },
        count: 1
    },
    {
        cardId: "reapers_groan",
        unlockConditions: {
            nodeId: "mountain_131_2_2"
        },
        count: 1
    },

    // 鬼怪系列卡牌
    {
        cardId: "mountain_ghoul",
        unlockConditions: {
            nodeId: "mountain_150_2_2_2_2"
        },
        count: 1
    },
    {
        cardId: "forest_ghoul",
        unlockConditions: {
            nodeId: "mountain_150_2_2_2_2"
        },
        count: 1
    },
    {
        cardId: "drowned_ghoul",
        unlockConditions: {
            nodeId: "mountain_150_2_2_2_2"
        },
        count: 1
    },
    {
        cardId: "hungry_ghoul",
        unlockConditions: {
            nodeId: "mountain_150_2_2_2_2"
        },
        count: 1
    },
    {
        cardId: "lonely_ghoul",
        unlockConditions: {
            nodeId: "mountain_150_2_2_2_2"
        },
        count: 1
    },
    {
        cardId: "stingy_ghoul",
        unlockConditions: {
            nodeId: "mountain_150_2_2_2_2"
        },
        count: 1
    },
    {
        cardId: "ghostly_figures",
        unlockConditions: {
            nodeId: "mountain_150_2_2_2_2"
        },
        count: 1
    },
    {
        cardId: "yin_spirit",
        unlockConditions: {
            nodeId: "mountain_150_2_2_2_2"
        },
        count: 1
    },
    {
        cardId: "yang_spirit",
        unlockConditions: {
            nodeId: "mountain_150_2_2_2_2"
        },
        count: 1
    },
    {
        cardId: "curse",
        unlockConditions: {
            nodeId: "mountain_150_2_2_2_2"
        },
        count: 1
    },
    {
        cardId: "devour",
        unlockConditions: {
            nodeId: "mountain_150_2_2_2_2"
        },
        count: 1
    },
    {
        cardId: "will_o_wisp",
        unlockConditions: {
            nodeId: "mountain_150_2_2_2_2"
        },
        count: 1
    },

    // 破碎蚀心系列卡牌
    {
        cardId: "shattered_erosive_blade",
        unlockConditions: {
            nodeId: "mountain_242_2_3_2_2"
        },
        count: 1
    },

    // 影子卡牌
    {
        cardId: "shadow_card",
        unlockConditions: {
            nodeId: "node1"
        },
        count: 1
    },

    // 合身长袍系列卡牌
    {
        cardId: "well_fitting_robe",
        unlockConditions: {
            nodeId: "altar_42"
        },
        count: 1
    },
    {
        cardId: "brand_new_page",
        unlockConditions: {
            nodeId: "altar_42"
        },
        count: 1
    },
    {
        cardId: "normal_candlelight",
        unlockConditions: {
            nodeId: "altar_42"
        },
        count: 1
    },
    {
        cardId: "interesting_staff",
        unlockConditions: {
            nodeId: "altar_42"
        },
        count: 1
    },
    {
        cardId: "wonderful_potion",
        unlockConditions: {
            nodeId: "altar_42"
        },
        count: 1
    },
    {
        cardId: "intelligence_reducing_hat",
        unlockConditions: {
            nodeId: "altar_42"
        },
        count: 1
    },
    {
        cardId: "lovable_clock",
        unlockConditions: {
            nodeId: "altar_42"
        },
        count: 1
    }
   
];

/**
 * 获取当前游戏进度信息
 * 
 * 这个函数从localStorage中读取当前游戏的进度信息，包括：
 * - 当前场景ID：玩家所在的游戏场景
 * - 当前节点索引：玩家在场景中的进度位置
 * - 当前存档ID：玩家使用的存档标识
 * - 当前节点ID：玩家当前所在节点的ID
 * 
 * @returns {Object} 包含当前游戏进度信息的对象
 * @returns {string} returns.currentSceneId - 当前场景ID
 * @returns {number} returns.currentNodeIndex - 当前节点索引
 * @returns {string} returns.currentArchiveId - 当前存档ID
 * @returns {string | null} returns.currentNodeId - 当前节点ID
 */
export function getCurrentGameProgress(): {
    currentSceneId: string;
    currentNodeIndex: number;
    currentArchiveId: string;
    currentNodeId: string | null;
} {
    // 从localStorage获取当前场景ID，默认为游戏开始场景
    const currentSceneId = localStorage.getItem('currentSceneId') || 'chapter_0_scene_0';
    
    // 从localStorage获取当前节点索引，默认为0（游戏开始）
    const currentNodeIndex = parseInt(localStorage.getItem('nowclick') || '0');
    
    // 从localStorage获取当前存档ID，默认为'default'
    const currentArchiveId = localStorage.getItem('currentArchiveId') || 'default';
    
    // 获取当前节点ID（使用同步方法）
    const currentNodeId = getCurrentNodeIdSync(currentSceneId, currentNodeIndex);
    
    return {
        currentSceneId,
        currentNodeIndex,
        currentArchiveId,
        currentNodeId
    };
}

/**
 * 获取指定场景和节点索引对应的节点ID
 * 
 * @param {string} sceneId - 场景ID
 * @param {number} nodeIndex - 节点索引
 * @returns {string | null} 节点ID，如果找不到则返回null
 */
async function getCurrentNodeId(sceneId: string, nodeIndex: number): Promise<string | null> {
    try {
        // 动态导入场景数据
        const { SceneRegistry } = await import('../story/SceneRegistry');
        const sceneLoader = SceneRegistry[sceneId];
        
        if (!sceneLoader) {
            console.warn(`[CardUnlockConfig] 场景 ${sceneId} 未在注册表中找到`);
            return null;
        }
        
        const sceneModule = await sceneLoader();
        const scene = sceneModule.default;
        
        if (!scene || !scene.nodes || !Array.isArray(scene.nodes)) {
            console.warn(`[CardUnlockConfig] 场景 ${sceneId} 数据格式错误`);
            return null;
        }
        
        const node = scene.nodes[nodeIndex];
        return node ? node.id : null;
        
    } catch (error) {
        console.error(`[CardUnlockConfig] 获取节点ID时出错:`, error);
        return null;
    }
}

/**
 * 同步获取当前节点ID（用于兼容性）
 * 
 * @param {string} sceneId - 场景ID
 * @param {number} nodeIndex - 节点索引
 * @returns {string | null} 节点ID，如果找不到则返回null
 */
function getCurrentNodeIdSync(sceneId: string, nodeIndex: number): string | null {
    // 由于动态导入是异步的，这里提供一个同步的备用方案
    // 通过localStorage存储的额外信息来获取节点ID
    const nodeIdKey = `currentNodeId_${sceneId}_${nodeIndex}`;
    return localStorage.getItem(nodeIdKey);
}

/**
 * 检查玩家是否已经经过指定的节点
 * 
 * @param {string} sceneId - 当前场景ID
 * @param {string} targetNodeId - 目标节点ID
 * @param {number} currentNodeIndex - 当前节点索引
 * @returns {boolean} 如果已经经过目标节点返回true，否则返回false
 */
function hasPassedNode(sceneId: string, targetNodeId: string, currentNodeIndex: number): boolean {
    try {
        // 优先检查全局已访问集合（跨场景持久）
        const visitedAll = JSON.parse(localStorage.getItem('visitedNodes_all') || '[]');
        if (Array.isArray(visitedAll) && visitedAll.includes(targetNodeId)) {
            return true;
        }

        // 其次检查当前场景内的已访问集合
        const visitedNodesKey = `visitedNodes_${sceneId}`;
        const visitedNodes = JSON.parse(localStorage.getItem(visitedNodesKey) || '[]');
        if (visitedNodes.includes(targetNodeId)) {
            return true;
        }

        // 备用：若有索引映射，则用索引粗略判断（仅限当前场景）
        const targetNodeIndex = getNodeIndexByNodeId(sceneId, targetNodeId);
        if (targetNodeIndex !== -1 && currentNodeIndex >= targetNodeIndex) {
            return true;
        }

        return false;
        
    } catch (error) {
        console.error(`[CardUnlockConfig] 检查节点访问状态时出错:`, error);
        return false;
    }
}

/**
 * 根据节点ID获取节点索引
 * 
 * @param {string} sceneId - 场景ID
 * @param {string} nodeId - 节点ID
 * @returns {number} 节点索引，如果找不到返回-1
 */
function getNodeIndexByNodeId(sceneId: string, nodeId: string): number {
    try {
        // 从localStorage中获取节点索引映射
        const nodeIndexMapKey = `nodeIndexMap_${sceneId}`;
        const nodeIndexMap = JSON.parse(localStorage.getItem(nodeIndexMapKey) || '{}');
        
        return nodeIndexMap[nodeId] || -1;
        
    } catch (error) {
        console.error(`[CardUnlockConfig] 获取节点索引时出错:`, error);
        return -1;
    }
}

/**
 * 初始化场景的节点索引映射
 * 这个函数应该在场景加载时调用，用于建立节点ID到索引的映射关系
 * 
 * @param {string} sceneId - 场景ID
 * @param {Array} nodes - 场景节点数组
 */
export function initializeNodeIndexMap(sceneId: string, nodes: any[]): void {
    try {
        const nodeIndexMap: { [nodeId: string]: number } = {};
        
        // 建立节点ID到索引的映射
        nodes.forEach((node, index) => {
            if (node && node.id) {
                nodeIndexMap[node.id] = index;
            }
        });
        
        // 保存到localStorage
        const nodeIndexMapKey = `nodeIndexMap_${sceneId}`;
        localStorage.setItem(nodeIndexMapKey, JSON.stringify(nodeIndexMap));
        
        console.log(`[CardUnlockConfig] 已初始化场景 ${sceneId} 的节点索引映射:`, nodeIndexMap);
        
    } catch (error) {
        console.error(`[CardUnlockConfig] 初始化节点索引映射时出错:`, error);
    }
}

/**
 * 记录玩家访问过的节点
 * 这个函数应该在玩家到达新节点时调用
 * 
 * @param {string} sceneId - 场景ID
 * @param {string} nodeId - 节点ID
 */
export function recordVisitedNode(sceneId: string, nodeId: string): void {
    try {
        const visitedNodesKey = `visitedNodes_${sceneId}`;
        const visitedNodes = JSON.parse(localStorage.getItem(visitedNodesKey) || '[]');
        
        // 如果节点还没有被记录，则添加到列表中
        if (!visitedNodes.includes(nodeId)) {
            visitedNodes.push(nodeId);
            localStorage.setItem(visitedNodesKey, JSON.stringify(visitedNodes));
            console.log(`[CardUnlockConfig] 已记录访问节点: ${sceneId} - ${nodeId}`);
        }
        // 同步全局集合，支持跨场景识别
        const allKey = 'visitedNodes_all';
        const visitedAll = JSON.parse(localStorage.getItem(allKey) || '[]');
        if (!visitedAll.includes(nodeId)) {
            visitedAll.push(nodeId);
            localStorage.setItem(allKey, JSON.stringify(visitedAll));
        }
        
    } catch (error) {
        console.error(`[CardUnlockConfig] 记录访问节点时出错:`, error);
    }
}

/**
 * 检查是否满足卡片解锁条件
 * 
 * 这个函数是解锁系统的核心逻辑，它检查给定的卡片解锁规则是否满足当前游戏进度。
 * 函数会逐一检查所有解锁条件，只有全部条件都满足时才会返回true。
 * 
 * 检查的条件包括：
 * 1. 场景ID匹配：玩家必须在指定的场景中
 * 2. 节点索引：玩家必须达到或超过指定的节点进度
 * 3. 节点ID：玩家必须到达指定的具体节点
 * 4. 前置卡片：玩家必须先拥有指定的卡片（预留功能）
 * 5. 好感度：与特定角色的好感度要求（预留功能）
 * 
 * @param {CardUnlockRule} rule - 要检查的卡片解锁规则
 * @returns {boolean} 如果满足所有解锁条件返回true，否则返回false
 */
export function checkCardUnlockCondition(rule: CardUnlockRule): boolean {
    // 获取当前游戏进度信息
    const progress = getCurrentGameProgress();
    const conditions = rule.unlockConditions;
    
    // 安全检查：如果没有解锁条件，默认不解锁
    // 这确保了只有明确配置的卡片才会被解锁
    if (!conditions || Object.keys(conditions).length === 0) {
        return false;
    }
    
    // 条件1：检查场景ID - 必须完全匹配
    // 如果规则指定了场景ID，玩家必须在那个场景中
    if (conditions.sceneId && progress.currentSceneId !== conditions.sceneId) {
        return false;
    }
    
    // 条件2：检查最小节点索引 - 必须达到或超过
    // 如果规则指定了最小节点索引，玩家必须达到或超过那个进度
    if (conditions.minNodeIndex !== undefined && progress.currentNodeIndex < conditions.minNodeIndex) {
        return false;
    }
    
    // 条件3：检查节点ID（如果指定了具体的节点ID）
    // 如果规则指定了具体的节点ID，玩家必须到达那个节点
    if (conditions.nodeId) {
        // 检查玩家是否已经经过指定的节点
        if (!hasPassedNode(progress.currentSceneId, conditions.nodeId, progress.currentNodeIndex)) {
            return false;
        }
    }
    
    // 条件4：检查前置卡片（预留功能）
    // 这里可以添加检查前置卡片的逻辑，确保玩家先拥有必要的卡片
    if (conditions.requiredCards) {
        // TODO: 实现前置卡片检查逻辑
        // 例如：检查ArchiveManager中是否拥有所有requiredCards
    }
    
    // 条件5：检查好感度（预留功能）
    // 这里可以添加检查好感度的逻辑，确保与特定角色的关系达到要求
    if (conditions.affection) {
        // TODO: 实现好感度检查逻辑
        // 例如：检查与各个角色的好感度是否达到要求
    }
    
    // 如果所有条件都满足，返回true
    return true;
}

/**
 * 获取所有应该解锁的卡片
 * 
 * 这个函数是解锁系统的主要入口点，它遍历所有卡片解锁规则，
 * 检查每个规则的条件是否满足，并返回当前应该解锁的卡片列表。
 * 
 * 函数的工作流程：
 * 1. 遍历CARD_UNLOCK_RULES数组中的所有规则
 * 2. 对每个规则调用checkCardUnlockCondition检查是否满足条件
 * 3. 如果满足条件，将卡片添加到解锁列表中
 * 4. 处理卡片替换机制：如果规则指定了replace，先移除被替换的卡片
 * 5. 返回最终的解锁卡片列表
 * 
 * 这个函数被card_library.ts调用，用于确定应该显示哪些卡片。
 * 
 * @returns {Object} 解锁的卡片对象，键为卡片ID，值为卡片数量
 * @example
 * // 返回示例：
 * {
 *   "punch": 3,
 *   "dodge": 3,
 *   "parry": 3,
 *   "hook": 3,
 *   "combo": 3,
 *   "enlightenment": 1
 * }
 */
export function getUnlockedCards(): { [cardId: string]: number } {
    const archiveId = localStorage.getItem('currentArchiveId') || 'default';
    const key = `unlockedCards_${archiveId}`;
    const persisted = JSON.parse(localStorage.getItem(key) || '{}');

    // 评估当前进度可能新增的卡
    const merged: { [cardId: string]: number } = { ...persisted };
    for (const rule of CARD_UNLOCK_RULES) {
        if (checkCardUnlockCondition(rule)) {
            if (rule.replace && rule.replaceCardId) {
                delete merged[rule.replaceCardId];
            }
            merged[rule.cardId] = rule.count;
        }
    }

    try {
        localStorage.setItem(key, JSON.stringify(merged));
    } catch (e) {
        console.error('[CardUnlockConfig] 持久化unlockedCards失败:', e);
    }

    return merged;
}

/**
 * 主动评估并将满足条件的卡牌写入持久化集合（按当前存档隔离）。
 */
export function evaluateAndPersistUnlocks(): void {
    const archiveId = localStorage.getItem('currentArchiveId') || 'default';
    const key = `unlockedCards_${archiveId}`;
    const base = JSON.parse(localStorage.getItem(key) || '{}');
    const unlocked: { [cardId: string]: number } = { ...base };

    for (const rule of CARD_UNLOCK_RULES) {
        if (checkCardUnlockCondition(rule)) {
            if (rule.replace && rule.replaceCardId) {
                delete unlocked[rule.replaceCardId];
            }
            unlocked[rule.cardId] = rule.count;
        }
    }
    try {
        localStorage.setItem(key, JSON.stringify(unlocked));
    } catch (e) {
        console.error('[CardUnlockConfig] evaluateAndPersistUnlocks写入失败:', e);
    }
}
