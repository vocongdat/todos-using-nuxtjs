<template>
    <div class="refresh-wrap">
        <div>{{ content }}</div>
        <button @click="refresh">Refresh</button>
    </div>
</template>

<script>
export default {
    asyncData() {
        return { content: 'Created at: ' + new Date() };
    },
    methods: {
        refresh() {
            this.$nuxt.refresh();
        },
    },
};
</script>

<style scoped>
.refresh-wrap {
    margin-top: 32px;
    text-align: center;
    color: red;
}
</style>
