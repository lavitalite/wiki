## flat data to tree data

```php

// 第一次遍历，建立id索引
foreach ($list as $item) {
    $id = $item['id'];
    $idMap[$id] = array_merge($item, array('children' => array()));
}

// 第二次遍历，构建树形结构
foreach ($list as $item) {
    $id = $item['id'];
    $pid = $item['pid'];

    if ($pid == '0' || !isset($idMap[$pid])) {
        // 根节点或父节点不存在
        $tree[] = &$idMap[$id];
    } else {
        // 将当前节点添加到父节点的children数组中
        $idMap[$pid]['children'][] = &$idMap[$id];
        
    }
}

```

