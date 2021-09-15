<template>
  <div class="addTask">
    <h1>Add Task</h1>
    <ul>
      <li v-for="todo in todos" :key="todo.text">
        <input :checked="todo.done" @change="toggle(todo)" type="checkbox" />
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    todos() {
      return this.$store.state.todos.list
    },
  },
}
</script>

<style scoped>
.addTask {
  background: rgba(0, 0, 0, 0.5)
    url('~/assets/images/VVS_PCWallpaper_Light.png') no-repeat center center /
    cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
h1 {
  color: chocolate;
  font-size: 32px;
  font-weight: 700;
}
</style>
