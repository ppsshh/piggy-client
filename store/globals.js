export const state = () => ({
  user: null,
  tags: {},
  currencies: {},
  exrates: {},
  defaultCurrencyId: null,
})

export const mutations = {
  SET(state, [key, val]) {
    state[key] = val
  },
}

export const actions = {
  async load(ctx) {
    const resp = await this.$axios.get('/api/globals')

    ctx.commit('SET', ['user', resp.data.user])
    ctx.commit('SET', ['tags', resp.data.tags])
    ctx.commit('SET', ['currencies', resp.data.currencies])
    ctx.commit('SET', ['defaultCurrencyId', resp.data.default_currency_id])
  },
}

export const getters = {}
