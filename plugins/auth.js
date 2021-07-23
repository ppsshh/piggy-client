export default async (context, inject) => {
  const { store, $axios, next } = context
  inject('auth', {
    async getSession() {
      if (store.state.globals.user || store.state.globals.user === false) return
      try {
        const resp = await $axios.get('/api/session')
        store.commit('globals/SET_USER', resp.data)
      } catch {
        store.commit('globals/SET_USER', false)
      }
    },
    async logout() {
      try {
        await $axios.delete('/api/session')
        store.commit('globals/SET_USER', null)
      } catch {}
      next('/login')
    },
    async login({ username, password }) {
      try {
        const resp = await $axios.post('/api/session', {
          username,
          password,
        })
        store.commit('globals/SET_USER', resp.data)
      } catch {}
      next('/')
    },
    loggedIn() {
      return !!store.state.globals.user
    },
  })
  await context.$auth.getSession()
}
