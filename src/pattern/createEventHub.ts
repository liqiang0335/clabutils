
type EventHandler = (data: any) => void;
type EventHub = {
  [key: string]: EventHandler[];
};
/**
 * 事件总线
 * @returns EventHub
 */
export const createEventHub = function () {
  return {
    hub: Object.create(null) as EventHub,
    emit(event: string, data: any) {
      (this.hub[event] || []).forEach((handler: EventHandler) => handler(data));
    },
    on(event: string, handler: EventHandler) {
      if (!this.hub[event]) this.hub[event] = [];
      this.hub[event].push(handler);
    },
    off(event: string, handler?: EventHandler) {
      if (!this.hub[event]) return; // 不存在事件
      // 不存在处理函数, 则删除事件
      if (!handler) {
        delete this.hub[event];
        return;
      }
      const i = (this.hub[event] || []).findIndex((h: EventHandler) => h === handler);
      if (i > -1) this.hub[event].splice(i, 1);
    },
    clear(event: string) {
      this.hub[event] = []
    },
    clearAll() {
      this.hub = Object.create(null) as EventHub;
    }
  };
};
