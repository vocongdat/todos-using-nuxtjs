<template>
  <div class="board anim-fade-in">
    <div class="board__stats stagger">
      <div v-for="s in stats" :key="s.key" class="stat surface-card">
        <span class="stat__icon" :style="{ background: s.soft, color: s.color }">
          <Icon :name="s.icon" :size="20" />
        </span>
        <div class="stat__body">
          <span class="stat__value"><AnimatedNumber :value="s.value" /></span>
          <span class="stat__label">{{ s.label }}</span>
        </div>
      </div>

      <div class="stat stat--progress surface-card">
        <div class="ring" :style="ringStyle">
          <span class="ring__text"><AnimatedNumber :value="ringProgress" suffix="%" /></span>
        </div>
        <div class="stat__body">
          <span class="stat__value">On track</span>
          <span class="stat__label">Completion rate</span>
        </div>
      </div>
    </div>

    <div class="board__tabs">
      <button
        v-for="(col, i) in columns"
        :key="col.key"
        class="board__tab"
        :class="{ 'is-active': activeCol === i }"
        @click="activeCol = i"
      >
        <span class="board__tab-dot" :style="{ background: col.color }"></span>
        {{ col.title }}
        <span class="board__tab-num">{{ tasksFor(col.key).length }}</span>
      </button>
    </div>

    <div class="board__columns" :class="'show-' + activeCol">
      <TaskColumn
        v-for="col in columns"
        :key="col.key"
        :status-key="col.key"
        :title="col.title"
        :color="col.color"
        :tasks="tasksFor(col.key)"
        :is-over="overColumn === col.key"
        @add="addTask"
        @toggle="toggle"
        @remove="remove"
        @advance="advance"
        @card-dragstart="onCardDragStart"
        @card-dragend="onCardDragEnd"
        @over="overColumn = $event"
        @leave="onLeave"
        @drop="onDrop"
      />
    </div>
  </div>
</template>

<script>
import { STATUSES } from '~/store/todos'

const NEXT = { todo: 'progress', progress: 'done' }

export default {
  name: 'BoardPage',
  data() {
    return {
      draggedId: null,
      overColumn: null,
      activeCol: 0,
      ringProgress: 0,
      columns: [
        { key: 'todo', title: 'To do', color: 'var(--c-todo)' },
        { key: 'progress', title: 'In progress', color: 'var(--c-progress)' },
        { key: 'done', title: 'Completed', color: 'var(--c-done)' },
      ],
    }
  },
  computed: {
    progress() {
      return this.$store.getters['todos/progress']
    },
    ringStyle() {
      const deg = (this.ringProgress / 100) * 360
      return {
        background: `conic-gradient(var(--accent) ${deg}deg, var(--surface-3) ${deg}deg)`,
      }
    },
    stats() {
      const g = this.$store.getters
      return [
        {
          key: 'total',
          label: 'Total tasks',
          value: g['todos/total'],
          icon: 'layers',
          color: 'var(--c-todo)',
          soft: 'var(--c-todo-soft)',
        },
        {
          key: 'progress',
          label: 'In progress',
          value: g['todos/count']('progress'),
          icon: 'clock',
          color: 'var(--c-progress)',
          soft: 'var(--c-progress-soft)',
        },
        {
          key: 'done',
          label: 'Completed',
          value: g['todos/count']('done'),
          icon: 'check',
          color: 'var(--c-done)',
          soft: 'var(--c-done-soft)',
        },
      ]
    },
  },
  watch: {
    progress(val) {
      this.ringProgress = val
    },
  },
  mounted() {
    // let the ring sweep from 0 to its real value on first paint
    this.$nextTick(() => {
      window.requestAnimationFrame(() => {
        this.ringProgress = this.progress
      })
    })
  },
  methods: {
    tasksFor(status) {
      return this.$store.getters['todos/byStatus'](status)
    },
    addTask(payload) {
      this.$store.commit('todos/add', payload)
    },
    toggle(task) {
      this.$store.commit('todos/toggle', task)
    },
    remove(id) {
      this.$store.commit('todos/remove', id)
    },
    advance(task) {
      const status = NEXT[task.status]
      if (status) this.$store.commit('todos/update', { id: task.id, patch: { status } })
    },
    onCardDragStart(task) {
      this.draggedId = task.id
    },
    onCardDragEnd() {
      this.draggedId = null
      this.overColumn = null
    },
    onLeave(key) {
      if (this.overColumn === key) this.overColumn = null
    },
    onDrop(status) {
      if (this.draggedId && STATUSES.includes(status)) {
        this.$store.commit('todos/update', {
          id: this.draggedId,
          patch: { status },
        })
      }
      this.draggedId = null
      this.overColumn = null
    },
  },
}
</script>

<style scoped>
.board {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 22px;
}
/* Fine dot-grid that fades in behind the board — a designer's surface,
   not a flat wall. Masked so it never reaches the edges. */
.board::before {
  content: '';
  position: absolute;
  inset: -60px -40px;
  z-index: 0;
  pointer-events: none;
  background-image: radial-gradient(var(--grid-dot) 1px, transparent 1.5px);
  background-size: 26px 26px;
  -webkit-mask-image: radial-gradient(
    ellipse 70% 55% at 50% 38%,
    #000 0%,
    transparent 78%
  );
  mask-image: radial-gradient(
    ellipse 70% 55% at 50% 38%,
    #000 0%,
    transparent 78%
  );
}
.board > * {
  position: relative;
  z-index: 1;
}

.board__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.stat {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border-radius: var(--r-lg);
}
.stat__icon {
  width: 46px;
  height: 46px;
  border-radius: 13px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
}
.stat__body {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.stat__value {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}
.stat__label {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 2px;
}

.ring {
  width: 46px;
  height: 46px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  transition: background 0.6s var(--ease);
}
.ring__text {
  width: 34px;
  height: 34px;
  border-radius: 9999px;
  background: var(--surface);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text);
}

.board__columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  align-items: start;
}

/* Mobile column switcher — hidden on desktop */
.board__tabs {
  display: none;
  gap: 8px;
  padding: 4px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--r-full);
  box-shadow: inset 0 1px 0 var(--inset-hi);
}
.board__tab {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 9px 8px;
  border: 0;
  border-radius: var(--r-full);
  background: transparent;
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color var(--dur) var(--ease), color var(--dur) var(--ease),
    box-shadow var(--dur) var(--ease);
}
.board__tab.is-active {
  background: var(--surface);
  color: var(--text);
  box-shadow: var(--shadow-sm);
}
.board__tab-dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
}
.board__tab-num {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-muted);
}

@media (max-width: 1100px) {
  .board__stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 860px) {
  /* Phone: one focused column at a time, chosen via the tab switcher.
     A real layout decision, not a squeeze. */
  .board::before {
    display: none;
  }
  .board__tabs {
    display: flex;
  }
  .board .board__columns {
    grid-template-columns: 1fr;
  }
  .board .board__columns > * {
    display: none;
  }
  .board .board__columns.show-0 > *:nth-child(1),
  .board .board__columns.show-1 > *:nth-child(2),
  .board .board__columns.show-2 > *:nth-child(3) {
    display: flex;
    animation: fade-up 0.4s var(--ease) both;
  }
}
@media (max-width: 520px) {
  /* tidy 2x2 instead of a tall stack */
  .board__stats {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .stat {
    padding: 14px;
    gap: 11px;
  }
  .stat__icon,
  .ring {
    width: 40px;
    height: 40px;
  }
  .stat__value {
    font-size: 1.4rem;
  }
}
</style>
