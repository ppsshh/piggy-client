<template>
  <div class="row">
    <div class="nowrap">{{ day }}</div>
    <div>
      <img v-if="imageSrc" :src="'/icons/' + imageSrc" class="tag-image" />
      <template v-if="!op.tag && !op.is_conversion">🈚️</template>
    </div>
    <div class="content-cell" @click="$emit('open', op.id)">
      <div class="nowrap amounts" style="text-align: right">
        <template v-if="op.is_credit">💳</template>
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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    op: { type: Object, required: true },
    day: { type: String, required: true },
  },
  computed: {
    imageSrc() {
      return this.op.tag ? this.op.tag.image : null
    },
    title() {
      const tagTitle = this.op.tag ? this.op.tag.title : null
      const shop = (this.op.shop || '').replace(/\s*\[.*\]/, '')
      return [tagTitle, shop].join(tagTitle && shop ? ' @ ' : '')
    },
  },
}
</script>

<style lang="scss" scoped>
.row {
  display: table-row;

  .nowrap {
    white-space: nowrap;
  }
  .content-cell {
    cursor: pointer;

    &:hover {
      background: #e3ffd6;
    }
  }
  .amounts {
    float: right;
    margin-left: 1em;
  }
  & > div {
    display: table-cell;
    border: 1px solid white;
    padding: 0.1em 0.4em 0.2em 0.4em;

    .description {
      margin: 0;
      font-family: inherit;
      font-size: 0.68em;
      line-height: 1.8em;
      opacity: 0.5;
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    .tag-image {
      height: 1em;
      width: 1em;
      filter: invert(1);
    }
  }
}
</style>
