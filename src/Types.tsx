export enum Category {
  Backlog = "Backlog",
  InProgress = "In Progress",
  Done = "Done"
}

export type APIS = {
  updateTaskCategoryType: (id: number, newCategory: Category) => void;
  createTaskType: (category: Category) => void;
  getTaskType: (id: number) => BoxData | null;
  deleteTaskType: (id: number) => void;
};

export type BoxData = { category: Category; id: number };

/* TODO Create an event type */
