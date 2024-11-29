/**
 * 数组转换成ById的形式
 */
export function byId<T extends Record<string, any>>(datas: T[], key = "id"): Record<string | number, T> {
  return datas.reduce((p, c) => {
    const k = c[key];
    p[k] = c;
    return p;
  }, {} as Record<string | number, T>);
}
