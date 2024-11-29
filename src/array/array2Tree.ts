import { cloneDeep } from "lodash-es";

interface TreeNode {
  [key: string]: any;
  children?: TreeNode[];
}

interface TreeOptions {
  id?: string;
  pid?: string;
  children?: string;
}

/**
 * 将数组转换为树形结构
 * @param nodes 原始节点数组
 * @param option 配置选项
 * @returns 树形结构数组
 */
export function array2Tree(nodes: TreeNode[], option: TreeOptions = {}) {
  const id = option.id || "id";
  const pid = option.pid || "pid";
  const children = option.children || "children";
  const result: TreeNode[] = [];
  const byIds: { [key: string]: TreeNode } = {};
  const len = nodes.length;
  const datas = cloneDeep(nodes);

  for (let i = 0; i < len; i++) {
    byIds[datas[i][id]] = datas[i];
  }

  for (let i = 0; i < len; i++) {
    let parent = byIds[datas[i][pid]];
    if (parent) {
      parent[children] = parent[children] || [];
      parent[children].push(datas[i]);
    } else {
      result.push(datas[i]);
    }
  }

  return result;
}


/**
 * 将树形结构转换为数组
 * @param nodes 树形结构
 * @param key 子节点键名
 * @returns 数组
 */
export function tree2Array(nodes: any, key = "children"): any[] {
  let result = [];

  if (Array.isArray(nodes)) {
    const len = nodes.length;
    for (var i = 0; i < len; i++) {
      result.push(nodes[i]);
      if (nodes[i][key]) {
        result = result.concat(tree2Array(nodes[i][key]));
      }
    }
  } else {
    result.push(nodes);
    result = result.concat(tree2Array(nodes[key]));
  }
  return result;
}