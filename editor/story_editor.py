import os
import re
from typing import Dict, Any, List, Optional
from story_parser import StoryParser, Scene, SceneNode, Choice, SceneElement

class StoryEditor:
    def __init__(self, story_path: str = "../src/story"):
        self.story_path = story_path
        self.parser = StoryParser(story_path)
        self.scenes: Dict[str, Scene] = {}
        
    def load_scenes(self) -> Dict[str, Scene]:
        """加载所有场景"""
        self.scenes = self.parser.parse_all_scenes()
        return self.scenes
    
    def save_scene(self, scene: Scene) -> bool:
        """保存场景到文件"""
        try:
            # 查找对应的文件
            file_path = self._find_scene_file(scene.id)
            if not file_path:
                print(f"未找到场景 {scene.id} 对应的文件")
                return False
                
            # 读取原文件内容
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 更新场景标题
            content = re.sub(r'(title:\s*["\'])[^"\']*["\']', f'\\1{scene.title}"', content)
            
            # 更新节点信息（简化处理，实际应用中需要更复杂的逻辑）
            # 这里只是示例，实际实现需要更详细的处理
            
            # 写入更新后的内容
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
                
            return True
        except Exception as e:
            print(f"保存场景 {scene.id} 时出错: {e}")
            return False
    
    def _find_scene_file(self, scene_id: str) -> Optional[str]:
        """查找场景文件路径"""
        for root, dirs, files in os.walk(self.story_path):
            for file in files:
                if file.endswith('_data.ts'):
                    file_path = os.path.join(root, file)
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        if f'id: "{scene_id}"' in content or f"id: '{scene_id}'" in content:
                            return file_path
        return None
    
    def update_node(self, scene_id: str, node_id: str, updated_node: SceneNode) -> bool:
        """更新节点信息"""
        if scene_id not in self.scenes:
            return False
            
        scene = self.scenes[scene_id]
        for i, node in enumerate(scene.nodes):
            if node.id == node_id:
                scene.nodes[i] = updated_node
                return True
        return False
    
    def add_node(self, scene_id: str, new_node: SceneNode) -> bool:
        """添加新节点"""
        if scene_id not in self.scenes:
            return False
            
        scene = self.scenes[scene_id]
        scene.nodes.append(new_node)
        return True
    
    def delete_node(self, scene_id: str, node_id: str) -> bool:
        """删除节点"""
        if scene_id not in self.scenes:
            return False
            
        scene = self.scenes[scene_id]
        scene.nodes = [node for node in scene.nodes if node.id != node_id]
        return True