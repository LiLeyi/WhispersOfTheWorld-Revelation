import os
import re
from typing import Dict, Any, List, Optional
from dataclasses import dataclass, asdict
from typing import Union

@dataclass
class SceneElement:
    background: Optional[str] = None
    music: Optional[str] = None
    bgm: Optional[str] = None
    name: Optional[str] = None
    text: str = ""
    sprite: Optional[Dict[str, Optional[str]]] = None

@dataclass
class Choice:
    text: str
    next: str
    condition: Optional[str] = None
    action: Optional[str] = None

@dataclass
class SceneNode:
    id: str
    elements: SceneElement
    choices: Optional[List[Choice]] = None
    next: Optional[str] = None
    autoNext: bool = False
    condition: Optional[str] = None
    actionCondition: Optional[str] = None
    action: Optional[str] = None

@dataclass
class Scene:
    id: str
    title: str
    nodes: List[SceneNode]

class StoryParser:
    def __init__(self, story_path: str = "../src/story"):
        self.story_path = story_path
        self.scenes: Dict[str, Scene] = {}
        
    def parse_all_scenes(self) -> Dict[str, Scene]:
        """解析所有剧情场景"""
        self.scenes = {}
        
        # 遍历所有章节文件夹
        for root, dirs, files in os.walk(self.story_path):
            for file in files:
                if file.endswith('_data.ts'):
                    file_path = os.path.join(root, file)
                    scene = self.parse_scene_file(file_path)
                    if scene:
                        self.scenes[scene.id] = scene
                        
        return self.scenes
    
    def parse_scene_file(self, file_path: str) -> Optional[Scene]:
        """解析单个场景文件"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # 提取场景ID
            scene_id_match = re.search(r'id:\s*["\']([^"\']+)["\']', content)
            scene_id = scene_id_match.group(1) if scene_id_match else "unknown"
            
            # 提取场景标题
            title_match = re.search(r'title:\s*["\']([^"\']+)["\']', content)
            title = title_match.group(1) if title_match else "Unknown Title"
            
            # 提取节点
            nodes = self._parse_nodes(content)
            
            # 为没有显式连接的连续节点添加隐式连接
            nodes = self._add_implicit_connections(nodes)
            
            return Scene(id=scene_id, title=title, nodes=nodes)
        except Exception as e:
            print(f"解析文件 {file_path} 时出错: {e}")
            return None
    
    def _add_implicit_connections(self, nodes: List[SceneNode]) -> List[SceneNode]:
        """为连续的节点添加隐式连接"""
        if not nodes:
            return nodes
            
        # 创建节点ID到索引的映射
        node_map = {node.id: i for i, node in enumerate(nodes)}
        
        # 为没有显式next和choices的连续节点添加隐式连接
        # 我们假设节点在数组中的顺序就是剧情顺序
        for i in range(len(nodes) - 1):
            current_node = nodes[i]
            next_node = nodes[i + 1]
            
            # 只有在当前节点没有显式next和choices时才添加隐式连接
            if not current_node.next and not current_node.choices:
                # 检查下一个节点是否在同一场景中（通过node_map验证）
                if next_node.id in node_map:
                    current_node.next = next_node.id
        
        return nodes
    
    def _parse_nodes(self, content: str) -> List[SceneNode]:
        """解析节点信息"""
        nodes = []
        
        # 首先提取nodes数组的内容
        nodes_array_match = re.search(r'nodes:\s*\[(.*)\]', content, re.DOTALL)
        if not nodes_array_match:
            return nodes
            
        nodes_content = nodes_array_match.group(1)
        
        # 使用平衡大括号的方法来准确提取每个节点
        brace_count = 0
        node_start = -1
        in_string = False
        escape_next = False
        nodes_list = []
        
        # 遍历nodes数组内容，提取每个节点对象
        for i, char in enumerate(nodes_content):
            if escape_next:
                escape_next = False
                continue
                
            if char == '\\':
                escape_next = True
                continue
                
            if char == '"' or char == "'":
                in_string = not in_string
                continue
                
            if in_string:
                continue
                
            if char == '{':
                if brace_count == 0:
                    node_start = i
                brace_count += 1
            elif char == '}':
                brace_count -= 1
                if brace_count == 0 and node_start != -1:
                    node_str = nodes_content[node_start:i+1]
                    nodes_list.append(node_str)
                    node_start = -1
        
        # 解析每个节点字符串
        for node_str in nodes_list:
            # 提取节点ID
            id_match = re.search(r'id:\s*["\']([^"\']+)["\']', node_str)
            if not id_match:
                continue
            node_id = id_match.group(1)
            
            # 提取elements部分
            elements_match = re.search(r'elements:\s*(\{[^}]+\})', node_str, re.DOTALL)
            elements_content = elements_match.group(1) if elements_match else "{}"
            elements = self._parse_elements(elements_content)
            
            # 提取choices部分（如果存在）
            choices_match = re.search(r'choices:\s*(\[[^\]]*\])', node_str, re.DOTALL)
            choices_content = choices_match.group(1) if choices_match else ""
            choices = self._parse_choices(choices_content) if choices_content else None
            
            # 提取next属性（如果存在）
            next_match = re.search(r'next:\s*["\']([^"\']+)["\']', node_str)
            next_value = next_match.group(1) if next_match else None
            
            node = SceneNode(
                id=node_id,
                elements=elements,
                choices=choices,
                next=next_value
            )
            nodes.append(node)
            
        return nodes
    
    def _parse_elements(self, content: str) -> SceneElement:
        """解析场景元素"""
        # 提取各个字段
        background_match = re.search(r'background:\s*["\']([^"\']*)["\']', content)
        name_match = re.search(r'name:\s*["\']([^"\']*)["\']', content)
        text_match = re.search(r'text:\s*["\']([^"\']*)["\']', content)
        
        # 解析sprite
        sprite = None
        sprite_match = re.search(r'sprite:\s*\{([^}]+)\}', content, re.DOTALL)
        if sprite_match:
            sprite_content = sprite_match.group(1)
            sprite = {}
            left_match = re.search(r'left:\s*["\']([^"\']*)["\']', sprite_content)
            right_match = re.search(r'right:\s*["\']([^"\']*)["\']', sprite_content)
            center_match = re.search(r'center:\s*["\']([^"\']*)["\']', sprite_content)
            
            sprite['left'] = left_match.group(1) if left_match else None
            sprite['right'] = right_match.group(1) if right_match else None
            sprite['center'] = center_match.group(1) if center_match else None
        
        return SceneElement(
            background=background_match.group(1) if background_match else None,
            name=name_match.group(1) if name_match else None,
            text=text_match.group(1) if text_match else "",
            sprite=sprite
        )
    
    def _parse_choices(self, content: str) -> List[Choice]:
        """解析选项"""
        choices = []
        
        # 提取每个选项块
        choice_blocks = re.findall(r'\{([^}]+)\}', content, re.DOTALL)
        
        for choice_block in choice_blocks:
            text_match = re.search(r'text:\s*["\']([^"\']*)["\']', choice_block)
            next_match = re.search(r'next:\s*["\']([^"\']*)["\']', choice_block)
            
            if text_match and next_match:
                choice = Choice(
                    text=text_match.group(1),
                    next=next_match.group(1)
                )
                choices.append(choice)
                
        return choices

    def get_scene_graph(self) -> Dict[str, List[str]]:
        """获取场景关系图"""
        graph = {}
        
        for scene_id, scene in self.scenes.items():
            graph[scene_id] = []
            for node in scene.nodes:
                if node.choices:
                    for choice in node.choices:
                        if choice.next and choice.next not in graph[scene_id]:
                            graph[scene_id].append(choice.next)
                elif node.next and node.next not in graph[scene_id]:
                    graph[scene_id].append(node.next)
                    
        return graph