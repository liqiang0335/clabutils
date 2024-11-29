import { saveAs } from "file-saver";

/**
 * 导出CSV文件: 修复中文乱码
 * @param name 文件名: 不带后缀
 * @param content 文件内容
 */
export function exportCSV(name: string, content: string) {
  const blob = new Blob(["\ufeff" + content], { type: "text/csv,charset=UTF-8" });
  saveAs(blob, name);
}
