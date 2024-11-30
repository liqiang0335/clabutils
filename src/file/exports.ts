import { saveAs } from "file-saver";

/**
 * 导出CSV文件: 修复中文乱码
 * @param name 文件名: 不带后缀
 * @param content 文件内容：示例："姓名,年龄,性别\n张三,20,男\n李四,21,女"
 */
export function exportCSV(name: string, content: string) {
  const blob = new Blob(["\ufeff" + content], { type: "text/csv,charset=UTF-8" });
  saveAs(blob, name);
}
