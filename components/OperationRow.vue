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
      <img v-if="imageSrc" :src="'/icons/' + imageSrc" class="tag-image" />
    </div>
    <div>
      {{ title }}
      <pre v-if="op.description" class="description">{{ op.description }}</pre>
    </div>
    <div class="nowrap" style="text-align: right">
      <Amount
        v-if="op.expense_amount"
        :amount="op.expense_amount * -1"
        :currency-id="op.expense_currency_id"
      >
        <template slot="testslot" slot-scope="a">
          {{ a.whole }}<span class="cents">{{ a.cents }}</span> {{ a.currency }}
        </template>
      </Amount>
      <Amount
        v-if="op.income_amount"
        :amount="op.income_amount"
        :currency-id="op.income_currency_id"
      >
        <template slot="testslot" slot-scope="a">
          {{ a.whole }}<span class="cents">{{ a.cents }}</span> {{ a.currency }}
        </template>
      </Amount>
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
  },
}
</script>
