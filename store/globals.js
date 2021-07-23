export const state = () => ({
  user: null,
  tags: {},
  currencies: {},
})

export const mutations = {
  SET_USER(state, val) {
    state.user = val
  },
  SET_TAGS(state, tags) {
    state.tags = tags
  },
  SET_CURRENCIES(state, currencies) {
    state.currencies = currencies
  },
}

export const actions = {
  async load(ctx) {
    // try {
    const resp = await this.$axios.get('/api/globals')
    // console.log(resp.data)
    ctx.commit('SET_TAGS', resp.data.tags)
    ctx.commit('SET_CURRENCIES', resp.data.currencies)
    // } catch {}
  },
}

export const getters = {}
