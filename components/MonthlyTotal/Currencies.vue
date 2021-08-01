<template>
  <div class="totals-container">
    <MonthlyTotalCurrencyBlock
      v-for="(amount, cur) of totalsAfter"
      :key="cur"
      :total-before="totalsBefore[cur]"
      :total-after="amount"
      :income="incomes[cur]"
      :expense="expenses[cur]"
      :diff="diffs[cur]"
      :currency-id="Number.parseInt(cur)"
    />

    <MonthlyTotalCurrencyBlock
      :income="totalIncomesConverted"
      :expense="totalExpensesConverted"
      :diff="totalDiffConverted"
      :total-after="totalAfterConverted"
      :currency-id="$ex.defaultCurrency.id"
      class="pink"
    />
  </div>
</template>

<script>
export default {
  props: {
    totalsBefore: { type: Object, required: true },
    operations: { type: Array, required: true },
  },
  computed: {
    incomes() {
      return this.operations.reduce(
        (acc, op) =>
          this.reduceOperation(acc, op.income_currency_id, op.income_amount),
        {}
      )
    },
    expenses() {
      return this.operations.reduce(
        (acc, op) =>
          this.reduceOperation(acc, op.expense_currency_id, op.expense_amount),
        {}
      )
    },
    diffs() {
      return Object.keys(this.expenses).reduce(
        (acc, curr) =>
          this.reduceOperation(acc, curr, -1 * this.expenses[curr]),
        Object.assign({}, this.incomes)
      )
    },
    totalsAfter() {
      return Object.keys(this.diffs).reduce(
        (acc, curr) => this.reduceOperation(acc, curr, this.diffs[curr]),
        Object.assign({}, this.totalsBefore)
      )
    },
    totalIncomesConverted() {
      return this.$ex.total(this.incomes)
    },
    totalExpensesConverted() {
      return this.$ex.total(this.expenses)
    },
    totalDiffConverted() {
      return this.$ex.total(this.diffs)
    },
    totalAfterConverted() {
      return this.$ex.total(this.totalsAfter)
    },
  },
  methods: {
    reduceOperation(acc, id, amount) {
      if (!id) return acc
      if (!acc[id]) acc[id] = 0
      acc[id] += amount
      return acc
    },
  },
}
</script>

<style lang="scss" scoped>
.totals-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: start;
  align-content: flex-start;
  margin-top: 3.5em;
}
</style>
