export enum Category {
  Backlog = "Backlog",
  InProgress = "In Progress",
  Done = "Done"
}

export type APIS = {
  updateTaskCategoryType: (id: number, newCategory: Category) => void;
  createTaskType: (category: Category, title: string) => void;
  getTaskType: (id: number) => BoxData | null;
  deleteTaskType: (id: number) => void;
};

export type BoxData = { category: Category; id: number; title: string };

/* TODO Create an event type */
