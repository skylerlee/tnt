export interface IDndManager {
  dragStart(id: number, e: DragEvent): void;
  dragOver(id: number, e: DragEvent): void;
  dragEnd(): void;
}

interface IDimen {
  x: number;
  y: number;
  width: number;
  height: number;
  get centerX(): number;
  get centerY(): number;
}

function closest(el: HTMLElement, predicate: (el: HTMLElement) => boolean): HTMLElement | null {
  let cur: HTMLElement | null = el;
  do {
    if (predicate(cur)) {
      return cur;
    }
    cur = cur?.parentElement;
  } while (cur !== null && cur !== window.document.documentElement);
  return null;
}

function getDimen(el: HTMLElement): IDimen {
  return {
    x: el.offsetLeft,
    y: el.offsetTop,
    width: el.offsetWidth,
    height: el.offsetHeight,
    get centerX() {
      return this.x + this.width / 2;
    },
    get centerY() {
      return this.y + this.height / 2;
    },
  };
}

class DndManager implements IDndManager {
  private readonly safeEdge = 8;
  private draggingId?: number;
  private draggingEl?: HTMLElement;

  dragStart = (id: number, e: DragEvent) => {
    this.draggingId = id;
    this.draggingEl = e.target as HTMLElement;
  };

  dragOver = (id: number, e: DragEvent) => {
    const targetItem = closest(e.target as HTMLElement, (el) => el.draggable);
    if (targetItem === null || id === this.draggingId) {
      // prevent dragging over self
      return;
    }
    const targetDimen = getDimen(targetItem);
    console.log(targetDimen);
  };

  dragEnd = () => {
    this.draggingId = undefined;
    this.draggingEl = undefined;
  };
}

export default DndManager;
