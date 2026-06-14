<template>
  <div class="addpage anim-fade-in">
    <form class="form surface-card" @submit.prevent="submit">
      <div class="form__head">
        <h2>Create a task</h2>
        <p>Add the details and drop it straight onto your board.</p>
      </div>

      <label class="field">
        <span class="field__label">Title</span>
        <input
          v-model="form.title"
          class="field__input"
          type="text"
          placeholder="e.g. Polish the onboarding flow"
          required
        />
      </label>

      <label class="field">
        <span class="field__label">Description <span class="field__opt">optional</span></span>
        <textarea
          v-model="form.description"
          class="field__input field__textarea"
          rows="3"
          placeholder="Add any context, links or acceptance criteria…"
        ></textarea>
      </label>

      <div class="field__row">
        <div class="field">
          <span class="field__label">Status</span>
          <div class="seg">
            <button
              v-for="s in statuses"
              :key="s.key"
              type="button"
              class="seg__btn"
              :class="{ 'is-active': form.status === s.key }"
              @click="form.status = s.key"
            >
              <span class="seg__dot" :style="{ background: s.color }"></span>{{ s.label }}
            </button>
          </div>
        </div>

        <div class="field">
          <span class="field__label">Priority</span>
          <div class="seg">
            <button
              v-for="p in priorities"
              :key="p.key"
              type="button"
              class="seg__btn"
              :class="{ 'is-active': form.priority === p.key }"
              @click="form.priority = p.key"
            >
              <span class="seg__dot" :style="{ background: p.color }"></span>{{ p.label }}
            </button>
          </div>
        </div>
      </div>

      <label class="field">
        <span class="field__label">Tags <span class="field__opt">comma separated</span></span>
        <input
          v-model="tagInput"
          class="field__input"
          type="text"
          placeholder="Design, Frontend"
        />
      </label>

      <div class="form__foot">
        <NuxtLink to="/todos" class="btn btn-ghost">Cancel</NuxtLink>
        <button type="submit" class="btn btn-primary" :disabled="!form.title.trim()">
          <Icon name="check" :size="18" /> Create task
        </button>
      </div>
    </form>

    <aside class="preview">
      <span class="preview__label">Live preview</span>
      <TaskCard :task="previewTask" class="preview__card" />
    </aside>
  </div>
</template>

<script>
export default {
  name: 'AddTaskPage',
  data() {
    return {
      form: {
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
      },
      tagInput: '',
      statuses: [
        { key: 'todo', label: 'To do', color: 'var(--c-todo)' },
        { key: 'progress', label: 'In progress', color: 'var(--c-progress)' },
        { key: 'done', label: 'Done', color: 'var(--c-done)' },
      ],
      priorities: [
        { key: 'low', label: 'Low', color: 'var(--p-low)' },
        { key: 'medium', label: 'Medium', color: 'var(--p-medium)' },
        { key: 'high', label: 'High', color: 'var(--p-high)' },
      ],
    }
  },
  computed: {
    tags() {
      return this.tagInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    },
    previewTask() {
      return {
        id: 'preview',
        title: this.form.title.trim() || 'Your task title',
        description: this.form.description.trim(),
        status: this.form.status,
        priority: this.form.priority,
        tags: this.tags,
        assignees: ['CĐ'],
        createdAt: Date.now(),
      }
    },
  },
  methods: {
    submit() {
      if (!this.form.title.trim()) return
      this.$store.commit('todos/add', {
        ...this.form,
        tags: this.tags,
        assignees: ['CĐ'],
      })
      this.$router.push('/todos')
    },
  },
}
</script>

<style scoped>
.addpage {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 24px;
  align-items: start;
  max-width: 980px;
  margin: 0 auto;
}

.form {
  padding: 26px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.form__head h2 {
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 600;
}
.form__head p {
  margin: 4px 0 0;
  color: var(--text-muted);
  font-size: 0.88rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.field__label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-secondary);
}
.field__opt {
  font-weight: 500;
  color: var(--text-muted);
  font-size: 0.76rem;
}
.field__input {
  width: 100%;
  padding: 11px 14px;
  border-radius: var(--r-md);
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text);
  font-size: 0.92rem;
  font-family: inherit;
  transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease),
    background-color var(--dur) var(--ease);
}
.field__input:focus {
  outline: none;
  border-color: var(--accent);
  background: var(--surface);
  box-shadow: 0 0 0 4px var(--accent-soft);
}
.field__input::placeholder {
  color: var(--text-muted);
}
.field__textarea {
  resize: vertical;
  min-height: 84px;
  line-height: 1.5;
}
.field__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.seg {
  display: flex;
  gap: 6px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  padding: 4px;
}
.seg__btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 4px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color var(--dur) var(--ease), color var(--dur) var(--ease),
    box-shadow var(--dur) var(--ease);
}
.seg__btn:hover {
  color: var(--text);
}
.seg__btn.is-active {
  background: var(--surface);
  color: var(--text);
  box-shadow: var(--shadow-sm);
}
.seg__dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
}

.form__foot {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 4px;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}

.preview {
  position: sticky;
  top: 92px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.preview__label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding-left: 2px;
}
.preview__card {
  cursor: default;
}

@media (max-width: 860px) {
  .addpage {
    grid-template-columns: 1fr;
  }
  .preview {
    position: static;
  }
  .field__row {
    grid-template-columns: 1fr;
  }
}
</style>
