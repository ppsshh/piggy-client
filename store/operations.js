export const state = () => ({
  list: [],
  year: null,
  month: null,
  totalsBefore: [],
})

export const mutations = {
  SET(state, [key, val]) {
    state[key] = val
  },
  ADD_OPERATION(state, op) {
    const idx = state.list.findIndex((i) => i.id === op.id)
    op.tag = this.app.store.state.globals.tags[op.tag_id]

    const date = new Date(op.date)
    const dateMatches =
      (date.getMonth() + 1).toString() === state.month &&
      date.getFullYear().toString() === state.year

    if (dateMatches) {
      idx !== -1 ? this._vm.$set(state.list, idx, op) : state.list.push(op)
    } else if (idx !== -1) {
      this._vm.$delete(state.list, idx)
    }
  },
  DELETE_OPERATION(state, operationId) {
    const idx = state.list.findIndex((i) => i.id === operationId)

    if (idx !== -1) {
      this._vm.$delete(state.list, idx)
    }
  },
}

export const actions = {
  async load(ctx, { year, month }) {
    const resp = await this.$axios.get(`/api/month/${year}/${month}`)

    ctx.commit('SET', ['year', year])
    ctx.commit('SET', ['month', month])

    for (const record of resp.data.operations) {
      record.tag = ctx.rootState.globals.tags[record.tag_id]
    }
    ctx.commit('SET', ['list', resp.data.operations])
    ctx.commit('SET', ['totalsBefore', resp.data.totalsBefore])

    ctx.commit('globals/SET', ['exrates', resp.data.exrates], { root: true })
  },
}

export const getters = {}
