function Button(props: { title: string; onClick: () => void }) {
  return <button onClick={props.onClick}>{props.title}</button>;
}

export default function NewTaskModal() {
  return <Button title="Create New Task" onClick={() => {}} />;
}
