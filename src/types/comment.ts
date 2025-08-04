export type Comment = {
  id: number;
  requestId: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  text: string;
  createdAt: string;
};
