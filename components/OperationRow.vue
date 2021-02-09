<template>
  <div
    class="row"
    :class="{ highlighted: highlighted }"
    @mouseenter="onHover(op.tag_id)"
  >
    <div class="nowrap">
      {{ displayDate ? monthShort + ' ' + day.split('-')[2] : '' }}
    </div>
    <div>
      <img
        v-if="imageSrc"
        :src="'http://localhost:9292/ico/' + imageSrc"
        class="tag-image"
      />
    </div>
    <div>
      {{ title }}
      <pre v-if="op.description" class="description">{{ op.description }}</pre>
    </div>
    <div class="nowrap" style="text-align: right">
      {{ amountWhole }}<span class="cents">.{{ amountDec }}</span>
      {{ currency }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    op: { type: Object, required: true },
    highlighted: { type: Boolean, default: false },
    displayDate: { type: Boolean, default: false },
    day: { type: String, required: true },
    onHover: { type: Function, required: true },
  },
  computed: {
    date() {
      return new Date(this.day)
    },
    monthShort() {
      return this.date.toLocaleDateString('en-US', { month: 'short' })
    },
    tag() {
      return this.$store.state.globals.tags[this.op.tag_id]
    },
    imageSrc() {
      return this.tag ? this.tag.image : null
    },
    title() {
      const tagTitle = this.tag ? this.tag.title : null
      const shop = this.op.shop
      return [tagTitle, shop].join(tagTitle && shop ? ' @ ' : '')
    },
    amount() {
      return this.op.income_amount === 0
        ? this.op.expense_amount
        : this.op.income_amount
    },
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
      // TODO: if operation is income, return income_currency
      return this.$store.state.globals.currencies[this.op.expense_currency_id]
    },
  },
}
</script>
