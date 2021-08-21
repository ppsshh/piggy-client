import Vue from 'vue'

export default (context, inject) => {
  const { store, $axios, next, route, redirect } = context

  const $session = new Vue({
    computed: {
      defaultCurrency() {
        const cc = store.state.globals.currencies
        const d = store.state.globals.defaultCurrencyId

        return cc && d ? cc[d] : {}
      },
    },
    async created() {
      try {
        await store.dispatch('globals/load')
        if (['login'].includes(route.name)) redirect(302, '/')
      } catch {
        if (!['login'].includes(route.name)) redirect(302, '/login')
      }
    },
    methods: {
      async logout() {
        try {
          await $axios.delete('/api/session')
          store.commit('globals/SET', ['user', null])
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
}
