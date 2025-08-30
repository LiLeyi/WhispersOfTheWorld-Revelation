import sys
import os
import json
import wx
import wx.lib.agw.customtreectrl as CT
from typing import Dict, Any, List, Optional
from story_parser import StoryParser, Scene, SceneNode
from story_editor import StoryEditor
from graph_visualizer import NodeGraphVisualizer

class StoryEditorFrame(wx.Frame):
    def __init__(self):
        # 启用高DPI支持
        wx.SystemOptions.SetOption("msw.window-reflection", 1)
        
        # 获取屏幕尺寸以适配分辨率
        display_size = wx.DisplaySize()
        screen_width, screen_height = display_size
        
        # 设置窗口大小为屏幕的80%
        window_width = int(screen_width * 0.8)
        window_height = int(screen_height * 0.8)
        
        # 确保窗口不会太小
        window_width = max(window_width, 1200)
        window_height = max(window_height, 800)
        
        # 设置窗口位置居中
        position_x = (screen_width - window_width) // 2
        position_y = (screen_height - window_height) // 2
        
        super().__init__(None, title='剧情可视化编辑器', 
                         size=(window_width, window_height),
                         pos=(position_x, position_y))
        
        # 设置默认字体以改善清晰度
        font = self.GetFont()
        if wx.Platform == "__WXMSW__":
            # 在Windows上使用默认的GUI字体
            font = wx.SystemSettings.GetFont(wx.SYS_DEFAULT_GUI_FONT)
        else:
            # 在其他平台上确保使用清晰的字体
            font = wx.Font(9, wx.FONTFAMILY_SWISS, wx.FONTSTYLE_NORMAL, wx.FONTWEIGHT_NORMAL)
        
        self.SetFont(font)
        
        self.story_editor = StoryEditor()
        self.scenes: Dict[str, Scene] = {}
        self.current_scene: Optional[Scene] = None
        self.current_node: Optional[SceneNode] = None
        self.init_ui()
        self.load_scenes()
        
    def init_ui(self):
        # 创建面板
        panel = wx.Panel(self)
        # 设置面板字体
        panel.SetFont(self.GetFont())
        sizer = wx.BoxSizer(wx.VERTICAL)
        
        # 创建按钮
        button_sizer = wx.BoxSizer(wx.HORIZONTAL)
        self.load_btn = wx.Button(panel, label='重新加载')
        self.load_btn.Bind(wx.EVT_BUTTON, self.on_load)
        self.save_btn = wx.Button(panel, label='保存修改')
        self.save_btn.Bind(wx.EVT_BUTTON, self.on_save)
        self.export_btn = wx.Button(panel, label='导出为JSON')
        self.export_btn.Bind(wx.EVT_BUTTON, self.on_export)
        
        button_sizer.Add(self.load_btn, 0, wx.ALL, 5)
        button_sizer.Add(self.save_btn, 0, wx.ALL, 5)
        button_sizer.Add(self.export_btn, 0, wx.ALL, 5)
        
        # 创建分割窗口
        main_splitter = wx.SplitterWindow(panel)
        
        # 左侧剧情树
        self.story_tree = CT.CustomTreeCtrl(main_splitter, style=wx.TR_HAS_BUTTONS | wx.TR_LINES_AT_ROOT)
        self.story_tree.Bind(wx.EVT_TREE_SEL_CHANGED, self.on_tree_item_selected)
        # 绑定双击事件
        self.story_tree.Bind(wx.EVT_TREE_ITEM_ACTIVATED, self.on_tree_item_activated)
        
        # 右侧主面板
        right_panel = wx.Panel(main_splitter)
        right_sizer = wx.BoxSizer(wx.VERTICAL)
        
        # 创建选项卡
        self.notebook = wx.Notebook(right_panel)
        
        # 详细信息面板
        self.detail_panel = wx.TextCtrl(self.notebook, style=wx.TE_MULTILINE | wx.TE_READONLY)
        self.notebook.AddPage(self.detail_panel, "详细信息")
        
        # 图形化视图面板
        graph_panel = wx.Panel(self.notebook)  # 使用notebook作为父窗口
        graph_sizer = wx.BoxSizer(wx.VERTICAL)
        
        # 创建图形化可视化组件
        self.graph_visualizer = NodeGraphVisualizer(graph_panel)  # 使用graph_panel作为父窗口
        self.Bind(wx.EVT_BUTTON, self.on_node_selected, self.graph_visualizer)
        
        # 工具栏
        graph_toolbar = wx.ToolBar(graph_panel, style=wx.TB_HORIZONTAL | wx.TB_TEXT)  # 使用graph_panel作为父窗口
        self.reset_view_btn = graph_toolbar.AddTool(wx.ID_ANY, '重置视图', wx.ArtProvider.GetBitmap(wx.ART_GO_HOME))
        self.Bind(wx.EVT_TOOL, self.on_reset_view, self.reset_view_btn)
        graph_toolbar.Realize()
        
        graph_sizer.Add(graph_toolbar, 0, wx.EXPAND)
        graph_sizer.Add(self.graph_visualizer, 1, wx.EXPAND)
        graph_panel.SetSizer(graph_sizer)
        self.notebook.AddPage(graph_panel, "节点关系图")
        
        # 节点编辑面板
        self.edit_panel = wx.Panel(right_panel)  # 使用right_panel作为父窗口
        edit_sizer = wx.FlexGridSizer(cols=2, hgap=5, vgap=5)
        edit_sizer.AddGrowableCol(1)
        
        # 节点ID
        edit_sizer.Add(wx.StaticText(self.edit_panel, label="节点ID:"), 0, wx.ALIGN_CENTER_VERTICAL)
        self.node_id_text = wx.TextCtrl(self.edit_panel)
        edit_sizer.Add(self.node_id_text, 1, wx.EXPAND)
        
        # 节点名称
        edit_sizer.Add(wx.StaticText(self.edit_panel, label="角色名称:"), 0, wx.ALIGN_CENTER_VERTICAL)
        self.node_name_text = wx.TextCtrl(self.edit_panel)
        edit_sizer.Add(self.node_name_text, 1, wx.EXPAND)
        
        # 节点文本
        edit_sizer.Add(wx.StaticText(self.edit_panel, label="对话文本:"), 0, wx.ALIGN_CENTER_VERTICAL)
        self.node_text_ctrl = wx.TextCtrl(self.edit_panel, style=wx.TE_MULTILINE, size=(-1, 60))
        edit_sizer.Add(self.node_text_ctrl, 1, wx.EXPAND)
        
        # 背景图片
        edit_sizer.Add(wx.StaticText(self.edit_panel, label="背景图片:"), 0, wx.ALIGN_CENTER_VERTICAL)
        self.background_text = wx.TextCtrl(self.edit_panel)
        edit_sizer.Add(self.background_text, 1, wx.EXPAND)
        
        self.edit_panel.SetSizer(edit_sizer)
        
        # 编辑按钮
        edit_button_panel = wx.Panel(right_panel)  # 创建一个新的面板来容纳按钮
        edit_button_sizer = wx.BoxSizer(wx.HORIZONTAL)
        self.add_node_btn = wx.Button(edit_button_panel, label='添加节点')
        self.add_node_btn.Bind(wx.EVT_BUTTON, self.on_add_node)
        self.update_node_btn = wx.Button(edit_button_panel, label='更新节点')
        self.update_node_btn.Bind(wx.EVT_BUTTON, self.on_update_node)
        self.delete_node_btn = wx.Button(edit_button_panel, label='删除节点')
        self.delete_node_btn.Bind(wx.EVT_BUTTON, self.on_delete_node)
        
        edit_button_sizer.Add(self.add_node_btn, 0, wx.ALL, 5)
        edit_button_sizer.Add(self.update_node_btn, 0, wx.ALL, 5)
        edit_button_sizer.Add(self.delete_node_btn, 0, wx.ALL, 5)
        edit_button_panel.SetSizer(edit_button_sizer)
        
        right_sizer.Add(self.notebook, 1, wx.EXPAND | wx.ALL, 5)
        right_sizer.Add(self.edit_panel, 0, wx.EXPAND | wx.ALL, 5)
        right_sizer.Add(edit_button_panel, 0, wx.CENTER)
        
        right_panel.SetSizer(right_sizer)
        
        main_splitter.SplitVertically(self.story_tree, right_panel)
        main_splitter.SetSashPosition(300)
        
        # 添加到主布局
        sizer.Add(button_sizer, 0, wx.EXPAND)
        sizer.Add(main_splitter, 1, wx.EXPAND)
        
        panel.SetSizer(sizer)
        
        # 菜单栏
        menubar = wx.MenuBar()
        file_menu = wx.Menu()
        file_menu.Append(wx.ID_EXIT, "退出", "退出程序")
        self.Bind(wx.EVT_MENU, self.on_exit, id=wx.ID_EXIT)
        menubar.Append(file_menu, "文件")
        self.SetMenuBar(menubar)
        
        # 状态栏
        self.CreateStatusBar()
        self.SetStatusText('就绪')
        
    def load_scenes(self):
        """加载所有场景"""
        self.scenes = self.story_editor.load_scenes()
        self.populate_story_tree()
        self.SetStatusText(f'已加载 {len(self.scenes)} 个场景')
        
    def populate_story_tree(self):
        """填充剧情树"""
        self.story_tree.DeleteAllItems()
        
        # 添加根节点
        root = self.story_tree.AddRoot('剧情结构')
        
        # 按章节分组场景
        chapters = {}
        for scene_id, scene in self.scenes.items():
            # 从场景ID中提取章节号，例如 "chapter_0_scene_0" -> "chapter_0"
            if '_' in scene_id:
                chapter_id = '_'.join(scene_id.split('_')[:2])  # 提取 "chapter_X" 部分
            else:
                chapter_id = "其他章节"
                
            if chapter_id not in chapters:
                chapters[chapter_id] = []
            chapters[chapter_id].append((scene_id, scene))
        
        # 添加章节节点
        for chapter_id in sorted(chapters.keys()):
            # 格式化章节名称
            if chapter_id.startswith("chapter_"):
                chapter_name = f"第{chapter_id.split('_')[1]}章"
            else:
                chapter_name = chapter_id
                
            chapter_item = self.story_tree.AppendItem(root, chapter_name)
            self.story_tree.SetItemData(chapter_item, chapter_id)
            
            # 添加该章节下的场景
            for scene_id, scene in sorted(chapters[chapter_id], key=lambda x: x[0]):
                scene_item = self.story_tree.AppendItem(chapter_item, f'{scene.title} ({scene_id})')
                self.story_tree.SetItemData(scene_item, scene_id)
                
                # 添加节点
                for node in scene.nodes:
                    node_item = self.story_tree.AppendItem(scene_item, f'节点: {node.id}')
                    self.story_tree.SetItemData(node_item, (scene_id, node.id))
                    
                    # 如果有选项，添加选项信息
                    if node.choices:
                        for choice in node.choices:
                            choice_item = self.story_tree.AppendItem(node_item, f'选项: {choice.text} -> {choice.next}')
                            self.story_tree.SetItemData(choice_item, (scene_id, node.id, choice.next))
                        
        self.story_tree.Expand(root)  # 只展开根节点，不展开所有节点
        
    def on_tree_item_selected(self, event):
        """当树形控件中的项被选中时 - 仅高亮显示"""
        item = event.GetItem()
        if not item:
            return
            
        item_data = self.story_tree.GetItemData(item)
        if not item_data:
            return
            
        # 如果是场景节点
        if isinstance(item_data, str):
            scene_id = item_data
            if scene_id in self.scenes:
                scene = self.scenes[scene_id]
                self.current_scene = scene
                # 不再显示详情，只更新图形化视图
                self.graph_visualizer.set_scene(scene)
                
        # 如果是节点
        elif isinstance(item_data, tuple) and len(item_data) == 2:
            scene_id, node_id = item_data
            if scene_id in self.scenes:
                scene = self.scenes[scene_id]
                for node in scene.nodes:
                    if node.id == node_id:
                        self.current_node = node
                        # 在图形化视图中选中该节点
                        self.graph_visualizer.selected_node = node_id
                        self.graph_visualizer.Refresh()
                        break
                        
    def on_tree_item_activated(self, event):
        """当树形控件中的项被激活（双击）时 - 显示详情"""
        item = event.GetItem()
        if not item:
            return
            
        item_data = self.story_tree.GetItemData(item)
        if not item_data:
            return
            
        # 如果是场景节点
        if isinstance(item_data, str):
            scene_id = item_data
            if scene_id in self.scenes:
                scene = self.scenes[scene_id]
                self.display_scene_details(scene)
                
        # 如果是节点
        elif isinstance(item_data, tuple) and len(item_data) == 2:
            scene_id, node_id = item_data
            if scene_id in self.scenes:
                scene = self.scenes[scene_id]
                for node in scene.nodes:
                    if node.id == node_id:
                        self.display_node_details(node)
                        break
                        
    def display_scene_details(self, scene: Scene):
        """显示场景详细信息"""
        details = f"场景ID: {scene.id}\n"
        details += f"标题: {scene.title}\n"
        details += f"节点数: {len(scene.nodes)}\n"
        
        # 添加节点列表
        details += "\n节点列表:\n"
        for i, node in enumerate(scene.nodes):
            details += f"{i+1}. {node.id}\n"
            
        self.detail_panel.SetValue(details)
        
    def display_node_details(self, node: SceneNode):
        """显示节点详细信息"""
        details = f"节点ID: {node.id}\n"
        details += f"角色名称: {node.elements.name or '无'}\n"
        details += f"对话文本: {node.elements.text}\n"
        details += f"背景图片: {node.elements.background or '无'}\n"
        
        if node.elements.sprite:
            details += "精灵图片:\n"
            for position, sprite in node.elements.sprite.items():
                if sprite:
                    details += f"  {position}: {sprite}\n"
                    
        if node.choices:
            details += "选项:\n"
            for i, choice in enumerate(node.choices):
                details += f"  {i+1}. {choice.text} -> {choice.next}\n"
                if choice.condition:
                    details += f"     条件: {choice.condition}\n"
                    
        if node.next:
            details += f"下一节点: {node.next}\n"
            
        if node.condition:
            details += f"条件: {node.condition}\n"
            
        self.detail_panel.SetValue(details)
        
        # 填充编辑字段
        self.node_id_text.SetValue(node.id)
        self.node_name_text.SetValue(node.elements.name or "")
        self.node_text_ctrl.SetValue(node.elements.text)
        self.background_text.SetValue(node.elements.background or "")
        
    def clear_edit_fields(self):
        """清空编辑字段"""
        self.node_id_text.SetValue("")
        self.node_name_text.SetValue("")
        self.node_text_ctrl.SetValue("")
        self.background_text.SetValue("")
        
    def on_node_selected(self, event):
        """当图形化视图中的节点被选中时"""
        node_id = event.node_id
        is_double_click = getattr(event, 'double_click', False)
        
        # 在树状图中选中对应的节点
        self.select_node_in_tree(node_id)
        
        # 只有在双击时才显示详细信息
        if is_double_click and self.current_scene:
            for node in self.current_scene.nodes:
                if node.id == node_id:
                    self.current_node = node
                    self.display_node_details(node)
                    # 切换到编辑选项卡
                    self.notebook.SetSelection(0)  # 详细信息选项卡
                    break
    
    def select_node_in_tree(self, node_id):
        """在树状图中选中指定的节点"""
        if not self.current_scene:
            return
            
        # 遍历树状图找到对应的节点并选中
        root = self.story_tree.GetRootItem()
        if not root.IsOk():
            return
            
        # 遍历场景节点
        child, cookie = self.story_tree.GetFirstChild(root)
        while child and child.IsOk():
            scene_id = self.story_tree.GetItemData(child)
            if scene_id == self.current_scene.id:
                # 找到当前场景，遍历其子节点
                node_child, node_cookie = self.story_tree.GetFirstChild(child)
                while node_child and node_child.IsOk():
                    item_data = self.story_tree.GetItemData(node_child)
                    if isinstance(item_data, tuple) and len(item_data) == 2:
                        _, item_node_id = item_data
                        if item_node_id == node_id:
                            # 选中该节点
                            self.story_tree.SelectItem(node_child)
                            self.story_tree.EnsureVisible(node_child)
                            return
                    node_child, node_cookie = self.story_tree.GetNextChild(child, node_cookie)
                break
            child, cookie = self.story_tree.GetNextChild(root, cookie)
            
        """在树状图中选中指定的节点"""
        if not self.current_scene:
            return
            
        # 遍历树状图找到对应的节点并选中
        root = self.story_tree.GetRootItem()
        if not root.IsOk():
            return
            
        # 遍历场景节点
        child, cookie = self.story_tree.GetFirstChild(root)
        while child and child.IsOk():
            scene_id = self.story_tree.GetItemData(child)
            if scene_id == self.current_scene.id:
                # 找到当前场景，遍历其子节点
                node_child, node_cookie = self.story_tree.GetFirstChild(child)
                while node_child and node_child.IsOk():
                    item_data = self.story_tree.GetItemData(node_child)
                    if isinstance(item_data, tuple) and len(item_data) == 2:
                        _, item_node_id = item_data
                        if item_node_id == node_id:
                            # 选中该节点
                            self.story_tree.SelectItem(node_child)
                            self.story_tree.EnsureVisible(node_child)
                            return
                    node_child, node_cookie = self.story_tree.GetNextChild(child, node_cookie)
                break
            child, cookie = self.story_tree.GetNextChild(root, cookie)
    def on_reset_view(self, event):
        """重置图形化视图"""
        self.graph_visualizer.scale = 1.0
        self.graph_visualizer.offset_x = 0
        self.graph_visualizer.offset_y = 0
        self.graph_visualizer.Refresh()
        
    def on_load(self, event):
        """重新加载场景"""
        self.load_scenes()
        
    def on_save(self, event):
        """保存修改"""
        if not self.current_scene:
            wx.MessageBox("请先选择一个场景", "提示", wx.OK | wx.ICON_INFORMATION)
            return
            
        if self.story_editor.save_scene(self.current_scene):
            wx.MessageBox("保存成功", "成功", wx.OK | wx.ICON_INFORMATION)
        else:
            wx.MessageBox("保存失败", "错误", wx.OK | wx.ICON_ERROR)
        
    def on_export(self, event):
        """导出为JSON格式"""
        with wx.FileDialog(self, "导出为JSON", wildcard="JSON files (*.json)|*.json",
                          style=wx.FD_SAVE | wx.FD_OVERWRITE_PROMPT) as dlg:
            if dlg.ShowModal() == wx.ID_OK:
                file_path = dlg.GetPath()
                try:
                    # 将数据类转换为字典以便JSON序列化
                    scenes_dict = {}
                    for scene_id, scene in self.scenes.items():
                        scenes_dict[scene_id] = {
                            'id': scene.id,
                            'title': scene.title,
                            'nodes': []
                        }
                        for node in scene.nodes:
                            node_dict = {
                                'id': node.id,
                                'elements': {
                                    'text': node.elements.text
                                }
                            }
                            if node.elements.background is not None:
                                node_dict['elements']['background'] = node.elements.background
                            if node.elements.name is not None:
                                node_dict['elements']['name'] = node.elements.name
                            if node.elements.sprite is not None:
                                node_dict['elements']['sprite'] = node.elements.sprite
                            if node.choices:
                                node_dict['choices'] = []
                                for choice in node.choices:
                                    choice_dict = {
                                        'text': choice.text,
                                        'next': choice.next
                                    }
                                    if choice.condition is not None:
                                        choice_dict['condition'] = choice.condition
                                    if choice.action is not None:
                                        choice_dict['action'] = choice.action
                                    node_dict['choices'].append(choice_dict)
                            if node.next is not None:
                                node_dict['next'] = node.next
                            if node.condition is not None:
                                node_dict['condition'] = node.condition
                            if node.action is not None:
                                node_dict['action'] = node.action
                            if node.autoNext:
                                node_dict['autoNext'] = node.autoNext
                            scenes_dict[scene_id]['nodes'].append(node_dict)
                    
                    with open(file_path, 'w', encoding='utf-8') as f:
                        json.dump(scenes_dict, f, ensure_ascii=False, indent=2)
                    wx.MessageBox(f"已导出到: {file_path}", "成功", wx.OK | wx.ICON_INFORMATION)
                except Exception as e:
                    wx.MessageBox(f"导出失败: {str(e)}", "错误", wx.OK | wx.ICON_ERROR)
    
    def on_add_node(self, event):
        """添加节点"""
        if not self.current_scene:
            wx.MessageBox("请先选择一个场景", "提示", wx.OK | wx.ICON_INFORMATION)
            return
            
        # 这里应该打开一个对话框来输入新节点的信息
        wx.MessageBox("添加节点功能将在后续版本中完善", "提示", wx.OK | wx.ICON_INFORMATION)
        
    def on_update_node(self, event):
        """更新节点"""
        if not self.current_node or not self.current_scene:
            wx.MessageBox("请先选择一个节点", "提示", wx.OK | wx.ICON_INFORMATION)
            return
            
        # 更新当前节点的信息
        self.current_node.elements.name = self.node_name_text.GetValue() or None
        self.current_node.elements.text = self.node_text_ctrl.GetValue()
        self.current_node.elements.background = self.background_text.GetValue() or None
        
        wx.MessageBox("节点信息已更新", "成功", wx.OK | wx.ICON_INFORMATION)
        
    def on_delete_node(self, event):
        """删除节点"""
        if not self.current_node or not self.current_scene:
            wx.MessageBox("请先选择一个节点", "提示", wx.OK | wx.ICON_INFORMATION)
            return
            
        result = wx.MessageBox(f"确定要删除节点 {self.current_node.id} 吗？", "确认删除",
                              wx.YES_NO | wx.ICON_QUESTION)
        if result == wx.YES:
            wx.MessageBox("删除节点功能将在后续版本中完善", "提示", wx.OK | wx.ICON_INFORMATION)
        
    def on_exit(self, event):
        """退出程序"""
        self.Close()

class StoryEditorApp(wx.App):
    def OnInit(self):
        frame = StoryEditorFrame()
        frame.Show()
        return True

def main():
    app = StoryEditorApp()
    app.MainLoop()

if __name__ == '__main__':
    main()