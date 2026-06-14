const KEY = 'tasks-board-v1'

export default ({ store }) => {
  // Hydrate from localStorage (falls back to seed data on first visit)
  try {
    const saved = window.localStorage.getItem(KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) store.commit('todos/hydrate', parsed)
      else store.commit('todos/markHydrated')
    } else {
      store.commit('todos/markHydrated')
    }
  } catch (e) {
    store.commit('todos/markHydrated')
  }

  // Persist on every board mutation
  store.subscribe((mutation, state) => {
    if (mutation.type.startsWith('todos/') && mutation.type !== 'todos/hydrate') {
      try {
        window.localStorage.setItem(KEY, JSON.stringify(state.todos.tasks))
      } catch (e) {
        /* storage full or unavailable — ignore */
      }
    }
  })
}
