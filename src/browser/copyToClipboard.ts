/**
 * 复制文本
 */
export function copyToClipboard(str: string) {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  const selection = document.getSelection();
  const selected =
    selection && selection.rangeCount > 0
      ? selection.getRangeAt(0)
      : false;
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected && selection) {
    selection.removeAllRanges();
    selection.addRange(selected);
  }
};
