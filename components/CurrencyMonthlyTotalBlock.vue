<template>
  <div class="total-block" :class="htmlClass">
    <Popper trigger="hover">
      <div class="popper details-popup">
        Income:
        <Amount :amount="income || 0" :currency-id="currencyId">
          <template slot="testslot" slot-scope="a2">
            {{ a2.whole }}<span class="cents">{{ a2.cents }}</span>
          </template>
        </Amount>
        <br />
        Expense:
        <Amount :amount="-1 * (expense || 0)" :currency-id="currencyId">
          <template slot="testslot" slot-scope="a2">
            {{ a2.whole }}<span class="cents">{{ a2.cents }}</span>
          </template>
        </Amount>
      </div>

      <div slot="reference" class="popper-reference">
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
    totalBefore: { type: Number, required: true },
    totalAfter: { type: Number, required: true },
    income: { type: Number, default: 0 },
    expense: { type: Number, default: 0 },
    diff: { type: Number, default: 0 },
    htmlClass: { type: String, default: '' },
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

  &.pink {
    box-shadow: 0 0 1px 2px #ff5978;
  }

  .currency {
    font-weight: bold;
    display: inline-block;
    opacity: 0.8;
  }

  .popper-reference {
    cursor: pointer;

    & > .amount > span {
      display: block;
    }
  }

  .amount.diff {
    font-size: 0.75em;
    line-height: 1.2em;

    .cents {
      font-size: 0.8em;
    }
  }

  .details-popup {
    padding: 0.4em 0.6em;
    text-align: left;
  }
}
</style>
