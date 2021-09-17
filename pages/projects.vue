<template>
  <div class="todos flex flex-col w-full mt-10">
    <div class="todos__header flex flex-row justify-between items-center mb-5">
      <h2 class="text-2xl font-medium">{{ $t('projects') }}</h2>
      <div>
        <span>{{ $t('thisWeek') }}</span>
        <i class="fas fa-chevron-down text-sm"></i>
      </div>
    </div>

    <div class="todos__main grid grid-cols-3 gap-6 mb-6 min-h-screen">
      <Todo title="To do" :listTodo="todoCreate" />
      <Todo title="In process" :listTodo="todoProcess" />
      <Todo title="Completed" :listTodo="todoCompleted" />
    </div>
  </div>
</template>

<script>
import project from '~/apollo/queries/project'

export default {
  data() {
    return {
      todoCreate: [],
      todoProcess: [],
      todoCompleted: [],
    }
  },

  head: {
    title: 'To do',
  },

  apollo: {
    todoByProject: {
      prefetch: true,
      query: project,
      variables() {
        return { projectId: '6143f615d28fa9d72566cb25' }
      },
    },
  },

  beforeMount() {
    if (this.todoByProject)
      this.todoCreate = this.todoByProject.filter(
        (todo) => todo.status === 'created'
      )
    this.todoProcess = this.todoByProject.filter(
      (todo) => todo.status === 'process'
    )
    this.todoCompleted = this.todoByProject.filter(
      (todo) => todo.status === 'completed'
    )
  },
}
</script>

<style lang="scss" scoped></style>
