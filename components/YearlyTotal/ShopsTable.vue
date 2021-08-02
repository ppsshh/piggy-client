<template>
  <div class="shops-totals table">
    <template v-for="shop of $store.state.yearly.shops">
      <div :key="'shop' + shop.title" class="row">
        <div class="cell">{{ shop.title }}</div>
        <div class="cell">
          <Amount
            :amount="shop.amount"
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
  </div>
</template>

<style lang="scss" scoped>
.table {
  display: table;
  margin-top: 2em;
  height: min-content;

  .row {
    display: table-row;

    .cell {
      display: table-cell;
      padding: 0.3em 0.5em 0.4em 0.5em;
      border-top: 1px dashed #7777;
      max-width: 15em;
    }
    .cell:last-child {
      text-align: right;
    }
  }
}
</style>
