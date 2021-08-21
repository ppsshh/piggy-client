<template>
  <div class="totals-container">
    <MonthlyTotalCurrencyBlock
      v-for="(amounts, cur) of groupedCur"
      :key="cur"
      :amounts="amounts"
      :currency-id="Number.parseInt(cur)"
    />

    <MonthlyTotalCurrencyBlock
      :amounts="totals"
      :currency-id="$ex.defaultCurrency.id"
      class="pink"
    />
  </div>
</template>

<script>
export default {
  computed: {
    groupedOps() {
      return this.$store.state.operations.list.reduce(
        (acc, op) => {
          const g = this.getGroup(op)
          if (op.income_currency_id && op.income_amount) {
            acc[g][op.income_currency_id] ||= 0
            acc[g][op.income_currency_id] += op.income_amount
            if (g !== 'credit') {
              acc.total[op.income_currency_id] ||= 0
              acc.total[op.income_currency_id] += op.income_amount
            }
          }
          if (op.expense_currency_id && op.expense_amount) {
            acc[g][op.expense_currency_id] ||= 0
            acc[g][op.expense_currency_id] -= op.expense_amount
            if (g !== 'credit') {
              acc.total[op.expense_currency_id] ||= 0
              acc.total[op.expense_currency_id] -= op.expense_amount
            }
          }

          return acc
        },
        {
          conversion: {},
          credit: {},
          income: {},
          expense: {},
          unknown: {},
          total: Object.assign({}, this.$store.state.operations.totalsBefore),
        }
      )
    },
    groupedCur() {
      return Object.keys(this.groupedOps).reduce((acc, g) => {
        return Object.keys(this.groupedOps[g]).reduce((acc2, cur) => {
          const amount = this.groupedOps[g][cur]
          acc2[cur] ||= {}
          acc2[cur][g] ||= 0
          acc2[cur][g] += amount
          return acc2
        }, acc)
      }, {})
    },
    totals() {
      return Object.keys(this.groupedOps).reduce((acc, g) => {
        acc[g] = this.$ex.total(this.groupedOps[g])
        return acc
      }, {})
    },
  },
  methods: {
    getGroup(op) {
      if (op.is_conversion) {
        return 'conversion'
      } else if (op.is_credit) {
        return 'credit'
      } else if (op.income_amount) {
        return 'income'
      } else if (op.expense_amount) {
        return 'expense'
      } else {
        return 'unknown'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.totals-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  margin-top: 3.5em;
}
</style>
