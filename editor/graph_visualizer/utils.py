from typing import Dict, List, Tuple
from .layout import LayoutConfig

def convert_positions_to_coordinates(positions: Dict[str, Tuple[float, float]], 
                                   width: int, 
                                   height: int) -> Dict[str, Tuple[float, float]]:
    """将行列位置转换为实际坐标"""
    if not positions:
        return {}
        
    if width <= 0 or height <= 0:
        width, height = 800, 600
        
    # 找到行列范围
    rows = [pos[0] for pos in positions.values()]
    cols = [pos[1] for pos in positions.values()]
    
    if not rows or not cols:
        return {}
        
    min_row, max_row = min(rows), max(rows)
    min_col, max_col = min(cols), max(cols)
    
    row_count = max_row - min_row + 1
    col_count = max_col - min_col + 1
    
    # 计算间距，基于LayoutConfig配置
    # 将配置参数转换为合适的像素值，避免硬编码的最小值限制
    base_x_spacing = LayoutConfig.HORIZONTAL_SPACING * 200  # 调整倍数以获得合适的视觉效果
    base_y_spacing = LayoutConfig.LEVEL_SPACING * 30  # 调整倍数以获得合适的视觉效果
    
    # 设置合理的最小间距，避免节点重叠
    min_x_spacing = max(50, base_x_spacing)  # 最小50像素
    min_y_spacing = max(70, base_y_spacing)  # 最小70像素
    
    # 计算实际间距，考虑窗口大小，但不过分限制
    x_spacing = max(min_x_spacing, width / max(col_count, 1)) if col_count > 0 else min_x_spacing
    y_spacing = max(min_y_spacing, height / max(row_count, 1)) if row_count > 0 else min_y_spacing
    
    # 转换为坐标
    coordinates = {}
    for node_id, (row, col) in positions.items():
        x = (col - min_col + 0.5) * x_spacing
        y = (row - min_row + 0.5) * y_spacing
        coordinates[node_id] = (x, y)
        
    return coordinates