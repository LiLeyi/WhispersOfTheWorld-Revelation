import wx
import math
import time
from typing import Dict, List, Optional, Set, Tuple
from story_parser import Scene, SceneNode, Choice, SceneElement

# 导入新模块
from .layout import LayoutManager, LayoutConfig
from .renderer import GraphRenderer
from .utils import convert_positions_to_coordinates
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/..")
from node_editor import NodeEditorDialog

class NodeGraphVisualizer(wx.Panel):
    def __init__(self, parent):
        super().__init__(parent)
        self.nodes = {}  # 存储节点信息
        self.connections = []  # 存储连接信息
        self.selected_node = None
        self.scale = 1.0
        self.offset_x = 0
        self.offset_y = 0
        self.dragging_canvas = False  # 拖动画布标志
        self.dragging_node = False    # 拖动节点标志
        self.last_x = 0
        self.last_y = 0
        self.node_positions = {}      # 存储节点位置
        self.node_size = (120, 60)
        self.dragged_node_id = None   # 正在被拖动的节点ID
        self.original_node_pos = None # 节点原始位置
        self.story_editor = None      # 故事编辑器实例
        
        # 节点显示选项（支持多选）
        self.node_display_options = ["id"]  # 默认只显示节点ID
        
        # 添加双缓冲样式以减少闪烁
        self.SetBackgroundStyle(wx.BG_STYLE_PAINT)
        self.SetDoubleBuffered(True)
        
        # 初始化布局和渲染管理器
        self.layout_manager = LayoutManager()
        self.renderer = GraphRenderer(self)
        
        # 用于优化重绘的变量
        self.need_refresh = False
        
        self.Bind(wx.EVT_PAINT, self.on_paint)
        self.Bind(wx.EVT_SIZE, self.on_size)
        self.Bind(wx.EVT_LEFT_DOWN, self.on_left_down)
        self.Bind(wx.EVT_LEFT_UP, self.on_left_up)
        self.Bind(wx.EVT_MOTION, self.on_motion)
        self.Bind(wx.EVT_MOUSEWHEEL, self.on_wheel)
        # 绑定双击事件
        self.Bind(wx.EVT_LEFT_DCLICK, self.on_left_dclick)
        # 绑定右键事件用于拖动节点
        self.Bind(wx.EVT_RIGHT_DOWN, self.on_right_down)
        self.Bind(wx.EVT_RIGHT_UP, self.on_right_up)
        
        # 绑定空闲事件用于优化重绘
        self.Bind(wx.EVT_IDLE, self.on_idle)
        
    def set_story_editor(self, editor):
        """设置故事编辑器实例"""
        self.story_editor = editor
        
    def update_layout_config(self, **kwargs):
        """更新布局配置参数"""
        LayoutConfig.update_config(**kwargs)
        # 如果已有节点，则重新计算布局
        if self.nodes:
            self.calculate_layout()
            self.Refresh()
            
    def set_scene(self, scene: Scene):
        """设置当前场景并生成可视化图"""
        self.nodes = {}
        self.connections = []
        self.node_positions = {}
        self.selected_node = None
        
        # print("=== DEBUG: Starting scene processing ===")
        
        # 添加所有节点
        for node in scene.nodes:
            self.nodes[node.id] = node
            
        # 收集所有连接目标，包括章节跳转节点
        chapter_targets = set()  # 用于收集章节跳转目标
        
        # 创建一个节点ID到索引的映射，用于处理隐式连接
        node_index_map = {node.id: i for i, node in enumerate(scene.nodes)}
        
        # print("=== DEBUG: Node Index Map ===")
        # for node_id, index in node_index_map.items():
        #     print(f"Node ID: {node_id}, Index: {index}")
        
        # 第一遍：添加基本连接关系
        # print("=== DEBUG: First pass - Basic connections ===")
        for i, node in enumerate(scene.nodes):
            # print(f"Processing node {node.id} at index {i}")
            # 处理选项连接
            if node.choices:
                print(f"  Node {node.id} has choices:")
                for choice in node.choices:
                    self.connections.append({
                        'from': node.id,
                        'to': choice.next,
                        'label': choice.text,
                        'condition': getattr(choice, 'condition', None)
                    })
                    # print(f"    Added choice connection: {node.id} -> {choice.next} ('{choice.text}')")
                    # 收集章节跳转目标
                    if choice.next.startswith("chapter_"):
                        chapter_targets.add(choice.next)
            # 处理next连接（即使节点有choices，也可能有next属性）
            if getattr(node, 'next', None):
                self.connections.append({
                    'from': node.id,
                    'to': node.next,
                    'label': '',  # 去掉"[自动跳转]"标签
                    'condition': getattr(node, 'condition', None)
                })
                # print(f"  Added next connection: {node.id} -> {node.next}")
                # 收集章节跳转目标
                if node.next.startswith("chapter_"):
                    chapter_targets.add(node.next)
            # 处理隐式连接（相邻节点的自动连接）
            elif i < len(scene.nodes) - 1:
                next_node = scene.nodes[i + 1]
                # 只有当当前节点没有显式的next时才添加隐式连接
                if not getattr(node, 'next', None):
                    self.connections.append({
                        'from': node.id,
                        'to': next_node.id,
                        'label': '',
                        'condition': getattr(node, 'condition', None)
                    })
                    # print(f"  Added implicit connection: {node.id} -> {next_node.id}")
            else:
                # print(f"  Node {node.id} has no next attribute and is at the end, no implicit connection added")
                pass
                    
        # 第二遍：处理选项节点的后续连接
        # print("=== DEBUG: Second pass - Post-choice connections ===")
        for node in scene.nodes:
            # 如果节点有选项，检查每个选项指向的节点是否需要后续连接
            if node.choices:
                # print(f"Processing choices for node {node.id}")
                for choice in node.choices:
                    choice_node_id = choice.next
                    # print(f"  Checking choice to {choice_node_id}")
                    # 确保选项指向的节点在当前场景中
                    if choice_node_id in node_index_map:
                        choice_node_index = node_index_map[choice_node_id]
                        # print(f"    Choice node index: {choice_node_index}")
                        # 确保选项节点不是最后一个节点
                        if choice_node_index < len(scene.nodes) - 1:
                            # 选项节点的下一个节点
                            next_node_after_choice = scene.nodes[choice_node_index + 1]
                            # print(f"    Next node after choice: {next_node_after_choice.id}")
                            # 查找选项节点对象
                            choice_node = self.nodes.get(choice_node_id)
                            
                            # 如果选项节点没有自己的next，则连接到序列中的下一个节点
                            if choice_node and not getattr(choice_node, 'next', None):
                                # 检查是否已经存在相同的连接
                                connection_exists = False
                                for conn in self.connections:
                                    if conn['from'] == choice_node_id and conn['to'] == next_node_after_choice.id:
                                        connection_exists = True
                                        # print(f"    Connection {choice_node_id} -> {next_node_after_choice.id} already exists")
                                        break
                                        
                                if not connection_exists:
                                    self.connections.append({
                                        'from': choice_node_id,
                                        'to': next_node_after_choice.id,
                                        'label': '',
                                        'condition': getattr(choice_node, 'condition', None)
                                    })
                                    # print(f"    Added post-choice connection: {choice_node_id} -> {next_node_after_choice.id}")
                                else:
                                    # print(f"    Skipped duplicate connection: {choice_node_id} -> {next_node_after_choice.id}")
                                    pass
                            else:
                                if choice_node:
                                    next_attr = getattr(choice_node, 'next', None)
                                    # print(f"    Choice node {choice_node_id} has next attribute: {next_attr}, skipping implicit connection")
                                else:
                                    # print(f"    Choice node {choice_node_id} not found")
                                    pass
                        else:
                            # print(f"    Choice node {choice_node_id} is the last node, no next node to connect to")
                            pass
                    else:
                        # print(f"    Choice node {choice_node_id} not found in node_index_map")
                        pass
            else:
                # print(f"Node {node.id} has no choices")
                pass
                    
        # 为章节跳转目标创建虚拟节点（如果它们不存在于当前场景中）
        for target in chapter_targets:
            if target not in self.nodes:
                # 创建虚拟章节节点
                virtual_node = SceneNode(
                    id=target,
                    elements=SceneElement(text=f"跳转到 {target}")
                )
                self.nodes[target] = virtual_node
            
        # print("=== DEBUG: All connections ===")
        # for i, conn in enumerate(self.connections):
        #     print(f"{i+1}. From: {conn['from']} -> To: {conn['to']}, Label: '{conn['label']}'")
            
        self.calculate_layout()
        self.Refresh()
        
    def set_node_display_options(self, options):
        """设置节点显示选项（支持多选）"""
        self.node_display_options = options
        self.Refresh()
        
    def get_node_display_text(self, node: SceneNode) -> str:
        """根据显示选项获取节点显示文本"""
        display_parts = []
        
        # 节点ID
        if "id" in self.node_display_options:
            display_parts.append(node.id)
            
        # 对话文本
        if "text" in self.node_display_options:
            elements = getattr(node, 'elements', None)
            if elements and getattr(elements, 'text', None):
                text = elements.text
                # 如果文本太长，截取前一部分并添加省略号
                if len(text) > 15:
                    display_parts.append(text[:15] + "...")
                else:
                    display_parts.append(text)
            else:
                display_parts.append("[无文本]")
                
        # 背景
        if "background" in self.node_display_options:
            elements = getattr(node, 'elements', None)
            if elements and getattr(elements, 'background', None):
                display_parts.append(f"[BG] {elements.background}")
            else:
                display_parts.append("[无背景]")
                
        # BGM
        if "bgm" in self.node_display_options:
            elements = getattr(node, 'elements', None)
            if elements and getattr(elements, 'bgm', None):
                display_parts.append(f"[BGM] {elements.bgm}")
            else:
                display_parts.append("[无BGM]")
                
        # 立绘
        if "sprites" in self.node_display_options:
            elements = getattr(node, 'elements', None)
            if elements and getattr(elements, 'sprite', None):
                sprites = elements.sprite
                sprite_info = []
                if sprites.get("left"):
                    sprite_info.append("L")
                if sprites.get("center"):
                    sprite_info.append("C")
                if sprites.get("right"):
                    sprite_info.append("R")
                if sprite_info:
                    display_parts.append(f"[SP] {', '.join(sprite_info)}")
                else:
                    display_parts.append("[无立绘]")
            else:
                display_parts.append("[无立绘]")
        
        return "\n".join(display_parts)
        
    def calculate_layout(self):
        """计算节点布局，严格按照从左到右的剧情顺序"""
        if not self.nodes:
            return
            
        positions = {}  # node_id -> (row, col)
        
        # 使用布局管理器计算布局
        self.layout_manager.calculate_layout(self.nodes, self.connections, positions)
        
        # 转换为实际坐标
        width, height = self.GetSize()
        self.node_positions = convert_positions_to_coordinates(positions, width, height)
        
    def on_paint(self, event):
        """绘制图形"""
        # 使用缓冲绘图以改善高DPI显示效果
        width, height = self.GetClientSize()
        if width <= 0 or height <= 0:
            return
            
        buffer = wx.Bitmap(width, height)
        dc = wx.BufferedPaintDC(self, buffer)
        gc = wx.GraphicsContext.Create(dc)
        
        # 设置高质量渲染
        gc.SetAntialiasMode(wx.ANTIALIAS_DEFAULT)
        gc.SetInterpolationQuality(wx.INTERPOLATION_DEFAULT)
        
        # 清除背景
        dc.SetBackground(wx.Brush(self.GetBackgroundColour()))
        dc.Clear()
        
        # 设置变换
        gc.PushState()
        gc.Scale(self.scale, self.scale)
        gc.Translate(self.offset_x, self.offset_y)
        
        # 绘制连接线
        self.renderer.draw_connections(gc, self.connections, self.node_positions, self.nodes)
        
        # 绘制节点，使用新的显示选项
        self.renderer.draw_nodes(gc, self.nodes, self.node_positions, self.selected_node, self.connections, self.get_node_display_text)
        
        gc.PopState()

    def on_size(self, event):
        """窗口大小改变时重新计算布局"""
        if self.nodes:
            self.calculate_layout()
        event.Skip()
        
    def on_left_down(self, event):
        """鼠标左键按下事件 - 用于选择节点"""
        self.SetFocus()
        x, y = event.GetPosition()
        # 转换为逻辑坐标
        logical_x = (x / self.scale) - self.offset_x
        logical_y = (y / self.scale) - self.offset_y
        
        # 检查是否点击了节点
        clicked_node = self.get_node_at_position(logical_x, logical_y)
        if clicked_node:
            self.selected_node = clicked_node
            self.Refresh()
            # 发送节点选中事件
            evt = wx.CommandEvent(wx.EVT_BUTTON.typeId, self.GetId())
            evt.node_id = clicked_node
            self.GetEventHandler().ProcessEvent(evt)
        else:
            # 开始拖动画布
            self.dragging_canvas = True
            self.last_x, self.last_y = x, y  # 使用屏幕坐标而不是逻辑坐标
            
    def on_left_up(self, event):
        """鼠标左键释放事件"""
        if self.dragging_canvas:
            self.dragging_canvas = False
        if self.dragging_node:
            self.dragging_node = False
            self.dragged_node_id = None
            
    def on_motion(self, event):
        """鼠标移动事件"""
        x, y = event.GetPosition()
        
        if event.Dragging():
            if self.dragging_node and self.dragged_node_id:
                # 拖动节点 - 使用屏幕坐标计算偏移
                dx = (x - self.last_x) / self.scale
                dy = (y - self.last_y) / self.scale
                if self.dragged_node_id in self.node_positions:
                    old_x, old_y = self.node_positions[self.dragged_node_id]
                    self.node_positions[self.dragged_node_id] = (old_x + dx, y + dy)
                self.last_x, self.last_y = x, y
                self.Refresh(False)  # 直接刷新，不擦除背景
            elif self.dragging_canvas:
                # 拖动画布 - 使用屏幕坐标计算偏移
                dx = (x - self.last_x) / self.scale
                dy = (y - self.last_y) / self.scale
                self.offset_x += dx
                self.offset_y += dy
                self.last_x, self.last_y = x, y
                self.Refresh(False)  # 直接刷新，不擦除背景
        else:
            # 非拖动状态下，更新鼠标光标
            # 转换为逻辑坐标
            logical_x = (x / self.scale) - self.offset_x
            logical_y = (y / self.scale) - self.offset_y
            clicked_node = self.get_node_at_position(logical_x, logical_y)
                
            if clicked_node:
                self.SetCursor(wx.Cursor(wx.CURSOR_HAND))
            else:
                self.SetCursor(wx.Cursor(wx.CURSOR_ARROW))

    def on_idle(self, event):
        """空闲时处理重绘，减少不必要的重绘次数"""
        if self.need_refresh:
            self.Refresh(False)  # 使用 eraseBackground=False 减少闪烁
            self.need_refresh = False
                
    def on_wheel(self, event):
        """鼠标滚轮事件 - 缩放"""
        # 获取鼠标位置
        x, y = event.GetPosition()
        
        # 计算缩放因子
        if event.GetWheelRotation() > 0:
            scale_factor = 1.1
        else:
            scale_factor = 1/1.1
            
        # 应用缩放
        old_scale = self.scale
        self.scale *= scale_factor
        self.scale = max(0.1, min(5.0, self.scale))  # 限制缩放范围在0.1-5.0之间
        
        # 调整偏移以保持鼠标位置不变
        # 这是一个标准的缩放技术，保持鼠标焦点不变
        self.offset_x = x / self.scale - (x / old_scale - self.offset_x)
        self.offset_y = y / self.scale - (y / old_scale - self.offset_y)
        
        self.Refresh()
        
    def on_left_dclick(self, event):
        """鼠标左键双击事件 - 用于打开节点详情"""
        x, y = event.GetPosition()
        # 转换为逻辑坐标
        logical_x = (x / self.scale) - self.offset_x
        logical_y = (y / self.scale) - self.offset_y
        
        # 检查是否双击了节点
        clicked_node = self.get_node_at_position(logical_x, logical_y)
        if clicked_node:
            # 如果是章节跳转节点，则不处理双击事件（因为没有详情页面）
            if clicked_node.startswith("chapter_"):
                return
            # 打开节点编辑对话框
            self.edit_node(clicked_node)
            
    def edit_node(self, node_id):
        """编辑节点"""
        print(f"[DEBUG] edit_node called with node_id: {node_id}")
        if node_id in self.nodes:
            node = self.nodes[node_id]
            print(f"[DEBUG] Found node in self.nodes: {node.id}")
            dialog = NodeEditorDialog(self, node)
            if dialog.ShowModal() == wx.ID_OK:
                print("[DEBUG] Dialog closed with OK")
                updated_node = dialog.get_node()
                # 更新节点
                self.nodes[node_id] = updated_node
                print(f"[DEBUG] Updated node in self.nodes: {updated_node.id}")
                
                # 更新主窗口中的场景数据
                # 使用通过set_story_editor设置的故事编辑器实例
                if self.story_editor:
                    main_window = self.story_editor
                    print(f"[DEBUG] Main window (from story_editor): {main_window}")
                    if hasattr(main_window, 'current_scene') and main_window.current_scene:
                        scene = main_window.current_scene
                        print(f"[DEBUG] Found current_scene in main window, scene id: {scene.id}")
                        # 在场景中找到并更新对应的节点
                        for i, scene_node in enumerate(scene.nodes):
                            if scene_node.id == node_id:
                                scene.nodes[i] = updated_node
                                print(f"[DEBUG] Updated node in scene.nodes at index {i}")
                                break
                        
                        # 立即刷新图形视图
                        print("[DEBUG] Calling set_scene to refresh view")
                        self.set_scene(scene)
                        
                        # 同时更新图形可视化器中的节点（如果存在）
                        if node_id in self.nodes:
                            self.nodes[node_id] = updated_node
            else:
                print("[DEBUG] Dialog closed with Cancel")
            dialog.Destroy()
        else:
            print(f"[DEBUG] Node {node_id} not found in self.nodes")
            
    def get_node_at_position(self, x: float, y: float) -> Optional[str]:
        """根据坐标获取节点ID"""
        node_width, node_height = self.node_size
        for node_id, (node_x, node_y) in self.node_positions.items():
            if (node_x - node_width/2 <= x <= node_x + node_width/2 and 
                node_y - node_height/2 <= y <= node_y + node_height/2):
                return node_id
        return None
            
    def on_right_down(self, event):
        """鼠标右键按下事件 - 用于拖动节点"""
        x, y = event.GetPosition()
        # 转换为逻辑坐标
        logical_x = (x / self.scale) - self.offset_x
        logical_y = (y / self.scale) - self.offset_y
        
        # 检查是否点击了节点
        clicked_node = self.get_node_at_position(logical_x, logical_y)
            
        if clicked_node:
            self.selected_node = clicked_node
            self.dragging_node = True
            self.dragged_node_id = clicked_node
            # 检查是否是普通节点还是虚拟节点
            if clicked_node in self.node_positions:
                self.original_node_pos = self.node_positions.get(clicked_node, (0, 0))
            self.last_x, self.last_y = x, y  # 使用屏幕坐标
            # 不再立即刷新，避免闪烁

    def on_right_up(self, event):
        """鼠标右键释放事件"""
        if self.dragging_node:
            self.dragging_node = False
            self.dragged_node_id = None
            self.original_node_pos = None