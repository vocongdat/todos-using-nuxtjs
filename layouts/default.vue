<template>
  <div class="shell">
    <TheSidebar :open="sidebarOpen" @navigate="sidebarOpen = false" />

    <transition name="fade">
      <div
        v-if="sidebarOpen"
        class="shell__overlay"
        @click="sidebarOpen = false"
      ></div>
    </transition>

    <div class="shell__main">
      <TheTopbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <main class="shell__content">
        <Nuxt />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { sidebarOpen: false }
  },
  watch: {
    $route() {
      this.sidebarOpen = false
    },
  },
}
</script>

<style scoped>
.shell {
  display: flex;
  min-height: 100vh;
  width: 100%;
}
.shell__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.shell__content {
  flex: 1;
  padding: clamp(20px, 3vw, 36px);
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
}
.shell__overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(8, 10, 16, 0.45);
  backdrop-filter: blur(2px);
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s var(--ease);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .shell__overlay {
    display: block;
  }
}
</style>
