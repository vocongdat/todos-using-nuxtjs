<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-pressed="isDark"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
  >
    <span class="theme-toggle__track">
      <span class="theme-toggle__thumb" :class="{ 'is-dark': isDark }">
        <Icon :name="isDark ? 'moon' : 'sun'" :size="14" :stroke-width="2.2" />
      </span>
    </span>
  </button>
</template>

<script>
export default {
  name: 'ThemeToggle',
  data() {
    return { isDark: false }
  },
  mounted() {
    this.isDark = document.documentElement.classList.contains('dark')
  },
  methods: {
    toggle() {
      this.isDark = !this.isDark
      const root = document.documentElement
      root.classList.toggle('dark', this.isDark)
      try {
        localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
      } catch (e) {
        /* ignore */
      }
    },
  },
}
</script>

<style scoped>
.theme-toggle {
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
}
.theme-toggle__track {
  position: relative;
  display: block;
  width: 52px;
  height: 28px;
  border-radius: 9999px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  transition: background-color var(--dur) var(--ease),
    border-color var(--dur) var(--ease);
}
.theme-toggle:hover .theme-toggle__track {
  border-color: var(--border-strong);
}
.theme-toggle__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 22px;
  height: 22px;
  border-radius: 9999px;
  background: var(--surface);
  color: #f59e0b;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  transform: translateX(0) rotate(0deg);
  transition: transform 0.5s var(--spring), color var(--dur) var(--ease);
}
.theme-toggle__thumb.is-dark {
  transform: translateX(24px) rotate(360deg);
  color: var(--accent);
}
</style>
