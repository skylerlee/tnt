export interface IDndManager {
  mouseDown(e: MouseEvent): void;
  dragStart(id: number, e: MouseEvent): void;
  dragOver(id: number, e: MouseEvent): void;
  dragEnd(): void;
}

interface IPoint {
  x: number;
  y: number;
}

interface IDimen {
  x: number;
  y: number;
  width: number;
  height: number;
  get x1(): number;
  get y1(): number;
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

class Dimen implements IDimen {
  x: number;
  y: number;
  width: number;
  height: number;

  static from(el: HTMLElement): IDimen {
    return new Dimen(el.offsetLeft, el.offsetTop, el.offsetWidth, el.offsetHeight);
  }

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  get x1() {
    return this.x + this.width;
  }

  get y1() {
    return this.y + this.height;
  }

  get centerX() {
    return this.x + this.width / 2;
  }

  get centerY() {
    return this.y + this.height / 2;
  }
}

class DndListener {}

class DndManager implements IDndManager {
  private readonly safeEdge = 8;
  private draggingId?: number;
  private draggingStart?: IPoint;
  private draggingDimen?: IDimen;

  constructor(private axis: 'x' | 'y' = 'x') {}

  mouseDown = (e: MouseEvent) => {
    this.draggingStart = {
      x: e.pageX,
      y: e.pageY,
    };
  };

  dragStart = (id: number, e: MouseEvent) => {
    this.draggingId = id;
    this.draggingDimen = Dimen.from(e.target as HTMLElement);
  };

  dragOver = (id: number, e: MouseEvent) => {
    const targetItem = closest(e.target as HTMLElement, (el) => el.draggable);
    if (targetItem === null || id === this.draggingId) {
      // prevent dragging over self
      return;
    }
    const targetDimen = Dimen.from(targetItem);
    if (!this.draggingStart || !this.draggingDimen) {
      return;
    }
    const currentX = this.draggingDimen.x + e.pageX - this.draggingStart.x;
    const currentY = this.draggingDimen.y + e.pageY - this.draggingStart.y;
    const currentDimen = new Dimen(
      currentX,
      currentY,
      this.draggingDimen.width,
      this.draggingDimen.height,
    );
    if (this.axis === 'x') {
      if (currentDimen.centerX > targetDimen.x + this.safeEdge) {
        // dragging rightwards
        console.log(this.draggingId, id);
      }
      if (currentDimen.centerX < targetDimen.x1 - this.safeEdge) {
        // dragging leftwards
        console.log(this.draggingId, id);
      }
    }
  };

  dragEnd = () => {
    this.draggingId = undefined;
    this.draggingStart = undefined;
    this.draggingDimen = undefined;
  };
}

export default DndManager;
