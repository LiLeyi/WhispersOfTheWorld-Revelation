// 场景注册表 - 所有场景都应在此注册
export const SceneRegistry: Record<string, () => Promise<any>> = {
  // 第0章场景
  'chapter_0_scene_0': () => import('./chapter_0/scene_0/scene_0_data'),
  'chapter_0_scene_1_0': () => import('./chapter_0/scene_1_0/scene_1_0_data'),
  'chapter_0_scene_1_1': () => import('./chapter_0/scene_1_1/scene_1_1_data'),
  // 在此处添加新场景，例如：
  // 'chapter_0_scene_2_0': () => import('./chapter_0/scene_2_0/scene_2_0_data'),
};