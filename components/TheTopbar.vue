<template>
  <header class="topbar">
    <div class="topbar__left">
      <button
        class="btn-icon topbar__menu"
        type="button"
        aria-label="Open menu"
        @click="$emit('toggle-sidebar')"
      >
        <Icon name="menu" :size="20" />
      </button>
      <div class="topbar__title">
        <h1>{{ heading.title }}</h1>
        <p>{{ heading.subtitle }}</p>
      </div>
    </div>

    <div class="topbar__right">
      <div class="search">
        <span class="search__icon"><Icon name="search" :size="17" /></span>
        <input
          v-model="query"
          type="text"
          class="search__input"
          placeholder="Search tasks…"
          aria-label="Search tasks"
        />
        <kbd class="search__kbd">/</kbd>
      </div>

      <div class="locale" v-if="otherLocales.length">
        <NuxtLink
          v-for="locale in otherLocales"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          class="locale__item"
          :title="locale.name"
        >
          <span :class="['flag-icon', `flag-icon-${locale.code}`]"></span>
        </NuxtLink>
      </div>

      <ThemeToggle />

      <button class="btn-icon topbar__bell" type="button" aria-label="Notifications">
        <Icon name="bell" :size="19" />
        <span class="topbar__dot"></span>
      </button>

      <button class="topbar__user" type="button">
        <span class="topbar__avatar">CĐ</span>
        <span class="topbar__user-name">Công Đạt</span>
        <Icon name="chevron-down" :size="15" />
      </button>
    </div>
  </header>
</template>

<script>
const HEADINGS = {
  '/': { title: 'Today', subtitle: "Here's what needs your attention" },
  '/todos': { title: 'Board', subtitle: 'Drag tasks across your workflow' },
  '/addTask': { title: 'New task', subtitle: 'Capture something to get done' },
  '/about': { title: 'About', subtitle: 'A little about this project' },
}

export default {
  name: 'TheTopbar',
  data() {
    return { query: '' }
  },
  computed: {
    heading() {
      return (
        HEADINGS[this.$route.path] || {
          title: 'Tasks',
          subtitle: 'Stay on top of your work',
        }
      )
    },
    otherLocales() {
      if (!this.$i18n) return []
      return this.$i18n.locales.filter((l) => l.code !== this.$i18n.locale)
    },
  },
}
</script>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px clamp(16px, 3vw, 36px);
  background: color-mix(in srgb, var(--bg) 78%, transparent);
  backdrop-filter: saturate(150%) blur(14px);
  -webkit-backdrop-filter: saturate(150%) blur(14px);
  border-bottom: 1px solid var(--border);
}
.topbar__left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}
.topbar__menu {
  display: none;
}
.topbar__title h1 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.12;
}
.topbar__title p {
  margin: 2px 0 0;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.topbar__right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search {
  position: relative;
  display: flex;
  align-items: center;
}
.search__icon {
  position: absolute;
  left: 13px;
  color: var(--text-muted);
  pointer-events: none;
  display: inline-flex;
}
.search__input {
  width: 240px;
  height: 42px;
  padding: 0 38px 0 38px;
  border-radius: var(--r-md);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font-size: 0.9rem;
  font-family: inherit;
  transition: border-color var(--dur) var(--ease),
    box-shadow var(--dur) var(--ease), background-color var(--dur) var(--ease);
}
.search__input::placeholder {
  color: var(--text-muted);
}
.search__input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
}
.search__kbd {
  position: absolute;
  right: 11px;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-muted);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 2px 7px;
  line-height: 1.2;
}

.locale {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 4px;
}
.locale__item {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: opacity var(--dur) var(--ease), background-color var(--dur) var(--ease);
}
.locale__item:hover {
  opacity: 1;
  background: var(--surface-2);
}
.locale__item .flag-icon {
  border-radius: 3px;
  box-shadow: var(--shadow-xs);
}

.topbar__bell {
  position: relative;
}
.topbar__dot {
  position: absolute;
  top: 9px;
  right: 10px;
  width: 7px;
  height: 7px;
  border-radius: 9999px;
  background: var(--p-high);
  border: 2px solid var(--bg);
}

.topbar__user {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 5px 12px 5px 5px;
  border-radius: var(--r-full);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  cursor: pointer;
  transition: border-color var(--dur) var(--ease), background-color var(--dur) var(--ease);
}
.topbar__user:hover {
  border-color: var(--border-strong);
  background: var(--surface-hover);
}
.topbar__avatar {
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  background: var(--accent-grad);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.topbar__user-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text);
}

@media (max-width: 900px) {
  .topbar__menu {
    display: inline-flex;
  }
}
@media (max-width: 720px) {
  .search,
  .locale,
  .topbar__user-name {
    display: none;
  }
  .topbar__title p {
    display: none;
  }
}
</style>
