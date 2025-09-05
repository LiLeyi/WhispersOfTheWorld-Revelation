# 存档和成就管理

## 存档系统

示例：

```ts
const archiveManager = ArchiveManager.getInstance(); // 使用前必须拿到实例

archiveManager.increaseAffection("character_name", 10); // 给一个角色加10点好感度
archiveManager.set_flag("turn_left", true); // 记录向左走
archiveManager.addItem("key"); // 记录拿到物品
archiveManager.removeItem("key"); // 删除物品

console.log(archiveManager.hasItem("key")) // 打印是否有这个物品
console.log(archiveManager.getAffection("character_name")) // 打印角色好感度
console.log(archiveManager.get_flag("turn_left")) // 打印是否向左走
```

更多可查看[这里](../src/components/ArchiveManager.ts)

存档之间是隔离的，不同存档之间互不影响

## 成就系统

```ts
const achieveManager = AchieveManager.getInstance();

achieveManager.unlockAchievement("hello_world"); // 解锁成就
achieveManager.isUnlocked("hello_world"); // 判断是否解锁
```

更多可查看[这里](../src/components/AchievementManager.ts)

成就是按账号隔离的，不同账号之间互不影响