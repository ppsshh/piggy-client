<template>
  <div class="total-block" :class="htmlClass">
    <Popper trigger="clickToToggle">
      <div class="popper details-popup">
        <div class="title">Income:</div>
        <Amount :amount="income" :currency-id="currencyId">
          <template slot="testslot" slot-scope="a2">
            {{ a2.whole }}<span class="cents">{{ a2.cents }}</span>
          </template>
        </Amount>

        <div class="title">Expense:</div>
        <Amount :amount="expense" :currency-id="currencyId">
          <template slot="testslot" slot-scope="a2">
            {{ a2.whole }}<span class="cents">{{ a2.cents }}</span>
          </template>
        </Amount>

        <div class="title">Credit:</div>
        <Amount :amount="credit" :currency-id="currencyId">
          <template slot="testslot" slot-scope="a2">
            {{ a2.whole }}<span class="cents">{{ a2.cents }}</span>
          </template>
        </Amount>

        <div class="title">Conversions:</div>
        <Amount :amount="conversion" :currency-id="currencyId">
          <template slot="testslot" slot-scope="a2">
            {{ a2.whole }}<span class="cents">{{ a2.cents }}</span>
          </template>
        </Amount>
      </div>

      <div slot="reference" class="popper-reference click-transform">
        <Amount :amount="totalAfter" :currency-id="currencyId" :color="false">
          <template slot="testslot" slot-scope="a">
            <div class="currency">{{ a.currency }}</div>

            <Amount :amount="diff" :currency-id="currencyId" html-class="diff">
              <template slot="testslot" slot-scope="a2">
                <template v-if="diff">
                  {{ a2.positivity }}{{ a2.whole
                  }}<span class="cents">{{ a2.cents }}</span>
                </template>
                <template v-else>-</template>
              </template>
            </Amount>

            <div>
              {{ a.negativity }}{{ a.whole
              }}<span class="cents">{{ a.cents }}</span>
            </div>
          </template>
        </Amount>
      </div>
    </Popper>
  </div>
</template>

<script>
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/vue-popper.css'

export default {
  components: { Popper },
  props: {
    currencyId: { type: Number, required: true },
    amounts: { type: Object, required: true },
    htmlClass: { type: String, default: '' },
  },
  computed: {
    income() {
      return this.amounts.income || 0
    },
    expense() {
      return this.amounts.expense || 0
    },
    credit() {
      return this.amounts.credit || 0
    },
    conversion() {
      return this.amounts.conversion || 0
    },
    diff() {
      return this.income + this.expense + this.credit
    },
    totalAfter() {
      return this.amounts.total || 0
    },
  },
}
</script>

<style lang="scss" scoped>
.total-block {
  .currency {
    font-weight: bold;
    display: inline-block;
    opacity: 0.8;
  }

  .popper[x-placement^='bottom'] {
    margin-top: 5px;
  }

  .popper-reference {
    cursor: pointer;
    background: #aaaaaa2b;
    border-radius: 0.3em;
    display: inline-block;
    line-height: 1.6em;
    margin: 0.3em;
    padding: 0.3em;
    text-align: center;

    & > .amount > span {
      display: block;
    }
  }

  &.pink .popper-reference {
    box-shadow: 0 0 1px 2px #ff5978;
  }

  .amount.diff {
    font-size: 0.75em;
    line-height: 1.2em;

    .cents {
      font-size: 0.8em;
    }
  }

  .details-popup {
    padding: 0.4em 0.8em 0.6em 0.8em;
    text-align: right;
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 0.5em;
    grid-row-gap: 0.2em;

    .title {
      text-align: left;
    }
  }
}
</style>
