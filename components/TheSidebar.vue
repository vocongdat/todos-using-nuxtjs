<template>
  <aside class="sidebar" :class="{ 'is-open': open }">
    <div class="sidebar__brand">
      <span class="sidebar__logo">
        <Icon name="layers" :size="20" :stroke-width="2.2" />
      </span>
      <span class="sidebar__brand-text">
        Tasks<span class="sidebar__brand-dot">.</span>
      </span>
    </div>

    <nav class="sidebar__nav">
      <p class="sidebar__label">Workspace</p>
      <NuxtLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="nav-item"
        active-class="is-active"
        :exact="item.exact"
        @click.native="$emit('navigate')"
      >
        <span class="nav-item__icon"><Icon :name="item.icon" :size="19" /></span>
        <span class="nav-item__text">{{ item.title }}</span>
        <span v-if="item.badge" class="nav-item__badge">{{ item.badge }}</span>
      </NuxtLink>
    </nav>

    <div class="sidebar__progress surface-card">
      <div class="sidebar__progress-head">
        <span>Weekly progress</span>
        <strong>{{ progress }}%</strong>
      </div>
      <div class="bar">
        <div class="bar__fill" :style="{ width: barWidth + '%' }"></div>
      </div>
      <p class="sidebar__progress-sub">{{ doneCount }} of {{ total }} tasks done</p>
    </div>

    <div class="sidebar__foot">
      <div class="nav-item nav-item--muted">
        <span class="nav-item__icon"><Icon name="settings" :size="19" /></span>
        <span class="nav-item__text">Settings</span>
      </div>
      <div class="nav-item nav-item--muted">
        <span class="nav-item__icon"><Icon name="logout" :size="19" /></span>
        <span class="nav-item__text">Log out</span>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'TheSidebar',
  props: {
    open: { type: Boolean, default: false },
  },
  data() {
    return {
      barWidth: 0,
      items: [
        { title: 'Today', to: '/', icon: 'home', exact: true },
        { title: 'Board', to: '/todos', icon: 'board', exact: false },
        { title: 'New task', to: '/addTask', icon: 'plus', exact: false },
        { title: 'About', to: '/about', icon: 'info', exact: false },
      ],
    }
  },
  watch: {
    progress(val) {
      this.barWidth = val
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.requestAnimationFrame(() => {
        this.barWidth = this.progress
      })
    })
  },
  computed: {
    progress() {
      return this.$store.getters['todos/progress']
    },
    doneCount() {
      return this.$store.getters['todos/count']('done')
    },
    total() {
      return this.$store.getters['todos/total']
    },
  },
}
</script>

<style scoped>
.sidebar {
  width: 248px;
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 22px 16px;
  background: var(--surface);
  border-right: 1px solid var(--border);
}

.sidebar__brand {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 6px 8px 18px;
}
.sidebar__logo {
  width: 38px;
  height: 38px;
  border-radius: 11px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: var(--accent-grad);
  box-shadow: var(--shadow-accent);
}
.sidebar__brand-text {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}
.sidebar__brand-dot {
  color: var(--accent);
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.sidebar__label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 6px 10px;
  margin: 4px 0 2px;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--r-md);
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.93rem;
  cursor: pointer;
  text-decoration: none;
  transition: background-color var(--dur) var(--ease),
    color var(--dur) var(--ease);
}
.nav-item__icon {
  color: var(--text-muted);
  display: inline-flex;
  transition: color var(--dur) var(--ease), transform var(--dur) var(--ease);
}
.nav-item:hover {
  background: var(--surface-2);
  color: var(--text);
}
.nav-item:hover .nav-item__icon {
  color: var(--text-secondary);
  transform: translateX(1px);
}
.nav-item.is-active {
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
}
.nav-item.is-active .nav-item__icon {
  color: var(--accent);
}
.nav-item.is-active::before {
  content: '';
  position: absolute;
  left: -16px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 22px;
  border-radius: 0 4px 4px 0;
  background: var(--accent);
  animation: nav-indicator 0.4s var(--spring) both;
}
@keyframes nav-indicator {
  from { transform: translateY(-50%) scaleY(0); opacity: 0; }
  to { transform: translateY(-50%) scaleY(1); opacity: 1; }
}
.nav-item__text {
  flex: 1;
}
.nav-item__badge {
  font-size: 0.7rem;
  font-weight: 700;
  background: var(--accent);
  color: #fff;
  border-radius: 9999px;
  padding: 2px 7px;
  line-height: 1;
}
.nav-item--muted {
  color: var(--text-muted);
}

.sidebar__progress {
  margin-top: auto;
  padding: 14px;
  border-radius: var(--r-md);
}
.sidebar__progress-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 9px;
}
.sidebar__progress-head strong {
  color: var(--text);
  font-size: 0.95rem;
}
.bar {
  height: 7px;
  border-radius: 9999px;
  background: var(--surface-3);
  overflow: hidden;
}
.bar__fill {
  height: 100%;
  border-radius: 9999px;
  background: var(--accent-grad);
  transition: width 0.6s var(--ease);
}
.sidebar__progress-sub {
  margin: 9px 0 0;
  font-size: 0.74rem;
  color: var(--text-muted);
}

.sidebar__foot {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-top: 6px;
}

/* Mobile drawer */
@media (max-width: 900px) {
  .sidebar {
    position: fixed;
    z-index: 60;
    left: 0;
    top: 0;
    transform: translateX(-100%);
    transition: transform 0.35s var(--ease);
    box-shadow: var(--shadow-xl);
  }
  .sidebar.is-open {
    transform: translateX(0);
  }
}
</style>
