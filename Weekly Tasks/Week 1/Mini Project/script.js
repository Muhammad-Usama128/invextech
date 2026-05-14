let allTodoTask = [];

const showtask = () => {
  if (allTodoTask.length === 0) {
    document.getElementById("todo-list").innerHTML =
      `<p class="noTodo">No Task Available</p>`;
  } else {
    let allTask = allTodoTask.map((task) => {
      return `<div class="todo-task">
        <span class="task-text">${task.task}</span>
        <div class="taskbtn">
          <button class="delete-btn" onclick="deleteTask(event)">Delete</button>
          ${task.status == "Pending" ? `<button class="complete-btn" onclick="CompleteTask(event)">Complete</button>` : `<button class="completed-btn">Completed</button>`}
          
        </div>
      </div>`;
    });
    allTask = allTask.join("");
    document.getElementById("todo-list").innerHTML = allTask;
  }
};
document
  .getElementById("TODO-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let taskInput = document.getElementById("taskInput");
    if (taskInput.value !== "") {
      allTodoTask.unshift({ task: taskInput.value, status: "Pending" });
      taskInput.value = "";
      showtask();
    }
  });
const CompleteTask = (e) => {
  let taskToComplete =
    e.target.parentElement.parentElement.querySelector(".task-text").innerText;
  allTodoTask.map((task) => {
    if (task.task == taskToComplete) {
      task.status = "Completed";
    }
  });

  showtask();
};

const deleteTask = (e) => {
  let taskToDelete =
    e.target.parentElement.parentElement.querySelector(".task-text").innerText;
  allTodoTask = allTodoTask.filter((c) => c.task !== taskToDelete);
  showtask();
};
showtask();
