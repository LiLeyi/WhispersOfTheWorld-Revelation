from lark import Lark, Transformer, v_args
from story_parser import Scene, SceneNode, Choice, SceneElement
from typing import List, Dict, Any, Optional
import json

# Lark 语法定义
story_grammar = r"""
    ?start: scene

    scene: "const" "scene" ":" "Scene" "=" "{" scene_props "}" ";"? "export" "default" "scene" ";"?

    scene_props: scene_prop (","? scene_prop)* ","?

    scene_prop: "id" ":" STRING        -> scene_id
              | "title" ":" STRING     -> scene_title
              | "nodes" ":" "[" nodes "]" -> scene_nodes

    nodes: node (","? node)* ","?

    node: "{" node_props "}"

    node_props: node_prop (","? node_prop)* ","?

    node_prop: "id" ":" STRING                    -> node_id
             | "elements" ":" element              -> node_elements
             | "choices" ":" "[" choices "]"       -> node_choices
             | "next" ":" STRING                   -> node_next
             | "autoNext" ":" BOOLEAN              -> node_auto_next
             | "condition" ":" STRING              -> node_condition
             | "actionCondition" ":" STRING        -> node_action_condition
             | "action" ":" STRING                 -> node_action

    element: "{" element_props "}"

    element_props: element_prop (","? element_prop)* ","?

    element_prop: "background" ":" STRING          -> element_background
                | "music" ":" STRING               -> element_music
                | "bgm" ":" STRING                 -> element_bgm
                | "name" ":" STRING                -> element_name
                | "text" ":" STRING                -> element_text
                | "sprite" ":" sprite              -> element_sprite

    sprite: "{" sprite_props "}"

    sprite_props: sprite_prop (","? sprite_prop)* ","?

    sprite_prop: "left" ":" STRING                 -> sprite_left
               | "right" ":" STRING                -> sprite_right
               | "center" ":" STRING               -> sprite_center

    choices: choice (","? choice)* ","?

    choice: "{" choice_props "}"

    choice_props: choice_prop (","? choice_prop)* ","?

    choice_prop: "text" ":" STRING                 -> choice_text
               | "next" ":" STRING                 -> choice_next
               | "condition" ":" STRING            -> choice_condition
               | "action" ":" STRING               -> choice_action

    STRING: /"(?:[^"\\]|\\.)*"/
          | /'(?:[^'\\]|\\.)*'/

    BOOLEAN: "true" | "false"

    COMMENT: /\/\/.*\n/
           | /\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\//

    %import common.WS
    %ignore WS
    %ignore COMMENT
"""

class StoryTransformer(Transformer):
    def __init__(self):
        super().__init__()
        self.current_scene = {}
        self.current_node = {}
        self.current_element = {}
        self.current_choice = {}
        self.current_sprite = {}

    def scene(self, items):
        return Scene(
            id=self.current_scene.get('id', ''),
            title=self.current_scene.get('title', ''),
            nodes=self.current_scene.get('nodes', [])
        )

    def scene_id(self, items):
        self.current_scene['id'] = items[0][1:-1]  # 去掉引号
        return 'id', self.current_scene['id']

    def scene_title(self, items):
        self.current_scene['title'] = items[0][1:-1]  # 去掉引号
        return 'title', self.current_scene['title']

    def scene_nodes(self, items):
        nodes = list(items)
        self.current_scene['nodes'] = nodes
        return 'nodes', nodes

    def node(self, items):
        node_dict = {}
        for item in items:
            if item and len(item) == 2:
                node_dict[item[0]] = item[1]
        
        choices = node_dict.get('choices', [])
        if not isinstance(choices, list):
            choices = [choices] if choices else []
            
        return SceneNode(
            id=node_dict.get('id', ''),
            elements=node_dict.get('elements', SceneElement()),
            choices=choices if choices else None,
            next=node_dict.get('next'),
            autoNext=node_dict.get('autoNext', False),
            condition=node_dict.get('condition'),
            actionCondition=node_dict.get('actionCondition'),
            action=node_dict.get('action')
        )

    def node_id(self, items):
        return 'id', items[0][1:-1]  # 去掉引号

    def node_elements(self, items):
        return 'elements', items[0]

    def node_choices(self, items):
        choices = list(items)
        return 'choices', choices

    def node_next(self, items):
        return 'next', items[0][1:-1]  # 去掉引号

    def node_auto_next(self, items):
        return 'autoNext', items[0] == 'true'

    def node_condition(self, items):
        return 'condition', items[0][1:-1]  # 去掉引号

    def node_action_condition(self, items):
        return 'actionCondition', items[0][1:-1]  # 去掉引号

    def node_action(self, items):
        return 'action', items[0][1:-1]  # 去掉引号

    def element(self, items):
        element_dict = {}
        for item in items:
            if item and len(item) == 2:
                element_dict[item[0]] = item[1]
                
        return SceneElement(
            background=element_dict.get('background'),
            music=element_dict.get('music'),
            bgm=element_dict.get('bgm'),
            name=element_dict.get('name'),
            text=element_dict.get('text', ''),
            sprite=element_dict.get('sprite')
        )

    def element_background(self, items):
        return 'background', items[0][1:-1]  # 去掉引号

    def element_music(self, items):
        return 'music', items[0][1:-1]  # 去掉引号

    def element_bgm(self, items):
        return 'bgm', items[0][1:-1]  # 去掉引号

    def element_name(self, items):
        return 'name', items[0][1:-1]  # 去掉引号

    def element_text(self, items):
        return 'text', items[0][1:-1]  # 去掉引号

    def element_sprite(self, items):
        return 'sprite', items[0]

    def sprite(self, items):
        sprite_dict = {}
        for item in items:
            if item and len(item) == 2:
                sprite_dict[item[0]] = item[1]
        return sprite_dict

    def sprite_left(self, items):
        return 'left', items[0][1:-1] if items[0] != 'null' else None

    def sprite_right(self, items):
        return 'right', items[0][1:-1] if items[0] != 'null' else None

    def sprite_center(self, items):
        return 'center', items[0][1:-1] if items[0] != 'null' else None

    def choice(self, items):
        choice_dict = {}
        for item in items:
            if item and len(item) == 2:
                choice_dict[item[0]] = item[1]
                
        return Choice(
            text=choice_dict.get('text', ''),
            next=choice_dict.get('next', ''),
            condition=choice_dict.get('condition'),
            action=choice_dict.get('action')
        )

    def choice_text(self, items):
        return 'text', items[0][1:-1]  # 去掉引号

    def choice_next(self, items):
        return 'next', items[0][1:-1]  # 去掉引号

    def choice_condition(self, items):
        return 'condition', items[0][1:-1]  # 去掉引号

    def choice_action(self, items):
        return 'action', items[0][1:-1]  # 去掉引号

    def STRING(self, items):
        return items

    def BOOLEAN(self, items):
        return items

# 创建解析器
story_parser = Lark(story_grammar, parser='lalr', transformer=StoryTransformer())

def parse_scene_file(content: str) -> Optional[Scene]:
    """使用 Lark 解析器解析场景文件"""
    try:
        # 预处理内容，处理函数和特殊语法
        processed_content = preprocess_content(content)
        tree = story_parser.parse(processed_content)
        return tree
    except Exception as e:
        print(f"解析出错: {e}")
        return None

def preprocess_content(content: str) -> str:
    """
    预处理内容，处理注释中的 next 属性和其他特殊情况
    """
    # 移除行注释中的 next 属性（避免被错误解析）
    import re
    
    # 处理行注释
    lines = content.split('\n')
    processed_lines = []
    
    for line in lines:
        # 如果是注释行，检查是否包含 next 属性
        if line.strip().startswith('//'):
            # 检查是否包含 next 属性
            if 'next:' in line:
                # 将注释中的 next 属性替换为特殊标记
                line = line.replace('next:', '_commented_next_:')
        processed_lines.append(line)
    
    return '\n'.join(processed_lines)