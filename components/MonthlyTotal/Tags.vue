<template>
  <div class="monthly-total-tags">
    <div class="table">
      <div class="header">Income</div>
      <div
        v-for="(amount, tagId) of incomeTags"
        :key="'tag' + tagId"
        class="row"
      >
        <div class="cell">{{ tagTitle(tagId) }}</div>
        <div class="cell amount">
          <Amount :amount="amount" :currency-id="$ex.defaultCurrency.id">
            <template slot="testslot" slot-scope="a">
              {{ a.positivity }}{{ a.whole
              }}<span class="cents">{{ a.cents }}</span>
            </template>
          </Amount>
        </div>
      </div>

      <div class="header">Expenses</div>
      <div
        v-for="(amount, tagId) of expenseTags"
        :key="'tag' + tagId"
        class="row"
      >
        <div class="cell">{{ tagTitle(tagId) }}</div>
        <div class="cell amount">
          <Amount :amount="amount" :currency-id="$ex.defaultCurrency.id">
            <template slot="testslot" slot-scope="a">
              {{ a.positivity }}{{ a.whole
              }}<span class="cents">{{ a.cents }}</span>
            </template>
          </Amount>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    operations: { type: Array, required: true },
  },
  computed: {
    incomeTags() {
      return this.operations.reduce((acc, op) => {
        // Skip exchanges and expeses
        if (op.is_conversion || op.expense_amount || !op.income_amount)
          return acc

        const oid = op.tag ? op.tag.parentId || op.tag.id : null

        acc[oid] ||= 0
        acc[oid] += this.$ex.from(op.income_amount, op.income_currency_id)

        return acc
      }, {})
    },
    expenseTags() {
      return this.operations.reduce((acc, op) => {
        // Skip exchanges and incomes
        if (op.is_conversion || op.income_amount || !op.expense_amount)
          return acc

        const oid = op.tag ? op.tag.parentId || op.tag.id : null

        acc[oid] ||= 0
        acc[oid] -= this.$ex.from(op.expense_amount, op.expense_currency_id)

        return acc
      }, {})
    },
  },
  methods: {
    tagTitle(tagId) {
      const tag = this.$store.state.globals.tags[tagId]
      return tag ? tag.title : 'N/A'
    },
  },
}
</script>

<style lang="scss" scoped>
.table {
  display: table;
  width: unset;

  .header {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.9em;
    margin: 1.2em 0 0.4em 0;
  }

  .row {
    display: table-row;

    .cell {
      display: table-cell;
      padding: 0.2em 0;
    }
  }
  .amount {
    text-align: right;
    padding-left: 1em;
  }
}
</style>
