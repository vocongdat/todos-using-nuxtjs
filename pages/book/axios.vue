<template>
    <div>
        <h1>{{ post.title }}</h1>
        <p>{{ post.id }}</p>
        <p>{{ post.userId }}</p>
        <span>{{ post.completed }}</span>
        <v-popover>
            <button>Click me</button>
            <template slot="popover">
                <a v-close-popover>Close</a>
            </template>
        </v-popover>
    </div>
</template>

<script>
export default {
    async asyncData({ $axios, params, $hello }) {
        const post = await $axios.$get('https://jsonplaceholder.typicode.com/todos/1');
        $hello('asyncData');
        // If using Nuxt <= 2.12, use 👇
        return { post };
    },
    mounted() {
        this.$hello('mounted');
        // will console.log 'Hello mounted!'
    },
};
</script>
