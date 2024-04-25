class DndManager {
  private draggingId: number;

  dragStart = (id: number) => {
    this.draggingId = id;
  };

  dragOver = (id: number) => {};

  dragEnd = () => {
    this.draggingId = undefined;
  };
}

export default DndManager;
