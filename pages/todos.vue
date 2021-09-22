<template>
    <ul class="flex justify-center flex-col my-48">
        <li v-for="todo in todos" :key="todo.text" class="m-auto">
            <input :checked="todo.done" type="checkbox" @change="toggle(todo)" />
            <span :class="{ done: todo.done }">{{ todo.text }}</span>
        </li>
        <li class="m-auto">
            <input placeholder="What needs to be done?" @keyup.enter="addTodo" />
        </li>
    </ul>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    computed: {
        todos() {
            return this.$store.state.todos.list;
        },
    },
    methods: {
        addTodo(e) {
            this.$store.commit('todos/add', e.target.value);
            e.target.value = '';
        },
        ...mapMutations({
            toggle: 'todos/toggle',
        }),
    },
};
</script>

<style lang="scss" scoped>
.done {
    text-decoration: line-through;
}
</style>
