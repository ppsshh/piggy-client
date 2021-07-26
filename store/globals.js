export const state = () => ({
  user: null,
  tags: {},
  currencies: {},
  default_currency_id: null,
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
  SET_DEFAULT_CURRENCY_ID(state, currencyId) {
    state.default_currency_id = currencyId
  },
}

export const actions = {
  async load(ctx) {
    // try {
    const resp = await this.$axios.get('/api/globals')
    // console.log(resp.data)
    ctx.commit('SET_USER', resp.data.user)
    ctx.commit('SET_TAGS', resp.data.tags)
    ctx.commit('SET_CURRENCIES', resp.data.currencies)
    ctx.commit('SET_DEFAULT_CURRENCY_ID', resp.data.default_currency_id)
    // } catch {}
  },
}

export const getters = {}
