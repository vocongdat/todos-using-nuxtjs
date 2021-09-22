<template>
    <div class="flex flex-col justify-around h-screen w-48">
        <h1 class="font-bold text-xl">.studio</h1>
        <ul>
            <li
                v-for="(navbar, index) in navbarList"
                :key="index"
                class="flex flex-row items-center justify-start py-4 text-gray-400"
            >
                <div>
                    <i :class="navbar.icon"></i>
                </div>
                <NuxtLink :to="navbar.title | joinText" class="text-lg ml-4">{{
                    $t(navbar.title)
                }}</NuxtLink>
            </li>
        </ul>
        <ul class="text-gray-400">
            <li class="flex flex-row items-center justify-start py-2">
                <i class="fas fa-cog"></i>
                <h5 class="text-lg ml-4">{{ $t('settings') }}</h5>
            </li>
            <li>
                <nuxt-link
                    v-for="locale in availableLocales"
                    :key="locale.code"
                    :to="switchLocalePath(locale.code)"
                    ><span :class="['flag-icon', `flag-icon-${locale.code}`]"></span
                    >{{ locale.name }}</nuxt-link
                >
            </li>

            <li class="flex flex-row items-center justify-start py-2">
                <i class="fas fa-sign-out-alt"></i>
                <h5 class="text-lg ml-4">{{ $t('logout') }}</h5>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    filters: {
        joinText(value) {
            if (!value) return '';
            value = value.toString();
            return value.toLowerCase().split(' ').join('');
        },
    },

    data() {
        return {
            navbarList: [
                {
                    title: 'overview',
                    icon: 'fas fa-home text-xl',
                },
                {
                    title: 'Add Task',
                    icon: 'fas fa-signal text-xl',
                },
                {
                    title: 'projects',
                    icon: 'far fa-folder-open text-xl',
                },
                {
                    title: 'chat',
                    icon: 'far fa-comment-alt text-xl',
                },
                {
                    title: 'calender',
                    icon: 'far fa-calendar-alt text-xl',
                },
            ],
        };
    },

    computed: {
        availableLocales() {
            // const index = this.$i18n.locales.findIndex(
            //   (i) => i.code !== this.$i18n.locale
            // )
            // if (index >= this.$i18n.locales.length) return [this.$i18n.locales[0]]
            // return [this.$i18n.locales[index + 1]]
            return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
        },
    },
};
</script>

<style lang="scss" scoped>
.nuxt-link-active {
    width: 100%;
    border-right-color: #2c9a85;
    border-right-width: 4px;
    border-right-style: solid;
    margin-right: -2px;
    transition: all 0.5 ease-in-out;
}
</style>
