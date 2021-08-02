<template>
  <div class="tags-totals table">
    <template v-for="op of $store.state.yearly.expenses">
      <div :key="'ex' + op.tag.id" class="row header">
        <div class="cell">{{ op.tag.title }}</div>
        <div class="cell">
          <Amount
            :amount="-1 * op.amount"
            :currency-id="$ex.defaultCurrency.id"
            :color="false"
          >
            <div slot="testslot" slot-scope="a">
              {{ a.whole }}<span class="cents">{{ a.cents }}</span>
            </div>
          </Amount>
        </div>
      </div>

      <template v-for="subOp of op.subtags">
        <div :key="'ex' + op.tag.id + 'op' + subOp.tag.id" class="row">
          <div class="cell">{{ subOp.tag.title }}</div>
          <div class="cell">
            <Amount
              :amount="-1 * subOp.amount"
              :currency-id="$ex.defaultCurrency.id"
              :color="false"
            >
              <div slot="testslot" slot-scope="a">
                {{ a.whole }}<span class="cents">{{ a.cents }}</span>
              </div>
            </Amount>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.table {
  display: table;
  margin-top: 2em;

  .row {
    display: table-row;

    &.header {
      & + .row .cell {
        border: none;
      }

      .cell {
        background: #7773;
        color: #333;
        border: none !important;
        text-transform: uppercase;
      }

      .cell:first-child {
        border-top-left-radius: 0.3em;
        border-bottom-left-radius: 0.3em;
        font-weight: bold;
      }
      .cell:last-child {
        border-top-right-radius: 0.3em;
        border-bottom-right-radius: 0.3em;
      }
    }

    .cell {
      display: table-cell;
      padding: 0.3em 0.5em 0.4em 0.5em;
      border-top: 1px dashed #7777;
    }
    .cell:last-child {
      text-align: right;
    }
  }
}
</style>
