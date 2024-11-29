const todos = ["Walk the dog", "Water the plants", "Sand the chairs"];

const addTodoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo-btn");
const todosList = document.getElementById("todos-list");

for (const todo of todos) {
  todosList.append(renderTodoInReadMode(todo));
}

addTodoInput.addEventListener("input", function () {
  addTodoButton.disabled = addTodoInput.value.length < 3;
});

addTodoInput.addEventListener("keydown", function ({ key }) {
  if (key === "Enter" && addTodoInput.value.length >= 3) {
    addTodo();
  }
});

addTodoButton.addEventListener("click", addTodo);

function renderTodoInReadMode(todo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = todo;
  span.addEventListener("dblclick", function () {
    const idx = todos.indexOf(todo);

    todosList.replaceChild(
      renderTodoInEditMode(todo),
      todosList.childNodes[idx],
    );
  });
  li.appendChild(span);

  const btn = document.createElement("button");
  btn.textContent = "Done";
  btn.addEventListener("click", function () {
    const idx = todos.indexOf(todo);
    removeTodo(idx);
  });
  li.appendChild(btn);

  return li;
}

function renderTodoInEditMode(todo) {
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.type = "text";
  input.value = todo;
  li.appendChild(input);

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.addEventListener("click", function () {
    const idx = todos.indexOf(todo);
    updateTodo(idx, input.value);
  });

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", function () {
    const idx = todos.indexOf(todo);

    todosList.replaceChild(
      renderTodoInReadMode(todo),
      todosList.childNodes[idx],
    );
  });
  li.appendChild(saveBtn);
  li.appendChild(cancelBtn);

  return li;
}

function addTodo() {
  todosList.append(renderTodoInReadMode(addTodoInput.value));
  todos.push(addTodoInput.value);
  addTodoInput.value = "";
  addTodoButton.disabled = true;
}

function removeTodo(index) {
  todos.splice(index, 1);
  todosList.childNodes[index].remove();
}

function updateTodo(index, newDescription) {
  todos[index] = newDescription;
  todosList.replaceChild(
    renderTodoInReadMode(newDescription),
    todosList.childNodes[index],
  );
}
