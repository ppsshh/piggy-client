export default async (context, inject) => {
  const { store, $axios, next } = context
  inject('auth', {
    async logout() {
      try {
        await $axios.delete('/api/session')
        store.commit('globals/SET_USER', null)
      } catch {}
      next('/login')
    },
    async login({ username, password }) {
      try {
        await $axios.post('/api/session', {
          username,
          password,
        })
        await store.dispatch('globals/load')
      } catch {}
      next('/')
    },
    loggedIn() {
      return !!store.state.globals.user
    },
  })
  await store.dispatch('globals/load')
}
