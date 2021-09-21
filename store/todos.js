export const state = () => ({
    todo: {
        title: '',
        content: [],
        process: '',
        team: [],
    },
});

export const mutations = {
    add(state, formValue) {
        state.list = formValue;
    },
    remove(state, { todo }) {
        state.list.splice(state.list.indexOf(todo), 1);
    },
    toggle(state, todo) {
        todo.done = !todo.done;
    },
};
