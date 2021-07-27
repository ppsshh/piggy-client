<template>
  <div
    class="row"
    :class="{ highlighted: highlighted }"
    @mouseenter="onHover(op.tag_id)"
  >
    <div class="nowrap">{{ day }}</div>
    <div>
      <img v-if="imageSrc" :src="'/icons/' + imageSrc" class="tag-image" />
    </div>
    <div>
      <div class="nowrap amounts" style="text-align: right">
        <Amount
          v-if="op.expense_amount"
          :amount="op.expense_amount * -1"
          :currency-id="op.expense_currency_id"
        >
          <template slot="testslot" slot-scope="a">
            {{ a.whole }}<span class="cents">{{ a.cents }}</span>
            {{ a.currency }}
          </template>
        </Amount>
        <Amount
          v-if="op.income_amount"
          :amount="op.income_amount"
          :currency-id="op.income_currency_id"
        >
          <template slot="testslot" slot-scope="a">
            {{ a.whole }}<span class="cents">{{ a.cents }}</span>
            {{ a.currency }}
          </template>
        </Amount>
      </div>

      {{ title }}
      <pre v-if="op.description" class="description">{{ op.description }}</pre>
      <a href="#" @click="$emit('open', op.id)">Edit</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    op: { type: Object, required: true },
    highlighted: { type: Boolean, default: false },
    day: { type: String, required: true },
    onHover: { type: Function, required: true },
  },
  computed: {
    imageSrc() {
      return this.op.tag ? this.op.tag.image : null
    },
    title() {
      const tagTitle = this.op.tag ? this.op.tag.title : null
      const shop = this.op.shop
      return [tagTitle, shop].join(tagTitle && shop ? ' @ ' : '')
    },
  },
}
</script>
