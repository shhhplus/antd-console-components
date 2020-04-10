import path from 'path';

// 遍历修改path
export const convert = (list: Array<any>, rootPath: string): Array<any> => {
  return list.map((item) => {
    const res = {
      ...item,
      path: item.path ? path.join('/', rootPath, item.path) : item.path,
    };

    if (res.children) {
      res.children = convert(res.children, res.path);
      res.type = res.type || 'sub';
    } else {
      res.type = '';
    }

    return res;
  });
};

type String2StringMap = Map<string, string>;

const createChild2ParentMap = (
  parentPath: string,
  list: Array<any>,
  map: String2StringMap | undefined,
): String2StringMap => {
  return list.reduce((acc: String2StringMap, cur: any) => {
    if (parentPath) {
      acc.set(cur.path, parentPath);
    }

    if (cur.children) {
      return createChild2ParentMap(cur.path, cur.children, acc);
    } else {
      return acc;
    }
  }, map || new Map());
};

export const getAllPathSet = (
  list: Array<any>,
  set: Set<string> | undefined,
): Set<string> => {
  return list.reduce((acc: Set<string>, cur: any) => {
    acc.add(cur.path);
    if (cur.children) {
      return getAllPathSet(cur.children, acc);
    } else {
      return acc;
    }
  }, set || new Set());
};

// 获取所有叶子节点path
const getAllLeafPaths = (
  list: Array<string>,
  set: Set<string> | undefined,
): Set<string> => {
  return list.reduce((acc: Set<string>, cur: any) => {
    if (!cur.children || !cur.children.length) {
      acc.add(cur.path);
      return acc;
    } else {
      return getAllLeafPaths(cur.children, acc);
    }
  }, set || new Set());
};

// 获取匹配的path，唯一叶子节点
export const getMatchedLeafPaths = (
  list: Array<string>,
  currentPath: string,
): Array<string> => {
  const leafPaths = getAllLeafPaths(list, undefined);
  return Array.from(leafPaths).filter((p) => {
    if (p === '/') {
      return currentPath === p;
    } else {
      return currentPath.indexOf(p) === 0;
    }
  });
};

// 获取匹配的paths
export const getMatchedPaths = (
  list: Array<string>,
  currentPath: string,
): Array<string> => {
  const map = createChild2ParentMap('', list, undefined);
  const leafPaths = getMatchedLeafPaths(list, currentPath);

  return leafPaths.reduce((acc: Array<string>, cur: string) => {
    let next: string | undefined = cur;
    while (next) {
      acc.push(next);
      next = map.get(next);
    }
    return acc;
  }, []);
};
