export type Comment = {
  id: string;
  userId: string;
  userName: string;
  text: string;
};

export type HelpRequest = {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  createdBy: string;
  userId: string;
  userFirstName: string;
  userLastName: string;
  comments?: Comment[];
};
