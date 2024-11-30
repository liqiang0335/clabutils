/**
 * 将图片转换为base64
 * @param url 图片地址
 * @returns base64
 */
export function imgToBase64(url: string, prifix = true) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const base64 = canvas.toDataURL("image/png");
        if (prifix) {
          resolve(base64.replace(/^data:image\/(png|jpg);base64,/, ""));
        } else {
          resolve(base64);
        }
      } else {
        reject(new Error("canvas context is null"));
      }
    };
    img.onerror = () => {
      reject(new Error("图片加载失败"));
    };
    img.src = url;
  });
}
