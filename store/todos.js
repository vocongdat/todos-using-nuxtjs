export const STATUSES = ['todo', 'progress', 'done']

const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 7)

const seed = () => [
  {
    id: uid(),
    title: 'Design concept exploration',
    description:
      'Two different concepts for the software page. Keep the colors similar but feel free to introduce a fresh accent.',
    status: 'todo',
    priority: 'high',
    tags: ['Design'],
    assignees: ['TN', 'VE'],
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: uid(),
    title: 'Secured web platform',
    description:
      'Integrate and pull data from the other web apps we subscribe to via their APIs.',
    status: 'todo',
    priority: 'medium',
    tags: ['Development'],
    assignees: ['JE'],
    createdAt: Date.now() - 86400000,
  },
  {
    id: uid(),
    title: 'Dynamic deep links',
    description: 'Make links work seamlessly across the iOS and Android apps.',
    status: 'progress',
    priority: 'medium',
    tags: ['Development', 'Mobile'],
    assignees: ['SW', 'GJ'],
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: uid(),
    title: 'Logo redesign',
    description:
      'Keep the exact shape but make the gradient one solid color instead of light-to-deep red.',
    status: 'progress',
    priority: 'low',
    tags: ['Branding'],
    assignees: ['AV', 'TN'],
    createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: uid(),
    title: 'Onboarding copywriting',
    description: 'Final pass on the welcome flow microcopy.',
    status: 'done',
    priority: 'low',
    tags: ['Content'],
    assignees: ['VE'],
    createdAt: Date.now() - 86400000 * 6,
  },
]

export const state = () => ({
  tasks: seed(),
  hydrated: false,
})

export const getters = {
  byStatus: (state) => (status) =>
    state.tasks.filter((t) => t.status === status),
  count: (state) => (status) =>
    state.tasks.filter((t) => t.status === status).length,
  total: (state) => state.tasks.length,
  progress: (state) => {
    if (!state.tasks.length) return 0
    const done = state.tasks.filter((t) => t.status === 'done').length
    return Math.round((done / state.tasks.length) * 100)
  },
}

export const mutations = {
  hydrate(state, tasks) {
    if (Array.isArray(tasks)) state.tasks = tasks
    state.hydrated = true
  },
  markHydrated(state) {
    state.hydrated = true
  },
  add(state, payload) {
    const task =
      typeof payload === 'string'
        ? { title: payload }
        : { ...payload }
    state.tasks.unshift({
      id: uid(),
      title: (task.title || 'Untitled task').trim(),
      description: task.description || '',
      status: STATUSES.includes(task.status) ? task.status : 'todo',
      priority: task.priority || 'medium',
      tags: task.tags || [],
      assignees: task.assignees || [],
      createdAt: Date.now(),
    })
  },
  update(state, { id, patch }) {
    const task = state.tasks.find((t) => t.id === id)
    if (task) Object.assign(task, patch)
  },
  remove(state, id) {
    const target = typeof id === 'object' && id ? id.id : id
    const i = state.tasks.findIndex((t) => t.id === target)
    if (i !== -1) state.tasks.splice(i, 1)
  },
  move(state, { id, status, before }) {
    const i = state.tasks.findIndex((t) => t.id === id)
    if (i === -1) return
    const [task] = state.tasks.splice(i, 1)
    if (STATUSES.includes(status)) task.status = status
    if (before == null) {
      state.tasks.push(task)
    } else {
      const idx = state.tasks.findIndex((t) => t.id === before)
      if (idx === -1) state.tasks.push(task)
      else state.tasks.splice(idx, 0, task)
    }
  },
  toggle(state, todo) {
    const id = todo && todo.id ? todo.id : todo
    const task = state.tasks.find((t) => t.id === id)
    if (task) task.status = task.status === 'done' ? 'todo' : 'done'
  },
  clearDone(state) {
    state.tasks = state.tasks.filter((t) => t.status !== 'done')
  },
}
