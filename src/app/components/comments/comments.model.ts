export interface comment {
    id: number;
    userName?: string;
    text: string;
    createdAt: string;
    replies?: comment[];
  }