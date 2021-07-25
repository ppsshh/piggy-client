<template>
  <span class="amount" :class="htmlClass"
    >{{ amountWhole }}<span class="cents">.{{ amountDec }}</span>
    {{ currency.title }}</span
  >
</template>

<script>
export default {
  props: {
    amount: { type: Number, required: true },
    currencyId: { type: Number, required: true },
  },
  computed: {
    amountWhole() {
      return Math.floor(
        Math.abs(this.amount / Math.pow(10, this.currency.round))
      )
    },
    amountDec() {
      const dec = Math.abs(this.amount % Math.pow(10, this.currency.round))
      return dec.toString().padStart(this.currency.round, 0)
    },
    currency() {
      return this.$store.state.globals.currencies[this.currencyId]
    },
    htmlClass() {
      return this.amount > 0 ? 'positive' : 'negative'
    },
  },
}
</script>

<style lang="scss" scoped>
.amount {
  &.positive {
    color: green;
  }
  &.negative {
    color: red;
  }

  .cents {
    font-size: 0.6em;
  }
}
</style>
