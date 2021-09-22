<template>
    <div>
        <h1>{{ book }} / {{ slug }}</h1>
        <ul>
            <li v-for="post in posts" :key="post.id">
                <h2>{{ post.title }}</h2>
                <p>{{ post.body }}</p>
            </li>
        </ul>
        <p>Our Url is: {{ $config.baseURL }}</p>
    </div>
</template>

<script>
export default {
    asyncData({ params: { book, slug } }) {
        return { book, slug };
    },

    data() {
        return {
            posts: [],
        };
    },

    async fetch({ $config: { baseURL } }) {
        this.posts = await fetch(`${baseURL}/posts`).then((res) => res.json());
    },

    head: {
        title: 'Post',
    },
};
</script>

<style lang="scss" scoped>
ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    li {
        text-align: center;
        + li {
            margin: 16px 0;
        }
        h2 {
            font-size: 26px;
            color: crimson;
        }
    }
}
</style>
