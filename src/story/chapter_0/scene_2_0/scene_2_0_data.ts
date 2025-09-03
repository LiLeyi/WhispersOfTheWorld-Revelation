import { Scene } from '../../../types/SceneTypes';
import { ArchiveManager } from '../../../components/ArchiveManager';
import { CardManager } from '../../../components/mini_games/card_game';
// 定义第2幕场景
const scene: Scene = {
id: "chapter_0_scene_2_0",
    title: "第1幕:斑牛镇",
nodes: [
        {
            id: "intro_black_screen_2",
            elements: {
                background: "sc0.1/待定.png",
                name: "旁白",
                text: "妈妈今天死了，但也有可能是在昨天。直到现在，我都无法确定。养老院只是发来了一封无比简洁的电报：“令堂身故，明日下葬，节哀。这反而让妈妈去世的日期变得更加扑朔迷离。我想，昨天的可能性也许更大。要请假两天了。"
            },
        },







]
}
export default scene;