export const state = () => ({
  incomesRaw: {},
  incomes: {},
  incomesTotal: 0,
  expensesRaw: {},
  expenses: {},
  expensesTotal: 0,
  shops: [],
})

export const mutations = {
  SET(state, [key, val]) {
    state[key] = val
  },
}

function operationsConverted(operations, ctx, $ex) {
  return Object.keys(operations).reduce((acc, tagId) => {
    const tag = getTag(tagId, ctx)
    const parentId = tag ? tag.parentId || tag.id : 0
    const parentTag = getTag(parentId, ctx)
    const amount = $ex.total(operations[tagId])

    acc[parentId] ||= { amount: 0, tag: parentTag, subtags: {} }
    acc[parentId].amount += amount
    acc[parentId].subtags[tagId] = { amount, tag }

    return acc
  }, {})
}

function orderedOperations(operationsConverted) {
  return Object.values(operationsConverted).sort((a, b) =>
    a.amount - b.amount > 0 ? -1 : 1
  )
}

function calcTotal(operationsConverted) {
  return Object.values(operationsConverted).reduce(
    (acc, val) => acc + val.amount,
    0
  )
}

function getTag(id, ctx) {
  return (
    ctx.rootState.globals.tags[id] || {
      id: 0,
      title: 'N/A',
      parentId: null,
    }
  )
}

export const actions = {
  setIncomes(ctx, operations) {
    const converted = operationsConverted(operations, ctx, this.$ex)
    const ordered = orderedOperations(converted)
    const total = calcTotal(converted)

    ctx.commit('SET', ['incomesRaw', operations])
    ctx.commit('SET', ['incomes', ordered])
    ctx.commit('SET', ['incomesTotal', total])
  },
  setExpenses(ctx, operations) {
    const converted = operationsConverted(operations, ctx, this.$ex)
    const ordered = orderedOperations(converted)
    const total = calcTotal(converted)

    ctx.commit('SET', ['expensesRaw', operations])
    ctx.commit('SET', ['expenses', ordered])
    ctx.commit('SET', ['expensesTotal', total])
  },
  setShops(ctx, shops) {
    const converted = Object.keys(shops).reduce((acc, shop) => {
      acc.push({ title: shop, amount: this.$ex.total(shops[shop]) })
      return acc
    }, [])
    const ordered = converted.sort((a, b) => (a.amount - b.amount > 0 ? -1 : 1))
    ctx.commit('SET', ['shops', ordered])
  },
}

export const getters = {}
