export enum Category {
  Backlog = "Backlog",
  InProgress = "In Progress",
  Done = "Done"
}

export type APIS = {
  updateTaskCategoryType: (id: number, newCategory: Category) => void;
};

export type BoxData = { category: Category; id: number };

/* TODO Create an event type */
