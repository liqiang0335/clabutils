// @ts-ignore
import { read, utils } from "xlsx/xlsx.mjs";

/**
 * 读取XLSX文件
 * @param file 文件
 * @returns Promise<any[]> 文件内容
 */
export function readXLSX(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onerror = reject;
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = e.target?.result;
      if (!data) throw new Error('Failed to read file');
      const workbook = read(data, { type: "array" });
      const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = utils.sheet_to_json(first_worksheet);
      resolve(json);
    };
  });
}
