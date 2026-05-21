// ---------------------------------------------------------------------------
// Drag-drop postMessage types
// ---------------------------------------------------------------------------
// These are sent via postMessage (not WebSocket) between the panel iframe/popup
// and the overlay in the parent document. They use the __conveyDrag marker to
// distinguish them from other postMessage traffic.

/** Sent when the panel detects a drag gesture (mousedown + 5px threshold). */
export interface DragStartMessage {
  __conveyDrag: true;
  type: 'DRAG_START';
  componentName: string;
  storyId: string;
  ghostHtml?: string;
  ghostCss?: string;
  componentPath?: string;
  args?: Record<string, unknown>;
  /** Cursor position in screen coordinates (used by popup path). */
  screenX: number;
  screenY: number;
  /** Cursor position in iframe-local client coordinates (used by iframe path). */
  clientX?: number;
  clientY?: number;
  /** When true, this drag inserts a design canvas instead of a component. */
  canvasInsert?: boolean;
  /** Insert mode context for canvas insertion ('replace' | 'place'). */
  canvasInsertMode?: string;
}

/** Sent on every mousemove during drag. */
export interface DragMoveMessage {
  __conveyDrag: true;
  type: 'DRAG_MOVE';
  screenX: number;
  screenY: number;
  /** Cursor position in iframe-local client coordinates (used by iframe path). */
  clientX?: number;
  clientY?: number;
}

/** Sent when the panel ghost extraction completes after drag-start. */
export interface DragGhostReadyMessage {
  __conveyDrag: true;
  type: 'DRAG_GHOST_READY';
  ghostHtml: string;
  ghostCss: string;
}

/** Sent on mouseup or Escape — drag ended in the panel window. */
export interface DragEndMessage {
  __conveyDrag: true;
  type: 'DRAG_END';
  screenX: number;
  screenY: number;
  /** Cursor position in iframe-local client coordinates (used by iframe path). */
  clientX?: number;
  clientY?: number;
  cancelled: boolean;
}

export type DragMessage =
  | DragStartMessage
  | DragMoveMessage
  | DragGhostReadyMessage
  | DragEndMessage;

export function isDragMessage(data: unknown): data is DragMessage {
  return (
    typeof data === 'object' &&
    data !== null &&
    '__conveyDrag' in data &&
    (data as Record<string, unknown>).__conveyDrag === true
  );
}

// ---------------------------------------------------------------------------
// Canvas drag postMessage types (overlay → design canvas iframe)
// ---------------------------------------------------------------------------

/** Sent when cursor enters a design canvas during a drag session. */
export interface CanvasDragEnterMessage {
  __conveyCanvasDrag: true;
  type: 'CANVAS_DRAG_ENTER';
  componentName: string;
  storyId: string;
  ghostHtml: string;
  ghostCss: string | null;
  componentPath: string;
  args: Record<string, unknown>;
  /** Cursor position relative to the design canvas iframe viewport. */
  x: number;
  y: number;
}

/** Sent on every move while cursor is over the design canvas. */
export interface CanvasDragMoveMessage {
  __conveyCanvasDrag: true;
  type: 'CANVAS_DRAG_MOVE';
  x: number;
  y: number;
}

/** Sent when the user drops onto the design canvas. */
export interface CanvasDragDropMessage {
  __conveyCanvasDrag: true;
  type: 'CANVAS_DRAG_DROP';
  x: number;
  y: number;
}

/** Sent when cursor leaves the design canvas during drag. */
export interface CanvasDragLeaveMessage {
  __conveyCanvasDrag: true;
  type: 'CANVAS_DRAG_LEAVE';
}

export type CanvasDragMessage =
  | CanvasDragEnterMessage
  | CanvasDragMoveMessage
  | CanvasDragDropMessage
  | CanvasDragLeaveMessage;

export function isCanvasDragMessage(data: unknown): data is CanvasDragMessage {
  return (
    typeof data === 'object' &&
    data !== null &&
    '__conveyCanvasDrag' in data &&
    (data as Record<string, unknown>).__conveyCanvasDrag === true
  );
}
