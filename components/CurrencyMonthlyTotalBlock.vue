<template>
  <div class="total-block">
    <Amount :amount="amount.total" :currency-id="currencyId" :color="false">
      <template slot="testslot" slot-scope="a">
        <div class="currency">{{ a.currency }}</div>

        <Amount
          :amount="amount.income"
          :currency-id="currencyId"
          :color="false"
          html-class="income"
        >
          <template slot="testslot" slot-scope="income">
            <template v-if="amount.income">
              {{ income.whole }}<span class="cents">{{ income.cents }}</span>
            </template>
            <template v-else>-</template>
          </template>
        </Amount>
        <Amount
          :amount="amount.expense"
          :currency-id="currencyId"
          :color="false"
          html-class="expense"
        >
          <template slot="testslot" slot-scope="expense">
            <template v-if="amount.expense">
              {{ expense.whole }}<span class="cents">{{ expense.cents }}</span>
            </template>
            <template v-else>-</template>
          </template>
        </Amount>

        <div v-if="amount.total">
          {{ a.negativity }}{{ a.whole
          }}<span class="cents">{{ a.cents }}</span>
        </div>
        <div v-else>0</div>
      </template>
    </Amount>
  </div>
</template>

<script>
export default {
  props: {
    amount: { type: Object, required: true },
    currencyId: { type: Number, required: true },
  },
}
</script>

<style lang="scss" scoped>
.total-block {
  background: #aaaaaa2b;
  border-radius: 0.3em;
  display: inline-block;
  line-height: 1.6em;
  margin: 0.3em;
  padding: 0.3em;
  text-align: center;

  .currency {
    font-weight: bold;
    display: inline-block;
    opacity: 0.8;
  }

  & > .amount > span {
    display: block;
  }

  .amount.income,
  .amount.expense {
    font-size: 0.75em;
    line-height: 1.2em;

    .cents {
      font-size: 0.8em;
    }
  }
  .amount.income {
    color: green;
  }
  .amount.expense {
    color: red;
  }
}
</style>
