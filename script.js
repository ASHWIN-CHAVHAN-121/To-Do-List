// Select elements
const addTaskButton = document.getElementById("addTaskButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage (if any)
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createTaskElement(task.text, task.completed);
  });
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  const taskItems = document.querySelectorAll("li");

  taskItems.forEach((item) => {
    const taskText = item.querySelector(".task-text").textContent;
    const isCompleted = item.classList.contains("completed");
    tasks.push({ text: taskText, completed: isCompleted });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Create a task element and add it to the list
function createTaskElement(taskText, isCompleted = false) {
  const li = document.createElement("li");
  li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <img src="images/check-icon.png" alt="Complete Task" class="check-icon">
        <img src="images/delete-icon.png" alt="Delete Task" class="delete-icon">
    `;

  if (isCompleted) {
    li.classList.add("completed");
  }

  // Append to the task list
  taskList.appendChild(li);

  // Mark task as completed
  const checkIcon = li.querySelector(".check-icon");
  checkIcon.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks(); // Save to localStorage after state change
  });

  // Delete task
  const deleteIcon = li.querySelector(".delete-icon");
  deleteIcon.addEventListener("click", () => {
    li.remove();
    saveTasks(); // Save to localStorage after task deletion
  });
}

// Add Task Function
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create the task element and append to the list
  createTaskElement(taskText);

  // Clear the input field
  taskInput.value = "";

  // Save to localStorage after adding a task
  saveTasks();
}

// Event listener for Add Task button
addTaskButton.addEventListener("click", addTask);

// Optional: Allow pressing 'Enter' to add a task
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Load tasks from localStorage when the page loads
window.onload = loadTasks;
