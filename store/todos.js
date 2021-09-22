export const state = () => ({
    todoByProject: [],
    todo: {
        title: '',
        content: [],
        process: '',
        team: [],
    },
});

export const mutations = {
    add(state, formValue) {
        state.todoByProject.push(formValue);
    },
    remove(state, { todo }) {
        state.todoByProject.splice(state.todoByProject.indexOf(todo), 1);
    },
    toggle(state, todo) {
        todo.done = !todo.done;
    },
};
