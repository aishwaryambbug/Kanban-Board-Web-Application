let boardData = JSON.parse(localStorage.getItem("kanban")) || {
  todo: [],
  doing: [],
  done: []
};

function save() {
  localStorage.setItem("kanban", JSON.stringify(boardData));
}

function render() {
  ["todo", "doing", "done"].forEach(col => {
    const container = document.getElementById(col);
    container.innerHTML = "";
    boardData[col].forEach(task => {
      const div = document.createElement("div");
      div.className = "task";
      div.textContent = task;
      container.appendChild(div);
    });
  });
}

function addTask(e, column) {
  if (e.key === "Enter" && e.target.value.trim() !== "") {
    boardData[column].push(e.target.value);
    e.target.value = "";
    save();
    render();
  }
}

/* ✅ RESET BUTTON FIX */
document.getElementById("reset-btn").addEventListener("click", () => {
  if (confirm("Clear all tasks?")) {
    boardData = { todo: [], doing: [], done: [] };
    localStorage.removeItem("kanban");
    render();
  }
});

render();
