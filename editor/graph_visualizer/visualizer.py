import wx
import math
import time
from typing import Dict, List, Optional, Set, Tuple
from story_parser import Scene, SceneNode, Choice, SceneElement

# 导入新模块
from .layout import LayoutManager, LayoutConfig
from .renderer import GraphRenderer
from .utils import convert_positions_to_coordinates

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
        
        # 添加所有节点
        for node in scene.nodes:
            self.nodes[node.id] = node
            
        # 收集所有连接目标，包括章节跳转节点
        chapter_targets = set()  # 用于收集章节跳转目标
        
        # 添加连接关系
        for node in scene.nodes:
            # 处理选项连接
            if node.choices:
                for choice in node.choices:
                    self.connections.append({
                        'from': node.id,
                        'to': choice.next,
                        'label': choice.text,
                        'condition': getattr(choice, 'condition', None)
                    })
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
                # 收集章节跳转目标
                if node.next.startswith("chapter_"):
                    chapter_targets.add(node.next)
                    
        # 为章节跳转目标创建虚拟节点（如果它们不存在于当前场景中）
        for target in chapter_targets:
            if target not in self.nodes:
                # 创建虚拟章节节点
                virtual_node = SceneNode(
                    id=target,
                    elements=SceneElement(text=f"跳转到 {target}")
                )
                self.nodes[target] = virtual_node
            
        self.calculate_layout()
        self.Refresh()
        
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
        
        # 绘制节点
        self.renderer.draw_nodes(gc, self.nodes, self.node_positions, self.selected_node, self.connections)
        
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
                    self.node_positions[self.dragged_node_id] = (old_x + dx, old_y + dy)
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
            # 发送节点双击事件
            evt = wx.CommandEvent(wx.EVT_BUTTON.typeId, self.GetId())
            evt.node_id = clicked_node
            evt.double_click = True
            self.GetEventHandler().ProcessEvent(evt)
            
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