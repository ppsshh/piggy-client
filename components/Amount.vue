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
    color: { type: Boolean, default: true },
  },
  computed: {
    amountWhole() {
      const denominator = Math.pow(10, this.currency.round)
      const number = Math.floor(Math.abs(this.amount) / denominator)

      return number > 9999 ? this.splitByThree(number) : number
    },
    amountDec() {
      const denominator = Math.pow(10, this.currency.round)
      const dec = Math.abs(this.amount) % denominator

      return '.' + dec.toString().padStart(this.currency.round, 0)
    },
    currency() {
      return this.$store.state.globals.currencies[this.currencyId]
    },
    htmlClass() {
      return [
        this.amount > 0 ? 'positive' : 'negative',
        this.color ? 'color' : 'no-color',
      ]
    },
  },
  methods: {
    splitByThree(number) {
      return number
        .toString()
        .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g)
        .join(' ')
    },
  },
}
</script>

<style lang="scss" scoped>
.amount {
  &.color.positive {
    color: green;
  }
  &.color.negative {
    color: red;
  }

  .cents {
    font-size: 0.6em;
  }
}
</style>
