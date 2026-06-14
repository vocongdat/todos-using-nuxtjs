<template>
  <div class="today anim-fade-in">
    <section class="quickadd surface-card">
      <span class="quickadd__icon"><Icon name="sparkles" :size="20" /></span>
      <input
        v-model="draft"
        class="quickadd__input"
        type="text"
        placeholder="What needs to be done today?"
        @keyup.enter="add"
      />
      <button class="btn btn-primary" :disabled="!draft.trim()" @click="add">
        <Icon name="plus" :size="18" /> Add task
      </button>
    </section>

    <div class="today__head">
      <div class="filters">
        <button
          v-for="f in filters"
          :key="f.key"
          class="filters__pill"
          :class="{ 'is-active': filter === f.key }"
          @click="filter = f.key"
        >
          {{ f.label }}
          <span class="filters__num">{{ countFor(f.key) }}</span>
        </button>
      </div>
      <button v-if="doneCount" class="today__clear" @click="clearDone">
        <Icon name="trash" :size="15" /> Clear completed
      </button>
    </div>

    <transition-group tag="ul" name="list" class="task-list">
      <li
        v-for="task in filtered"
        :key="task.id"
        class="row"
        :class="{ 'is-done': task.status === 'done' }"
      >
        <button
          class="row__check"
          :class="`prio-${task.priority}`"
          type="button"
          :aria-label="task.status === 'done' ? 'Mark incomplete' : 'Mark complete'"
          @click="toggle(task)"
        >
          <Icon v-if="task.status === 'done'" name="check" :size="14" :stroke-width="3" />
        </button>

        <div class="row__body">
          <span class="row__title">{{ task.title }}</span>
          <div class="row__meta">
            <span v-for="tag in task.tags" :key="tag" class="chip row__tag">{{ tag }}</span>
            <span class="row__status" :data-s="task.status">{{ statusLabel(task.status) }}</span>
          </div>
        </div>

        <div class="row__avatars">
          <span
            v-for="(a, i) in task.assignees"
            :key="a + i"
            class="avatar row__avatar"
            :style="avatarStyle(a)"
          >{{ a }}</span>
        </div>

        <button class="row__del" type="button" aria-label="Delete" @click="remove(task.id)">
          <Icon name="trash" :size="16" />
        </button>
      </li>

      <li v-if="!filtered.length" key="__empty" class="empty">
        <span class="empty__icon"><Icon name="check-circle" :size="30" /></span>
        <h3>{{ emptyHeading }}</h3>
        <p>{{ emptySub }}</p>
      </li>
    </transition-group>
  </div>
</template>

<script>
const PALETTE = [
  ['#6366f1', '#8b5cf6'],
  ['#0ea5e9', '#22d3ee'],
  ['#f43f5e', '#fb7185'],
  ['#10b981', '#34d399'],
  ['#f59e0b', '#fbbf24'],
]

export default {
  name: 'TodayPage',
  data() {
    return {
      draft: '',
      filter: 'all',
      filters: [
        { key: 'all', label: 'All' },
        { key: 'active', label: 'Active' },
        { key: 'done', label: 'Completed' },
      ],
    }
  },
  computed: {
    tasks() {
      return this.$store.state.todos.tasks
    },
    filtered() {
      if (this.filter === 'active') return this.tasks.filter((t) => t.status !== 'done')
      if (this.filter === 'done') return this.tasks.filter((t) => t.status === 'done')
      return this.tasks
    },
    doneCount() {
      return this.$store.getters['todos/count']('done')
    },
    emptyHeading() {
      if (this.filter === 'done') return 'Nothing completed yet'
      if (this.filter === 'active') return 'All clear'
      return 'Your day is wide open'
    },
    emptySub() {
      if (this.filter === 'done') return 'Finished tasks will show up here.'
      if (this.filter === 'active') return 'No active tasks — enjoy the calm.'
      return 'Add your first task above to get started.'
    },
  },
  methods: {
    add() {
      const title = this.draft.trim()
      if (!title) return
      this.$store.commit('todos/add', { title, status: 'todo' })
      this.draft = ''
    },
    toggle(task) {
      this.$store.commit('todos/toggle', task)
    },
    remove(id) {
      this.$store.commit('todos/remove', id)
    },
    clearDone() {
      this.$store.commit('todos/clearDone')
    },
    countFor(key) {
      if (key === 'active') return this.tasks.filter((t) => t.status !== 'done').length
      if (key === 'done') return this.doneCount
      return this.tasks.length
    },
    statusLabel(s) {
      return { todo: 'To do', progress: 'In progress', done: 'Completed' }[s]
    },
    avatarStyle(initials) {
      let sum = 0
      for (let i = 0; i < initials.length; i++) sum += initials.charCodeAt(i)
      const [a, b] = PALETTE[sum % PALETTE.length]
      return { backgroundImage: `linear-gradient(135deg, ${a}, ${b})` }
    },
  },
}
</script>

<style scoped>
.today {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 760px;
  margin: 0 auto;
}

.quickadd {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 12px 12px 18px;
  border-radius: var(--r-lg);
}
.quickadd__icon {
  color: var(--accent);
  flex: none;
}
.quickadd__input {
  flex: 1;
  min-width: 0;
  height: 44px;
  border: 0;
  background: transparent;
  color: var(--text);
  font-size: 1rem;
  font-family: inherit;
}
.quickadd__input:focus {
  outline: none;
}
.quickadd__input::placeholder {
  color: var(--text-muted);
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}

.today__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.filters {
  display: flex;
  gap: 6px;
}
.filters__pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 14px;
  border-radius: 9999px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--dur) var(--ease);
}
.filters__pill:hover {
  border-color: var(--border-strong);
  color: var(--text);
}
.filters__pill.is-active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
.filters__num {
  font-size: 0.72rem;
  background: var(--surface-2);
  color: var(--text-secondary);
  border-radius: 9999px;
  padding: 1px 7px;
}
.filters__pill.is-active .filters__num {
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
}
.today__clear {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 0;
  background: none;
  color: var(--text-muted);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 8px;
  transition: color var(--dur) var(--ease), background-color var(--dur) var(--ease);
}
.today__clear:hover {
  color: var(--p-high);
  background: rgba(239, 68, 68, 0.1);
}

.task-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 9px;
  position: relative;
}
.row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  box-shadow: var(--shadow-xs);
  transition: box-shadow var(--dur) var(--ease), border-color var(--dur) var(--ease),
    transform var(--dur) var(--ease);
}
.row:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--border-strong);
  transform: translateY(-1px);
}
.row__check {
  width: 24px;
  height: 24px;
  flex: none;
  border-radius: 9999px;
  border: 2px solid var(--border-strong);
  background: var(--surface);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--dur) var(--ease);
}
.row__check.prio-high { border-color: var(--p-high); }
.row__check.prio-medium { border-color: var(--p-medium); }
.row__check.prio-low { border-color: var(--p-low); }
.row__check:hover {
  transform: scale(1.1);
}
.is-done .row__check {
  background: var(--c-done);
  border-color: var(--c-done);
  animation: check-pop 0.42s var(--spring);
}
.row__body {
  flex: 1;
  min-width: 0;
}
.row__title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
}
.is-done .row__title {
  text-decoration: line-through;
  color: var(--text-muted);
}
.row__meta {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 5px;
  flex-wrap: wrap;
}
.row__tag {
  background: var(--accent-soft);
  color: var(--accent);
}
.row__status {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-muted);
}
.row__status[data-s='progress'] { color: var(--c-progress); }
.row__status[data-s='done'] { color: var(--c-done); }

.row__avatars {
  display: flex;
  align-items: center;
}
.row__avatar {
  width: 28px;
  height: 28px;
}
.row__avatar + .row__avatar {
  margin-left: -8px;
}
.row__del {
  width: 32px;
  height: 32px;
  flex: none;
  border-radius: 9px;
  border: 0;
  background: transparent;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all var(--dur) var(--ease);
}
.row:hover .row__del {
  opacity: 1;
}
.row__del:hover {
  background: rgba(239, 68, 68, 0.12);
  color: var(--p-high);
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 56px 20px;
  text-align: center;
  color: var(--text-muted);
}
.empty__icon {
  color: var(--c-done);
  opacity: 0.5;
  margin-bottom: 4px;
}
.empty h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.15rem;
  color: var(--text-secondary);
}
.empty p {
  margin: 0;
  font-size: 0.88rem;
}

@media (max-width: 560px) {
  .quickadd .btn span,
  .quickadd .btn {
    white-space: nowrap;
  }
  .today__head {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
