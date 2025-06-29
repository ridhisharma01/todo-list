// -----------------------------
// ✨ TASK & DATE FUNCTIONALITY
// -----------------------------

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const dateHeading = document.getElementById('dateHeading');

// Show today's date at top
const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dateHeading.textContent = today.toLocaleDateString('en-US', options);

// Load saved tasks on page load
window.onload = () => {
  loadTasks();
};

// Add new task (without due date)
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();

  if (task) {
    addTask(task);
    saveTasks();
    taskForm.reset();
  }
});

// Create task element
function addTask(task, completed = false) {
  const li = document.createElement('li');
  if (completed) li.classList.add('completed');

  li.innerHTML = `
    <input type="checkbox" ${completed ? 'checked' : ''} onchange="toggleComplete(this)">
    <span>${task}</span>
    <button onclick="deleteTask(this)">🗑️</button>
  `;
  taskList.appendChild(li);
  saveTasks();
}

// Delete task
function deleteTask(btn) {
  btn.parentElement.remove();
  saveTasks();
}

// Toggle complete
function toggleComplete(checkbox) {
  const li = checkbox.parentElement;
  li.classList.toggle('completed');
  saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', taskList.innerHTML);
}

// Load tasks from localStorage
function loadTasks() {
  taskList.innerHTML = localStorage.getItem('tasks') || '';
}

// -----------------------------
// 🌗 THEME TOGGLE FUNCTIONALITY
// -----------------------------

const themeToggle = document.getElementById("themeToggle");

const THEMES = ["auto", "light", "dark"];
let currentThemeIndex = 0;

function applyTheme(theme) {
  const html = document.documentElement;

  if (theme === "auto") {
    html.removeAttribute("data-theme");
  } else {
    html.setAttribute("data-theme", theme);
  }

  localStorage.setItem("theme", theme);
  updateButton(theme);
}

function updateButton(theme) {
  if (theme === "auto") {
    themeToggle.textContent = "🖥 Auto";
  } else if (theme === "light") {
    themeToggle.textContent = "🌞 Light";
  } else {
    themeToggle.textContent = "🌙 Dark";
  }
}

themeToggle.addEventListener("click", () => {
  currentThemeIndex = (currentThemeIndex + 1) % THEMES.length;
  applyTheme(THEMES[currentThemeIndex]);
});

// Load saved theme or default to auto
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "auto";
  currentThemeIndex = THEMES.indexOf(savedTheme);
  applyTheme(savedTheme);
});
