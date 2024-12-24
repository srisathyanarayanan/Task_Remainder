const API_URL = "http://localhost:8080/tasks";

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

async function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        const task = { content: inputBox.value, completed: false };
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task)
        });
        inputBox.value = "";
        showTask();
    }
}

async function showTask() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    listContainer.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = task.content;
        li.dataset.id = task.id;
        if (task.completed) li.classList.add("checked");

        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);
    });
}

listContainer.addEventListener("click", async function (e) {
    const liElement = e.target.tagName === "LI" ? e.target : e.target.parentElement;
    const taskId = liElement.dataset.id; // Retrieve the task ID

    if (!taskId) {
        console.error("Task ID not found!");
        return;
    }

    if (e.target.tagName === "LI") {
        const task = {
            content: liElement.innerText,
            completed: !liElement.classList.contains("checked")
        };
        await fetch(`${API_URL}/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        liElement.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
        liElement.remove();
    }

    showTask();
});


showTask();
