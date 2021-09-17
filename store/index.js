export const state = () => ({
  counter: 0,
  authenticated: 1,
})

export const mutations = {
  increment(state) {
    state.counter++
  },
}
