<template>
    <div>
        <h1>Task</h1>
        <div class="flex flex-row justify-between items-center">
            <ul class="navbar-list">
                <li class="navbar-item">
                    <NuxtLink to="/about">About</NuxtLink>
                </li>
                <li class="navbar-item">
                    <NuxtLink to="/addTask">Add Task</NuxtLink>
                </li>
            </ul>
            <nuxt-link
                v-for="locale in availableLocales"
                :key="locale.code"
                :to="switchLocalePath(locale.code)"
                ><span :class="['flag-icon', `flag-icon-${locale.code}`]"></span
                >{{ locale.name }}</nuxt-link
            >
        </div>
        <Nuxt />
    </div>
</template>

<script>
export default {
    computed: {
        availableLocales() {
            return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
        },
    },
};
</script>

<style lang="scss" scoped>
div > h1 {
    text-align: center;
    font-size: 40px;
    color: blueviolet;
}
.navbar-list {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 24px;
    .navbar-item {
        color: coral;

        + .navbar-item {
            margin-left: 16px;
        }
    }
}

.nuxt-link-active {
    color: red;
}
</style>
