<template>
    <div>
        <ul class="navbar-list">
            <li class="navbar-item">
                <NuxtLink to="/">Home</NuxtLink>
            </li>
            <li class="navbar-item">
                <NuxtLink to="/about">About</NuxtLink>
            </li>
            <li class="navbar-item">
                <NuxtLink to="/addTask">Add Task</NuxtLink>
            </li>
            <li class="navbar-item">
                <NuxtLink to="/todos">Todos</NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
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
