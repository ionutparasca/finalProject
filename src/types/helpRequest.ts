export type HelpRequest = {
  id: string;
  title: string;
  description: string;
  category: "Food" | "Transport" | "Housing" | "Other";
  createdAt: string;
  createdBy: string; // userId
};
