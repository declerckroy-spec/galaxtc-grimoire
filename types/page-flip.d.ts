declare module "page-flip" {
  export interface PageFlipOptions {
    width: number;
    height: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    showCover?: boolean;
    maxShadowOpacity?: number;
    mobileScrollSupport?: boolean;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
    startPage?: number;
    startZIndex?: number;
    autoSize?: boolean;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
  }

  export interface FlipEvent {
    data: number;
  }

  export class PageFlip {
    constructor(element: HTMLElement, options: PageFlipOptions);
    loadFromHTML(pages: NodeListOf<HTMLElement>): void;
    loadFromImages(images: string[]): void;
    updateFromHtml(pages: NodeListOf<HTMLElement>): void;
    updateFromImages(images: string[]): void;
    flipNext(corner?: "top" | "bottom"): void;
    flipPrev(corner?: "top" | "bottom"): void;
    flip(pageNum: number, corner?: "top" | "bottom"): void;
    turnToPage(pageNum: number): void;
    turnToNextPage(): void;
    turnToPrevPage(): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
    getOrientation(): "portrait" | "landscape";
    getBoundsRect(): DOMRect;
    on(
      eventName: "flip" | "changeOrientation" | "changeState" | "init" | "update",
      callback: (e: FlipEvent) => void
    ): PageFlip;
    off(eventName: string): void;
    destroy(): void;
  }
}
