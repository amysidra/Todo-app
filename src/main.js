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

async function main() {
  const todos = await getData(url);

  todos.data.forEach((todo) => {
    const newTodoContainer = document.createElement("div");
    const newTodoTask = document.createElement("h1");
    const newTodoDescription = document.createElement("p");

    newTodoTask.textContent = todo.task;
    newTodoDescription.textContent = todo.description;

    newTodoContainer.append(newTodoTask, newTodoDescription);

    document.body.append(newTodoContainer);
  });
}

main();

const taskInput = document.getElementById("task");
const descriptionInput = document.getElementById("description");
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", async () => {
  const taskValue = taskInput.value;
  const descriptionValue = descriptionInput.value;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([{ task: taskValue, description: descriptionValue }]),
  });

  window.location.reload();
});
