import Vue from 'vue'

export default async (context, inject) => {
  const { store, $axios, next } = context

  const $session = new Vue({
    computed: {
      defaultCurrency() {
        const cc = store.state.globals.currencies
        const d = store.state.globals.defaultCurrencyId

        return cc && d ? cc[d] : {}
      },
    },
    methods: {
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
    },
  })

  inject('session', $session)

  await store.dispatch('globals/load')
}
