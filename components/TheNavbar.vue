<template>
  <div class="flex flex-col justify-around h-screen">
    <h1 class="font-bold text-xl">.studio</h1>
    <ul>
      <li
        v-for="navbar in navbarList"
        :key="navbar.index"
        class="flex flex-row items-center justify-start py-4"
      >
        <div v-html="navbar.icon"></div>
        <h4 class="text-lg ml-4">{{ navbar.title }}</h4>
      </li>
    </ul>
    <ul>
      <li class="flex flex-row items-center justify-start py-2">
        <i class="fas fa-cog"></i>
        <h5 class="text-lg ml-4">Settings</h5>
      </li>
      <li class="flex flex-row items-center justify-start py-2">
        <i class="fas fa-sign-out-alt"></i>
        <h5 class="text-lg ml-4">Log out</h5>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navbarList: [
        {
          title: 'Overview',
          icon: '<i class="fas fa-home text-xl"></i>',
        },
        {
          title: 'Stars',
          icon: '<i class="fas fa-signal text-xl"></i>',
        },
        {
          title: 'Projects',
          icon: '<i class="far fa-folder-open text-xl"></i>',
        },
        {
          title: 'Chat',
          icon: '<i class="far fa-comment-alt text-xl"></i>',
        },
        {
          title: 'Calender',
          icon: '<i class="far fa-calendar-alt text-xl"></i>',
        },
      ],
    }
  },
}
</script>

<style></style>
