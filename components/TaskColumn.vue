<template>
  <section
    class="column"
    :class="{ 'is-over': isOver }"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
  >
    <header class="column__head">
      <div class="column__title">
        <span class="column__dot" :style="{ background: color }"></span>
        <h3>{{ title }}</h3>
        <span class="column__count">{{ tasks.length }}</span>
      </div>
      <button class="column__add-btn" type="button" aria-label="Add task" @click="startAdd">
        <Icon name="plus" :size="17" />
      </button>
    </header>

    <transition name="composer">
      <div v-if="adding" class="composer">
        <input
          ref="input"
          v-model="draft"
          class="composer__input"
          type="text"
          placeholder="Task title…"
          @keyup.enter="commit"
          @keyup.esc="cancelAdd"
          @blur="cancelAdd"
        />
        <div class="composer__hint">
          <span>Enter to add</span>
          <span>Esc to cancel</span>
        </div>
      </div>
    </transition>

    <transition-group tag="div" name="list" class="column__list">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="$emit('toggle', $event)"
        @remove="$emit('remove', $event)"
        @advance="$emit('advance', $event)"
        @dragstart="$emit('card-dragstart', $event)"
        @dragend="$emit('card-dragend', $event)"
      />
      <div v-if="!tasks.length" key="__empty" class="column__empty">
        <span class="column__empty-icon" :style="{ color }">
          <Icon name="layers" :size="22" />
        </span>
        <p>No tasks here yet</p>
        <button class="column__empty-add" type="button" @click="startAdd">Add one</button>
      </div>
    </transition-group>
  </section>
</template>

<script>
export default {
  name: 'TaskColumn',
  props: {
    statusKey: { type: String, required: true },
    title: { type: String, required: true },
    color: { type: String, default: 'var(--accent)' },
    tasks: { type: Array, default: () => [] },
    isOver: { type: Boolean, default: false },
  },
  data() {
    return { adding: false, draft: '' }
  },
  methods: {
    startAdd() {
      this.adding = true
      this.$nextTick(() => this.$refs.input && this.$refs.input.focus())
    },
    commit() {
      const title = this.draft.trim()
      if (title) this.$emit('add', { title, status: this.statusKey })
      this.draft = ''
      this.adding = false
    },
    cancelAdd() {
      // allow the click on commit/enter to register before closing
      setTimeout(() => {
        this.adding = false
        this.draft = ''
      }, 120)
    },
    onDragOver() {
      this.$emit('over', this.statusKey)
    },
    onDragLeave(e) {
      // only clear when leaving the column entirely
      if (!e.currentTarget.contains(e.relatedTarget)) {
        this.$emit('leave', this.statusKey)
      }
    },
    onDrop() {
      this.$emit('drop', this.statusKey)
    },
  },
}
</script>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    180deg,
    var(--surface) 0%,
    var(--surface-2) 46%
  );
  border: 1px solid var(--border);
  border-radius: var(--r-xl);
  padding: 14px 12px;
  min-height: 240px;
  box-shadow: var(--shadow-xs), inset 0 1px 0 var(--inset-hi);
  transition: background-color var(--dur) var(--ease),
    border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
}
.column.is-over {
  border-color: var(--accent);
  background: var(--accent-soft);
  box-shadow: inset 0 0 0 1px var(--accent-ring);
}

.column__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 6px 12px;
}
.column__title {
  display: flex;
  align-items: center;
  gap: 9px;
}
.column__dot {
  width: 9px;
  height: 9px;
  border-radius: 9999px;
}
.column__title h3 {
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.column__count {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-secondary);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 9999px;
  padding: 1px 9px;
  line-height: 1.5;
}
.column__add-btn {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color var(--dur) var(--ease), color var(--dur) var(--ease);
}
.column__add-btn:hover {
  background: var(--surface);
  color: var(--accent);
}

.column__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  padding: 2px;
}

.composer {
  margin: 0 2px 10px;
}
.composer__input {
  width: 100%;
  height: 42px;
  padding: 0 13px;
  border-radius: var(--r-md);
  border: 1px solid var(--accent);
  background: var(--surface);
  color: var(--text);
  font-size: 0.9rem;
  font-family: inherit;
  box-shadow: 0 0 0 4px var(--accent-soft);
}
.composer__input:focus {
  outline: none;
}
.composer__hint {
  display: flex;
  gap: 12px;
  margin-top: 6px;
  padding: 0 4px;
  font-size: 0.7rem;
  color: var(--text-muted);
}
.composer-enter-active,
.composer-leave-active {
  transition: opacity 0.25s var(--ease), transform 0.25s var(--ease);
}
.composer-enter,
.composer-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.column__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 26px 10px;
  text-align: center;
  border: 1.5px dashed var(--border-strong);
  border-radius: var(--r-lg);
  color: var(--text-muted);
}
.column__empty-icon {
  opacity: 0.6;
}
.column__empty p {
  margin: 0;
  font-size: 0.82rem;
}
.column__empty-add {
  border: 0;
  background: none;
  color: var(--accent);
  font-weight: 600;
  font-size: 0.82rem;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 6px;
}
.column__empty-add:hover {
  text-decoration: underline;
}
</style>
