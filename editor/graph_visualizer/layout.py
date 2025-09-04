import math
from typing import Dict, List, Optional, Set, Tuple
from story_parser import Scene, SceneNode, Choice

class LayoutConfig:
    """布局配置类，用于管理布局参数"""
    
    # 层级间距（垂直方向）
    LEVEL_SPACING = 6
    
    # 芺点水平间距
    HORIZONTAL_SPACING = 0.2
    
    # 节点垂直最小间距
    MIN_VERTICAL_SPACING = 3
    
    # 节点水平最小间距
    MIN_HORIZONTAL_SPACING = 0.2
    
    # 节点偏移量
    NODE_OFFSET = 0.5
    
    # 水平接近阈值
    HORIZONTAL_PROXIMITY_THRESHOLD = 0.5
    
    # 章节跳转节点水平间距
    CHAPTER_NODE_SPACING = 200
    
    @classmethod
    def update_config(cls, **kwargs):
        """更新配置参数"""
        for key, value in kwargs.items():
            if hasattr(cls, key):
                setattr(cls, key, value)

class LayoutManager:
    def calculate_layout(self, nodes: Dict[str, SceneNode], connections: List[Dict], positions: Dict[str, Tuple[float, float]]):
        """计算节点布局"""
        if not nodes:
            return
            
        print("=== DEBUG: Starting layout calculation ===")
        # print(f"Nodes: {list(nodes.keys())}")
        # print(f"Connections: {connections}")
            
        # 找到起始节点
        start_node_id = self._find_start_node(nodes, connections)
        # print(f"Start node: {start_node_id}")
        
        # 构建节点的前驱和后继关系
        predecessors = self._build_predecessors(connections)
        successors = self._build_successors(connections)
        # print(f"Predecessors: {predecessors}")
        # print(f"Successors: {successors}")
        
        # 分配节点到层级
        node_levels = self._assign_node_levels(nodes, connections, start_node_id)
        # print(f"Node levels: {node_levels}")
        
        # 在层级内分配节点位置
        self._arrange_nodes_in_levels(nodes, connections, node_levels, predecessors, successors, positions)
        # print(f"Positions after arrange_nodes_in_levels: {positions}")
        
        # 优化垂直分布
        self._optimize_vertical_distribution(positions)
        # print(f"Positions after optimize_vertical_distribution: {positions}")
        
        # 处理连接线重叠问题
        self._handle_connection_overlaps(connections, positions, predecessors, successors)
        # print(f"Positions after handle_connection_overlaps: {positions}")
        
        # 再次优化垂直分布，确保节点不重叠
        self._optimize_vertical_distribution(positions)
        # print(f"Final positions: {positions}")
        # print("=== DEBUG: Layout calculation completed ===")
        
    def _find_start_node(self, nodes: Dict[str, SceneNode], connections: List[Dict]) -> str:
        """找到起始节点"""
        # 优先找id为"start"的节点
        for node_id in nodes:
            if node_id == "start":
                return node_id
                
        # 找入度为0的节点
        for node_id in nodes:
            is_target = False
            for conn in connections:
                if conn['to'] == node_id:
                    is_target = True
                    break
            if not is_target:
                return node_id
                
        # 默认返回第一个节点
        return list(nodes.keys())[0] if nodes else ""
        
    def _build_predecessors(self, connections: List[Dict]) -> Dict[str, List[str]]:
        """构建每个节点的前驱节点列表"""
        predecessors = {}
        for conn in connections:
            to_node = conn['to']
            from_node = conn['from']
            if to_node not in predecessors:
                predecessors[to_node] = []
            predecessors[to_node].append(from_node)
        return predecessors
        
    def _build_successors(self, connections: List[Dict]) -> Dict[str, List[str]]:
        """构建每个节点的后继节点列表"""
        successors = {}
        for conn in connections:
            from_node = conn['from']
            to_node = conn['to']
            if from_node not in successors:
                successors[from_node] = []
            successors[from_node].append(to_node)
        return successors
        
    def _assign_node_levels(self, nodes: Dict[str, SceneNode], connections: List[Dict], start_node_id: str) -> Dict[str, int]:
        """为每个节点分配层级"""
        node_levels = {start_node_id: 0}
        visited = {start_node_id}
        queue = [start_node_id]
        level = 0
        
        successors = self._build_successors(connections)
        predecessors = self._build_predecessors(connections)
        
        while queue:
            level += 1
            next_queue = []
            
            for node_id in queue:
                if node_id in successors:
                    for next_node in successors[node_id]:
                        if next_node not in visited and next_node in nodes:
                            # 确保节点不会被分配到比其任何前驱节点更早的层级
                            min_level = level
                            if next_node in predecessors:
                                for pred in predecessors[next_node]:
                                    if pred in node_levels:
                                        min_level = max(min_level, node_levels[pred] + 1)
                            
                            node_levels[next_node] = min_level
                            visited.add(next_node)
                            next_queue.append(next_node)
                            
            queue = next_queue
            
        # 为未访问的节点分配层级（通常是孤立节点）
        for node_id in nodes:
            if node_id not in node_levels:
                node_levels[node_id] = max(node_levels.values()) + 1 if node_levels else 0
                
        return node_levels
        
    def _arrange_nodes_in_levels(self, nodes: Dict[str, SceneNode], connections: List[Dict], 
                                node_levels: Dict[str, int], predecessors: Dict[str, List[str]], 
                                successors: Dict[str, List[str]], positions: Dict[str, Tuple[float, float]]):
        """在层级内安排节点位置"""
        # 按层级分组节点
        levels = {}
        for node_id, level in node_levels.items():
            if level not in levels:
                levels[level] = []
            levels[level].append(node_id)
            
        # 按层级排序
        sorted_levels = sorted(levels.keys())
        
        # 为每层中的节点分配位置
        for level in sorted_levels:
            nodes_in_level = levels[level]
            # print(f"Arranging level {level} nodes: {nodes_in_level}")
            
            # 根据前驱节点的位置来确定当前节点的位置
            if level == 0:
                # 第一层，居中排列
                for i, node_id in enumerate(nodes_in_level):
                    positions[node_id] = (i * LayoutConfig.HORIZONTAL_SPACING, level * LayoutConfig.LEVEL_SPACING)
                    # print(f"  Level 0 node {node_id} positioned at {positions[node_id]}")
            else:
                # 其他层，根据前驱节点位置确定
                for node_id in nodes_in_level:
                    if node_id in predecessors and predecessors[node_id]:
                        # 计算前驱节点的平均位置
                        pred_positions = []
                        for pred in predecessors[node_id]:
                            if pred in positions:
                                pred_positions.append(positions[pred][0])
                        
                        if pred_positions:
                            avg_pred_pos = sum(pred_positions) / len(pred_positions)
                            # 考虑在同一层级中已放置的节点，避免重叠
                            base_y = level * LayoutConfig.LEVEL_SPACING
                            offset = 0
                            
                            # 检查当前位置是否已被占用
                            while any(pos[0] == avg_pred_pos + offset and abs(pos[1] - base_y) < 0.1
                                     for pos in positions.values()):
                                offset += LayoutConfig.NODE_OFFSET
                                if offset > len(nodes_in_level) * LayoutConfig.NODE_OFFSET:  # 避免无限循环
                                    break
                                    
                            positions[node_id] = (avg_pred_pos + offset, base_y)
                            # print(f"  Node {node_id} positioned at {positions[node_id]} (based on predecessors {predecessors[node_id]})")
                        else:
                            # 没有有效的前驱节点位置信息，使用默认位置
                            positions[node_id] = (len(positions) * LayoutConfig.HORIZONTAL_SPACING / 2, level * LayoutConfig.LEVEL_SPACING)
                            # print(f"  Node {node_id} positioned at default location {positions[node_id]}")
                    else:
                        # 没有前驱节点，使用默认位置
                        positions[node_id] = (len(positions) * LayoutConfig.HORIZONTAL_SPACING / 2, level * LayoutConfig.LEVEL_SPACING)
                        # print(f"  Node {node_id} positioned at default location {positions[node_id]}")
                        
    def _optimize_vertical_distribution(self, positions: Dict[str, Tuple[float, float]]):
        """优化垂直分布，避免节点过于接近"""
        print("Optimizing vertical distribution")
        initial_positions = positions.copy()
        
        # 按y坐标分组节点
        rows = {}
        for node_id, (x, y) in positions.items():
            y_key = round(y * 2) / 2  # 将y坐标四舍五入到0.5的倍数
            if y_key not in rows:
                rows[y_key] = []
            rows[y_key].append((node_id, x))
            
        # 对每行中的节点按x坐标排序，并调整位置避免重叠
        for y_key in sorted(rows.keys()):
            row_nodes = rows[y_key]
            row_nodes.sort(key=lambda item: item[1])  # 按x坐标排序
            
            # 调整节点位置，确保最小间距
            for i in range(1, len(row_nodes)):
                node_id, x = row_nodes[i]
                prev_node_id, prev_x = row_nodes[i-1]
                
                # 检查水平间距
                if x - prev_x < LayoutConfig.MIN_HORIZONTAL_SPACING:
                    new_x = prev_x + LayoutConfig.MIN_HORIZONTAL_SPACING
                    # 检查垂直方向上是否有足够空间
                    y_pos = y_key
                    positions[node_id] = (new_x, y_pos)
                    # print(f"  Adjusted {node_id} x-position from {x} to {new_x}")
                
        # 检查垂直方向上的重叠
        node_list = list(positions.items())
        for i in range(len(node_list)):
            node_id1, (x1, y1) = node_list[i]
            for j in range(i+1, len(node_list)):
                node_id2, (x2, y2) = node_list[j]
                
                # 如果节点在水平方向上接近，确保它们在垂直方向上有足够间距
                if abs(x1 - x2) < LayoutConfig.HORIZONTAL_PROXIMITY_THRESHOLD:  # 水平接近的阈值
                    if abs(y1 - y2) < LayoutConfig.MIN_VERTICAL_SPACING:
                        # 调整其中一个节点的垂直位置
                        if y1 <= y2:
                            old_pos = positions[node_id2]
                            positions[node_id2] = (x2, y1 + LayoutConfig.MIN_VERTICAL_SPACING)
                            # print(f"  Adjusted {node_id2} y-position from {old_pos} to {positions[node_id2]} to avoid overlap with {node_id1}")
                        else:
                            old_pos = positions[node_id1]
                            positions[node_id1] = (x1, y2 + LayoutConfig.MIN_VERTICAL_SPACING)
                            # print(f"  Adjusted {node_id1} y-position from {old_pos} to {positions[node_id1]} to avoid overlap with {node_id2}")
                            
        if positions != initial_positions:
            # print(f"Positions changed during optimization: {positions}")
            pass
                            
    def _handle_connection_overlaps(self, connections: List[Dict], positions: Dict[str, Tuple[float, float]], 
                                  predecessors: Dict[str, List[str]], successors: Dict[str, List[str]]):
        """处理连接线重叠问题，通过调整节点垂直位置来避免连接线重叠"""
        print("Handling connection overlaps")
        initial_positions = positions.copy()
        
        # 查找所有直接连接和间接连接的情况
        # 构建直接连接映射
        direct_connections = {}
        for conn in connections:
            from_node = conn['from']
            to_node = conn['to']
            if from_node not in direct_connections:
                direct_connections[from_node] = set()
            direct_connections[from_node].add(to_node)
            
        # print(f"Direct connections map: {direct_connections}")
        
        # 检查三节点重叠情况: A -> B 和 A -> C 且 B -> C
        for node_a in direct_connections:
            # 查找所有node_a的直接后继
            if node_a not in positions:
                continue
                
            successors_a = direct_connections[node_a]
            for node_b in successors_a:
                if node_b not in positions:
                    continue
                    
                # 检查node_b是否也有后继
                if node_b in direct_connections:
                    successors_b = direct_connections[node_b]
                    # 检查node_a是否也直接连接到node_b的某个后继
                    common_successors = successors_a & successors_b
                    for node_c in common_successors:
                        if node_c not in positions:
                            continue
                            
                        # 检查这三个节点是否在同一条直线上（x坐标相同）
                        x_a, y_a = positions[node_a]
                        x_b, y_b = positions[node_b]
                        x_c, y_c = positions[node_c]
                        
                        # 检查是否在同一垂直线上且顺序正确
                        if abs(x_a - x_b) < 0.01 and abs(x_b - x_c) < 0.01 and y_a < y_b < y_c:
                            # 需要将中间节点(node_b)在水平方向上偏移，以避免连接线重叠
                            offset_x = 1.0  # 水平偏移量
                            old_pos = positions[node_b]
                            positions[node_b] = (x_b + offset_x, y_b)
                            # print(f"  Adjusted {node_b} from {old_pos} to {positions[node_b]} to avoid connection overlap")
                            
        if positions != initial_positions:
            # print(f"Positions changed during overlap handling: {positions}")
            pass