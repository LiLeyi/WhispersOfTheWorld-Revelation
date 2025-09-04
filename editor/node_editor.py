import wx
import json
from story_parser import SceneNode, SceneElement, Choice

class NodeEditorDialog(wx.Dialog):
    def __init__(self, parent, node: SceneNode = None):
        super().__init__(parent, title="编辑节点", size=(700, 600))
        self.node = node if node else self._create_default_node()
        self._init_ui()
        self._load_node_data()
        # 根据节点类型自动选择合适的选项卡
        self._select_appropriate_tab()
        
    def _create_default_node(self) -> SceneNode:
        """创建默认节点"""
        return SceneNode(
            id="",
            elements=SceneElement(
                background=None,
                music=None,
                bgm=None,
                name="",
                text="",
                sprite={"left": None, "right": None, "center": None}
            ),
            choices=[],
            next=None,
            autoNext=False,
            condition=None,
            actionCondition=None,
            action=None
        )
        
    def _init_ui(self):
        """初始化用户界面"""
        panel = wx.Panel(self)
        sizer = wx.BoxSizer(wx.VERTICAL)
        
        # 节点ID
        id_sizer = wx.BoxSizer(wx.HORIZONTAL)
        id_sizer.Add(wx.StaticText(panel, label="节点ID:"), 0, wx.ALL | wx.CENTER, 5)
        self.id_text = wx.TextCtrl(panel)
        id_sizer.Add(self.id_text, 1, wx.ALL | wx.EXPAND, 5)
        sizer.Add(id_sizer, 0, wx.EXPAND)
        
        # 创建选项卡
        self.notebook = wx.Notebook(panel)
        
        # 普通节点选项卡
        self._create_basic_tab()
        
        # 选项选项卡
        self._create_choices_tab()
        
        # 游戏选项卡
        self._create_game_tab()
        
        # 视频选项卡
        self._create_video_tab()
        
        sizer.Add(self.notebook, 1, wx.ALL | wx.EXPAND, 5)
        
        # 按钮
        btn_sizer = wx.BoxSizer(wx.HORIZONTAL)
        ok_btn = wx.Button(panel, wx.ID_OK, "确定")
        cancel_btn = wx.Button(panel, wx.ID_CANCEL, "取消")
        btn_sizer.Add(ok_btn, 0, wx.ALL, 5)
        btn_sizer.Add(cancel_btn, 0, wx.ALL, 5)
        sizer.Add(btn_sizer, 0, wx.ALIGN_CENTER)
        
        # 绑定确定按钮事件
        ok_btn.Bind(wx.EVT_BUTTON, self.on_ok)
        
        panel.SetSizer(sizer)
        
    def _select_appropriate_tab(self):
        """根据节点类型自动选择合适的选项卡"""
        # 优先级顺序: video > game > choices > basic
        if hasattr(self.node, 'video') and self.node.video:
            # 视频节点
            self.notebook.SetSelection(3)  # 视频选项卡
        elif hasattr(self.node, 'game') and self.node.game:
            # 游戏节点
            self.notebook.SetSelection(2)  # 游戏选项卡
        elif self.node.choices:
            # 选项节点
            self.notebook.SetSelection(1)  # 选项选项卡
        else:
            # 普通节点
            self.notebook.SetSelection(0)  # 普通节点选项卡

    def _create_basic_tab(self):
        """创建普通节点选项卡"""
        basic_panel = wx.Panel(self.notebook)
        basic_sizer = wx.BoxSizer(wx.VERTICAL)
        
        # 场景元素部分
        elements_box = wx.StaticBox(basic_panel, label="场景元素")
        elements_sizer = wx.StaticBoxSizer(elements_box, wx.VERTICAL)
        
        # 背景
        bg_sizer = wx.BoxSizer(wx.HORIZONTAL)
        bg_sizer.Add(wx.StaticText(basic_panel, label="背景:"), 0, wx.ALL | wx.CENTER, 5)
        self.bg_text = wx.TextCtrl(basic_panel)
        bg_sizer.Add(self.bg_text, 1, wx.ALL | wx.EXPAND, 5)
        elements_sizer.Add(bg_sizer, 0, wx.EXPAND)
        
        # 音乐
        music_sizer = wx.BoxSizer(wx.HORIZONTAL)
        music_sizer.Add(wx.StaticText(basic_panel, label="音乐:"), 0, wx.ALL | wx.CENTER, 5)
        self.music_text = wx.TextCtrl(basic_panel)
        music_sizer.Add(self.music_text, 1, wx.ALL | wx.EXPAND, 5)
        elements_sizer.Add(music_sizer, 0, wx.EXPAND)
        
        # BGM
        bgm_sizer = wx.BoxSizer(wx.HORIZONTAL)
        bgm_sizer.Add(wx.StaticText(basic_panel, label="BGM:"), 0, wx.ALL | wx.CENTER, 5)
        self.bgm_text = wx.TextCtrl(basic_panel)
        bgm_sizer.Add(self.bgm_text, 1, wx.ALL | wx.EXPAND, 5)
        elements_sizer.Add(bgm_sizer, 0, wx.EXPAND)
        
        # 名称
        name_sizer = wx.BoxSizer(wx.HORIZONTAL)
        name_sizer.Add(wx.StaticText(basic_panel, label="名称:"), 0, wx.ALL | wx.CENTER, 5)
        self.name_text = wx.TextCtrl(basic_panel)
        name_sizer.Add(self.name_text, 1, wx.ALL | wx.EXPAND, 5)
        elements_sizer.Add(name_sizer, 0, wx.EXPAND)
        
        # 文本
        text_sizer = wx.BoxSizer(wx.HORIZONTAL)
        text_sizer.Add(wx.StaticText(basic_panel, label="文本:"), 0, wx.ALL | wx.CENTER, 5)
        self.text_text = wx.TextCtrl(basic_panel, style=wx.TE_MULTILINE, size=(-1, 100))
        text_sizer.Add(self.text_text, 1, wx.ALL | wx.EXPAND, 5)
        elements_sizer.Add(text_sizer, 0, wx.EXPAND)
        
        # 立绘部分
        sprite_box = wx.StaticBox(basic_panel, label="角色立绘")
        sprite_sizer = wx.StaticBoxSizer(sprite_box, wx.VERTICAL)
        
        # 左侧立绘
        left_sizer = wx.BoxSizer(wx.HORIZONTAL)
        left_sizer.Add(wx.StaticText(basic_panel, label="左侧:"), 0, wx.ALL | wx.CENTER, 5)
        self.left_sprite_text = wx.TextCtrl(basic_panel)
        left_sizer.Add(self.left_sprite_text, 1, wx.ALL | wx.EXPAND, 5)
        sprite_sizer.Add(left_sizer, 0, wx.EXPAND)
        
        # 右侧立绘
        right_sizer = wx.BoxSizer(wx.HORIZONTAL)
        right_sizer.Add(wx.StaticText(basic_panel, label="右侧:"), 0, wx.ALL | wx.CENTER, 5)
        self.right_sprite_text = wx.TextCtrl(basic_panel)
        right_sizer.Add(self.right_sprite_text, 1, wx.ALL | wx.EXPAND, 5)
        sprite_sizer.Add(right_sizer, 0, wx.EXPAND)
        
        # 中间立绘
        center_sizer = wx.BoxSizer(wx.HORIZONTAL)
        center_sizer.Add(wx.StaticText(basic_panel, label="中间:"), 0, wx.ALL | wx.CENTER, 5)
        self.center_sprite_text = wx.TextCtrl(basic_panel)
        center_sizer.Add(self.center_sprite_text, 1, wx.ALL | wx.EXPAND, 5)
        sprite_sizer.Add(center_sizer, 0, wx.EXPAND)
        
        elements_sizer.Add(sprite_sizer, 0, wx.EXPAND)
        basic_sizer.Add(elements_sizer, 0, wx.EXPAND | wx.ALL, 5)
        
        # 其他属性
        other_box = wx.StaticBox(basic_panel, label="其他属性")
        other_sizer = wx.StaticBoxSizer(other_box, wx.VERTICAL)
        
        # 下一节点
        next_sizer = wx.BoxSizer(wx.HORIZONTAL)
        next_sizer.Add(wx.StaticText(basic_panel, label="下一节点:"), 0, wx.ALL | wx.CENTER, 5)
        self.next_text = wx.TextCtrl(basic_panel)
        next_sizer.Add(self.next_text, 1, wx.ALL | wx.EXPAND, 5)
        other_sizer.Add(next_sizer, 0, wx.EXPAND)
        
        # 自动跳转
        auto_sizer = wx.BoxSizer(wx.HORIZONTAL)
        self.auto_check = wx.CheckBox(basic_panel, label="自动跳转")
        auto_sizer.Add(self.auto_check, 0, wx.ALL, 5)
        other_sizer.Add(auto_sizer, 0, wx.EXPAND)
        
        # 条件
        condition_sizer = wx.BoxSizer(wx.HORIZONTAL)
        condition_sizer.Add(wx.StaticText(basic_panel, label="条件:"), 0, wx.ALL | wx.CENTER, 5)
        self.condition_text = wx.TextCtrl(basic_panel)
        condition_sizer.Add(self.condition_text, 1, wx.ALL | wx.EXPAND, 5)
        other_sizer.Add(condition_sizer, 0, wx.EXPAND)
        
        # 动作条件
        action_condition_sizer = wx.BoxSizer(wx.HORIZONTAL)
        action_condition_sizer.Add(wx.StaticText(basic_panel, label="动作条件:"), 0, wx.ALL | wx.CENTER, 5)
        self.action_condition_text = wx.TextCtrl(basic_panel)
        action_condition_sizer.Add(self.action_condition_text, 1, wx.ALL | wx.EXPAND, 5)
        other_sizer.Add(action_condition_sizer, 0, wx.EXPAND)
        
        # 动作
        action_sizer = wx.BoxSizer(wx.HORIZONTAL)
        action_sizer.Add(wx.StaticText(basic_panel, label="动作:"), 0, wx.ALL | wx.CENTER, 5)
        self.action_text = wx.TextCtrl(basic_panel, style=wx.TE_MULTILINE, size=(-1, 80))
        action_sizer.Add(self.action_text, 1, wx.ALL | wx.EXPAND, 5)
        other_sizer.Add(action_sizer, 0, wx.EXPAND)
        
        basic_sizer.Add(other_sizer, 0, wx.EXPAND | wx.ALL, 5)
        
        basic_panel.SetSizer(basic_sizer)
        self.notebook.AddPage(basic_panel, "普通节点")
        
    def _create_choices_tab(self):
        """创建选项选项卡"""
        choices_panel = wx.Panel(self.notebook)
        choices_sizer = wx.BoxSizer(wx.VERTICAL)
        
        # 选项部分
        choices_box = wx.StaticBox(choices_panel, label="选项")
        choices_sizer_box = wx.StaticBoxSizer(choices_box, wx.VERTICAL)
        
        # 增加ListCtrl的高度
        self.choices_list = wx.ListCtrl(choices_panel, style=wx.LC_REPORT | wx.LC_SINGLE_SEL, size=(-1, 150))
        self.choices_list.AppendColumn("文本", width=150)
        self.choices_list.AppendColumn("下一节点", width=150)
        choices_sizer_box.Add(self.choices_list, 1, wx.ALL | wx.EXPAND, 5)
        
        # 选项按钮 - 使用更合适的布局和大小
        choice_btn_sizer = wx.BoxSizer(wx.HORIZONTAL)
        self.add_choice_btn = wx.Button(choices_panel, label="添加选项")
        self.add_choice_btn.SetMinSize((80, 30))  # 设置最小大小
        self.edit_choice_btn = wx.Button(choices_panel, label="编辑选项")
        self.edit_choice_btn.SetMinSize((80, 30))  # 设置最小大小
        self.delete_choice_btn = wx.Button(choices_panel, label="删除选项")
        self.delete_choice_btn.SetMinSize((80, 30))  # 设置最小大小
        
        self.add_choice_btn.Bind(wx.EVT_BUTTON, self.on_add_choice)
        self.edit_choice_btn.Bind(wx.EVT_BUTTON, self.on_edit_choice)
        self.delete_choice_btn.Bind(wx.EVT_BUTTON, self.on_delete_choice)
        
        choice_btn_sizer.Add(self.add_choice_btn, 0, wx.ALL | wx.ALIGN_CENTER_VERTICAL, 5)
        choice_btn_sizer.Add(self.edit_choice_btn, 0, wx.ALL | wx.ALIGN_CENTER_VERTICAL, 5)
        choice_btn_sizer.Add(self.delete_choice_btn, 0, wx.ALL | wx.ALIGN_CENTER_VERTICAL, 5)
        choices_sizer_box.Add(choice_btn_sizer, 0, wx.ALIGN_RIGHT | wx.ALL, 5)
        
        choices_sizer.Add(choices_sizer_box, 0, wx.EXPAND | wx.ALL, 5)
        
        # 为选项节点也添加场景元素配置
        elements_box = wx.StaticBox(choices_panel, label="选项节点场景元素")
        elements_sizer = wx.StaticBoxSizer(elements_box, wx.VERTICAL)
        
        # 背景
        bg_sizer = wx.BoxSizer(wx.HORIZONTAL)
        bg_sizer.Add(wx.StaticText(choices_panel, label="背景:"), 0, wx.ALL | wx.CENTER, 5)
        self.choice_bg_text = wx.TextCtrl(choices_panel)
        bg_sizer.Add(self.choice_bg_text, 1, wx.ALL | wx.EXPAND, 5)
        elements_sizer.Add(bg_sizer, 0, wx.EXPAND)
        
        # 音乐
        music_sizer = wx.BoxSizer(wx.HORIZONTAL)
        music_sizer.Add(wx.StaticText(choices_panel, label="音乐:"), 0, wx.ALL | wx.CENTER, 5)
        self.choice_music_text = wx.TextCtrl(choices_panel)
        music_sizer.Add(self.choice_music_text, 1, wx.ALL | wx.EXPAND, 5)
        elements_sizer.Add(music_sizer, 0, wx.EXPAND)
        
        # BGM
        bgm_sizer = wx.BoxSizer(wx.HORIZONTAL)
        bgm_sizer.Add(wx.StaticText(choices_panel, label="BGM:"), 0, wx.ALL | wx.CENTER, 5)
        self.choice_bgm_text = wx.TextCtrl(choices_panel)
        bgm_sizer.Add(self.choice_bgm_text, 1, wx.ALL | wx.EXPAND, 5)
        elements_sizer.Add(bgm_sizer, 0, wx.EXPAND)
        
        # 名称
        name_sizer = wx.BoxSizer(wx.HORIZONTAL)
        name_sizer.Add(wx.StaticText(choices_panel, label="名称:"), 0, wx.ALL | wx.CENTER, 5)
        self.choice_name_text = wx.TextCtrl(choices_panel)
        name_sizer.Add(self.choice_name_text, 1, wx.ALL | wx.EXPAND, 5)
        elements_sizer.Add(name_sizer, 0, wx.EXPAND)
        
        # 文本
        text_sizer = wx.BoxSizer(wx.HORIZONTAL)
        text_sizer.Add(wx.StaticText(choices_panel, label="文本:"), 0, wx.ALL | wx.CENTER, 5)
        self.choice_text_text = wx.TextCtrl(choices_panel, style=wx.TE_MULTILINE, size=(-1, 100))
        text_sizer.Add(self.choice_text_text, 1, wx.ALL | wx.EXPAND, 5)
        elements_sizer.Add(text_sizer, 0, wx.EXPAND)
        
        # 立绘部分
        sprite_box = wx.StaticBox(choices_panel, label="角色立绘")
        sprite_sizer = wx.StaticBoxSizer(sprite_box, wx.VERTICAL)
        
        # 左侧立绘
        left_sizer = wx.BoxSizer(wx.HORIZONTAL)
        left_sizer.Add(wx.StaticText(choices_panel, label="左侧:"), 0, wx.ALL | wx.CENTER, 5)
        self.choice_left_sprite_text = wx.TextCtrl(choices_panel)
        left_sizer.Add(self.choice_left_sprite_text, 1, wx.ALL | wx.EXPAND, 5)
        sprite_sizer.Add(left_sizer, 0, wx.EXPAND)
        
        # 右侧立绘
        right_sizer = wx.BoxSizer(wx.HORIZONTAL)
        right_sizer.Add(wx.StaticText(choices_panel, label="右侧:"), 0, wx.ALL | wx.CENTER, 5)
        self.choice_right_sprite_text = wx.TextCtrl(choices_panel)
        right_sizer.Add(self.choice_right_sprite_text, 1, wx.ALL | wx.EXPAND, 5)
        sprite_sizer.Add(right_sizer, 0, wx.EXPAND)
        
        # 中间立绘
        center_sizer = wx.BoxSizer(wx.HORIZONTAL)
        center_sizer.Add(wx.StaticText(choices_panel, label="中间:"), 0, wx.ALL | wx.CENTER, 5)
        self.choice_center_sprite_text = wx.TextCtrl(choices_panel)
        center_sizer.Add(self.choice_center_sprite_text, 1, wx.ALL | wx.EXPAND, 5)
        sprite_sizer.Add(center_sizer, 0, wx.EXPAND)
        
        elements_sizer.Add(sprite_sizer, 0, wx.EXPAND)
        choices_sizer.Add(elements_sizer, 0, wx.EXPAND | wx.ALL, 5)
        
        choices_panel.SetSizer(choices_sizer)
        self.notebook.AddPage(choices_panel, "选项节点")
        
    def _create_game_tab(self):
        """创建游戏选项卡"""
        game_panel = wx.Panel(self.notebook)
        game_sizer = wx.BoxSizer(wx.VERTICAL)
        
        game_box = wx.StaticBox(game_panel, label="小游戏配置")
        game_sizer_box = wx.StaticBoxSizer(game_box, wx.VERTICAL)
        
        # 游戏ID
        game_id_sizer = wx.BoxSizer(wx.HORIZONTAL)
        game_id_sizer.Add(wx.StaticText(game_panel, label="游戏ID:"), 0, wx.ALL | wx.CENTER, 5)
        self.game_id_text = wx.TextCtrl(game_panel)
        game_id_sizer.Add(self.game_id_text, 1, wx.ALL | wx.EXPAND, 5)
        game_sizer_box.Add(game_id_sizer, 0, wx.EXPAND)
        
        # 游戏配置
        config_sizer = wx.BoxSizer(wx.HORIZONTAL)
        config_sizer.Add(wx.StaticText(game_panel, label="游戏配置:"), 0, wx.ALL | wx.CENTER, 5)
        self.game_config_text = wx.TextCtrl(game_panel, style=wx.TE_MULTILINE, size=(-1, 100))
        config_sizer.Add(self.game_config_text, 1, wx.ALL | wx.EXPAND, 5)
        game_sizer_box.Add(config_sizer, 0, wx.EXPAND)
        
        # 分数跳转配置
        score_box = wx.StaticBox(game_panel, label="分数跳转配置")
        score_sizer_box = wx.StaticBoxSizer(score_box, wx.VERTICAL)
        
        # 增加分数跳转列表的高度
        self.score_list = wx.ListCtrl(game_panel, style=wx.LC_REPORT | wx.LC_SINGLE_SEL, size=(-1, 100))
        self.score_list.AppendColumn("条件", width=200)
        self.score_list.AppendColumn("下一节点", width=150)
        score_sizer_box.Add(self.score_list, 1, wx.ALL | wx.EXPAND, 5)
        
        # 分数跳转按钮
        score_btn_sizer = wx.BoxSizer(wx.HORIZONTAL)
        self.add_score_btn = wx.Button(game_panel, label="添加分数跳转")
        self.add_score_btn.SetMinSize((100, 30))  # 设置最小大小
        self.edit_score_btn = wx.Button(game_panel, label="编辑分数跳转")
        self.edit_score_btn.SetMinSize((100, 30))  # 设置最小大小
        self.delete_score_btn = wx.Button(game_panel, label="删除分数跳转")
        self.delete_score_btn.SetMinSize((100, 30))  # 设置最小大小
        
        self.add_score_btn.Bind(wx.EVT_BUTTON, self.on_add_score)
        self.edit_score_btn.Bind(wx.EVT_BUTTON, self.on_edit_score)
        self.delete_score_btn.Bind(wx.EVT_BUTTON, self.on_delete_score)
        
        score_btn_sizer.Add(self.add_score_btn, 0, wx.ALL, 5)
        score_btn_sizer.Add(self.edit_score_btn, 0, wx.ALL, 5)
        score_btn_sizer.Add(self.delete_score_btn, 0, wx.ALL, 5)
        score_sizer_box.Add(score_btn_sizer, 0, wx.ALIGN_RIGHT)
        
        game_sizer_box.Add(score_sizer_box, 1, wx.EXPAND)
        
        game_sizer.Add(game_sizer_box, 1, wx.EXPAND | wx.ALL, 5)
        
        game_panel.SetSizer(game_sizer)
        self.notebook.AddPage(game_panel, "游戏节点")
        
    def _create_video_tab(self):
        """创建视频选项卡"""
        video_panel = wx.Panel(self.notebook)
        video_sizer = wx.BoxSizer(wx.VERTICAL)
        
        video_box = wx.StaticBox(video_panel, label="视频配置")
        video_sizer_box = wx.StaticBoxSizer(video_box, wx.VERTICAL)
        
        # 视频路径
        video_path_sizer = wx.BoxSizer(wx.HORIZONTAL)
        video_path_sizer.Add(wx.StaticText(video_panel, label="视频路径:"), 0, wx.ALL | wx.CENTER, 5)
        self.video_path_text = wx.TextCtrl(video_panel)
        video_path_sizer.Add(self.video_path_text, 1, wx.ALL | wx.EXPAND, 5)
        video_sizer_box.Add(video_path_sizer, 0, wx.EXPAND)
        
        video_sizer.Add(video_sizer_box, 1, wx.EXPAND | wx.ALL, 5)
        
        video_panel.SetSizer(video_sizer)
        self.notebook.AddPage(video_panel, "视频节点")
        
    def _load_node_data(self):
        """加载节点数据到界面"""
        self.id_text.SetValue(self.node.id)
        
        # 加载场景元素
        elements = self.node.elements
        if elements:
            self.bg_text.SetValue(elements.background or "")
            self.music_text.SetValue(elements.music or "")
            self.bgm_text.SetValue(elements.bgm or "")
            self.name_text.SetValue(elements.name or "")
            self.text_text.SetValue(elements.text or "")
            
            # 加载立绘
            sprite = elements.sprite
            if sprite:
                self.left_sprite_text.SetValue(sprite.get("left", "") or "")
                self.right_sprite_text.SetValue(sprite.get("right", "") or "")
                self.center_sprite_text.SetValue(sprite.get("center", "") or "")
                
            # 为选项节点也加载相同的场景元素
            self.choice_bg_text.SetValue(elements.background or "")
            self.choice_music_text.SetValue(elements.music or "")
            self.choice_bgm_text.SetValue(elements.bgm or "")
            self.choice_name_text.SetValue(elements.name or "")
            self.choice_text_text.SetValue(elements.text or "")
            
            # 加载选项节点的立绘
            if sprite:
                self.choice_left_sprite_text.SetValue(sprite.get("left", "") or "")
                self.choice_right_sprite_text.SetValue(sprite.get("right", "") or "")
                self.choice_center_sprite_text.SetValue(sprite.get("center", "") or "")
        
        # 加载选项
        if self.node.choices:
            for choice in self.node.choices:
                index = self.choices_list.InsertItem(self.choices_list.GetItemCount(), choice.text)
                self.choices_list.SetItem(index, 1, choice.next or "")
        
        # 加载分数跳转
        if hasattr(self.node, 'game') and self.node.game and 'end' in self.node.game:
            for score in self.node.game['end']:
                index = self.score_list.InsertItem(self.score_list.GetItemCount(), str(score.get('condition', '')))
                self.score_list.SetItem(index, 1, score.get('next', ''))
        
        # 加载其他属性
        self.next_text.SetValue(self.node.next or "")
        self.auto_check.SetValue(self.node.autoNext)
        self.condition_text.SetValue(self.node.condition or "")
        self.action_condition_text.SetValue(self.node.actionCondition or "")
        self.action_text.SetValue(self.node.action or "")
        
        # 加载游戏属性
        if hasattr(self.node, 'game') and self.node.game:
            self.game_id_text.SetValue(self.node.game.get('id', ''))
            # 将游戏配置转换为字符串显示
            config = self.node.game.get('config', {})
            self.game_config_text.SetValue(str(config) if config else "")
        
        # 加载视频属性
        if hasattr(self.node, 'video'):
            self.video_path_text.SetValue(self.node.video or "")
            
    def _save_node_data(self):
        """从界面保存节点数据"""
        self.node.id = self.id_text.GetValue()
        
        # 保存场景元素
        if not self.node.elements:
            self.node.elements = SceneElement()
            
        self.node.elements.background = self.bg_text.GetValue() or None
        self.node.elements.music = self.music_text.GetValue() or None
        self.node.elements.bgm = self.bgm_text.GetValue() or None
        self.node.elements.name = self.name_text.GetValue() or None
        self.node.elements.text = self.text_text.GetValue() or ""
        
        # 保存立绘
        if not self.node.elements.sprite:
            self.node.elements.sprite = {"left": None, "right": None, "center": None}
            
        self.node.elements.sprite["left"] = self.left_sprite_text.GetValue() or None
        self.node.elements.sprite["right"] = self.right_sprite_text.GetValue() or None
        self.node.elements.sprite["center"] = self.center_sprite_text.GetValue() or None
        
        # 保存选项
        # 注意：选项已经在 on_add_choice, on_edit_choice 中处理
        
        # 保存其他属性
        next_value = self.next_text.GetValue() or None
        # 检查next跳转目标是否存在
        if next_value:
            if not self._check_node_or_chapter_exists(next_value):
                result = wx.MessageBox(
                    f"next跳转目标 '{next_value}' 不存在，是否继续保存？", 
                    "警告", 
                    wx.YES_NO | wx.ICON_WARNING
                )
                if result == wx.NO:
                    return False
        
        self.node.next = next_value
        self.node.autoNext = self.auto_check.GetValue()
        self.node.condition = self.condition_text.GetValue() or None
        self.node.actionCondition = self.action_condition_text.GetValue() or None
        self.node.action = self.action_text.GetValue() or None
        
        # 保存游戏属性
        game_id = self.game_id_text.GetValue()
        game_config = self.game_config_text.GetValue()
        if game_id:
            if not hasattr(self.node, 'game') or not self.node.game:
                self.node.game = {}
            self.node.game['id'] = game_id
            # 这里我们只保存配置的字符串表示，实际使用时需要在代码中解析
            self.node.game['config'] = game_config if game_config else {}
        else:
            self.node.game = None
        
        # 保存视频属性
        video_path = self.video_path_text.GetValue()
        self.node.video = video_path if video_path else None
        
        return True
        
    def _check_node_or_chapter_exists(self, target):
        """检查节点或章节是否存在"""
        # 获取主窗口
        parent = self.GetParent()
        if hasattr(parent, 'scenes'):
            scenes = parent.scenes
        else:
            # 如果从图形视图打开，需要获取主窗口
            main_window = parent.GetParent()
            if hasattr(main_window, 'scenes'):
                scenes = main_window.scenes
            else:
                return True  # 无法检查，假设存在
                
        # 收集所有节点ID
        all_node_ids = set()
        for scene_id, scene in scenes.items():
            for node in scene.nodes:
                all_node_ids.add(node.id)
                
        # 检查是否是章节跳转
        if target.startswith("chapter_"):
            # 检查章节是否存在
            # 章节格式通常是 chapter_X_scene_Y
            for scene_id in scenes.keys():
                # 检查目标是否与场景ID匹配（完全匹配或作为前缀）
                if scene_id == target or scene_id.startswith(target + "_"):
                    return True
            return False
        else:
            # 检查节点是否存在
            return target in all_node_ids
            
    def get_node(self) -> SceneNode:
        """获取编辑后的节点"""
        if not self._save_node_data():
            # 如果保存被取消，返回原始节点
            return self.node
        return self.node
        
    def refresh_visualization(self):
        """刷新父窗口的可视化图，保持当前视图位置不变"""
        parent = self.GetParent()
        if hasattr(parent, 'graph_visualizer') and hasattr(parent, 'current_scene'):
            if parent.current_scene:
                # 保存当前视图位置和缩放
                old_scale = parent.graph_visualizer.scale
                old_offset_x = parent.graph_visualizer.offset_x
                old_offset_y = parent.graph_visualizer.offset_y
                selected_node = parent.graph_visualizer.selected_node
                
                # 刷新场景
                parent.graph_visualizer.set_scene(parent.current_scene)
                
                # 恢复视图位置和缩放
                parent.graph_visualizer.scale = old_scale
                parent.graph_visualizer.offset_x = old_offset_x
                parent.graph_visualizer.offset_y = old_offset_y
                parent.graph_visualizer.selected_node = selected_node
                parent.graph_visualizer.Refresh()
        # 如果父窗口是图形可视化器本身（从节点图形视图打开）
        elif hasattr(parent, 'set_scene') and hasattr(parent.GetParent(), 'current_scene'):
            main_window = parent.GetParent()
            if hasattr(main_window, 'current_scene') and main_window.current_scene:
                # 保存当前视图位置和缩放
                old_scale = parent.scale
                old_offset_x = parent.offset_x
                old_offset_y = parent.offset_y
                selected_node = parent.selected_node
                
                # 刷新场景
                parent.set_scene(main_window.current_scene)
                
                # 恢复视图位置和缩放
                parent.scale = old_scale
                parent.offset_x = old_offset_x
                parent.offset_y = old_offset_y
                parent.selected_node = selected_node
                parent.Refresh()
        
    def on_add_choice(self, event):
        """添加选项"""
        dialog = ChoiceEditorDialog(self)
        if dialog.ShowModal() == wx.ID_OK:
            choice = dialog.get_choice()
            index = self.choices_list.InsertItem(self.choices_list.GetItemCount(), choice.text)
            self.choices_list.SetItem(index, 1, choice.next or "")
            
            # 添加到节点
            if not self.node.choices:
                self.node.choices = []
            self.node.choices.append(choice)
            
            # 刷新可视化图
            self.refresh_visualization()
            
        dialog.Destroy()
        
    def on_edit_choice(self, event):
        """编辑选项"""
        selected = self.choices_list.GetFirstSelected()
        if selected == -1:
            wx.MessageBox("请选择一个选项进行编辑", "提示", wx.OK | wx.ICON_INFORMATION)
            return
            
        if not self.node.choices or selected >= len(self.node.choices):
            wx.MessageBox("选项数据错误", "错误", wx.OK | wx.ICON_ERROR)
            return
            
        choice = self.node.choices[selected]
        dialog = ChoiceEditorDialog(self, choice)
        if dialog.ShowModal() == wx.ID_OK:
            updated_choice = dialog.get_choice()
            self.node.choices[selected] = updated_choice
            self.choices_list.SetItem(selected, 0, updated_choice.text)
            self.choices_list.SetItem(selected, 1, updated_choice.next or "")
            
            # 刷新可视化图
            self.refresh_visualization()
            
        dialog.Destroy()
        
    def on_delete_choice(self, event):
        """删除选项"""
        selected = self.choices_list.GetFirstSelected()
        if selected == -1:
            wx.MessageBox("请选择一个选项进行删除", "提示", wx.OK | wx.ICON_INFORMATION)
            return
            
        if self.node.choices and selected < len(self.node.choices):
            del self.node.choices[selected]
            self.choices_list.DeleteItem(selected)
            
            # 刷新可视化图
            self.refresh_visualization()

    def on_add_score(self, event):
        """添加分数跳转"""
        dialog = ScoreJumpEditorDialog(self)
        if dialog.ShowModal() == wx.ID_OK:
            score = dialog.get_score()
            index = self.score_list.InsertItem(self.score_list.GetItemCount(), str(score['condition']))
            self.score_list.SetItem(index, 1, score['next'])
            
            # 添加到节点
            if not hasattr(self.node, 'game'):
                self.node.game = {}
            if 'end' not in self.node.game:
                self.node.game['end'] = []
            self.node.game['end'].append(score)
            
            # 刷新可视化图
            self.refresh_visualization()
            
        dialog.Destroy()
        
    def on_edit_score(self, event):
        """编辑分数跳转"""
        selected = self.score_list.GetFirstSelected()
        if selected == -1:
            wx.MessageBox("请选择一个分数跳转进行编辑", "提示", wx.OK | wx.ICON_INFORMATION)
            return
            
        if not hasattr(self.node, 'game') or 'end' not in self.node.game or selected >= len(self.node.game['end']):
            wx.MessageBox("分数跳转数据错误", "错误", wx.OK | wx.ICON_ERROR)
            return
            
        score = self.node.game['end'][selected]
        dialog = ScoreJumpEditorDialog(self, score)
        if dialog.ShowModal() == wx.ID_OK:
            updated_score = dialog.get_score()
            self.node.game['end'][selected] = updated_score
            self.score_list.SetItem(selected, 0, str(updated_score['condition']))
            self.score_list.SetItem(selected, 1, updated_score['next'])
            
            # 刷新可视化图
            self.refresh_visualization()
            
        dialog.Destroy()
        
    def on_delete_score(self, event):
        """删除分数跳转"""
        selected = self.score_list.GetFirstSelected()
        if selected == -1:
            wx.MessageBox("请选择一个分数跳转进行删除", "提示", wx.OK | wx.ICON_INFORMATION)
            return
            
        if hasattr(self.node, 'game') and 'end' in self.node.game and selected < len(self.node.game['end']):
            del self.node.game['end'][selected]
            self.score_list.DeleteItem(selected)
            
            # 刷新可视化图
            self.refresh_visualization()
            
    def on_ok(self, event):
        """处理确定按钮点击事件"""
        # 刷新可视化图
        self.refresh_visualization()
        # 关闭对话框
        self.EndModal(wx.ID_OK)

class ChoiceEditorDialog(wx.Dialog):
    def __init__(self, parent, choice: Choice = None):
        super().__init__(parent, title="编辑选项", size=(400, 300))
        self.parent = parent
        self.choice = choice if choice else Choice(text="", next="")
        self._init_ui()
        self._load_choice_data()
        
    def _init_ui(self):
        """初始化用户界面"""
        panel = wx.Panel(self)
        sizer = wx.BoxSizer(wx.VERTICAL)
        
        # 选项文本
        text_sizer = wx.BoxSizer(wx.HORIZONTAL)
        text_sizer.Add(wx.StaticText(panel, label="选项文本:"), 0, wx.ALL | wx.CENTER, 5)
        self.text_ctrl = wx.TextCtrl(panel)
        text_sizer.Add(self.text_ctrl, 1, wx.ALL | wx.EXPAND, 5)
        sizer.Add(text_sizer, 0, wx.EXPAND)
        
        # 下一节点
        next_sizer = wx.BoxSizer(wx.HORIZONTAL)
        next_sizer.Add(wx.StaticText(panel, label="下一节点:"), 0, wx.ALL | wx.CENTER, 5)
        self.next_ctrl = wx.TextCtrl(panel)
        next_sizer.Add(self.next_ctrl, 1, wx.ALL | wx.EXPAND, 5)
        sizer.Add(next_sizer, 0, wx.EXPAND)
        
        # 条件
        condition_sizer = wx.BoxSizer(wx.HORIZONTAL)
        condition_sizer.Add(wx.StaticText(panel, label="条件:"), 0, wx.ALL | wx.CENTER, 5)
        self.condition_ctrl = wx.TextCtrl(panel)
        condition_sizer.Add(self.condition_ctrl, 1, wx.ALL | wx.EXPAND, 5)
        sizer.Add(condition_sizer, 0, wx.EXPAND)
        
        # 动作
        action_sizer = wx.BoxSizer(wx.HORIZONTAL)
        action_sizer.Add(wx.StaticText(panel, label="动作:"), 0, wx.ALL | wx.CENTER, 5)
        self.action_ctrl = wx.TextCtrl(panel, style=wx.TE_MULTILINE, size=(-1, 80))
        action_sizer.Add(self.action_ctrl, 1, wx.ALL | wx.EXPAND, 5)
        sizer.Add(action_sizer, 0, wx.EXPAND)
        
        # 按钮
        btn_sizer = wx.BoxSizer(wx.HORIZONTAL)
        ok_btn = wx.Button(panel, wx.ID_OK, "确定")
        cancel_btn = wx.Button(panel, wx.ID_CANCEL, "取消")
        btn_sizer.Add(ok_btn, 0, wx.ALL, 5)
        btn_sizer.Add(cancel_btn, 0, wx.ALL, 5)
        sizer.Add(btn_sizer, 0, wx.ALIGN_CENTER)
        
        # 绑定事件
        ok_btn.Bind(wx.EVT_BUTTON, self.on_ok)
        
        panel.SetSizer(sizer)
        
    def _load_choice_data(self):
        """加载选项数据到界面"""
        self.text_ctrl.SetValue(self.choice.text)
        self.next_ctrl.SetValue(self.choice.next)
        if hasattr(self.choice, 'condition'):
            self.condition_ctrl.SetValue(self.choice.condition or "")
        if hasattr(self.choice, 'action'):
            self.action_ctrl.SetValue(self.choice.action or "")
            
    def _check_node_or_chapter_exists(self, target):
        """检查节点或章节是否存在"""
        # 获取主窗口
        parent = self.parent
        while parent and not hasattr(parent, 'scenes'):
            parent = parent.GetParent()
            
        if parent and hasattr(parent, 'scenes'):
            scenes = parent.scenes
        else:
            return True  # 无法检查，假设存在
                
        # 收集所有节点ID
        all_node_ids = set()
        for scene_id, scene in scenes.items():
            for node in scene.nodes:
                all_node_ids.add(node.id)
                
        # 检查是否是章节跳转
        if target.startswith("chapter_"):
            # 检查章节是否存在
            # 章节格式通常是 chapter_X_scene_Y
            for scene_id in scenes.keys():
                # 检查目标是否与场景ID匹配（完全匹配或作为前缀）
                if scene_id == target or scene_id.startswith(target + "_"):
                    return True
            return False
        else:
            # 检查节点是否存在
            return target in all_node_ids
            
    def on_ok(self, event):
        """处理确定按钮点击事件"""
        next_value = self.next_ctrl.GetValue()
        # 检查跳转目标是否存在
        if next_value and not self._check_node_or_chapter_exists(next_value):
            result = wx.MessageBox(
                f"选项跳转目标 '{next_value}' 不存在，是否继续保存？", 
                "警告", 
                wx.YES_NO | wx.ICON_WARNING
            )
            if result == wx.NO:
                return  # 取消保存
                
        # 保存数据
        self.choice.text = self.text_ctrl.GetValue()
        self.choice.next = next_value
        self.choice.condition = self.condition_ctrl.GetValue() or None
        self.choice.action = self.action_ctrl.GetValue() or None
        
        # 关闭对话框
        self.EndModal(wx.ID_OK)
        
    def get_choice(self) -> Choice:
        """获取编辑后的选项"""
        return self.choice

class ScoreJumpEditorDialog(wx.Dialog):
    def __init__(self, parent, score = None):
        super().__init__(parent, title="编辑分数跳转", size=(400, 200))
        self.score = score if score else {'condition': '', 'next': ''}
        self._init_ui()
        self._load_score_data()
        
    def _init_ui(self):
        """初始化用户界面"""
        panel = wx.Panel(self)
        sizer = wx.BoxSizer(wx.VERTICAL)
        
        # 条件
        condition_sizer = wx.BoxSizer(wx.HORIZONTAL)
        condition_sizer.Add(wx.StaticText(panel, label="条件:"), 0, wx.ALL | wx.CENTER, 5)
        self.condition_ctrl = wx.TextCtrl(panel)
        condition_sizer.Add(self.condition_ctrl, 1, wx.ALL | wx.EXPAND, 5)
        sizer.Add(condition_sizer, 0, wx.EXPAND)
        
        # 下一节点
        next_sizer = wx.BoxSizer(wx.HORIZONTAL)
        next_sizer.Add(wx.StaticText(panel, label="下一节点:"), 0, wx.ALL | wx.CENTER, 5)
        self.next_ctrl = wx.TextCtrl(panel)
        next_sizer.Add(self.next_ctrl, 1, wx.ALL | wx.EXPAND, 5)
        sizer.Add(next_sizer, 0, wx.EXPAND)
        
        # 按钮
        btn_sizer = wx.BoxSizer(wx.HORIZONTAL)
        ok_btn = wx.Button(panel, wx.ID_OK, "确定")
        ok_btn.SetMinSize((80, 30))  # 设置最小大小
        cancel_btn = wx.Button(panel, wx.ID_CANCEL, "取消")
        cancel_btn.SetMinSize((80, 30))  # 设置最小大小
        btn_sizer.Add(ok_btn, 0, wx.ALL, 5)
        btn_sizer.Add(cancel_btn, 0, wx.ALL, 5)
        sizer.Add(btn_sizer, 0, wx.ALIGN_CENTER)
        
        panel.SetSizer(sizer)
        
    def _load_score_data(self):
        """加载分数跳转数据到界面"""
        self.condition_ctrl.SetValue(str(self.score['condition']))
        self.next_ctrl.SetValue(self.score['next'])
        
    def _save_score_data(self):
        """从界面保存分数跳转数据"""
        self.score['condition'] = self.condition_ctrl.GetValue()
        self.score['next'] = self.next_ctrl.GetValue()
        
    def get_score(self):
        """获取编辑后的分数跳转"""
        self._save_score_data()
        return self.score