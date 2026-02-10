const url = "https://v1.appbackend.io/v1/rows/gLgdq7eY3CPh";

async function getData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const todoDiv = document.getElementById("todo-list");

async function main() {
  const todos = await getData(url);

  todos.data.forEach((todo) => {
    const newTodoContainer = document.createElement("div");
    const newTodoTask = document.createElement("h1");
    const newTodoDescription = document.createElement("p");
    const newTodoPIC = document.createElement("p");
    const newDeleteButton = document.createElement("button");

    newTodoTask.textContent = todo.task;
    newTodoDescription.textContent = todo.description;
    newTodoPIC.textContent = todo.pic;
    newDeleteButton.textContent = "delete";
    newDeleteButton.dataset.id = todo._id;
    newDeleteButton.classList.add("del-btn");

    newTodoContainer.append(
      newTodoTask,
      newTodoDescription,
      newTodoPIC,
      newDeleteButton,
    );

    todoDiv.append(newTodoContainer);
  });
}

main();

const taskInput = document.getElementById("task");
const descriptionInput = document.getElementById("description");
const PICInput = document.getElementById("PIC");
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", async () => {
  const taskValue = taskInput.value;
  const descriptionValue = descriptionInput.value;
  const PICValue = PICInput.value;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([{ task: taskValue, description: descriptionValue, pic: PICValue }]),
  });

  window.location.reload();
});

todoDiv.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("del-btn")) return;

  const id = e.target.dataset
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      id
    ]),
  });

  window.location.reload()
});
