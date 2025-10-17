<template>
  <div class="container">
    <h1>🗒️ To-Do List</h1>

    <form class="form" @submit.prevent="addTask">
      <input v-model="newTask.title" type="text" placeholder="Deskripsi tugas" required />
      <input v-model="newTask.dueDate" type="date" required />
      <button type="submit">Tambah</button>
    </form>

    <hr />

    <h2>Tugas Akan Datang</h2>
    <div v-if="tasks.length === 0">Belum ada tugas 😊</div>

    <ul class="task-list">
      <li v-for="task in tasks" :key="task.id">
        <div class="task">
          <div class="task-info">
            <strong>{{ task.title }}</strong>
            <p>Deadline: {{ formatDate(task.dueDate) }}</p>
          </div>
          <button class="done" @click="toggleComplete(task)">
            {{ task.completed ? "✅ Selesai" : "❌ Belum" }}
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const tasks = ref([]);
const newTask = ref({
  title: "",
  dueDate: "",
  completed: false,
});

onMounted(() => {
  const saved = localStorage.getItem("tasks");
  if (saved) tasks.value = JSON.parse(saved);
});

function addTask() {
  const task = {
    id: Date.now(),
    title: newTask.value.title,
    dueDate: newTask.value.dueDate,
    completed: false,
  };
  tasks.value.push(task);
  saveTasks();
  newTask.value = { title: "", dueDate: "", completed: false };
}

function toggleComplete(task) {
  task.completed = !task.completed;
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  background: white;
  padding: 20px 30px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

.form {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 15px;
}

input {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-colour 0.3s;
}

button:hover {
  background: #0056b3;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  margin: 8px 0;
  padding: 10px 15px;
  border-radius: 10px;
}

.done {
  background: #28a745;
}

.done:hover {
  background: #218838;
}
</style>
