const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";

  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.done) {
      li.classList.add("done");
    }

    li.addEventListener("click", function () {
      task.done = !task.done;
      save();
      render();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";
    delBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      tasks.splice(index, 1);
      save();
      render();
    });

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

addBtn.addEventListener("click", function () {
  const text = input.value.trim();

  if (text === "") {
    return;
  }

  tasks.push({ text: text, done: false });
  save();
  render();
  input.value = "";
});

render();