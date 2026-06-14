<template>
  <article
    class="card"
    :class="[`prio-${task.priority}`, { 'is-done': task.status === 'done', 'is-dragging': dragging }]"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
  >
    <span class="card__rail"></span>

    <header class="card__top">
      <div class="card__tags">
        <span v-for="tag in task.tags" :key="tag" class="chip card__tag">{{ tag }}</span>
        <span v-if="!task.tags.length" class="chip card__tag card__tag--empty">Task</span>
      </div>
      <div class="card__actions">
        <button
          class="card__act"
          type="button"
          :aria-label="task.status === 'done' ? 'Mark as not done' : 'Mark as done'"
          @click="$emit('toggle', task)"
        >
          <Icon :name="task.status === 'done' ? 'check-circle' : 'circle'" :size="18" />
        </button>
        <button class="card__act card__act--danger" type="button" aria-label="Delete task" @click="$emit('remove', task.id)">
          <Icon name="trash" :size="16" />
        </button>
        <span class="card__grip" aria-hidden="true"><Icon name="grip" :size="16" /></span>
      </div>
    </header>

    <h4 class="card__title">{{ task.title }}</h4>
    <p v-if="task.description" class="card__desc">{{ task.description }}</p>

    <footer class="card__foot">
      <div class="card__avatars">
        <span
          v-for="(a, i) in task.assignees"
          :key="a + i"
          class="avatar card__avatar"
          :style="avatarStyle(a)"
        >{{ a }}</span>
        <span v-if="!task.assignees.length" class="card__avatar card__avatar--add">
          <Icon name="plus" :size="14" />
        </span>
      </div>

      <div class="card__meta">
        <span class="card__prio" :title="task.priority + ' priority'">
          <Icon name="flag" :size="13" :stroke-width="2.4" />
          {{ task.priority }}
        </span>
        <button
          v-if="task.status !== 'done'"
          class="card__next"
          type="button"
          :aria-label="nextLabel"
          @click="$emit('advance', task)"
        >
          <Icon name="arrow-right" :size="15" />
        </button>
      </div>
    </footer>
  </article>
</template>

<script>
const PALETTE = [
  ['#6366f1', '#8b5cf6'],
  ['#0ea5e9', '#22d3ee'],
  ['#f43f5e', '#fb7185'],
  ['#10b981', '#34d399'],
  ['#f59e0b', '#fbbf24'],
  ['#8b5cf6', '#d946ef'],
]

export default {
  name: 'TaskCard',
  props: {
    task: { type: Object, required: true },
  },
  data() {
    return { dragging: false }
  },
  computed: {
    nextLabel() {
      return this.task.status === 'todo' ? 'Move to In progress' : 'Mark complete'
    },
  },
  methods: {
    avatarStyle(initials) {
      let sum = 0
      for (let i = 0; i < initials.length; i++) sum += initials.charCodeAt(i)
      const [a, b] = PALETTE[sum % PALETTE.length]
      return { backgroundImage: `linear-gradient(135deg, ${a}, ${b})` }
    },
    onDragStart(e) {
      this.dragging = true
      this.$emit('dragstart', this.task)
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move'
        try {
          e.dataTransfer.setData('text/plain', this.task.id)
        } catch (err) {
          /* ignore */
        }
      }
    },
    onDragEnd() {
      this.dragging = false
      this.$emit('dragend', this.task)
    },
  },
}
</script>

<style scoped>
.card {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 14px 15px 13px 17px;
  box-shadow: var(--shadow-sm), inset 0 1px 0 var(--inset-hi);
  cursor: grab;
  overflow: hidden;
  transition: box-shadow var(--dur) var(--ease), transform var(--dur) var(--ease),
    border-color var(--dur) var(--ease), opacity var(--dur) var(--ease);
}
.card:hover {
  box-shadow: var(--shadow-lg), inset 0 1px 0 var(--inset-hi);
  transform: translateY(-3px);
  border-color: var(--border-strong);
}
.card:active {
  cursor: grabbing;
}
.card.is-dragging {
  opacity: 0.45;
  transform: scale(0.98) rotate(-1deg);
}

.card__rail {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  border-radius: 4px 0 0 4px;
}
.prio-high .card__rail { background: var(--p-high); }
.prio-medium .card__rail { background: var(--p-medium); }
.prio-low .card__rail { background: var(--p-low); }

.card__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 9px;
}
.card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.card__tag {
  background: var(--accent-soft);
  color: var(--accent);
}
.card__tag--empty {
  background: var(--surface-2);
  color: var(--text-muted);
}

.card__actions {
  display: flex;
  align-items: center;
  gap: 2px;
  flex: none;
}
.card__act {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 0;
  background: transparent;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transform: translateY(-2px);
  transition: opacity var(--dur) var(--ease), color var(--dur) var(--ease),
    background-color var(--dur) var(--ease), transform var(--dur) var(--ease);
}
.card:hover .card__act {
  opacity: 1;
  transform: translateY(0);
}
.card__act:hover {
  background: var(--surface-2);
  color: var(--text);
}
.card__act--danger:hover {
  background: rgba(239, 68, 68, 0.12);
  color: var(--p-high);
}
.is-done .card__act:first-of-type {
  opacity: 1;
  color: var(--c-done);
  animation: check-pop 0.42s var(--spring);
}
.card__grip {
  color: var(--text-muted);
  opacity: 0;
  margin-left: 1px;
  transition: opacity var(--dur) var(--ease);
}
.card:hover .card__grip {
  opacity: 0.6;
}

.card__title {
  font-size: 0.96rem;
  font-weight: 600;
  line-height: 1.35;
  color: var(--text);
}
.is-done .card__title {
  text-decoration: line-through;
  text-decoration-color: var(--text-muted);
  color: var(--text-secondary);
}
.card__desc {
  margin: 6px 0 0;
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 13px;
}
.card__avatars {
  display: flex;
  align-items: center;
}
.card__avatar {
  width: 28px;
  height: 28px;
}
.card__avatar + .card__avatar {
  margin-left: -8px;
}
.card__avatar--add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1.5px dashed var(--border-strong);
  border-radius: 9999px;
  color: var(--text-muted);
}

.card__meta {
  display: flex;
  align-items: center;
  gap: 8px;
}
.card__prio {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: capitalize;
  color: var(--text-muted);
}
.prio-high .card__prio { color: var(--p-high); }
.prio-medium .card__prio { color: var(--p-medium); }
.prio-low .card__prio { color: var(--p-low); }

.card__next {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text-secondary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color var(--dur) var(--ease), color var(--dur) var(--ease),
    border-color var(--dur) var(--ease), transform 0.4s var(--spring);
}
.card__next:hover {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
  transform: translateX(4px);
}
</style>
