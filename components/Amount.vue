<template>
  <span class="amount" :class="htmlClass"
    >{{ amountWhole }}<span class="cents">.{{ amountDec }}</span>
    {{ currency }}</span
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
      const whole = Math.floor(this.amount)
      // const dec = this.amount - whole
      if (whole >= 10000) {
        const wholeStr = whole.toString()
        const groups = []
        let start = 0
        let end = wholeStr.length % 3
        end = end === 0 ? 3 : end
        while (end <= wholeStr.length) {
          groups.push(wholeStr.slice(start, end))
          start = end
          end += 3
        }
        return groups.join(' ')
      }
      return whole
    },
    amountDec() {
      const dec = this.amount - Math.floor(this.amount)
      return Math.round(dec * 100)
        .toString()
        .padStart(2, 0)
    },
    currency() {
      return this.$store.state.globals.currencies[this.currencyId].title
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
}
</style>
