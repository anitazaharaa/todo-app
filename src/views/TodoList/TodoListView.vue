<template>
  <div class="container">
    <h2>🗒️ To-Do List (Local DB)</h2>

    <table v-if="todos.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Completed</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" :key="todo.id">
          <td>{{ todo.id }}</td>
          <td>{{ todo.title }}</td>
          <td>{{ todo.description }}</td>
          <td>{{ todo.completed ? '✅' : '❌' }}</td>
          <td>{{ formatDate(todo.created_at) }}</td>
          <td>{{ formatDate(todo.updated_at) }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>Loading data from PostgreSQL...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "@/services/api";

const todos = ref<any[]>([]);

onMounted(async () => {
  try {
    const res = await api.get("/todos");
    todos.value = res.data;
  } catch (err) {
    console.error("Gagal ambil data:", err);
  }
});

function formatDate(date: string) {
  return new Date(date).toLocaleString("id-ID");
}
</script>

<style scoped>
.container {
  padding: 30px;
  font-family: Arial, sans-serif;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
}
th {
  background-color: #f4f4f4;
}
</style>
