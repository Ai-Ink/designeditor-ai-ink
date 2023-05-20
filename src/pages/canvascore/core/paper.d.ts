declare namespace paper {
  interface MyCanvas extends paper.Layer {
    __fire: any;
    enableEvents: () => void;
    disableEvents: () => void;
  }

  interface MyObject extends paper.Item {
    id: string;
    name: string;
    locked: boolean;
    duration?: {
      start?: number;
      stop?: number;
    };
    _objects?: paper.Item[];
    metadata?: Record<string, any>;
    clipPath?: undefined | null | paper.Item;
  }
}
