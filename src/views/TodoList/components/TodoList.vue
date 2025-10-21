<template>
  <div class="container">
    <h1>🗒️ To-Do List</h1>

    <form class="form" @submit.prevent="addTask">
      <input v-model="newTask.title" type="text" placeholder="Deskripsi tugas" required />
      <button type="submit">Tambah</button>
    </form>

    <hr />

    <h2>Tugas Akan Datang</h2>
    <div v-if="tasks.length === 0">Belum ada tugas 😊</div>

    <ul class="task-list">
      <li v-for="task in tasks" :key="task.id">
        <div class="task">
          <strong>{{ task.title }}</strong>
          <div>
            <button class="done" @click="toggleComplete(task)">
              {{ task.completed ? "✅ Selesai" : "❌ Belum" }}
            </button>
            <button class="delete" @click="deleteTask(task.id)">🗑️ Hapus</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";

const tasks = ref([]);
const newTask = ref({
  title: "",
  completed: false,
});

async function fetchTasks() {
  try {
    const res = await api.get("/todos");
    tasks.value = res.data;
  } catch (err) {
    console.error("Gagal ambil data:", err);
  }
}

onMounted(async () => {
  await fetchTasks();
});

async function addTask() {
  if (!newTask.value.title) return;

  const task = {
    title: newTask.value.title,
    completed: false,
  };

  try {
    const res = await api.post("/todos", task);
    tasks.value.unshift(res.data); 
    newTask.value.title = "";
  } catch (err) {
    console.error("Gagal menambahkan task:", err);
  }
}

async function toggleComplete(task) {
  task.completed = !task.completed;

  try {
    await api.put(`/todos/${task.id}`, { completed: task.completed });
  } catch (err) {
    console.error("Gagal update status:", err);
    task.completed = !task.completed; 
  }
}

async function deleteTask(id) {
  try {
    await api.delete(`/todos/${id}`);
    tasks.value = tasks.value.filter(t => t.id !== id);
  } catch (err) {
    console.error("Gagal menghapus task:", err);
  }
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
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  opacity: 0.9;
}

.form button {
  background: #007bff;
  color: white;
  border: none;
}

.done {
  background: #28a745;
  border: none;
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 5px;
  color: white;
}

/* tombol hapus */
.delete {
  background: #dc3545;
  border: none;
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
  color: white;
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
</style>
