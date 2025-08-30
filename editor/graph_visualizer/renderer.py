import wx
import math
from typing import Dict, List, Optional, Set, Tuple
from graph_visualizer.layout import LayoutConfig
from story_parser import Scene, SceneNode, Choice

class GraphRenderer:
    def __init__(self, parent):
        self.parent = parent
        
    def render(self, gc, nodes: Dict[str, SceneNode], connections: List[Dict], positions: Dict[str, Tuple[float, float]], selected_node: Optional[str]):
        """渲染图形"""
        # 设置高质量渲染
        gc.SetAntialiasMode(wx.ANTIALIAS_NONE)  # 在拖动时关闭抗锯齿以提高性能
        gc.SetInterpolationQuality(wx.INTERPOLATION_FAST)

        # 绘制连接线（包括指向章节节点的线）
        self.draw_connections(gc, connections, positions, nodes)
        
        # 绘制节点
        self.draw_nodes(gc, nodes, positions, selected_node, connections)
        
    def draw_connections(self, gc, connections: List[Dict], positions: Dict[str, Tuple[float, float]], nodes: Dict[str, SceneNode], virtual_positions: Dict[str, Tuple[float, float]] = None):
        """绘制连接线"""
        gc.SetPen(wx.Pen(wx.Colour(100, 100, 255), 2))
        # 使用系统默认字体大小，改善高DPI显示效果
        font = wx.SystemSettings.GetFont(wx.SYS_DEFAULT_GUI_FONT)
        if font.GetPointSize() < 10:
            font = wx.Font(10, wx.FONTFAMILY_DEFAULT, wx.FONTSTYLE_NORMAL, wx.FONTWEIGHT_NORMAL)
        gc.SetFont(font, wx.BLACK)
        
        # 预先计算所有需要绘制的连接线
        lines_to_draw = []
        texts_to_draw = []
        
        for conn in connections:
            from_node = conn['from']
            to_node = conn['to']
            
            # 检查起始节点是否存在
            if from_node not in positions:
                continue
                
            x1, y1 = positions[from_node]
            
            # 检查目标节点是否存在
            if to_node in positions:
                # 目标节点存在，正常绘制
                x2, y2 = positions[to_node]
                
                # 计算节点框大小
                node_size = self.parent.node_size if hasattr(self.parent, 'node_size') else (120, 60)
                
                # 计算从起始节点边缘到目标节点边缘的连线
                start_x, start_y = self._calculate_node_edge_point(x1, y1, x2, y2, node_size)
                end_x, end_y = self._calculate_node_edge_point(x2, y2, x1, y1, node_size)
                
                lines_to_draw.append((start_x, start_y, end_x, end_y))
                
                # 添加标签和条件信息（仅当标签不为空时）
                if conn['label'] or conn.get('condition'):
                    mid_x = (start_x + end_x) / 2
                    mid_y = (start_y + end_y) / 2
                    if conn['label']:
                        texts_to_draw.append((conn['label'], mid_x, mid_y - 10))
                    if conn.get('condition'):
                        texts_to_draw.append((f"[{conn['condition']}]", mid_x, mid_y + 5))
        
        # 批量绘制所有线条
        for line in lines_to_draw:
            self.draw_arrow(gc, line[0], line[1], line[2], line[3])
            
        # 批量绘制所有文本
        for text, x, y in texts_to_draw:
            gc.DrawText(text, x, y)
                    
    def _calculate_node_edge_point(self, node_x: float, node_y: float, target_x: float, target_y: float, node_size: Tuple[float, float], is_circle: bool = False) -> Tuple[float, float]:
        """计算从节点边缘指向目标点的交点"""
        rect_width, rect_height = node_size
        
        # 计算方向向量
        dx = target_x - node_x
        dy = target_y - node_y
        
        # 避免除零错误
        if dx == 0 and dy == 0:
            return node_x, node_y
            
        if is_circle:
            # 圆形节点处理
            radius = min(rect_width, rect_height) / 2
            length = max((dx**2 + dy**2)**0.5, 0.001)
            # 单位向量
            ux = dx / length
            uy = dy / length
            # 返回圆周上的点
            return node_x + ux * radius, node_y + uy * radius
            
        # 节点半宽和半高
        half_width = rect_width / 2
        half_height = rect_height / 2
        
        # 计算与矩形边缘的交点
        # 使用参数方程: point = node_center + t * direction
        # 找到最小的正t值使得点在矩形边缘上
        
        t_min = float('inf')
        
        # 检查与左边缘 (x = node_x - half_width) 的交点
        if dx != 0:
            t = (node_x - half_width - node_x) / dx
            if t > 0:
                y_intersect = node_y + t * dy
                if abs(y_intersect - node_y) <= half_height:
                    t_min = min(t_min, t)
        
        # 检查与右边缘 (x = node_x + half_width) 的交点
        if dx != 0:
            t = (node_x + half_width - node_x) / dx
            if t > 0:
                y_intersect = node_y + t * dy
                if abs(y_intersect - node_y) <= half_height:
                    t_min = min(t_min, t)
        
        # 检查与上边缘 (y = node_y - half_height) 的交点
        if dy != 0:
            t = (node_y - half_height - node_y) / dy
            if t > 0:
                x_intersect = node_x + t * dx
                if abs(x_intersect - node_x) <= half_width:
                    t_min = min(t_min, t)
        
        # 检查与下边缘 (y = node_y + half_height) 的交点
        if dy != 0:
            t = (node_y + half_height - node_y) / dy
            if t > 0:
                x_intersect = node_x + t * dx
                if abs(x_intersect - node_x) <= half_width:
                    t_min = min(t_min, t)
        
        # 如果找到了有效的t值，计算交点
        if t_min != float('inf'):
            intersect_x = node_x + t_min * dx
            intersect_y = node_y + t_min * dy
            return intersect_x, intersect_y
        
        # 默认返回中心点
        return node_x, node_y
                    
    def draw_arrow(self, gc, x1, y1, x2, y2):
        """绘制带箭头的线"""
        # 绘制线段
        gc.StrokeLine(x1, y1, x2, y2)
        
        # 计算箭头
        dx = x2 - x1
        dy = y2 - y1
        length = max((dx**2 + dy**2)**0.5, 0.001)
            
        # 单位向量
        ux = dx / length
        uy = dy / length
        
        # 箭头长度和角度
        arrow_length = 10
        arrow_angle = 0.5
        
        # 计算箭头两点
        cos_angle = math.cos(arrow_angle)
        sin_angle = math.sin(arrow_angle)
        
        arrow_x1 = x2 - arrow_length * (ux * cos_angle - uy * sin_angle)
        arrow_y1 = y2 - arrow_length * (uy * cos_angle + ux * sin_angle)
        arrow_x2 = x2 - arrow_length * (ux * cos_angle + uy * sin_angle)
        arrow_y2 = y2 - arrow_length * (uy * cos_angle - ux * sin_angle)
        
        # 绘制箭头
        gc.StrokeLine(x2, y2, arrow_x1, arrow_y1)
        gc.StrokeLine(x2, y2, arrow_x2, arrow_y2)
        
    def draw_nodes(self, gc, nodes: Dict[str, SceneNode], positions: Dict[str, Tuple[float, float]], selected_node: Optional[str], connections: List[Dict], virtual_positions: Dict[str, Tuple[float, float]] = None):
        """绘制节点"""
        # 使用更大更清晰的字体
        font = wx.SystemSettings.GetFont(wx.SYS_DEFAULT_GUI_FONT)
        if font.GetPointSize() < 12:
            font = wx.Font(12, wx.FONTFAMILY_DEFAULT, wx.FONTSTYLE_NORMAL, wx.FONTWEIGHT_BOLD)  # 增大字体并加粗
        else:
            font = wx.Font(font.GetPointSize(), font.GetFamily(), font.GetStyle(), wx.FONTWEIGHT_BOLD)  # 保持原有大小但加粗
        gc.SetFont(font, wx.BLACK)
        
        node_size = self.parent.node_size if hasattr(self.parent, 'node_size') else (120, 60)
        
        # 绘制所有节点
        for node_id, (x, y) in positions.items():
            # 检查是否是章节跳转节点（以chapter_开头的节点）
            is_chapter_node = node_id.startswith("chapter_")
            
            # 选择节点颜色
            if node_id == selected_node:
                color = wx.Colour(255, 200, 200)
            else:
                color = wx.Colour(200, 230, 255)
                
            # 绘制节点
            rect_width, rect_height = node_size
            
            if is_chapter_node:
                # 绘制圆形节点表示章节跳转
                radius = min(rect_width, rect_height) / 2
                gc.SetBrush(wx.Brush(color))
                gc.SetPen(wx.Pen(wx.BLACK, 1))
                gc.DrawEllipse(x - radius, y - radius, radius * 2, radius * 2)
                
                # 绘制节点ID
                text_width, text_height = gc.GetTextExtent(node_id)
                gc.DrawText(node_id, x - text_width/2, y - text_height/2)
            else:
                # 绘制常规矩形节点
                gc.SetBrush(wx.Brush(color))
                gc.SetPen(wx.Pen(wx.BLACK, 1))
                gc.DrawRectangle(x - rect_width/2, y - rect_height/2, rect_width, rect_height)
                
                # 绘制节点ID
                text_width, text_height = gc.GetTextExtent(node_id)
                gc.DrawText(node_id, x - text_width/2, y - text_height/2)