import { Category } from "./Types";

export default function EditTaskForm(props: {
  onFormSubmit: (event) => void;
  onCategoryChange: (newCategory: Category) => void;
  onTitleChange: (newTitle: string) => void;

  currentCategory: Category;
  currentTitle: string;
}) {
  const {
    onFormSubmit,
    onCategoryChange,
    onTitleChange,
    currentCategory,
    currentTitle
  } = props;

  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor="select-category">
        Select a category:
        <select
          id="select-category"
          value={currentCategory}
          onChange={(event) => {
            onCategoryChange(event.target.value);
          }}
        >
          <option value={Category.Backlog}>Backlog</option>
          <option value={Category.InProgress}>In Progress</option>
          <option value={Category.Done}>Done</option>
        </select>
      </label>
      <br />
      <label htmlFor="input-title">Title: </label>
      <input
        id="input-title"
        value={currentTitle}
        onChange={(event) => onTitleChange(event.target.value)}
      />
      <br />
      <input
        style={{ margin: 7 }}
        type="Submit"
        value="Submit"
        readOnly={true}
      />
    </form>
  );
}
