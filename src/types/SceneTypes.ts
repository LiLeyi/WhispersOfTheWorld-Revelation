// 场景元素接口
export interface SceneElement {
    background?: string | null;
    music?: string | null;
    bgm?: string | null;
    name?: string | null;
    text: string;
    sprite?: {
        left?: string | null;
        right?: string | null;
        center?: string | null;
    } | null;
}

// 选项接口
export interface Choice {
    text: string;
    next: string | SceneNode;
    condition?: () => boolean;
    action?: () => void;
}

// 场景节点接口
export interface SceneNode {
    id: string;
    elements: SceneElement;
    choices?: Choice[];
    next?: string | SceneNode;
    autoNext?: boolean;
    condition?: () => boolean;
    actionCondition?: () => boolean;
    action?: () => void;
}

// 场景接口
export interface Scene {
    id: string;
    title: string;
    nodes: SceneNode[];
}